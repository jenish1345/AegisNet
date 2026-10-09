export default function Hero() {
  return (
    <>
      <div id="overview" className="stage-scroll">
        <div className="threejs">
          <div className="bg" />
          <img src="/assets/6a45168c7316606c592707d9_grid.svg" loading="lazy" alt="" className="grid-bg" />
          <div className="canvas w-embed">
            <canvas id="webgl" />
          </div>
          <div className="container-large is-relative" style={{ height: "100%" }}>
            <div className="hero-behind">
              <h1 className="heading_group-h1">
                <div className="hero-title">
                  <div className="hero-clip hero-clip--l">
                    <div className="line line--left">
                      {"Scam Intelligence.\u00a0"}
                    </div>
                  </div>
                  <div className="hero-clip hero-clip--r">
                    <div className="line line--right">
                      {"In AegisNet."}
                    </div>
                  </div>
                </div>
              </h1>
              <div id="heroCopy" className="hero-copy">
                <div className="hero-desc">
                  {"Connect the signals. Verify the story. Protect the next victim. AegisNet correlates scam indicators across time and channels using TraceX evidence-grounded AI."}
                </div>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
                  <a data-button-066="" href="/demo" className="button-066 hero-btn w-inline-block">
                    <span className="button-066__bg" />
                    <span className="button-066__inner">
                      <span data-button-066-text="" className="button-066__text">
                        {"Try Live Scam Analyzer"}
                      </span>
                    </span>
                  </a>
                  <a
                    data-button-066=""
                    href="http://localhost:8000/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-066 hero-btn w-inline-block"
                  >
                    <span className="button-066__bg" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <span className="button-066__inner">
                      <span data-button-066-text="" className="button-066__text">
                        {"OpenAPI Documentation"}
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="stage stage--behind">
              <div data-stage="stats" className="stage__item">
                <div className="stats">
                  <div className="stat">
                    <div data-suffix="" data-to="20" className="num">
                      {"< 20ms"}
                    </div>
                    <div className="stat__label">
                      {"Average Pipeline Latency"}
                    </div>
                  </div>
                  <div className="stat">
                    <div data-suffix="" data-to="7" className="num">
                      {"7 Steps"}
                    </div>
                    <div className="stat__label">
                      {"Automated Evidence Verification"}
                    </div>
                  </div>
                  <div className="stat">
                    <div data-suffix="" data-to="100" className="num">
                      {"100%"}
                    </div>
                    <div className="stat__label">
                      {"Human Review Brief Grounding"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo bar / marquee */}
            <div className="logo-bar logo-early">
              <div className="marquee">
                <div id="logoTrack" className="marquee__track" style={{ willChange: "transform", whiteSpace: "nowrap" }}>
                  <span style={{ fontWeight: 700, color: "#64748b", fontSize: "0.95rem", marginRight: "3rem" }}>
                    PROTECTING VICTIMS
                  </span>
                  <span style={{ fontWeight: 700, color: "#64748b", fontSize: "0.95rem", marginRight: "3rem" }}>
                    • TRACEX CORRELATION
                  </span>
                  <span style={{ fontWeight: 700, color: "#64748b", fontSize: "0.95rem", marginRight: "3rem" }}>
                    • NO BLIND ENFORCEMENT
                  </span>
                  <span style={{ fontWeight: 700, color: "#64748b", fontSize: "0.95rem", marginRight: "3rem" }}>
                    • ASSISTIVE AI
                  </span>
                  <span style={{ fontWeight: 700, color: "#64748b", fontSize: "0.95rem", marginRight: "3rem" }}>
                    • COUNTER-EVIDENCE CHECK
                  </span>
                </div>
              </div>
            </div>

            {/* Statement overlay animated by prime-3d during scroll */}
            <div className="section_statement is-homepage">
              <div className="padding-global">
                <div className="uc_statement_wrap container-large">
                  <div className="statement-title">
                    <div className="text-size-xlarge text-weight-medium" style={{ color: "#facc15", fontSize: "2rem", marginBottom: "1rem" }}>
                      {"Evidence-Grounded Intelligence"}
                    </div>
                  </div>
                  <h2 className="heading_component heading-style-h5 max-width-80" style={{ color: "#f8fafc", fontSize: "clamp(2rem, 3.5vw, 3.2rem)", lineHeight: 1.25 }}>
                    <span className="heading_text">
                      {"Connect the signals. Verify the story. Protect the next victim. AegisNet correlates scam indicators across time and channels using TraceX evidence-grounded AI."}
                    </span>
                  </h2>
                </div>
              </div>
            </div>

              {/* Classical Statues Tabs UI dynamically animated by Three.js */}
              <div className="tabs-ui">
                <div className="tab-content" data-tab="0">
                  <h2 className="tab-title">
                    <span className="tab-title__line"><span className="tab-title__inner">Live</span></span>
                    <span className="tab-title__line"><span className="tab-title__inner">Cluster</span></span>
                    <span className="tab-title__line"><span className="tab-title__inner">Metrics</span></span>
                  </h2>
                  <div className="tab-copy">
                    <div className="tab-desc">Requested versus actual usage, read from metrics-server — never an estimate when a sample is missing.</div>
                    <a href="/demo" className="tab-btn button-066 w-inline-block" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#facc15", color: "#000", padding: "12px 24px", borderRadius: "999px", fontWeight: 700, textDecoration: "none", marginTop: "24px" }}>
                      <span>Discover more &rarr;</span>
                    </a>
                  </div>
                </div>

                <div className="tab-content" data-tab="1">
                  <h2 className="tab-title">
                    <span className="tab-title__line"><span className="tab-title__inner">Reasoned</span></span>
                    <span className="tab-title__line"><span className="tab-title__inner">Waste</span></span>
                    <span className="tab-title__line"><span className="tab-title__inner">Verdicts</span></span>
                  </h2>
                  <div className="tab-copy">
                    <div className="tab-desc">Every verdict cites the measured numbers behind it — confidence, evidence and reasoning.</div>
                    <a href="/demo" className="tab-btn button-066 w-inline-block" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#facc15", color: "#000", padding: "12px 24px", borderRadius: "999px", fontWeight: 700, textDecoration: "none", marginTop: "24px" }}>
                      <span>Discover more &rarr;</span>
                    </a>
                  </div>
                </div>

                <div className="tab-content" data-tab="2">
                  <h2 className="tab-title">
                    <span className="tab-title__line"><span className="tab-title__inner">Human</span></span>
                    <span className="tab-title__line"><span className="tab-title__inner">Approval</span></span>
                    <span className="tab-title__line"><span className="tab-title__inner">Gate</span></span>
                  </h2>
                  <div className="tab-copy">
                    <div className="tab-desc">Nothing executes on its own. A person reads the reasoning and the cost, then approves the cluster action and the attestation together.</div>
                    <a href="/demo" className="tab-btn button-066 w-inline-block" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#facc15", color: "#000", padding: "12px 24px", borderRadius: "999px", fontWeight: 700, textDecoration: "none", marginTop: "24px" }}>
                      <span>Discover more &rarr;</span>
                    </a>
                  </div>
                </div>

                <div className="tab-content" data-tab="3">
                  <h2 className="tab-title">
                    <span className="tab-title__line"><span className="tab-title__inner">Public</span></span>
                    <span className="tab-title__line"><span className="tab-title__inner">Efficiency</span></span>
                    <span className="tab-title__line"><span className="tab-title__inner">Registry</span></span>
                  </h2>
                  <div className="tab-copy">
                    <div className="tab-desc">Confirmed incidents are attested on Base Sepolia, so any other orchestrator can check an agent&apos;s record without trusting our dashboard.</div>
                    <a href="/demo" className="tab-btn button-066 w-inline-block" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#facc15", color: "#000", padding: "12px 24px", borderRadius: "999px", fontWeight: 700, textDecoration: "none", marginTop: "24px" }}>
                      <span>Discover more &rarr;</span>
                    </a>
                  </div>
                </div>

                <div className="tab-content" data-tab="4">
                  <h2 className="tab-title">
                    <span className="tab-title__line"><span className="tab-title__inner">No</span></span>
                    <span className="tab-title__line"><span className="tab-title__inner">Invented</span></span>
                    <span className="tab-title__line"><span className="tab-title__inner">Numbers</span></span>
                  </h2>
                  <div className="tab-copy">
                    <div className="tab-desc">If the cluster or the model is unreachable the incident is marked failed — a fabricated verdict would be indistinguishable from a real one.</div>
                    <a href="/demo" className="tab-btn button-066 w-inline-block" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#facc15", color: "#000", padding: "12px 24px", borderRadius: "999px", fontWeight: 700, textDecoration: "none", marginTop: "24px" }}>
                      <span>Discover more &rarr;</span>
                    </a>
                  </div>
                </div>

                {/* Bottom Horizontal Interactive Tab Navigation Bar */}
                <div className="tabs-nav">
                  <button className="tab-nav__item is-active" data-tab-nav="0">
                    <span className="tab-nav__label">Live Cluster Metrics</span>
                    <div className="tab-nav__bar"><span className="tab-nav__fill" /></div>
                  </button>
                  <button className="tab-nav__item" data-tab-nav="1">
                    <span className="tab-nav__label">Reasoned Waste Verdicts</span>
                    <div className="tab-nav__bar"><span className="tab-nav__fill" /></div>
                  </button>
                  <button className="tab-nav__item" data-tab-nav="2">
                    <span className="tab-nav__label">Human Approval Gate</span>
                    <div className="tab-nav__bar"><span className="tab-nav__fill" /></div>
                  </button>
                  <button className="tab-nav__item" data-tab-nav="3">
                    <span className="tab-nav__label">Public Efficiency Registry</span>
                    <div className="tab-nav__bar"><span className="tab-nav__fill" /></div>
                  </button>
                  <button className="tab-nav__item" data-tab-nav="4">
                    <span className="tab-nav__label">No Invented Numbers</span>
                    <div className="tab-nav__bar"><span className="tab-nav__fill" /></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

