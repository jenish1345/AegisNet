"use client";

import { useState } from "react";

interface TabItem {
  id: string;
  label: string;
  title: string;
  statue: string;
  srcSet: string;
  alt: string;
  description: string;
  badge: string;
  statusPill: string;
  metric: string;
}

const TABS: TabItem[] = [
  {
    id: "01",
    label: "Live Cluster Metrics",
    title: "Live\nCluster\nMetrics",
    statue: "/assets/6a4ba7d374be7e2d6d2e63ee_eed11584d0fb81f03258a156f36e6440_01-tab.webp",
    srcSet: "/assets/6a4ba7d374be7e2d6d2e63ee_eed11584d0fb81f03258a156f36e6440_01-tab-p-500.webp 500w, /assets/6a4ba7d374be7e2d6d2e63ee_eed11584d0fb81f03258a156f36e6440_01-tab-p-800.webp 800w, /assets/6a4ba7d374be7e2d6d2e63ee_eed11584d0fb81f03258a156f36e6440_01-tab.webp 948w",
    alt: "TraceX live cluster metrics and correlation analysis.",
    description: "Requested versus actual usage, read from metrics-server — never an estimate when a sample is missing.",
    badge: "⚡ ORACLE MODULE 01 // TRACEX ENGINE",
    statusPill: "● TEMPORAL GRAPH ACTIVE",
    metric: "0 HALLUCINATIONS",
  },
  {
    id: "02",
    label: "Reasoned Waste Verdicts",
    title: "Reasoned\nWaste\nVerdicts",
    statue: "/assets/6a4ba7d373435a33a7dab8d0_14cd8dd716b5b4fbce73aad9f4d33916_02-tab.webp",
    srcSet: "/assets/6a4ba7d373435a33a7dab8d0_14cd8dd716b5b4fbce73aad9f4d33916_02-tab-p-500.webp 500w, /assets/6a4ba7d373435a33a7dab8d0_14cd8dd716b5b4fbce73aad9f4d33916_02-tab-p-800.webp 800w, /assets/6a4ba7d373435a33a7dab8d0_14cd8dd716b5b4fbce73aad9f4d33916_02-tab.webp 948w",
    alt: "Reasoned threat verdicts and counter-evidence.",
    description: "Every verdict cites the measured numbers behind it — confidence, evidence and reasoning.",
    badge: "⚖️ ORACLE MODULE 02 // COUNTER-EVIDENCE",
    statusPill: "● SPF/DKIM AUDIT ACTIVE",
    metric: "BENIGN AUDITED",
  },
  {
    id: "03",
    label: "Human Approval Gate",
    title: "Human\nApproval\nGate",
    statue: "/assets/6a4ba7d35cb6af73688d44f5_68fc4b2687a2f9ceaa6517b0d60ebc35_04-tab.webp",
    srcSet: "/assets/6a4ba7d35cb6af73688d44f5_68fc4b2687a2f9ceaa6517b0d60ebc35_04-tab-p-500.webp 500w, /assets/6a4ba7d35cb6af73688d44f5_68fc4b2687a2f9ceaa6517b0d60ebc35_04-tab-p-800.webp 800w, /assets/6a4ba7d35cb6af73688d44f5_68fc4b2687a2f9ceaa6517b0d60ebc35_04-tab.webp 890w",
    alt: "Human approval gate and fraud review.",
    description: "Nothing executes on its own. A person reads the reasoning and the cost, then approves the cluster action and the attestation together.",
    badge: "🛡️ ORACLE MODULE 03 // TRUTH GATE",
    statusPill: "● ARITHMETIC GATE PASSED",
    metric: "100% PROVABLE",
  },
  {
    id: "04",
    label: "Public Efficiency Registry",
    title: "Public\nEfficiency\nRegistry",
    statue: "/assets/6a59f7cc6b9b58fcf00f2dca_04-tab-2.webp",
    srcSet: "/assets/6a59f7cc6b9b58fcf00f2dca_04-tab-2-p-500.webp 500w, /assets/6a59f7cc6b9b58fcf00f2dca_04-tab-2-p-800.webp 800w, /assets/6a59f7cc6b9b58fcf00f2dca_04-tab-2.webp 890w",
    alt: "Public efficiency registry and hash verification.",
    description: "Confirmed incidents are attested on Base Sepolia, so any other orchestrator can check an agent's record without trusting our dashboard.",
    badge: "📋 ORACLE MODULE 04 // GOVERNANCE",
    statusPill: "● HUMAN REVIEW READY",
    metric: "ASSISTIVE ONLY",
  },
  {
    id: "05",
    label: "No Invented Numbers",
    title: "No\nInvented\nNumbers",
    statue: "/assets/6a4ba7d419d95af100ef903e_ac9e227b0f83ac2eef9596c6f952c50e_03-tab.webp",
    srcSet: "/assets/6a4ba7d419d95af100ef903e_ac9e227b0f83ac2eef9596c6f952c50e_03-tab-p-500.webp 500w, /assets/6a4ba7d419d95af100ef903e_ac9e227b0f83ac2eef9596c6f952c50e_03-tab-p-800.webp 800w, /assets/6a4ba7d419d95af100ef903e_ac9e227b0f83ac2eef9596c6f952c50e_03-tab.webp 948w",
    alt: "Zero hallucination and strict arithmetic verification.",
    description: "If the cluster or the model is unreachable the incident is marked failed — a fabricated verdict would be indistinguishable from a real one.",
    badge: "🔗 ORACLE MODULE 05 // STRICT INTEGRITY",
    statusPill: "● SHA-256 HASH VERIFIED",
    metric: "PROVABLE RECORD",
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const active = TABS[activeTab];

  return (
    <section id="tracex" className="section_tabs" style={{ backgroundColor: "#06090e", padding: "6rem 0 4rem", position: "relative", overflow: "hidden" }}>
      <div className="padding-global">
        <div className="container-large">
          
          {/* ============================================================== */}
          {/* DESKTOP STAGE (Matched exactly to attached reference images) */}
          {/* ============================================================== */}
          <div
            className="tabs-desktop-stage"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1.2fr 0.9fr",
              alignItems: "center",
              minHeight: "560px",
              gap: "2.5rem",
              position: "relative",
            }}
          >
            {/* Left Column: Massive Display Headline */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#facc15",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}
              >
                {active.badge}
              </div>
              <h2
                style={{
                  fontSize: "clamp(3.2rem, 5.8vw, 5.6rem)",
                  fontWeight: 800,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                  margin: 0,
                  whiteSpace: "pre-line",
                  fontFamily: "var(--font-family--headings, 'DM Sans', Montserrat, sans-serif)",
                }}
              >
                {active.title}
              </h2>
            </div>

            {/* Center Column: Classical Statue Artwork */}
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "540px",
              }}
            >
              {/* Subtle Radial Glow Behind Statue */}
              <div
                style={{
                  position: "absolute",
                  width: "380px",
                  height: "380px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(250, 204, 21, 0.08) 0%, rgba(6, 182, 212, 0.04) 45%, transparent 70%)",
                  filter: "blur(40px)",
                  pointerEvents: "none",
                }}
              />

              <img
                key={active.id}
                src={active.statue}
                srcSet={active.srcSet}
                sizes="(max-width: 991px) 80vw, 42vw"
                alt={active.alt}
                style={{
                  height: "100%",
                  maxHeight: "520px",
                  width: "auto",
                  maxWidth: "100%",
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                  filter: "drop-shadow(0 25px 45px rgba(0, 0, 0, 0.85))",
                  animation: "fadeIn 0.35s ease forwards",
                  userSelect: "none",
                }}
              />
            </div>

            {/* Right Column: Explanatory Copy & Yellow Button */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.75rem", maxWidth: "380px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#10b981",
                  letterSpacing: "0.06em",
                  fontFamily: "monospace",
                }}
              >
                {active.statusPill}
              </div>

              <p
                style={{
                  fontSize: "1.15rem",
                  lineHeight: 1.55,
                  color: "#f1f5f9",
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {active.description}
              </p>

              <a
                href="/demo"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: "#facc15",
                  color: "#000000",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  padding: "0.8rem 1.85rem",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  boxShadow: "0 6px 20px rgba(250, 204, 21, 0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(250, 204, 21, 0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(250, 204, 21, 0.35)";
                }}
              >
                <span>Discover more</span>
                <span style={{ fontSize: "1.15rem", fontWeight: 800 }}>→</span>
              </a>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BOTTOM HORIZONTAL TAB BAR (Exactly matching image.png bar) */}
          {/* ============================================================== */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
              marginTop: "3.5rem",
              gap: "0.75rem",
            }}
            className="tabs-nav-bar"
          >
            {TABS.map((tab, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: isSelected ? "2.5px solid #facc15" : "2.5px solid transparent",
                    marginBottom: "-1px",
                    padding: "1.15rem 0.5rem 1.15rem 0",
                    textAlign: "left",
                    color: isSelected ? "#ffffff" : "#71717a",
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: "0.95rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    outline: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.color = "#d4d4d8";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.color = "#71717a";
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 991px) {
          .tabs-desktop-stage {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 2rem !important;
          }
          .tabs-desktop-stage div {
            align-items: center !important;
            margin: 0 auto !important;
          }
          .tabs-nav-bar {
            grid-template-columns: repeat(2, 1fr) !important;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}
