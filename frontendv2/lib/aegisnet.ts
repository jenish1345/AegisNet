/**
 * Typed client for the AegisNet backend.
 *
 * Calls go through /api/aegisnet (Next.js BFF proxy) rather than directly
 * to :8000, so no CORS surface needs to be opened on the backend.
 */

export type ChannelType = "email" | "sms" | "social_media" | "chat";
export type SignalType = "urgency" | "authority" | "reciprocity" | "fear" | "greed" | "social_proof";
export type EvidenceType = "temporal" | "geographic" | "linguistic" | "behavioral" | "network";
export type CampaignType = "phishing" | "investment_scam" | "romance_scam" | "tech_support";
export type VerificationStatus = "supported" | "contradicted" | "inconclusive" | "unverifiable";

export interface MessageCreate {
  content: string;
  sender_info?: Record<string, string>;
  receiver_info?: Record<string, string>;
  channel_type?: ChannelType;
  metadata?: Record<string, string>;
}

export interface MessageResponse extends MessageCreate {
  message_id: string;
  source_hash: string;
  ingestion_timestamp: string;
}

export interface Signal {
  signal_id: string;
  message_id: string;
  signal_type: SignalType;
  confidence_score: number;
  extracted_text: string;
  pattern_matched: string;
  position_range?: Record<string, number>;
  context_window?: string;
  extraction_timestamp?: string;
  extraction_model?: string;
  raw_extracted_value?: string;
}

export interface Evidence {
  evidence_id: string;
  evidence_type: EvidenceType;
  content: Record<string, unknown>;
  source_description: string;
  confidence_score: number;
  collection_timestamp?: string;
  limitations?: string;
}

export interface Campaign {
  campaign_id: string;
  campaign_name: string;
  campaign_type: CampaignType;
  confidence_score: number;
  estimated_scale: number;
  primary_tactics: string[];
  status: string;
  reconstruction_notes?: string;
  first_seen?: string;
  last_seen?: string;
}

export interface VerificationResult {
  verification_id: string;
  claim_text: string;
  claim_source: string;
  verification_status: VerificationStatus;
  confidence_score: number;
  verification_timestamp?: string;
  limitations?: string;
}

export interface HumanReviewBrief {
  brief_id: string;
  executive_summary: string;
  key_signals: Array<{ type: string; confidence: number; text: string }>;
  campaign_analysis: Record<string, unknown>;
  verification_results: Array<Record<string, unknown>>;
  confidence_assessment: Record<string, number>;
  limitations_section: string;
  recommended_actions: string[];
  evidence_visualization: Record<string, unknown>;
  analysis_timestamp: string;
}

export interface PipelineResponse {
  message: MessageResponse;
  signals: Signal[];
  evidence: Evidence[];
  campaigns: Campaign[];
  verification_results: VerificationResult[];
  human_review_brief: HumanReviewBrief;
  pipeline_steps: Record<string, boolean>;
  processing_time_ms: number;
}

export interface HealthReport {
  status: string;
  service: string;
  version: string;
  timestamp: number;
  demo_mode: boolean;
  new_name_enabled: boolean;
}

export interface EvidenceChainRecord {
  record_id: string;
  record_type: string;
  timestamp: string;
  hash: string;
  previous_hash: string;
  payload: Record<string, unknown>;
}

export interface IntegrityReport {
  integrity: {
    chain_intact: boolean;
    records_checked: number;
    broken_at?: number;
    error?: string;
  };
  chain_statistics: Record<string, unknown>;
  engine_feature: string;
}

export interface EngineFeatures {
  engine_features: Record<string, {
    status: string;
    description: string;
    endpoints?: string[];
    note?: string;
  }>;
  engine_principles: string[];
  architecture: string;
}

export class AegisNetApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "AegisNetApiError";
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api/aegisnet/${path}`, {
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers ?? {}) },
  });
  const text = await res.text();
  let body: unknown = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { error: text };
  }
  if (!res.ok) {
    const errorMsg =
      (body as { detail?: string })?.detail ??
      (body as { error?: string })?.error ??
      `Request failed with status ${res.status}`;
    throw new AegisNetApiError(errorMsg, res.status);
  }
  return body as T;
}

export const getHealth = () => call<HealthReport>("health");

export const ingestMessage = (message: MessageCreate, includeSyntheticContext = true) =>
  call<PipelineResponse>("demo/ingest", {
    method: "POST",
    body: JSON.stringify({ message, include_synthetic_context: includeSyntheticContext }),
  });

export const runSampleDemo = () =>
  call<PipelineResponse>("demo/sample", { method: "POST" });

export const getScenarios = () =>
  call<{ scenarios: Array<{ id: string; name: string; type: string }>; note: string }>("demo/scenarios");

export const verifyIntegrity = () => call<IntegrityReport>("integrity/verify");

export const getEvidenceChain = () =>
  call<{ chain: EvidenceChainRecord[]; engine_feature: string }>("integrity/chain");

export const getEngineFeatures = () => call<EngineFeatures>("engine-features");

// ---- Formatting Helpers ----

export function formatConfidence(score: number): string {
  return `${Math.round(score * 100)}%`;
}

export function signalLabel(type: SignalType | string): string {
  const labels: Record<string, string> = {
    urgency: "Urgency",
    authority: "Authority Appeal",
    reciprocity: "Reciprocity",
    fear: "Fear",
    greed: "Greed",
    social_proof: "Social Proof",
  };
  return labels[type] ?? type.toUpperCase();
}

export function campaignLabel(type: CampaignType | string): string {
  const labels: Record<string, string> = {
    phishing: "Phishing Threat",
    investment_scam: "Investment Scam",
    romance_scam: "Romance Scam",
    tech_support: "Tech Support Impersonation",
  };
  return labels[type] ?? type.replace(/_/g, " ").toUpperCase();
}

export function verificationStatusLabel(status: VerificationStatus | string): string {
  const labels: Record<string, string> = {
    supported: "Supported by Evidence",
    contradicted: "Contradicted",
    inconclusive: "Inconclusive",
    unverifiable: "Unverifiable",
  };
  return labels[status] ?? status;
}

// Pre-defined benchmark scenarios matching AegisNet core benchmarks
export const SCENARIOS: Record<string, { label: string; message: MessageCreate }> = {
  bank: {
    label: "🏦 Urgent Bank Phishing",
    message: {
      content:
        "URGENT: Your bank account has been compromised due to suspicious login attempts from IP 192.168.1.1. Click this link immediately to secure your funds: http://secure-bank-verify-account.com/login or your account will be permanently closed within 2 hours.",
      sender_info: { email: "alert@security-check.com", name: "Bank Security Dept" },
      channel_type: "email",
    },
  },
  lottery: {
    label: "🏆 Crypto Raffle Winner",
    message: {
      content:
        "CONGRATULATIONS! You have been selected as the grand prize winner of 500,000 USDT in the Global Crypto Raffle! To claim your prize, send 500 USDT processing fee to wallet address 0x71C7656EC7ab88b098defB751B7401B5f6d8976F now!",
      sender_info: { email: "lottery@crypto-raffle-official.org", name: "Crypto Raffle Global" },
      channel_type: "email",
    },
  },
  tech: {
    label: "💻 Tech Support Impersonation",
    message: {
      content:
        "WARNING: Microsoft Windows Security Alert! Your computer is infected with 5 critical spyware viruses. Call Microsoft Support immediately at +1-800-555-0199 to prevent identity theft. Do not restart your computer.",
      sender_info: { email: "support@microsoft-alert-service.net", name: "Windows Security Support" },
      channel_type: "email",
    },
  },
  romance: {
    label: "💔 Romance / Wire Scam",
    message: {
      content:
        "Dearest, I have been detained unexpectedly at customs in London and they require an emergency clearance fee of $3,500. Please wire the funds via Western Union today so I can board my flight home to you. I love you deeply.",
      sender_info: { email: "richard.morgan.overseas@gmail.com", name: "Richard Morgan" },
      channel_type: "email",
    },
  },
};
