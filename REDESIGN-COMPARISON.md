# NoxeTech redesign: before vs after

|  | Before | After |
|---|---|---|
| Site | https://noxetech.com (live original) | **https://noxetech-redesign.vercel.app** |
| Source | n/a | https://github.com/doctorCode2002/noxetech-redesign (pushing `main` redeploys) |
| Measured | 2026-10-26 | 2026-10-26 (production build) |

Every word on the redesign is the original site's copy, verbatim from `content/original-content.md`.

Status key: ✅ done · 🟨 partly done · ⬜ not done yet

---

## 1. At a glance

| | Before (original) | After (redesign) |
|---|---|---|
| Mobile performance | 74–86 | **91–99** |
| Desktop performance | 95–97 | **99–100** |
| Mobile blocking time (TBT) | 430–1,130 ms | **22–88 ms** |
| Accessibility | 92–96 | **100** |
| SEO score | 91–100 | **100** on all 14 pages |
| SEO problems | Localhost canonicals on 9 pages, sitemap pointing to localhost, no share images | All fixed; share image for every page |
| Pages | 14, mostly static text | 14, each with its own interaction and hero art; dark + light themes |

## 2. Speed (Lighthouse)

**Method, same for both sides:** Lighthouse 12, headless Chromium on the same machine, one run per page, against the deployed sites (the live original and the Vercel production build). Mobile uses Lighthouse's simulated slow 4G and mid-tier CPU; desktop uses the desktop preset. Scores move a few points between runs.

### Before vs after (the four pages measured on the original)

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | Blocking time (TBT) | CLS | Page weight |
|---|---|---|---|---|---|---|---|---|---|
| Home | mobile | 75 → **99** | 96 → **100** | 100 → **100** | 91 → **100** | 2.1 s → **1.7 s** | 790 ms → **88 ms** | 0.00 → **0.00** | 239 → 397 KiB |
| Home | desktop | 96 → **100** | 96 → **100** | 100 → **100** | 91 → **100** | 0.6 s → **0.5 s** | 60 ms → **0 ms** | 0.00 → **0.00** | 278 → 531 KiB |
| Services | mobile | 75 → **95** | 94 → **100** | 100 → **100** | 100 → **100** | 2.0 s → **1.8 s** | 720 ms → **22 ms** | 0.00 → **0.00** | 211 → 340 KiB |
| Services | desktop | 97 → **100** | 94 → **100** | 100 → **100** | 100 → **100** | 0.5 s → **0.5 s** | 100 ms → **0 ms** | 0.00 → **0.00** | 235 → 433 KiB |
| SMS Switch | mobile | 74 → **94** | 92 → **100** | 100 → **100** | 100 → **100** | 1.7 s → **2.7 s** | 1,130 ms → **48 ms** | 0.00 → **0.00** | 176 → 328 KiB |
| SMS Switch | desktop | 95 → **100** | 92 → **100** | 100 → **100** | 100 → **100** | 0.5 s → **0.4 s** | 60 ms → **0 ms** | 0.00 → **0.00** | 250 → 450 KiB |
| Start a Project | mobile | 86 → **95** | 96 → **100** | 100 → **100** | 100 → **100** | 2.0 s → **2.6 s** | 430 ms → **29 ms** | 0.00 → **0.05** | 170 → 326 KiB |
| Start a Project | desktop | 97 → **100** | 96 → **100** | 100 → **100** | 100 → **100** | 0.4 s → **0.4 s** | 90 ms → **0 ms** | 0.00 → **0.00** | 228 → 447 KiB |

Read it as: on phones the performance score rose by 9–24 points and main-thread blocking time fell by 90–96%, because the original was held back by heavy JavaScript. Accessibility went to 100 everywhere. Largest Contentful Paint is mixed: faster on Home and Services, slower on SMS Switch (2.7 s) and Start a Project (2.6 s), which open with a large display headline in a web font where the original used plain system text. Those two sit just over Lighthouse's 2.5 s "good" line, the main thing left to tune. Page weight is higher (fonts, GSAP, the globe) but still about a third of a megabyte on phones.

### After: every page (production)

| Page | Mobile perf | A11y | Best pr. | SEO | LCP | TBT | Desktop perf | LCP | TBT |
|---|---|---|---|---|---|---|---|---|---|
| Home | 99 | 100 | 100 | 100 | 1.7 s | 88 ms | 100 | 0.5 s | 0 ms |
| Services | 95 | 100 | 100 | 100 | 1.8 s | 22 ms | 100 | 0.5 s | 0 ms |
| Solutions | 98 | 100 | 100 | 100 | 1.6 s | 83 ms | 99 | 0.5 s | 0 ms |
| SMS Switch | 94 | 100 | 100 | 100 | 2.7 s | 48 ms | 100 | 0.4 s | 0 ms |
| Custom request | 99 | 100 | 100 | 100 | 1.4 s | 49 ms | 100 | 0.3 s | 0 ms |
| Our Work | 95 | 100 | 100 | 100 | 2.5 s | 38 ms | 100 | 0.5 s | 0 ms |
| How We Work | 98 | 100 | 100 | 100 | 1.5 s | 53 ms | 99 | 0.6 s | 0 ms |
| Company | 95 | 100 | 100 | 100 | 2.7 s | 34 ms | 100 | 0.4 s | 0 ms |
| Contact | 95 | 100 | 100 | 100 | 2.5 s | 34 ms | 100 | 0.4 s | 0 ms |
| Start a Project | 95 | 100 | 100 | 100 | 2.6 s | 29 ms | 100 | 0.4 s | 0 ms |
| Client Portal | 91 | 100 | 100 | 100 | 1.5 s | 34 ms | 100 | 0.4 s | 0 ms |
| Privacy | 99 | 100 | 100 | 100 | 1.4 s | 58 ms | 100 | 0.4 s | 0 ms |
| Terms | 99 | 100 | 100 | 100 | 1.4 s | 39 ms | 100 | 0.5 s | 0 ms |
| Payment Policy | 96 | 100 | 100 | 100 | 2.4 s | 62 ms | 100 | 0.4 s | 0 ms |

### What makes it fast

- Every page is prerendered static HTML and served from Vercel's edge cache.
- Heavy work starts late: the WebGL globe shows a pre-rendered poster first and only goes live once the browser is idle (never on software-GL devices); scroll scenes build when the browser is idle on desktop, and just before they scroll into view on phones.
- Per-frame work is kept off the main thread: animations use transform and opacity; nothing reads layout inside scroll handlers; the custom cursor's hit test is throttled and skipped on pages without cursor zones; hero art pauses off screen.
- Links prefetch on hover, touch or focus (the header nav on sight), so moving between pages is near-instant without parsing data mid-scroll.
- Caching: hashed JS/CSS cached for a year; `/public` files for a week with background refresh; visited pages kept in the client router for 30 minutes; HTML revalidated per visit so a deploy is never stale.

## 3. SEO

Lighthouse SEO score: **before 91–100** (the homepage scored 91; the score also missed the localhost canonicals below), **after 100 on every page**, mobile and desktop.

| Item | Before | After | |
|---|---|---|---|
| Canonical URLs | ❌ **critical**: 9 of 14 pages point to `http://localhost:3000`; `/work` and `/portal` point to the homepage | Absolute `https://noxetech.com/<path>` on every page (pinned, so the preview never competes with the real domain) | ✅ |
| `robots.txt` sitemap | ❌ `http://localhost:3000/sitemap.xml` | `https://noxetech.com/sitemap.xml` | ✅ |
| Meta in `<head>` | ⚠ homepage title/description streamed into `<body>` (some crawlers miss them) | Static metadata in `<head>` on every page | ✅ |
| Titles | ⚠ brand duplicated: "… \| NoxeTech \| NoxeTech" | Original titles, brand once | ✅ |
| Meta descriptions | ⚠ `/portal` and `/custom-request` reuse the generic one | Unique on all 14 pages | ✅ |
| Share images (Open Graph / Twitter) | ❌ none (`/og-image.png` is a 404) | One per page (14), generated at build time: page name + real headline on the brand's dark grid; `summary_large_image` cards | ✅ |
| Sitemap `lastmod` | ⚠ always "now" | Real dates per page | ✅ |
| Headings | Mixed | One `<h1>` per page, no skipped levels | ✅ |
| Color contrast | ❌ muted text fails | WCAG AA in both themes | ✅ |
| Structured data | Organization JSON-LD | Organization JSON-LD | ⬜ add Service, Product (SMS Switch), FAQPage, BreadcrumbList |
| App icons | SVG favicon only | SVG favicon only | ⬜ apple-touch-icon + web manifest |
| `/work` case studies | Empty ("not currently listed") | Same original copy, presented as an archive (nothing invented) | ⬜ needs real case studies |

## 4. Tech stack

| Area | Before | After |
|---|---|---|
| Framework | Next.js 15.5, App Router | Next.js 16.4, App Router, Cache Components; every page prerendered static |
| UI | React 19.2 | React 19.3 |
| Styling | Tailwind 4, raw hex in class names | Tailwind 4 with semantic theme tokens (`paper`, `sheet`, `ink`, `rule`, `field`…) defined once per theme |
| Theme | Dark only | **Dark by default** + light; choice remembered and applied before first paint; circular wash between themes |
| Type | System fonts | IBM Plex Sans (variable, condensed width for display) + IBM Plex Mono for figures, self-hosted |
| Animation | CSS transitions | GSAP 3.15 (ScrollTrigger, DrawSVG, ScrambleText) through `useGSAP`; loader, hero art and accordions in pure CSS |
| Smooth scroll | Native | Lenis (lerp), driven first on GSAP's ticker, synced with ScrollTrigger; native touch on phones; off for reduced motion |
| Page transitions | Hard swaps | Orange sheet: the NoxeTech mark draws itself, the route and page title rise; the next page loads underneath |
| Forms | React state, honeypots | Shared accessible fields, real validation, original honeypots; **submit simulated until a backend is connected** |
| Hosting | LiteSpeed + Node | Vercel, static pages on the edge cache |

## 5. Design

| | Before | After (dark, default) | After (light) |
|---|---|---|---|
| Background | `#111215` | `#0C0D10` | `#F4F5F7` |
| Surface | `#17191E` | `#15171C` | `#FFFFFF` |
| Text / secondary / muted | `#F4F4F6` / `#C2C5D0` / `#8D93A3` (fails contrast) | `#F2F3F5` / `#A9AEB8` / `#8B919C` | `#0C0D10` / `#474B55` / `#646976` |
| Accent | `#D4622B` orange | Signal field `#FF6A1A` with near-black type (6.8:1); orange text `#FF8A4C` | same field; orange text `#C2410C` |
| Language | Engineering terminal: mono labels, spec cards, dark grid | **"Live Signal"**: signal-orange fields, giant condensed Plex, and the technology shown working (globe of routes, a sentence compiling into an app, a least-cost routing console) | |

Rules every page follows: exact original copy; theme tokens only (both themes); every spacing value on a **4px grid** (`site/scripts/grid-audit.py` reports 0); one shared `Button` (tactile press) and shared form fields; pointer cursor on everything clickable, a custom cursor only where it explains something; one signature interaction per page; a hero background that hints at the page's subject.

## 6. Pages

| Page | Before | After |
|---|---|---|
| [Home](https://noxetech-redesign.vercel.app/) | Static hero + spec card | Draggable 3D globe of routes that pulse; compile scene (a sentence → data model → working inspections app with sounds; its printer hands you the weekly report); racing-pixel capabilities; live SMS routing console; pinned horizontal process (phones too) |
| [Services](https://noxetech-redesign.vercel.app/services) | Long card list | Capability map that becomes a sticky three-tier index tracking the section in view; "Real Projects" lights the families a project combines |
| [Solutions](https://noxetech-redesign.vercel.app/solutions) | Cards | Problem Router: pick a friction point and it is wired through its 4-stage process into the capability areas it needs |
| [SMS Switch](https://noxetech-redesign.vercel.app/solutions/sms-switch) | Configurator form | Configurator drawn as a message route that re-prices live (checkout, coupons and demos disabled in the preview) |
| [Custom request](https://noxetech-redesign.vercel.app/solutions/sms-switch/custom-request) | Form | Form with a provisioning sheet that fills in as you type |
| [Our Work](https://noxetech-redesign.vercel.app/work) | Empty notice | Same notice as a catalogue cabinet whose archive drawer slides out empty |
| [How We Work](https://noxetech-redesign.vercel.app/how-we-work) | Text stages + FAQ | One project artifact redrawn after each of the 5 stages; iteration loop; smooth FAQ |
| [Company](https://noxetech-redesign.vercel.app/company) | Text sections | Transformation ledger: each starting state struck through, the engineered outcome written in, like a reviewed code change |
| [Contact](https://noxetech-redesign.vercel.app/contact) | Form | Form that files your message as a slip |
| [Start a Project](https://noxetech-redesign.vercel.app/start-project) | 7-step wizard | Same 7 steps, review with Edit, hold-to-submit with undo, perforated ticket confirmation |
| [Client Portal](https://noxetech-redesign.vercel.app/portal) | Magic-link form | Your email printed onto an access pass, posted through a slot |
| [Privacy](https://noxetech-redesign.vercel.app/privacy) · [Terms](https://noxetech-redesign.vercel.app/terms) · [Payment Policy](https://noxetech-redesign.vercel.app/legal/refund) | Plain text | Reading layout: contents rail with a per-clause reading meter, % read, phone contents, clean print |

Every inner page also has its own hero drawing (layers of a stack, carrier lanes, a drafting sheet, access rings…), and every page has a share image.

## 7. Motion and interaction

| | Before | After |
|---|---|---|
| Navigation | Sticky full-width bar | Floating capsule that folds to logo + Client Portal on scroll down; full-width on phones |
| Cursor | Arrow on buttons | Pointer on everything clickable; custom cursor (ring, "View", "Drag", "Scroll") only where it helps; mouse only |
| Micro-interactions | None | Labels decode in (scramble), live rates scramble, tactile 3D buttons, hold-to-confirm, ticket tear-off, racing-pixel fills, smooth accordions, Web Audio sounds in the demo app (mutable) |
| Scrolling | Native | Lenis glide; in-page links land just under the header from any page |
| Loader | None | ~1 s CSS mark + counter, first visit only |
| Other | n/a | Custom orange scrollbar, back-to-top with progress ring, readable selection on orange, print-ready pages |
| Reduced motion | Not handled | Lenis off, static globe, stacked scenes, crossfade transitions, static art |

## 8. Before launch

- **Connect the backend.** Every form validates for real but simulates its submit and says so on screen; SMS Switch checkout, coupons and live demos are disabled. Wire them to the original endpoints: `/api/contact`, `/api/project-inquiries`, `/api/pricing/calculate`, `/api/portal/login`, `/api/portal/custom-requests`.
- **Point noxetech.com at the Vercel project.** Share images then use the real domain automatically.
- Add structured data, app icons and real case studies (see the SEO table).

## Inspiration

[React Bits](https://reactbits.dev), [Componentry](https://componentry.dev), [Aceternity UI](https://ui.aceternity.com), [Magic UI](https://magicui.design), [Animate UI](https://animate-ui.com), [21st.dev](https://21st.dev), [Hover.dev](https://www.hover.dev), [dqnamo](https://www.dqnamo.com/) and its [Kitchen](https://www.dqnamo.com/kitchen) (receipt printer, tactile button, scramble text, hold-to-confirm, ticket; reimplemented, no code copied), [Devouring Details](https://devouringdetails.com), [animations.dev](https://animations.dev), [60fps.design](https://60fps.design), [Codrops](https://tympanus.net/codrops), [GSAP showcase](https://gsap.com/showcase), [Awwwards](https://www.awwwards.com), [Godly](https://godly.website).

## Changelog (2026-10-26)

1. Scraped the live site (14 pages, exact copy, Lighthouse baselines); new Next.js 16 project with both themes, IBM Plex, GSAP + Lenis, transitions and SEO fixes.
2. First direction rejected as generic; rebuilt the homepage as "Live Signal" (bold, signal orange, kinetic type).
3. Hero went from a canvas network (too slow) through CSS backgrounds to a COBE 3D globe with pulsing routes; capsule nav, floating theme + back-to-top, custom cursor, loader, 4px grid, interactive dashboard with sounds.
4. Scramble text, tactile buttons, Start a Project wizard with hold-to-submit and ticket; printer that hands you the report.
5. All inner pages built from one brief by parallel builders; Lenis/GSAP tuned from a best-practice review; anchors unified; custom scrollbar; repo on GitHub, deployed on Vercel.
6. Logo + title page transitions, hero art on every page, smooth accordions.
7. Performance pass from a production audit (first-swipe freeze, per-frame layout reads, prefetching, LCP, loader).
8. Dark by default, caching, share images for every page, accessibility fixes; docs merged into this file.
