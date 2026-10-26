# NoxeTech Redesign: Before vs After

A living document. **Before** is the live site at https://noxetech.com, scraped and measured on 2026-10-26. **After** is the redesign, live as a preview at **https://noxetech-redesign.vercel.app** (source: https://github.com/doctorCode2002/noxetech-redesign; every push to `main` redeploys). Update the Changelog at the bottom with every change.

Status key: ⬜ not started · 🟨 in progress · ✅ done · ➖ intentionally dropped

---

## 1. Tech stack

| Area | Before (live) | After (redesign) | Status |
|---|---|---|---|
| Framework | Next.js 15.5.25, App Router | Next.js 16.4.3, App Router, Cache Components; every page prerendered static | ✅ |
| UI | React 19.2 | React 19.3 | ✅ |
| Styling | Tailwind v4.3.3, colors as raw hex in class names (`bg-[#111215]`) | Tailwind v4.3 with semantic tokens (`paper`, `sheet`, `ink`, `rule`, `redline`…) defined once per theme | ✅ |
| Theme | Dark only (`<html class="dark">`) | **Dark by default + Light**: two-state toggle, the visitor's choice is saved and applied before first paint (inline script), circular wash transition between themes | ✅ |
| Typography | System fonts (`--font-sans`, `--font-mono`) | **IBM Plex Sans** variable (width axis: condensed 82% for headlines, normal for body) + **IBM Plex Mono** for figures only, self-hosted via `next/font`, ~79 KiB total | ✅ |
| Animation | No library; CSS transitions plus IntersectionObserver | **GSAP 3.15** (ScrollTrigger, DrawSVG, ScrambleText, quickTo) via `@gsap/react` (`useGSAP` with scope, `contextSafe`, `gsap.matchMedia`); loader, hero backgrounds and accordions are pure CSS | ✅ |
| Page transitions | None (hard route swaps) | Orange sheet wipes up; the NoxeTech mark draws itself, the route path and the page's title rise in giant type; the next page loads during the animation and the sheet lifts once both are ready. Crossfade under reduced motion | ✅ |
| Smooth scroll | Native | **Lenis 1.3** with `lerp` damping, `autoRaf: false`, driven first on the GSAP ticker (prioritised, ScrollTrigger synced, `lagSmoothing(0)`); native touch scrolling on phones; off under `prefers-reduced-motion`; one scroll-lock helper for menus/modals that also works without Lenis; one site-wide `#anchor` handler | ✅ |
| Images | Almost none (inline SVG only) | Inline SVG illustrations (hero backgrounds, hands, ticket); the one raster image (globe poster WebP) via `next/image` with `fetchPriority="high"` and exact `sizes` | ✅ |
| Icons | lucide-react (~60 icons) | lucide-react (tree-shaken, per-icon imports) | ✅ |
| Forms | Hand-written React state, honeypot fields | Shared field primitives (`components/form/fields.tsx`), original honeypots kept, real validation with linked, focused error messages and red-outlined invalid fields; hold-to-submit with undo on the intake | ✅ |
| Backend routes | `/api/contact`, `/api/project-inquiries`, `/api/pricing/calculate`, `/api/portal/login`, `/api/portal/custom-requests` | **Not connected yet.** Every form validates for real but simulates its submit in the browser (no network request) and says so ("Preview build: this form is not connected yet"); checkout and coupons on SMS Switch are disabled. Wire to the same endpoints before launch | ⬜ |
| Hosting | LiteSpeed (Next running in Node behind it) | Vercel (preview at noxetech-redesign.vercel.app); every page prerendered and served from the CDN cache | ✅ |
| Analytics | None | TBD (privacy-friendly, if any) | ⬜ |

## 2. Design tokens

| Token | Before | After (light) | After (dark) |
|---|---|---|---|
| Background base | `#111215` | `#F4F5F7` paper | `#0C0D10` |
| Surface | `#17191E` | `#FFFFFF` sheet; dark "ground" blocks `#0C0D10` | `#15171C` |
| Elevated | `#1F2229` | (shadow on sheet) | (shadow on sheet) |
| Border default | `#262933` | `#D6D9DE` / strong `#B9BEC7` | `#2D3139` / strong `#3D424C` |
| Text primary | `#F4F4F6` | `#0C0D10` | `#F2F3F5` |
| Text secondary | `#C2C5D0` | `#474B55` | `#A9AEB8` |
| Text muted | `#8D93A3` ⚠ fails contrast in places | `#646976` (5.0:1) | `#8B919C` (6.1:1) |
| Accent | `#D4622B` (orange), hover `#E5733C` | Signal field `#FF6A1A` with `#0C0D10` type (6.8:1); orange text `#C2410C` | same field; orange text `#FF8A4C` |
| Success / Error | `#10B981` / `#EF4444` | `#166534` on green wash / `#B91C1C` | `#4ADE80`-tinted / `#F87171` |
| Font | System stack | IBM Plex Sans (condensed for display) / Plex Mono for figures | same |
| Visual language | "Engineering terminal": mono labels (`01 // INPUT`), spec-sheet cards, dark grid | **v2 "Live Signal"** (v1 "drawing set" was rejected as too generic): signal-orange fields with near-black type, giant kinetic IBM Plex, and the tech shown working (live routing canvas, a sentence compiling into an app, a least-cost routing console). Full plan: `docs/DESIGN-PLAN.md` | |

## 3. Performance and SEO (Lighthouse 12, local Chromium)

Before = live site, 2026-10-26. Mobile runs use simulated slow 4G and a mid-tier CPU.

| Page / device | Perf | A11y | Best Pr. | SEO | FCP | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|---|
| home-desktop | 96 | 96 | 100 | 91 | 0.6 s | 0.6 s | 60 ms | 0 | 278 KiB |
| home-mobile | 75 | 96 | 100 | 91 | 2.1 s | 2.1 s | 790 ms | 0 | 239 KiB |
| services-desktop | 97 | 94 | 100 | 100 | 0.4 s | 0.5 s | 100 ms | 0 | 235 KiB |
| services-mobile | 75 | 94 | 100 | 100 | 1.8 s | 2.0 s | 720 ms | 0 | 211 KiB |
| solutions__sms-switch-desktop | 95 | 92 | 100 | 100 | 0.4 s | 0.5 s | 60 ms | 0 | 250 KiB |
| solutions__sms-switch-mobile | 74 | 92 | 100 | 100 | 1.6 s | 1.7 s | 1,130 ms | 0 | 176 KiB |
| start-project-desktop | 97 | 96 | 100 | 100 | 0.4 s | 0.4 s | 90 ms | 0 | 228 KiB |
| start-project-mobile | 86 | 96 | 100 | 100 | 1.8 s | 2.0 s | 430 ms | 0 | 170 KiB |

Takeaways: desktop is already fast, but **mobile Perf is 74–86** because of JS blocking time (TBT 430–1,130 ms). The SEO score of 100 is misleading: Lighthouse doesn't flag the `localhost` canonicals below. Raw reports are in `comparison/before/lighthouse/`.

**After** (fill in once pages are built):

| Page / device | Perf | A11y | Best Pr. | SEO | FCP | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|---|
| home-desktop (v6: globe + exact copy) | 99 | 100 | 100 | 100 | 0.5 s | 0.7 s | 0 ms | 0 | 384 KiB |
| home-mobile (v6, 3 runs) | 75–84 | 100 | 100 | 100 | 1.5–1.6 s | 3.3–3.6 s | 260–450 ms | 0 | 369 KiB |
| home-desktop (v5: oscilloscope hero, pixel fill) | 100 | 100 | 100 | 100 | 0.3 s | 0.6 s | 0 ms | 0 | 349 KiB |
| home-mobile (v5, 3 runs) | 73–92 | 100 | 100 | 100 | 1.3–1.7 s | 2.5–3.2 s | 250–710 ms | 0 | 335 KiB |
| home-desktop (v4: broadcast hero, custom cursor) | 99 | 100 | 100 | 100 | 0.4 s | 0.5 s | 80 ms | 0 | 332 KiB |
| home-mobile (v4, 3 runs) | 77–84 | 100 | 100 | 100 | 1.3–1.8 s | 3.1 s | 330–530 ms | 0 | 321 KiB |
| home-desktop (v3: CSS hero, capsule nav, loader) | 99 | 100 | 100 | 100 | 0.5 s | 0.6 s | 0 ms | 0 | 331 KiB |
| home-mobile (v3, 3 runs) | 83–98 | 100 | 100 | 100 | 1.1–1.6 s | 2.3–3.1 s | 90–360 ms | 0 | 319 KiB |
| home-desktop (v2, after review fixes) | 100 | 100 | 100 | 100 | 0.4 s | 0.7 s | 0 ms | 0 | 329 KiB |
| home-mobile (v2 after fixes, 3 runs) | 77–83 | 100 | 100 | 100 | 1.3–1.6 s | 3.1 s | 390–590 ms | 0 | 315 KiB |
| home-mobile (v1, for reference) | 82–87 | 100 | 100 | 100 | 1.2 s | 2.1–3.1 s | 280–700 ms | 0 | 306 KiB |

Localhost runs, so treat mobile as approximate. Raw reports: `comparison/after/lighthouse-fixed/`.

What it took to keep v2 fast: positions for the scroll scene measured in one pass (layout work 4.8 s → 1.9 s), canvas starts when the browser is idle, letter-width effect desktop-only, scroll scenes built on first scroll, static markup moved to server components.

**Targets for After:** Perf ≥ 95 mobile, A11y 100, Best Practices 100, SEO 100, LCP < 2.0 s mobile, TBT < 150 ms, CLS < 0.05, under 200 KiB JS on first load.

### SEO checklist

| Item | Before | After | Status |
|---|---|---|---|
| `robots.txt` sitemap URL | ❌ `http://localhost:3000/sitemap.xml` | `https://noxetech.com/sitemap.xml` | ✅ |
| Homepage meta in `<head>` | ⚠ title/description/OG tags are streamed into `<body>` (Next.js "streaming metadata"; Googlebot reads it, but Lighthouse and other crawlers report "no meta description") | Static metadata, rendered in `<head>` | ✅ |
| Meta description per page | ✅ inner pages · ❌ `/portal` and `/solutions/sms-switch/custom-request` reuse the generic one | Unique for every page (`pageMeta` on all 14) | ✅ |
| Titles | ⚠ duplicated brand: "… \| NoxeTech \| NoxeTech" | `Page \| NoxeTech`, brand once | ✅ |
| Open Graph / Twitter images | ❌ none (`/og-image.png` returns 404) | Per-page OG images (`opengraph-image.tsx`) | ⬜ |
| Favicons / app icons | ⚠ SVG favicon only, no apple-touch-icon or manifest | Full icon set + web manifest | ⬜ |
| Structured data | Organization + WebSite JSON-LD | + Service, Product/Offer (SMS Switch), FAQPage, BreadcrumbList | ⬜ |
| Canonical URLs | ❌ **critical**: 9 of 14 pages have `canonical` = `http://localhost:3000` (company, contact, how-we-work, privacy, terms, refund, start-project, custom-request, and services → `localhost:3000/services`); `/work` and `/portal` point to the homepage | Correct absolute `https://noxetech.com/<path>` on every page via `metadataBase` | ✅ |
| Sitemap `lastmod` | ⚠ regenerated on every request (always "now") | Real content dates (set per page in `sitemap.ts`) | ✅ |
| Case studies (`/work`) | ❌ empty page ("Public Case Studies Are Not Currently Listed") | Same original copy, presented as an archive (nothing invented); real case studies still needed | 🟨 |
| Color contrast | ❌ fails on muted text | WCAG AA in both themes (all text tokens checked) | ✅ |
| `llms.txt` | ❌ none | Add | ⬜ |

## 4. Pages

Before screenshots are in `scrape/screenshots/` (kept local, not in the public repo). After: the live preview links. All copy is verbatim from `content/original-content.md`; every page has one signature interaction and a hero background that hints at its subject (`site/src/components/hero-art/`).

| Page | Before | After | Status | Notes |
|---|---|---|---|---|
| Home `/` | [desktop](scrape/screenshots/home-desktop.png) · [mobile](scrape/screenshots/home-mobile.png) | Live: [/](https://noxetech-redesign.vercel.app/) | ✅ | Globe hero, compile scene (sentence → data model → working app with sounds and a printer that hands you the report), racing-pixel capabilities, SMS routing console, pinned horizontal process (phones too), orange close |
| Services `/services` | [desktop](scrape/screenshots/services-desktop.png) · [mobile](scrape/screenshots/services-mobile.png) | [/services](https://noxetech-redesign.vercel.app/services) | ✅ | CAPABILITY_MATRIX.MAP becomes a sticky three-tier index that tracks the section in view; "Real Projects" lights the families a project combines. Hero art: isometric three-tier stack |
| Solutions `/solutions` | [desktop](scrape/screenshots/solutions-desktop.png) · [mobile](scrape/screenshots/solutions-mobile.png) | [/solutions](https://noxetech-redesign.vercel.app/solutions) | ✅ | Problem Router: pick a friction point, it is wired through its 4-stage process into the capability areas it needs; before/after scenario sections; matrix. Hero art: tangled lines straightening into one system |
| SMS Switch `/solutions/sms-switch` | [desktop](scrape/screenshots/solutions__sms-switch-desktop.png) · [mobile](scrape/screenshots/solutions__sms-switch-mobile.png) | [/solutions/sms-switch](https://noxetech-redesign.vercel.app/solutions/sms-switch) | ✅ | Configurator drawn as a message route: each change pulses down the line into a live re-pricing summary with delivery-receipt stamps; checkout/coupons/demos disabled in the preview. Hero art: switch fanning traffic to carriers |
| SMS custom request | [desktop](scrape/screenshots/solutions__sms-switch__custom-request-desktop.png) · [mobile](scrape/screenshots/solutions__sms-switch__custom-request-mobile.png) | [/…/custom-request](https://noxetech-redesign.vercel.app/solutions/sms-switch/custom-request) | ✅ | Form with a provisioning sheet that fills in as you type; simulated submit. Hero art: throughput dial being set |
| Work `/work` | [desktop](scrape/screenshots/work-desktop.png) · [mobile](scrape/screenshots/work-mobile.png) | [/work](https://noxetech-redesign.vercel.app/work) | ✅ | Original copy only (no invented case studies): a catalogue cabinet whose archive drawer slides out empty. Hero art: file tabs with one slot waiting |
| How We Work `/how-we-work` | [desktop](scrape/screenshots/how-we-work-desktop.png) · [mobile](scrape/screenshots/how-we-work-mobile.png) | [/how-we-work](https://noxetech-redesign.vercel.app/how-we-work) | ✅ | One project artifact redrawn after each of the 5 stages (sticky on desktop, inline on phones); iteration rail with a loop back; smooth FAQ. Hero art: five-bar schedule with a sweeping marker |
| Company `/company` | [desktop](scrape/screenshots/company-desktop.png) · [mobile](scrape/screenshots/company-mobile.png) | [/company](https://noxetech-redesign.vercel.app/company) | ✅ | Transformation ledger: each starting state struck through in redline, the engineered outcome written in, like a reviewed code change. Hero art: modules fitted into a requirement outline |
| Contact `/contact` | [desktop](scrape/screenshots/contact-desktop.png) · [mobile](scrape/screenshots/contact-mobile.png) | [/contact](https://noxetech-redesign.vercel.app/contact) | ✅ | Form files the sent message as a slip (simulated submit). Hero art: messages routed into the two inboxes |
| Start a Project `/start-project` | [desktop](scrape/screenshots/start-project-desktop.png) · [mobile](scrape/screenshots/start-project-mobile.png) | [/start-project](https://noxetech-redesign.vercel.app/start-project) | ✅ | Exact original 7-step intake, review with Edit, hold-to-submit with 5 s undo, perforated-ticket confirmation (simulated submit). Hero art: drafting a blank sheet |
| Portal `/portal` | [desktop](scrape/screenshots/portal-desktop.png) · [mobile](scrape/screenshots/portal-mobile.png) | [/portal](https://noxetech-redesign.vercel.app/portal) | ✅ | Magic-link sign-in that prints your email onto an access pass and posts it through a slot (simulated; no authentication). Hero art: access rings around the pass |
| Privacy / Terms / Payment Policy | [privacy](scrape/screenshots/privacy-desktop.png) · [terms](scrape/screenshots/terms-desktop.png) · [refund](scrape/screenshots/legal__refund-desktop.png) | [privacy](https://noxetech-redesign.vercel.app/privacy) · [terms](https://noxetech-redesign.vercel.app/terms) · [refund](https://noxetech-redesign.vercel.app/legal/refund) | ✅ | One reading layout: contents rail with a per-clause reading meter and % read, phone contents accordion, prints as a clean black-on-white document. Hero art: ruled clause sheet with a moving reading line |

## 5. Motion plan

| Interaction | Before | After | Status |
|---|---|---|---|
| Hero | Static text + static "architecture.spec" card | 3D globe (COBE v2, MIT, ~13 KB, WebGL): ink sphere with orange continents; routes pulse in turn: each brightens from ember to orange to near-white as its connection lands, and both hubs swell and glow; drag to spin, auto-rotate, paused off screen, 30 fps cap on phones. A pre-rendered WebP poster (93 KB, via next/image) shows instantly; the live WebGL globe fades in over it when the browser is idle, only on devices with a GPU (software-WebGL devices keep the poster). Replaced, in order: canvas network, signal lanes, broadcast rings, oscilloscope; giant headline whose letters widen under the cursor; three real facts instead of simulated counters | ✅ |
| Section reveals | Minor CSS fades | No generic fade-ups. Pinned compile scene (sentence → data model → app) and pinned horizontal process track | ✅ |
| Route change | Instant swap | Orange sheet with the drawing logo mark, route path and page title (see stack table) | ✅ |
| Scrolling | Native | Lenis smooth scroll | ✅ |
| Hover / press | Color change | Capability rows fill orange as "racing pixels" (a dithered pixel mask stepping across in 36 steps over 0.9 s, first step immediate) and the name opens up; routing console rows flash when a route switches carrier | ✅ |
| Theme switch | n/a | Dark by default; light/dark toggle (choice remembered), floating button bottom-right, circular View Transitions wash | ✅ |
| Navigation | Sticky full-width bar | Floating capsule that shrinks to logo + Log in on scroll down, expands on scroll up/hover/focus; back-to-top button with scroll-progress ring after 100vh | ✅ |
| Cursor | Default (buttons showed the arrow) | Pointer on everything clickable; custom cursor where it adds meaning: ring in the hero, "View" on service rows (now links), "Scroll" on the pinned scenes; mouse devices only | ✅ |
| Text selection | Browser default | Orange highlight on light/dark grounds; ink highlight with orange text on orange fields (6.8:1) | ✅ |
| Spacing system | Ad-hoc | 4px grid: every margin/padding/gap/inset is a multiple of 4px (audited by script, 0 violations) | ✅ |
| Example dashboard | n/a | Fully interactive inspections app (views, checklists that resolve issues live) with synthesized Web Audio sounds and a mute toggle; the weekly report prints from a desk printer as an A-size page lying sideways, and clicking it lifts it upright into a pair of illustrated hands | ✅ |
| Micro-interactions | None | Scramble-decode on section labels and live rates; tactile 3D buttons (press onto their edge); hold-to-confirm; ticket tear-off (from dqnamo Kitchen) | ✅ |
| Loader | None | CSS-only first-visit loader (mark draws, counter to 100, panel wipes up), once per session, ~1 s | ✅ |
| Hero backgrounds | Plain dark grid | Every inner page has its own SVG line drawing behind the hero that hints at the subject (see Pages); framed around the hero's panel, faded away from the headline, transform/opacity animation only, paused off screen, hidden in print | ✅ |
| Accordions | Native, instant | FAQ, legal contents and the Problem Router open and close smoothly (`Collapse`: `grid-template-rows` 0fr→1fr + fade, no JS measuring; `SmoothDetails` keeps native `<details>` semantics) | ✅ |
| In-page links | Native jumps | One site-wide handler: every `#section` link (same page or from another page) glides to the section's own `scroll-margin` and keeps the hash in the URL | ✅ |
| Reduced motion | Not handled | Lenis off, static globe poster, compile scene shown as three stacked stages, transitions become a 150 ms crossfade, hero art and accordions static | ✅ |

## 6. Inspiration and component sources

Pick **one** motion source (GSAP) and adapt components to it, so easing and timing stay consistent across the site.

| Source | What it is | Notes for us |
|---|---|---|
| [React Bits](https://reactbits.dev) | Animated React components: text animations, backgrounds, micro-interactions; JS/TS × CSS/Tailwind variants, shadcn CLI | Mix of GSAP, Motion and WebGL; prefer the GSAP ones, port the rest |
| [Componentry](https://componentry.dev) | 54 polished animated components (magnetic dock, split-flap display, particle typography, aurora flow), shadcn CLI / MCP | Split-flap display fits the telecom/SMS theme |
| [Aceternity UI](https://ui.aceternity.com) | Dramatic effects: aurora, spotlight, 3D cards, bento grids | Built on Motion, so port effects to GSAP |
| [Magic UI](https://magicui.design) | 150+ polished marketing components | Built on Motion |
| [Animate UI](https://animate-ui.com) | Animated shadcn-style primitives | |
| [21st.dev](https://21st.dev) | Directory of community shadcn components | Good for browsing many libraries in one place |
| [Hover.dev](https://www.hover.dev) | Animated Tailwind components | |
| [JustifiedPixel / dqnamo](https://www.dqnamo.com/) | Design-engineering studio site with a "kitchen" of interaction experiments (receipt printer, playing cards, dynamic button) | Its receipt printer (stepped paper feed, torn edge, status line) inspired the dashboard's printed weekly report; reimplemented in GSAP (its code has no stated license). Also a candidate for the SMS Switch quote |
| [dqnamo Kitchen](https://www.dqnamo.com/kitchen) | 15 interaction studies: tactile button, scramble text, hold-to-confirm, magnetic drop zone, ticket, stamp, logo trace loader, iridescent foil, animated signature, dynamic button, scroll fade list | Shortlist mapped to NoxeTech placements in the chat (2026-10-26) |
| [Devouring Details](https://devouringdetails.com) (Rauno Freiberg, Vercel) | Interactive interaction-design manual: principles, prototypes, React components | Reference for robustness and timing of small interactions |
| [animations.dev](https://animations.dev) (Emil Kowalski) | Animation course and a motion vocabulary (stagger, crossfade, layout animation) | Restraint rules: no animation on keyboard-triggered actions |
| [60fps.design](https://60fps.design) | Curated library of UI animation from real apps, filterable by context | Pattern lookup |
| [Codrops roundups](https://tympanus.net/codrops/category/articles/ui-interactions-animations-roundups/) | UI Interactions & Animations roundups, now "Motion Highlights" | Monthly ideas |
| [GSAP showcase](https://gsap.com/showcase) / [Codrops](https://tympanus.net/codrops) | Real-world GSAP sites and tutorials | Page-transition and scroll ideas |
| [Awwwards](https://www.awwwards.com), [Godly](https://godly.website), [SiteInspire](https://www.siteinspire.com), [Land-book](https://land-book.com), [Minimal Gallery](https://minimal.gallery) | Site galleries | Agency / dev-studio references |

## 7. Skills installed for this project

These are in `.claude/skills/`; versions are in `.claude/skills/SOURCES.txt`. The official GSAP skills (`gsap-core`, `gsap-scrolltrigger`, `gsap-react`, `gsap-plugins`, …) and the `claude-seo` suite were already installed globally.

| Skill | From | Use |
|---|---|---|
| `frontend-design` | anthropics/skills | Distinctive visual direction, avoiding generic "AI look" |
| `impeccable` | pbakaus/impeccable | Design critique/audit/polish commands, references for type, color, motion, responsive |
| `web-design-guidelines` | vercel-labs/agent-skills | Audit UI code against Vercel's Web Interface Guidelines (fetches rules from GitHub when run) |
| `gsap-web` | iart-ai/web-animation-skills | GSAP + ScrollTrigger + **Lenis sync** recipes |
| `page-transition-animation` | iart-ai | Route transitions in Next.js |
| `accessible-animation` | iart-ai | `prefers-reduced-motion` patterns |
| `60fps-animation` | iart-ai | Avoiding jank and layout thrash |
| `micro-interaction` | iart-ai | Hover/press/toggle effects |

## Changelog

| Date | Change |
|---|---|
| 2026-10-26 | Scraped live site (14 pages), captured Before screenshots and Lighthouse baselines, created this document, installed design/animation skills |
| 2026-10-26 | New Next.js 16 project in `site/`: tokens for both themes, IBM Plex, Lenis + GSAP, page transitions, header/footer/mobile menu, SEO files (robots, sitemap, canonicals, JSON-LD), homepage built; other routes are placeholders |
| 2026-10-26 | v1 direction rejected as generic; rebuilt the homepage as v2 "Live Signal" (bold option chosen by the user), then performance pass to bring mobile back above the live site |
| 2026-10-26 | Browser review (Chrome desktop + iPhone 13 emulation) found 24 flaws; all fixed: sideways overflow (process track, SMS table, footer wordmark) that made phones zoom out, hero height/wobble/mobile wrapping, compile scene alignment/connectors/pacing, capability hover jumps, SMS layout, process alignment + mobile swipe, dark-mode rhythm (inset panels), spacing, footer duplicate, clearer theme toggle |
| 2026-10-26 | v3: replaced the canvas hero (too heavy) with CSS signal lanes, faster pointer-driven services hover, capsule nav that shrinks on scroll, light/dark-only floating theme button + back-to-top, CSS loader; mobile Lighthouse 83–98 |
| 2026-10-26 | v4: wider nav spacing, pointer cursor on all clickables, custom cursor (hero ring, View, Scroll), readable selection on orange, new "broadcast" hero background, phone theme switch moved into the menu until the hero is passed |
| 2026-10-26 | v5: hero line-height 1.06 (selection no longer overlaps), theme button holds the bottom corner with back-to-top stacking above it, Log in moved into the mobile menu, racing-pixels fill on service rows, oscilloscope hero background |
| 2026-10-26 | v6: 3D globe hero (COBE), 4px spacing grid enforced, interactive dashboard with sounds; exact original copy being extracted by a scraping agent |
| 2026-10-26 | Exact original copy applied to the homepage, nav, footer and every page's title/description/H1/intro (scraped verbatim into `content/original-content.md`); section order now matches the original (incl. restored "What you bring / What we engineer" and "Why NoxeTech"); globe poster-first loading |
| 2026-10-26 | Globe routes animate as travelling signals; custom cursor re-syncs on scroll (fixes the missing cursor over the dashboard after scrolling with a still mouse); services fill starts instantly and runs 0.9 s; globe poster loads eagerly (it is the desktop LCP) |
| 2026-10-26 | Globe connections pulse and change color (ember → orange → near-white, hubs glow); dashboard report prints as a receipt (inspired by dqnamo.com's receipt printer); dqnamo added to inspiration list |
| 2026-10-26 | Printer limited to a desk-sized width with the NoxeTech mark on the receipt; inspiration list extended (dqnamo Kitchen, Devouring Details, animations.dev, 60fps.design, Codrops) |
| 2026-10-26 | Scramble text (labels + live rates), tactile buttons, and the Start a Project wizard rebuilt with exact original content, hold-to-submit with undo and a ticket confirmation (simulated submit until a backend is connected) |
| 2026-10-26 | Globe enlarged to fill the hero's right half (badges became chips so they read over it); logo centred in the nav capsule (12px inset all round); nav button edge no longer clipped; printer reworked into a desk document printer: an A-size report page feeds out sideways, and clicking it lifts it upright into illustrated hands (Esc / click outside puts it back) |
| 2026-10-26 | Hero badges removed; globe "leftover" lines fixed (the poster under the live globe now fades out, and routes/hubs fade into the sphere before reaching its rim; poster re-rendered to match); one shared `Button` for links and actions (nav, menu, wizard, hold-to-submit, text CTAs); full-width capsule nav on phones; Process section now pins and scrolls horizontally on phones too, and scroll scenes are measured in page order (fixes the track finishing early on mobile) |
| 2026-10-26 | Every inner page built by six parallel builders from one brief (`docs/PAGE-BUILD-BRIEF.md`): Services, Solutions, SMS Switch + configurator, Custom Request, Our Work, How We Work, Company, Contact, Portal, Privacy, Terms, Payment Policy; shared form fields; Lenis/GSAP setup tuned from a best-practice review (lerp, prioritized ticker, no Next scroll during transitions, triggers refreshed in page order); custom orange scrollbar; repo public on GitHub, deployed on Vercel |
| 2026-10-26 | Page transitions show the drawing logo, route and page title; hero background art on every inner page; smooth accordions; chip dot stays visible on orange hover |
| 2026-10-26 | Performance pass from a production audit: phone scroll scenes build just before they scroll into view (fixes a ~300 ms freeze on the first swipe); cursor hit tests throttled and skipped on pages without cursor zones; back-to-top ring no longer forces a layout per frame; links prefetch on hover/touch/focus (header nav still on sight); globe poster high priority with exact sizes, globe capped at 1.5× resolution; loader ~1.75 s → ~1 s; no backdrop blur on floating buttons |
| 2026-10-26 | Dark theme is the default; caching: 1-week browser cache with background refresh for `/public` files, 30-minute client router cache for visited pages (HTML stays CDN-cached and revalidated per visit; hashed bundles cached a year); basic security headers |
