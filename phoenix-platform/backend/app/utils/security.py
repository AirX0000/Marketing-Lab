import re
import html
import bcrypt
import jwt
from datetime import datetime, timezone
from typing import Dict, Any, Optional
from flask import current_app

def hash_password(plain_password: str) -> str:
    """Hash password using bcrypt with configured work factor."""
    log_rounds = current_app.config.get("BCRYPT_LOG_ROUNDS", 12) if current_app else 12
    salt = bcrypt.gensalt(rounds=log_rounds)
    hashed = bcrypt.hashpw(plain_password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Constant-time verification of password against bcrypt hash."""
    if not plain_password or not hashed_password:
        return False
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False

def generate_tokens(user_id: str, role: str, email: str) -> Dict[str, Any]:
    """Generate cryptographically signed JWT access and refresh token pair."""
    now = datetime.now(timezone.utc)
    access_exp = now + current_app.config["JWT_ACCESS_TOKEN_EXPIRES"]
    refresh_exp = now + current_app.config["JWT_REFRESH_TOKEN_EXPIRES"]
    secret = current_app.config["JWT_SECRET_KEY"]

    access_payload = {
        "sub": user_id,
        "email": email,
        "role": role,
        "type": "access",
        "iat": int(now.timestamp()),
        "exp": int(access_exp.timestamp())
    }

    refresh_payload = {
        "sub": user_id,
        "role": role,
        "type": "refresh",
        "iat": int(now.timestamp()),
        "exp": int(refresh_exp.timestamp())
    }

    access_token = jwt.encode(access_payload, secret, algorithm="HS256")
    refresh_token = jwt.encode(refresh_payload, secret, algorithm="HS256")

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "Bearer",
        "expires_in": int(current_app.config["JWT_ACCESS_TOKEN_EXPIRES"].total_seconds())
    }

def decode_token(token: str, expected_type: str = "access") -> Dict[str, Any]:
    """Decode and validate signature, expiration, and token type."""
    secret = current_app.config["JWT_SECRET_KEY"]
    try:
        payload = jwt.decode(token, secret, algorithms=["HS256"])
        if payload.get("type") != expected_type:
            raise jwt.InvalidTokenError(f"Token type mismatch: expected {expected_type}")
        return payload
    except jwt.ExpiredSignatureError:
        raise
    except jwt.InvalidTokenError:
        raise

def sanitize_string(input_str: Optional[str]) -> str:
    """Defensive HTML entity encoding and control character removal."""
    if not input_str:
        return ""
    # Strip null bytes and non-printable control characters (except standard newlines/tabs)
    cleaned = re.sub(r"[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]", "", input_str.strip())
    # HTML escape dangerous characters
    return html.escape(cleaned, quote=True)
