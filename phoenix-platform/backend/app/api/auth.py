from flask import Blueprint, jsonify, g
from app.schemas.auth import UserRegisterSchema, UserLoginSchema, RefreshTokenSchema, TelegramLinkSchema
from app.services.auth_service import AuthService
from app.services.gamification_engine import GamificationEngine
from app.utils.decorators import validate_payload, jwt_required
from app.models.base import db
from app.models.user import User

auth_bp = Blueprint("auth", __name__, url_prefix="/api/v1/auth")

@auth_bp.route("/register", methods=["POST"])
@validate_payload(UserRegisterSchema)
def register():
    """Register a new student or corporate learner."""
    result = AuthService.register_user(g.validated_data)
    return jsonify({
        "status": "success",
        "message": "User registered successfully.",
        "data": result
    }), 201

@auth_bp.route("/login", methods=["POST"])
@validate_payload(UserLoginSchema)
def login():
    """Authenticate with email and password."""
    result = AuthService.authenticate_user(g.validated_data)
    return jsonify({
        "status": "success",
        "message": "Authentication successful.",
        "data": result
    }), 200

@auth_bp.route("/refresh", methods=["POST"])
@validate_payload(RefreshTokenSchema)
def refresh():
    """Refresh expired access token using valid refresh token."""
    tokens = AuthService.refresh_access_token(g.validated_data.refresh_token)
    return jsonify({
        "status": "success",
        "message": "Tokens rotated successfully.",
        "data": tokens
    }), 200

@auth_bp.route("/me", methods=["GET"])
@jwt_required
def get_current_user():
    """Retrieve currently authenticated user profile and gamification status."""
    user = db.session.query(User).filter_by(id=g.current_user_id).first()
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404

    level_info = GamificationEngine.get_level_info(user.xp_points)
    data = user.to_dict()
    data["gamification"] = level_info

    return jsonify({
        "status": "success",
        "data": data
    }), 200

@auth_bp.route("/telegram/link", methods=["POST"])
@jwt_required
@validate_payload(TelegramLinkSchema)
def link_telegram():
    """Link user account to Telegram ID for bot synchronization."""
    result = AuthService.link_telegram(g.current_user_id, g.validated_data)
    return jsonify({
        "status": "success",
        "data": result
    }), 200
