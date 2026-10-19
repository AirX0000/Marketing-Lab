import pytest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import create_app
from app.models.base import db
from app.seed import run_seed

@pytest.fixture
def client():
    app = create_app("testing")
    with app.app_context():
        db.create_all()
        run_seed()
        yield app.test_client()
        db.session.remove()
        db.drop_all()

def test_defensive_http_security_headers(client):
    """Verify presence of defense-in-depth HTTP response headers."""
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.headers.get("X-Content-Type-Options") == "nosniff"
    assert res.headers.get("X-Frame-Options") == "DENY"
    assert res.headers.get("X-XSS-Protection") == "1; mode=block"
    assert "Content-Security-Policy" in res.headers

def test_sql_injection_resistance(client):
    """Verify ORM parameterization thwarts classic SQL injection payloads."""
    sql_payload = "admin@phoenix-edtech.io' OR '1'='1"
    res = client.post("/api/v1/auth/login", json={
        "email": sql_payload,
        "password": "random_password"
    })
    # Should be rejected cleanly as invalid email (Pydantic) or unauthorized, never 500 DB error
    assert res.status_code in [401, 422]
    assert res.get_json()["status"] == "error"

def test_xss_input_sanitization(client):
    """Verify malicious HTML tags in user full name are stripped or safely encoded."""
    malicious_script = "<script>alert('pwned')</script>John Doe"
    res = client.post("/api/v1/auth/register", json={
        "email": "xss.clean@tech.io",
        "password": "Password123!",
        "full_name": malicious_script
    })
    assert res.status_code == 201
    stored_name = res.get_json()["data"]["user"]["full_name"]
    assert "<script>" not in stored_name
    assert "&lt;script&gt;" in stored_name or "alert" not in stored_name

def test_tampered_jwt_signature(client):
    """Verify forged JWT signatures are rejected with 401."""
    fake_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {fake_token}"})
    assert res.status_code == 401
    assert res.get_json()["code"] == "TOKEN_INVALID"
