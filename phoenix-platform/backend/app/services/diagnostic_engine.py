from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from app.models.base import db
from app.models.diagnostic import DiagnosticTest, DiagnosticQuestion, DiagnosticAttempt
from app.models.user import User
from app.models.progress import ActivityLog
from app.schemas.diagnostic import SubmitDiagnosticSchema
from app.utils.errors import NotFoundError, BadRequestError

class DiagnosticEngine:
    @staticmethod
    def calculate_cefr(score_percentage: float) -> str:
        """Map empirical percentage score to CEFR international scale."""
        if score_percentage < 35.0:
            return "A2"
        elif score_percentage < 55.0:
            return "B1"
        elif score_percentage < 75.0:
            return "B2"
        elif score_percentage < 90.0:
            return "C1"
        else:
            return "C2"

    @staticmethod
    def generate_recommendations(cefr: str, section_scores: Dict[str, float]) -> List[Dict[str, Any]]:
        """Generate actionable, career-focused learning trajectory based on test performance."""
        recs = []

        if section_scores.get("grammar", 100) < 70:
            recs.append({
                "focus_area": "Technical Accuracy & Modals",
                "priority": "High",
                "advice": "Practice passive voice and modal hedging ('could potentially degrade latency', 'might necessitate horizontal sharding') for incident reports and architecture documents."
            })
        else:
            recs.append({
                "focus_area": "Complex Syntactic Nuances",
                "priority": "Medium",
                "advice": "Good grammatical foundation. Elevate to nuanced conditional clauses in contracts, SLA definitions, and executive tradeoff proposals."
            })

        if section_scores.get("tech_vocab", 100) < 70:
            recs.append({
                "focus_area": "Systems Architecture & Domain Lexicon",
                "priority": "High",
                "advice": "Expand specialized DevOps, microservice patterns, and distributed consensus terminology. Focus on precise verbs ('propagate', 'deprecate', 'decouple', 'orchestrate')."
            })
        else:
            recs.append({
                "focus_area": "Idiomatic Tech Discourse",
                "priority": "Low",
                "advice": "Solid mastery of industry terms. Focus on contextual storytelling when explaining complex system bottlenecks to non-technical stakeholders."
            })

        if section_scores.get("comprehension", 100) < 70:
            recs.append({
                "focus_area": "Stakeholder Reading & Cross-Functional Discourse",
                "priority": "High",
                "advice": "Improve inference skills in fast-paced Slack/Async communication, PR review comments, and conflicting requirements from product managers."
            })
        else:
            recs.append({
                "focus_area": "C-Suite & Board Pitching",
                "priority": "Medium",
                "advice": "Ready for high-stakes business pitches, venture presentations, and international conference keynotes."
            })

        # Track recommendation
        if cefr in ["A2", "B1"]:
            recs.append({
                "suggested_track": "IT Standup & PR Review Sprint (CEFR B1-B2)",
                "duration": "8 Weeks",
                "target_outcome": "Confident speaking in daily standups, bug triage, and asynchronous GitHub discussions."
            })
        elif cefr == "B2":
            recs.append({
                "suggested_track": "Architectural Design & Cross-Functional Leadership (CEFR B2-C1)",
                "duration": "10 Weeks",
                "target_outcome": "Authoring RFCs, conducting system design interviews, and negotiating product scope with US/EU clients."
            })
        else:
            recs.append({
                "suggested_track": "Executive Tech Leadership & Global Offer Negotiation (CEFR C1-C2)",
                "duration": "6 Weeks",
                "target_outcome": "Mastering board presentations, compensation package negotiation, and keynote public speaking."
            })

        return recs

    @classmethod
    def evaluate_test(cls, payload: SubmitDiagnosticSchema, user_id: Optional[str] = None) -> DiagnosticAttempt:
        """Grade diagnostic assessment, calculate section metrics, and save attempt."""
        test = db.session.query(DiagnosticTest).filter_by(id=payload.test_id).first()
        if not test:
            raise NotFoundError("Diagnostic test not found.")

        # Map questions for fast lookup
        questions = {q.id: q for q in test.questions}
        if not questions:
            raise BadRequestError("This test has no configured assessment items.")

        total_weight = 0
        earned_weight = 0

        section_totals = {"grammar": 0, "tech_vocab": 0, "comprehension": 0}
        section_earned = {"grammar": 0, "tech_vocab": 0, "comprehension": 0}

        evaluated_answers = []

        for item in payload.answers:
            q = questions.get(item.question_id)
            if not q:
                continue

            # Standardize section key
            sec = "comprehension"
            if "grammar" in q.section:
                sec = "grammar"
            elif "vocab" in q.section:
                sec = "tech_vocab"

            total_weight += q.weight
            section_totals[sec] += q.weight

            is_correct = False
            correct_option_id = None
            explanation = ""

            for opt in q.options:
                if opt.get("is_correct"):
                    correct_option_id = opt.get("id")
                    explanation = opt.get("explanation", "")
                if opt.get("id") == item.selected_option_id and opt.get("is_correct"):
                    is_correct = True

            if is_correct:
                earned_weight += q.weight
                section_earned[sec] += q.weight

            evaluated_answers.append({
                "question_id": q.id,
                "selected_option_id": item.selected_option_id,
                "is_correct": is_correct,
                "correct_option_id": correct_option_id,
                "explanation": explanation
            })

        score_percentage = (earned_weight / total_weight * 100.0) if total_weight > 0 else 0.0
        cefr = cls.calculate_cefr(score_percentage)

        sec_scores = {}
        for sec in ["grammar", "tech_vocab", "comprehension"]:
            tot = section_totals[sec]
            earn = section_earned[sec]
            sec_scores[sec] = (earn / tot * 100.0) if tot > 0 else 100.0

        recommendations = cls.generate_recommendations(cefr, sec_scores)

        attempt = DiagnosticAttempt(
            user_id=user_id,
            test_id=test.id,
            lead_name=payload.lead_name,
            lead_email=str(payload.lead_email) if payload.lead_email else None,
            lead_phone=payload.lead_phone,
            score_total=earned_weight,
            score_percentage=score_percentage,
            assigned_cefr=cefr,
            grammar_score=sec_scores["grammar"],
            tech_vocab_score=sec_scores["tech_vocab"],
            comprehension_score=sec_scores["comprehension"],
            answers_payload={"evaluated": evaluated_answers},
            detailed_recommendations=recommendations,
            completed_at=datetime.now(timezone.utc)
        )

        db.session.add(attempt)

        # If user is authenticated, update their permanent CEFR & award completion XP
        if user_id:
            user = db.session.query(User).filter_by(id=user_id).first()
            if user:
                user.cefr_level = cefr
                user.xp_points += 250
                user.update_streak()
                
                # Log activity
                log = ActivityLog(
                    user_id=user.id,
                    activity_type="diagnostic_completed",
                    details={"cefr": cefr, "score": score_percentage},
                    xp_earned=250
                )
                db.session.add(log)

        db.session.commit()
        return attempt
