export default function CtaFooter() {
  return (
    <>
      <section className="section_cta-2">
        <div className="padding-global">
          <div className="container-large">
            <div className="cta-sticky">
              <div className="cta-track">
                <div className="parent-relative">
                  <div className="footer_logo-wrap-2 hyperxdb-footer-mark">
                    <img
                      src="/assets/logo.png"
                      alt="AegisNet Shield"
                      className="hyperxdb-footer-mark_icon"
                      style={{ height: "0.72em", width: "auto", objectFit: "contain", verticalAlign: "middle", marginRight: "0.15em" }}
                    />
                    <span className="hyperxdb-footer-mark_text">
                      {"Aegis"}
                      <span className="hyperxdb-logo_x">N</span>
                      <span className="hyperxdb-logo_db">et</span>
                    </span>
                  </div>
                  <div className="footer_logo-wrap-2 is-above hyperxdb-footer-mark">
                    <img
                      src="/assets/logo.png"
                      alt="AegisNet Shield"
                      className="hyperxdb-footer-mark_icon"
                      style={{ height: "0.72em", width: "auto", objectFit: "contain", verticalAlign: "middle", marginRight: "0.15em" }}
                    />
                    <span className="hyperxdb-footer-mark_text">
                      {"Aegis"}
                      <span className="hyperxdb-logo_x">N</span>
                      <span className="hyperxdb-logo_db">et</span>
                    </span>
                  </div>
                  <div className="cta-component-2">
                    <div id="w-node-_2bba332f-5f7f-018e-1dcb-c98b8580f2d6-8580f2a8" className="cta-content-2">
                      <div className="cta-content-text">
                        <h2 className="heading-style-h5 text-weight-medium">
                          {"Ready to analyze suspicious communications?"}
                        </h2>
                        <p className="text-size-medium">
                          {"Connect the signals across time and channels. Test assertions against ground-truth evidence. Empower human fraud analysts with calibrated briefs."}
                        </p>
                      </div>
                      <div className="button-group desktop">
                        <a
                          data-button-066=""
                          data-wf--button--variant="tertiary"
                          href="/demo"
                          className="button-066 w-variant-3819d0ce-d6bb-f52e-c0a9-5429ba2c9c4b w-inline-block"
                        >
                          <span className="button-066__bg w-variant-3819d0ce-d6bb-f52e-c0a9-5429ba2c9c4b" />
                          <span className="button-066__inner">
                            <span data-button-066-text="" className="button-066__text w-variant-3819d0ce-d6bb-f52e-c0a9-5429ba2c9c4b">
                              {"Try Live Scam Analyzer"}
                            </span>
                          </span>
                        </a>
                        <a
                          data-button-066=""
                          data-wf--button--variant="tertiary"
                          href="/aegisnet/overview"
                          className="button-066 w-variant-3819d0ce-d6bb-f52e-c0a9-5429ba2c9c4b w-inline-block"
                          style={{ marginLeft: "1rem" }}
                        >
                          <span className="button-066__bg w-variant-3819d0ce-d6bb-f52e-c0a9-5429ba2c9c4b" style={{ background: "#1e293b" }} />
                          <span className="button-066__inner">
                            <span data-button-066-text="" className="button-066__text w-variant-3819d0ce-d6bb-f52e-c0a9-5429ba2c9c4b" style={{ color: "#38bdf8" }}>
                              {"Open Intelligence Console \u2192"}
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                    <div id="w-node-_2bba332f-5f7f-018e-1dcb-c98b8580f2e0-8580f2a8" className="cta-image_wrapper-2 is-custom">
                      <div className="video-wrapper-2">
                        <div className="bg-video-2 w-embed">
                          <div className="video-transparent-wrap">
                            {" "}
                            <video className="video-transparent" muted playsInline autoPlay loop>
                              {" "}
                              <source src="/prime/video-g-transparent-alpha.mov" type="video/mp4; codecs=hvc1" />
                              {" "}
                              <source src="/prime/video-green-transparent.webm" type="video/webm" />
                              {" "}
                            </video>
                            {" "}
                          </div>
                          {" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "3.5rem 0",
          borderTop: "1px solid #1e293b",
          textAlign: "center",
          color: "#64748b",
          fontSize: "0.92rem",
          background: "#06090e",
        }}
      >
        <div className="container-large">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "0.6rem" }}>
            <img
              src="/assets/logo.png"
              alt="AegisNet Shield"
              style={{
                width: "28px",
                height: "28px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 8px rgba(250, 204, 21, 0.45))",
              }}
            />
            <strong style={{ color: "#f8fafc", fontSize: "1.1rem" }}>
              AegisNet — Evidence-Grounded AI for Scam Network Intelligence
            </strong>
          </div>
          <p style={{ margin: "0.75rem 0 1rem" }}>
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#94a3b8", textDecoration: "none", margin: "0 10px" }}
            >
              API Docs (OpenAPI)
            </a>
            |
            <a
              href="http://localhost:8000/health"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#94a3b8", textDecoration: "none", margin: "0 10px" }}
            >
              Health Check
            </a>
            |
            <a href="/demo" style={{ color: "#94a3b8", textDecoration: "none", margin: "0 10px" }}>
              Live Analyzer
            </a>
            |
            <a href="/aegisnet/overview" style={{ color: "#06b6d4", textDecoration: "none", margin: "0 10px" }}>
              Intelligence Console
            </a>
          </p>
          <p style={{ fontSize: "0.82rem", color: "#475569" }}>
            AI + Cybersecurity Demonstration Platform. No automated enforcement — assistive intelligence only.
          </p>
        </div>
      </footer>
    </>
  );
}
