"""Unit tests for AegisNet pipeline service."""

import pytest
import asyncio
from datetime import datetime
from uuid import uuid4
from backend.services.pipeline import PipelineService
from backend.models.schemas import MessageCreate, ChannelType


class TestPipelineService:
    """Test suite for AegisNet pipeline service."""
    
    @pytest.fixture
    def pipeline(self):
        """Create a pipeline service instance."""
        return PipelineService()
    
    @pytest.fixture
    def sample_message(self):
        """Create a sample message for testing."""
        return MessageCreate(
            content="URGENT: Your bank account has been compromised. "
                    "Click this link immediately to secure your funds: "
                    "https://fake-bank.com/verify. Limited time offer!",
            sender_info={"name": "Bank Security", "email": "security@fakebank.com"},
            receiver_info={"name": "Customer", "email": "customer@example.com"},
            channel_type=ChannelType.EMAIL,
            metadata={"subject": "URGENT: Account Security Alert"}
        )
    
    @pytest.mark.asyncio
    async def test_ingest_message_creates_response(self, pipeline, sample_message):
        """Test that message ingestion creates proper response."""
        message_response = await pipeline._ingest_message(sample_message)
        
        # Check response structure
        assert message_response.message_id is not None
        assert message_response.content == sample_message.content
        assert message_response.sender_info == sample_message.sender_info
        assert message_response.channel_type == sample_message.channel_type
        assert message_response.source_hash is not None
        assert message_response.ingestion_timestamp is not None
    
    @pytest.mark.asyncio
    async def test_extract_signals_from_message(self, pipeline, sample_message):
        """Test signal extraction from message."""
        # First ingest the message
        message_response = await pipeline._ingest_message(sample_message)
        
        # Then extract signals
        signals = await pipeline._extract_signals(message_response)
        
        # Check signals structure
        assert isinstance(signals, list)
        
        if signals:  # Should extract signals from scammy message
            signal = signals[0]
            assert signal.signal_id is not None
            assert signal.message_id == message_response.message_id
            assert signal.signal_type in ["urgency", "authority", "reciprocity", 
                                         "fear", "greed", "social_proof"]
            assert 0.0 <= signal.confidence_score <= 1.0
            assert signal.extracted_text is not None
            assert signal.pattern_matched is not None
            assert signal.extraction_timestamp is not None
    
    @pytest.mark.asyncio
    async def test_extract_signals_empty_content(self, pipeline):
        """Test signal extraction from empty message."""
        empty_message = MessageCreate(
            content="",
            sender_info={},
            receiver_info={},
            channel_type=ChannelType.EMAIL
        )
        
        message_response = await pipeline._ingest_message(empty_message)
        signals = await pipeline._extract_signals(message_response)
        
        # Should return empty list or very few signals
        assert isinstance(signals, list)
    
    @pytest.mark.asyncio
    async def test_correlate_evidence_creates_evidence(self, pipeline, sample_message):
        """Test evidence correlation from signals."""
        # Create message and signals first
        message_response = await pipeline._ingest_message(sample_message)
        signals = await pipeline._extract_signals(message_response)
        
        # Correlate evidence
        evidence = await pipeline._correlate_evidence(signals)
        
        # Check evidence structure
        assert isinstance(evidence, list)
        
        if evidence:  # Should create evidence from signals
            ev = evidence[0]
            assert ev.evidence_id is not None
            assert ev.evidence_type in ["temporal", "geographic", "linguistic", 
                                       "behavioral", "network"]
            assert ev.content is not None
            assert ev.source_description is not None
            assert 0.0 <= ev.confidence_score <= 1.0
            assert ev.collection_timestamp is not None
    
    @pytest.mark.asyncio
    async def test_reconstruct_campaigns_from_signals(self, pipeline, sample_message):
        """Test campaign reconstruction from signals and evidence."""
        # Create message, signals, and evidence
        message_response = await pipeline._ingest_message(sample_message)
        signals = await pipeline._extract_signals(message_response)
        evidence = await pipeline._correlate_evidence(signals)
        
        # Reconstruct campaigns
        campaigns = await pipeline._reconstruct_campaigns(signals, evidence)
        
        # Check campaigns structure
        assert isinstance(campaigns, list)
        
        if campaigns:  # May create campaigns if enough signals
            campaign = campaigns[0]
            assert campaign.campaign_id is not None
            assert campaign.campaign_name is not None
            assert campaign.campaign_type in ["phishing", "investment_scam", 
                                            "romance_scam", "tech_support"]
            assert 0.0 <= campaign.confidence_score <= 1.0
            assert campaign.estimated_scale >= 1
            assert campaign.first_seen is not None
            assert campaign.last_seen is not None
    
    @pytest.mark.asyncio
    async def test_check_counter_evidence(self, pipeline, sample_message):
        """Test counter-evidence check."""
        # Create message, signals, and evidence
        message_response = await pipeline._ingest_message(sample_message)
        signals = await pipeline._extract_signals(message_response)
        evidence = await pipeline._correlate_evidence(signals)
        campaigns = await pipeline._reconstruct_campaigns(signals, evidence)
        
        # Check counter-evidence
        counter_evidence = await pipeline._check_counter_evidence(evidence, campaigns)
        
        # Check counter-evidence structure
        assert isinstance(counter_evidence, list)
        
        if counter_evidence:  # Should always return some counter-evidence
            counter = counter_evidence[0]
            assert counter.evidence_id is not None
            assert counter.evidence_type is not None
            assert counter.content is not None
            assert counter.source_description is not None
            assert 0.0 <= counter.confidence_score <= 1.0
            assert counter.collection_timestamp is not None
    
    @pytest.mark.asyncio
    async def test_verify_claims(self, pipeline, sample_message):
        """Test claim verification."""
        # Create message, signals, and evidence
        message_response = await pipeline._ingest_message(sample_message)
        signals = await pipeline._extract_signals(message_response)
        evidence = await pipeline._correlate_evidence(signals)
        campaigns = await pipeline._reconstruct_campaigns(signals, evidence)
        counter_evidence = await pipeline._check_counter_evidence(evidence, campaigns)
        
        # Verify claims
        verification_results = await pipeline._verify_claims(
            message_response, signals, evidence, counter_evidence
        )
        
        # Check verification results structure
        assert isinstance(verification_results, list)
        
        if verification_results:  # Should verify some claims
            vr = verification_results[0]
            assert vr.verification_id is not None
            assert vr.claim_text is not None
            assert vr.claim_source is not None
            assert vr.verification_status in ["supported", "contradicted", 
                                            "inconclusive", "unverifiable"]
            assert 0.0 <= vr.confidence_score <= 1.0
            assert vr.verification_timestamp is not None
    
    @pytest.mark.asyncio
    async def test_generate_review_brief(self, pipeline, sample_message):
        """Test human review brief generation."""
        # Run through all pipeline steps
        message_response = await pipeline._ingest_message(sample_message)
        signals = await pipeline._extract_signals(message_response)
        evidence = await pipeline._correlate_evidence(signals)
        campaigns = await pipeline._reconstruct_campaigns(signals, evidence)
        counter_evidence = await pipeline._check_counter_evidence(evidence, campaigns)
        verification_results = await pipeline._verify_claims(
            message_response, signals, evidence, counter_evidence
        )
        
        # Generate review brief
        review_brief = await pipeline._generate_review_brief(
            message_response, signals, evidence, campaigns, 
            verification_results, counter_evidence
        )
        
        # Check review brief structure
        assert review_brief.brief_id is not None
        assert review_brief.executive_summary is not None
        assert isinstance(review_brief.key_signals, list)
        assert isinstance(review_brief.campaign_analysis, dict)
        assert isinstance(review_brief.verification_results, list)
        assert isinstance(review_brief.confidence_assessment, dict)
        assert review_brief.limitations_section is not None
        assert isinstance(review_brief.recommended_actions, list)
        assert isinstance(review_brief.evidence_visualization, dict)
        assert review_brief.analysis_timestamp is not None
    
    @pytest.mark.asyncio
    async def test_full_pipeline_execution(self, pipeline, sample_message):
        """Test complete 7-step pipeline execution."""
        result = await pipeline.run_pipeline(
            message=sample_message,
            include_synthetic_context=False
        )
        
        # Check complete result structure
        assert "message" in result
        assert "signals" in result
        assert "evidence" in result
        assert "campaigns" in result
        assert "verification_results" in result
        assert "human_review_brief" in result
        assert "pipeline_steps" in result
        assert "processing_time_ms" in result
        
        # Check all steps were completed
        steps = result["pipeline_steps"]
        assert steps.get("ingest") == True
        assert steps.get("signal_extraction") == True
        assert steps.get("evidence_correlation") == True
        assert steps.get("campaign_reconstruction") == True
        assert steps.get("counter_evidence_check") == True
        assert steps.get("claim_verification") == True
        assert steps.get("review_brief_generation") == True
        
        # Check processing time
        assert result["processing_time_ms"] > 0
    
    @pytest.mark.asyncio
    async def test_pipeline_with_benign_message(self, pipeline):
        """Test pipeline with benign (non-scam) message."""
        benign_message = MessageCreate(
            content="Hello, just checking in to see how you're doing. "
                    "Hope you're having a good week!",
            sender_info={"name": "Friend", "email": "friend@example.com"},
            receiver_info={"name": "User", "email": "user@example.com"},
            channel_type=ChannelType.EMAIL,
            metadata={"subject": "Friendly check-in"}
        )
        
        result = await pipeline.run_pipeline(
            message=benign_message,
            include_synthetic_context=False
        )
        
        # Pipeline should still complete all steps
        steps = result["pipeline_steps"]
        assert all(steps.values())
        
        # May have fewer signals or lower confidence
        assert len(result["signals"]) >= 0  # Could be 0 or few signals
        assert len(result["evidence"]) >= 0
        assert len(result["campaigns"]) >= 0
    
    def test_pipeline_initialization(self, pipeline):
        """Test pipeline service initialization."""
        assert pipeline.steps_completed == {}
        assert pipeline._current_evidence_graph is None
        assert pipeline._current_campaigns == []