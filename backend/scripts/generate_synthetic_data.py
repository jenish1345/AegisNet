"""Synthetic data generator for AegisNet demo.

Generates realistic scam scenarios with Messages, Signals, Evidence, and Campaigns.
Saves data as JSON files in data/synthetic/ for demo use.
"""

import json
import uuid
import random
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict, Any


class SyntheticDataGenerator:
    """Generates synthetic scam data for AegisNet demo."""
    
    def __init__(self, output_dir: str = "data/synthetic"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Scam templates
        self.scam_templates = {
            "phishing": {
                "name": "Bank Phishing Scam",
                "description": "Impersonates banks to steal credentials",
                "signals": ["urgency", "authority", "fear"],
                "common_phrases": [
                    "Your account has been compromised",
                    "Click here to verify your identity",
                    "Immediate action required",
                    "Security alert: unusual login detected"
                ]
            },
            "investment_scam": {
                "name": "Cryptocurrency Investment Scam",
                "description": "Promises high returns on fake investments",
                "signals": ["greed", "urgency", "social_proof"],
                "common_phrases": [
                    "Earn 500% returns in 30 days",
                    "Limited time opportunity",
                    "Thousands have already joined",
                    "Guaranteed profits, no risk"
                ]
            },
            "romance_scam": {
                "name": "Romance Scam",
                "description": "Builds emotional connection for financial gain",
                "signals": ["social_proof", "reciprocity", "urgency"],
                "common_phrases": [
                    "I need your help with an emergency",
                    "You're the only one I can trust",
                    "I'll pay you back as soon as I can",
                    "Our connection is special"
                ]
            }
        }
    
    def generate_scenarios(self) -> Dict[str, Any]:
        """Generate 3 realistic scam scenarios."""
        scenarios = {}
        
        for i, (scam_type, template) in enumerate(self.scam_templates.items()):
            scenario_id = f"{scam_type}_{i+1}"
            scenarios[scenario_id] = self._generate_scenario(scam_type, template)
        
        return scenarios
    
    def _generate_scenario(self, scam_type: str, template: Dict[str, Any]) -> Dict[str, Any]:
        """Generate a complete scam scenario."""
        scenario_id = f"{scam_type}_{uuid.uuid4().hex[:8]}"
        
        # Generate messages for this scenario (3-5 messages per campaign)
        num_messages = random.randint(3, 5)
        messages = []
        all_signals = []
        
        base_time = datetime.utcnow() - timedelta(days=random.randint(1, 7))
        
        for i in range(num_messages):
            message, signals = self._generate_message(scam_type, template, i, base_time)
            messages.append(message)
            all_signals.extend(signals)
        
        # Generate evidence from signals
        evidence = self._generate_evidence(all_signals, scam_type)
        
        # Generate campaign
        campaign = self._generate_campaign(scam_type, template, messages, all_signals, evidence)
        
        # Generate verification results
        verification_results = self._generate_verification_results(scam_type, template)
        
        # Generate human review brief
        human_review_brief = self._generate_human_review_brief(
            scam_type, template, messages, all_signals, evidence, campaign, verification_results
        )
        
        return {
            "scenario_id": scenario_id,
            "scam_type": scam_type,
            "name": template["name"],
            "description": template["description"],
            "messages": messages,
            "signals": all_signals,
            "evidence": evidence,
            "campaign": campaign,
            "verification_results": verification_results,
            "human_review_brief": human_review_brief,
            "generated_at": datetime.utcnow().isoformat()
        }
    
    def _generate_message(
        self, 
        scam_type: str, 
        template: Dict[str, Any], 
        message_idx: int,
        base_time: datetime
    ) -> tuple[Dict[str, Any], List[Dict[str, Any]]]:
        """Generate a synthetic scam message with signals."""
        message_id = f"msg_{uuid.uuid4().hex[:8]}"
        
        # Create message content using template phrases
        phrases = template["common_phrases"]
        selected_phrases = random.sample(phrases, min(3, len(phrases)))
        content = " ".join(selected_phrases)
        
        # Add some variation
        variations = [
            "Please respond ASAP.",
            "Don't miss this opportunity.",
            "This is a confidential communication.",
            "Forward to friends and family."
        ]
        content += " " + random.choice(variations)
        
        # Generate sender/receiver info
        senders = {
            "phishing": ["security@yourbank.com", "support@paypal-security.com", "noreply@amazon-alerts.com"],
            "investment_scam": ["investments@cryptogrowth.com", "support@bitcoin-opportunity.net", "team@wealthbuilder.io"],
            "romance_scam": ["john.doe@example.com", "sarah.connor@mail.com", "david.smith@personal.com"]
        }
        
        receivers = ["user@example.com", "customer@gmail.com", "client@outlook.com"]
        
        # Create message
        message = {
            "message_id": message_id,
            "content": content,
            "sender_info": {
                "email": random.choice(senders[scam_type]),
                "name": f"Sender {message_idx+1}",
                "type": "suspicious"
            },
            "receiver_info": {
                "email": random.choice(receivers),
                "name": "Potential Victim"
            },
            "channel_type": "email",
            "timestamp": (base_time + timedelta(hours=message_idx * random.randint(1, 6))).isoformat(),
            "metadata": {
                "subject": f"URGENT: {random.choice(['Action Required', 'Important Update', 'Security Alert'])}",
                "priority": "high"
            },
            "source_hash": f"hash_{uuid.uuid4().hex[:8]}"
        }
        
        # Generate signals for this message
        signals = []
        signal_types = template["signals"]
        
        for signal_type in signal_types[:random.randint(2, len(signal_types))]:
            signal = {
                "signal_id": f"sig_{uuid.uuid4().hex[:8]}",
                "message_id": message_id,
                "signal_type": signal_type,
                "confidence_score": round(random.uniform(0.6, 0.95), 2),
                "extracted_text": random.choice(template["common_phrases"]),
                "pattern_matched": f"{signal_type}_pattern_{random.randint(1, 5)}",
                "position_range": {"start": 0, "end": len(content)},
                "context_window": content[:100] + "..." if len(content) > 100 else content,
                "extraction_timestamp": datetime.utcnow().isoformat(),
                "extraction_model": "rule_based"
            }
            signals.append(signal)
        
        return message, signals
    
    def _generate_evidence(
        self, 
        signals: List[Dict[str, Any]], 
        scam_type: str
    ) -> List[Dict[str, Any]]:
        """Generate evidence from signals."""
        evidence = []
        
        if not signals:
            return evidence
        
        # Group signals by type
        signal_groups = {}
        for signal in signals:
            sig_type = signal["signal_type"]
            if sig_type not in signal_groups:
                signal_groups[sig_type] = []
            signal_groups[sig_type].append(signal)
        
        # Create evidence for signal groups
        for sig_type, group in signal_groups.items():
            if len(group) >= 2:
                evidence.append({
                    "evidence_id": f"ev_{uuid.uuid4().hex[:8]}",
                    "evidence_type": self._map_signal_to_evidence(sig_type),
                    "content": {
                        "signal_type": sig_type,
                        "signal_count": len(group),
                        "signal_ids": [s["signal_id"] for s in group],
                        "coordination_level": "medium",
                        "analysis": f"Multiple {sig_type} signals detected"
                    },
                    "source_description": f"Correlation of {len(group)} {sig_type} signals",
                    "confidence_score": round(random.uniform(0.7, 0.9), 2),
                    "collection_timestamp": datetime.utcnow().isoformat(),
                    "limitations": "Synthetic data for demo purposes"
                })
        
        # Add temporal evidence
        evidence.append({
            "evidence_id": f"ev_{uuid.uuid4().hex[:8]}",
            "evidence_type": "temporal",
            "content": {
                "signal_count": len(signals),
                "time_pattern": "clustered",
                "duration_hours": 24,
                "analysis": "Signals detected within short time window"
            },
            "source_description": "Temporal pattern analysis",
            "confidence_score": 0.75,
            "collection_timestamp": datetime.utcnow().isoformat(),
            "limitations": "Based on synthetic timestamps"
        })
        
        # Add scam type specific evidence
        scam_evidence = {
            "phishing": {
                "type": "linguistic",
                "content": {"patterns": ["banking_terms", "security_phrases", "urgency_markers"]}
            },
            "investment_scam": {
                "type": "behavioral", 
                "content": {"patterns": ["high_returns", "limited_time", "social_proof"]}
            },
            "romance_scam": {
                "type": "network",
                "content": {"patterns": ["emotional_appeals", "trust_building", "emergency_requests"]}
            }
        }
        
        if scam_type in scam_evidence:
            evidence.append({
                "evidence_id": f"ev_{uuid.uuid4().hex[:8]}",
                "evidence_type": scam_evidence[scam_type]["type"],
                "content": scam_evidence[scam_type]["content"],
                "source_description": f"{scam_type.replace('_', ' ').title()} pattern analysis",
                "confidence_score": 0.8,
                "collection_timestamp": datetime.utcnow().isoformat(),
                "limitations": "Pattern matching based on scam type"
            })
        
        return evidence
    
    def _generate_campaign(
        self,
        scam_type: str,
        template: Dict[str, Any],
        messages: List[Dict[str, Any]],
        signals: List[Dict[str, Any]],
        evidence: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """Generate a campaign from messages, signals, and evidence."""
        campaign_id = f"camp_{uuid.uuid4().hex[:8]}"
        
        signal_ids = [s["signal_id"] for s in signals]
        evidence_ids = [e["evidence_id"] for e in evidence]
        
        campaign_types = {
            "phishing": "phishing",
            "investment_scam": "investment_scam",
            "romance_scam": "romance_scam"
        }
        
        return {
            "campaign_id": campaign_id,
            "campaign_name": template["name"],
            "campaign_type": campaign_types.get(scam_type, "phishing"),
            "confidence_score": round(random.uniform(0.7, 0.9), 2),
            "estimated_scale": len(messages) * random.randint(10, 100),
            "signal_ids": signal_ids,
            "evidence_ids": evidence_ids,
            "message_ids": [m["message_id"] for m in messages],
            "temporal_pattern": {
                "duration_days": random.randint(1, 14),
                "frequency": "ongoing",
                "first_seen": (datetime.utcnow() - timedelta(days=7)).isoformat(),
                "last_seen": datetime.utcnow().isoformat()
            },
            "primary_tactics": template["signals"],
            "status": "active",
            "reconstruction_notes": f"Reconstructed from {len(messages)} messages and {len(signals)} signals",
            "meta": {
                "scam_type": scam_type,
                "message_count": len(messages),
                "signal_count": len(signals),
                "evidence_count": len(evidence)
            }
        }
    
    def _generate_verification_results(
        self, 
        scam_type: str, 
        template: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Generate verification results for claims."""
        claims = {
            "phishing": [
                "Message impersonates a legitimate bank",
                "Contains urgent security warnings",
                "Requests sensitive information",
                "Uses deceptive links"
            ],
            "investment_scam": [
                "Promises unrealistic returns",
                "Uses high-pressure tactics", 
                "Lacks proper registration",
                "Makes guaranteed profit claims"
            ],
            "romance_scam": [
                "Builds emotional connection quickly",
                "Requests financial assistance",
                "Uses fabricated personal stories",
                "Avoids in-person meetings"
            ]
        }
        
        verification_results = []
        status_options = ["supported", "contradicted", "inconclusive"]
        
        for claim in claims.get(scam_type, []):
            status = random.choice(status_options)
            confidence = round(random.uniform(0.6, 0.95), 2) if status == "supported" else round(random.uniform(0.3, 0.7), 2)
            
            verification_results.append({
                "verification_id": f"ver_{uuid.uuid4().hex[:8]}",
                "claim_text": claim,
                "claim_source": "scam_analysis",
                "verification_status": status,
                "confidence_score": confidence,
                "supporting_evidence": [f"ev_{uuid.uuid4().hex[:8]}" for _ in range(random.randint(1, 3))] if status == "supported" else [],
                "contradicting_evidence": [f"ev_{uuid.uuid4().hex[:8]}" for _ in range(random.randint(1, 2))] if status == "contradicted" else [],
                "evidence_gaps": ["More recipient data needed", "Sender verification incomplete"] if status == "inconclusive" else [],
                "alternative_explanations": ["Legitimate marketing", "User error", "System misclassification"] if status != "supported" else [],
                "verification_method": "rule_based_analysis",
                "limitations": "Synthetic verification for demo"
            })
        
        return verification_results
    
    def _generate_human_review_brief(
        self,
        scam_type: str,
        template: Dict[str, Any],
        messages: List[Dict[str, Any]],
        signals: List[Dict[str, Any]],
        evidence: List[Dict[str, Any]],
        campaign: Dict[str, Any],
        verification_results: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """Generate a human review brief."""
        signal_types = list(set([s["signal_type"] for s in signals]))
        
        return {
            "brief_id": f"brief_{uuid.uuid4().hex[:8]}",
            "executive_summary": (
                f"Analysis of {len(messages)} suspicious messages identified a potential "
                f"{template['name']}. {len(signals)} scam signals detected across "
                f"{len(evidence)} evidence points. Campaign confidence: {campaign['confidence_score']:.2f}."
            ),
            "key_signals": [
                {
                    "type": sig_type,
                    "count": len([s for s in signals if s["signal_type"] == sig_type]),
                    "average_confidence": round(
                        sum([s["confidence_score"] for s in signals if s["signal_type"] == sig_type]) / 
                        max(len([s for s in signals if s["signal_type"] == sig_type]), 1), 2
                    )
                }
                for sig_type in signal_types
            ],
            "campaign_analysis": {
                "type": campaign["campaign_type"],
                "confidence": campaign["confidence_score"],
                "estimated_scale": campaign["estimated_scale"],
                "primary_tactics": campaign["primary_tactics"],
                "status": campaign["status"]
            },
            "verification_results": [
                {
                    "claim": vr["claim_text"][:50] + "..." if len(vr["claim_text"]) > 50 else vr["claim_text"],
                    "status": vr["verification_status"],
                    "confidence": vr["confidence_score"]
                }
                for vr in verification_results[:5]
            ],
            "confidence_assessment": {
                "overall": campaign["confidence_score"],
                "signals": round(sum([s["confidence_score"] for s in signals]) / max(len(signals), 1), 2),
                "evidence": round(sum([e["confidence_score"] for e in evidence]) / max(len(evidence), 1), 2),
                "verification": round(sum([vr["confidence_score"] for vr in verification_results]) / max(len(verification_results), 1), 2)
            },
            "limitations_section": (
                "LIMITATIONS:\n"
                "1. Analysis based on synthetic data for demo purposes\n"
                "2. Confidence scores are simulated\n"
                "3. Limited to predefined scam patterns\n"
                "4. No real-world validation performed\n\n"
                "ETHICAL BOUNDARIES:\n"
                "- This system provides analysis only\n"
                "- Does NOT determine guilt or intent\n"
                "- Does NOT freeze accounts or block communications\n"
                "- Does NOT contact victims automatically\n"
                "- All decisions require human review"
            ),
            "recommended_actions": [
                "Review message metadata and sender patterns",
                "Check against known fraud databases",
                "Consider requesting additional context",
                "Document findings in case management system",
                "Escalate for senior analyst review if confidence > 0.7"
            ],
            "analysis_timestamp": datetime.utcnow().isoformat()
        }
    
    def _map_signal_to_evidence(self, signal_type: str) -> str:
        """Map signal type to evidence type."""
        mapping = {
            "urgency": "temporal",
            "authority": "linguistic",
            "reciprocity": "behavioral",
            "fear": "behavioral",
            "greed": "behavioral",
            "social_proof": "network"
        }
        return mapping.get(signal_type, "linguistic")
    
    def save_scenarios(self, scenarios: Dict[str, Any]):
        """Save generated scenarios to JSON files."""
        # Save all scenarios together
        all_scenarios_file = self.output_dir / "all_scenarios.json"
        with open(all_scenarios_file, 'w') as f:
            json.dump({
                "generated_at": datetime.utcnow().isoformat(),
                "scenario_count": len(scenarios),
                "scenarios": scenarios
            }, f, indent=2, default=str)
        
        # Save individual scenarios
        for scenario_id, scenario in scenarios.items():
            scenario_file = self.output_dir / f"{scenario_id}.json"
            with open(scenario_file, 'w') as f:
                json.dump(scenario, f, indent=2, default=str)
        
        print(f"Saved {len(scenarios)} scenarios to {self.output_dir}")
        print(f"  - All scenarios: {all_scenarios_file}")
        for scenario_id in scenarios.keys():
            print(f"  - {scenario_id}: {self.output_dir / f'{scenario_id}.json'}")


def main():
    """Generate and save synthetic data."""
    generator = SyntheticDataGenerator()
    
    print("Generating synthetic scam scenarios for AegisNet demo...")
    scenarios = generator.generate_scenarios()
    
    print(f"Generated {len(scenarios)} scenarios:")
    for scenario_id, scenario in scenarios.items():
        print(f"  - {scenario['name']} ({scenario_id}):")
        print(f"      Messages: {len(scenario['messages'])}")
        print(f"      Signals: {len(scenario['signals'])}")
        print(f"      Evidence: {len(scenario['evidence'])}")
    
    generator.save_scenarios(scenarios)
    
    print("\nSynthetic data generation complete!")
    print("Use this data for AegisNet demo testing and development.")


if __name__ == "__main__":
    main()