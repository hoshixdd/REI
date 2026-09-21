# REI graphics and identity update

## Particle revision — 2026-09-21

The user rejected the solid illustrative sculptures. Keep the REI glass logo but use original particle graphics throughout the product. References are luminous flowing wave images, not assets to copy.

- Replaced solid illustrations with a shared 16,000-point shader: twelve form families including ribbons, galaxies, wave terrain, helixes, vortices, braided loops, fountains and constellations. Major components get distinct numeric variants: homepage 0–2, Journey 3–5, Academy lessons 10–18, Toolkit resources 20–25, separate destination/workspace/detail variants.
- Cursor proximity repels points in the screen plane. Press produces an additional dispersal burst; movement eases back. Touch pointer events retain normal scrolling. Reduced motion and global pause suppress interaction animation.
- Hero's solid nucleus is hidden and its particle repulsion is stronger. Glass brand mark stays separate. Added a locally generated particle SVG fallback.
- Fixed legacy selector specificity that shrank destination artwork into a fraction of its intended width. Preserved the improved layouts.
- Navigation uses a flowing dotted wake and softer camera arrival. Resource/lesson entry can share the particle illustration between surfaces; route mounting waits two frames before capture. Reduced-motion path remains immediate.
- Checked desktop shader rendering, visible press dispersal, unique Academy/Toolkit/Journey variant assignments, resource transition cleanup (zero leftover names), motion toggle, 390px mobile layout (no horizontal overflow), and console logs (no errors in inspected routes). JavaScript syntax/whitespace checks passed. Full automated regression was not rerun. No deployment in this pass.


## REI identity and sculptural graphics — 2026-09-21

- Rebranded header, footer, page titles, about/backup descriptions, directory, transition label, and draft illustration to REI. Existing storage keys and backup schema stay compatible.
- Added an original animated glass knot logo with a matching SVG fallback/favicon.
- Replaced phase wire diagrams with real Three.js sculptures: interwoven lens, optical ring stack, beveled proposal layers. Used across homepage pathways, Academy, Journey, Toolkit and destination/lesson headers; Research Studio entrance also has a sculpture.
- Shared offscreen WebGL renderer paints only visible illustrations at a capped 20 fps. Locally generated environment reflections; no external asset requests. Global pause, reduced-motion preference, hidden-tab checks, and pointer tilt supported. Hero keeps its existing independent interactive renderer.
- Toolkit is now a numbered editorial catalogue with purpose, output, editable format, exploration link, and download. Search/filter and empty states preserved.
- Resource links participate in the clicked-surface cinematic transition. Fixed graphic-container sizing, mobile composition, wordmark specificity, and an encoded footer arrow.
- Manual browser checks: desktop Toolkit/Journey/lesson screenshots; mobile Toolkit/lesson/check at 390px; Toolkit Evidence filter, search and empty states, resource navigation; Academy Creation filter; motion toggle; no console errors in inspected routes; inspected routes had no horizontal page overflow. Syntax and git whitespace checks passed. Full automated regression has NOT been rerun.
- Taste and Impeccable were requested but not found in installed skill folders; applied installed UI/UX Pro Max plus the user's Studio workflow. No claim those missing skills were used.
- New source: `dist/sculptures.js`, `dist/rei.css`, `dist/rei-mark.svg`. All geometry and reflection assets are original code; bundled Three.js license remains unchanged.
- Local preview http://127.0.0.1:4173/ . Vercel has not been updated by this pass.

# Local UI/UX Studio update — 2026-09-20

Unpublished working changes:
- Open observatory homepage with original Three.js optical geometry, responsive lighting, and instanced satellites.
- Editorial pathway chapters instead of interchangeable cards; indexed curriculum, continuous roadmap, resource lists, workshop agendas.
- Larger headings, clearer body text, slate/ice surfaces, quieter lesson and research editing layouts.
- Click-origin and directional cinematic transitions, async route continuity, reduced-motion handling.
- Mobile overflow corrected. Targeted browser visual checks and JavaScript syntax checks completed; full regression and deployment remain pending due to the previously reported approval-credit block.

References: https://github.com/mrdoob/three.js/ and https://github.com/pmndrs/react-three-fiber . New geometry is original; no example assets were copied and React Three Fiber was not installed.

---

# REI spatial studio release

## Visual changes
- Upgraded the leading homepage scene too: a rotating sculptural knot and wire contour inside the morphing particle field, with pointer response and phase-linked movement.
- Replaced all three phase illustrations with denser coordinated discovery, evidence, and proposal geometry. Updated Academy and Journey artwork through the shared component.
- Introduced navy surfaces, cyan/violet/coral phase colors, brighter text, softer pill-shaped controls, and coordinated panel borders.
- Increased functional labels, descriptions, lesson metadata, and navigation text. Removed inherited hue filters that distorted the palette.
- Reworked homepage framing, added a direct research-studio entry, and refined the document, toolkit, and readiness showcase colors/materials.
- Updated lesson, resource, roadmap, and academy surfaces to fit the new palette. Existing page transitions and focus-reading remain; this release does not implement new shared-object transitions between every card and destination.
- Preserved reduced-motion and global pause behavior for the new scene and SVG animations; adjusted mobile scene placement and card stacking.

## Working local research tools
- Research studio accessible through header navigation, homepage, directory, and search.
- IndexedDB project storage: create, rename, update question, and delete projects; five-project local cap.
- Paper library with manual metadata entry, DOI normalization, duplicate detection, editable records, named collection labels, reading status, personal notes, search, safe source links, and a 200-paper project cap.
- Literature map with user-verified directed reference records, selected-paper details, zoom/reset, pointer pan, keyboard pan, and an equivalent expandable paper list. Maximum 100 visible papers. Lines are not inferred; no live citation retrieval yet.
- Editable manual evidence notes, comparison table, detailed evidence cards, source locations, and CSV export with spreadsheet-formula protection.
- Project proposal editor with local autosave, word count, source-linked evidence insertion, Markdown export, and explicit copying of existing lesson drafts.
- Full project JSON export/validated restore, restoring as a separate project. Existing learning storage and exports stay separate and compatible.
- Explicit error/empty/limit states. Live discovery is labeled unavailable rather than simulated.

## Free cloud preparation
- Supabase SQL migration for owner-isolated project storage, revision counters, five-project limit, server-only cache, and atomic daily search request budgets.
- Prepared authenticated OpenAlex search function with input validation, caching, timeouts, and quota/service errors.
- FREE_SETUP.md explains account creation, secret placement, deployment, Google OAuth setup, tests, and remaining frontend work. Nothing deployed; no credentials added; no paid services enabled.

## Verification
- tests/research-qa.cjs: project creation, paper entry, evidence insertion into proposal, reload persistence, map zoom, and seven mobile routes.
- tests/research-edge.cjs: paper editing, reading-note persistence, citation edge creation, keyboard pan, node selection, JSON export/restore, and four mobile project views.
- tests/spatial-qa.cjs: 36 route/viewport checks, four lesson steps, saved writing, completion, downloads, and reduced motion.
- tests/spatial-edge.cjs: 36 lesson paths, completion guard, browser history, and five enlarged-text layouts.
- tests/continuity-qa.cjs: resume, search, keyboard controls, older backup compatibility, and mobile dialog behavior.
- Desktop homepage/map and mobile research layouts inspected. These checks ran in Edge, not all browsers. Cloud SQL/function files are prepared but have not been deployed or integration-tested.

## Remaining work
- Cloud frontend sign-in, guest import, synchronization and conflict resolution; live Discover screen and provider integration. Requires the user's free accounts and configuration.
- Multiple collection membership, collection management/tagging, automatic citation loading, map filters, optional 3D map view, richer DOI/year/open-access search, and full evidence-source editing in the proposal.
- More purposeful scene continuity between pages and a deeper consolidated stylesheet refactor; current legacy styling still exists.
- Cross-browser/accessibility/performance audits and user review of this visual direction before public launch. No claim of an award-winning or finished production state.
