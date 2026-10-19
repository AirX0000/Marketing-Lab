from flask import Blueprint, jsonify, request, g
from app.models.base import db
from app.models.course import Course, Lesson
from app.models.progress import UserProgress
from app.schemas.course import CompleteLessonSchema
from app.services.gamification_engine import GamificationEngine
from app.utils.decorators import jwt_required, optional_jwt, validate_payload
from app.utils.errors import NotFoundError

courses_bp = Blueprint("courses", __name__, url_prefix="/api/v1/courses")

@courses_bp.route("", methods=["GET"])
def list_courses():
    """List published courses with optional track or CEFR filtering."""
    track = request.args.get("track")
    cefr = request.args.get("cefr")

    query = db.session.query(Course).filter_by(is_published=True)
    if track:
        query = query.filter_by(track=track)
    if cefr:
        query = query.filter_by(cefr_level=cefr)

    courses = query.all()
    return jsonify({
        "status": "success",
        "data": [c.to_dict(include_modules=False) for c in courses]
    }), 200

@courses_bp.route("/<slug>", methods=["GET"])
@optional_jwt
def get_course(slug: str):
    """Retrieve course syllabus and modules."""
    course = db.session.query(Course).filter_by(slug=slug, is_published=True).first()
    if not course:
        raise NotFoundError("Course not found.")

    data = course.to_dict(include_modules=True)

    # If authenticated, enrich with user completion status
    user_id = getattr(g, "current_user_id", None)
    if user_id:
        completed_lessons = set(
            p.lesson_id for p in db.session.query(UserProgress.lesson_id).filter_by(
                user_id=user_id, status="completed"
            ).all()
        )
        for mod in data.get("modules", []):
            for les in mod.get("lessons", []):
                les["is_completed"] = les["id"] in completed_lessons

    return jsonify({
        "status": "success",
        "data": data
    }), 200

@courses_bp.route("/lessons/<lesson_id>", methods=["GET"])
@optional_jwt
def get_lesson(lesson_id: str):
    """Retrieve full lesson material, interactive roleplay dialogues, and XP reward."""
    lesson = db.session.query(Lesson).filter_by(id=lesson_id).first()
    if not lesson:
        raise NotFoundError("Lesson not found.")

    data = lesson.to_dict()
    user_id = getattr(g, "current_user_id", None)
    if user_id:
        progress = db.session.query(UserProgress).filter_by(user_id=user_id, lesson_id=lesson_id).first()
        data["user_progress"] = progress.to_dict() if progress else None

    return jsonify({
        "status": "success",
        "data": data
    }), 200

@courses_bp.route("/lessons/<lesson_id>/complete", methods=["POST"])
@jwt_required
@validate_payload(CompleteLessonSchema)
def complete_lesson(lesson_id: str):
    """Record completion of lesson, award XP, update streak, and recalculate level."""
    lesson = db.session.query(Lesson).filter_by(id=lesson_id).first()
    if not lesson:
        raise NotFoundError("Lesson not found.")

    payload = g.validated_data
    result = GamificationEngine.record_lesson_completion(
        user_id=g.current_user_id,
        lesson_id=lesson.id,
        score=payload.quiz_score or 100,
        xp_reward=lesson.xp_reward
    )

    return jsonify({
        "status": "success",
        "message": f"Lesson completed! +{result.get('xp_earned', 0)} XP awarded.",
        "data": result
    }), 200
