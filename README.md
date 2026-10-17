# Nestly — Jakarta Apartments Landing Page

A pixel-faithful front-end build of the **"Nestly – Apartment Landing Page UI Kit"** Figma file: plain HTML + CSS + vanilla JS, with no build step and no dependencies.

## Demo
- Live: `https://<your-username>.github.io/nestly/` *(see "Deploy" below)*

## Project structure
```
.
├── index.html            # Landing page (13 sections, semantic HTML)
├── 404.html              # "Oops, 404!" page from the Figma file
├── assets/
│   ├── css/styles.css    # Design tokens + desktop / tablet / mobile + dark mode
│   ├── js/main.js        # Nav, mobile menu, scroll-spy, lightbox, FAQ, theme, reveal
│   ├── js/icons.js       # SVG paths exported 1:1 from the Figma icon set
│   └── img/              # Images exported from the .fig (hero, gallery, map…)
├── WORKLOG.md            # Daily work log
└── README.md
```

## Run locally
No installation needed:
```bash
# any static server works
npx serve .        # or
python3 -m http.server 5173
```
Then open `http://localhost:5173`.

## Sections (in Figma order)
| # | Section | Figma component |
|---|---------|-----------------|
| 01 | Header Nav (transparent → white on scroll, mobile drawer) | `Header Nav` · `Type=Transparent / White background / Mobile open` |
| 02 | Hero + social proof | `Hero section` |
| 03 | Why choose us — 4 trust cards | `Why choose us` |
| 04 | Intro — 100% / 4.8★ / 120+ | `Intro` |
| 05 | Meet the host + service chips | `Quick Call` |
| 06 | Gallery (9 photos, lightbox) | `Gallery` |
| 07 | Space planning | `After gallery / Before amenities` |
| 08 | Facilities & amenities + Special-offer banner | `Facilities`, `Banner` |
| 09 | Local planning (neighbourhood) | `After amenities / Before testimonial` |
| 10 | Testimonial | `Story` |
| 11 | FAQ (accordion) | `FAQ`, `Question` |
| 12 | Move-in checklist | `After FAQ / Before pricing` |
| 13 | Pricing + Jakarta map | `Pricing` |
| 14 | Footer | `Footer` |

## Design tokens (from Figma)
- **Font:** Manrope 400 / 500
- **Colours:** Ink `#1A1A1A`, Brand `#2D5BFF`, Brand-soft `#EAEEFF`, Soft bg `#F5F5F5`, Tag `#EAEAEA`, Muted `#707070 / #848484 / #999999`, Lines `#D6D6D6 / #D5CECE / #EAEAEA`
- **Layout:** 1440 → padding 64 · 1024 → 32 · 440 → 24; section padding-y 100; content max-width 1312
- **Radii:** pills/buttons 100, gallery 24, banner/pricing images 40

## Bonus features
- ✅ Real mobile menu (drawer, focus handling, Esc to close)
- ✅ Scroll-spy active link (Figma `Item menu / Type=Active`)
- ✅ Dark-mode toggle (persisted in `localStorage`, applied before first paint)
- ✅ Gallery lightbox (keyboard ← → Esc)
- ✅ Animated FAQ accordion (only one open at a time)
- ✅ Micro-animations: hover on cards, chips and buttons, reveal on scroll, count-up, hero zoom
- ✅ Respects `prefers-reduced-motion`
- ✅ SEO: meta/OG tags, JSON-LD `Apartment` schema, semantic landmarks, alt text, lazy images

## Deploy
**GitHub Pages:** push to `main` → Settings → Pages → *Deploy from branch* `main` / root.
**Netlify / Vercel:** import the repo; framework = *Other*; build command empty; output dir `.`.
