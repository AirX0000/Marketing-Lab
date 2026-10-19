from flask import Blueprint, jsonify, g
from app.models.base import db
from app.models.user import User
from app.models.progress import UserProgress, ActivityLog
from app.models.diagnostic import DiagnosticAttempt
from app.services.gamification_engine import GamificationEngine
from app.utils.decorators import jwt_required

analytics_bp = Blueprint("analytics", __name__, url_prefix="/api/v1/analytics")

@analytics_bp.route("/dashboard", methods=["GET"])
@jwt_required
def get_user_dashboard():
    """Retrieve personal student analytics, CEFR radar competency metrics, and recent activities."""
    user = db.session.query(User).filter_by(id=g.current_user_id).first()
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404

    level_info = GamificationEngine.get_level_info(user.xp_points)

    # Get completed lessons count
    completed_count = db.session.query(UserProgress).filter_by(
        user_id=user.id, 
        status="completed"
    ).count()

    # Get latest diagnostic attempt to draw CEFR competency radar
    latest_attempt = db.session.query(DiagnosticAttempt).filter_by(
        user_id=user.id
    ).order_by(DiagnosticAttempt.completed_at.desc()).first()

    if latest_attempt:
        radar_competencies = [
            {"skill": "Technical Grammar", "score": round(latest_attempt.grammar_score, 1), "benchmark": 75},
            {"skill": "Systems Lexicon", "score": round(latest_attempt.tech_vocab_score, 1), "benchmark": 80},
            {"skill": "Architecture Reading", "score": round(latest_attempt.comprehension_score, 1), "benchmark": 70},
            {"skill": "Standup Fluency", "score": min(100, round(latest_attempt.score_percentage + 5, 1)), "benchmark": 75},
            {"skill": "Executive Negotiation", "score": max(40, round(latest_attempt.score_percentage - 10, 1)), "benchmark": 85},
        ]
    else:
        # Default baseline if test has not yet been taken
        radar_competencies = [
            {"skill": "Technical Grammar", "score": 50, "benchmark": 75},
            {"skill": "Systems Lexicon", "score": 45, "benchmark": 80},
            {"skill": "Architecture Reading", "score": 55, "benchmark": 70},
            {"skill": "Standup Fluency", "score": 40, "benchmark": 75},
            {"skill": "Executive Negotiation", "score": 35, "benchmark": 85},
        ]

    # Recent activities
    recent_logs = db.session.query(ActivityLog).filter_by(
        user_id=user.id
    ).order_by(ActivityLog.created_at.desc()).limit(8).all()

    return jsonify({
        "status": "success",
        "data": {
            "user": user.to_dict(),
            "level_info": level_info,
            "metrics": {
                "completed_lessons": completed_count,
                "current_cefr": user.cefr_level or "Unassessed",
                "streak_days": user.streak_days,
                "xp_points": user.xp_points
            },
            "radar_competencies": radar_competencies,
            "recent_activity": [log.to_dict() for log in recent_logs]
        }
    }), 200

@analytics_bp.route("/leaderboard", methods=["GET"])
def get_community_leaderboard():
    """Retrieve community XP leaderboard for public motivation."""
    leaders = GamificationEngine.get_leaderboard(limit=15)
    return jsonify({
        "status": "success",
        "data": leaders
    }), 200
