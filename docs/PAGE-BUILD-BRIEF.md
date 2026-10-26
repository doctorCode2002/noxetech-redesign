# Page build brief

How every inner page of the NoxeTech redesign is built. The homepage (`site/src/app/page.tsx` and
`site/src/components/home/`) and the Start a Project page (`site/src/app/start-project/`,
`site/src/components/intake/`) are the reference implementations. Read them before writing anything.

## Ground rules

- **Exact copy.** All visible text comes verbatim from `content/original-content.md` (line ranges per page
  are in your task). Do not rewrite, shorten, merge or invent marketing copy. Keep the original's
  capitalisation and punctuation, including curly quotes and en/em dashes. The only text you may add is
  small UI microcopy that the design needs (an `aria-label`, a "Swipe" hint, a form's preview note);
  list every such string in your final report.
- **Original layout is reference only.** Screenshots of the live site are in
  `scrape/screenshots/<page>-desktop.png` and `-mobile.png`. Use them to understand structure and
  grouping, never to copy the look.
- **Keep the metadata.** Each `page.tsx` already exports `metadata` via `pageMeta(...)` with the original
  title and description. Keep it exactly. One `<h1>` per page, headings in order.
- **Stay in your lane.** Only create or edit files under your own routes in `site/src/app/` and your own
  folder in `site/src/components/<your-folder>/`. Do not edit shared files (`globals.css`, `layout.tsx`,
  `button.tsx`, `eyebrow.tsx`, `header.tsx`, `footer.tsx`, `lib/*`, `components/home/*`,
  `components/form/*`, `components/motion/*`). You may import from them. If you need a shared change,
  describe it in your report instead. Other agents are working in the same tree at the same time.
- **No new dependencies.** Use what is installed (GSAP + plugins, `@gsap/react`, Lenis via context,
  lucide-react, next/image). If something truly needs a package, say so in the report.
- **The dev server is already running** on http://localhost:3000. Do not start another, do not run
  `next build`, and never delete `.next`.

## Design system

- **Tokens, not colours.** Use the Tailwind colour names backed by theme tokens: `paper`, `sheet`, `ink`,
  `ink-2`, `ink-3`, `rule`, `rule-strong`, `field` (signal orange) / `on-field`, `ground` / `on-ground` /
  `on-ground-2` / `ground-rule` (the dark band), `redline-ink` (orange text that passes contrast),
  `redline-wash`. Everything must work in light and dark themes (`data-theme` on `<html>`). Raw hex only on
  surfaces that are the same in both themes (e.g. a mock app UI, like `inspections-app.tsx`).
- **Type.** IBM Plex Sans/Mono via `font-sans` / `font-mono`. Headings use `.display` (narrow, heavy) at the
  clamp sizes used on the homepage (e.g. section H2 `text-[clamp(2.4rem,4.6vw,4.25rem)]`). Giant numerals use
  `.mega`. Numbers, codes and labels use `.figures` (mono, tabular). Small caps labels are `<Eyebrow>`
  (it scrambles in on view automatically; `tone="field"` on orange, `tone="ground"` on the dark band).
- **Layout.** `.shell` for the page container. Sections are separated with `border-t border-rule` and use
  the homepage rhythm `py-20 sm:py-28`. Page heroes may use `.drafting-grid` (see `page-intro.tsx`,
  `start-project/page.tsx`). Keep pages responsive from 360px up, no horizontal page scroll.
- **4px grid.** Every spacing value (margin, padding, gap, inset, top/left…) must be a multiple of 4px:
  Tailwind steps 1, 2, 3, 4… (no `.5` steps), and arbitrary values only in multiples of 4px. Check with
  `python3 -I site/scripts/grid-audit.py site/src` (must report 0 for your files).
- **Buttons.** Only the shared `Button` (`components/button.tsx`): `href` makes a link with the page
  transition, otherwise it is a real `<button>`. Variants: `primary` (orange), `ink` (black, for use on
  orange), `solid` (theme-following), `secondary` (outlined), `text`, `text-field`; sizes `md`/`sm`;
  `external` for another site (new tab, no transition); `onClick` works on links too.
  Internal text links use `TransitionLink`. It prefetches on hover/touch/focus, not on sight (that
  parsed route data mid-scroll); don't add `prefetch` unless it's primary navigation.
- **In-page links.** Use plain `<a href="#id">` (or `Button`/`TransitionLink` with `/page#id`). One
  site-wide handler glides there and keeps the hash; give the target section a `scroll-mt-*` to clear the
  fixed header (it lands at the element's scroll-margin; 88px when it has none). No custom jump code.
- **Hero background.** Every page hero is `<section className="drafting-grid relative isolate
  overflow-hidden border-b border-rule">` with `<HeroBackdrop><YourArt /></HeroBackdrop>` as its first child
  (`components/hero-art/`). The art is one SVG (`viewBox="0 0 1440 720" preserveAspectRatio="xMaxYMid
  slice"`) that hints at the page's subject: thin `var(--rule-strong)` lines, `var(--field)` accents,
  `var(--paper)` fills, a scoped `<style>`, slow CSS keyframes on transform/opacity only, no text. Frame
  any panel on the right instead of hiding behind it. References: `services.tsx`, `sms-switch.tsx`.
- **Accordions / disclosures.** `SmoothDetails` (native `<details>` that animates both ways) or
  `Collapse open={…}` from `components/collapse.tsx`. Never mount/unmount content to show it: that can't
  animate closed.
- **Forms.** Use `components/form/fields.tsx`: `label`, `input`, `helper` class strings, `ErrorNote`,
  `Choice` (radio/checkbox cards), `Counter`, `PreviewNote`. The site has no backend: forms validate
  for real, simulate the submit in the browser, send nothing over the network, and show `PreviewNote` on
  the success state. Keep honeypot fields the original has. Reference: `components/intake/intake-wizard.tsx`.
- **Cursor.** Everything clickable gets the pointer (a global rule already does this for links/buttons/
  labels). A custom cursor label is opt-in and only where it explains an interaction:
  `data-cursor="View"` / `"Drag"` / `"Scroll"` on the zone, `data-cursor-tone="field"` when the zone is
  orange, `data-cursor="none"` to opt a nested area back out. Do not add it everywhere.
- **Selection on orange** is handled globally for `.bg-field`; keep text on orange surfaces `text-on-field`.

## Micro-interactions toolbox (reuse these)

- `Eyebrow` scramble-in, `Scramble` / `ScrambleValue` (`components/scramble.tsx`) for codes and changing
  figures.
- Tactile `Button`s, `HoldButton` (`components/intake/hold-button.tsx`) for deliberate actions.
- `KineticHeading` (`components/kinetic-heading.tsx`): per-character width ripple for a hero headline.
- Pixel-flood hover: `lib/pixel-mask.ts` + the `.cap-flood` CSS, as used by the capabilities list
  (`components/home/capabilities.tsx`, `cap-list.tsx`).
- `lib/sound.ts` `play("tap" | "toggle" | "success" | "error" | "sweep" | "tick")` only inside genuinely
  interactive demos (like the example dashboard), never on ordinary navigation.

## Creativity

Each page gets **one signature idea** that presents its content in a way only this site would: the
homepage has the sentence → data model → working app compile scene, the routing globe, the printer that
hands you a report. Find the equivalent for your page from what the content is actually about (a
capability, a process, a configurator, a policy). It should explain the content better, not decorate it.
Everything else stays calm and consistent with the homepage. In your report, describe the idea in two
sentences.

## Motion and performance rules

- Server components for content; animation lives in small client wrappers (`*-motion.tsx`), as on the
  homepage (`process.tsx` + `process-motion.tsx`).
- GSAP only through `useGSAP(() => …, { scope })` (from `@gsap/react`); event handlers that animate are
  wrapped in `contextSafe`. Use `gsap.matchMedia()` for breakpoint-specific scenes and return cleanups.
- Never create your own Lenis instance or `requestAnimationFrame` loop. Read Lenis from
  `useMotion()` if needed. To lock page scroll for a modal or menu, call `lockScroll(lenis)` /
  `unlockScroll(lenis)` from `components/motion/motion-provider` (never `lenis.stop()` directly: with reduced
  motion there is no Lenis and only the helper still locks). Put `data-lenis-prevent` on inner scrollers.
- Pins: add `anticipatePin: 1`. Never put `transform`, `filter` or `will-change` on an ancestor of a pinned
  or `position: fixed` element (it breaks fixed positioning); `will-change` only on the animated element.
  Use `gsap.ticker` for per-frame work.
- Heavy scroll scenes (pins, scrubs) build lazily: `whenIdle` on desktop, `whenNear(root, cb)` on phones
  (built just before the section scrolls into view; never inside the first touch, which made the first
  swipe stutter). See `lib/idle.ts` and `process-motion.tsx`, and call `settleScrollTriggers()`
  (`lib/scroll-settle.ts`) after creating ScrollTriggers.
- Per-scroll work: never read layout (`getBoundingClientRect`, `scrollHeight`, `elementFromPoint`) in a
  scroll or frame handler; cache measurements and refresh them from a `ResizeObserver`.
- No `backdrop-filter` on fixed or sticky elements other than the header capsule.
- Animate `transform` and `opacity` only; no layout properties per frame. No canvas or WebGL backgrounds.
- Every animation respects reduced motion: check `prefersReducedMotion()` (from `motion-provider`) and
  show the final state instead.
- Content must be fully readable without JavaScript and before animations run: never hide content with
  CSS that only JS removes, unless there is a no-JS fallback.

## Verify before reporting

1. `cd site && npx tsc --noEmit && npx eslint src` pass.
2. `python3 -I site/scripts/grid-audit.py site/src` reports 0.
3. Screenshots with Playwright (`uv run --with playwright python -I <script>`, Chromium at
   `/usr/bin/chromium`, args `["--use-angle=swiftshader"]`), saved in your scratchpad: each of your pages
   at 1440×900 and on `p.devices["Pixel 7"]`, in dark (the default) and light (add an init script
   `localStorage.setItem("theme", "light")` before load). Check for horizontal
   overflow (`document.documentElement.scrollWidth > innerWidth`). Look at the screenshots yourself and
   fix what is off. Do not use the Claude in Chrome browser tools (another session is using them).
4. Click through your interactive pieces in Playwright to make sure they work.

## Report

Files created/changed, the signature idea, every added microcopy string, shared changes you would like
(with reasons), anything from the original content you could not place, and the verification results.
