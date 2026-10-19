from functools import wraps
from typing import Type, Callable, List
from flask import request, g
from pydantic import BaseModel, ValidationError as PydanticValidationError
from app.utils.security import decode_token
from app.utils.errors import UnauthorizedError, ForbiddenError, BadRequestError

def jwt_required(f: Callable) -> Callable:
    """Decorator to enforce valid JWT authentication on protected routes."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get("Authorization", None)
        if not auth_header:
            raise UnauthorizedError("Authorization header is missing.")

        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != "bearer":
            raise UnauthorizedError("Authorization header must be formatted as 'Bearer <token>'.")

        token = parts[1]
        payload = decode_token(token, expected_type="access")
        g.current_user_id = payload.get("sub")
        g.current_user_role = payload.get("role")
        g.current_user_email = payload.get("email")

        return f(*args, **kwargs)
    return decorated_function

def optional_jwt(f: Callable) -> Callable:
    """Decorator to extract JWT credentials if present, but allow anonymous access."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get("Authorization", None)
        g.current_user_id = None
        g.current_user_role = "anonymous"
        g.current_user_email = None

        if auth_header:
            parts = auth_header.split()
            if len(parts) == 2 and parts[0].lower() == "bearer":
                try:
                    payload = decode_token(parts[1], expected_type="access")
                    g.current_user_id = payload.get("sub")
                    g.current_user_role = payload.get("role")
                    g.current_user_email = payload.get("email")
                except Exception:
                    pass  # Treat as anonymous on invalid token

        return f(*args, **kwargs)
    return decorated_function

def roles_required(*allowed_roles: str) -> Callable:
    """Decorator to enforce role-based access control (RBAC). Must follow @jwt_required."""
    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user_role = getattr(g, "current_user_role", None)
            if not user_role or user_role not in allowed_roles:
                raise ForbiddenError(f"Access forbidden: requires one of roles: {', '.join(allowed_roles)}")
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def validate_payload(schema_cls: Type[BaseModel]) -> Callable:
    """Decorator to validate JSON request bodies against a Pydantic schema."""
    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not request.is_json:
                raise BadRequestError("Request Content-Type must be 'application/json'.")
            
            data = request.get_json(silent=True)
            if data is None:
                raise BadRequestError("Invalid JSON body provided.")

            # Will raise PydanticValidationError if invalid, caught by global error handler
            validated = schema_cls.model_validate(data)
            g.validated_data = validated
            return f(*args, **kwargs)
        return decorated_function
    return decorator
