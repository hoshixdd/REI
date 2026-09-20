# Research Ready Hub — continuation handoff

## Start here
The user previously approved the homepage direction. Preserve that foundation, but do not assume the latest overall design has been accepted: their most recent design feedback was that the UI still lacked a distinctive identity. Continue improving the INNER pages toward a polished, cinematic learning hub inspired by Alche Studio and the public GetLayers Vesper preview. They want spatial depth, connected page transitions, rich graphics, and clear educational headings/descriptions. Do not claim actual headset AR/VR: this is a browser-based visual experience, with no WebXR or camera integration.

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
