# NoxeTech redesign

A redesign of [noxetech.com](https://noxetech.com), keeping the original site's copy.

**Live preview:** https://noxetech-redesign.vercel.app (every push to `main` redeploys on Vercel)

- `site/`: the website (Next.js 16, React 19, Tailwind CSS 4, GSAP + ScrollTrigger, Lenis, IBM Plex)
- `REDESIGN-COMPARISON.md`: before/after comparison, Lighthouse results and changelog
- `docs/DESIGN-PLAN.md`: design direction; `docs/PAGE-BUILD-BRIEF.md`: the rules every page is built to
  (exact copy, tokens, 4px grid, shared components, motion and performance rules)
- `content/original-content.md`: the original site's content, the source for all copy

## Run locally

```bash
cd site
npm install
npm run dev                              # http://localhost:3000
npx tsc --noEmit && npx eslint src       # types and lint
python3 scripts/grid-audit.py src        # every spacing value on the 4px grid (must report 0)
```

## Not connected yet

There is no backend. Every form (Start a Project, Contact, SMS Switch custom request, Client Portal
sign-in) validates for real but simulates its submit in the browser, sends nothing, and says so on screen.
SMS Switch checkout, coupons and live demos are disabled. Connect them to the original API endpoints
(listed in `REDESIGN-COMPARISON.md`) before launch.
