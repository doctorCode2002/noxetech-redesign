# NoxeTech redesign

A redesign of [noxetech.com](https://noxetech.com), keeping the original site's copy.

- **Live:** https://noxetech-redesign.vercel.app
- **Before vs after** (speed, SEO, stack, design, every page): [`REDESIGN-COMPARISON.md`](REDESIGN-COMPARISON.md)
- `site/`: the website (Next.js 16, React 19, Tailwind CSS 4, GSAP, Lenis, IBM Plex)
- `content/original-content.md`: the original site's copy, verbatim; the source for every word on the site

```bash
cd site
npm install
npm run dev                              # http://localhost:3000
npx tsc --noEmit && npx eslint src       # types and lint
python3 scripts/grid-audit.py src        # spacing on the 4px grid (must report 0)
```

Forms are front end only until a backend is connected (see "Before launch" in the comparison).
