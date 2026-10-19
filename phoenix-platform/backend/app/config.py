import os
from datetime import timedelta

class Config:
    """Base configuration with defensive defaults."""
    SECRET_KEY = os.environ.get("SECRET_KEY", "phoenix-dev-insecure-secret-key-change-in-prod-8f2e1a")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "phoenix-jwt-insecure-secret-key-9b3c4d")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=int(os.environ.get("JWT_ACCESS_MINUTES", "30")))
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=int(os.environ.get("JWT_REFRESH_DAYS", "7")))
    
    # Database configuration (PostgreSQL production-ready with SQLite local development fallback)
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL", 
        "sqlite:///" + os.path.join(os.path.abspath(os.path.dirname(__file__)), "../../phoenix_dev.db")
    )
    if SQLALCHEMY_DATABASE_URI.startswith("postgres://"):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgres://", "postgresql://", 1)
        
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 300,
    }

    # Security settings
    BCRYPT_LOG_ROUNDS = int(os.environ.get("BCRYPT_LOG_ROUNDS", "12"))
    CORS_ALLOWED_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000").split(",")
    RATELIMIT_DEFAULT = "120 per minute"
    RATELIMIT_STORAGE_URI = os.environ.get("REDIS_URL", "memory://")

    # Telegram integration
    TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    TELEGRAM_BOT_USERNAME = os.environ.get("TELEGRAM_BOT_USERNAME", "PhoenixEnglishBot")


class DevelopmentConfig(Config):
    DEBUG = True
    ENV = "development"


class TestingConfig(Config):
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    BCRYPT_LOG_ROUNDS = 4  # Fast hashing in test suite
    RATELIMIT_ENABLED = False


class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
    # In production, require secure secrets
    SECRET_KEY = os.environ.get("SECRET_KEY", "phoenix-prod-configured-key-must-be-set")



config_by_name = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
