from typing import Dict, Any
from app.models.base import db
from app.models.user import User
from app.schemas.auth import UserRegisterSchema, UserLoginSchema, TelegramLinkSchema
from app.utils.security import generate_tokens, decode_token, sanitize_string
from app.utils.errors import ConflictError, UnauthorizedError, NotFoundError

class AuthService:
    @staticmethod
    def register_user(data: UserRegisterSchema) -> Dict[str, Any]:
        """Register a new student or corporate learner with defense against duplicate registration."""
        existing = db.session.query(User).filter_by(email=data.email.lower()).first()
        if existing:
            raise ConflictError("An account with this email address already exists.")

        user = User(
            email=data.email.lower(),
            full_name=sanitize_string(data.full_name),
            target_domain=data.target_domain or "IT",
            role="student",
            xp_points=100,  # Welcome bonus
            streak_days=1
        )
        user.set_password(data.password)

        db.session.add(user)
        db.session.commit()

        tokens = generate_tokens(user.id, user.role, user.email)
        return {
            "user": user.to_dict(),
            "tokens": tokens
        }

    @staticmethod
    def authenticate_user(data: UserLoginSchema) -> Dict[str, Any]:
        """Authenticate user credentials and update daily engagement streak."""
        user = db.session.query(User).filter_by(email=data.email.lower()).first()
        if not user or not user.check_password(data.password):
            raise UnauthorizedError("Invalid email or password.")

        if not user.is_active:
            raise UnauthorizedError("This account has been deactivated. Please contact support.")

        user.update_streak()
        db.session.commit()

        tokens = generate_tokens(user.id, user.role, user.email)
        return {
            "user": user.to_dict(),
            "tokens": tokens
        }

    @staticmethod
    def refresh_access_token(refresh_token: str) -> Dict[str, Any]:
        """Validate cryptographic refresh token and issue rotated token pair."""
        payload = decode_token(refresh_token, expected_type="refresh")
        user_id = payload.get("sub")

        user = db.session.query(User).filter_by(id=user_id).first()
        if not user or not user.is_active:
            raise UnauthorizedError("User session is no longer active.")

        tokens = generate_tokens(user.id, user.role, user.email)
        return tokens

    @staticmethod
    def link_telegram(user_id: str, data: TelegramLinkSchema) -> Dict[str, Any]:
        """Associate a verified Telegram ID with user profile for mobile bots and daily micro-learning."""
        user = db.session.query(User).filter_by(id=user_id).first()
        if not user:
            raise NotFoundError("User not found.")

        # Check if telegram_id is used by another account
        existing = db.session.query(User).filter(User.telegram_id == data.telegram_id, User.id != user_id).first()
        if existing:
            raise ConflictError("This Telegram account is already linked to another Phoenix user.")

        user.telegram_id = data.telegram_id
        user.telegram_username = data.telegram_username
        db.session.commit()

        return {
            "message": "Telegram account linked successfully.",
            "user": user.to_dict()
        }
