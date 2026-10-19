from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, Boolean, Text, ForeignKey, JSON
from app.models.base import db, TimestampMixin

class Course(TimestampMixin, db.Model):
    __tablename__ = "courses"

    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    tagline: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    cefr_level: Mapped[str] = mapped_column(String(5), nullable=False)  # B1, B2, C1, C2
    track: Mapped[str] = mapped_column(String(50), nullable=False)  # Engineering, Product, Executive
    modules_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    estimated_hours: Mapped[int] = mapped_column(Integer, default=30, nullable=False)
    is_published: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    modules = relationship("CourseModule", back_populates="course", cascade="all, delete-orphan", order_by="CourseModule.order_index")

    def to_dict(self, include_modules: bool = False) -> Dict[str, Any]:
        data = {
            "id": self.id,
            "slug": self.slug,
            "title": self.title,
            "tagline": self.tagline,
            "description": self.description,
            "cefr_level": self.cefr_level,
            "track": self.track,
            "modules_count": len(self.modules) if self.modules else self.modules_count,
            "estimated_hours": self.estimated_hours,
            "is_published": self.is_published
        }
        if include_modules:
            data["modules"] = [m.to_dict(include_lessons=True) for m in self.modules]
        return data


class CourseModule(TimestampMixin, db.Model):
    __tablename__ = "course_modules"

    course_id: Mapped[str] = mapped_column(String(36), ForeignKey("courses.id", ondelete="CASCADE"), index=True, nullable=False)
    order_index: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    summary: Mapped[str] = mapped_column(Text, nullable=False)

    course = relationship("Course", back_populates="modules")
    lessons = relationship("Lesson", back_populates="module", cascade="all, delete-orphan", order_by="Lesson.order_index")

    def to_dict(self, include_lessons: bool = False) -> Dict[str, Any]:
        data = {
            "id": self.id,
            "course_id": self.course_id,
            "order_index": self.order_index,
            "title": self.title,
            "summary": self.summary,
            "lessons_count": len(self.lessons) if self.lessons else 0
        }
        if include_lessons:
            data["lessons"] = [l.to_dict() for l in self.lessons]
        return data


class Lesson(TimestampMixin, db.Model):
    __tablename__ = "lessons"

    module_id: Mapped[str] = mapped_column(String(36), ForeignKey("course_modules.id", ondelete="CASCADE"), index=True, nullable=False)
    order_index: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    content_markdown: Mapped[str] = mapped_column(Text, nullable=False)
    scenario_roleplay: Mapped[Dict[str, Any]] = mapped_column(JSON, default=dict, nullable=False)
    xp_reward: Mapped[int] = mapped_column(Integer, default=50, nullable=False)

    module = relationship("CourseModule", back_populates="lessons")
    progress = relationship("UserProgress", back_populates="lesson", cascade="all, delete-orphan")

    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "module_id": self.module_id,
            "order_index": self.order_index,
            "title": self.title,
            "content_markdown": self.content_markdown,
            "scenario_roleplay": self.scenario_roleplay,
            "xp_reward": self.xp_reward
        }
