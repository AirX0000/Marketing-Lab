from typing import Optional, List, Dict, Any
from datetime import datetime, timezone
import json
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, Float, Boolean, Text, ForeignKey, JSON
from app.models.base import db, TimestampMixin

class DiagnosticTest(TimestampMixin, db.Model):
    __tablename__ = "diagnostic_tests"

    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    target_domain: Mapped[str] = mapped_column(String(50), default="IT", nullable=False)  # IT, Business, Leadership
    duration_minutes: Mapped[int] = mapped_column(Integer, default=20, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    questions = relationship(
        "DiagnosticQuestion", 
        back_populates="test", 
        cascade="all, delete-orphan", 
        order_by="DiagnosticQuestion.order_index"
    )
    attempts = relationship(
        "DiagnosticAttempt", 
        back_populates="test", 
        cascade="all, delete-orphan"
    )

    def to_dict(self, include_questions: bool = False) -> Dict[str, Any]:
        data = {
            "id": self.id,
            "slug": self.slug,
            "title": self.title,
            "target_domain": self.target_domain,
            "duration_minutes": self.duration_minutes,
            "questions_count": len(self.questions) if self.questions else 0,
            "is_active": self.is_active
        }
        if include_questions:
            data["questions"] = [q.to_dict(include_answers=False) for q in self.questions]
        return data


class DiagnosticQuestion(TimestampMixin, db.Model):
    __tablename__ = "diagnostic_questions"

    test_id: Mapped[str] = mapped_column(String(36), ForeignKey("diagnostic_tests.id", ondelete="CASCADE"), index=True, nullable=False)
    order_index: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    section: Mapped[str] = mapped_column(String(50), nullable=False)  # grammar, tech_vocab, architecture_reading, business_negotiation
    cefr_level: Mapped[str] = mapped_column(String(5), nullable=False)  # A2, B1, B2, C1, C2
    prompt: Mapped[str] = mapped_column(Text, nullable=False)
    context_snippet: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    options: Mapped[List[Dict[str, Any]]] = mapped_column(JSON, nullable=False)
    weight: Mapped[int] = mapped_column(Integer, default=1, nullable=False)

    test = relationship("DiagnosticTest", back_populates="questions")

    def to_dict(self, include_answers: bool = False) -> Dict[str, Any]:
        clean_options = []
        for opt in (self.options or []):
            item = {
                "id": opt.get("id"),
                "text": opt.get("text")
            }
            if include_answers:
                item["is_correct"] = opt.get("is_correct", False)
                item["explanation"] = opt.get("explanation", "")
            clean_options.append(item)

        return {
            "id": self.id,
            "order_index": self.order_index,
            "section": self.section,
            "cefr_level": self.cefr_level,
            "prompt": self.prompt,
            "context_snippet": self.context_snippet,
            "options": clean_options,
            "weight": self.weight
        }


class DiagnosticAttempt(TimestampMixin, db.Model):
    __tablename__ = "diagnostic_attempts"

    user_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("users.id", ondelete="SET NULL"), index=True, nullable=True)
    test_id: Mapped[str] = mapped_column(String(36), ForeignKey("diagnostic_tests.id", ondelete="CASCADE"), index=True, nullable=False)
    
    # Lead acquisition details (if anonymous prior to checkout)
    lead_email: Mapped[Optional[str]] = mapped_column(String(255), index=True, nullable=True)
    lead_name: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)
    lead_phone: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    
    # Scores
    score_total: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    score_percentage: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    assigned_cefr: Mapped[str] = mapped_column(String(5), nullable=False)  # e.g., 'B2'
    
    grammar_score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    tech_vocab_score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    comprehension_score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    
    answers_payload: Mapped[Dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)
    detailed_recommendations: Mapped[List[Dict[str, Any]]] = mapped_column(JSON, default=list, nullable=False)
    completed_at: Mapped[datetime] = mapped_column(
        db.DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )

    user = relationship("User", back_populates="diagnostic_attempts", foreign_keys=[user_id])
    test = relationship("DiagnosticTest", back_populates="attempts")

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "user_id": self.user_id,
            "test_id": self.test_id,
            "lead_name": self.lead_name,
            "lead_email": self.lead_email,
            "score_total": self.score_total,
            "score_percentage": round(self.score_percentage, 1),
            "assigned_cefr": self.assigned_cefr,
            "breakdown": {
                "grammar_score": round(self.grammar_score, 1),
                "tech_vocab_score": round(self.tech_vocab_score, 1),
                "comprehension_score": round(self.comprehension_score, 1),
            },
            "detailed_recommendations": self.detailed_recommendations,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None
        }
