from app.schemas.auth import UserRegisterSchema, UserLoginSchema, RefreshTokenSchema, TelegramLinkSchema
from app.schemas.diagnostic import SubmitDiagnosticSchema, AnswerSubmissionItem, LeadCaptureSchema
from app.schemas.course import CompleteLessonSchema

__all__ = [
    "UserRegisterSchema",
    "UserLoginSchema",
    "RefreshTokenSchema",
    "TelegramLinkSchema",
    "SubmitDiagnosticSchema",
    "AnswerSubmissionItem",
    "LeadCaptureSchema",
    "CompleteLessonSchema"
]
