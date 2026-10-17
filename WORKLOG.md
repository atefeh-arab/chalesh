# Work log — Nestly landing page

## Day 1
- Opened the `.fig` and went through every frame: Desktop 1440, Tablet 1024, Mobile 440, Mobile/Open Menu, 404, Loading.
- Collected the design tokens: colours, Manrope type scale, spacing (64/32/24 horizontal, 100 vertical) and radii.
- Exported every image used on the page and every icon (SVG paths taken straight from the icon components).
- Set up the folder structure and the CSS tokens.

## Day 2
- Built the semantic HTML for all 14 blocks (header → footer).
- Desktop styles: hero, trust cards, intro stats, host + chips, gallery grid, planning modules, facilities, banner, testimonial, FAQ, checklist, pricing, map, footer.

## Day 3
- Tablet (≤1279 / ≤1080) and mobile (≤767 / ≤400) layouts, following the Tablet and Mobile frames.
- Mobile drawer menu, matching the "Open Menu" frame, plus the stay summary and support block.
- Checked for horizontal overflow at 320–1920px.

## Day 4
- Interactions: sticky nav variant switch, scroll-spy, FAQ accordion, gallery lightbox.
- Dark mode, reveal animations, count-up, loader.
- SEO and accessibility pass: meta/OG tags, JSON-LD, alt text, focus states, reduced motion.
- 404 page, README, deployment.

## Next
- Push to GitHub and enable Pages → add the live URL to the README.
- Run Lighthouse on the deployed URL and log the scores here.
