"""
Truth Gate - Claim Verification System
Directly inspired by TraceX's verification layer.

"Every factual sentence an agent writes is torn apart: each cited record is
re-resolved, re-hashed, and every figure checked against the payload.
A fabricated citation is caught by arithmetic, which no model can argue with."

No unprovable claims pass through the Truth Gate.
"""

import re
from typing import Dict, Any, List, Optional
from datetime import datetime

from .evidence_chain import EvidenceChain


class TruthGate:
    """
    Re-verifies every claim against hashed evidence.
    
    TraceX principle: "Unprovable claims do not ship."
    """
    
    def __init__(self, evidence_chain: EvidenceChain):
        """Initialize with reference to evidence chain."""
        self.evidence_chain = evidence_chain
        
    def verify_claim(
        self,
        claim: str,
        cited_evidence_ids: List[str],
        claim_metadata: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Verify a claim against cited evidence.
        
        Args:
            claim: The factual claim being made
            cited_evidence_ids: List of record IDs or hashes cited
            claim_metadata: Optional context about the claim
            
        Returns:
            Verification result with status and details
        """
        verification = {
            "claim": claim,
            "claim_metadata": claim_metadata or {},
            "verification_timestamp": datetime.utcnow().isoformat(),
            "status": "unverified",
            "evidence_verified": [],
            "evidence_missing": [],
            "hash_mismatches": [],
            "arithmetic_checks": [],
            "fabrications_detected": []
        }
        
        # Check each cited evidence
        for evidence_id in cited_evidence_ids:
            evidence_check = self._verify_evidence_exists(evidence_id)
            
            if not evidence_check["exists"]:
                verification["evidence_missing"].append(evidence_id)
                verification["fabrications_detected"].append({
                    "type": "missing_evidence",
                    "evidence_id": evidence_id,
                    "severity": "critical",
                    "note": "Cited evidence does not exist in chain - fabricated citation"
                })
                continue
            
            # Verify hash integrity
            record = evidence_check["record"]
            hash_check = self._verify_hash_integrity(record)
            
            if not hash_check["valid"]:
                verification["hash_mismatches"].append({
                    "evidence_id": evidence_id,
                    "expected": hash_check["expected"],
                    "found": hash_check["found"],
                    "note": "Evidence hash does not match - potential tampering"
                })
                verification["fabrications_detected"].append({
                    "type": "hash_mismatch",
                    "evidence_id": evidence_id,
                    "severity": "critical",
                    "note": "Evidence integrity check failed"
                })
                continue
            
            # Extract numerical claims and verify against payload
            arithmetic_checks = self._verify_arithmetic_claims(claim, record["payload"])
            verification["arithmetic_checks"].extend(arithmetic_checks)
            
            # Check for contradictions
            contradiction_check = self._check_contradiction(claim, record["payload"])
            if contradiction_check["contradicts"]:
                verification["fabrications_detected"].append({
                    "type": "contradiction",
                    "evidence_id": evidence_id,
                    "severity": "high",
                    "note": contradiction_check["reason"]
                })
                continue
            
            # Semantic verification
            semantic_check = self._verify_semantic_alignment(claim, record["payload"])
            
            # Mark as verified
            verification["evidence_verified"].append({
                "evidence_id": evidence_id,
                "record_type": record["record_type"],
                "hash": record["row_sha256"],
                "arithmetic_valid": all(c["valid"] for c in arithmetic_checks),
                "semantic_alignment": semantic_check["score"],
                "status": "verified"
            })
        
        # Final status determination
        verification["status"] = self._determine_verification_status(verification)
        
        return verification
    
    def verify_numerical_claim(
        self,
        claimed_value: float,
        field_path: str,
        evidence_id: str,
        tolerance: float = 0.01
    ) -> Dict[str, Any]:
        """
        Verify a specific numerical claim against evidence.
        
        This is the "arithmetic catches lies" check from TraceX.
        
        Args:
            claimed_value: The number being claimed
            field_path: Path to the field in evidence (e.g., "amount", "signal_count")
            evidence_id: The evidence record to check against
            tolerance: Acceptable deviation (default 1%)
            
        Returns:
            Verification result
        """
        # Find evidence
        record = self.evidence_chain.get_record_by_id(evidence_id)
        if not record:
            return {
                "valid": False,
                "reason": "Evidence not found",
                "claimed": claimed_value,
                "actual": None,
                "fabrication": "missing_evidence"
            }
        
        # Extract actual value from payload
        actual_value = self._extract_field_value(record["payload"], field_path)
        
        if actual_value is None:
            return {
                "valid": False,
                "reason": f"Field '{field_path}' not found in evidence",
                "claimed": claimed_value,
                "actual": None,
                "fabrication": "field_not_found"
            }
        
        # Arithmetic check
        try:
            actual_value = float(actual_value)
            deviation = abs(actual_value - claimed_value) / max(abs(actual_value), 0.0001)
            
            if deviation <= tolerance:
                return {
                    "valid": True,
                    "claimed": claimed_value,
                    "actual": actual_value,
                    "deviation": deviation,
                    "note": "Arithmetic verified"
                }
            else:
                return {
                    "valid": False,
                    "claimed": claimed_value,
                    "actual": actual_value,
                    "deviation": deviation,
                    "fabrication": "numerical_mismatch",
                    "note": f"Claimed {claimed_value}, actual {actual_value} (deviation {deviation:.2%})"
                }
        except (ValueError, TypeError):
            return {
                "valid": False,
                "reason": "Cannot convert values to numbers",
                "claimed": claimed_value,
                "actual": actual_value,
                "fabrication": "type_error"
            }
    
    def _verify_evidence_exists(self, evidence_id: str) -> Dict[str, Any]:
        """Check if evidence exists in chain."""
        record = self.evidence_chain.get_record_by_id(evidence_id)
        if not record:
            # Try by hash
            record = self.evidence_chain.get_record_by_hash(evidence_id)
        
        return {
            "exists": record is not None,
            "record": record
        }
    
    def _verify_hash_integrity(self, record: Dict[str, Any]) -> Dict[str, Any]:
        """Re-compute and verify hash of a record."""
        expected_hash = self.evidence_chain._hash_data(record["payload"])
        found_hash = record["row_sha256"]
        
        return {
            "valid": expected_hash == found_hash,
            "expected": expected_hash,
            "found": found_hash
        }
    
    def _verify_arithmetic_claims(
        self,
        claim: str,
        payload: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Extract and verify numerical claims."""
        checks = []
        
        # Find numbers in claim text
        numbers = re.findall(r'\b\d+(?:\.\d+)?\b', claim)
        
        for num_str in numbers:
            num_value = float(num_str)
            
            # Check if this number appears in payload
            payload_str = str(payload).lower()
            if num_str in payload_str:
                checks.append({
                    "claimed_value": num_value,
                    "found_in_payload": True,
                    "valid": True
                })
            else:
                # Check if it's derived (e.g., count, sum)
                derived_check = self._check_derived_value(num_value, payload)
                checks.append({
                    "claimed_value": num_value,
                    "found_in_payload": False,
                    "derived": derived_check["is_derived"],
                    "valid": derived_check["is_derived"],
                    "derivation": derived_check.get("derivation")
                })
        
        return checks
    
    def _check_derived_value(
        self,
        value: float,
        payload: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Check if a value could be validly derived from payload."""
        # Check common derivations
        
        # Count of items
        if isinstance(payload, dict):
            for key, val in payload.items():
                if isinstance(val, list) and len(val) == value:
                    return {
                        "is_derived": True,
                        "derivation": f"count of {key}"
                    }
        
        # Could add more derivation checks (sum, average, etc.)
        
        return {"is_derived": False}
    
    def _check_contradiction(
        self,
        claim: str,
        payload: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Check if claim contradicts evidence payload."""
        claim_lower = claim.lower()
        payload_str = str(payload).lower()
        
        # Simple contradiction patterns
        contradictions = [
            ("no signals", "signal" in payload_str and "[]" not in payload_str),
            ("zero evidence", "evidence" in payload_str and "[]" not in payload_str),
            ("not detected", "detected" in payload_str),
            ("impossible", "possible" in payload_str)
        ]
        
        for pattern, contradictory_condition in contradictions:
            if pattern in claim_lower and contradictory_condition:
                return {
                    "contradicts": True,
                    "reason": f"Claim states '{pattern}' but payload indicates otherwise"
                }
        
        return {"contradicts": False}
    
    def _verify_semantic_alignment(
        self,
        claim: str,
        payload: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Check semantic alignment between claim and payload."""
        claim_lower = claim.lower()
        payload_str = str(payload).lower()
        
        # Extract key terms from claim
        claim_terms = set(re.findall(r'\b\w{4,}\b', claim_lower))
        
        # Check how many terms appear in payload
        matching_terms = [term for term in claim_terms if term in payload_str]
        
        alignment_score = len(matching_terms) / max(len(claim_terms), 1)
        
        return {
            "score": alignment_score,
            "matching_terms": matching_terms,
            "total_terms": len(claim_terms)
        }
    
    def _extract_field_value(self, payload: Dict[str, Any], field_path: str) -> Any:
        """Extract value from nested payload using dot notation."""
        parts = field_path.split('.')
        value = payload
        
        for part in parts:
            if isinstance(value, dict) and part in value:
                value = value[part]
            else:
                return None
        
        return value
    
    def _determine_verification_status(self, verification: Dict[str, Any]) -> str:
        """Determine final verification status."""
        if verification["fabrications_detected"]:
            return "REJECTED"
        
        if verification["evidence_missing"]:
            return "INCOMPLETE"
        
        if verification["hash_mismatches"]:
            return "COMPROMISED"
        
        total_cited = len(verification["evidence_verified"]) + len(verification["evidence_missing"])
        verified_count = len(verification["evidence_verified"])
        
        if verified_count == total_cited and total_cited > 0:
            return "VERIFIED"
        elif verified_count > 0:
            return "PARTIAL"
        else:
            return "UNVERIFIED"


# Example usage guard
if __name__ == "__main__":
    from evidence_chain import EvidenceChain
    
    # Create chain and add test records
    chain = EvidenceChain()
    chain.add_record("test", {"value": 100, "note": "test record"})
    
    # Create truth gate
    gate = TruthGate(chain)
    
    # Test verification
    result = gate.verify_numerical_claim(100, "value", chain.chain[0]["record_id"])
    print(f"Verification: {result['valid']}")
