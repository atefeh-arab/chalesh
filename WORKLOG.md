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

## Day 5
- Fixed the live site: GitHub Pages was publishing Git LFS *pointers* instead of the photos, so every image was a ~130-byte text file. Un-tracked the LFS patterns and committed the real bytes.
- Replaced Cloudflare's obfuscated `/cdn-cgi/l/email-protection#…` links with plain `mailto:` links and dropped the leftover script tag.
- Made the “Customer Story” play button real: it now opens a `<dialog>` with a self-hosted MP4 that autoplays (controls, Esc to close, focus returns to the button).
  - Clip: *Modern Apartment Buildings Sunrise* by Erik Furulund (CC BY 4.0, archive.org) — 853×480, 59 s, 5.3 MB, committed to `assets/video/`.
  - Inspected candidate clips frame-by-frame in a headless browser before picking; the two AI-generated “royalty free” clips were discarded as unusable.

## Next
- Add a GitHub Actions workflow so every push redeploys Pages.
- Run Lighthouse on the deployed URL and log the scores here.
- Self-hosted Persian web font (licensing still to be confirmed by the owner).
