import type { Metadata } from "next";
import Link from "next/link";
import AegisNav from "./AegisNav";
import styles from "./aegisnet.module.css";

export const metadata: Metadata = {
  title: "AegisNet — Intelligence Console",
  description: "Evidence-grounded AI for scam network intelligence.",
};

const NAV_ITEMS = [
  { href: "/aegisnet/overview", label: "System Overview", index: "01" },
  { href: "/aegisnet/demo", label: "Live Analyzer", index: "02" },
  { href: "/aegisnet/pipeline", label: "7-Step Pipeline", index: "03" },
  { href: "/aegisnet/evidence", label: "Evidence Chain", index: "04" },
  { href: "/aegisnet/engine", label: "Engine Features", index: "05" },
];

export default function AegisNetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link className={styles.brand} href="/aegisnet/overview" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
          <img
            src="/assets/logo.png"
            alt="AegisNet Logo"
            style={{
              width: "32px",
              height: "32px",
              objectFit: "contain",
              filter: "drop-shadow(0 0 8px rgba(250, 204, 21, 0.45))",
            }}
          />
          <div>
            <div className={styles.brandMark}>AegisNet</div>
            <div className={styles.brandSub}>Intelligence Console</div>
          </div>
        </Link>

        <AegisNav items={NAV_ITEMS} />

        <div className={styles.scopeIndicator}>
          FastAPI Engine: <strong>port 8000</strong>
          <br />
          TraceX Correlation: <strong>Active</strong>
          <br />
          <Link href="/" className={styles.planLink} style={{ display: "inline-block", marginTop: "8px" }}>
            ← Back to Landing
          </Link>
        </div>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
