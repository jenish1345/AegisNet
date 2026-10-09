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
                <img
                  src="/assets/logo.png"
                  alt="AegisNet Logo"
                  style={{
                    height: "36px",
                    width: "auto",
                    objectFit: "contain",
                    filter: "drop-shadow(0 0 12px rgba(250, 204, 21, 0.45))",
                  }}
                />
                <span>AegisNet</span>
              </Link>

              {/* Navigation Links */}
              <nav data-lenis-prevent="true" data-nav-menu="" className="nav_menu top-banner">
                <div className="nav_menu-inner">
                  <ul className="nav_menu-ul is-bg">
                    <li className="nav_menu-li">
                      <Link href="/#pipeline" className="nav-link w-inline-block">
                        <span className="nav-link_span">Pipeline</span>
                      </Link>
                    </li>
                    <li className="nav_menu-li">
                      <Link href="/fleet/overview" className="nav-link w-inline-block">
                        <span className="nav-link_span">Registry</span>
                      </Link>
                    </li>
                    <li className="nav_menu-li">
                      <Link href="/fleet/overview" className="nav-link w-inline-block">
                        <span className="nav-link_span">Incidents</span>
                      </Link>
                    </li>
                    <li className="nav_menu-li">
                      <a
                        href="http://localhost:8000/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-link w-inline-block"
                      >
                        <span className="nav-link_span">Docs</span>
                      </a>
                    </li>
                    <li className="nav_menu-li">
                      <a
                        href="https://github.com/jenish1345/AegisNet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-link w-inline-block"
                      >
                        <span className="nav-link_span">GitHub</span>
                      </a>
                    </li>
                    <li className="nav_menu-li">
                      <Link href="/fleet/overview" className="nav-link w-inline-block">
                        <span className="nav-link_span">Dashboard</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>

              {/* Top Action Buttons */}
              <div className="nav_button-wrapper" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <a
                  href="https://github.com/jenish1345/AegisNet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link w-inline-block"
                  style={{ textDecoration: "none" }}
                >
                  <span className="nav-link_span">GitHub</span>
                </a>
                <Link
                  href="/fleet/overview"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "#facc15",
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    padding: "0.6rem 1.4rem",
                    borderRadius: "9999px",
                    textDecoration: "none",
                    boxShadow: "0 4px 15px rgba(250, 204, 21, 0.35)",
                    transition: "all 0.18s ease",
                  }}
                >
                  Open Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
