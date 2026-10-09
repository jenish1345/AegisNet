"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../aegisnet.module.css";
import { getHealth, getEngineFeatures, type HealthReport, type EngineFeatures } from "@/lib/aegisnet";

export default function AegisNetOverview() {
  const [health, setHealth] = useState<HealthReport | null>(null);
  const [features, setFeatures] = useState<EngineFeatures | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getHealth(), getEngineFeatures()])
      .then(([h, f]) => {
        setHealth(h);
        setFeatures(f);
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)));
  }, []);

  const isHealthy = health?.status === "healthy";

  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageKicker}>01 — System Overview</div>
        <h1 className={styles.pageTitle}>AegisNet Intelligence Console</h1>
        <p className={styles.pageLede}>
          Evidence-grounded AI for scam network intelligence. Connect the signals.
          Verify the story. Protect the next victim.
        </p>
      </header>

      {error && (
        <div className={`${styles.banner} ${styles.bannerError}`}>
          <div className={styles.bannerTitle}>Backend unreachable</div>
          <div className={styles.bannerDetail}>
            {error} — Start the backend with: <code>uvicorn main:app --reload --port 8000</code> in <code>backend/</code>.
          </div>
        </div>
      )}

      {health && (
        <div className={`${styles.banner} ${isHealthy ? styles.bannerSuccess : styles.bannerError}`}>
          <div className={styles.bannerTitle}>{isHealthy ? "✅ Backend Healthy" : "⚠ Backend Status Issue"}</div>
          <div className={styles.bannerDetail}>
            {health.service} v{health.version} · Demo mode: {health.demo_mode ? "ON" : "OFF"} ·
            TraceX Engine: {health.new_name_enabled ? "ENABLED" : "DISABLED"} · API Port: 8000
          </div>
        </div>
      )}

      <div className={styles.statRow}>
        <div className={styles.statTile}>
          <strong>7</strong>
          <span>Pipeline Steps</span>
        </div>
        <div className={styles.statTile}>
          <strong>&lt; 20ms</strong>
          <span>Avg Latency</span>
        </div>
        <div className={styles.statTile}>
          <strong>100%</strong>
          <span>Evidence Grounded</span>
        </div>
        <div className={styles.statTile}>
          <strong>{features ? Object.keys(features.engine_features).length : "4"}</strong>
          <span>Engine Modules</span>
        </div>
      </div>

      {features && (
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>🔗 TraceX Engine Features</h2>
            <span className={`${styles.badge} ${styles.badgeCyan}`}>Ground-Truth Verified</span>
          </div>
          <div className={styles.pipelineGrid}>
            {Object.entries(features.engine_features).map(([key, feat]) => (
              <div key={key} className={styles.pipelineStep}>
                <div className={styles.stepNumber}>{feat.status.toUpperCase()}</div>
                <div className={styles.stepTitle}>{key.replace(/_/g, " ")}</div>
                <div className={styles.stepBody}>{feat.description}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <div className={styles.pageKicker} style={{ marginBottom: "0.5rem" }}>
              Core Engine Principles
            </div>
            <ul className={styles.warningList}>
              {features.engine_principles.map((p, i) => (
                <li key={i} className={styles.warningItem}>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>🚀 Console Operations</h2>
        </div>
        <div className={styles.pipelineGrid}>
          <Link href="/aegisnet/demo" className={styles.pipelineStep} style={{ textDecoration: "none" }}>
            <div className={styles.stepNumber}>02 — ANALYZER</div>
            <div className={styles.stepTitle}>Live Scam Analyzer →</div>
            <div className={styles.stepBody}>Paste suspicious emails or SMS to run the full 7-step analysis pipeline.</div>
          </Link>
          <Link href="/aegisnet/pipeline" className={styles.pipelineStep} style={{ textDecoration: "none" }}>
            <div className={styles.stepNumber}>03 — PIPELINE</div>
            <div className={styles.stepTitle}>7-Step Methodology →</div>
            <div className={styles.stepBody}>Inspect the full evidence pipeline from ingestion to human review synthesis.</div>
          </Link>
          <Link href="/aegisnet/evidence" className={styles.pipelineStep} style={{ textDecoration: "none" }}>
            <div className={styles.stepNumber}>04 — INTEGRITY</div>
            <div className={styles.stepTitle}>Evidence Hash Chain →</div>
            <div className={styles.stepBody}>Examine SHA-256 hash linkage and test tampering detection drills.</div>
          </Link>
          <Link href="/aegisnet/engine" className={styles.pipelineStep} style={{ textDecoration: "none" }}>
            <div className={styles.stepNumber}>05 — CAPABILITIES</div>
            <div className={styles.stepTitle}>TraceX Features & API →</div>
            <div className={styles.stepBody}>Inspect active engine endpoints and arithmetic verification guarantees.</div>
          </Link>
        </div>
      </section>
    </>
  );
}
