from typing import Optional, Dict, Any
from pydantic import BaseModel, Field

class CompleteLessonSchema(BaseModel):
    quiz_score: Optional[int] = Field(100, ge=0, le=100)
    roleplay_submission: Optional[str] = Field(None, max_length=2000)
    time_spent_seconds: Optional[int] = Field(300, ge=10)
