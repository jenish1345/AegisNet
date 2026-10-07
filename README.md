# AegisNet

**Evidence-Grounded AI for Scam Network Intelligence**

**Target track:** AI + Cybersecurity  
**Tagline:** Connect the signals. Verify the story. Protect the next victim.

## Overview

AegisNet is an evidence-grounded AI system for analyzing scam networks through a 7-step offline demo flow:

```
Suspicious Message
        ↓
Scam Signal Extraction
        ↓
Evidence Correlation (via TraceX)
        ↓
Campaign Reconstruction (via TraceX)
        ↓
Counter-Evidence Check (via TraceX)
        ↓
Claim Verification
        ↓
Human Review Brief
```

## Quick Start: Offline Demo

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install spaCy model
python -m spacy download en_core_web_sm

# Start the backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: http://localhost:8000  
API Docs: http://localhost:8000/docs

### 2. Frontend Setup

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the frontend
npm run dev
```

Frontend will be available at: http://localhost:5173

### 3. Run the Demo

1. Open http://localhost:5173 in your browser
2. Enter a suspicious message or use the sample message
3. Click "Analyze Message"
4. View the 7-step analysis results and Human Review Brief

## Project Structure

```
aegisnet/
├── backend/           # FastAPI backend with 7-step pipeline
│   ├── main.py       # API endpoints (/health, /demo/ingest)
│   ├── config.py     # Configuration settings
│   ├── models/       # Pydantic schemas (Message, Signal, Evidence, etc.)
│   └── services/     # Pipeline orchestration and TraceX engine
├── frontend/         # React + TypeScript interface
│   ├── src/          # React components
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
├── docs/             # Planning documents
│   ├── ARCHITECTURE.md
│   ├── IMPLEMENTATION_PLAN.md
│   └── DATA_MODEL.md
├── data/             # Synthetic data storage
├── tests/            # Unit and integration tests
└── README.md         # This file
```

## Key Features

### ✅ Phase 1 & 2 Implementation (Current)
- **FastAPI backend** with REST API endpoints
- **7-step analysis pipeline** with TraceX integration
- **React frontend** for message submission and results display
- **Pydantic data models** aligned with architecture
- **Offline operation** (no paid APIs)

### 🔄 TraceX Integration
- **Evidence correlation** via TraceX engine
- **Campaign reconstruction** via TraceX clustering
- **Counter-evidence check** via TraceX analysis
- **Placeholder implementation** (awaiting actual TraceX SDK)

### 📊 Data Models
- **Message**: Suspicious communications (email, SMS, social media)
- **Signal**: Scam indicators (urgency, authority, reciprocity, fear, greed, social_proof)
- **Evidence**: Supporting/contradicting data points
- **Campaign**: Coordinated scam operations
- **VerificationResult**: Claim validation outcomes
- **HumanReviewBrief**: Analysis report for fraud analysts

## API Endpoints

### Backend API (http://localhost:8000)

- `GET /` - Welcome page
- `GET /health` - Health check
- `POST /demo/ingest` - Run full 7-step pipeline on a message
- `POST /demo/sample` - Run sample scam message
- `GET /demo/scenarios` - List synthetic scenarios

## Ethical Boundaries

⚠️ **CRITICAL LIMITATIONS - What AegisNet CANNOT Do:**

- ❌ Determine guilt or criminal intent
- ❌ Freeze accounts or block financial transactions
- ❌ Block phone numbers or communications
- ❌ Contact victims or send automated messages
- ❌ Perform law enforcement actions
- ❌ Make enforcement recommendations
- ❌ Access real user data without consent
- ❌ Replace human judgment in fraud response

**AegisNet is an ASSISTIVE intelligence system** that provides evidence-based analysis for human fraud analysts to review.

## Development

### Backend Development
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Testing
```bash
# Backend tests
cd backend
pytest tests/

# Frontend tests
cd frontend
npm test
```

## Next Steps

### Phase 1 & 2 Complete ✅
- [x] Project scaffolding
- [x] FastAPI backend with endpoints
- [x] React frontend interface
- [x] 7-step pipeline with TraceX placeholder
- [x] Data models aligned with architecture

### Phase 3 & 4 Pending
- [ ] Actual TraceX SDK integration (awaiting interface details)
- [ ] Enhanced NLP signal extraction
- [ ] Synthetic data generator
- [ ] Comprehensive testing
- [ ] Database persistence
- [ ] Advanced visualization

## Notes

### TraceX Interface
The current implementation uses a **placeholder TraceX engine**. Need clarification on:
- Actual TraceX SDK/package name
- Installation method (pip install?)
- Exact method signatures
- Whether it's a local service or library

### Demo Limitations
- Uses basic rule-based signal extraction
- Simplified evidence correlation
- Mocked campaign reconstruction
- Single-message analysis only
- No persistent database

## License

This project is for demonstration purposes as part of the AegisNet evidence-grounded AI system for scam network intelligence.

---

**Connect the signals. Verify the story. Protect the next victim.**