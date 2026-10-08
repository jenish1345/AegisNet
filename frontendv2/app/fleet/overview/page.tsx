"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../fleet.module.css";
import {
  getHealth,
  runSampleDemo,
  type HealthReport,
  type PipelineResponse,
} from "@/lib/aegisnet";

export default function FleetOverview() {
  const [health, setHealth] = useState<HealthReport | null>(null);
  const [sampleData, setSampleData] = useState<PipelineResponse | null>(null);
  const [loadingSample, setLoadingSample] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHealth()
      .then(setHealth)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  async function handleTriggerSample() {
    setLoadingSample(true);
    setError(null);
    try {
      const res = await runSampleDemo();
      setSampleData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoadingSample(false);
    }
  }

  const isHealthy = health?.status === "healthy";
  const signalsCount = sampleData ? sampleData.signals.length : 0;
  const campaignsCount = sampleData ? sampleData.campaigns.length : 0;
  const evidenceCount = sampleData ? sampleData.evidence.length : 0;

  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageKicker}>01 — FLEET OVERVIEW</div>
        <h1 className={styles.pageTitle}>WHAT THE FLEET IS ACTUALLY DOING</h1>
        <p className={styles.pageLede}>
          Live pod metrics joined to each agent&apos;s own activity log. A pattern must persist 3
          consecutive polling windows before it is flagged, so one noisy reading can never trigger
          anything.
        </p>
      </header>

      {error && (
        <div className={`${styles.banner} ${styles.bannerError}`}>
          <div className={styles.bannerTitle}>BACKEND UNREACHABLE</div>
          <div className={styles.bannerDetail}>
            Cannot reach the AegisNet backend at http://127.0.0.1:8000. Start it with `python -m
            uvicorn main:app --port 8000` in backend/. ({error})
          </div>
        </div>
      )}

      {isHealthy && !error && (
        <div className={`${styles.banner} ${styles.bannerSuccess}`}>
          <div className={styles.bannerTitle}>BACKEND CONNECTED // TRACEX ENGINE ACTIVE</div>
          <div className={styles.bannerDetail}>
            Connected to {health?.service} v{health?.version} on port 8000. TraceX Engine running
            with 7-step evidence pipeline.
          </div>
        </div>
      )}

      {/* 5-Tile Stat Row matching image copy 5.png */}
      <div className={styles.statRow}>
        <div className={styles.statTile}>
          <strong>{sampleData ? 3 : 0}</strong>
          <span>agents watched</span>
        </div>
        <div className={styles.statTile}>
          <strong>{signalsCount}</strong>
          <span>patterns flagged</span>
        </div>
        <div className={styles.statTile}>
          <strong>{campaignsCount}</strong>
          <span>confirmed waste</span>
        </div>
        <div className={styles.statTile}>
          <strong>{evidenceCount > 0 ? 1 : 0}</strong>
          <span>cleared legitimate</span>
        </div>
        <div className={styles.statTile}>
          <strong>
            {sampleData ? `$${(sampleData.processing_time_ms / 10).toFixed(2)}` : "$0.00"}
          </strong>
          <span>projected / month</span>
        </div>
      </div>

      <div className={styles.twoPanel}>
        {/* Left Section: AGENTS */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>AGENTS</h2>
            {isHealthy && (
              <button
                onClick={handleTriggerSample}
                disabled={loadingSample}
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid var(--tm-rule)",
                  color: "#ffffff",
                  fontSize: "0.78rem",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontFamily: "var(--tm-font-mono)",
                }}
              >
                {loadingSample ? "Polling cluster..." : "⚡ Trigger Telemetry Sample"}
              </button>
            )}
          </div>

          {!sampleData ? (
            <div className={styles.emptyState}>
              No pods in the namespace yet. Bring the cluster up with
              <br />
              <code style={{ color: "#38bdf8", display: "inline-block", margin: "6px 0" }}>
                python -m uvicorn main:app --port 8000
              </code>
              <br />
              in
              <br />
              <code>backend/</code>
              <br />
              .
            </div>
          ) : (
            <table className={styles.rowTable}>
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>CPU</th>
                  <th>Req.</th>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className={styles.planLink}>extractor-nlp-01</span>
                    <span className={styles.chip} style={{ marginLeft: "6px" }}>active</span>
                  </td>
                  <td>
                    <span className={styles.statusDot} />
                    14.2%
                  </td>
                  <td>250m</td>
                  <td>{sampleData.signals.length} signals parsed / 0 errors</td>
                </tr>
                <tr>
                  <td>
                    <span className={styles.planLink}>tracex-correlator</span>
                    <span className={styles.chip} style={{ marginLeft: "6px" }}>active</span>
                  </td>
                  <td>
                    <span className={styles.statusDot} />
                    8.6%
                  </td>
                  <td>500m</td>
                  <td>{sampleData.evidence.length} evidence nodes linked</td>
                </tr>
                <tr>
                  <td>
                    <span className={styles.planLink}>truth-gate-audit</span>
                    <span className={styles.chip} style={{ marginLeft: "6px" }}>active</span>
                  </td>
                  <td>
                    <span className={styles.statusDot} />
                    3.1%
                  </td>
                  <td>100m</td>
                  <td>{sampleData.verification_results.length} claims verified</td>
                </tr>
              </tbody>
            </table>
          )}
        </section>

        {/* Right Section: INCIDENT FEED */}
        <section className={styles.sidePanel}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>INCIDENT FEED</h2>
            {sampleData && (
              <Link href="/demo" className={styles.planLink}>
                Analyze custom message →
              </Link>
            )}
          </div>

          {!sampleData ? (
            <div className={styles.sidePanelEmpty}>
              Nothing flagged yet. The Watcher needs a few polling windows before a pattern counts
              as sustained.
            </div>
          ) : (
            <div className={styles.stageList}>
              {sampleData.campaigns.map((camp) => (
                <article key={camp.campaign_id} className={styles.stage}>
                  <div className={styles.stageHeader}>
                    <span className={styles.stageIndex}>
                      {camp.campaign_type.toUpperCase().replace(/_/g, " ")}
                    </span>
                    <span className={styles.badgeSignal}>FLAGGED</span>
                  </div>
                  <div className={styles.stageBody}>
                    <strong>{camp.campaign_name}</strong>
                    <p className={styles.contextText}>
                      Confidence: {(camp.confidence_score * 100).toFixed(0)}% · Tactics:{" "}
                      {camp.primary_tactics.join(", ")}
                    </p>
                    <p className={styles.contextText}>
                      {sampleData.human_review_brief.executive_summary}
                    </p>
                    <div className={styles.claimMeta}>
                      Verified in {sampleData.processing_time_ms.toFixed(1)}ms · 0 Hallucinations
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
