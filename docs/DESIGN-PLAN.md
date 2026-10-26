# NoxeTech redesign: design plan

Development-only document. Never copy any of this into site source, comments, or rendered output.

## Product truth (kept from the live site)
- NoxeTech designs and builds custom software from a client's plain-language requirements: web platforms, mobile apps, business systems (ERP/CRM), automation and APIs, telecom/messaging, and cloud.
- Flagship product: **SMS Switch**, a carrier-grade A2P/P2P SMS routing platform. Lite is $199/mo + $180 setup (10 TPS, 5M SMS/mo, 10 SMPP connections). Pro is $549/mo + $139 setup (25 TPS, 10M SMS/mo, 50 SMPP connections, Finance Pro). Custom is Lite plus add-ons.
- Promise: "You don't need technical specifications to get started."
- Contact: projects@noxetech.com. Do not invent clients, case studies, numbers or testimonials.

## Audience and scene
Founders, operations managers and telecom operators. They read during the workday: on laptops in bright offices, and on phones between meetings. NOC/telecom buyers often work in dim rooms on dark screens. The use scenes call for both themes. The site is **dark by default** (the brand's original home, and what telecom buyers live in) with a manual light toggle that is remembered.

## Mode
Persuade (marketing site). Start a Project, Contact and Portal are Operate surfaces: there the design stays restrained and precise.

## Direction history
- **v1 "Drawing set in redline"** (2026-10-26, rejected by the user as generic): drafting paper, hairlines, orange as markup only.
- **v2 "Live Signal"** (2026-10-26, current): chosen by the user from three bold options (Live Signal / System Boot / Kinetic Type).

## Direction: Live Signal

### THESIS
Show the technology working instead of describing it. NoxeTech routes signals (SMS traffic, data, requirements into systems), so the page *runs*: live routing in the hero, a sentence compiling into software, a least-cost routing console. Refuses the category default of a dark SaaS hero with a fake dashboard and icon cards.

### OWN-WORLD
- **Signal orange `#FF6A1A`** is a field, not an accent: it owns the hero, the closing block and page transitions, identical in both themes, always with near-black `#0C0D10` type on it (6.8:1).
- Light theme: `#F4F5F7` paper, white sheets, `#0C0D10` ink. Dark theme: `#0C0D10` ground, `#15171C` sheets, `#F2F3F5` ink. Dark "ground" blocks (compile, SMS) stay dark in both themes for rhythm: orange, black, paper.
- Giant IBM Plex Sans (variable, width axis 75–100) at 7–10vw; letters widen under the cursor. Plex Mono only for live data (counters, rates, schemas).
- Rounded inset fields (1.75rem radius) for orange blocks; pill buttons; hairline rules in ink.

### STORY
1. The visitor sees messages routing live and pushes them around with the cursor: this company builds systems that work.
2. One sentence becomes a data model, then a working app: you don't need a spec.
3. What we build, as giant type.
4. SMS Switch: a live routing console with real prices beside it.
5. Five stages (horizontal), starting points, then the orange close.

### FIRST VIEWPORT
Inset orange field filling the viewport under the header. Canvas network across it (fades out behind the copy). Top-left: "Simulated message traffic, routed by cost. Move your cursor to jam a route." Center: three-line giant headline. Bottom-left: one paragraph, black pill "Start a project", underlined "See what we build". Bottom-right: live counters (Delivered, Per second, Routed around you).

### SIGNATURE INTERACTION / MOTION GRAMMAR
- Hero network: Dijkstra routing on a seeded graph; the cursor congests nearby links; rerouted messages draw hollow. Canvas runs on the GSAP ticker, starts when the browser is idle, pauses off screen and in hidden tabs; static frame under reduced motion.
- Kinetic type: letter width follows the cursor (desktop only), one width wave on first view.
- Compile: pinned scrub, words lift into entity tables, tables collapse into the app's navigation, the app assembles. Built on first interaction to keep load light.
- Process: pinned horizontal track with a progress rule (desktop).
- Page transition: orange field wipes up with the destination name in giant type.

seed: none (unavailable)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
