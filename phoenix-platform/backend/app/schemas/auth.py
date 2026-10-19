import re
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator

class UserRegisterSchema(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=100)
    full_name: str = Field(..., min_length=2, max_length=120)
    target_domain: Optional[str] = Field("IT", max_length=50)

    @field_validator("password")
    @classmethod
    def validate_password_complexity(cls, v: str) -> str:
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one numerical digit.")
        if not re.search(r"[A-Za-z]", v):
            raise ValueError("Password must contain at least one letter.")
        return v

    @field_validator("full_name")
    @classmethod
    def sanitize_full_name(cls, v: str) -> str:
        clean = v.strip()
        if len(clean) < 2:
            raise ValueError("Full name must be at least 2 characters.")
        return clean


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=1)


class RefreshTokenSchema(BaseModel):
    refresh_token: str = Field(..., min_length=10)


class TelegramLinkSchema(BaseModel):
    telegram_id: str = Field(..., min_length=3, max_length=50)
    telegram_username: Optional[str] = Field(None, max_length=100)
    auth_date: Optional[int] = None
    hash: Optional[str] = None
