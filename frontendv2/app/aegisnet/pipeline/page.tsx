import styles from "../aegisnet.module.css";

const STEPS = [
  ["01", "Message Ingestion", "Normalizes incoming email, SMS, or chat text into a standardized schema with SHA-256 hash for integrity tracking."],
  ["02", "Signal Extraction", "Identifies urgency language, authority appeals, domain spoofing, lure mechanics, and payment vectors using NLP pattern matching."],
  ["03", "Evidence Correlation", "TraceX engine queries historical telemetry to correlate cross-channel indicators and build an evidence graph."],
  ["04", "Campaign Reconstruction", "Clusters evidence nodes to expose overarching criminal threat networks, tactics, and scale."],
  ["05", "Counter-Evidence Check", "Actively evaluates benign markers, SPF/DKIM verification, and false-positive signals to prevent unjust conclusions."],
  ["06", "Claim Verification", "Formally verifies specific factual assertions against the evidence graph using the Truth Gate — fabrications caught by arithmetic."],
  ["07", "Human Review Brief", "Synthesizes executive summary, confidence scores, limitations, and actionable recommended next steps for the fraud analyst."],
];

const SIGNALS = [
  ["Urgency", "Time-pressure language: 'act now', 'limited time', 'immediately', 'account suspended'."],
  ["Authority", "Impersonation of trusted institutions: 'bank', 'security', 'Microsoft', 'IRS', 'support'."],
  ["Reciprocity", "False value offers: 'free gift', 'crypto raffle', 'special reward', 'settlement'."],
  ["Fear", "Threat language: 'law enforcement', 'spyware infected', 'warrant issued', 'penalty'."],
  ["Greed", "High-yield wealth lures: 'guaranteed return', '500,000 USDT', 'inheritance payout'."],
  ["Social Proof", "Manufactured consensus: 'thousands of victims saved', 'official registry verified'."],
];

export default function PipelinePage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageKicker}>03 — Pipeline Methodology</div>
        <h1 className={styles.pageTitle}>The 7-Step Evidence Verification Pipeline</h1>
        <p className={styles.pageLede}>
          Every message passes through all seven steps. No step can be bypassed.
          A conclusion without supporting evidence records does not ship — that is the core guarantee.
        </p>
      </header>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Pipeline Workflow</h2>
          <span className={`${styles.badge} ${styles.badgeCyan}`}>Sequential Execution</span>
        </div>
        <div className={styles.pipelineGrid}>
          {STEPS.map(([num, title, body]) => (
            <div key={num} className={styles.pipelineStep}>
              <div className={styles.stepNumber}>STEP {num}</div>
              <div className={styles.stepTitle}>{title}</div>
              <div className={styles.stepBody}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Detected Scam Signal Types</h2>
          <span className={`${styles.badge} ${styles.badgeCyan}`}>NLP Feature Vectors</span>
        </div>
        <table className={styles.rowTable}>
          <thead>
            <tr>
              <th>Signal Type</th>
              <th>Pattern Matching & Behavioral Indicators</th>
            </tr>
          </thead>
          <tbody>
            {SIGNALS.map(([name, desc]) => (
              <tr key={name}>
                <td>
                  <strong>{name}</strong>
                </td>
                <td style={{ color: "var(--ag-text-muted)" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Ethical Boundaries & Guardrails</h2>
          <span className={`${styles.badge} ${styles.badgeAmber}`}>Non-Enforcement</span>
        </div>
        <ul className={styles.warningList}>
          <li className={styles.warningItem}>AegisNet does NOT determine guilt, malice, or legal criminal intent.</li>
          <li className={styles.warningItem}>AegisNet does NOT freeze financial accounts or block payment transactions.</li>
          <li className={styles.warningItem}>AegisNet does NOT blacklist phone numbers, IPs, or communication channels automatically.</li>
          <li className={styles.warningItem}>AegisNet does NOT contact victims, targets, or suspect actors directly.</li>
          <li className={styles.warningItem}>AegisNet does NOT perform automated enforcement actions.</li>
          <li className={styles.warningItem}>All intelligence briefs are purely assistive — AI proposes, human analysts decide.</li>
        </ul>
      </section>
    </>
  );
}
