import type { Metadata } from "next";
import type { ReactNode } from "react";

const DESCRIPTION =
  "Connect the signals. Verify the story. Protect the next victim. AegisNet is an evidence-grounded AI system for scam network intelligence.";

const OG_IMAGE = "/assets/6a5a4043436ba7ed8f8a3507_og-image-1.png";

export const metadata: Metadata = {
  title: "AegisNet | Evidence-Grounded AI for Scam Network Intelligence",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    title: "AegisNet | Scam Network Intelligence",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "AegisNet | Scam Network Intelligence",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AegisNet",
  description:
    "Evidence-grounded AI for scam network intelligence. Correlates scam indicators across time and channels using TraceX evidence-grounded AI.",
  url: "/",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "7-Step Automated Evidence Verification",
    "TraceX Correlation Engine",
    "SHA-256 Evidence Hash Chain",
    "Truth Gate Verification",
    "Synthesized Human Review Brief",
  ],
  provider: { "@type": "Organization", name: "AegisNet", url: "/" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-wf-domain="aegisnet.ai"
      data-wf-page="6a3e64ff64a92f2281e8e826"
      data-wf-site="6a3e64ff64a92f2281e8e82a"
    >
      <head>
        {/* Order matters: Webflow base, then fonts and Swiper, then the page's
            own inline blocks last so their overrides win. */}
        <link rel="stylesheet" href="/vendor/webflow.css" />
        <link rel="stylesheet" href="/fonts/montserrat.css" />
        <link rel="stylesheet" href="/vendor/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/vendor/inline.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {/* Webflow CSS keys off html.w-mod-js / .w-mod-touch */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              '!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",' +
              '("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&' +
              '(n.className+=t+"touch")}(window,document);',
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
