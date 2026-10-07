"""Pipeline service orchestrating the 7-step AegisNet analysis."""

import time
from typing import Dict, Any
from datetime import datetime, timedelta
from uuid import uuid4

from config import settings
from models.schemas import (
    MessageCreate, MessageResponse, SignalResponse, EvidenceResponse,
    CampaignResponse, VerificationResultResponse, HumanReviewBriefResponse
)
from .tracex_engine import tracex_engine
from .evidence_chain import evidence_chain
from .truth_gate import TruthGate


class PipelineService:
    """Orchestrates the 7-step AegisNet analysis pipeline."""
    
    def __init__(self):
        self.steps_completed = {}
        self._current_evidence_graph = None
        self._current_campaigns = []
        # Initialize Truth Gate with evidence chain
        self.truth_gate = TruthGate(evidence_chain)
        
    async def run_pipeline(
        self, 
        message: MessageCreate,
        include_synthetic_context: bool = True
    ) -> Dict[str, Any]:
        """
        Run the full 7-step analysis pipeline.
        
        Args:
            message: Suspicious message to analyze
            include_synthetic_context: Whether to include synthetic data for context
            
        Returns:
            Dictionary containing all pipeline results
        """
        pipeline_start = time.time()
        self.steps_completed = {}
        
        # Step 1: Ingest message
        message_result = await self._ingest_message(message)
        self.steps_completed["ingest"] = True
        
        # Step 2: Extract scam signals
        signals = await self._extract_signals(message_result)
        self.steps_completed["signal_extraction"] = True
        
        # Step 3: Evidence correlation (via TraceX)
        evidence = await self._correlate_evidence(signals)
        self.steps_completed["evidence_correlation"] = True
        
        # Step 4: Campaign reconstruction (via TraceX)
        campaigns = await self._reconstruct_campaigns(signals, evidence)
        self.steps_completed["campaign_reconstruction"] = True
        
        # Step 5: Counter-evidence check (via TraceX)
        counter_evidence = await self._check_counter_evidence(evidence, campaigns)
        self.steps_completed["counter_evidence_check"] = True
        
        # Step 6: Claim verification
        verification_results = await self._verify_claims(
            message_result, signals, evidence, counter_evidence
        )
        self.steps_completed["claim_verification"] = True
        
        # Step 7: Generate Human Review Brief
        human_review_brief = await self._generate_review_brief(
            message_result, signals, evidence, campaigns, 
            verification_results, counter_evidence
        )
        self.steps_completed["review_brief_generation"] = True
        
        # Calculate processing time
        pipeline_time = time.time() - pipeline_start
        
        return {
            "message": message_result,
            "signals": signals,
            "evidence": evidence,
            "campaigns": campaigns,
            "verification_results": verification_results,
            "human_review_brief": human_review_brief,
            "pipeline_steps": self.steps_completed,
            "processing_time_ms": pipeline_time * 1000
        }
    
    async def _ingest_message(self, message: MessageCreate) -> MessageResponse:
        """Step 1: Ingest suspicious message."""
        # Create a hash from content for deduplication
        import hashlib
        content_hash = hashlib.md5(message.content.encode()).hexdigest()
        
        message_response = MessageResponse(
            **message.dict(),
            message_id=uuid4(),
            source_hash=content_hash,
            ingestion_timestamp=datetime.utcnow()
        )
        
        # Add to evidence chain (TraceX-style)
        evidence_chain.add_record(
            record_type="message",
            payload=message_response.dict(),
            source_id=str(message_response.message_id)
        )
        
        return message_response
    
    async def _extract_signals(self, message: MessageResponse) -> list[SignalResponse]:
        """Step 2: Extract scam signals using NLP and pattern matching."""
        # Placeholder - will be implemented with actual NLP models
        signals = []
        
        # Sample signal extraction based on content analysis
        content = message.content.lower()
        
        # Check for urgency signals
        urgency_phrases = ["urgent", "act now", "limited time", "immediately", "right away"]
        for phrase in urgency_phrases:
            if phrase in content:
                signals.append(SignalResponse(
                    signal_id=uuid4(),
                    message_id=message.message_id,
                    signal_type="urgency",
                    confidence_score=0.85,
                    extracted_text=f"Contains urgency phrase: '{phrase}'",
                    pattern_matched=f"urgency_pattern_{phrase}",
                    position_range={"start": 0, "end": len(message.content)},
                    context_window=message.content,
                    extraction_timestamp=datetime.utcnow(),
                    extraction_model="rule_based"
                ))
        
        # Check for authority signals
        authority_phrases = ["bank", "security", "department", "official", "verify"]
        for phrase in authority_phrases:
            if phrase in content:
                signals.append(SignalResponse(
                    signal_id=uuid4(),
                    message_id=message.message_id,
                    signal_type="authority",
                    confidence_score=0.75,
                    extracted_text=f"Contains authority phrase: '{phrase}'",
                    pattern_matched=f"authority_pattern_{phrase}",
                    position_range={"start": 0, "end": len(message.content)},
                    context_window=message.content,
                    extraction_timestamp=datetime.utcnow(),
                    extraction_model="rule_based"
                ))
        
        # Check for reciprocity signals
        reciprocity_phrases = ["free", "offer", "gift", "special", "bonus"]
        for phrase in reciprocity_phrases:
            if phrase in content:
                signals.append(SignalResponse(
                    signal_id=uuid4(),
                    message_id=message.message_id,
                    signal_type="reciprocity",
                    confidence_score=0.70,
                    extracted_text=f"Contains reciprocity phrase: '{phrase}'",
                    pattern_matched=f"reciprocity_pattern_{phrase}",
                    position_range={"start": 0, "end": len(message.content)},
                    context_window=message.content,
                    extraction_timestamp=datetime.utcnow(),
                    extraction_model="rule_based"
                ))
        
        return signals
    
    async def _correlate_evidence(self, signals: list[SignalResponse]) -> list[EvidenceResponse]:
        """Step 3: Evidence correlation via TraceX."""
        if not signals:
            return []
        
        # Convert signals to dict format for TraceX
        signal_dicts = []
        for signal in signals:
            signal_dict = signal.dict()
            signal_dict["signal_id"] = str(signal.signal_id)
            signal_dicts.append(signal_dict)
        
        # Use TraceX engine for evidence correlation
        evidence_graph = tracex_engine.correlate_signals(signal_dicts)
        
        # Store evidence graph for later steps
        self._current_evidence_graph = evidence_graph
        
        # Convert evidence nodes to EvidenceResponse objects
        evidence_responses = []
        for node in evidence_graph.get("nodes", []):
            if node.get("type") == "evidence":
                evidence_responses.append(EvidenceResponse(
                    evidence_id=uuid4(),
                    evidence_type=node.get("evidence_type", "linguistic"),
                    content=node.get("data", {}),
                    source_description=f"TraceX correlation: {node.get('summary', 'Evidence from signal correlation')}",
                    confidence_score=node.get("confidence", 0.7),
                    collection_timestamp=datetime.utcnow(),
                    limitations="Generated from mock TraceX correlation engine"
                ))
        
        return evidence_responses
    
    async def _reconstruct_campaigns(
        self, 
        signals: list[SignalResponse], 
        evidence: list[EvidenceResponse]
    ) -> list[CampaignResponse]:
        """Step 4: Campaign reconstruction via TraceX."""
        if not signals:
            return []
        
        # Convert signals to dict format for TraceX
        signal_dicts = []
        for signal in signals:
            signal_dict = signal.dict()
            signal_dict["signal_id"] = str(signal.signal_id)
            signal_dicts.append(signal_dict)
        
        # Use TraceX engine for campaign reconstruction with current evidence graph
        campaigns = tracex_engine.build_campaign_graph(
            signal_dicts, 
            self._current_evidence_graph or {}
        )
        
        # Store campaigns for later steps
        self._current_campaigns = campaigns
        
        # Convert to CampaignResponse objects
        campaign_responses = []
        for campaign in campaigns:
            # Map campaign type string to enum
            campaign_type_map = {
                "phishing": "phishing",
                "investment_scam": "investment_scam", 
                "romance_scam": "romance_scam",
                "tech_support": "tech_support"
            }
            
            campaign_responses.append(CampaignResponse(
                campaign_id=uuid4(),
                campaign_name=f"Campaign {campaign.get('campaign_id', 'unknown')}",
                campaign_type=campaign_type_map.get(
                    campaign.get("meta", {}).get("campaign_type", "phishing"), 
                    "phishing"
                ),
                confidence_score=campaign.get("confidence", 0.6),
                estimated_scale=len(campaign.get("signal_ids", [])),
                temporal_pattern={"duration_hours": 24, "frequency": "ongoing"},
                primary_tactics=[campaign.get("meta", {}).get("primary_signal_type", "unknown")],
                status="active",
                reconstruction_notes=campaign.get("description", "Reconstructed by TraceX engine"),
                first_seen=datetime.utcnow() - timedelta(hours=24),
                last_seen=datetime.utcnow()
            ))
        
        return campaign_responses
    
    async def _check_counter_evidence(
        self, 
        evidence: list[EvidenceResponse],
        campaigns: list[CampaignResponse]
    ) -> list[EvidenceResponse]:
        """Step 5: Counter-evidence check via TraceX."""
        if not evidence and not campaigns:
            return []
        
        # Create a sample claim based on the analysis
        sample_claim = {
            "text": "This message is part of a coordinated phishing campaign",
            "source": "campaign_analysis",
            "confidence": 0.7,
            "context": "Based on signal patterns and evidence correlation"
        }
        
        # Use TraceX engine for counter-evidence check with current evidence graph
        counter_evidence_list = tracex_engine.get_counter_evidence(
            sample_claim, 
            self._current_evidence_graph or {}
        )
        
        # Convert to EvidenceResponse objects
        counter_responses = []
        for counter in counter_evidence_list:
            counter_responses.append(EvidenceResponse(
                evidence_id=uuid4(),
                evidence_type=counter.get("type", "behavioral"),  # Changed from "methodological" to "behavioral"
                content={
                    "summary": counter.get("summary", ""),
                    "provenance": counter.get("provenance", {}),
                    "confidence": counter.get("confidence", 0.7)
                },
                source_description=f"Counter-evidence: {counter.get('summary', '')}",
                confidence_score=counter.get("confidence", 0.7),
                collection_timestamp=datetime.utcnow(),
                limitations="Generated from mock TraceX counter-evidence engine"
            ))
        
        return counter_responses
    
    async def _verify_claims(
        self,
        message: MessageResponse,
        signals: list[SignalResponse],
        evidence: list[EvidenceResponse],
        counter_evidence: list[EvidenceResponse]
    ) -> list[VerificationResultResponse]:
        """Step 6: Claim verification."""
        verification_results = []
        
        # Verify common scam claims
        claims_to_verify = [
            {
                "text": "Message contains urgent action request",
                "source": "signal_analysis"
            },
            {
                "text": "Message uses authority appeal tactics", 
                "source": "signal_analysis"
            },
            {
                "text": "This appears to be part of coordinated campaign",
                "source": "campaign_analysis"
            }
        ]
        
        for claim in claims_to_verify:
            # Simple verification logic for demo
            status = "inconclusive"
            confidence = 0.5
            
            if claim["text"] == "Message contains urgent action request":
                urgency_signals = [s for s in signals if s.signal_type == "urgency"]
                if urgency_signals:
                    status = "supported"
                    confidence = max([s.confidence_score for s in urgency_signals])
            
            verification_results.append(VerificationResultResponse(
                verification_id=uuid4(),
                claim_text=claim["text"],
                claim_source=claim["source"],
                verification_status=status,
                confidence_score=confidence,
                verification_timestamp=datetime.utcnow(),
                limitations="Basic rule-based verification in demo mode"
            ))
        
        return verification_results
    
    async def _generate_review_brief(
        self,
        message: MessageResponse,
        signals: list[SignalResponse],
        evidence: list[EvidenceResponse],
        campaigns: list[CampaignResponse],
        verification_results: list[VerificationResultResponse],
        counter_evidence: list[EvidenceResponse]
    ) -> HumanReviewBriefResponse:
        """Step 7: Generate Human Review Brief."""
        
        # Generate executive summary
        signal_count = len(signals)
        evidence_count = len(evidence)
        campaign_count = len(campaigns)
        
        if signal_count > 0:
            executive_summary = (
                f"Analysis of suspicious message identified {signal_count} potential scam signals "
                f"across {evidence_count} evidence points. {campaign_count} possible campaign(s) "
                f"reconstructed. Review recommended for fraud analyst assessment."
            )
        else:
            executive_summary = (
                "Analysis of message found no strong scam signals. "
                "Low confidence of fraudulent activity based on current evidence."
            )
        
        # Prepare key signals
        key_signals = []
        for signal in signals[:5]:  # Top 5 signals
            key_signals.append({
                "type": signal.signal_type,
                "confidence": signal.confidence_score,
                "text": signal.extracted_text[:100] + "..." if len(signal.extracted_text) > 100 else signal.extracted_text
            })
        
        # Prepare confidence assessment
        confidence_assessment = {
            "overall_confidence": 0.7 if signal_count > 0 else 0.3,
            "signal_confidence": sum([s.confidence_score for s in signals]) / max(signal_count, 1),
            "evidence_confidence": sum([e.confidence_score for e in evidence]) / max(evidence_count, 1),
            "campaign_confidence": sum([c.confidence_score for c in campaigns]) / max(campaign_count, 1)
        }
        
        # Limitations section
        limitations_section = (
            "LIMITATIONS:\n"
            "1. Analysis based on single message only - more data needed for comprehensive assessment\n"
            "2. Demo mode uses basic rule-based analysis, not full AI/ML models\n"
            "3. TraceX engine integration is implemented but uses placeholder algorithms\n"
            "4. Synthetic context not yet implemented in this phase\n"
            "5. Confidence scores are estimates and require human validation\n"
            "6. Evidence graphs are simplified for demo purposes\n\n"
            "IMPORTANT: This system does NOT determine guilt, freeze accounts, block communications, "
            "contact victims, or perform enforcement actions. Human review required for all decisions."
        )
        
        # Recommended actions (non-enforcement)
        recommended_actions = [
            "Review message metadata and sender information",
            "Check for similar messages in existing fraud databases",
            "Consider requesting additional context or messages",
            "Document analysis findings in fraud case management system",
            "Escalate to senior fraud analyst if confidence > 0.7"
        ]
        
        # Evidence visualization data
        evidence_visualization = {
            "nodes": [
                {"id": "message", "type": "message", "label": "Input Message"},
                *[{"id": f"signal_{i}", "type": "signal", "label": s.signal_type} for i, s in enumerate(signals)],
                *[{"id": f"evidence_{i}", "type": "evidence", "label": e.evidence_type} for i, e in enumerate(evidence)],
                *[{"id": f"campaign_{i}", "type": "campaign", "label": c.campaign_name[:20]} for i, c in enumerate(campaigns)]
            ],
            "edges": [
                *[{"source": "message", "target": f"signal_{i}"} for i in range(len(signals))],
                *[{"source": f"signal_{i}", "target": f"evidence_{j}"} for i in range(len(signals)) for j in range(min(len(evidence), 2))]
            ]
        }
        
        return HumanReviewBriefResponse(
            brief_id=uuid4(),
            executive_summary=executive_summary,
            key_signals=key_signals,
            campaign_analysis={
                "count": campaign_count,
                "types": [c.campaign_type for c in campaigns],
                "confidence_scores": [c.confidence_score for c in campaigns]
            } if campaigns else {},
            verification_results=[
                {
                    "claim": vr.claim_text,
                    "status": vr.verification_status,
                    "confidence": vr.confidence_score
                }
                for vr in verification_results
            ],
            confidence_assessment=confidence_assessment,
            limitations_section=limitations_section,
            recommended_actions=recommended_actions,
            evidence_visualization=evidence_visualization,
            analysis_timestamp=datetime.utcnow()
        )