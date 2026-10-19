import pytest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import create_app
from app.models.base import db
from app.models.user import User

@pytest.fixture
def client():
    app = create_app("testing")
    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.session.remove()
        db.drop_all()

def test_register_success(client):
    res = client.post("/api/v1/auth/register", json={
        "email": "sarah.lead@tech.io",
        "password": "SecurePassword123!",
        "full_name": "Sarah Connor",
        "target_domain": "IT"
    })
    assert res.status_code == 201
    data = res.get_json()
    assert data["status"] == "success"
    assert data["data"]["user"]["email"] == "sarah.lead@tech.io"
    assert "tokens" in data["data"]
    assert "access_token" in data["data"]["tokens"]

def test_register_duplicate_email(client):
    client.post("/api/v1/auth/register", json={
        "email": "duplicate@tech.io",
        "password": "SecurePassword123!",
        "full_name": "Dev One"
    })
    res = client.post("/api/v1/auth/register", json={
        "email": "duplicate@tech.io",
        "password": "AnotherPassword456!",
        "full_name": "Dev Two"
    })
    assert res.status_code == 409
    assert res.get_json()["code"] == "RESOURCE_CONFLICT"

def test_login_success(client):
    client.post("/api/v1/auth/register", json={
        "email": "login.test@tech.io",
        "password": "TestPassword999!",
        "full_name": "Tester"
    })
    res = client.post("/api/v1/auth/login", json={
        "email": "login.test@tech.io",
        "password": "TestPassword999!"
    })
    assert res.status_code == 200
    data = res.get_json()
    assert "access_token" in data["data"]["tokens"]

def test_login_invalid_password(client):
    client.post("/api/v1/auth/register", json={
        "email": "login.wrong@tech.io",
        "password": "TestPassword999!",
        "full_name": "Tester"
    })
    res = client.post("/api/v1/auth/login", json={
        "email": "login.wrong@tech.io",
        "password": "WrongPassword000!"
    })
    assert res.status_code == 401
    assert res.get_json()["code"] == "UNAUTHORIZED"

def test_protected_me_endpoint(client):
    reg = client.post("/api/v1/auth/register", json={
        "email": "protected@tech.io",
        "password": "Password123!",
        "full_name": "Protected User"
    })
    token = reg.get_json()["data"]["tokens"]["access_token"]
    
    # Valid token
    res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    assert res.get_json()["data"]["email"] == "protected@tech.io"
    assert "gamification" in res.get_json()["data"]

    # Missing token
    unauth = client.get("/api/v1/auth/me")
    assert unauth.status_code == 401
