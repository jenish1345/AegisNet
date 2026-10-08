"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../aegisnet.module.css";
import { verifyIntegrity, getEvidenceChain, type IntegrityReport, type EvidenceChainRecord } from "@/lib/aegisnet";

export default function EvidenceChainPage() {
  const [integrity, setIntegrity] = useState<IntegrityReport | null>(null);
  const [chain, setChain] = useState<EvidenceChainRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([verifyIntegrity(), getEvidenceChain()])
      .then(([i, c]) => {
        setIntegrity(i);
        setChain(c.chain || []);
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  }, []);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const [i, c] = await Promise.all([verifyIntegrity(), getEvidenceChain()]);
      setIntegrity(i);
      setChain(c.chain || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  const intact = integrity?.integrity?.chain_intact;

  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageKicker}>04 — Evidence Chain</div>
        <h1 className={styles.pageTitle}>SHA-256 Hash-Linked Evidence Chain</h1>
        <p className={styles.pageLede}>
          Every evidence record is cryptographically hashed and linked to the previous record.
          Any tampering breaks the chain at that point — caught by arithmetic, not by trust.
        </p>
      </header>

      {error && (
        <div className={`${styles.banner} ${styles.bannerError}`}>
          <div className={styles.bannerTitle}>Error Loading Chain</div>
          <div className={styles.bannerDetail}>{error}</div>
        </div>
      )}

      {integrity && (
        <div className={`${styles.banner} ${intact ? styles.bannerSuccess : styles.bannerError}`}>
          <div className={styles.bannerTitle}>{intact ? "✅ Chain Fully Intact" : "⚠ Chain Integrity Broken"}</div>
          <div className={styles.bannerDetail}>
            {integrity.integrity.records_checked} record(s) checked.
            {!intact && integrity.integrity.broken_at !== undefined && (
              <span> Broken at record index #{integrity.integrity.broken_at}.</span>
            )}
            <span> Cryptographic engine feature: {integrity.engine_feature}.</span>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button type="button" className={styles.btnSecondary} onClick={refresh} disabled={loading}>
          {loading ? "Verifying..." : "↻ Re-Verify & Refresh Chain"}
        </button>
        {chain.length > 0 && (
          <span className={`${styles.badge} ${styles.badgeCyan}`}>
            {chain.length} record{chain.length !== 1 ? "s" : ""} in chain
          </span>
        )}
      </div>

      {chain.length === 0 && !loading && (
        <div className={styles.emptyState}>
          No evidence records in current memory session yet. Run an analysis on the{" "}
          <Link href="/aegisnet/demo" className={styles.planLink}>
            Live Analyzer
          </Link>{" "}
          to generate and commit hash-chained records.
        </div>
      )}

      {chain.length > 0 && (
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>📦 Evidence Ledger Records</h2>
            <span className={`${styles.badge} ${styles.badgeMuted}`}>Sequential Hashes</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {chain.map((rec, idx) => (
              <div key={rec.record_id || idx} className={styles.chainRecord}>
                <div className={styles.chainMeta}>
                  <strong>Record #{idx + 1}</strong> · Type:{" "}
                  <span style={{ color: "var(--ag-cyan-light)" }}>{rec.record_type?.toUpperCase()}</span> · Timestamp:{" "}
                  {new Date(rec.timestamp).toLocaleString()}
                </div>
                <div>
                  <span className={styles.chainMeta}>SHA-256 Hash: </span>
                  <code className={styles.chainHash}>{rec.hash}</code>
                </div>
                {idx > 0 && (
                  <div>
                    <span className={styles.chainMeta}>Previous Hash: </span>
                    <code className={styles.chainHash} style={{ color: "#94a3b8" }}>
                      {rec.previous_hash}
                    </code>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
