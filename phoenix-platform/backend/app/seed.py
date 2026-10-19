from datetime import datetime, timezone
from app.models.base import db
from app.models.user import User
from app.models.diagnostic import DiagnosticTest, DiagnosticQuestion
from app.models.course import Course, CourseModule, Lesson

def run_seed():
    """Populate production-grade initial seed dataset for Phoenix Learning Center."""
    # 1. Seed Demo Users
    admin_user = db.session.query(User).filter_by(email="admin@phoenix-edtech.io").first()
    if not admin_user:
        admin_user = User(
            email="admin@phoenix-edtech.io",
            full_name="Dr. Elena Rostova",
            role="admin",
            cefr_level="C2",
            target_domain="Executive",
            xp_points=5400,
            streak_days=42
        )
        admin_user.set_password("PhoenixAdmin2026!")
        db.session.add(admin_user)

    student_user = db.session.query(User).filter_by(email="alex.dev@gmail.com").first()
    if not student_user:
        student_user = User(
            email="alex.dev@gmail.com",
            full_name="Alexey Morozov",
            role="student",
            cefr_level="B2",
            target_domain="IT",
            xp_points=1250,
            streak_days=7,
            telegram_username="alex_dev_lead"
        )
        student_user.set_password("StudentPass2026!")
        db.session.add(student_user)

    # 2. Seed CEFR Diagnostic Placement Test
    test = db.session.query(DiagnosticTest).filter_by(slug="cefr-it-business-diagnostic").first()
    if not test:
        test = DiagnosticTest(
            slug="cefr-it-business-diagnostic",
            title="CEFR Diagnostic Assessment: English for Software Engineering & Tech Leadership",
            target_domain="IT",
            duration_minutes=20,
            is_active=True
        )
        db.session.add(test)
        db.session.flush()

        questions_data = [
            {
                "order_index": 1,
                "section": "grammar",
                "cefr_level": "B1",
                "prompt": "Choose the most professional grammatical phrasing for daily standup blocker reporting:",
                "context_snippet": "Standup Context: You are blocked waiting on the DevOps team to provision the Redis cluster.",
                "weight": 1,
                "options": [
                    {"id": "a", "text": "I wait Redis from DevOps so I do nothing.", "is_correct": False, "explanation": "Grammatically incorrect and unprofessional tone."},
                    {"id": "b", "text": "I am currently blocked by the Redis provisioning, which DevOps is handling.", "is_correct": True, "explanation": "Correct present continuous passive voice, clear and professional."},
                    {"id": "c", "text": "Redis is blocking my task because DevOps was slow.", "is_correct": False, "explanation": "Confrontational tone and flawed tense agreement."},
                    {"id": "d", "text": "I would wait until Redis will be ready.", "is_correct": False, "explanation": "Incorrect conditional clause construction."}
                ]
            },
            {
                "order_index": 2,
                "section": "tech_vocab",
                "cefr_level": "B2",
                "prompt": "Identify the term that describes an API design ensuring an operation produces the identical outcome when executed multiple times:",
                "context_snippet": "Architecture Spec: In distributed payment gateways, network timeouts require retries without duplicate charges.",
                "weight": 2,
                "options": [
                    {"id": "a", "text": "Asynchronous concurrency", "is_correct": False, "explanation": "Concurrency refers to simultaneous task execution, not outcome consistency."},
                    {"id": "b", "text": "Idempotency", "is_correct": True, "explanation": "An idempotent operation can be called multiple times without altering the result beyond the initial application."},
                    {"id": "c", "text": "Polymorphism", "is_correct": False, "explanation": "Polymorphism is an OOP concept allowing objects to take various forms."},
                    {"id": "d", "text": "Horizontal sharding", "is_correct": False, "explanation": "Sharding is database partitioning across nodes."}
                ]
            },
            {
                "order_index": 3,
                "section": "grammar",
                "cefr_level": "B2",
                "prompt": "Select the correct conditional sentence for explaining architectural tradeoffs to an overseas client:",
                "context_snippet": "Client Meeting: Discussing whether to migrate to microservices now or maintain the monolith.",
                "weight": 2,
                "options": [
                    {"id": "a", "text": "If we were to decouple the auth service today, latency would temporarily spike during data migration.", "is_correct": True, "explanation": "Correct second conditional with formal subjunctive 'were to', appropriate for technical forecasting."},
                    {"id": "b", "text": "If we decouple the service, latency would have spiked.", "is_correct": False, "explanation": "Mismatched conditional tenses."},
                    {"id": "c", "text": "If we decoupled the service, latency will spike.", "is_correct": False, "explanation": "Mixed conditional error."},
                    {"id": "d", "text": "Unless we don't decouple, latency would not spike.", "is_correct": False, "explanation": "Double negative error with 'unless'."}
                ]
            },
            {
                "order_index": 4,
                "section": "architecture_reading",
                "cefr_level": "C1",
                "prompt": "Read the incident post-mortem excerpt below. What is the root cause and mitigation strategy stated by the Tech Lead?",
                "context_snippet": "\"Post-Mortem Extract: At 14:22 UTC, the ingestion worker pool experienced thread starvation owing to unhandled connection pooling exhaustion against our primary replica. Rather than merely vertically scaling compute instances, we propose implementing a circuit breaker with exponential backoff and jitter.\"",
                "weight": 3,
                "options": [
                    {"id": "a", "text": "Primary hardware failure mitigated by adding more CPU cores to the database server.", "is_correct": False, "explanation": "The text explicitly states 'rather than vertically scaling compute'."},
                    {"id": "b", "text": "Connection pool exhaustion mitigated by circuit-breaking and rate-backoff algorithms.", "is_correct": True, "explanation": "Accurately synthesizes both the root cause and algorithmic mitigation."},
                    {"id": "c", "text": "A DDoS attack mitigated by migrating to another cloud region.", "is_correct": False, "explanation": "No DDoS attack was mentioned."},
                    {"id": "d", "text": "Worker threads stalled due to incorrect CSS bundle imports.", "is_correct": False, "explanation": "Irrelevant frontend artifact."}
                ]
            },
            {
                "order_index": 5,
                "section": "tech_vocab",
                "cefr_level": "B2",
                "prompt": "Which phrasing best conveys 'hedging' (deliberate professional caution) when code reviewing a colleague's PR?",
                "context_snippet": "GitHub PR Review: You notice a raw SQL query that could risk performance under high concurrency.",
                "weight": 2,
                "options": [
                    {"id": "a", "text": "This SQL is awful and will crash production immediately.", "is_correct": False, "explanation": "Hostile, unprofessional, and lacks constructive technical tone."},
                    {"id": "b", "text": "Might it be safer to parameterize this query via the ORM repository, lest we inadvertently incur N+1 performance penalties?", "is_correct": True, "explanation": "Diplomatic, highly articulate modal phrasing standard in international engineering teams."},
                    {"id": "c", "text": "Rewrite query right now please.", "is_correct": False, "explanation": "Abrupt imperative lacking technical rationale."},
                    {"id": "d", "text": "I think SQL is bad, change it.", "is_correct": False, "explanation": "Vague and lacks precision."}
                ]
            },
            {
                "order_index": 6,
                "section": "business_negotiation",
                "cefr_level": "C1",
                "prompt": "In an executive salary or contractor rate negotiation, which response strategically defends your value without sounding adversarial?",
                "context_snippet": "Hiring Manager: 'Your requested hourly rate of $95 is slightly above our allocated band for this remote role.'",
                "weight": 3,
                "options": [
                    {"id": "a", "text": "Either pay me $95 or I walk away immediately.", "is_correct": False, "explanation": "Unnecessary ultimatum that kills negotiation rapport."},
                    {"id": "b", "text": "I understand budget constraints are top of mind. Given my track record in slashing cloud costs by 34% in my last tenure, I'm confident the ROI will outweigh the differential. Could we explore a performance milestone review at 90 days?", "is_correct": True, "explanation": "Classic C1/C2 executive negotiation: validates counterparty concern, anchors to tangible ROI, and proposes an objective milestone."},
                    {"id": "c", "text": "Okay fine, I can work for $50 instead.", "is_correct": False, "explanation": "Complete surrender of leverage."},
                    {"id": "d", "text": "You don't understand the market rate in 2026.", "is_correct": False, "explanation": "Patronizing tone."}
                ]
            }
        ]

        for q_data in questions_data:
            q = DiagnosticQuestion(
                test_id=test.id,
                order_index=q_data["order_index"],
                section=q_data["section"],
                cefr_level=q_data["cefr_level"],
                prompt=q_data["prompt"],
                context_snippet=q_data["context_snippet"],
                options=q_data["options"],
                weight=q_data["weight"]
            )
            db.session.add(q)

    # 3. Seed Production Courses
    course_slug = "it-engineering-standups-pull-requests"
    course = db.session.query(Course).filter_by(slug=course_slug).first()
    if not course:
        course = Course(
            slug=course_slug,
            title="IT Standups, Architecture Reviews & Pull Requests",
            tagline="Speak with confidence in global engineering teams and author bulletproof technical documentation.",
            description="A rigorous CEFR B1-B2 curriculum designed specifically for backend, frontend, and DevOps engineers working in cross-border agile teams.",
            cefr_level="B2",
            track="Engineering",
            modules_count=3,
            estimated_hours=24,
            is_published=True
        )
        db.session.add(course)
        db.session.flush()

        # Module 1
        m1 = CourseModule(
            course_id=course.id,
            order_index=1,
            title="Module 1: Daily Standups & Blocker Reporting",
            summary="Master the 3-step agile standup formula: past progress, today's sprint goal, and unblocking dependencies with diplomatic assertiveness."
        )
        db.session.add(m1)
        db.session.flush()

        l1 = Lesson(
            module_id=m1.id,
            order_index=1,
            title="Lesson 1.1: The 'Yesterday / Today / Blockers' Modern Playbook",
            content_markdown="""### The Agile Standup Blueprint
Global engineering standups fail when engineers recount minute commit details. High-performing engineers communicate business impact.

#### 1. The Core Three-Sentence Structure:
- **Yesterday:** "I finalized the payment retry logic and merged PR #402."
- **Today:** "My focus is writing integration tests for the Stripe webhook handlers."
- **Blocker:** "I'm currently waiting on staging credentials from the Security team."

#### 2. Essential Vocabulary & Phrasal Verbs:
- *To wrap up* (finish): "Wrapping up the database migration script."
- *To run into* (encounter): "Ran into an intermittent timeout on the auth proxy."
- *To hand off* (transfer): "Handing off the UI design specs to the mobile team."
""",
            scenario_roleplay={
                "scenario_title": "Daily Morning Standup Simulation",
                "character": "Sprint Master Dave",
                "dialogue": [
                    {"speaker": "Dave", "text": "Morning team! Alex, what's your update on ticket ENG-104?"},
                    {"speaker": "You", "text": "Morning Dave. Yesterday I finalized the JWT rotation middleware and pushed tests. Today I'm tackling the rate-limiter configuration. No blockers at this time."}
                ]
            },
            xp_reward=60
        )
        db.session.add(l1)

        l2 = Lesson(
            module_id=m1.id,
            order_index=2,
            title="Lesson 1.2: Diplomatic Disagreement in Sprint Planning",
            content_markdown="""### How to Push Back on Unrealistic Deadlines
When a Product Owner asks to compress a two-sprint migration into 3 days, avoid blunt refusals. Use 'Conditional Alignment'.

#### High-Impact Phrases:
- "We can certainly expedite the MVP launch; however, that would necessitate deferring automated end-to-end tests."
- "Given our existing technical debt in that service, estimating three days carries a substantial regression risk."
""",
            scenario_roleplay={
                "scenario_title": "Sprint Planning Estimation Conflict",
                "character": "Product Manager Sarah",
                "dialogue": [
                    {"speaker": "Sarah", "text": "Can we ship both the redesign and the database re-indexing by Friday?"},
                    {"speaker": "You", "text": "If we aim for Friday on both, we risk database lockups in peak hours. I recommend we ship the UI first and schedule the re-indexing during our Sunday maintenance window."}
                ]
            },
            xp_reward=75
        )
        db.session.add(l2)

    db.session.commit()
    print("Database seeding completed successfully.")
