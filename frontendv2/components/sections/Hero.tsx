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
          <div className="container-large is-relative">
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
          </div>
        </div>
      </div>
    </>
  );
}
