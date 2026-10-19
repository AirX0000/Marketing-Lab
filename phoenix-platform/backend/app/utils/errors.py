from typing import Any, Dict, Optional
from flask import jsonify, Flask
from pydantic import ValidationError as PydanticValidationError
from sqlalchemy.exc import SQLAlchemyError
import jwt

class AppError(Exception):
    """Base application exception for managed HTTP errors."""
    status_code = 500
    code = "INTERNAL_SERVER_ERROR"
    message = "An unexpected error occurred."

    def __init__(self, message: Optional[str] = None, details: Optional[Dict[str, Any]] = None):
        super().__init__(message or self.message)
        if message:
            self.message = message
        self.details = details or {}

    def to_dict(self) -> Dict[str, Any]:
        return {
            "status": "error",
            "code": self.code,
            "message": self.message,
            "details": self.details
        }

class BadRequestError(AppError):
    status_code = 400
    code = "BAD_REQUEST"
    message = "Invalid request payload or parameters."

class UnauthorizedError(AppError):
    status_code = 401
    code = "UNAUTHORIZED"
    message = "Authentication credentials are missing or invalid."

class ForbiddenError(AppError):
    status_code = 403
    code = "FORBIDDEN"
    message = "You do not have permission to access this resource."

class NotFoundError(AppError):
    status_code = 404
    code = "NOT_FOUND"
    message = "The requested resource could not be found."

class ConflictError(AppError):
    status_code = 409
    code = "RESOURCE_CONFLICT"
    message = "A conflict occurred with an existing resource."

class RequestValidationError(AppError):
    status_code = 422
    code = "VALIDATION_FAILED"
    message = "Schema validation failed on request input."


def register_error_handlers(app: Flask):
    """Register uniform error handlers for all exceptions across the API."""

    @app.errorhandler(AppError)
    def handle_app_error(error: AppError):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    @app.errorhandler(PydanticValidationError)
    def handle_pydantic_error(error: PydanticValidationError):
        formatted_errors = []
        for err in error.errors():
            formatted_errors.append({
                "field": ".".join(str(loc) for loc in err["loc"]),
                "issue": err["msg"],
                "type": err["type"]
            })
        response = jsonify({
            "status": "error",
            "code": "VALIDATION_FAILED",
            "message": "Input validation error.",
            "details": {"errors": formatted_errors}
        })
        response.status_code = 422
        return response

    @app.errorhandler(jwt.ExpiredSignatureError)
    def handle_jwt_expired(error):
        response = jsonify({
            "status": "error",
            "code": "TOKEN_EXPIRED",
            "message": "Authentication token has expired. Please refresh or log in again.",
            "details": {}
        })
        response.status_code = 401
        return response

    @app.errorhandler(jwt.InvalidTokenError)
    def handle_jwt_invalid(error):
        response = jsonify({
            "status": "error",
            "code": "TOKEN_INVALID",
            "message": "Authentication token signature or format is invalid.",
            "details": {}
        })
        response.status_code = 401
        return response

    @app.errorhandler(429)
    def handle_ratelimit_error(error):
        response = jsonify({
            "status": "error",
            "code": "RATE_LIMIT_EXCEEDED",
            "message": "Too many requests. Please slow down and try again later.",
            "details": {"retry_after": getattr(error, "description", "60s")}
        })
        response.status_code = 429
        return response

    @app.errorhandler(SQLAlchemyError)
    def handle_db_error(error: SQLAlchemyError):
        app.logger.error(f"Database error: {str(error)}")
        response = jsonify({
            "status": "error",
            "code": "DATABASE_ERROR",
            "message": "Database transaction failure.",
            "details": {}
        })
        response.status_code = 500
        return response

    @app.errorhandler(404)
    def handle_404(error):
        return jsonify({
            "status": "error",
            "code": "ENDPOINT_NOT_FOUND",
            "message": "The requested API route was not found.",
            "details": {}
        }), 404

    @app.errorhandler(Exception)
    def handle_generic_exception(error: Exception):
        app.logger.exception(f"Unhandled exception: {str(error)}")
        return jsonify({
            "status": "error",
            "code": "INTERNAL_SERVER_ERROR",
            "message": "An internal server error occurred.",
            "details": {}
        }), 500
