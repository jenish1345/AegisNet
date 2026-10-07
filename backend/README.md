# AegisNet Backend

Evidence-Grounded AI for Scam Network Intelligence - Backend API

## Overview

FastAPI backend implementing the 7-step AegisNet analysis pipeline:

1. **Ingest suspicious message**
2. **Extract scam signals** (NLP features/patterns)
3. **Evidence correlation** via TraceX
4. **Campaign reconstruction** via TraceX
5. **Counter-evidence check** via TraceX
6. **Claim verification**
7. **Generate Human Review Brief**

## Quick Start

### Prerequisites
- Python 3.11+
- pip or poetry

### Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install spaCy model (small English model for demo)
python -m spacy download en_core_web_sm
```

### Running the Server

```bash
# Development mode (auto-reload)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production mode
uvicorn main:app --host 0.0.0.0 --port 8000
```

The API will be available at: http://localhost:8000

## API Endpoints

### Health Check
```
GET /health
```

### Demo Pipeline
```
POST /demo/ingest
```
Analyze a suspicious message through the full 7-step pipeline.

**Request Body:**
```json
{
  "message": {
    "content": "URGENT: Your bank account has been compromised...",
    "sender_info": {"name": "Bank Security Dept"},
    "receiver_info": {"name": "Customer"},
    "channel_type": "email",
    "metadata": {"subject": "URGENT: Account Security Alert"}
  },
  "include_synthetic_context": true
}
```

### Sample Demo
```
POST /demo/sample
```
Run a pre-configured sample scam message through the pipeline.

### List Scenarios
```
GET /demo/scenarios
```
List available synthetic scam scenarios (placeholder for now).

## Project Structure

```
backend/
├── main.py              # FastAPI application and endpoints
├── config.py            # Configuration settings
├── requirements.txt     # Python dependencies
├── models/
│   ├── __init__.py
│   └── schemas.py      # Pydantic schemas (Message, Signal, Evidence, etc.)
└── services/
    ├── __init__.py
    ├── pipeline.py     # 7-step pipeline orchestration
    └── tracex_engine.py # TraceX integration (to be implemented)
```

## Data Models

Based on `docs/DATA_MODEL.md`:

- **Message**: Suspicious communication (email, SMS, social media)
- **Signal**: Scam indicators (urgency, authority, reciprocity, fear, greed, social_proof)
- **Evidence**: Supporting/contradicting data points (temporal, geographic, linguistic, behavioral, network)
- **Campaign**: Coordinated scam operation
- **VerificationResult**: Claim validation outcomes
- **HumanReviewBrief**: Analysis report for fraud analysts

## Development

### Adding New Features

1. **Update schemas** in `models/schemas.py`
2. **Implement service logic** in `services/`
3. **Add endpoints** in `main.py`
4. **Write tests** in `tests/`

### Testing

```bash
# Run tests
pytest tests/

# Run with coverage
pytest --cov=backend tests/
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
# API Settings
API_TITLE="AegisNet API"
API_DESCRIPTION="Evidence-Grounded AI for Scam Network Intelligence"
API_VERSION="0.1.0"

# Server Settings
HOST="0.0.0.0"
PORT=8000
DEBUG=true

# Database (SQLite for demo, PostgreSQL for production)
DATABASE_URL="sqlite:///./aegisnet.db"

# NLP Models
SPACY_MODEL="en_core_web_sm"
SENTENCE_TRANSFORMER_MODEL="all-MiniLM-L6-v2"

# TraceX Settings
TRACEX_ENABLED=true
TRACEX_SIMILARITY_THRESHOLD=0.7
TRACEX_CLUSTERING_EPSILON=0.5
TRACEX_MIN_SAMPLES=2

# Demo Mode
DEMO_MODE=true
SYNTHETIC_DATA_PATH="data/synthetic/"
```

## Next Steps

1. **Implement TraceX engine** in `services/tracex_engine.py`
2. **Add database models** with SQLAlchemy
3. **Enhance NLP pipeline** with actual spaCy/sentence-transformers
4. **Create synthetic data generator**
5. **Add comprehensive tests**
6. **Integrate with frontend**

## Limitations (Demo Version)

- Currently uses placeholder/rule-based analysis
- TraceX integration is mocked
- No persistent database (in-memory only)
- Basic NLP signal extraction
- Single-message analysis only

## Ethical Boundaries

⚠️ **IMPORTANT**: AegisNet is an assistive intelligence system that:
- ✅ Analyzes patterns and provides evidence
- ✅ Generates review briefs for human analysts
- ✅ Identifies potential scam indicators

❌ **NEVER**:
- Determines guilt or criminal intent
- Freezes accounts or blocks transactions
- Blocks phone numbers or communications
- Contacts victims automatically
- Performs enforcement actions

All outputs require human review and validation.