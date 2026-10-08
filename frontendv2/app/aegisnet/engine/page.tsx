"use client";

import { useEffect, useState } from "react";
import styles from "../aegisnet.module.css";
import { getEngineFeatures, type EngineFeatures } from "@/lib/aegisnet";

export default function EngineFeaturesPage() {
  const [features, setFeatures] = useState<EngineFeatures | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEngineFeatures()
      .then(setFeatures)
      .catch((e) => setError(e instanceof Error ? e.message : String(e)));
  }, []);

  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageKicker}>05 — Engine Capabilities</div>
        <h1 className={styles.pageTitle}>TraceX Engine Capabilities</h1>
        <p className={styles.pageLede}>
          AegisNet implements strict integrity guarantees through the TraceX evidence engine.
          Every claim is verifiable. Every figure is checked against the payload.
          A fabricated citation is caught by arithmetic.
        </p>
      </header>

      {error && (
        <div className={`${styles.banner} ${styles.bannerError}`}>
          <div className={styles.bannerTitle}>Backend Unreachable</div>
          <div className={styles.bannerDetail}>{error}</div>
        </div>
      )}

      {features && (
        <>
          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>🔧 Active Engine Features</h2>
              <span className={`${styles.badge} ${styles.badgeGreen}`}>Operational</span>
            </div>
            <div className={styles.pipelineGrid}>
              {Object.entries(features.engine_features).map(([key, feat]) => (
                <div key={key} className={styles.pipelineStep}>
                  <span
                    className={`${styles.badge} ${
                      feat.status === "implemented" ? styles.badgeGreen : styles.badgeAmber
                    }`}
                  >
                    {feat.status.toUpperCase()}
                  </span>
                  <div className={styles.stepTitle}>{key.replace(/_/g, " ")}</div>
                  <div className={styles.stepBody}>{feat.description}</div>
                  {feat.endpoints && (
                    <div style={{ marginTop: "0.5rem" }}>
                      {feat.endpoints.map((ep) => (
                        <code
                          key={ep}
                          style={{
                            display: "block",
                            fontSize: "0.75rem",
                            color: "var(--ag-cyan-light)",
                            background: "rgba(0,0,0,0.3)",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            marginTop: "4px",
                          }}
                        >
                          {ep}
                        </code>
                      ))}
                    </div>
                  )}
                  {feat.note && (
                    <div className={styles.stepBody} style={{ fontStyle: "italic", marginTop: "4px" }}>
                      Note: {feat.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>📜 Core Principles</h2>
            </div>
            <ul className={styles.warningList}>
              {features.engine_principles.map((p, i) => (
                <li key={i} className={styles.warningItem}>
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>🏗️ Architecture Specification</h2>
            </div>
            <p style={{ color: "var(--ag-text)", fontSize: "0.95rem", lineHeight: 1.6 }}>
              {features.architecture}
            </p>
          </section>
        </>
      )}

      {!features && !error && <div className={styles.emptyState}>Loading engine feature telemetry...</div>}
    </>
  );
}
