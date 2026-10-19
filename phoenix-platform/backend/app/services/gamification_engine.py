from typing import Dict, Any, List
from app.models.base import db
from app.models.user import User
from app.models.progress import UserProgress, ActivityLog

class GamificationEngine:
    @staticmethod
    def get_level_info(xp: int) -> Dict[str, Any]:
        """Compute student rank and progress to next level based on XP."""
        # Level thresholds: Level 1 (0 XP), Level 2 (300 XP), Level 3 (800 XP), Level 4 (1500 XP), Level 5 (2500 XP)
        tiers = [
            (1, "Junior Contributor", 0, 300),
            (2, "Middle Associate", 300, 800),
            (3, "Senior Specialist", 800, 1500),
            (4, "Lead Communicator", 1500, 2500),
            (5, "Principal Executive", 2500, 5000),
        ]

        current_level = 1
        rank_name = "Junior Contributor"
        next_xp = 300
        prev_xp = 0

        for lvl, title, min_x, max_x in tiers:
            if xp >= min_x:
                current_level = lvl
                rank_name = title
                prev_xp = min_x
                next_xp = max_x

        progress_in_level = max(0, min(100, int((xp - prev_xp) / (next_xp - prev_xp) * 100))) if next_xp > prev_xp else 100

        return {
            "level": current_level,
            "rank_title": rank_name,
            "current_xp": xp,
            "next_level_xp": next_xp,
            "level_progress_percentage": progress_in_level
        }

    @classmethod
    def record_lesson_completion(cls, user_id: str, lesson_id: str, score: int, xp_reward: int) -> Dict[str, Any]:
        """Record lesson completion, award XP, and maintain engagement streak."""
        user = db.session.query(User).filter_by(id=user_id).first()
        if not user:
            return {}

        existing_progress = db.session.query(UserProgress).filter_by(
            user_id=user_id, 
            lesson_id=lesson_id
        ).first()

        is_first_time = existing_progress is None

        if is_first_time:
            progress = UserProgress(
                user_id=user_id,
                lesson_id=lesson_id,
                status="completed",
                score=score
            )
            db.session.add(progress)
            
            # Award full XP first time
            user.xp_points += xp_reward
            user.update_streak()

            log = ActivityLog(
                user_id=user_id,
                activity_type="lesson_completed",
                details={"lesson_id": lesson_id, "score": score},
                xp_earned=xp_reward
            )
            db.session.add(log)
        else:
            # Review mode (repeat completion gives nominal 10 XP)
            if score > existing_progress.score:
                existing_progress.score = score
            user.xp_points += 10
            user.update_streak()

            log = ActivityLog(
                user_id=user_id,
                activity_type="lesson_reviewed",
                details={"lesson_id": lesson_id},
                xp_earned=10
            )
            db.session.add(log)

        db.session.commit()
        return {
            "user": user.to_dict(),
            "level_info": cls.get_level_info(user.xp_points),
            "xp_earned": xp_reward if is_first_time else 10
        }

    @staticmethod
    def get_leaderboard(limit: int = 10) -> List[Dict[str, Any]]:
        """Fetch top learners for community gamification."""
        top_users = db.session.query(User).filter(
            User.is_active == True,
            User.role != "admin"
        ).order_by(User.xp_points.desc()).limit(limit).all()

        results = []
        for idx, u in enumerate(top_users):
            results.append({
                "rank": idx + 1,
                "full_name": u.full_name,
                "cefr_level": u.cefr_level or "Unassessed",
                "target_domain": u.target_domain,
                "xp_points": u.xp_points,
                "streak_days": u.streak_days
            })
        return results
