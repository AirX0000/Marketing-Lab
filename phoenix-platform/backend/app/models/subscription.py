from typing import Optional, Dict, Any
from datetime import datetime, timezone
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Float, DateTime, ForeignKey
from app.models.base import db, TimestampMixin

class Subscription(TimestampMixin, db.Model):
    __tablename__ = "subscriptions"

    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False)
    tier: Mapped[str] = mapped_column(String(50), nullable=False)  # starter_diagnostic, pro_career, enterprise_b2b
    status: Mapped[str] = mapped_column(String(30), default="active", nullable=False)  # active, past_due, canceled
    period_start: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    period_end: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    amount_usd: Mapped[float] = mapped_column(Float, nullable=False)
    payment_provider: Mapped[str] = mapped_column(String(50), default="stripe", nullable=False)
    provider_subscription_id: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    user = relationship("User", back_populates="subscriptions")

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tier": self.tier,
            "status": self.status,
            "period_start": self.period_start.isoformat() if self.period_start else None,
            "period_end": self.period_end.isoformat() if self.period_end else None,
            "amount_usd": self.amount_usd,
            "payment_provider": self.payment_provider
        }
