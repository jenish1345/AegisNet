"use client";

import { useState } from "react";
import styles from "../aegisnet.module.css";
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

function confidenceBadgeClass(score: number): string {
  if (score >= 0.8) return styles.badgeRed;
  if (score >= 0.6) return styles.badgeAmber;
  return styles.badgeMuted;
}

function verificationBadgeClass(status: string): string {
  if (status === "supported") return styles.badgeRed;
  if (status === "contradicted") return styles.badgeGreen;
  if (status === "inconclusive") return styles.badgeAmber;
  return styles.badgeMuted;
}

export default function ConsoleDemo() {
  const [activeScenario, setActiveScenario] = useState<string>("bank");
  const [messageText, setMessageText] = useState<string>(SCENARIOS.bank.message.content);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
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
      setError("Please enter or paste a message to analyze.");
      return;
    }
    setLoading(true);
    setLoadingText("Extracting scam signals and querying TraceX Engine...");
    setError(null);
    setResult(null);
    try {
      const message: MessageCreate = {
        content,
        sender_info: { email: "analyst-console@aegisnet.local" },
        channel_type: "email",
      };
      const data = await ingestMessage(message, true);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function handleSample() {
    setLoading(true);
    setLoadingText("Running benchmark verification sample...");
    setError(null);
    setResult(null);
    try {
      const data = await runSampleDemo();
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageKicker}>02 — Live Analyzer</div>
        <h1 className={styles.pageTitle}>AegisNet 7-Step Scam Analyzer</h1>
        <p className={styles.pageLede}>
          Paste any suspicious message to trigger real-time signal extraction, TraceX correlation,
          and human review brief synthesis.
        </p>
      </header>

      {error && (
        <div className={`${styles.banner} ${styles.bannerError}`}>
          <div className={styles.bannerTitle}>Analysis Failed</div>
          <div className={styles.bannerDetail}>{error}</div>
        </div>
      )}

      <div className={styles.analyzerWorkspace}>
        <div>
          <div className={styles.pageKicker} style={{ marginBottom: "0.75rem" }}>
            Select Benchmark Scenario or Custom Message Input:
          </div>
          <div className={styles.scenarioPills}>
            {SCENARIO_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.scenarioBtn} ${activeScenario === key ? styles.scenarioBtnActive : ""}`}
                onClick={() => loadScenario(key)}
              >
                {SCENARIOS[key].label}
              </button>
            ))}
          </div>
        </div>

        <textarea
          className={styles.messageTextarea}
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);
            setResult(null);
            setError(null);
          }}
          placeholder="Paste suspicious message text here..."
          rows={6}
        />

        <div className={styles.btnRow}>
          <button type="button" className={styles.btnPrimary} onClick={handleAnalyze} disabled={loading}>
            {loading ? "Analyzing..." : "🔍 Analyze Message with AegisNet AI"}
          </button>
          <button type="button" className={styles.btnSecondary} onClick={handleSample} disabled={loading}>
            ⚡ Run Default Benchmark Sample
          </button>
        </div>

        {loading && (
          <div className={styles.loaderBox}>
            <div className={styles.spinRing} />
            <span>{loadingText}</span>
          </div>
        )}
      </div>

      {result && (
        <>
          <div className={styles.statRow}>
            <div className={styles.statTile}>
              <strong>{result.signals.length}</strong>
              <span>Scam Signals</span>
            </div>
            <div className={styles.statTile}>
              <strong>{result.evidence.length}</strong>
              <span>Evidence Items</span>
            </div>
            <div className={styles.statTile}>
              <strong>{result.campaigns.length}</strong>
              <span>Reconstructed Campaigns</span>
            </div>
            <div className={styles.statTile}>
              <strong>{result.processing_time_ms.toFixed(1)}ms</strong>
              <span>Pipeline Latency</span>
            </div>
          </div>

          <div className={styles.resultsGrid}>
            {/* Box 1: Signals */}
            <section className={styles.card}>
              <div className={styles.cardTitle}>🔍 Steps 1 & 2: Extracted Scam Signals</div>
              {result.signals.length === 0 ? (
                <div className={styles.emptyState}>No suspicious signals detected.</div>
              ) : (
                result.signals.map((s) => (
                  <div key={s.signal_id} className={styles.itemRow}>
                    <span className={styles.itemLabel}>
                      <strong>{signalLabel(s.signal_type)}</strong>: {s.extracted_text}
                    </span>
                    <span className={`${styles.badge} ${confidenceBadgeClass(s.confidence_score)}`}>
                      {formatConfidence(s.confidence_score)}
                    </span>
                  </div>
                ))
              )}
            </section>

            {/* Box 2: Campaigns */}
            <section className={styles.card}>
              <div className={styles.cardTitle}>🔗 Steps 3 & 4: TraceX Correlation & Campaigns</div>
              {result.campaigns.length === 0 ? (
                <div className={styles.emptyState}>No campaigns reconstructed.</div>
              ) : (
                result.campaigns.map((c) => (
                  <div key={c.campaign_id} className={styles.itemRow} style={{ borderLeft: "3px solid var(--ag-cyan)" }}>
                    <span className={styles.itemLabel}>
                      🎯 <strong>{campaignLabel(c.campaign_type)}</strong>
                      {c.primary_tactics.length > 0 && ` (${c.primary_tactics.join(", ")})`}
                    </span>
                    <span className={`${styles.badge} ${styles.badgeCyan}`}>
                      {formatConfidence(c.confidence_score)}
                    </span>
                  </div>
                ))
              )}
              <p style={{ fontSize: "0.85rem", color: "var(--ag-text-muted)", marginTop: 8 }}>
                🔗 Correlated <strong>{result.evidence.length}</strong> evidence items via TraceX Engine.
              </p>
            </section>

            {/* Box 3: Counter-Evidence & Claims */}
            <section className={styles.card}>
              <div className={styles.cardTitle}>⚖️ Steps 5 & 6: Counter-Evidence & Claims</div>
              {result.verification_results.map((v) => (
                <div key={v.verification_id} className={styles.itemRow}>
                  <span className={styles.itemLabel}>✓ {v.claim_text}</span>
                  <span className={`${styles.badge} ${verificationBadgeClass(v.verification_status)}`}>
                    {verificationStatusLabel(v.verification_status)}
                  </span>
                </div>
              ))}
              <p style={{ fontSize: "0.85rem", color: "var(--ag-text-muted)", marginTop: 8 }}>
                ⚖️ Evaluated {result.evidence.length} counter-evidence checkpoints.
              </p>
            </section>

            {/* Box 4: Human Review Brief */}
            <section className={styles.card}>
              <div className={styles.cardTitle}>📋 Step 7: Synthesized Human Review Brief</div>
              <div className={styles.briefHighlight}>
                <strong>Executive Summary:</strong>
                <br />
                {result.human_review_brief.executive_summary}
              </div>
              {result.human_review_brief.recommended_actions.length > 0 && (
                <div style={{ marginTop: "1rem" }}>
                  <div className={styles.pageKicker} style={{ marginBottom: "0.5rem" }}>
                    Recommended Actions
                  </div>
                  <ul className={styles.actionList}>
                    {result.human_review_brief.recommended_actions.map((act, i) => (
                      <li key={i} className={styles.actionItem}>
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>

          {/* Pipeline Completion Steps */}
          <section className={styles.card}>
            <div className={styles.cardTitle}>✅ Pipeline Verification Steps Checklist</div>
            <div className={styles.pipelineGrid}>
              {Object.entries(result.pipeline_steps).map(([step, done]) => (
                <div key={step} className={styles.pipelineStep}>
                  <span className={`${styles.badge} ${done ? styles.badgeGreen : styles.badgeRed}`}>
                    {done ? "✓ Complete" : "✗ Incomplete"}
                  </span>
                  <div className={styles.stepTitle}>{step.replace(/_/g, " ")}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
