"""Integration test for full AegisNet pipeline with synthetic scenario."""

import pytest
import asyncio
import json
from pathlib import Path
from backend.services.pipeline import PipelineService
from backend.models.schemas import MessageCreate, ChannelType


class TestFullPipelineIntegration:
    """Integration test for complete AegisNet pipeline."""
    
    @pytest.fixture
    def pipeline(self):
        """Create a pipeline service instance."""
        return PipelineService()
    
    @pytest.fixture
    def synthetic_scenario(self):
        """Load a synthetic scam scenario for testing."""
        # Try to load synthetic data if it exists
        data_dir = Path("data/synthetic")
        if data_dir.exists():
            scenario_files = list(data_dir.glob("*.json"))
            if scenario_files:
                with open(scenario_files[0], 'r') as f:
                    return json.load(f)
        
        # Fallback: create a simple synthetic scenario
        return self._create_fallback_scenario()
    
    def _create_fallback_scenario(self):
        """Create a fallback synthetic scenario if no data files exist."""
        return {
            "scenario_id": "test_scenario_1",
            "scam_type": "phishing",
            "name": "Test Phishing Scam",
            "description": "Test scenario for integration testing",
            "messages": [
                {
                    "message_id": "test_msg_1",
                    "content": "URGENT: Your bank account security has been compromised. "
                              "Click here to verify your identity immediately: "
                              "https://fake-bank-security.com",
                    "sender_info": {"email": "security@fakebank.com", "name": "Bank Security"},
                    "receiver_info": {"email": "customer@example.com", "name": "Customer"},
                    "channel_type": "email",
                    "timestamp": "2024-01-15T10:30:00Z",
                    "metadata": {"subject": "URGENT: Security Alert"},
                    "source_hash": "test_hash_123"
                }
            ],
            "signals": [
                {
                    "signal_id": "test_sig_1",
                    "message_id": "test_msg_1",
                    "signal_type": "urgency",
                    "confidence_score": 0.85,
                    "extracted_text": "URGENT: Your bank account security has been compromised",
                    "pattern_matched": "urgency_pattern_1",
                    "position_range": {"start": 0, "end": 50},
                    "context_window": "URGENT: Your bank account security...",
                    "extraction_timestamp": "2024-01-15T10:31:00Z",
                    "extraction_model": "rule_based"
                },
                {
                    "signal_id": "test_sig_2",
                    "message_id": "test_msg_1",
                    "signal_type": "authority",
                    "confidence_score": 0.75,
                    "extracted_text": "bank account security",
                    "pattern_matched": "authority_pattern_2",
                    "position_range": {"start": 20, "end": 40},
                    "context_window": "Your bank account security has been...",
                    "extraction_timestamp": "2024-01-15T10:31:00Z",
                    "extraction_model": "rule_based"
                }
            ],
            "evidence": [
                {
                    "evidence_id": "test_ev_1",
                    "evidence_type": "temporal",
                    "content": {"signal_count": 2, "coordination_level": "medium"},
                    "source_description": "Temporal correlation of urgency signals",
                    "confidence_score": 0.70,
                    "collection_timestamp": "2024-01-15T10:32:00Z",
                    "limitations": "Test data only"
                }
            ],
            "campaign": {
                "campaign_id": "test_camp_1",
                "campaign_name": "Test Phishing Campaign",
                "campaign_type": "phishing",
                "confidence_score": 0.65,
                "estimated_scale": 10,
                "signal_ids": ["test_sig_1", "test_sig_2"],
                "evidence_ids": ["test_ev_1"],
                "message_ids": ["test_msg_1"],
                "temporal_pattern": {"duration_days": 1, "frequency": "ongoing"},
                "primary_tactics": ["urgency", "authority"],
                "status": "active",
                "reconstruction_notes": "Test campaign reconstruction",
                "meta": {"scam_type": "phishing", "message_count": 1}
            },
            "verification_results": [
                {
                    "verification_id": "test_ver_1",
                    "claim_text": "Message contains urgent action request",
                    "claim_source": "signal_analysis",
                    "verification_status": "supported",
                    "confidence_score": 0.80,
                    "supporting_evidence": ["test_ev_1"],
                    "contradicting_evidence": [],
                    "evidence_gaps": [],
                    "alternative_explanations": [],
                    "verification_method": "rule_based",
                    "limitations": "Test verification"
                }
            ],
            "human_review_brief": {
                "brief_id": "test_brief_1",
                "executive_summary": "Test phishing scenario analysis complete",
                "key_signals": [
                    {"type": "urgency", "count": 1, "average_confidence": 0.85},
                    {"type": "authority", "count": 1, "average_confidence": 0.75}
                ],
                "campaign_analysis": {
                    "type": "phishing",
                    "confidence": 0.65,
                    "estimated_scale": 10,
                    "primary_tactics": ["urgency", "authority"],
                    "status": "active"
                },
                "verification_results": [
                    {"claim": "Message contains urgent action request", 
                     "status": "supported", "confidence": 0.80}
                ],
                "confidence_assessment": {
                    "overall": 0.65,
                    "signals": 0.80,
                    "evidence": 0.70,
                    "verification": 0.80
                },
                "limitations_section": "Test limitations section",
                "recommended_actions": [
                    "Review message metadata",
                    "Check against fraud databases"
                ],
                "analysis_timestamp": "2024-01-15T10:35:00Z"
            }
        }
    
    @pytest.mark.asyncio
    async def test_pipeline_with_synthetic_scenario(self, pipeline, synthetic_scenario):
        """Test full pipeline with synthetic scam scenario."""
        # Extract first message from scenario
        scenario_message = synthetic_scenario["messages"][0]
        
        # Create MessageCreate object
        message = MessageCreate(
            content=scenario_message["content"],
            sender_info=scenario_message["sender_info"],
            receiver_info=scenario_message["receiver_info"],
            channel_type=ChannelType(scenario_message["channel_type"]),
            metadata=scenario_message.get("metadata", {})
        )
        
        # Run full pipeline
        result = await pipeline.run_pipeline(
            message=message,
            include_synthetic_context=False
        )
        
        # Verify pipeline completed all 7 steps
        steps = result["pipeline_steps"]
        assert steps.get("ingest") == True
        assert steps.get("signal_extraction") == True
        assert steps.get("evidence_correlation") == True
        assert steps.get("campaign_reconstruction") == True
        assert steps.get("counter_evidence_check") == True
        assert steps.get("claim_verification") == True
        assert steps.get("review_brief_generation") == True
        
        # Verify output structure matches expected
        assert result["message"].content == message.content
        assert isinstance(result["signals"], list)
        assert isinstance(result["evidence"], list)
        assert isinstance(result["campaigns"], list)
        assert isinstance(result["verification_results"], list)
        assert result["human_review_brief"].executive_summary is not None
        
        # For phishing messages, should extract some signals
        if "urgent" in message.content.lower() or "bank" in message.content.lower():
            assert len(result["signals"]) > 0
        
        # Should always generate some evidence
        assert len(result["evidence"]) > 0
        
        # Should always generate a review brief
        brief = result["human_review_brief"]
        assert brief.limitations_section is not None
        assert "LIMITATIONS:" in brief.limitations_section
        assert "ETHICAL BOUNDARIES:" in brief.limitations_section
    
    @pytest.mark.asyncio
    async def test_pipeline_performance(self, pipeline, synthetic_scenario):
        """Test pipeline performance metrics."""
        scenario_message = synthetic_scenario["messages"][0]
        
        message = MessageCreate(
            content=scenario_message["content"],
            sender_info=scenario_message["sender_info"],
            receiver_info=scenario_message["receiver_info"],
            channel_type=ChannelType(scenario_message["channel_type"]),
            metadata=scenario_message.get("metadata", {})
        )
        
        # Run pipeline multiple times to check consistency
        results = []
        for _ in range(3):
            result = await pipeline.run_pipeline(
                message=message,
                include_synthetic_context=False
            )
            results.append(result)
        
        # All runs should complete successfully
        for result in results:
            steps = result["pipeline_steps"]
            assert all(steps.values())
            assert result["processing_time_ms"] > 0
        
        # Processing times should be reasonable (under 10 seconds for demo)
        max_time = max(r["processing_time_ms"] for r in results)
        assert max_time < 10000  # 10 seconds
        
        # Results should be consistent (similar structure)
        first_result = results[0]
        for result in results[1:]:
            assert len(result["signals"]) == len(first_result["signals"])
            assert len(result["evidence"]) == len(first_result["evidence"])
            assert len(result["campaigns"]) == len(first_result["campaigns"])
    
    @pytest.mark.asyncio
    async def test_pipeline_error_handling(self, pipeline):
        """Test pipeline error handling with invalid input."""
        # Test with very long message (should still process)
        long_message = MessageCreate(
            content="X" * 10000,  # Very long message
            sender_info={},
            receiver_info={},
            channel_type=ChannelType.EMAIL
        )
        
        result = await pipeline.run_pipeline(
            message=long_message,
            include_synthetic_context=False
        )
        
        # Should still complete all steps
        steps = result["pipeline_steps"]
        assert all(steps.values())
        
        # May have fewer signals due to content pattern
        assert isinstance(result["signals"], list)
    
    @pytest.mark.asyncio
    async def test_multiple_message_types(self, pipeline):
        """Test pipeline with different message types (email, SMS, social)."""
        message_types = [
            ("email", ChannelType.EMAIL, "Bank security alert - verify your account now"),
            ("sms", ChannelType.SMS, "URGENT: Your package delivery failed. Call now: 555-0123"),
            ("social_media", ChannelType.SOCIAL_MEDIA, "Limited time offer! Earn $5000 weekly from home")
        ]
        
        for msg_type, channel_type, content in message_types:
            message = MessageCreate(
                content=content,
                sender_info={"type": msg_type, "platform": "test"},
                receiver_info={"type": "user"},
                channel_type=channel_type,
                metadata={"message_type": msg_type}
            )
            
            result = await pipeline.run_pipeline(
                message=message,
                include_synthetic_context=False
            )
            
            # All should complete successfully
            steps = result["pipeline_steps"]
            assert all(steps.values())
            
            # Verify channel type is preserved
            assert result["message"].channel_type == channel_type
            
            # Scammy messages should produce signals
            if "urgent" in content.lower() or "earn" in content.lower():
                assert len(result["signals"]) > 0
    
    @pytest.mark.asyncio 
    async def test_ethical_boundaries_in_output(self, pipeline, synthetic_scenario):
        """Test that pipeline output includes ethical boundaries."""
        scenario_message = synthetic_scenario["messages"][0]
        
        message = MessageCreate(
            content=scenario_message["content"],
            sender_info=scenario_message["sender_info"],
            receiver_info=scenario_message["receiver_info"],
            channel_type=ChannelType(scenario_message["channel_type"]),
            metadata=scenario_message.get("metadata", {})
        )
        
        result = await pipeline.run_pipeline(
            message=message,
            include_synthetic_context=False
        )
        
        # Check that limitations section includes ethical boundaries
        brief = result["human_review_brief"]
        limitations = brief.limitations_section
        
        # Should mention key ethical boundaries
        ethical_keywords = [
            "does NOT determine guilt",
            "does NOT freeze accounts", 
            "does NOT block communications",
            "does NOT contact victims",
            "human review required"
        ]
        
        # At least some ethical boundaries should be mentioned
        found_keywords = [kw for kw in ethical_keywords if kw.lower() in limitations.lower()]
        assert len(found_keywords) > 0, "Ethical boundaries not clearly stated in limitations"
        
        # Should explicitly state what system CANNOT do
        assert "CANNOT" in limitations or "does NOT" in limitations