"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageCustomCode from "@/components/PageCustomCode";
import PageCustomCodeEnd from "@/components/PageCustomCodeEnd";
import CtaFooter from "@/components/CtaFooter";
import {
  ingestMessage,
  runSampleDemo,
  formatConfidence,
  signalLabel,
  campaignLabel,
  verificationStatusLabel,
  SCENARIOS,
  type PipelineResponse,
  type MessageCreate,
} from "@/lib/aegisnet";

const SCENARIO_KEYS = Object.keys(SCENARIOS) as Array<keyof typeof SCENARIOS>;

export default function DemoPage() {
  const [activeScenario, setActiveScenario] = useState<string>("bank");
  const [messageText, setMessageText] = useState<string>(SCENARIOS.bank.message.content);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [result, setResult] = useState<PipelineResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  function loadScenario(key: string) {
    setActiveScenario(key);
    setMessageText(SCENARIOS[key as keyof typeof SCENARIOS].message.content);
    setResult(null);
    setError(null);
  }

  async function handleAnalyze() {
    const content = messageText.trim();
    if (!content) {
      setError("Please paste or type a suspicious message to analyze.");
      return;
    }
    setLoading(true);
    setStatusMessage("Extracting scam signals and querying TraceX Engine...");
    setError(null);
    setResult(null);

    try {
      const message: MessageCreate = {
        content,
        sender_info: { email: "analyst-submission@aegisnet.ai" },
        channel_type: "email",
      };
      const data = await ingestMessage(message, true);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleSample() {
    setLoading(true);
    setStatusMessage("Running pre-configured benchmark verification...");
    setError(null);
    setResult(null);

    try {
      const data = await runSampleDemo();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper" style={{ opacity: 1, backgroundColor: "#06090e", minHeight: "100vh" }}>
      <PageCustomCode />
      <Nav />

      <main className="main-wrapper">
        {/* Greek Cyberpunk Hero Section with Architectural Grid */}
        <section
          className="stage-scroll is-relative"
          style={{
            position: "relative",
            paddingTop: "6.5rem",
            paddingBottom: "3rem",
            overflow: "hidden",
            borderBottom: "1px solid #1e293b",
          }}
        >
          {/* Background Grid */}
          <img
            src="/assets/6a45168c7316606c592707d9_grid.svg"
            loading="lazy"
            alt=""
            className="grid-bg"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.35,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div className="container-large is-relative" style={{ position: "relative", zIndex: 1 }}>
            <div className="padding-global">
              <div style={{ textAlign: "center", maxWidth: "860px", margin: "0 auto" }}>
                {/* Eyebrow Pill */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(6, 182, 212, 0.12)",
                    border: "1px solid rgba(6, 182, 212, 0.35)",
                    color: "#06b6d4",
                    padding: "6px 20px",
                    borderRadius: "24px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "1.25rem",
                  }}
                >
                  ⚡ AEGISNET ORACLE • LIVE SCAM INTELLIGENCE
                </div>

                {/* Classical Greek Typography Title */}
                <h1
                  className="heading_group-h1"
                  style={{
                    fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                    marginBottom: "1.25rem",
                  }}
                >
                  Scam Intelligence.{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #06b6d4 0%, #38bdf8 50%, #8b5cf6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Verified with Evidence.
                  </span>
                </h1>

                {/* Subtitle */}
                <p
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                    color: "#94a3b8",
                    maxWidth: "720px",
                    margin: "0 auto",
                  }}
                >
                  Test incoming email, SMS, or chat lures against the TraceX correlation engine.
                  Watch AegisNet extract psychological signals, correlate threat campaigns, verify
                  counter-evidence, and synthesize an auditable human review brief.
                </p>

                {/* Classical Architecture Stats Bar */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: "1.25rem",
                    marginTop: "2.5rem",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(14, 20, 32, 0.85)",
                      border: "1px solid #1e293b",
                      borderRadius: "14px",
                      padding: "1.25rem",
                      textAlign: "center",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#06b6d4", lineHeight: 1 }}>
                      &lt; 20ms
                    </div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: "8px",
                      }}
                    >
                      Average Latency
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(14, 20, 32, 0.85)",
                      border: "1px solid #1e293b",
                      borderRadius: "14px",
                      padding: "1.25rem",
                      textAlign: "center",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#38bdf8", lineHeight: 1 }}>
                      7 Steps
                    </div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: "8px",
                      }}
                    >
                      Automated Pipeline
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(14, 20, 32, 0.85)",
                      border: "1px solid #1e293b",
                      borderRadius: "14px",
                      padding: "1.25rem",
                      textAlign: "center",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#10b981", lineHeight: 1 }}>
                      100%
                    </div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: "8px",
                      }}
                    >
                      Evidence Grounded
                    </div>
                  </div>

                  <div
                    style={{
                      background: "rgba(14, 20, 32, 0.85)",
                      border: "1px solid #1e293b",
                      borderRadius: "14px",
                      padding: "1.25rem",
                      textAlign: "center",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div style={{ fontSize: "1.85rem", fontWeight: 800, color: "#8b5cf6", lineHeight: 1 }}>
                      0
                    </div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: "8px",
                      }}
                    >
                      Blind Enforcement
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee Ticker */}
          <div
            style={{
              borderTop: "1px solid #1e293b",
              borderBottom: "1px solid #1e293b",
              padding: "12px 0",
              marginTop: "2.5rem",
              background: "rgba(10, 15, 25, 0.65)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "2.5rem",
                whiteSpace: "nowrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: 700, color: "#64748b", fontSize: "0.82rem", letterSpacing: "0.08em" }}>
                PROTECTING VICTIMS
              </span>
              <span style={{ color: "#334155" }}>•</span>
              <span style={{ fontWeight: 700, color: "#64748b", fontSize: "0.82rem", letterSpacing: "0.08em" }}>
                TRACEX EVIDENCE GRAPH
              </span>
              <span style={{ color: "#334155" }}>•</span>
              <span style={{ fontWeight: 700, color: "#64748b", fontSize: "0.82rem", letterSpacing: "0.08em" }}>
                ZERO BLIND ENFORCEMENT
              </span>
              <span style={{ color: "#334155" }}>•</span>
              <span style={{ fontWeight: 700, color: "#64748b", fontSize: "0.82rem", letterSpacing: "0.08em" }}>
                SHA-256 HASH AUDIT TRAIL
              </span>
              <span style={{ color: "#334155" }}>•</span>
              <span style={{ fontWeight: 700, color: "#64748b", fontSize: "0.82rem", letterSpacing: "0.08em" }}>
                TRUTH GATE VERIFICATION
              </span>
            </div>
          </div>
        </section>

        {/* Classical Statue & Workspace Section */}
        <section className="padding-global" style={{ paddingTop: "3.5rem", paddingBottom: "5.5rem" }}>
          <div className="container-large">
            {/* Greek Statue Showcase Card */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
                alignItems: "center",
                background: "rgba(14, 20, 32, 0.92)",
                border: "1px solid #1e293b",
                borderRadius: "20px",
                padding: "2rem",
                marginBottom: "2.5rem",
                boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
              }}
            >
              <div style={{ position: "relative", borderRadius: "14px", overflow: "hidden" }}>
                <img
                  src="/assets/6a4ba7d419d95af100ef903e_ac9e227b0f83ac2eef9596c6f952c50e_03-tab.webp"
                  alt="AegisNet Classical Greek Oracle"
                  style={{
                    width: "100%",
                    maxHeight: "260px",
                    objectFit: "cover",
                    borderRadius: "14px",
                    border: "1px solid #1e293b",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    background: "rgba(6, 9, 14, 0.85)",
                    border: "1px solid rgba(6, 182, 212, 0.3)",
                    padding: "4px 12px",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#38bdf8",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  ORACLE OF TRUTH • TRACEX
                </div>
              </div>

              <div>
                <span
                  style={{
                    color: "#06b6d4",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  INTELLIGENCE CONSOLE
                </span>
                <h3
                  style={{
                    fontSize: "1.65rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    marginTop: "6px",
                    marginBottom: "10px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Illuminating Truth in the Dark
                </h3>
                <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                  Like classical Greek oracles deciphering omens, AegisNet cross-examines temporal graphs,
                  linguistic lures, and recipient telemetry. No arbitrary bans — every conclusion is
                  supported by verifiable SHA-256 evidence records.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link
                    href="/aegisnet/overview"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "rgba(6, 182, 212, 0.15)",
                      border: "1px solid rgba(6, 182, 212, 0.4)",
                      color: "#38bdf8",
                      padding: "8px 18px",
                      borderRadius: "8px",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "0.2s ease",
                    }}
                  >
                    Open Intelligence Console →
                  </Link>
                  <a
                    href="http://localhost:8000/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid #1e293b",
                      color: "#94a3b8",
                      padding: "8px 18px",
                      borderRadius: "8px",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "0.2s ease",
                    }}
                  >
                    FastAPI OpenAPI Docs ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Workspace Card */}
            <div
              style={{
                background: "rgba(14, 20, 32, 0.95)",
                border: "1px solid #1e293b",
                borderRadius: "20px",
                padding: "2.5rem",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75)",
              }}
            >
              <label
                style={{
                  display: "block",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: "#94a3b8",
                  marginBottom: "0.85rem",
                }}
              >
                Select Benchmark Scenario or Custom Message Input:
              </label>

              {/* Scenario Selector Buttons */}
              <div style={{ display: "flex", gap: "10px", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                {SCENARIO_KEYS.map((key) => {
                  const active = activeScenario === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => loadScenario(key)}
                      style={{
                        background: active ? "rgba(6, 182, 212, 0.18)" : "rgba(255, 255, 255, 0.05)",
                        border: `1px solid ${active ? "#06b6d4" : "rgba(255, 255, 255, 0.12)"}`,
                        color: active ? "#38bdf8" : "#94a3b8",
                        padding: "9px 18px",
                        borderRadius: "24px",
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {SCENARIOS[key].label}
                    </button>
                  );
                })}
              </div>

              {/* Message Textarea */}
              <textarea
                value={messageText}
                onChange={(e) => {
                  setMessageText(e.target.value);
                  setResult(null);
                  setError(null);
                }}
                placeholder="Paste suspicious message text here..."
                style={{
                  width: "100%",
                  minHeight: "130px",
                  background: "#090e17",
                  border: "1px solid #1e293b",
                  borderRadius: "12px",
                  padding: "1.25rem",
                  color: "#f8fafc",
                  fontSize: "0.98rem",
                  lineHeight: 1.6,
                  resize: "vertical",
                  marginBottom: "1.5rem",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />

              {/* Action Buttons Row */}
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={loading}
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #2563eb)",
                    color: "#ffffff",
                    padding: "12px 28px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 16px rgba(6, 182, 212, 0.35)",
                    transition: "all 0.2s ease",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Processing..." : "🔍 Analyze Message with AegisNet AI"}
                </button>
                <button
                  type="button"
                  onClick={handleSample}
                  disabled={loading}
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#f8fafc",
                    padding: "12px 22px",
                    borderRadius: "10px",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  ⚡ Run Default Benchmark Sample
                </button>
              </div>

              {/* Error Banner */}
              {error && (
                <div
                  style={{
                    background: "rgba(239, 68, 68, 0.12)",
                    border: "1px solid #ef4444",
                    borderRadius: "10px",
                    padding: "1rem 1.25rem",
                    marginTop: "1.5rem",
                    color: "#fca5a5",
                    fontSize: "0.92rem",
                  }}
                >
                  <strong>Error:</strong> {error}
                </div>
              )}

              {/* Loading Indicator */}
              {loading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "1rem 1.25rem",
                    background: "rgba(6, 182, 212, 0.1)",
                    border: "1px solid #06b6d4",
                    borderRadius: "10px",
                    marginTop: "1.5rem",
                    color: "#38bdf8",
                    fontWeight: 600,
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      border: "3px solid rgba(6, 182, 212, 0.3)",
                      borderTopColor: "#06b6d4",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Analysis Results Display */}
              {result && (
                <div style={{ marginTop: "2.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      marginBottom: "1.5rem",
                      borderBottom: "1px solid #1e293b",
                      paddingBottom: "1rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.45rem",
                        fontWeight: 800,
                        color: "#38bdf8",
                        margin: 0,
                      }}
                    >
                      📊 AegisNet 7-Step Analysis & Human Review Brief
                    </h3>
                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: "0.85rem",
                        background: "rgba(255, 255, 255, 0.05)",
                        padding: "4px 12px",
                        borderRadius: "12px",
                      }}
                    >
                      Latency: <strong>{result.processing_time_ms.toFixed(1)}ms</strong>
                    </span>
                  </div>

                  {/* 4 Dashboard Breakdown Cards */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                      gap: "1.5rem",
                    }}
                  >
                    {/* Box 1: Signals */}
                    <div
                      style={{
                        background: "#080c14",
                        border: "1px solid #1e293b",
                        borderRadius: "14px",
                        padding: "1.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "#38bdf8",
                          marginBottom: "1rem",
                        }}
                      >
                        🔍 Step 1 & 2: Extracted Scam Signals ({result.signals.length})
                      </div>
                      {result.signals.length === 0 ? (
                        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>No suspicious signals detected.</p>
                      ) : (
                        result.signals.map((s) => (
                          <div
                            key={s.signal_id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "10px 14px",
                              background: "rgba(255, 255, 255, 0.03)",
                              borderRadius: "8px",
                              marginBottom: "8px",
                              fontSize: "0.88rem",
                              gap: "10px",
                            }}
                          >
                            <span style={{ color: "#f8fafc" }}>
                              <strong>{signalLabel(s.signal_type).toUpperCase()}</strong>: {s.extracted_text}
                            </span>
                            <span
                              style={{
                                padding: "3px 10px",
                                borderRadius: "14px",
                                fontSize: "0.78rem",
                                fontWeight: 700,
                                background: "rgba(245, 158, 11, 0.2)",
                                color: "#f59e0b",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {formatConfidence(s.confidence_score)} Conf
                            </span>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Box 2: Campaigns */}
                    <div
                      style={{
                        background: "#080c14",
                        border: "1px solid #1e293b",
                        borderRadius: "14px",
                        padding: "1.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "#38bdf8",
                          marginBottom: "1rem",
                        }}
                      >
                        🔗 Step 3 & 4: TraceX Correlation & Campaigns ({result.campaigns.length})
                      </div>
                      {result.campaigns.length === 0 ? (
                        <p style={{ color: "#64748b", fontSize: "0.9rem" }}>No campaign clusters formed.</p>
                      ) : (
                        result.campaigns.map((c) => (
                          <div
                            key={c.campaign_id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "10px 14px",
                              background: "rgba(255, 255, 255, 0.03)",
                              borderLeft: "3px solid #06b6d4",
                              borderRadius: "8px",
                              marginBottom: "8px",
                              fontSize: "0.88rem",
                              gap: "10px",
                            }}
                          >
                            <span style={{ color: "#f8fafc" }}>
                              🎯 <strong>{campaignLabel(c.campaign_type)}</strong>
                              {c.primary_tactics.length > 0 && ` (${c.primary_tactics.join(", ")})`}
                            </span>
                            <span
                              style={{
                                padding: "3px 10px",
                                borderRadius: "14px",
                                fontSize: "0.78rem",
                                fontWeight: 700,
                                background: "rgba(6, 182, 212, 0.2)",
                                color: "#06b6d4",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {formatConfidence(c.confidence_score)} Match
                            </span>
                          </div>
                        ))
                      )}
                      <p style={{ color: "#94a3b8", fontSize: "0.88rem", marginTop: "12px" }}>
                        🔗 Correlated <strong>{result.evidence.length}</strong> evidence items via TraceX Engine.
                      </p>
                    </div>

                    {/* Box 3: Counter-Evidence & Claims */}
                    <div
                      style={{
                        background: "#080c14",
                        border: "1px solid #1e293b",
                        borderRadius: "14px",
                        padding: "1.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "#38bdf8",
                          marginBottom: "1rem",
                        }}
                      >
                        ⚖️ Step 5 & 6: Counter-Evidence & Claims
                      </div>
                      {result.verification_results.map((v) => (
                        <div
                          key={v.verification_id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px 14px",
                            background: "rgba(255, 255, 255, 0.03)",
                            borderRadius: "8px",
                            marginBottom: "8px",
                            fontSize: "0.88rem",
                            gap: "10px",
                          }}
                        >
                          <span style={{ color: "#f8fafc" }}>✓ {v.claim_text}</span>
                          <span
                            style={{
                              padding: "3px 10px",
                              borderRadius: "14px",
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              background:
                                v.verification_status === "supported"
                                  ? "rgba(16, 185, 129, 0.2)"
                                  : "rgba(245, 158, 11, 0.2)",
                              color: v.verification_status === "supported" ? "#10b981" : "#f59e0b",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {verificationStatusLabel(v.verification_status)}
                          </span>
                        </div>
                      ))}
                      <p style={{ color: "#94a3b8", fontSize: "0.88rem", marginTop: "12px" }}>
                        ⚖️ Evaluated <strong>{result.evidence.length}</strong> counter-evidence checkpoints.
                      </p>
                    </div>

                    {/* Box 4: Human Review Brief */}
                    <div
                      style={{
                        background: "#080c14",
                        border: "1px solid #1e293b",
                        borderRadius: "14px",
                        padding: "1.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "#38bdf8",
                          marginBottom: "1rem",
                        }}
                      >
                        📋 Step 7: Synthesized Human Review Brief
                      </div>
                      <div
                        style={{
                          background: "rgba(139, 92, 246, 0.14)",
                          borderLeft: "4px solid #8b5cf6",
                          padding: "1rem 1.25rem",
                          borderRadius: "6px",
                          fontSize: "0.94rem",
                          lineHeight: 1.55,
                          color: "#e2e8f0",
                          marginBottom: "1rem",
                        }}
                      >
                        <strong style={{ color: "#a78bfa" }}>Executive Summary:</strong>
                        <br />
                        {result.human_review_brief.executive_summary}
                      </div>

                      {result.human_review_brief.recommended_actions.length > 0 && (
                        <div style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
                          <strong style={{ color: "#f8fafc" }}>Recommended Actions:</strong>
                          <ul style={{ marginLeft: "1.25rem", marginTop: "6px", paddingLeft: 0 }}>
                            {result.human_review_brief.recommended_actions.map((act, i) => (
                              <li key={i} style={{ marginBottom: "4px" }}>
                                {act}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pipeline Steps Flow */}
                  <div
                    style={{
                      marginTop: "2rem",
                      padding: "1.25rem",
                      background: "#080c14",
                      border: "1px solid #1e293b",
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "1rem",
                      }}
                    >
                      Pipeline Verification Steps Check
                    </div>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {Object.entries(result.pipeline_steps).map(([step, done]) => (
                        <span
                          key={step}
                          style={{
                            padding: "6px 14px",
                            borderRadius: "20px",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            background: done ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                            border: `1px solid ${done ? "#10b981" : "#ef4444"}`,
                            color: done ? "#10b981" : "#ef4444",
                          }}
                        >
                          {done ? "✓" : "✗"} {step.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <CtaFooter />
      <PageCustomCodeEnd />
    </div>
  );
}
