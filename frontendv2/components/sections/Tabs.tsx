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
}

const TABS: TabItem[] = [
  {
    id: "01",
    label: "Live Cluster Metrics",
    title: "Live\nCluster\nMetrics",
    statue: "/assets/6a4ba7d374be7e2d6d2e63ee_eed11584d0fb81f03258a156f36e6440_01-tab.webp",
    srcSet: "/assets/6a4ba7d374be7e2d6d2e63ee_eed11584d0fb81f03258a156f36e6440_01-tab-p-500.webp 500w, /assets/6a4ba7d374be7e2d6d2e63ee_eed11584d0fb81f03258a156f36e6440_01-tab-p-800.webp 800w, /assets/6a4ba7d374be7e2d6d2e63ee_eed11584d0fb81f03258a156f36e6440_01-tab.webp 948w",
    alt: "Live Cluster Metrics",
    description: "Requested versus actual usage, read from metrics-server — never an estimate when a sample is missing.",
  },
  {
    id: "02",
    label: "Reasoned Waste Verdicts",
    title: "Reasoned\nWaste\nVerdicts",
    statue: "/assets/6a4ba7d373435a33a7dab8d0_14cd8dd716b5b4fbce73aad9f4d33916_02-tab.webp",
    srcSet: "/assets/6a4ba7d373435a33a7dab8d0_14cd8dd716b5b4fbce73aad9f4d33916_02-tab-p-500.webp 500w, /assets/6a4ba7d373435a33a7dab8d0_14cd8dd716b5b4fbce73aad9f4d33916_02-tab-p-800.webp 800w, /assets/6a4ba7d373435a33a7dab8d0_14cd8dd716b5b4fbce73aad9f4d33916_02-tab.webp 948w",
    alt: "Reasoned Waste Verdicts",
    description: "Every verdict cites the measured numbers behind it — confidence, evidence and reasoning.",
  },
  {
    id: "03",
    label: "Human Approval Gate",
    title: "Human\nApproval\nGate",
    statue: "/assets/6a4ba7d35cb6af73688d44f5_68fc4b2687a2f9ceaa6517b0d60ebc35_04-tab.webp",
    srcSet: "/assets/6a4ba7d35cb6af73688d44f5_68fc4b2687a2f9ceaa6517b0d60ebc35_04-tab-p-500.webp 500w, /assets/6a4ba7d35cb6af73688d44f5_68fc4b2687a2f9ceaa6517b0d60ebc35_04-tab-p-800.webp 800w, /assets/6a4ba7d35cb6af73688d44f5_68fc4b2687a2f9ceaa6517b0d60ebc35_04-tab.webp 890w",
    alt: "Human Approval Gate",
    description: "Nothing executes on its own. A person reads the reasoning and the cost, then approves the cluster action and the attestation together.",
  },
  {
    id: "04",
    label: "Public Efficiency Registry",
    title: "Public\nEfficiency\nRegistry",
    statue: "/assets/6a59f7cc6b9b58fcf00f2dca_04-tab-2.webp",
    srcSet: "/assets/6a59f7cc6b9b58fcf00f2dca_04-tab-2-p-500.webp 500w, /assets/6a59f7cc6b9b58fcf00f2dca_04-tab-2-p-800.webp 800w, /assets/6a59f7cc6b9b58fcf00f2dca_04-tab-2.webp 890w",
    alt: "Public Efficiency Registry",
    description: "Confirmed incidents are attested on Base Sepolia, so any other orchestrator can check an agent's record without trusting our dashboard.",
  },
  {
    id: "05",
    label: "No Invented Numbers",
    title: "No\nInvented\nNumbers",
    statue: "/assets/6a4ba7d419d95af100ef903e_ac9e227b0f83ac2eef9596c6f952c50e_03-tab.webp",
    srcSet: "/assets/6a4ba7d419d95af100ef903e_ac9e227b0f83ac2eef9596c6f952c50e_03-tab-p-500.webp 500w, /assets/6a4ba7d419d95af100ef903e_ac9e227b0f83ac2eef9596c6f952c50e_03-tab-p-800.webp 800w, /assets/6a4ba7d419d95af100ef903e_ac9e227b0f83ac2eef9596c6f952c50e_03-tab.webp 948w",
    alt: "No Invented Numbers",
    description: "If the cluster or the model is unreachable the incident is marked failed — a fabricated verdict would be indistinguishable from a real one.",
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const active = TABS[activeTab];

  return (
    <section
      id="tracex"
      className="section_tabs_stage"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#111215",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* ============================================================== */}
      {/* DESKTOP FULL-SCREEN STAGE WITH TEXT ON SIDES                   */}
      {/* (Exactly matching user reference images: image.png through 4)  */}
      {/* ============================================================== */}
      <div className="stage-viewport-desktop">
        {/* LEFT SIDE: Big Stacked Headline */}
        <div className="side-left-title">
          <h2 className="display-title-text">{active.title}</h2>
        </div>

        {/* CENTER: Classical Statue Cutout standing tall */}
        <div className="center-statue-container">
          <img
            key={active.id}
            src={active.statue}
            srcSet={active.srcSet}
            sizes="100vw"
            alt={active.alt}
            className="statue-image"
          />
        </div>

        {/* RIGHT SIDE: Description text and yellow pill button */}
        <div className="side-right-copy">
          <p className="description-text">{active.description}</p>
          <a href="/demo" className="yellow-discover-btn">
            <span>Discover more</span>
            <span style={{ fontSize: "1.2rem", lineHeight: 1 }}>→</span>
          </a>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM EDGE-TO-EDGE TAB NAVIGATION BAR                         */}
      {/* ============================================================== */}
      <div className="stage-bottom-nav">
        {TABS.map((tab, idx) => {
          const isSelected = activeTab === idx;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`nav-tab-item ${isSelected ? "is-active" : ""}`}
            >
              <span className="nav-tab-label">{tab.label}</span>
              <div className="nav-tab-bar">
                <div
                  className="nav-tab-fill"
                  style={{
                    transform: isSelected ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* RESPONSIVE CSS                                                 */}
      {/* ============================================================== */}
      <style jsx>{`
        .section_tabs_stage {
          background: #111215;
          min-height: 100vh;
        }

        .stage-viewport-desktop {
          position: relative;
          width: 100%;
          min-height: calc(100vh - 90px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
        }

        /* LEFT SIDE TEXT: Anchored to the far left side */
        .side-left-title {
          position: absolute;
          left: 4.5vw;
          bottom: 120px;
          z-index: 6;
          max-width: 42vw;
          pointer-events: auto;
        }

        .display-title-text {
          font-family: var(--font-family--headings, "DM Sans", -apple-system, sans-serif);
          font-size: clamp(3.2rem, 5.8vw, 6.2rem);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
          white-space: pre-line;
          text-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
        }

        /* CENTER STATUE: Perfectly centered */
        .center-statue-container {
          position: absolute;
          left: 50%;
          top: 48%;
          transform: translate(-50%, -50%);
          height: clamp(480px, 72vh, 760px);
          max-height: 82vh;
          width: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3;
          pointer-events: none;
        }

        .statue-image {
          height: 100%;
          max-height: 100%;
          width: auto;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.7));
          user-select: none;
          animation: statueFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes statueFadeIn {
          from {
            opacity: 0.1;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* RIGHT SIDE TEXT: Anchored to the far right side */
        .side-right-copy {
          position: absolute;
          right: 5vw;
          bottom: 130px;
          z-index: 6;
          width: clamp(260px, 22vw, 360px);
          display: flex;
          flex-direction: column;
          gap: 28px;
          pointer-events: auto;
        }

        .description-text {
          font-family: var(--font-family--headings, "DM Sans", -apple-system, sans-serif);
          font-size: clamp(1rem, 1.25vw, 1.25rem);
          font-weight: 400;
          line-height: 1.48;
          color: #ffffff;
          margin: 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        .yellow-discover-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background-color: #facc15;
          color: #000000;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 12px 24px;
          border-radius: 9999px;
          text-decoration: none;
          width: fit-content;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
          box-shadow: 0 4px 15px rgba(250, 204, 21, 0.35);
        }

        .yellow-discover-btn:hover {
          background-color: #fde047;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(250, 204, 21, 0.55);
        }

        /* BOTTOM NAV BAR: Pinned across the full bottom width */
        .stage-bottom-nav {
          position: relative;
          width: 100%;
          display: flex;
          align-items: stretch;
          gap: 24px;
          padding: 0 4.5vw 2rem;
          z-index: 10;
        }

        .nav-tab-item {
          flex: 1 0 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          padding: 0;
          outline: none;
        }

        .nav-tab-label {
          color: #ffffff;
          font-family: var(--font-family--headings, "DM Sans", -apple-system, sans-serif);
          font-size: clamp(12px, 0.9vw, 15px);
          font-weight: 400;
          line-height: 18px;
          padding: 0 2px;
          opacity: 0.45;
          transition: opacity 0.25s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nav-tab-item:hover .nav-tab-label {
          opacity: 0.85;
        }

        .nav-tab-item.is-active .nav-tab-label {
          opacity: 1;
          font-weight: 500;
        }

        .nav-tab-bar {
          height: 1.5px;
          width: 100%;
          background: #343434;
          overflow: hidden;
          position: relative;
        }

        .nav-tab-fill {
          height: 100%;
          width: 100%;
          background: #facc15;
          transform-origin: left center;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* MOBILE & TABLET LAYOUT (< 1024px) */
        @media (max-width: 1024px) {
          .stage-viewport-desktop {
            flex-direction: column;
            min-height: auto;
            padding: 4rem 1.5rem 2rem;
            position: relative;
          }

          .side-left-title {
            position: static;
            max-width: 100%;
            text-align: center;
            margin-bottom: 1.5rem;
          }

          .display-title-text {
            font-size: 2.8rem;
            line-height: 1.1;
          }

          .center-statue-container {
            position: static;
            transform: none;
            height: 380px;
            margin: 0 auto 1.5rem;
          }

          .side-right-copy {
            position: static;
            width: 100%;
            max-width: 480px;
            align-items: center;
            text-align: center;
            margin: 0 auto 2rem;
          }

          .stage-bottom-nav {
            overflow-x: auto;
            padding: 0 1.5rem 1.5rem;
            gap: 16px;
          }

          .nav-tab-item {
            flex: 0 0 auto;
            min-width: 160px;
          }
        }
      `}</style>
    </section>
  );
}
