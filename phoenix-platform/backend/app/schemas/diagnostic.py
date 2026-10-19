from typing import List, Optional, Dict
from pydantic import BaseModel, EmailStr, Field

class AnswerSubmissionItem(BaseModel):
    question_id: str = Field(..., min_length=1)
    selected_option_id: str = Field(..., min_length=1)

class SubmitDiagnosticSchema(BaseModel):
    test_id: str = Field(..., min_length=1)
    answers: List[AnswerSubmissionItem] = Field(..., min_length=1)
    lead_name: Optional[str] = Field(None, max_length=120)
    lead_email: Optional[EmailStr] = None
    lead_phone: Optional[str] = Field(None, max_length=50)

class LeadCaptureSchema(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=50)
    company_name: Optional[str] = Field(None, max_length=120)
    cohort_size: Optional[str] = Field("1-5", max_length=30)
    target_program: Optional[str] = Field("IT & Engineering English", max_length=100)
