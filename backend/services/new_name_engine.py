"""[NEW_NAME] engine for evidence correlation and campaign reconstruction.

[NEW_NAME] handles steps 3-5 of the AegisNet pipeline:
- Step 3: Evidence correlation
- Step 4: Campaign reconstruction  
- Step 5: Counter-evidence check

NOTE: This is a reference implementation using rule-based logic.
In production, replace with actual AI/ML algorithms for:
- Signal similarity calculation
- Graph-based evidence correlation
- Campaign clustering
- Counter-evidence generation
"""

import uuid
import random
from typing import List, Dict, Any
from datetime import datetime, timedelta

from config import settings


class NewNameEngine:
    """[NEW_NAME] engine implementing evidence correlation and campaign reconstruction."""
    
    def __init__(self):
        # Configuration sourced from application settings
        self.similarity_threshold = settings.new_name_similarity_threshold
        self.min_campaign_signals = settings.new_name_min_samples
        self.evidence_types = ["temporal", "geographic", "linguistic", "behavioral", "network"]
        
    def correlate_signals(self, signals: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Step 3: Evidence correlation.
        
        Creates an evidence graph linking signals to supporting evidence.
        
        Args:
            signals: List of Signal dicts from message NLP analysis
            
        Returns:
            Evidence graph dict with nodes and edges
        """
        if not signals:
            return {"nodes": [], "edges": [], "meta": {"note": "No signals to correlate"}}
        
        # Generate evidence from signal correlations
        evidence_nodes = self._generate_evidence_from_signals(signals)
        
        # Build graph structure
        nodes = []
        edges = []
        
        # Add signal nodes
        for i, signal in enumerate(signals):
            node_id = f"signal_{signal.get('signal_id', f's{i}')}"
            nodes.append({
                "id": node_id,
                "type": "signal",
                "signal_type": signal.get("signal_type", "unknown"),
                "confidence": signal.get("confidence_score", 0.5),
                "extracted_text": signal.get("extracted_text", "")[:50],
                "data": signal
            })
            
            # Connect signals to evidence (simple rule: connect to first 2 evidence nodes)
            for j, evidence in enumerate(evidence_nodes[:2]):
                edge_id = f"edge_{i}_{j}"
                edges.append({
                    "id": edge_id,
                    "source": node_id,
                    "target": evidence["id"],
                    "type": "supports",
                    "weight": 0.5 + (i * 0.1)  # Mock weight
                })
        
        # Add evidence nodes
        nodes.extend(evidence_nodes)
        
        return {
            "nodes": nodes,
            "edges": edges,
            "meta": {
                "signal_count": len(signals),
                "evidence_count": len(evidence_nodes),
                "edge_count": len(edges),
                "correlation_method": "rule_based_mock",
                "timestamp": datetime.utcnow().isoformat(),
                "note": "Mock evidence correlation - replace with actual graph algorithms"
            }
        }
    
    def build_campaign_graph(
        self,
        signals: List[Dict[str, Any]],
        evidence_graph: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """
        Step 4: Campaign reconstruction.
        
        Groups related signals/evidence into Campaign entities.
        
        Args:
            signals: List of Signal dicts
            evidence_graph: Evidence graph from correlate_signals()
            
        Returns:
            List of Campaign dicts
        """
        if not signals:
            return []
        
        # Extract signal types for clustering
        signal_types = [s.get("signal_type", "unknown") for s in signals]
        unique_types = list(set(signal_types))
        
        campaigns = []
        
        # Create campaigns based on signal type clusters
        for campaign_idx, signal_type in enumerate(unique_types):
            # Find signals of this type
            type_signals = [s for s in signals if s.get("signal_type") == signal_type]
            
            if len(type_signals) >= self.min_campaign_signals:
                # Generate campaign ID
                campaign_id = f"campaign_{uuid.uuid4().hex[:8]}"
                
                # Get signal IDs
                signal_ids = [s.get("signal_id", f"signal_{i}") 
                            for i, s in enumerate(type_signals)]
                
                # Get evidence IDs from graph (first few evidence nodes)
                evidence_ids = []
                evidence_nodes = [n for n in evidence_graph.get("nodes", []) 
                                 if n.get("type") == "evidence"]
                if evidence_nodes:
                    evidence_ids = [n["id"] for n in evidence_nodes[:3]]
                
                # Determine campaign type based on signal type
                campaign_type = self._map_signal_to_campaign(signal_type)
                
                campaigns.append({
                    "campaign_id": campaign_id,
                    "signal_ids": signal_ids,
                    "evidence_ids": evidence_ids,
                    "confidence": 0.6 + (random.random() * 0.3),  # 0.6-0.9
                    "description": f"Potential {campaign_type.replace('_', ' ').title()} campaign "
                                  f"detected through {signal_type} signal patterns",
                    "meta": {
                        "campaign_type": campaign_type,
                        "signal_count": len(type_signals),
                        "evidence_count": len(evidence_ids),
                        "primary_signal_type": signal_type,
                        "reconstruction_method": "rule_based_clustering",
                        "timestamp": datetime.utcnow().isoformat(),
                        "note": "Mock campaign reconstruction - replace with actual clustering algorithms"
                    }
                })
        
        # If no campaigns created from clustering, create a generic one
        if not campaigns and signals:
            campaign_id = f"campaign_{uuid.uuid4().hex[:8]}"
            signal_ids = [s.get("signal_id", f"signal_{i}") for i, s in enumerate(signals)]
            
            campaigns.append({
                "campaign_id": campaign_id,
                "signal_ids": signal_ids,
                "evidence_ids": [],
                "confidence": 0.5,
                "description": "Generic scam campaign detected from multiple signals",
                "meta": {
                    "campaign_type": "phishing",
                    "signal_count": len(signals),
                    "evidence_count": 0,
                    "reconstruction_method": "fallback_generic",
                    "timestamp": datetime.utcnow().isoformat(),
                    "note": "Fallback campaign - insufficient signals for type-based clustering"
                }
            })
        
        return campaigns
    
    def get_counter_evidence(
        self,
        claim: Dict[str, Any],
        evidence_graph: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """
        Step 5: Counter-evidence check.
        
        Identifies conflicting evidence for claims.
        
        Args:
            claim: Claim dict to check
            evidence_graph: Evidence graph from correlate_signals()
            
        Returns:
            List of counter-evidence dicts
        """
        counter_evidence = []
        
        # Extract claim text for analysis
        claim_text = claim.get("text", "").lower()
        claim_source = claim.get("source", "unknown")
        
        # Analyze claim for scam indicators
        scam_indicators = ["urgent", "immediately", "free", "guaranteed", "risk-free", 
                          "limited", "click", "verify", "security", "account"]
        
        found_indicators = [ind for ind in scam_indicators if ind in claim_text]
        
        if found_indicators:
            # Generate counter-evidence for scam indicators
            counter_evidence.append({
                "evidence_id": f"counter_{uuid.uuid4().hex[:8]}",
                "type": "linguistic",
                "summary": f"Claim contains potential scam indicators: {', '.join(found_indicators[:3])}",
                "confidence": min(0.7 + (len(found_indicators) * 0.05), 0.95),
                "provenance": {
                    "source": "linguistic_analysis",
                    "method": "keyword_matching",
                    "indicators_found": found_indicators,
                    "claim_source": claim_source
                }
            })
        
        # Add generic counter-evidence about limitations
        counter_evidence.append({
            "evidence_id": f"counter_{uuid.uuid4().hex[:8]}",
            "type": "behavioral",  # Changed from "methodological" to "behavioral" to match enum
            "summary": "Analysis based on single claim verification - consider full context",
            "confidence": 0.8,
            "provenance": {
                "source": "system_limitations",
                "method": "limitations_analysis",
                "limitation": "single_claim_analysis",
                "recommendation": "Verify against complete message and additional evidence"
            }
        })
        
        # Add counter-evidence from graph analysis if available
        evidence_nodes = [n for n in evidence_graph.get("nodes", []) 
                         if n.get("type") == "evidence"]
        
        if evidence_nodes:
            # Check for low-confidence evidence
            low_confidence_evidence = [n for n in evidence_nodes 
                                      if n.get("confidence", 1.0) < 0.6]
            
            if low_confidence_evidence:
                counter_evidence.append({
                    "evidence_id": f"counter_{uuid.uuid4().hex[:8]}",
                    "type": "behavioral",  # Evidence quality check mapped to behavioral type
                    "summary": f"{len(low_confidence_evidence)} evidence points have low confidence (< 0.6)",
                    "confidence": 0.75,
                    "provenance": {
                        "source": "evidence_quality_check",
                        "method": "confidence_threshold",
                        "low_confidence_count": len(low_confidence_evidence),
                        "threshold": 0.6
                    }
                })
        
        return counter_evidence
    
    # Internal helper methods
    
    def _generate_evidence_from_signals(
        self, 
        signals: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """Generate evidence nodes from signal analysis."""
        evidence_nodes = []
        
        # Group signals by type
        signal_groups = {}
        for signal in signals:
            sig_type = signal.get("signal_type", "unknown")
            if sig_type not in signal_groups:
                signal_groups[sig_type] = []
            signal_groups[sig_type].append(signal)
        
        # Create evidence for each signal type group
        for idx, (sig_type, group) in enumerate(signal_groups.items()):
            if len(group) >= 1:
                evidence_id = f"evidence_{uuid.uuid4().hex[:8]}"
                
                # Determine evidence type based on signal type
                evidence_type = self._map_signal_to_evidence(sig_type)
                
                evidence_nodes.append({
                    "id": evidence_id,
                    "type": "evidence",
                    "evidence_type": evidence_type,
                    "confidence": 0.7 + (random.random() * 0.2),  # 0.7-0.9
                    "summary": f"Correlated {len(group)} {sig_type} signals",
                    "data": {
                        "signal_type": sig_type,
                        "signal_count": len(group),
                        "signal_ids": [s.get("signal_id", f"signal_{i}") 
                                      for i, s in enumerate(group)],
                        "extraction_times": [datetime.utcnow().isoformat() 
                                           for _ in range(len(group))],
                        "analysis": f"Pattern correlation of {sig_type} indicators"
                    }
                })
        
        # Add temporal evidence if multiple signals
        if len(signals) >= 2:
            evidence_id = f"evidence_{uuid.uuid4().hex[:8]}"
            evidence_nodes.append({
                "id": evidence_id,
                "type": "evidence",
                "evidence_type": "temporal",
                "confidence": 0.65,
                "summary": f"Temporal correlation of {len(signals)} signals",
                "data": {
                    "signal_count": len(signals),
                    "time_range": "simultaneous",
                    "coordination_level": "medium",
                    "analysis": "Signals extracted within short time window"
                }
            })
        
        return evidence_nodes
    
    def _map_signal_to_evidence(self, signal_type: str) -> str:
        """Map signal type to appropriate evidence type."""
        mapping = {
            "urgency": "temporal",
            "authority": "linguistic",
            "reciprocity": "behavioral",
            "fear": "behavioral",
            "greed": "behavioral",
            "social_proof": "network"
        }
        return mapping.get(signal_type, "linguistic")
    
    def _map_signal_to_campaign(self, signal_type: str) -> str:
        """Map signal type to campaign type."""
        mapping = {
            "urgency": "phishing",
            "authority": "phishing",
            "reciprocity": "investment_scam",
            "fear": "tech_support",
            "greed": "investment_scam",
            "social_proof": "romance_scam"
        }
        return mapping.get(signal_type, "phishing")


# Singleton instance for easy access
new_name_engine = NewNameEngine()
