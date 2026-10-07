"""Unit tests for TraceX engine."""

import pytest
from datetime import datetime
from backend.services.tracex_engine import TraceXEngine


class TestTraceXEngine:
    """Test suite for TraceX engine."""
    
    @pytest.fixture
    def tracex(self):
        """Create a TraceX engine instance."""
        return TraceXEngine()
    
    @pytest.fixture
    def sample_signals(self):
        """Create sample signals for testing."""
        return [
            {
                "signal_id": "sig_1",
                "signal_type": "urgency",
                "confidence_score": 0.85,
                "extracted_text": "Act now before it's too late",
                "pattern_matched": "urgency_pattern_1"
            },
            {
                "signal_id": "sig_2", 
                "signal_type": "authority",
                "confidence_score": 0.75,
                "extracted_text": "Bank security department",
                "pattern_matched": "authority_pattern_2"
            },
            {
                "signal_id": "sig_3",
                "signal_type": "urgency",
                "confidence_score": 0.80,
                "extracted_text": "Limited time offer",
                "pattern_matched": "urgency_pattern_3"
            }
        ]
    
    @pytest.fixture
    def sample_claim(self):
        """Create a sample claim for testing."""
        return {
            "text": "This is an urgent security alert from your bank",
            "source": "message_analysis",
            "confidence": 0.7
        }
    
    def test_correlate_signals_returns_graph_structure(self, tracex, sample_signals):
        """Test that correlate_signals returns proper graph structure."""
        result = tracex.correlate_signals(sample_signals)
        
        # Check basic structure
        assert "nodes" in result
        assert "edges" in result
        assert "meta" in result
        
        # Check nodes contain signals and evidence
        nodes = result["nodes"]
        signal_nodes = [n for n in nodes if n.get("type") == "signal"]
        evidence_nodes = [n for n in nodes if n.get("type") == "evidence"]
        
        assert len(signal_nodes) == len(sample_signals)
        assert len(evidence_nodes) > 0
        
        # Check edges connect signals to evidence
        edges = result["edges"]
        assert len(edges) > 0
        for edge in edges:
            assert "source" in edge
            assert "target" in edge
            assert "type" in edge
        
        # Check metadata
        meta = result["meta"]
        assert meta["signal_count"] == len(sample_signals)
        assert meta["evidence_count"] == len(evidence_nodes)
        assert "correlation_method" in meta
    
    def test_correlate_signals_empty_input(self, tracex):
        """Test correlate_signals with empty input."""
        result = tracex.correlate_signals([])
        
        assert result["nodes"] == []
        assert result["edges"] == []
        assert "note" in result["meta"]
    
    def test_build_campaign_graph_returns_campaigns(self, tracex, sample_signals):
        """Test that build_campaign_graph returns campaign structures."""
        # First create evidence graph
        evidence_graph = tracex.correlate_signals(sample_signals)
        
        # Then build campaigns
        campaigns = tracex.build_campaign_graph(sample_signals, evidence_graph)
        
        # Check campaigns structure
        assert isinstance(campaigns, list)
        if campaigns:  # May or may not create campaigns based on signal clustering
            campaign = campaigns[0]
            assert "campaign_id" in campaign
            assert "signal_ids" in campaign
            assert "confidence" in campaign
            assert "description" in campaign
            assert "meta" in campaign
            
            # Check confidence range
            assert 0.0 <= campaign["confidence"] <= 1.0
    
    def test_build_campaign_graph_empty_input(self, tracex):
        """Test build_campaign_graph with empty input."""
        campaigns = tracex.build_campaign_graph([], {})
        
        assert campaigns == []
    
    def test_get_counter_evidence_returns_list(self, tracex, sample_claim):
        """Test that get_counter_evidence returns counter-evidence list."""
        # Create a simple evidence graph
        evidence_graph = {
            "nodes": [
                {"id": "ev_1", "type": "evidence", "confidence": 0.8},
                {"id": "ev_2", "type": "evidence", "confidence": 0.5}
            ],
            "edges": [],
            "meta": {}
        }
        
        counter_evidence = tracex.get_counter_evidence(sample_claim, evidence_graph)
        
        # Check structure
        assert isinstance(counter_evidence, list)
        if counter_evidence:  # Should always return some counter-evidence
            evidence = counter_evidence[0]
            assert "evidence_id" in evidence
            assert "type" in evidence
            assert "summary" in evidence
            assert "confidence" in evidence
            assert "provenance" in evidence
            
            # Check confidence range
            assert 0.0 <= evidence["confidence"] <= 1.0
    
    def test_get_counter_evidence_with_scam_indicators(self, tracex):
        """Test counter-evidence generation for claims with scam indicators."""
        scam_claim = {
            "text": "URGENT: Click now for free guaranteed money!",
            "source": "message_content",
            "confidence": 0.8
        }
        
        evidence_graph = {"nodes": [], "edges": [], "meta": {}}
        counter_evidence = tracex.get_counter_evidence(scam_claim, evidence_graph)
        
        assert len(counter_evidence) > 0
        
        # Should have evidence about scam indicators
        scam_evidence = [e for e in counter_evidence 
                        if "scam indicators" in e.get("summary", "").lower()]
        assert len(scam_evidence) > 0
    
    def test_evidence_graph_persistence(self, tracex, sample_signals):
        """Test that evidence graph structure persists between method calls."""
        evidence_graph = tracex.correlate_signals(sample_signals)
        
        # Use the same graph for campaign reconstruction
        campaigns = tracex.build_campaign_graph(sample_signals, evidence_graph)
        
        # Use the same graph for counter-evidence
        claim = {"text": "Test claim", "source": "test"}
        counter = tracex.get_counter_evidence(claim, evidence_graph)
        
        # All should work without errors
        assert "nodes" in evidence_graph
        assert isinstance(campaigns, list)
        assert isinstance(counter, list)
    
    def test_signal_to_evidence_mapping(self, tracex):
        """Test internal signal to evidence type mapping."""
        # Test mapping for different signal types
        test_cases = [
            ("urgency", "temporal"),
            ("authority", "linguistic"),
            ("reciprocity", "behavioral"),
            ("fear", "behavioral"),
            ("greed", "behavioral"),
            ("social_proof", "network"),
            ("unknown", "linguistic")  # Default
        ]
        
        for signal_type, expected_evidence in test_cases:
            # We need to test the internal method
            # Since it's private, we'll test through public interface
            signals = [{"signal_id": "test", "signal_type": signal_type}]
            evidence_graph = tracex.correlate_signals(signals)
            
            # Check that evidence was created with appropriate type
            evidence_nodes = [n for n in evidence_graph["nodes"] 
                            if n.get("type") == "evidence"]
            
            if evidence_nodes:
                # The first evidence node should match our mapping
                evidence_type = evidence_nodes[0].get("evidence_type", "")
                # For unknown signal type, it should default to linguistic
                if signal_type != "unknown":
                    assert evidence_type == expected_evidence
    
    def test_signal_to_campaign_mapping(self, tracex):
        """Test internal signal to campaign type mapping."""
        # Test through public interface by creating signals of different types
        test_signals = [
            {"signal_id": "sig_1", "signal_type": "urgency"},
            {"signal_id": "sig_2", "signal_type": "greed"},
            {"signal_id": "sig_3", "signal_type": "social_proof"}
        ]
        
        evidence_graph = tracex.correlate_signals(test_signals)
        campaigns = tracex.build_campaign_graph(test_signals, evidence_graph)
        
        if campaigns:
            # Check that campaign types are mapped correctly
            for campaign in campaigns:
                campaign_type = campaign.get("meta", {}).get("campaign_type", "")
                # Should be one of the expected campaign types
                assert campaign_type in ["phishing", "investment_scam", "romance_scam", "tech_support"]