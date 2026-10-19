import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from app.config import config_by_name
from app.models.base import db
from app.utils.errors import register_error_handlers
from app.api import auth_bp, diagnostic_bp, courses_bp, analytics_bp, webhook_bp

def create_app(config_name: str = None) -> Flask:
    """Application factory for Phoenix Learning Center."""
    if not config_name:
        config_name = os.environ.get("FLASK_ENV", "development")

    app = Flask(__name__)
    config_obj = config_by_name.get(config_name, config_by_name["default"])
    app.config.from_object(config_obj)

    # Initialize extensions
    db.init_app(app)

    # Configure CORS strictly
    CORS(
        app,
        resources={r"/api/*": {"origins": app.config.get("CORS_ALLOWED_ORIGINS", "*")}},
        supports_credentials=True
    )

    # Defensive HTTP Security Headers
    @app.after_request
    def set_security_headers(response):
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "img-src 'self' https: data:; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "connect-src 'self' http://localhost:5000 http://127.0.0.1:5000;"
        )
        return response

    # Register Global Error Handlers
    register_error_handlers(app)

    # Register API Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(diagnostic_bp)
    app.register_blueprint(courses_bp)
    app.register_blueprint(analytics_bp)
    app.register_blueprint(webhook_bp)

    @app.route("/api/health", methods=["GET"])
    def health_check():
        return jsonify({
            "status": "healthy",
            "service": "Phoenix Learning Center Backend API",
            "version": "1.0.0",
            "env": app.config.get("ENV", "development")
        }), 200

    return app
