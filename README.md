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
Evidence Correlation (via [NEW_NAME])
        ↓
Campaign Reconstruction (via [NEW_NAME])
        ↓
Counter-Evidence Check (via [NEW_NAME])
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
# In a new terminal, navigate to frontendv2
cd frontendv2

# Install dependencies
npm install

# Start the frontend
npm run dev
```

Frontend will be available at: http://localhost:3000  
- **Landing Page**: http://localhost:3000  
- **Live Demo**: http://localhost:3000/demo  
- **Analyst Console**: http://localhost:3000/aegisnet/overview  

### 3. Run the Demo

1. Open http://localhost:3000/demo in your browser
2. Select a benchmark scenario or enter a custom suspicious message
3. Click "Analyze Message"
4. View the real-time 7-step analysis results and Human Review Brief

## Project Structure

```
aegisnet/
├── backend/           # FastAPI backend with 7-step pipeline
│   ├── main.py        # API endpoints (/health, /demo/ingest)
│   ├── config.py      # Configuration settings
│   ├── models/        # Pydantic schemas (Message, Signal, Evidence, etc.)
│   └── services/      # Pipeline orchestration and [NEW_NAME] engine
├── frontendv2/        # Next.js 15 + React 19 + TypeScript frontend
│   ├── app/           # App Router pages (/demo, /aegisnet/*, /fleet/*)
│   ├── components/    # Classical cyberpunk & analyst UI components
│   ├── lib/           # API client, types, and mock data
│   ├── public/        # Static assets, fonts, and scripts
│   └── package.json   # Frontend dependencies
├── docs/              # Planning documents
│   ├── ARCHITECTURE.md
│   ├── IMPLEMENTATION_PLAN.md
│   └── DATA_MODEL.md
├── data/              # Synthetic data storage
├── tests/             # Unit and integration tests
└── README.md          # This file
```

## Key Features

### ✅ Phase 1 & 2 Implementation (Current)
- **FastAPI backend** with REST API endpoints
- **7-step analysis pipeline** with [NEW_NAME] integration
- **Next.js 15 frontend** (`frontendv2`) with classical cyberpunk aesthetic, dedicated live demo, and analyst dashboard
- **Pydantic data models** aligned with architecture
- **Offline operation** (no paid APIs)

### 🔄 [NEW_NAME] Integration
- **Evidence correlation** via [NEW_NAME] engine
- **Campaign reconstruction** via [NEW_NAME] clustering
- **Counter-evidence check** via [NEW_NAME] analysis
- **Reference implementation** (awaiting actual [NEW_NAME] package)

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
cd frontendv2
npm install
npm run dev
```

### Testing
```bash
# Backend tests
cd backend
pytest tests/

# Frontend build verification
cd frontendv2
npm run build
```

## Next Steps

### Phase 1 & 2 Complete ✅
- [x] Project scaffolding
- [x] FastAPI backend with endpoints
- [x] Next.js 15 frontend interface (`frontendv2`)
- [x] 7-step pipeline with TraceX engine
- [x] Data models aligned with architecture

### Phase 3 & 4 Pending
- [ ] Actual [NEW_NAME] integration (awaiting interface details)
- [ ] Enhanced NLP signal extraction
- [ ] Synthetic data generator
- [ ] Comprehensive testing
- [ ] Database persistence
- [ ] Advanced visualization

## Notes

### [NEW_NAME] Interface
The current implementation uses a **reference [NEW_NAME] engine**. Need clarification on:
- Actual [NEW_NAME] package name
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