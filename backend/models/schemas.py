"""Pydantic schemas for AegisNet API."""

from datetime import datetime
from typing import Optional, List, Dict, Any
from uuid import UUID, uuid4
from enum import Enum
from pydantic import BaseModel, Field


# Enums
class ChannelType(str, Enum):
    EMAIL = "email"
    SMS = "sms"
    SOCIAL_MEDIA = "social_media"
    CHAT = "chat"


class SignalType(str, Enum):
    URGENCY = "urgency"
    AUTHORITY = "authority"
    RECIPROCITY = "reciprocity"
    FEAR = "fear"
    GREED = "greed"
    SOCIAL_PROOF = "social_proof"


class EvidenceType(str, Enum):
    TEMPORAL = "temporal"
    GEOGRAPHIC = "geographic"
    LINGUISTIC = "linguistic"
    BEHAVIORAL = "behavioral"
    NETWORK = "network"


class CampaignType(str, Enum):
    PHISHING = "phishing"
    INVESTMENT_SCAM = "investment_scam"
    ROMANCE_SCAM = "romance_scam"
    TECH_SUPPORT = "tech_support"


class VerificationStatus(str, Enum):
    SUPPORTED = "supported"
    CONTRADICTED = "contradicted"
    INCONCLUSIVE = "inconclusive"
    UNVERIFIABLE = "unverifiable"


# Base schemas
class MessageBase(BaseModel):
    content: str
    sender_info: Dict[str, Any] = Field(default_factory=dict)
    receiver_info: Dict[str, Any] = Field(default_factory=dict)
    channel_type: ChannelType = ChannelType.EMAIL
    timestamp: Optional[datetime] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)


class MessageCreate(MessageBase):
    pass


class MessageResponse(MessageBase):
    message_id: UUID = Field(default_factory=uuid4)
    source_hash: str
    ingestion_timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        orm_mode = True


class SignalBase(BaseModel):
    signal_type: SignalType
    confidence_score: float = Field(ge=0.0, le=1.0)
    extracted_text: str
    pattern_matched: str
    position_range: Dict[str, int] = Field(default_factory=dict)
    context_window: str = ""


class SignalCreate(SignalBase):
    message_id: UUID


class SignalResponse(SignalBase):
    signal_id: UUID = Field(default_factory=uuid4)
    message_id: UUID
    extraction_timestamp: datetime = Field(default_factory=datetime.utcnow)
    extraction_model: str = "default"
    
    class Config:
        orm_mode = True


class EvidenceBase(BaseModel):
    evidence_type: EvidenceType
    content: Dict[str, Any]
    source_description: str
    confidence_score: float = Field(ge=0.0, le=1.0)
    timestamp_range: Optional[Dict[str, datetime]] = None
    geographic_range: Optional[Dict[str, Any]] = None
    limitations: str = ""


class EvidenceCreate(EvidenceBase):
    pass


class EvidenceResponse(EvidenceBase):
    evidence_id: UUID = Field(default_factory=uuid4)
    collection_timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        orm_mode = True


class CampaignBase(BaseModel):
    campaign_name: str
    campaign_type: CampaignType
    confidence_score: float = Field(ge=0.0, le=1.0)
    estimated_scale: int = 1
    temporal_pattern: Optional[Dict[str, Any]] = None
    geographic_pattern: Optional[Dict[str, Any]] = None
    primary_tactics: List[str] = Field(default_factory=list)
    status: str = "active"
    reconstruction_notes: str = ""


class CampaignCreate(CampaignBase):
    pass


class CampaignResponse(CampaignBase):
    campaign_id: UUID = Field(default_factory=uuid4)
    first_seen: datetime = Field(default_factory=datetime.utcnow)
    last_seen: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        orm_mode = True


class VerificationResultBase(BaseModel):
    claim_text: str
    claim_source: str = "message_content"
    verification_status: VerificationStatus
    confidence_score: float = Field(ge=0.0, le=1.0)
    supporting_evidence: List[Dict[str, Any]] = Field(default_factory=list)
    contradicting_evidence: List[Dict[str, Any]] = Field(default_factory=list)
    evidence_gaps: List[str] = Field(default_factory=list)
    alternative_explanations: List[str] = Field(default_factory=list)
    verification_method: str = "rule_based"
    limitations: str = ""


class VerificationResultCreate(VerificationResultBase):
    pass


class VerificationResultResponse(VerificationResultBase):
    verification_id: UUID = Field(default_factory=uuid4)
    verification_timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        orm_mode = True


class HumanReviewBriefBase(BaseModel):
    executive_summary: str
    key_signals: List[Dict[str, Any]] = Field(default_factory=list)
    campaign_analysis: Dict[str, Any] = Field(default_factory=dict)
    verification_results: List[Dict[str, Any]] = Field(default_factory=list)
    confidence_assessment: Dict[str, float] = Field(default_factory=dict)
    limitations_section: str
    recommended_actions: List[str] = Field(default_factory=list)
    evidence_visualization: Dict[str, Any] = Field(default_factory=dict)


class HumanReviewBriefCreate(HumanReviewBriefBase):
    pass


class HumanReviewBriefResponse(HumanReviewBriefBase):
    brief_id: UUID = Field(default_factory=uuid4)
    analysis_timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        orm_mode = True


# Pipeline schemas
class PipelineRequest(BaseModel):
    message: MessageCreate
    include_synthetic_context: bool = True


class PipelineResponse(BaseModel):
    message: MessageResponse
    signals: List[SignalResponse]
    evidence: List[EvidenceResponse]
    campaigns: List[CampaignResponse]
    verification_results: List[VerificationResultResponse]
    human_review_brief: HumanReviewBriefResponse
    pipeline_steps: Dict[str, bool]
    processing_time_ms: float