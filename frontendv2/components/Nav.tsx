"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <div data-nav-status="close" data-nav-wrapper="" className="nav_wrapper">
      {/* Top Banner */}
      <div className="nav_banner">
        <div className="container-large">
          <div className="padding-global">
            <div className="nav_banner-link">
              <div className="text-size-small is-custom">
                Evidence-Grounded AI for Scam Network Intelligence. Connect the signals. Protect the next victim.
              </div>
              <a
                href="http://localhost:8000/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-style-link is-top-banner"
              >
                FastAPI Swagger Docs →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="nav is-scrolled">
        <div className="padding-global">
          <div className="container-large">
            <div className="nav_inner" style={{ transition: "0.3s" }}>
              {/* Brand Logo */}
              <Link
                href="/#overview"
                className="w-inline-block"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  textDecoration: "none",
                  letterSpacing: "-0.02em",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                    borderRadius: "9px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.15rem",
                    boxShadow: "0 0 15px rgba(6, 182, 212, 0.35)",
                  }}
                >
                  🛡️
                </div>
                <span>AegisNet</span>
              </Link>

              {/* Navigation Links */}
              <nav data-lenis-prevent="true" data-nav-menu="" className="nav_menu top-banner">
                <div className="nav_menu-inner">
                  <ul className="nav_menu-ul is-bg">
                    <li className="nav_menu-li">
                      <Link href="/#overview" className="nav-link w-inline-block">
                        <span className="nav-link_span">Overview</span>
                      </Link>
                    </li>
                    <li className="nav_menu-li">
                      <Link href="/demo" className="nav-link w-inline-block">
                        <span className="nav-link_span">Live Demo</span>
                      </Link>
                    </li>
                    <li className="nav_menu-li">
                      <Link href="/#pipeline" className="nav-link w-inline-block">
                        <span className="nav-link_span">7-Step Pipeline</span>
                      </Link>
                    </li>
                    <li className="nav_menu-li">
                      <Link href="/#tracex" className="nav-link w-inline-block">
                        <span className="nav-link_span">TraceX Engine</span>
                      </Link>
                    </li>
                    <li className="nav_menu-li">
                      <Link href="/#architecture" className="nav-link w-inline-block">
                        <span className="nav-link_span">Architecture</span>
                      </Link>
                    </li>
                    <li className="nav_menu-li">
                      <Link href="/aegisnet/overview" className="nav-link w-inline-block">
                        <span className="nav-link_span" style={{ color: "#38bdf8" }}>
                          Console ↗
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>

              {/* Top Action Buttons */}
              <div className="nav_button-wrapper" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <a
                  href="http://localhost:8000/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link w-inline-block"
                  style={{ textDecoration: "none" }}
                >
                  <span className="nav-link_span">API Docs</span>
                </a>
                <Link
                  href="/demo"
                  className="button-066 w-inline-block"
                  style={{ textDecoration: "none" }}
                >
                  <span className="button-066__bg" />
                  <span className="button-066__inner">
                    <span className="button-066__text">Run Demo</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
