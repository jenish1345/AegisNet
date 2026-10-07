"""Main FastAPI application for AegisNet."""

import time
from typing import Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from models.schemas import (
    PipelineRequest, PipelineResponse, 
    MessageCreate, MessageResponse
)
from services.pipeline import PipelineService
from services.evidence_chain import evidence_chain
from services.truth_gate import TruthGate


# Initialize FastAPI app
app = FastAPI(
    title=settings.api_title,
    description=settings.api_description,
    version=settings.api_version,
    debug=settings.debug,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize pipeline service
pipeline_service = PipelineService()

# Initialize truth gate
truth_gate = TruthGate(evidence_chain)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Welcome to AegisNet API",
        "description": "Evidence-Grounded AI for Scam Network Intelligence",
        "version": settings.api_version,
        "docs": "/docs",
        "health": "/health"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "AegisNet API",
        "version": settings.api_version,
        "timestamp": time.time(),
        "demo_mode": settings.demo_mode,
        "new_name_enabled": settings.new_name_enabled
    }


@app.post("/demo/ingest", response_model=PipelineResponse)
async def ingest_message(request: PipelineRequest):
    """
    Ingest a suspicious message and run through the 7-step pipeline.
    
    Steps:
    1. Ingest suspicious message
    2. Extract scam signals (NLP features/patterns)
    3. Evidence correlation via [NEW_NAME]
    4. Campaign reconstruction via [NEW_NAME]  
    5. Counter-evidence check via [NEW_NAME]
    6. Claim verification
    7. Generate Human Review Brief
    """
    try:
        start_time = time.time()
        
        # Run the full pipeline
        result = await pipeline_service.run_pipeline(
            message=request.message,
            include_synthetic_context=request.include_synthetic_context
        )
        
        processing_time_ms = (time.time() - start_time) * 1000
        
        # Add processing time to response
        result["processing_time_ms"] = processing_time_ms
        
        return result
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Pipeline processing failed: {str(e)}"
        )


@app.post("/demo/sample")
async def sample_demo():
    """Run a sample demo with pre-defined test message."""
    sample_message = MessageCreate(
        content="URGENT: Your bank account has been compromised. "
                "Click this link to secure your funds immediately: "
                "https://fake-bank-security.com/verify. "
                "Limited time offer - act now to prevent account closure.",
        sender_info={"name": "Bank Security Dept", "email": "security@fakebank.com"},
        receiver_info={"name": "Customer", "email": "customer@example.com"},
        channel_type="email",
        metadata={"subject": "URGENT: Account Security Alert"}
    )
    
    request = PipelineRequest(message=sample_message)
    return await ingest_message(request)


@app.get("/demo/scenarios")
async def list_scenarios():
    """List available synthetic scam scenarios."""
    # This will be populated when we create the synthetic data generator
    return {
        "scenarios": [
            {"id": "phishing_1", "name": "Bank Phishing Scam", "type": "phishing"},
            {"id": "investment_1", "name": "Cryptocurrency Investment Scam", "type": "investment_scam"},
            {"id": "romance_1", "name": "Romance Scam", "type": "romance_scam"},
        ],
        "note": "Synthetic data will be generated in Phase 4"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )



# ============================================================================
# [NEW_NAME] INTEGRITY ENDPOINTS: Evidence Integrity & Truth Gate
# ============================================================================

@app.get("/integrity/verify")
async def verify_evidence_integrity():
    """
    Verify the complete evidence chain integrity.
    
    Re-hash every record and check chain linkage.
    Any tampering breaks the chain at that point.
    """
    try:
        integrity_result = evidence_chain.verify_integrity()
        
        return {
            "integrity": integrity_result,
            "chain_statistics": evidence_chain.get_chain_statistics(),
            "engine_feature": "evidence_hash_chain",
            "note": "Hash-linked integrity verification"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Integrity verification failed: {str(e)}"
        )


@app.post("/integrity/tamper-drill")
async def run_tamper_drill(
    row_number: int,
    field: str = "content",
    new_value: str = "TAMPERED"
):
    """
    Run the integrity tamper drill.
    
    Intentionally tampers with a record to demonstrate how the chain
    breaks. This proves the integrity system works.
    
    Args:
        row_number: Which row to tamper with
        field: Which field to modify
        new_value: The tampered value
    """
    try:
        drill_result = evidence_chain.tamper_drill(row_number, field, new_value)
        
        return {
            "tamper_drill": drill_result,
            "demonstration": "Watch how tampering breaks the chain",
            "engine_feature": "integrity_demonstration",
            "note": "Chain has been restored after demonstration"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Tamper drill failed: {str(e)}"
        )


@app.get("/integrity/chain")
async def get_evidence_chain():
    """
    Get the complete evidence chain with all records and hashes.
    
    Shows the SHA-256 hash linkage between records.
    """
    try:
        return {
            "chain": evidence_chain.export_chain(),
            "engine_feature": "evidence_chain_export",
            "note": "Each record is SHA-256 hashed and linked to previous"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Chain export failed: {str(e)}"
        )


@app.post("/truth-gate/verify")
async def verify_claim(
    claim: str,
    cited_evidence_ids: list[str],
    claim_metadata: dict = None
):
    """
    Verify a claim through the Truth Gate.
    
    Core principle: "Every factual sentence is torn apart: each cited
    record is re-resolved, re-hashed, and every figure checked against the
    payload. A fabricated citation is caught by arithmetic."
    
    Args:
        claim: The factual claim to verify
        cited_evidence_ids: List of evidence record IDs cited
        claim_metadata: Optional context
    """
    try:
        verification = truth_gate.verify_claim(
            claim=claim,
            cited_evidence_ids=cited_evidence_ids,
            claim_metadata=claim_metadata
        )
        
        return {
            "verification": verification,
            "engine_feature": "truth_gate",
            "principle": "Unprovable claims do not ship",
            "note": "Claims verified against hashed evidence - fabrications caught by arithmetic"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Truth gate verification failed: {str(e)}"
        )


@app.post("/truth-gate/verify-number")
async def verify_numerical_claim(
    claimed_value: float,
    field_path: str,
    evidence_id: str,
    tolerance: float = 0.01
):
    """
    Verify a specific numerical claim.
    
    This is the "arithmetic catches lies" feature of the verification engine.
    
    Args:
        claimed_value: The number being claimed
        field_path: Path to field in evidence (e.g., "signal_count")
        evidence_id: The evidence record to check
        tolerance: Acceptable deviation (default 1%)
    """
    try:
        verification = truth_gate.verify_numerical_claim(
            claimed_value=claimed_value,
            field_path=field_path,
            evidence_id=evidence_id,
            tolerance=tolerance
        )
        
        return {
            "verification": verification,
            "engine_feature": "arithmetic_verification",
            "note": "Numerical claims verified by arithmetic - no model can argue with math"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Numerical verification failed: {str(e)}"
        )


@app.get("/engine-features")
async def list_engine_features():
    """
    List all evidence engine features implemented in AegisNet.
    """
    return {
        "engine_features": {
            "evidence_hash_chain": {
                "status": "implemented",
                "description": "SHA-256 hash-linked evidence chain",
                "endpoints": ["/integrity/verify", "/integrity/chain"]
            },
            "truth_gate": {
                "status": "implemented",
                "description": "Claim verification against hashed evidence",
                "endpoints": ["/truth-gate/verify", "/truth-gate/verify-number"]
            },
            "tamper_drill": {
                "status": "implemented",
                "description": "Demonstrate integrity by breaking it",
                "endpoints": ["/integrity/tamper-drill"]
            },
            "arithmetic_verification": {
                "status": "implemented",
                "description": "Numerical claims caught by math",
                "note": "No model can argue with arithmetic"
            }
        },
        "engine_principles": [
            "Evidence is hash-chained",
            "Scores are calibrated, not vibes",
            "Agents propose. Humans decide.",
            "Unprovable claims do not ship"
        ],
        "architecture": "[NEW_NAME] - Evidence-grounded AI for cybercrime intelligence",
        "note": "AegisNet implements strict integrity guarantees for scam intelligence"
    }
