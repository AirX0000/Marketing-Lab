from typing import Optional, Dict, Any
from datetime import datetime, timezone
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, DateTime, ForeignKey, UniqueConstraint, JSON
from app.models.base import db, TimestampMixin

class UserProgress(TimestampMixin, db.Model):
    __tablename__ = "user_progress"
    __table_args__ = (
        UniqueConstraint("user_id", "lesson_id", name="uq_user_lesson_progress"),
    )

    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    lesson_id: Mapped[str] = mapped_column(String(36), ForeignKey("lessons.id", ondelete="CASCADE"), index=True, nullable=False)
    status: Mapped[str] = mapped_column(String(30), default="completed", nullable=False)  # in_progress, completed
    score: Mapped[int] = mapped_column(Integer, default=100, nullable=False)
    completed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    user = relationship("User", back_populates="progress")
    lesson = relationship("Lesson", back_populates="progress")

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "user_id": self.user_id,
            "lesson_id": self.lesson_id,
            "status": self.status,
            "score": self.score,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None
        }


class ActivityLog(TimestampMixin, db.Model):
    __tablename__ = "activity_logs"

    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    activity_type: Mapped[str] = mapped_column(String(50), nullable=False)  # test_completed, lesson_finished, streak_milestone, telegram_synced
    details: Mapped[Dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)
    xp_earned: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    user = relationship("User", back_populates="activity_logs")

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "user_id": self.user_id,
            "activity_type": self.activity_type,
            "details": self.details,
            "xp_earned": self.xp_earned,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
