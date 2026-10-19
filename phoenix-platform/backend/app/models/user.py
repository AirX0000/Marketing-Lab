from typing import Optional, List, Dict, Any
from datetime import datetime, date, timezone
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, Boolean, Date, BigInteger
from app.models.base import db, TimestampMixin
from app.utils.security import verify_password, hash_password

class User(TimestampMixin, db.Model):
    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    role: Mapped[str] = mapped_column(String(30), default="student", nullable=False)  # student, corporate_lead, admin
    
    # CEFR Leveling and Track
    cefr_level: Mapped[Optional[str]] = mapped_column(String(5), nullable=True)  # A1, A2, B1, B2, C1, C2
    target_domain: Mapped[str] = mapped_column(String(50), default="IT", nullable=False)  # IT, Business, Executive
    
    # Gamification Attributes
    xp_points: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    streak_days: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    last_active_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    
    # Telegram Integration
    telegram_id: Mapped[Optional[str]] = mapped_column(String(50), unique=True, index=True, nullable=True)
    telegram_username: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    
    # Status
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Relationships
    diagnostic_attempts = relationship("DiagnosticAttempt", back_populates="user", cascade="all, delete-orphan", foreign_keys="DiagnosticAttempt.user_id")
    progress = relationship("UserProgress", back_populates="user", cascade="all, delete-orphan")
    subscriptions = relationship("Subscription", back_populates="user", cascade="all, delete-orphan")
    activity_logs = relationship("ActivityLog", back_populates="user", cascade="all, delete-orphan")

    def check_password(self, plain_password: str) -> bool:
        return verify_password(plain_password, self.password_hash)

    def set_password(self, plain_password: str):
        self.password_hash = hash_password(plain_password)

    def update_streak(self):
        """Update daily streak logic cleanly."""
        today = datetime.now(timezone.utc).date()
        if not self.last_active_date:
            self.streak_days = 1
            self.last_active_date = today
        elif self.last_active_date == today:
            return  # Already recorded today
        elif (today - self.last_active_date).days == 1:
            self.streak_days += 1
            self.last_active_date = today
        else:
            self.streak_days = 1  # Streak broken
            self.last_active_date = today

    def to_dict(self, include_sensitive: bool = False) -> Dict[str, Any]:
        data = {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
            "role": self.role,
            "cefr_level": self.cefr_level,
            "target_domain": self.target_domain,
            "xp_points": self.xp_points,
            "streak_days": self.streak_days,
            "telegram_id": self.telegram_id,
            "telegram_username": self.telegram_username,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
        return data
