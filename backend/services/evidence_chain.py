"""
Evidence Hash-Chain Implementation
Cryptographically linked ledger system for tamper-evident data logging.

Every record gets SHA-256 hashed at ingest and linked to previous hash.
Tamper = chain breaks = instant detection.
"""

import hashlib
import json
from datetime import datetime
from typing import Dict, Any, List, Optional
from uuid import uuid4, UUID


class EvidenceChain:
    """
    Hash-linked evidence chain - tamper-evident integrity guarantee.
    
    Each record is SHA-256 hashed and linked to the previous hash,
    creating an append-only chain where any tampering breaks the chain
    at that point and all subsequent points.
    """
    
    def __init__(self):
        """Initialize with genesis block."""
        self.chain: List[Dict[str, Any]] = []
        self.genesis_hash = self._hash_data({
            "genesis": "AegisNet Evidence Chain",
            "created_at": datetime.utcnow().isoformat(),
            "version": "1.0"
        })
        
    def add_record(
        self,
        record_type: str,
        payload: Dict[str, Any],
        source_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Add a record to the evidence chain with hash linkage.
        
        Args:
            record_type: Type of record (message, signal, evidence, campaign, etc.)
            payload: The actual data being recorded
            source_id: Optional identifier linking to source
            
        Returns:
            The complete record with hashes
        """
        # Get previous hash (genesis or last record)
        prev_hash = self.genesis_hash if not self.chain else self.chain[-1]["current_hash"]
        
        # Create record structure
        record = {
            "record_id": str(uuid4()),
            "record_type": record_type,
            "payload": payload,
            "source_id": source_id,
            "timestamp": datetime.utcnow().isoformat(),
            "row_number": len(self.chain),
            "prev_hash": prev_hash,
        }
        
        # Hash the payload
        record["row_sha256"] = self._hash_data(payload)
        
        # Hash the complete record (linking to previous)
        record["current_hash"] = self._hash_data({
            "row_sha256": record["row_sha256"],
            "prev_hash": prev_hash,
            "row_number": record["row_number"],
            "record_type": record_type,
            "timestamp": record["timestamp"]
        })
        
        # Append to chain
        self.chain.append(record)
        
        return record
    
    def verify_integrity(self) -> Dict[str, Any]:
        """
        Verify the complete chain integrity.
        
        Returns:
            Verification result with details of any break point
        """
        if not self.chain:
            return {
                "valid": True,
                "total_records": 0,
                "message": "Empty chain (valid)"
            }
        
        prev_hash = self.genesis_hash
        
        for i, record in enumerate(self.chain):
            # Check if prev_hash matches
            if record["prev_hash"] != prev_hash:
                return {
                    "valid": False,
                    "broken_at": i,
                    "row_number": record["row_number"],
                    "record_type": record["record_type"],
                    "expected_prev_hash": prev_hash,
                    "found_prev_hash": record["prev_hash"],
                    "message": f"Chain breaks at row {i}: prev_hash mismatch"
                }
            
            # Recompute payload hash
            recomputed_payload_hash = self._hash_data(record["payload"])
            if recomputed_payload_hash != record["row_sha256"]:
                return {
                    "valid": False,
                    "broken_at": i,
                    "row_number": record["row_number"],
                    "record_type": record["record_type"],
                    "tampering_type": "payload_modified",
                    "expected_hash": recomputed_payload_hash,
                    "found_hash": record["row_sha256"],
                    "message": f"Chain breaks at row {i}: payload has been tampered with"
                }
            
            # Recompute current hash
            recomputed_current = self._hash_data({
                "row_sha256": record["row_sha256"],
                "prev_hash": prev_hash,
                "row_number": record["row_number"],
                "record_type": record["record_type"],
                "timestamp": record["timestamp"]
            })
            
            if recomputed_current != record["current_hash"]:
                return {
                    "valid": False,
                    "broken_at": i,
                    "row_number": record["row_number"],
                    "record_type": record["record_type"],
                    "tampering_type": "hash_mismatch",
                    "expected_hash": recomputed_current,
                    "found_hash": record["current_hash"],
                    "message": f"Chain breaks at row {i}: current_hash mismatch"
                }
            
            # Update for next iteration
            prev_hash = record["current_hash"]
        
        return {
            "valid": True,
            "total_records": len(self.chain),
            "chain_head": self.chain[-1]["current_hash"] if self.chain else self.genesis_hash,
            "message": f"Chain valid: {len(self.chain)} records verified"
        }
    
    def tamper_drill(self, row_number: int, field: str, new_value: Any) -> Dict[str, Any]:
        """
        Intentionally tamper with a record to demonstrate chain breaking.
        
        This is the integrity verification drill - allows users to see
        how the integrity system catches modifications.
        
        Args:
            row_number: Which row to tamper with
            field: Which field in the payload to modify
            new_value: The new (tampered) value
            
        Returns:
            Result showing where the chain breaks
        """
        if row_number >= len(self.chain):
            return {"error": f"Row {row_number} does not exist"}
        
        # Save original value
        original = self.chain[row_number]["payload"].get(field)
        
        # Tamper with the record
        self.chain[row_number]["payload"][field] = new_value
        
        # Verify integrity (should break)
        integrity = self.verify_integrity()
        
        # Restore original
        self.chain[row_number]["payload"][field] = original
        
        return {
            "tamper_applied": {
                "row_number": row_number,
                "field": field,
                "original_value": original,
                "tampered_value": new_value
            },
            "integrity_check": integrity,
            "demonstration": "This shows how tampering breaks the chain at that point",
            "restored": True
        }
    
    def get_record_by_hash(self, row_hash: str) -> Optional[Dict[str, Any]]:
        """Find a record by its row_sha256 hash."""
        for record in self.chain:
            if record["row_sha256"] == row_hash:
                return record
        return None
    
    def get_record_by_id(self, record_id: str) -> Optional[Dict[str, Any]]:
        """Find a record by its record_id."""
        for record in self.chain:
            if record["record_id"] == record_id:
                return record
        return None
    
    def get_chain_statistics(self) -> Dict[str, Any]:
        """Get statistics about the chain."""
        if not self.chain:
            return {"total_records": 0, "record_types": {}}
        
        record_types = {}
        for record in self.chain:
            rt = record["record_type"]
            record_types[rt] = record_types.get(rt, 0) + 1
        
        return {
            "total_records": len(self.chain),
            "genesis_hash": self.genesis_hash,
            "chain_head": self.chain[-1]["current_hash"],
            "record_types": record_types,
            "first_record_time": self.chain[0]["timestamp"],
            "last_record_time": self.chain[-1]["timestamp"]
        }
    
    def _hash_data(self, data: Any) -> str:
        """
        SHA-256 hash of data.
        
        Uses sorted JSON for deterministic hashing.
        """
        if isinstance(data, dict):
            json_str = json.dumps(data, sort_keys=True, default=str)
        else:
            json_str = json.dumps(data, default=str)
        
        return hashlib.sha256(json_str.encode()).hexdigest()
    
    def export_chain(self) -> Dict[str, Any]:
        """Export the complete chain for persistence or transmission."""
        return {
            "genesis_hash": self.genesis_hash,
            "chain_length": len(self.chain),
            "records": self.chain,
            "exported_at": datetime.utcnow().isoformat()
        }
    
    def import_chain(self, exported_data: Dict[str, Any]) -> bool:
        """
        Import a previously exported chain.
        
        Verifies integrity after import.
        """
        if exported_data["genesis_hash"] != self.genesis_hash:
            raise ValueError("Genesis hash mismatch - cannot import chain from different source")
        
        self.chain = exported_data["records"]
        
        # Verify integrity
        integrity = self.verify_integrity()
        
        return integrity["valid"]


# Global evidence chain instance
evidence_chain = EvidenceChain()
