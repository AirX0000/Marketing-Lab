from flask import Blueprint, jsonify, g
from app.models.base import db
from app.models.diagnostic import DiagnosticTest, DiagnosticAttempt
from app.schemas.diagnostic import SubmitDiagnosticSchema, LeadCaptureSchema
from app.services.diagnostic_engine import DiagnosticEngine
from app.utils.decorators import validate_payload, optional_jwt
from app.utils.errors import NotFoundError

diagnostic_bp = Blueprint("diagnostic", __name__, url_prefix="/api/v1/diagnostic")

@diagnostic_bp.route("/tests", methods=["GET"])
def list_tests():
    """List all available diagnostic placement tests."""
    tests = db.session.query(DiagnosticTest).filter_by(is_active=True).all()
    return jsonify({
        "status": "success",
        "data": [t.to_dict(include_questions=False) for t in tests]
    }), 200

@diagnostic_bp.route("/tests/<slug>", methods=["GET"])
def get_test_by_slug(slug: str):
    """Retrieve test items for diagnostic runner (answer keys omitted for test integrity)."""
    test = db.session.query(DiagnosticTest).filter_by(slug=slug, is_active=True).first()
    if not test:
        raise NotFoundError("Diagnostic test not found.")

    return jsonify({
        "status": "success",
        "data": test.to_dict(include_questions=True)
    }), 200

@diagnostic_bp.route("/submit", methods=["POST"])
@optional_jwt
@validate_payload(SubmitDiagnosticSchema)
def submit_test():
    """Evaluate diagnostic submission, calculate CEFR score, and generate career trajectory."""
    user_id = getattr(g, "current_user_id", None)
    attempt = DiagnosticEngine.evaluate_test(g.validated_data, user_id=user_id)
    return jsonify({
        "status": "success",
        "message": "Diagnostic assessment successfully evaluated.",
        "data": attempt.to_dict()
    }), 201

@diagnostic_bp.route("/results/<attempt_id>", methods=["GET"])
def get_result(attempt_id: str):
    """Fetch completed diagnostic report with CEFR breakdown and recommendations."""
    attempt = db.session.query(DiagnosticAttempt).filter_by(id=attempt_id).first()
    if not attempt:
        raise NotFoundError("Diagnostic result not found.")

    return jsonify({
        "status": "success",
        "data": attempt.to_dict()
    }), 200

@diagnostic_bp.route("/lead", methods=["POST"])
@validate_payload(LeadCaptureSchema)
def capture_b2b_lead():
    """Capture corporate or B2B enterprise training inquiry."""
    data = g.validated_data
    # In production, this can notify Telegram channel or CRM
    return jsonify({
        "status": "success",
        "message": f"Thank you, {data.name}. Our enterprise curriculum lead will contact {data.email} within 2 hours.",
        "data": {
            "name": data.name,
            "company": data.company_name,
            "cohort_size": data.cohort_size,
            "program": data.target_program
        }
    }), 201
