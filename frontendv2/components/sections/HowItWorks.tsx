"use client";

import { useEffect, useRef } from "react";

type Step = {
  number: string;
  label: string;
  caption: string;
  icon: React.ReactNode;
};

const STEPS: Step[] = [
  {
    number: "01",
    label: "Message Ingestion",
    caption: "Normalizes incoming email, SMS, or chat text into a standardized schema with SHA-256 hash tracking.",
    icon: (
      <>
        <circle cx="16" cy="16" r="3" />
        <circle cx="16" cy="16" r="8" opacity="0.55" />
        <circle cx="16" cy="16" r="13" opacity="0.25" />
      </>
    ),
  },
  {
    number: "02",
    label: "Signal Extraction",
    caption: "Extracts urgency language, authority claims, spoofed domains, and lure patterns via NLP.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="23" cy="8" r="3" />
        <circle cx="16" cy="24" r="3" />
        <path d="M11 10 L16 16 L21 10" />
        <path d="M16 16 L16 21" />
      </>
    ),
  },
  {
    number: "03",
    label: "Evidence Correlation",
    caption: "TraceX engine queries historical telemetry to correlate cross-channel scam indicators into an evidence graph.",
    icon: (
      <>
        <circle cx="8" cy="16" r="3" />
        <circle cx="24" cy="16" r="3" />
        <path d="M11 16 L21 16" />
        <path d="M16 10 L16 22" opacity="0.5" />
      </>
    ),
  },
  {
    number: "04",
    label: "Campaign Reconstruction",
    caption: "Clusters evidence to expose overarching criminal threat networks, infrastructure, and tactics.",
    icon: (
      <>
        <circle cx="9" cy="9" r="2.6" />
        <circle cx="23" cy="9" r="2.6" />
        <circle cx="9" cy="23" r="2.6" />
        <circle cx="23" cy="23" r="2.6" />
        <path d="M11.6 9 L16 13.4 L20.4 9" />
        <path d="M11.6 23 L16 18.6 L20.4 23" />
      </>
    ),
  },
  {
    number: "05",
    label: "Counter-Evidence Check",
    caption: "Actively evaluates benign markers, SPF/DKIM verification, and false-positive signs before conclusions.",
    icon: (
      <>
        <path d="M16 4 L4 10 L4 18 C4 24 9 28 16 30 C23 28 28 24 28 18 L28 10 Z" />
        <path d="M11 16 L14.5 19.5 L21 13" />
      </>
    ),
  },
  {
    number: "06",
    label: "Claim Verification",
    caption: "Truth Gate tests every assertion against hashed evidence — fabrications are caught by arithmetic.",
    icon: (
      <>
        <rect x="6" y="6" width="20" height="20" rx="3" />
        <path d="M10 16 L14 20 L22 12" />
      </>
    ),
  },
  {
    number: "07",
    label: "Human Review Brief",
    caption: "Synthesizes executive summary, confidence assessments, limitations, and recommended analyst actions.",
    icon: (
      <>
        <circle cx="16" cy="16" r="10" />
        <path d="M11 16.5 L14.5 20 L21.5 12" />
      </>
    ),
  },
];

type GsapLike = {
  registerPlugin: (...args: unknown[]) => void;
  to: (target: unknown, vars: Record<string, unknown>) => unknown;
};

declare global {
  interface Window {
    gsap?: GsapLike;
    ScrollTrigger?: unknown;
    __siteScriptsReady?: boolean;
  }
}

export default function HowItWorks() {
  const diagramRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    let cancelled = false;
    let triggerInstance: { kill: () => void } | null = null;

    function activateAll() {
      nodeRefs.current.forEach((el) => el?.classList.add("is-active"));
      if (progressRef.current) progressRef.current.style.width = "100%";
    }

    function init() {
      if (cancelled) return;
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      const diagram = diagramRef.current;
      const progress = progressRef.current;

      if (!gsap || !ScrollTrigger || !diagram || !progress) {
        activateAll();
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        activateAll();
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const total = nodeRefs.current.length;

      const tween = gsap.to(progress, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: diagram,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.4,
          onUpdate: (self: { progress: number }) => {
            nodeRefs.current.forEach((el, i) => {
              const threshold = i / (total - 1);
              el?.classList.toggle("is-active", self.progress >= threshold - 0.02);
            });
          },
        },
      }) as { scrollTrigger?: { kill: () => void } };

      triggerInstance = tween.scrollTrigger ?? null;
    }

    if (window.__siteScriptsReady) {
      init();
    } else {
      window.addEventListener("site-scripts-ready", init, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("site-scripts-ready", init);
      triggerInstance?.kill();
    };
  }, []);

  return (
    <section id="pipeline" className="section_workflow hide-tablet">
      <div className="padding-global">
        <div className="container-large">
          <div aria-hidden="true" data-wf--vertical-spacer--size-variant="xlarge" className="vertical-spacer" />
          <div className="eyebrow-outline">
            <div className="text-size-alt3">{"AEGISNET 7-STEP PIPELINE"}</div>
          </div>
          <div aria-hidden="true" data-wf--vertical-spacer--size-variant="small" className="vertical-spacer w-variant-98e9d74f-7a50-8a16-de75-1297c9c11c0d" />
          <div className="why_heading-wrap">
            <h2>{"The 7-Step Evidence Verification Pipeline"}</h2>
            <p style={{ color: "#94a3b8", maxWidth: "700px", margin: "0.75rem auto 0", fontSize: "1.05rem" }}>
              Every suspicious message is dissected, correlated, and counter-checked against ground truth.
              No unprovable claims ship.
            </p>
          </div>
          <div aria-hidden="true" data-wf--vertical-spacer--size-variant="large" className="vertical-spacer w-variant-7f4d5cb2-9771-97b6-e71b-a129763950de" />

          <div className="workflow_diagram" ref={diagramRef}>
            <div className="workflow_line-track" aria-hidden="true">
              <div className="workflow_line-progress" ref={progressRef} />
            </div>
            <ol className="workflow_steps">
              {STEPS.map((step, i) => (
                <li
                  key={step.number}
                  className="workflow_step"
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                >
                  <div className="workflow_node">
                    <svg viewBox="0 0 32 32" fill="none" className="workflow_node-icon" aria-hidden="true">
                      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        {step.icon}
                      </g>
                    </svg>
                  </div>
                  <div className="workflow_step-number">{step.number}</div>
                  <div className="workflow_step-label">{step.label}</div>
                  <p className="workflow_step-caption">{step.caption}</p>
                </li>
              ))}
            </ol>
          </div>

          <div aria-hidden="true" data-wf--vertical-spacer--size-variant="xlarge" className="vertical-spacer" />
        </div>
      </div>
    </section>
  );
}
