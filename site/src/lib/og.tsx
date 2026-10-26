import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Social share images (Open Graph / Twitter), one per page, rendered at build time by each route's
 * `opengraph-image.tsx`. Same look as the site's dark theme: ink ground, drafting grid, signal
 * orange, the NoxeTech mark, the page's name and its real headline (verbatim from the page's H1).
 */

export const ogSize = { width: 1200, height: 630 };

type Og = { eyebrow: string; title: string; subtitle?: string };

const pages: Record<string, Og> = {
  "/": { eyebrow: "Custom Software & Technology Solutions", title: "Bring the idea. We’ll engineer the software behind it." },
  "/services": { eyebrow: "Services", title: "Custom software designed and built around your requirements." },
  "/solutions": { eyebrow: "Solutions", title: "Custom technology designed around real operational challenges." },
  "/solutions/sms-switch": {
    eyebrow: "SMS Switch",
    title: "NoxeTech SMS Switch",
    subtitle: "Carrier-Grade A2P/P2P SMS Routing & High-Performance Gateway Platform",
  },
  "/solutions/sms-switch/custom-request": { eyebrow: "SMS Switch · Custom", title: "Request a Custom Version" },
  "/work": { eyebrow: "Our Work", title: "Software Built Around Real Requirements" },
  "/how-we-work": { eyebrow: "How We Work", title: "A clear path from requirement to working software." },
  "/company": { eyebrow: "Company", title: "Technology should fit the requirement—not the other way around." },
  "/contact": { eyebrow: "Contact", title: "Contact NoxeTech" },
  "/start-project": { eyebrow: "Start a Project", title: "Start a Project with NoxeTech" },
  "/portal": { eyebrow: "Client Portal", title: "Customer Portal Sign-In" },
  "/privacy": { eyebrow: "Legal", title: "Privacy Policy" },
  "/terms": { eyebrow: "Legal", title: "Terms of Use" },
  "/legal/refund": { eyebrow: "Legal", title: "Payment, Delivery & Correction Policy" },
};

/** Alt text for a route's share image. */
export const ogAlt = (route: string) => `${pages[route].title} | NoxeTech`;

const font = (file: string) => readFile(join(process.cwd(), "assets/og", file));

// Long headlines step down so every one fits in three lines.
const titleSize = (t: string) => (t.length <= 28 ? 104 : t.length <= 44 ? 88 : t.length <= 64 ? 74 : 64);

const INK = "#0c0d10";
const FIELD = "#ff6a1a";

/** The NoxeTech mark (same paths as components/logo.tsx), drawn for a dark ground. */
function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="g" x1="12" y1="6" x2="88" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA100" />
          <stop offset="100%" stopColor="#FF6B00" />
        </linearGradient>
      </defs>
      <g stroke="#a9aeb8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 56v16l28 16" strokeWidth="7" />
        <path d="M24 54v11l14 8" strokeWidth="6.5" />
        <path d="M88 52v20" strokeWidth="7" />
      </g>
      <g stroke="url(#g)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 42V28L50 6l32 18v8" strokeWidth="7" />
        <path d="M12 28l70 40-24 14" strokeWidth="7.5" />
      </g>
      <g fill="#FF7800" stroke={INK} strokeWidth="2.5">
        <circle cx="82" cy="34" r="5.5" />
        <circle cx="56" cy="83" r="5.5" />
      </g>
    </svg>
  );
}

export async function renderOg(route: string) {
  const p = pages[route];
  const [condensed, sans, mono] = await Promise.all([
    font("ibm-plex-sans-condensed-latin-700-normal.woff"),
    font("ibm-plex-sans-latin-400-normal.woff"),
    font("ibm-plex-mono-latin-500-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          backgroundImage:
            "linear-gradient(rgba(242,243,245,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(242,243,245,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          fontFamily: "Plex Sans",
          color: "#f2f3f5",
        }}
      >
        {/* Content column */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "64px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Mark size={52} />
            <div style={{ display: "flex", fontFamily: "Plex Condensed", fontSize: 38, letterSpacing: -0.5 }}>
              Noxe<span style={{ color: "#ff8a4c" }}>Tech</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 64,
              fontFamily: "Plex Mono",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: FIELD,
            }}
          >
            {p.eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              maxWidth: 860,
              fontFamily: "Plex Condensed",
              // A subtitle takes room, so its headline steps down one size.
              fontSize: titleSize(p.title) - (p.subtitle ? 16 : 0),
              lineHeight: 1,
              letterSpacing: -1.5,
            }}
          >
            {p.title}
          </div>
          {p.subtitle && (
            <div style={{ display: "flex", marginTop: 24, maxWidth: 820, fontSize: 28, color: "#a9aeb8" }}>
              {p.subtitle}
            </div>
          )}

          <div
            style={{
              display: "flex",
              marginTop: "auto",
              paddingTop: 32,
              alignItems: "center",
              gap: 16,
              fontFamily: "Plex Mono",
              fontSize: 20,
              color: "#a9aeb8",
            }}
          >
            <div style={{ display: "flex", width: 40, height: 4, background: FIELD }} />
            {`noxetech.com${route === "/" ? "" : route}`}
          </div>
        </div>

        {/* Signal-orange edge with the mark in ink: the site's field colour. */}
        <div
          style={{
            display: "flex",
            width: 200,
            height: "100%",
            background: FIELD,
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 64,
          }}
        >
          <svg width="96" height="96" viewBox="0 0 100 100" fill="none">
            <g stroke={INK} strokeLinecap="round" strokeLinejoin="round" strokeWidth="7">
              <path d="M12 56v16l28 16" />
              <path d="M24 54v11l14 8" />
              <path d="M88 52v20" />
              <path d="M12 42V28L50 6l32 18v8" />
              <path d="M12 28l70 40-24 14" />
            </g>
            <g fill={INK}>
              <circle cx="82" cy="34" r="5.5" />
              <circle cx="56" cy="83" r="5.5" />
            </g>
          </svg>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Plex Condensed", data: condensed, weight: 700, style: "normal" },
        { name: "Plex Sans", data: sans, weight: 400, style: "normal" },
        { name: "Plex Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
