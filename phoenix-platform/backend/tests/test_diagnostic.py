import pytest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import create_app
from app.models.base import db
from app.seed import run_seed
from app.models.diagnostic import DiagnosticTest

@pytest.fixture
def client():
    app = create_app("testing")
    with app.app_context():
        db.create_all()
        run_seed()
        yield app.test_client()
        db.session.remove()
        db.drop_all()

def test_list_and_get_test(client):
    res = client.get("/api/v1/diagnostic/tests")
    assert res.status_code == 200
    tests = res.get_json()["data"]
    assert len(tests) >= 1
    slug = tests[0]["slug"]

    # Get specific test items
    detail_res = client.get(f"/api/v1/diagnostic/tests/{slug}")
    assert detail_res.status_code == 200
    detail = detail_res.get_json()["data"]
    assert "questions" in detail
    assert len(detail["questions"]) > 0

    # Ensure answers are NOT leaked to the frontend
    for q in detail["questions"]:
        for opt in q["options"]:
            assert "is_correct" not in opt, "SECURITY VIOLATION: is_correct leaked in public question endpoint!"

def test_submit_diagnostic(client):
    test_res = client.get("/api/v1/diagnostic/tests/cefr-it-business-diagnostic")
    test_data = test_res.get_json()["data"]
    test_id = test_data["id"]
    questions = test_data["questions"]

    answers = [{"question_id": q["id"], "selected_option_id": q["options"][0]["id"]} for q in questions]

    sub_res = client.post("/api/v1/diagnostic/submit", json={
        "test_id": test_id,
        "answers": answers,
        "lead_name": "Diagnostic Candidate",
        "lead_email": "candidate@techlead.io"
    })
    assert sub_res.status_code == 201
    result = sub_res.get_json()["data"]
    assert "assigned_cefr" in result
    assert result["assigned_cefr"] in ["A2", "B1", "B2", "C1", "C2"]
    assert "breakdown" in result
    assert "detailed_recommendations" in result
    assert len(result["detailed_recommendations"]) > 0
