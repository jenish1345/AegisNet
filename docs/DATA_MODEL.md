# AegisNet Data Model

## Overview
This document defines the core data structures and relationships for the AegisNet evidence-grounded AI scam intelligence system. All models are designed to support the complete analysis flow from suspicious message to human review brief.

## Core Entities

### 1. Message
Represents a suspicious communication (email, text, social media post) that enters the system for analysis.

**Fields:**
- `message_id`: UUID, primary key
- `content`: Text, the full message content
- `sender_info`: JSON, anonymized sender information
- `receiver_info`: JSON, anonymized receiver information
- `channel_type`: Enum (email, sms, social_media, chat)
- `timestamp`: DateTime, when message was sent/received
- `metadata`: JSON, additional contextual information
- `source_hash`: String, hash for deduplication
- `ingestion_timestamp`: DateTime, when added to system

**Relationships:**
- One-to-Many: Message → Signals (extracted indicators)
- One-to-Many: Message → EvidenceReferences (evidence citations)
- Many-to-Many: Message → Campaign (through MessageCampaign)

### 2. Signal
Represents a potential scam indicator extracted from a message using NLP and pattern matching.

**Fields:**
- `signal_id`: UUID, primary key
- `message_id`: UUID, foreign key to Message
- `signal_type`: Enum (urgency, authority, reciprocity, fear, greed, social_proof)
- `confidence_score`: Float (0.0-1.0), extraction confidence
- `extracted_text`: Text, the specific text that triggered the signal
- `pattern_matched`: String, which pattern was matched
- `position_range`: JSON, character positions in original message
- `context_window`: Text, surrounding text for context
- `extraction_timestamp`: DateTime, when signal was extracted
- `extraction_model`: String, which model/rule extracted it

**Signal Types:**
- **Urgency**: Time pressure tactics ("act now", "limited time")
- **Authority**: False authority claims ("IRS", "bank security department")
- **Reciprocity**: Give-and-take manipulation ("free gift", "special offer")
- **Fear**: Fear-based appeals ("your account will be closed")
- **Greed**: Get-rich-quick promises ("earn $5000 weekly")
- **Social Proof**: False popularity claims ("thousands have already joined")

**Relationships:**
- Many-to-One: Signal → Message
- Many-to-Many: Signal → Evidence (through SignalEvidence)

### 3. Evidence
Represents collected data points that support or contradict scam signals.

**Fields:**
- `evidence_id`: UUID, primary key
- `evidence_type`: Enum (temporal, geographic, linguistic, behavioral, network)
- `content`: JSON, evidence data in structured format
- `source_description`: Text, where evidence came from
- `collection_method`: Enum (extracted, inferred, synthetic, user_provided)
- `confidence_score`: Float (0.0-1.0), evidence reliability
- `timestamp_range`: JSON, optional time period evidence applies to
- `geographic_range`: JSON, optional location information
- `limitations`: Text, known limitations of this evidence
- `collection_timestamp`: DateTime, when evidence was collected

**Evidence Types:**
- **Temporal**: Time-based patterns (message timing, frequency)
- **Geographic**: Location patterns (sender locations, targeting areas)
- **Linguistic**: Language patterns (writing style, vocabulary)
- **Behavioral**: User behavior patterns (response rates, engagement)
- **Network**: Connection patterns (shared contacts, communication chains)

**Relationships:**
- Many-to-Many: Evidence → Signal (through SignalEvidence)
- Many-to-Many: Evidence → Campaign (through CampaignEvidence)
- One-to-Many: Evidence → VerificationResult

### 4. Campaign
Represents a coordinated scam operation identified through signal correlation.

**Fields:**
- `campaign_id`: UUID, primary key
- `campaign_name`: String, descriptive identifier
- `campaign_type`: Enum (phishing, investment_scam, romance_scam, tech_support)
- `confidence_score`: Float (0.0-1.0), campaign detection confidence
- `estimated_scale`: Integer, estimated number of messages/victims
- `temporal_pattern`: JSON, time-based operation patterns
- `geographic_pattern`: JSON, location targeting patterns
- `primary_tactics`: JSON array, main scam tactics used
- `first_seen`: DateTime, earliest detected message
- `last_seen`: DateTime, most recent detected message
- `status`: Enum (active, dormant, disrupted, unknown)
- `reconstruction_notes`: Text, how campaign was identified

**Relationships:**
- Many-to-Many: Campaign → Message (through MessageCampaign)
- Many-to-Many: Campaign → Evidence (through CampaignEvidence)
- One-to-Many: Campaign → VerificationResult

### 5. VerificationResult
Represents the outcome of verifying specific claims against evidence.

**Fields:**
- `verification_id`: UUID, primary key
- `claim_text`: Text, the specific claim being verified
- `claim_source`: Enum (message_content, signal_inference, user_query)
- `verification_status`: Enum (supported, contradicted, inconclusive, unverifiable)
- `confidence_score`: Float (0.0-1.0), verification confidence
- `supporting_evidence`: JSON array, evidence IDs that support claim
- `contradicting_evidence`: JSON array, evidence IDs that contradict claim
- `evidence_gaps`: JSON array, what evidence is missing
- `alternative_explanations`: JSON array, other possible interpretations
- `verification_timestamp`: DateTime, when verification was performed
- `verification_method`: String, which algorithm/method was used
- `limitations`: Text, verification process limitations

**Relationships:**
- Many-to-One: VerificationResult → Evidence (optional)
- Many-to-One: VerificationResult → Campaign (optional)

### 6. HumanReviewBrief
Represents the comprehensive analysis report generated for human fraud analysts.

**Fields:**
- `brief_id`: UUID, primary key
- `analysis_timestamp`: DateTime, when brief was generated
- `executive_summary`: Text, high-level findings
- `key_signals`: JSON array, most significant signals identified
- `campaign_analysis`: JSON, campaign reconstruction details
- `verification_results`: JSON array, claim verification outcomes
- `confidence_assessment`: JSON, overall confidence levels
- `limitations_section`: Text, explicit system limitations
- `recommended_actions`: JSON array, suggested next steps (non-enforcement)
- `evidence_visualization`: JSON, data for visualization components
- `export_formats`: JSON, available export formats (PDF, JSON, CSV)
- `analyst_notes`: Text, space for human analyst annotations

**Relationships:**
- One-to-Many: HumanReviewBrief → Message (summarized messages)
- One-to-Many: HumanReviewBrief → Campaign (analyzed campaigns)

## Junction Tables

### SignalEvidence
Links signals to supporting/contradicting evidence.

**Fields:**
- `signal_id`: UUID, foreign key to Signal
- `evidence_id`: UUID, foreign key to Evidence
- `relationship_type`: Enum (supports, contradicts, contextual)
- `strength`: Float (0.0-1.0), relationship strength
- `notes`: Text, relationship description

### MessageCampaign
Links messages to identified campaigns.

**Fields:**
- `message_id`: UUID, foreign key to Message
- `campaign_id`: UUID, foreign key to Campaign
- `inclusion_confidence`: Float (0.0-1.0), confidence in association
- `role_in_campaign`: Enum (initial_contact, follow_up, conversion_attempt)

### CampaignEvidence
Links campaigns to collected evidence.

**Fields:**
- `campaign_id`: UUID, foreign key to Campaign
- `evidence_id`: UUID, foreign key to Evidence
- `evidence_category`: Enum (defining, supporting, contradictory)
- `relevance_score`: Float (0.0-1.0), relevance to campaign

## Synthetic Data Models

### SyntheticMessageTemplate
Template for generating realistic scam messages.

**Fields:**
- `template_id`: UUID, primary key
- `scam_type`: Enum (phishing, investment, romance, tech_support)
- `template_text`: Text, message template with variables
- `variable_slots`: JSON, replaceable parts and their types
- `signal_embedding`: JSON, which signals should be present
- `realism_score`: Float (0.0-1.0), how realistic the template is
- `generation_parameters`: JSON, parameters for message generation

### SyntheticCampaignScenario
Complete scenario for demo purposes.

**Fields:**
- `scenario_id`: UUID, primary key
- `scenario_name`: String, descriptive name
- `campaign_type`: Enum (same as Campaign.campaign_type)
- `number_of_actors`: Integer, simulated scam actors
- `number_of_messages`: Integer, total messages in scenario
- `timeframe_days`: Integer, scenario duration
- `geographic_spread`: JSON, simulated locations
- `evidence_chain`: JSON, pre-generated evidence
- `verification_challenges`: JSON, claims to verify
- `demo_instructions`: Text, how to use this scenario

## Database Schema

### PostgreSQL Tables
```sql
-- Core tables
CREATE TABLE messages (...);
CREATE TABLE signals (...);
CREATE TABLE evidence (...);
CREATE TABLE campaigns (...);
CREATE TABLE verification_results (...);
CREATE TABLE human_review_briefs (...);

-- Junction tables
CREATE TABLE signal_evidence (...);
CREATE TABLE message_campaign (...);
CREATE TABLE campaign_evidence (...);

-- Synthetic data tables
CREATE TABLE synthetic_message_templates (...);
CREATE TABLE synthetic_campaign_scenarios (...);

-- Audit and metadata tables
CREATE TABLE analysis_sessions (...);
CREATE TABLE user_actions (...);
CREATE TABLE system_logs (...);
```

### Indexes for Performance
- Messages: `timestamp`, `channel_type`, `source_hash`
- Signals: `message_id`, `signal_type`, `confidence_score`
- Evidence: `evidence_type`, `confidence_score`, `collection_timestamp`
- Campaigns: `campaign_type`, `confidence_score`, `first_seen`

## Data Flow Relationships

```
Message
  │
  ├─→ Signal ─┬─→ Evidence ──→ VerificationResult
  │           └─→ Campaign ──→ VerificationResult
  │
  └─→ HumanReviewBrief
```

### Relationship Cardinalities
- 1 Message : 1..* Signals
- 1 Signal : 0..* Evidence
- 1 Evidence : 0..* Signals
- 1 Campaign : 1..* Messages
- 1 Campaign : 0..* Evidence
- 1 VerificationResult : 1..* Evidence references
- 1 HumanReviewBrief : 1..* Messages summarized

## Data Validation Rules

### Message Validation
- Content must be non-empty
- Sender/receiver info must be anonymized
- Timestamp must be valid date
- Source hash must be unique (prevent duplicates)

### Signal Validation
- Confidence score between 0.0 and 1.0
- Extracted text must be substring of original message
- Signal type must be from allowed enum values

### Evidence Validation
- Confidence score between 0.0 and 1.0
- Evidence type must be from allowed enum values
- Limitations field required for confidence < 0.7

### Campaign Validation
- Confidence score between 0.0 and 1.0
- Must have at least 2 associated messages
- First seen ≤ last seen

## Privacy & Security Considerations

### Data Anonymization
- All personal identifiers removed from messages
- Geographic data aggregated to city/region level
- Timestamps rounded to nearest hour for privacy
- Network data shows relationships without identities

### Data Retention
- Raw messages: 30 days (demo), configurable in production
- Analysis results: 90 days (demo), configurable in production
- Audit logs: 1 year for compliance

### Access Control
- Read-only access to analysis results
- No access to raw message content without authorization
- Role-based permissions for different user types

## Export Formats

### JSON Export
Complete structured data for programmatic use.

### PDF Report
Formatted human-readable report with:
- Executive summary
- Evidence chain visualization
- Confidence indicators
- Limitations disclosure

### CSV Data
Tabular data for spreadsheet analysis:
- Signals by message
- Evidence correlations
- Verification results
- Campaign statistics

This data model provides the foundation for AegisNet's evidence-grounded analysis while maintaining privacy, security, and ethical boundaries.