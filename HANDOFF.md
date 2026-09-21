# REI — continuation handoff

## Motion and particle tuning - 2026-09-21

- Shortened page arrivals to 300ms and chapter transitions to 220ms, removed full-screen blur and the two-frame route delay, and paused decorative rendering during navigation.
- Reduced shared particle fields from 16,000 to 8,000 points, lowered hero rendering density, pulled the illustration camera back, and reduced point size for more breathing room.
- Narrowed cursor influence and softened hover/press displacement. Distinct forms, pause controls, and reduced-motion support remain.
- Verified JavaScript syntax, whitespace, Journey graphics, Academy/Toolkit navigation cleanup, no desktop horizontal overflow, and no console errors on inspected routes. Device-wide performance benchmarks were not run.


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


## Start here
The user explicitly requested the UI/UX Studio workflow and a full-product spatial redesign using Three.js and React Three Fiber as references. No homepage artwork is protected from improvement. Avoid repeated card grids; prioritize clear learning workflows, editorial composition, purposeful motion, and responsive accessibility. This is a browser-based spatial interface, not a headset AR/VR application.

## Current local Studio pass — 2026-09-20
- New `dist/studio.css` owns the final layout layer: open homepage, editorial pathway chapters, indexed Academy, continuous Journey, resource lists, workshop agendas, quieter lesson surfaces, and research/editor layouts.
- `dist/universe.js` now uses original intersecting physical-material rings, a faceted core, edge cage, and instanced satellites with the existing interactive particle field. No external model assets or React dependency added. Bundled Three.js licensing remains in place.
- Cinematic routing work is local: clicked-surface transitions, directional lesson/project steps, async research mounting, rapid-navigation cleanup, and reduced-motion fallback.
- Latest published version remains `f1f0232` at https://rei-pink.vercel.app/. This Studio pass is NOT committed or deployed.
- Validation this pass: JavaScript syntax checks passed for app, universe, spatial, motion. Desktop Academy/workshop and mobile home/writing-page screenshots inspected; mobile width checked at 390px; workshop and mobile routes showed no horizontal page overflow. This is targeted visual inspection, not a full regression pass.
- The cinematic QA test passed before this Studio pass. A subsequent elevated research QA command was blocked by automatic approval review because workspace credits were exhausted. Do not represent that rerun as passed or bypass the blocked approval. Full interaction regression and publishing remain pending.
- Next: complete route-wide visual/interaction QA when approval access is restored, review final visuals with the user, then commit and push to the existing GitHub remote. Keep current local user data intact.


## Project and preview
- Source: `dist/` — vanilla HTML/CSS/JavaScript, no build step.
- Serve: `python -m http.server 4173 --bind 127.0.0.1 --directory dist`
- Preview: http://127.0.0.1:4173/#home
- Existing browser tab may still show an older loaded version; reload to load the latest changes.
- User data is in browser localStorage `rrh-v2`; preserve its schema and migration from `rrh-v1`.
- Motion preference: `rrh-motion`.
- Latest downloadable bundle and README: `outputs/`.

## Implemented
- Homepage: interactive particle atlas with three phases, custom GPU morphs, pointer response, asymmetric sections, workspace illustrations.
- Nine lessons now have FOUR separate routes each:
  - `#lesson/0` (Learn; indexes 0–8)
  - `#lesson/0/example`
  - `#lesson/0/write`
  - `#lesson/0/check`
- Saved exercise drafts persist between pages; correct quiz plus nonempty draft enables completion.
- Six resource detail pages: `#resource/proposal`, `matrix`, `search`, `framework`, `methods`, `checklist`.
- Three dedicated workshop pages: `#workshop/0` through `2`.
- Notebook, proposal studio, readiness review with distinct headings and descriptions.
- Spatial page transitions using View Transitions when supported; fallback animation and reduced-motion handling. Rejected transition-ready promises on rapid navigation are handled.
- Live WebGL graphics on inner-page headers: particle sphere, spiral, helix, terrain field, lattice. One renderer per route; disposal on navigation.
- Explore hub directory (bottom-left button or Ctrl/Cmd+K), native dialog keyboard handling, Escape close.
- Lesson focus-reading mode, retained through lesson navigation in the session.
- Existing notes CRUD, unfinished note recovery, undo, JSON backup/restore, Markdown exports, six downloads, 27 readiness checks.

## Source map
- `app.js`: routing, page templates, storage, notes, lesson workflow, downloads/dialogs.
- `data.js`: substantive course content, resources, further reading.
- `universe.js`: custom Three.js particle shaders and lifecycle.
- `motion.js`: entrances, reveals, motion preferences.
- `atlas.js`: homepage phase controls; old in-page lesson navigation is skipped when new lesson flow exists.
- `spatial.js`: page transitions, purpose-specific headings, inner-page scene attachment.
- `navigation.js`: spatial directory and reading focus mode.
- CSS loads in order: `styles.css`, `future.css`, `observatory.css`, `spatial.css`. These layers reflect successive design passes. Consolidation is worthwhile later, but preserve the tested appearance.
- `vendor/`: locally bundled Three.js 0.180.0 and MIT license.
- `fonts/`: local fonts and licenses; no external runtime font service.

## Validation completed
- 36 lesson routes and 36 route/viewport combinations at 375, 768, and 1440 px.
- Four-step lesson workflow, quiz completion, resource download, draft persistence.
- Missing-draft completion redirects to writing; browser Back/Forward work.
- Enlarged text layouts and keyboard navigation.
- Reduced motion and persistent motion preference; paused scene verified stable after transitions settle.
- Directory keyboard shortcut, navigation/close, mobile dialog, Escape.
- Focus reading mode and draft persistence through step navigation and browser history.
- No page errors in latest `spatial-edge.cjs`, `spatial-qa.cjs`, and `production-qa.cjs` runs.
- Earlier full regressions covered notebook CRUD/undo, backup restoration, filters/search, all downloads, readiness persistence, legacy migration.

QA scripts and screenshots remain locally under ignored `work/`; key portable scripts are copied into `tests/`. Scripts expect Playwright; set PLAYWRIGHT_MODULE if it is not installed normally. Run from the repository root with the preview server active. Desktop screenshot files in tests default to `work/`, so create that directory first.

## Remaining production work
- This is a LOCAL application, not a launched SaaS. Accounts, backend, cloud sync, AI services, real seminar recordings, and WebXR are not implemented.
- Do a fresh visual pass on all inner pages with the user. Latest mobile/layout tests passed, but no claim of formal accessibility certification or all-browser compatibility.
- Consolidate layered CSS and the lesson template adapter when useful; avoid a gratuitous framework rewrite.
- Test Safari/Firefox and low-end mobile performance before public launch.
- Deployment remains separate. A previous Sites source upload was denied by automatic approval review; do not bypass that block. GitHub saving is already configured and successful at https://github.com/hoshixdd/REI; a GitHub push does not deploy the website.
- Do not upload `work/`, browser profiles, local test backups, credentials, or private user data.

## GitHub handoff
The user created https://github.com/hoshixdd/REI and authorized commits and pushes there. Origin is https://github.com/hoshixdd/REI.git and the active branch is master. The website, tests, README, downloadable bundle, and handoff are saved locally and pushed. Latest implementation commit: c823d73 (Give lesson pages a distinct research fieldnotes identity), following 7865ae5 (search and exact-step resume). This handoff update is a separate documentation commit. Continue from this repository and preserve saved-work compatibility. Do not create another repository or configure another account.

## Search and resume update
- Explore hub now searches 26 real destinations: eight spaces, nine lessons, six resources, and three workshops. Empty search shows the original spatial directory.
- Keyboard: Ctrl/Cmd+K opens navigation and focuses search; Arrow Down enters results, arrows navigate, Enter opens a result, Escape closes the dialog.
- Academy resume panel returns to the exact lesson step. Optional validated `resume: { lesson, step }` is saved in `rrh-v2` and included in JSON backups; older backups remain supported.
- Lesson flow tabs show saved word counts and whether the answer has been checked correctly.
- `continuity.js` implements search and resume presentation. Regression: `tests/continuity-qa.cjs`.

## Latest visual refinement
- Research Fieldnotes lesson identity: editorial numbered reading sections, contrasting example spreads, a light writing studio, and split-screen knowledge checks with live particle graphics. Responsive layouts retain keyboard-accessible answer controls and existing motion preferences.
- Verified all 36 lesson routes, draft and quiz workflow, back/forward navigation, and five enlarged-text layouts; inspected settled desktop and mobile views.
## Current checkpoint — 20 September 2026
- Latest user request: update and commit this handoff so the next session knows where the project stands. No additional website changes are part of this documentation checkpoint.
- Local project: `C:/Users/admin/Documents/Codex/2026-09-19/lets`. The browser currently points at `http://127.0.0.1:4173/#home`. Restart the static preview server if it is no longer running.
- The most recent design pass is implemented across all nine lessons, through shared templates in `dist/app.js` and scoped styles in `dist/spatial.css`. It adds the Research Fieldnotes masthead, numbered editorial sections, connected step navigation, a contrasting example spread, a pale writing surface, and a dark/light review composition with a live particle scene.
- Homepage appearance was preserved in that pass. Other destinations retain their earlier spatial designs; the Fieldnotes treatment has not yet been extended throughout the entire hub.
- Latest pass verification: `tests/spatial-qa.cjs` and `tests/spatial-edge.cjs` passed. Settled desktop Check/Write views and mobile Check were visually inspected. Earlier search/focus/workspace validation is described above; do not imply every historical test was rerun after this visual change.
- `outputs/research-ready-hub.zip` and its README were refreshed in c823d73. The root handoff is the continuation reference in GitHub; the ZIP is the runnable website bundle.
- The user has not yet reviewed or approved this latest design. Do not describe it as finished production SaaS or as satisfying their visual expectations without further feedback.

## Recommended continuation
1. Read this handoff, inspect Git status, and open the current preview before changing anything. Preserve existing user edits and local-storage compatibility.
2. Get the user's reaction to the Fieldnotes direction. If asked to continue visual work, improve the composition and identity of Academy, Journey, Toolkit/resource guides, workshops, and workspace surfaces while keeping content readable and giving each destination a clear purpose.
3. Prefer purposeful interactive graphics and connected transitions over adding decorative cards or indiscriminate motion. Keep reduced-motion controls, keyboard access, mobile usability, and draft saving intact.
4. Verify the affected workflows and responsive layouts, update the runnable ZIP when website files change, and commit/push authorized changes to hoshixdd/REI. Report tested behavior and remaining limitations accurately.
5. Before a real public launch, complete cross-browser/performance/accessibility checks and agree on hosting and any backend requirements. GitHub source backup and localhost preview are the current delivery state.

## Spatial studio implementation checkpoint
The user's latest correction explicitly allows improving the strongest homepage graphic too. Do not preserve it unchanged. This release upgrades its sculptural core, all phase graphics, palette, typography, and shared page surfaces.

Local research workflows now exist at `#research` and `#research/<project-id>/<library|map|evidence|proposal>`, implemented in `dist/research.js`. Research data uses IndexedDB `rei-research`, store `projects`; old learning data still uses `rrh-v2`. Both have separate exports. Do not clear either storage system. Paper relationships are manually recorded and are not live provider citations.

Read `RELEASE_NOTES.md` for the full implemented/remaining inventory and `FREE_SETUP.md` for the requested free-account setup. The user has no Supabase/OpenAlex accounts yet and asked for setup files and steps. The SQL migration and Edge Function are prepared, not deployed or integration-tested; cloud sign-in/sync and live search frontend are still unimplemented. Do not claim that credentials alone activate them.

The current local implementation has project and paper editing, notes/status, manual collection labels, a pan/zoom citation map and list, editable evidence with comparison table, source-linked proposal writing, and project backup/restore. More complete collection management, spatial 3D map, cloud workflow, and deeper visual refinement remain. This is a tested local increment, not completion of the entire 70% roadmap.
