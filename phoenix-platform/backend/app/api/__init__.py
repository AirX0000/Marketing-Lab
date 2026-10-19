from app.api.auth import auth_bp
from app.api.diagnostic import diagnostic_bp
from app.api.courses import courses_bp
from app.api.analytics import analytics_bp
from app.api.webhook import webhook_bp

__all__ = [
    "auth_bp",
    "diagnostic_bp",
    "courses_bp",
    "analytics_bp",
    "webhook_bp"
]
