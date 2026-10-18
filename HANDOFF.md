## Workshop aligned independent learning release — 18 October 2026

The user requested seminar-content alignment, clearer navigation and starting guidance, and additional research-supported skill practice. Their clarification: mainly independent use after the seminar; equal entry for learners and active researchers; no event dates/logistics. Source: C:/Users/admin/Downloads/seminarrrr.docx, read without editing or publishing it. Read LEARNING_PATH_REVIEW.md for the detailed phase map, references and evidence limits.

- #home is a concise dual-entry landing. #learn is the learning home; #learn/0–5 follow the research mindset and five phases. There are 21 prompts across the sequence and a single assembled workbook at #workbook.
- #practice includes eight original activities: recall, question repair, source verification, synthesis/gap reasoning, claim boundaries, method alignment, feedback/revision and spaced revisiting. Open responses are not automatically graded. Two scenarios give choice-specific guidance; learners compare and revise their own reasoning. Six published sources and adaptation limits are visible at #learning-evidence and beside relevant practice.
- Existing detailed lessons, workshops, toolkit, project Library/Reader/Evidence/Claims/Synthesis/Design/Map/Proposal/Review remain. The entire former homepage and optical scenes are at #explore. The menu uses four clear destinations and a deeper-tools disclosure. Search includes guided workbook notes and practice responses. Full lessons/resources provide return navigation, and full-lesson drafts remain separate and explicitly linked.
- Optional learningPath state in rrh-v2 includes guided fields and practice. Existing learningLab, drafts, notes and IndexedDB project/PDF records remain. Normalization, legacy restore and backup validation include the new optional field; combined JSON backups include it. Failed saves keep session text exportable. Markdown workbook download is readable; JSON is the restorable format. Project proposals are not modified automatically.
- New files: dist/learning-path-core.js, dist/learning-path.js, dist/learning-path.css, tests/learning-path.cjs. assets.json adds the two deferred scripts before app startup and the scoped CSS as the final layer. Rebuild with node scripts/build-assets.cjs; the served stylesheet remains one request, now containing 20 source layers.
- Seventeen focused suites passed; changed scripts, deterministic build and whitespace checks passed. Browser checked 19 new routes at phone/desktop widths without document overflow or sub-16px textarea text. Verified note/revision persistence, blank/choice-specific feedback, workbook export, complete populated learning backup/restore, search, menu, keyboard start and original lesson/optical access. Real research was not edited. Fictional QA responses were confined to localhost:4218.
- Proof: rei-learning-checks.json, rei-learning-landing.png and rei-learning-mobile.png in C:/Users/admin/Documents/Codex/2026-10-18/co/outputs. Local preview port remains 4218. Source document and extracted logos stay out of the repository and release archive.
- Physical touch, Safari/Firefox, screen readers, instructor/student evaluation and measured learning gains remain unverified. Published studies inform mechanisms; none validates REI or these adapted tasks. No account, paid service, backend or automatic sharing was added.

Feature commit 08519dc was pushed to GitHub master. The production root and all ten changed/new script/style assets returned HTTP 200 and matched the release after newline normalization. The live landing was also opened in the browser and displayed both starting choices. Evidence: rei-learning-production-checks.json and rei-learning-live.png in the current chat outputs.

---

## Observatory scrolling repair — 18 October 2026

The user reported jumping/uneven scrolling in the homepage's four-chapter Observatory. Reproduced a pinned composition about 800px tall in a 650px-high window, leaving controls/captions below the viewport. Also found manual chapter selection was immediately discarded on the next wheel event, switching back to the unrelated scroll-position chapter.

- The story now measures its composition after layout/fonts and on resize. It pins only when the whole composition fits below the header; short windows use normal document scrolling and explicit chapter controls. Mobile remains a normal-flow composition. Models, lighting and geometry are unchanged.
- Manual chapter choice anchors subsequent chapter progression to that selection, with a complete chapter's worth of movement before advancing. A small scroll no longer snaps Question directly back to Argument. Leaving the story clears the manual anchor.
- A reserved caption height and exclusion from scroll anchoring reduce geometry changes as chapter wording changes. Short-window guidance now says to select a chapter.
- New tests/observatory-scroll.cjs passes: short/tall/mobile layout selection and bounded manual/scroll continuity. observatory.js syntax, deterministic stylesheet build and git whitespace checks pass.
- Browser verified at 1100×650 (normal flow), 1440×1100 (full composition pinned; small scroll retains manually selected Question) and 390×844 (normal flow, no horizontal overflow). Keyboard Home/ArrowRight works; Skip the exploration moves focus to the next section. Inspected error/warning logs empty. Physical-device smoothness and other browser engines remain unverified.
- Updated the stylesheet bundle, cache tokens and runnable ZIP. Proof screenshot: C:/Users/admin/Documents/Codex/2026-10-18/co/outputs/rei-scroll-fixed.png. Published as eb1b973 on GitHub master. Production root, observatory.js, rei-bundle.css and optical-observatory.css returned HTTP 200 and matched the release after CRLF normalization. Evidence: rei-scroll-production-checks.json in the current chat outputs.

---

## Verified reliability and recovery increment — 18 October 2026

This section supersedes the provisional checkpoint immediately below. Continued the existing uncommitted changes from 6a2f9a4, after fetching origin and confirming master matched origin/master. Feature commit 5efd19e was pushed to GitHub master. Production at https://rei-pink.vercel.app was then verified: the root and all eight changed/new JavaScript/CSS assets returned HTTP 200 and exactly matched this release after CRLF normalization. Verification evidence: rei-production-checks.json in the current chat outputs. No manual hosting change or account setup was required.

### Implemented

- Backup and recovery at #backup, linked from the footer, notebook and project actions. One versioned JSON envelope includes learning notes/drafts/practice plus all saved projects and attached PDFs. Research projects restore individually through existing explicit previews as separate copies; learning replacement opens its existing preview. Selecting a file never writes data. The file must be selected again after returning to the center to preview another part.
- Learning records in combined backups must survive the existing sanitizer without filtering/truncation. Invalid persisted learning data blocks combined export rather than silently producing a validated reduced backup. Version, five-project, 100 MB envelope, 5 MB learning payload and existing project/attachment checks apply. PDF header/data validation is not a guarantee that every complex PDF renders.
- Core create/edit/add, reading status, workbench forms/actions and optional OpenAlex saves have submission guards and/or rollback/retry handling. A failed create restores the prior current-project reference. Field-aware rollback preserves unrelated concurrent proposal/source edits. Failed reference imports keep their preview/selection. Claim/record deletion failures restore the project records. Source/project PDF cleanup follows successful record removal, preventing a failed project write from deleting the attachment first.
- Proposal and reading-note autosaves retain failed changes in this session across research-room navigation; an explicit retry is available in the failure status. Workspace export overlays session-retained project state. Unsubmitted research forms remain excluded. Session retention is not durable recovery after closing/reloading the browser. No multi-tab write-conflict resolution is claimed.
- Nine original weak/revised reasoning examples, explanation, transfer question and discipline/ethics limits. Clinics appear beside all nine Write editors and in relevant research rooms. Fixed pale text on the light Write surface. Existing examples, graphics, models, motion detail and storage formats remain.
- Jump to working area focuses the research content using keyboard/native button behavior, with visible focus.
- assets.json and scripts/build-assets.cjs provide deterministic stylesheet ownership/order. The build creates dist/rei-bundle.css alongside the original stylesheets, preserving relative font/image URLs and all 19 stylesheet layers in order. Scripts remain separate, classic/deferred and in their existing order; vendor/dynamic loading is unchanged. This reduces stylesheet requests from 19 to 1 (18 fewer); no measured startup-speed or GPU-performance improvement is claimed. Run the build after CSS edits and commit the generated bundle.
- OpenAlex mounts after asynchronous research rendering, discloses query transmission, has timeout/failure feedback and saves to the captured project. It remains optional; local imports need no network/account. Provider availability/account policy is not guaranteed by this release.

### Verification actually completed

- All ten baseline suites passed after the final functional changes: learning-lab, workbench-core, research-flow-save, lesson-transfer, local-search, method-flow, synthesis-depth, research-depth, reader-regression and project-navigation.
- Five new suites passed: save-policy, workspace-recovery, research-save-failure, workbench-save-failure and discovery-save-failure. These cover malformed/filtered learning values, invalid PDF payload rejection, sizes/versions, failed create/edit/add and claim/search/action saves, retry, failed deletion, destination capture and unrelated concurrent edits. Failure injection was performed in isolated Node fixtures, not against real user browser data.
- Changed scripts passed syntax checks; git diff --check passed. Bundled runtime used because the system Node sandbox entrypoint cannot resolve the user path.
- Browser: empty combined export; nonempty download/file validation; separate project restore; multi-project envelope with a saved PDF and evidence; restored PDF rendering and original passage/source link. Learning replacement preview opened correctly and was cancelled. No real notebook replacement was performed. Three explicitly fictional QA projects remain on the isolated localhost:4218 origin. Real research databases were not cleared or edited.
- Browser: all nine Write clinics and all nine research rooms at 390 and 1440 viewport widths, no document content wider than the viewport; one clinic per intended surface. Keyboard Enter on Jump to working area focused .research-content. Inspected-route error/warning logs were empty. Contrast repair received its bounded visual confirmation.
- Proof files are in C:/Users/admin/Documents/Codex/2026-10-18/co/outputs: rei-browser-checks.json, rei-reasoning-desktop.png, rei-recovery-mobile.png and rei-recovery-desktop.png. Local preview serves dist on port 4218.

### Remaining limits / next useful work

- Run a real-device Safari/Firefox, touch and screen-reader review. Large/complex/encrypted PDF performance, actual browser quota failures, cross-tab races and full interrupted import recovery still need dedicated browser coverage. The targeted fixtures do not establish an exhaustive save-error audit or formal accessibility/performance certification.
- Learning replacement under storage failure is implemented to preserve the original in-memory notebook, but a complete populated learning-notebook/practice restore and blocked-storage browser walkthrough remain useful follow-up coverage. Expert review and student evaluation of teaching additions remain unperformed; no grading, mastery or learning-impact claim is made.
- Existing read-only completeness checks organize records, not scientific validity. No required paid dependency, account, cloud synchronization or backend was added.

---

## Active continuation checkpoint — 18 October 2026

This section supersedes older status statements below. The user requested this documentation checkpoint before further implementation. Work on the current reliability/content improvements is IN PROGRESS, uncommitted, unpushed and unverified. Do not describe it as released or complete.

### Repository and verified baseline

- Actual REI checkout: C:/Users/admin/Documents/Codex/2026-09-19/lets. The chat workspace C:/Users/admin/Documents/Codex/2026-10-10/lets contains outputs/work, not the application repository.
- Remote: https://github.com/hoshixdd/REI.git; branch master. Last committed release: 6a2f9a4 (Confirm connected learning release is live).
- Production: https://rei-pink.vercel.app. During the 17 October review, the production index and learning-lab.js, learning-lab-core.js, learning-lab.css and workbench-core.js returned HTTP 200 and matched the committed baseline after newline normalization. This does not verify any pending changes.
- BEFORE the pending edits, ten focused suites passed: learning-lab, workbench-core, research-flow-save, lesson-transfer, local-search, method-flow, synthesis-depth, research-depth, reader-regression and project-navigation. No post-edit suite or browser verification has been completed.
- Windows sandbox Node entrypoint resolution previously failed with EPERM. Read-only tests succeeded outside the sandbox. Git may need command-scoped -c safe.directory=C:/Users/admin/Documents/Codex/2026-09-19/lets. Do not modify global Git configuration.

### User-authorized scope and visual constraint

Address review weaknesses 1 (backup/recovery), 2 (consistent failed saves), 5 (deeper teaching), and 6 (implementation complexity). Also improve weakness 4 (working speed) ONLY while preserving the existing graphics, models, visual elements and their detail. Do not simplify the art direction. Preserve account-free/local-first operation, existing storage and backup compatibility; no paid dependency or backend is required.

### Changes started, not yet validated

- dist/recovery.js (new): Backup and recovery route with an inventory, single JSON workspace envelope containing the learning notebook plus complete project/PDF backups, 100 MB envelope limit, file validation and per-part restore through existing preview/confirmation flows. No automatic bulk replacement. Download status accurately says requested, not confirmed saved. Unsubmitted research forms are explicitly excluded.
- dist/app.js: Added #backup route and exposed learning snapshot/validation through REILearningStore. Existing learning restore sanitizer remains authoritative.
- dist/workbench.js: Added optional returnOnly to backup() so complete project/PDF payloads can be assembled without triggering individual downloads.
- dist/research.js: Exposed project validation and saved-project inventory, substituting active in-memory state for the matching saved project. Began snapshot rollback for core forms, submission guards, clearing form drafts only after persistence, and restoring reading status on failed save. This is not yet a comprehensive save-policy fix.
- dist/discovery.js: Began OpenAlex timeout, repeat-search/submission guards, 200-source limit, failed-save rollback and retry. Added disclosure that search terms go to OpenAlex.
- dist/reasoning.js (new): Nine original annotated weak/revised examples, explanation, transfer question and project guidance. Relevant research rooms receive expandable reasoning clinics. Project heading receives a keyboard-focusable Jump to working area action; existing graphics are not removed.
- dist/index.html: Loads the two new scripts before app.js; footer links to #backup. dist/learning-lab.css adds scoped recovery styling and a working-area focus style.
- No script/style consolidation has been implemented. No generated bundle, dependency manifest, new automated tests, refreshed ZIP, commit, push or deployment exists for this increment.

### Required continuation, in order

1. Inspect the current diff and relevant AGENTS.md instructions. Treat every item above as provisional. Check all replacements and JavaScript syntax before further UI work.
2. Complete the persistence policy. Test failed edits, create, reading-status changes and OpenAlex saves for rollback, retained form text and retry. Audit autosave, deletion and attachment paths separately. Investigate concurrency: whole-project snapshot rollback can overwrite concurrent in-memory edits; a failed new-project create can leave current pointing to an unsaved record. Fix these rather than assuming the initial patch is sufficient. Ensure draft clearing never precedes a successful save on remaining paths.
3. Finish and harden workspace recovery. Test empty/nonempty workspaces, multiple projects, saved PDFs, active unsaved text, notebook practice, invalid envelopes, malformed PDFs, oversized files, blocked storage and old backups. Verify all inputs before writes. Confirm the existing learning import control selector, research mount timing, File/DataTransfer handoff, route focus and modal confirmation actually work. Projects must restore as separate copies; notebook replacement needs its existing explicit preview. A failed export/import must preserve originals. Ensure corrupt learning data cannot silently be represented as a fully validated backup after sanitizer filtering. Verify preview state across navigation and repeat restores.
4. Review the nine teaching additions for accuracy, accessibility, placement and duplication. Confirm Write-step clinics appear beside the appropriate editor. Include disagreement, sampling justification, analysis fit, claim boundaries and discipline-specific limits without implying automatic grading, approval or demonstrated learning impact. Obtain instructor/student review later; it has not happened.
5. Address implementation complexity through a small deterministic asset manifest/build step or another justified bounded refactor. Preserve exact stylesheet cascade order, script execution order, global scope, defer behavior and dynamic/vendor loading. Keep editable sources. Do not blindly concatenate scripts: check parse boundaries, shared globals, currentScript assumptions, route timing and CSS relative paths. Measure and report request reduction separately from proven speed improvements.
6. Verify Jump to working area with keyboard and narrow layouts. Keep all optical models, hero graphics, motion preferences, detail and existing interactions intact. Add a discoverable backup entry in relevant workspaces if the footer alone is insufficient.
7. Add meaningful targeted recovery and failed-save regression tests, then run the ten baseline suites, changed-script syntax checks and git diff --check. Perform one batched desktop/mobile browser pass, fix concrete defects, and confirm fixes. Use fictional disposable fixtures only; do not alter real research or clear browser databases.
8. Refresh outputs/research-ready-hub.zip and its README after successful verification. Update this handoff with actual outcomes and remaining limits. User previously authorized repository saving/pushing; only commit/push a coherent verified increment and report deployment separately. Do not claim the new release is live without checking production assets.

### Still outside verified coverage

Physical touch, Safari/Firefox, screen readers, formal accessibility/performance audits, large real collections, expert curriculum review and student outcome evaluation remain open. The product can be evaluated in a supervised pilot; no measured educational impact or mastery claim is supported yet.

---

## Current connected learning checkpoint — 12 October 2026

Implemented all five agreed educational improvements: two explicitly fictional qualitative/quantitative projects across nine stages, fading/overrideable writing guidance, 27 scenarios with alternative-specific explanations and nine written self-review exercises, six deeper methodology guides, and an interactive question/evidence/analysis/claim diagram in lessons and research Design. Final examples include assembled teaching proposals. Preserve the existing quiet laboratory, real draft editors and project records. New teaching controls use native selects for accessible direct keyboard interaction.

An optional normalized learningLab field in rrh-v2 stores example/support preferences and practice attempts and travels in learning notebook JSON backups. Old backups reset new practice; original drafts/progress remain intact. Failed writes retain the exportable response in the open session and visibly warn that local persistence failed. No accounts, backend, paid services or research database migration. Project/PDF backups remain separate. Original milestone completion is still an activity gate, not a mastery score; readiness wording now describes recorded fields rather than quality.

Read LEARNING_REVIEW.md for scope, instructional references, actual checks and limitations. New learning/backup suite and nine existing research workflow suites passed; changed JavaScript syntax and whitespace checks passed. Browser batch covered all 36 lessons at both 1440px and 390px without document overflow; tested switching examples, disclosure, guidance override, feedback/revision, written comparison/reload, exported practice, method fit/mismatch and native keyboard selection. Design guide and assembled proposal were inspected. Temporary practice QA responses were cleared. Original lesson drafts were unchanged; research project records were not edited. Inspected-route error logs empty.

Feature commit 2b1224e and handoff commit d027b3a were pushed to GitHub master. Production initially remained on the previous release, then updated. Verified the live alias https://rei-pink.vercel.app root and all six changed/new learning JavaScript/CSS files: HTTP 200 and exact local-release matches after CRLF normalization. Automatic hosting recovered; no sign-in or manual deployment was needed. Runnable ZIP and README were refreshed. Preview was restarted at port 4198 on 12 October (local preview session 16540). Browser logs/screenshots are in the current 2026-10-10/lets/outputs folder. Next: instructor content review and a student usability/learning pilot, before claiming measurable educational impact. Neither is completed. Physical touch, other browsers, screen readers and formal performance/accessibility audits are also unverified.

## Current graphics and motion checkpoint — 11 October 2026

Implemented the user's holistic graphics/motion request across the existing quiet dreamlike laboratory. `dist/optical-models.js` supplies nine original silver/glass mesh instruments to the existing shared renderer; `dist/optical-system.js` applies them to page and room headings, Academy lesson covers, roadmap phases, Toolkit resources and the navigation gallery. `dist/optical-system.css` owns the coordinated surfaces, optical controls, selection tracks, responsive compositions and final transition timings. Homepage lens/story lighting now uses the same cooler silver material direction. Existing hero and story scenes remain interactive; this is a coordinated refinement, not a replacement of the entire site with one WebGL scene.

Removed competing content/reveal systems and click pulses. Reading and writing stay steady; browsing has subtle reflections, pointer exploration, manual rotate/reset, fast route and chapter transitions and one bounded menu entrance. Keyboard routes skip transitions. Paused/reduced motion still works with static fallbacks. Quiet instruments skip repeated GPU rendering once settled, and all illustrations share the existing renderer. No accounts, paid APIs, backend, research schemas or storage formats were added or changed. Preserve IndexedDB and `rrh-v2`, complete PDF backups and existing export/import.

Release: feature commit `f165015` was pushed to GitHub master. The production alias `https://rei-pink.vercel.app` returned HTTP 200 for the root page and all twelve changed/new graphic and motion assets; each matched the local release after CRLF normalization. Network timeouts were retried successfully. This confirms deployed assets, alongside the local browser workflow coverage described below.

Read `OPTICAL_REVIEW.md` for the before/after and motion review, exact verification and remaining limits. Nine focused workflow suites passed; all changed/new scripts passed syntax checks; nine instrument models have finite geometry/bounds. Browser batch covered 23 representative routes at each of 1440px and 390px, including all nine research rooms, with no document overflow. Actual card/chapter navigation, filters, pause/resume, keyboard rotation/reset, Escape focus return and unchanged 198-word fictional proposal were verified. Visual repairs received a bounded confirmation pass; inspected-route browser error logs were empty. Physical touch, Firefox/Safari, screen readers, OS reduced-motion preference switching, very large collections and formal performance/accessibility audits remain unverified.

The runnable ZIP and README were refreshed. Continue from the existing project/remote; next useful work is user visual feedback followed by real-device reliability/accessibility checks. Preview remains on port 4198. Screenshots and route logs are in `C:/Users/admin/Documents/Codex/2026-10-10/lets/outputs`.

# REI — continuation handoff

## Spatial map and continuous proposal workstation — 11 October 2026

User chose a spatial 3D scene, one continuous proposal draft, and more expression within the quiet dreamlike laboratory. Added `research-depth-core.js`, `research-depth.js` and `research-depth.css` before app startup. The map projects deterministic three-dimensional coordinates with perspective, depth sorting, orbit/tilt/zoom/reset, desktop dragging, keyboard controls and phone buttons. It uses existing sources, evidence, claims and themes with only recorded reference, source provenance, claim-relation and coding links. Position does not represent importance or research quality. This is a lightweight DOM/SVG projected scene, not a WebGL mesh renderer. No external service or new dependency.

Filters cover record types, relationships, search, unconnected records, challenged claims/evidence and themes with researcher-recorded gaps. The inspector explains links and opens exact evidence, claim or theme records, or the source in Reader. The accessible list covers all matching records; the spatial display caps at 160 with explicit guidance. Existing verified-reference form and project outline remain available. No inferred citation links, automatic literature-gap claims or project mutation from map interaction.

Proposal remains its existing autosaved textarea. Added Markdown heading navigation with wrapped-text positioning and per-section word counts, optional writing focus (Escape exits), searchable supporting material beside the editor on wide screens, completeness/review prompts, named milestones using existing snapshots (latest 20), and comparison of two milestones or one milestone against the current draft. Comparison shows the changed span between matching opening/closing lines, not a word-level diff; internal unchanged lines may appear in both columns. Question changes are shown separately. Milestone save failure rolls back snapshots and keeps the name; success clears its session form draft. Existing draft wording, learning storage, IndexedDB stores and backup format remain unchanged. Milestones already travel with project backups. Review retains existing restore controls.

Validation: new research-depth suite plus eight existing focused suites passed; changed JavaScript syntax and diff whitespace passed. Fictional fixture only: browser verified orbit, relationship filter/list, support/challenge inspector, exact E2 navigation, section cursor and textarea scroll, writing-focus Escape, supporting material, named milestone save/reload/cleared form name, changed-span comparison and original proposal restoration after temporary QA text. Desktop 1440px and mobile 390px inspected without document overflow; repaired ivory-control contrast and long-heading panel overflow. Final inspected-route error logs empty. Screenshots in current chat outputs. Real projects were not edited. Physical touch, Firefox/Safari, screen readers, very large collection performance, formal accessibility and full backup restore in this slice remain unverified.

Next: user review, then reliability/recovery and broader device/accessibility checks. Keep local saving and export/import; no required account or cloud backend. Preview restarted on 4198 using a local Node static server because the earlier preview process had ended.

## Research room interface refinement — 11 October 2026

Added `room-compass.js` and `room-experience.css`. All nine rooms now share an optical charcoal/silver surface system, clearer task headings, current recorded-work counts and previous/next navigation. A collapsible room atlas groups destinations into gather/inspect, connect/explain and develop/review, with descriptions on pointer/focus, current-room indication, keyboard Escape dismissal and focus-mode access. Counts are records, not a completion/quality score. The atlas uses a small perspective hover response on desktop and a stacked mobile layout; this is a navigation/interface refinement, not a full 3D redesign of every research tool.

Older navy panels, tables, coding chips and readiness surfaces were brought into the existing visual identity. Long-title typography, focus treatment, selection/caret colors and scrollable previews are refined. Removed repeated section/rail entrance motion; only the room heading has a brief optical transition. Forms no longer translate during disclosure motion, and motion pause/reduced-motion settings remain respected. No project records, schema or storage mechanism changed.

Validation: eight existing workflow suites passed, changed JavaScript syntax and diff whitespace checks passed. In-app browser with the fictional fixture navigated all nine rooms at 1440px and 390px: no document overflow or duplicate compass, current room and atlas links correct. Keyboard Escape returns focus, atlas remains usable with project navigation hidden, next-room navigation works, and motion pause/resume was checked. Saved synthesis and objective text remained intact. Inspected-route error logs were empty. Screenshots are in the current chat outputs. Hardware touch, Firefox/Safari, screen readers, large collections and formal accessibility/performance audits remain unverified.

Next: user review of this visual direction and targeted real-device/accessibility verification; continue richer map/reader interactions if requested. Preserve local research, full backups and the no-account/no-cloud constraint.

## Connected Design → Proposal → Review — 11 October 2026

Added `dist/design-flow.js` before app startup. Design and Proposal now offer objective selection, explicit method-text preview and append-to-proposal. Empty selection is rejected, missing fields remain “Not recorded”, exact repeated transfers do not duplicate the plan, and the proposal length limit is enforced. Failed transfer saves roll back proposal text. Existing proposal wording, synthesis and copied plan text remain untouched by later objective edits. Design saves now roll back objective changes on persistence failure and clear the successful form draft.

Alignment rows open the existing objective editor. Review checks link to relevant work, including the exact missing method field, challenged claim, evidence note or source. Source-audit prompts also link back to source records. Proposal and Review have reciprocal navigation and current recorded-work context. All checks remain completeness prompts, not scientific approval. Existing schemas, exports, local storage and account-free behavior are preserved.

Validation: eight suites passed (method-flow, synthesis-depth, workbench-core, research-flow-save, reader-regression, local-search, project-navigation, lesson-transfer), changed-script syntax and diff whitespace checks passed. Browser used the existing explicitly fictional fixture: objective save, empty selection, selected preview, successful transfer, duplicate prevention, preserved synthesis/older copied method wording, missing-sample review link focusing the correct editor field, corrected prompt disappearing after save, exact challenged-claim focus and reload persistence verified. Desktop/mobile method preview and review inspected; mobile review grid clash fixed and confirmed at 390px without document overflow. Inspected-route error logs were empty. Physical devices, Firefox/Safari, screen readers, large collections and full browser-suite coverage remain unverified. Screenshots are in the current chat outputs.

Next: broader immersive and usability refinement across the research rooms, preserving the connected research workflow and local backups.

## Synthesis depth checkpoint — 10 October 2026

Added `dist/synthesis-flow.js` before app initialization. Synthesis now has an uncoded evidence queue that opens the coding form with the selected note, distinct coded-note counts, per-theme distinct-source coverage, missing-limitations/location prompts, evidence traces and source-specific Reader links. Matrix evidence labels link to the exact focused Evidence record. Coding means thematic relevance, not automatic agreement or quality.

Themes have optional interpretation, agreement, disagreement/alternative explanations and open-question/boundary fields. Old backups remain valid; normalization fills missing fields and import validates their types and length. Saved conclusions travel with project backups and supervisor packets. Unfinished text is kept in sessionStorage per project/theme, restored visibly and explicitly excluded from backups until saved. Save failures preserve form text and roll back theme/proposal changes. Proposal transfer appends researcher-authored synthesis with findings, source metadata, locations and limitations; exact repeat additions are suppressed and the 200,000-character proposal limit is enforced. Theme/coding save failures roll back new records, successful saves clear the old form draft, and removal warns when a conclusion or coding would be lost.

Validation: seven suites passed (synthesis-depth, workbench-core, research-flow-save, reader-regression, local-search, project-navigation, lesson-transfer), changed-script syntax and diff whitespace checks passed. Browser used the existing explicitly fictional project only: uncoded queue, correct selected-note label, two-source coding/coverage, unfinished draft reload, successful save/reload, duplicate-free proposal transfer with both sources/locations/limitations, exact E2 focus and contrasting-source Reader entry verified. Desktop and 390px mobile inspected; no document overflow. Screenshots are in the current chat outputs. Real user projects and the IndexedDB schemas were not changed. Physical touch, Firefox/Safari, screen readers, large collections and full browser-suite coverage remain unverified.

Next: connect Research Design, Proposal and Review more closely, then continue the broader immersive room polish. Preserve free/local-first operation and export/import without accounts or a cloud database.

## Connected Claims refinement — 10 October 2026

Claims now show supporting, challenging, mixed and uncertain relationship counts. Each linked evidence note has an expandable trace with exact passage, method, context, limitations, boundaries and location. Links open the original source in Reader or focus the exact Evidence record after navigation. Search includes claim text, linked findings and source titles; filters show unlinked, challenged or reviewed claims. Reviewed remains a researcher-set status. Existing claim records and storage schemas are unchanged.

Validation: workbench-core, reader-regression, lesson-transfer, project-navigation and local-search passed, plus research-flow-save (failed comparison save rolls back its record, retains text and permits successful retry). Script syntax and diff whitespace checks passed. In-app browser with the fictional project verified support/challenge counts, unlinked/challenged/reviewed filters, linked-finding search, passage/limitation disclosures, exact evidence focus, original source selection, reload persistence and 390px no document overflow. Desktop trace screenshot is in the current chat outputs. Existing research-edge browser suite could not run because its Playwright dependency is absent; no claim of that suite passing. Physical touch, Firefox/Safari, screen readers, large collections, actual text-selection capture and passage failure injection remain unverified. No real research data was edited.

Next useful increment: deepen Synthesis with clearer theme coverage, uncoded evidence and navigation back to source records. Keep operation free and local-first, without accounts or a cloud database.


## Connected Library → Reader → Evidence refinement — 10 October 2026

Added dist/research-flow.js, loaded before app initialization so direct room loads receive enhancements. Library combines text search with reading-status filtering, announces matching counts, provides compact spacing and reading-note disclosures, shows evidence counts, and links each source directly to Reader. Reader remembers the selected source per project in sessionStorage, labels capture provenance, exposes an explicit passage PDF page, focuses interpretation after selection capture and links to saved evidence.

Evidence combines text/source filtering across both table and detailed records, exposes linked-claim counts and source return links, and supports selecting exactly two notes for an inline side-by-side comparison. Comparison text saves to the existing workbench.comparisons schema; failure rolls back the added record while retaining text. Saved comparisons are visible in Synthesis and existing design/review exports. Existing removal guards apply. Fixed inherited dark Evidence text against the dark room surface. Selections remain stable through room rerenders.

Passage saving validates page bounds and source identity, uses the explicit capture page instead of the currently displayed page, rolls back an added note on persistence failure, and clears the successful session draft. Changing sources retains unfinished quote text with a warning rather than silently attaching it to a different paper. Form draft saving ignores incidental select/hidden defaults and input in unrelated comparison forms. Existing IndexedDB schemas and research data retained; no cloud/account added.

Validation: all five existing regression suites passed; changed-script syntax and git diff --check passed. In-app browser used a labeled fictional imported fixture only. Verified combined Library filters/empty results, compact control, source-specific Reader entry and reload selection, local PDF rendering, invalid page rejection, successful passage saved to Evidence, evidence search, two-note comparison save and reload persistence in Synthesis. Library, Reader and Evidence inspected at 390px without document overflow; comparison stacks on mobile and uses two columns at 1440px. Final inspected-route browser error log contained no new errors after repairs. Desktop/mobile screenshots are in the current chat outputs. Fictional QA project remains in local preview storage; real user research was not edited.

Limits: physical touch, Firefox/Safari, screen reader, large collections, direct selected-text capture and save-failure injection remain unverified in this slice. Published as 0426fce on GitHub master. Production index.html, research.js, workbench.js, research-flow.js and research-room.css returned HTTP 200 and matched that commit. Prior backup slice was pushed as 0f60691. Claims continuation follows below.


## Local save and complete backup workflow — 10 October 2026

User clarified that REI serves independent people, with no organization workspace, accounts or cloud database. Existing browser saves remain the continuation mechanism; export/import transfers or restores projects.

Added Continue your projects guidance, timestamped Saved on this device status, complete backup export in every project room, explicit Export without PDFs, and backup-download reminders stored separately in localStorage per project. Reminder records a download request rather than claiming the file was retained. Project backups exclude learning notebook/lesson originals and the UI now says so. Added a 100 MB export guard matching the restore input limit.

Import now validates project records and stages PDF validation before showing a named review dialog with file size, sources, evidence, claims, proposal words and included PDFs. Confirmation creates a separate project; cancel does not mutate storage; the file input resets so the same backup can be selected again. Failure leaves the review open for retry and removes partially restored attachment records. Project-count limit is rechecked at confirmation. Existing schemas and browser data retained.

Validation: all five existing regression suites passed (workbench-core, project-navigation, lesson-transfer, local-search, reader-regression). Changed JavaScript syntax and git diff --check passed. Isolated Edge browser with fictional data verified reload continuation; complete JSON download; identical PDF bytes after import; restored PDF rendering; preserved proposal and reading notes; original project retained; cancel; same-file re-selection; malformed JSON rejection; 390px no document overflow; no captured page errors. Desktop and mobile import previews captured in the current chat outputs. No real user data was used or modified.

Limits: physical touch, Firefox/Safari, screen reader, storage/quota failure injection, large-file performance and full application regression remain unverified. Export/import does not include unfinished form drafts or the separate learning workspace. User requested publishing this slice on 10 October 2026. All five regression suites and changed-script syntax passed again before release; origin/master matched the starting commit. Commit, push and live-asset verification results are reported in the release response. Local preview: http://127.0.0.1:4198/#research.


## Release request — 3 October 2026

Publishing project overview, recent project ordering, compact mobile rooms, project switcher and explicit lesson-transfer preview to the existing master/Vercel integration. Preview archive refreshed. Push and public asset verification results are reported in the release response; publishing does not complete the remaining Stage 1 QA.

## Stage 1 continuation: intentional lesson transfer — 3 October 2026

Replaced the proposal's immediate lesson-copy confirmation with Review lesson drafts. A named native dialog identifies the destination project/proposal, lists valid saved lessons in milestone order, exposes their complete escaped text and word counts, and allows individual selection. Confirmation explicitly appends selected snapshots after the existing proposal; original lesson drafts remain unchanged. Copying a draft again is disclosed as creating another copy. Empty selection and the 200,000-character proposal limit prevent saving. Snapshot is written to IndexedDB before updating the in-memory proposal; failure keeps the preview open with retry feedback and retains the previous proposal. No bridge.js activation, automatic transfer or schema change.

Verified with an initially empty lesson and the existing fictional QA project: preview displayed destination and content; empty selection produced inline feedback; Cancel left the proposal unchanged; explicit append persisted after reload; lesson original remained intact. Restored the fictional project proposal and cleared the temporary fictional lesson text afterward. Mobile dialog at 390px was 339px wide with internal vertical scrolling; keyboard Enter worked for opening and confirming. tests/lesson-transfer.cjs covers valid milestone filtering/order, selected-only append and unchanged original records. Project-navigation, workbench-core, local-search, reader-regression, syntax and diff checks passed across this continuation. Proof: lesson-transfer-mobile.png in the current chat outputs. Browser save-failure injection, physical touch, screen-reader, cross-browser and full backup/restore tests remain outstanding. User requested publishing this slice together with project orientation on 3 October 2026. All five regression suites passed again before release; remaining QA above is still outstanding.

## Stage 1 continuation: project orientation — 3 October 2026

Implemented the first bounded slice of the holistic roadmap: collapsible project overview showing source/evidence/claim/draft-word counts, last saved date and a contextual next-step link. Missing question opens project details and focuses its textarea. Counts explicitly describe recorded work, not research quality. Project list sorted by latest saved activity with dates and next-step labels. Added a native project switcher and collapsible mobile/tablet room menu; desktop keeps all nine links visible. Breakpoint changes synchronize the menu, preserving direct URLs and browser history. Styles live in research-room.css rather than another override file; changed assets versioned in index.html. No data schema changes or automatic transfers.

Verified: existing fictional project retained its source/reading note and 19-word proposal. Suggested Claims link navigated correctly; overview and room menu operated with Enter; mobile collapse/desktop expansion worked after loading updated asset versions. 36 structural checks covered all nine rooms at 320/390/768/1440px: no document overflow, all nine links present, expected initial menu state. Captured browser warning/error logs empty. Six next-step states and no mutation passed tests/project-navigation.cjs; workbench-core, local-search and reader-regression passed. Modified scripts passed syntax checks and git diff --check passed. Evidence: project-overview-desktop.png, project-navigation-mobile.png and project-navigation-checks.json in C:/Users/admin/Documents/Codex/2026-10-01/co/outputs.

Stage 1 remains in progress: intentional lesson-to-project transfer preview, complete backup/restore browser walkthrough, three end-to-end task audits and save/error/recovery audit remain next. Physical-device, Firefox/Safari, screen-reader and performance coverage remain unverified. This slice does not establish completion of the full stage or award readiness.

## Holistic roadmap toward an award-level REI — 1 October 2026

This is the next-work roadmap, not a list of implemented features or a claim that REI will win an award. The goal is an original, immersive research experience whose everyday tools feel as deliberate as the landing page. Preserve the optical identity, existing local data, free/local-first operation and working research flows. No required accounts, paid assets, AI services or cloud backend. Deliver in reviewable stages.

### Current baseline and evidence limits

The published Observatory/Atelier direction includes an interactive 3D magnifier, four-chapter optical archive, expressive landing composition, shared glass controls, notebook/proposal writing surfaces, local search and optional Reader/Proposal companion desk. The visual-finish pass completed 164 structural checks and focused interaction tests; production page and representative assets were verified against Git. Those checks establish a useful baseline, not complete accessibility, usability or performance certification. Real devices, Firefox/Safari, screen readers, OS reduced-motion behavior, low-end GPUs and complete backup restoration still need coverage.

Confirmed implementation concern: index.html loads many successive CSS layers, and the last pass found specificity collisions in the notebook title and proposal textarea. Those particular collisions were fixed. Consolidating ownership of component styles will make future polishing safer. Remote alternate visual files and bridge.js remain in Git but are not loaded. Treat them as reference material; do not activate them blindly or combine the alternate art direction with the approved one.

The improvement opportunities below are design proposals and audit targets. Validate them with actual task walkthroughs before describing them as user-reported problems.

### Stage 1 — Make the product journey unmistakable (highest priority)

- Walk through three journeys: a newcomer learns and saves an idea; a returning researcher resumes a source/evidence task; a writer builds a proposal and exports a restorable backup. Document where navigation, terminology or next actions require guessing.
- Introduce a compact project overview with the working question, last activity, evidence/claim counts and one meaningful next action. Show missing foundations as useful prompts, never as scientific approval or a grade. Returning users should reach their work without replaying the landing spectacle.
- Make the relationship between the general notebook, lesson drafts and project-specific proposal explicit. Offer an intentional transfer preview with destination and source information. Evaluate the existing bridge.js logic separately; it mutates project data and requires dedicated fixture tests before integration.
- Keep a clear project/room location, predictable back links and a reachable switcher. On mobile, evaluate a compact room selector instead of a long navigation block before the task. Preserve direct room URLs and browser Back behavior.
- Improve first-use and empty states with one actionable starting point, short inline explanations and an optional clearly labeled fictional sample. Samples must not mix silently with real research.
- Audit saving, loading, storage failure, import validation, duplicates, success feedback, destructive actions and recovery. Keep unsaved text visible after failure; show a recovery action rather than a success-looking toast. Add undo only where a reliable recovery model exists.

Acceptance: complete the three journeys with fictional fixtures using desktop and touch layouts; preserve saved work after reload; confirm source links remain attached; successfully export and restore a complete fixture including its PDF. Record task obstacles and fixes, not just screenshots. No automatic overwrite of an existing proposal or silent transfer between workspaces.

### Stage 2 — Give every room a deliberate visual identity

- Turn the existing chrome/charcoal/ivory/warm-accent palette into documented semantic tokens for text, surface, border, focus, selection and status. Define type scales, spacing, icon sizes, radii and button roles. Check disabled, hover, active, focus, selected and error states as one component family.
- Consolidate shared component rules gradually. Move one component at a time into its owning stylesheet, remove conflicting overrides only after comparison, and verify all routes that use it. Keep the static vanilla architecture; a framework migration is not needed for this goal.
- Art-direct key layouts independently: an editorial project overview, a readable source library, a precise evidence table, a useful relationship map, an uncluttered reader and a focused writing room. Use spacing and typography to distinguish primary work from tools and metadata. Avoid giving every room the same card grid.
- Refine headings, line breaks, text measure, navigation density and form grouping at actual content extremes: long titles, long citations, many sources, empty projects and validation messages. Keep ivory writing fields readable in all inherited states.
- Refine the REI mark, small favicon, loading emblem and icon family as a coherent optical system. Improve the existing identity with original vector work; review small-size legibility before expanding decorative branding.
- Treat mobile as its own composition: prioritize the task, use progressive disclosure for secondary tools, preserve stable actions above the keyboard and account for safe areas. Any conversion of a table to a stacked presentation must retain comparisons, labels and source navigation.

Acceptance: a component/state inventory with before/after proof; comparison screenshots for representative rooms at 320, 390, 768 and 1440px; no document-wide horizontal overflow, clipped menus or obscured inputs. Existing table panels may scroll internally with an accessible label and keyboard focus. Confirm 200% zoom/reflow and long-content fixtures separately.

### Stage 3 — Elevate the signature optical experience

- Make the hero lens feel manufactured: controlled reflections, coherent metal roughness, readable glass thickness, a convincing handle/bezel and restrained lighting. Tune composition around headline readability and touch reach rather than increasing particle count.
- Give the Observatory a stronger narrative: one question becomes a source trail, an extracted finding and a connected argument. Coordinate camera movement, object transformations, typography and captions around those four transitions. Keep illustrative sheets explicitly illustrative; a live project visualization must use actual records and clear provenance.
- Add one original signature interaction, such as inspecting a source sheet to reveal its citation/evidence relationship, with a visible button and keyboard/touch equivalent. Keep it optional and separate from essential navigation. Prototype the interaction before integrating project data.
- Develop distinct desktop and mobile framing. Use a lightweight static or simplified scene when WebGL is unavailable or quality must be reduced; essential text and controls must render without the 3D scene.
- Curate subtle texture, diagrams and composition to give REI its own recognizable research language. Treat Alche, Lumen, Motion UI and Getlayers as inspiration for craft and pacing, not templates to reproduce.

Acceptance: a clear four-beat story, readable hero in landscape and portrait, accessible manual controls, working skip behavior and a tested no-WebGL fallback. Compare visuals on physical screens. No essential feature requires hover, dragging or a long scroll sequence.

### Stage 4 — Choreograph motion and immediate feedback

- Create a motion vocabulary: quick press/selection feedback, controlled menu/dialog transitions, modest route continuity and slower cinematic scene changes. Define easing and interruption behavior; use durations appropriate to the interaction rather than one preset everywhere.
- Improve glass dropdown opening, option focus, selection confirmation and dismissal. Check anchoring during scroll/resize, viewport collisions and virtual keyboards. Preserve native semantics or a fully tested equivalent.
- Make source-to-evidence and evidence-to-proposal actions feel connected through small contextual transitions and clear saved feedback. Animation must follow the actual successful state change, with a distinct failure path.
- Keep document and PDF reading steady. Avoid moving text while selecting it, resetting scroll on autosave, delaying form input or running repeated entrances during local edits. Restore meaningful route focus without repeatedly interrupting a screen reader.
- Respect both the existing motion toggle and OS reduced-motion preference. Replace spatial movement with static state changes where appropriate. Ambient sound remains off by default and optional.

Acceptance: rapid repeated clicks and interrupted navigation do not leave stuck menus, ghost transitions or duplicate controls; keyboard focus returns correctly; saved text and PDF position survive expected navigation. Test OS reduced motion, motion pause and sound settings independently. Document any behavior that differs intentionally.

### Stage 5 — Earn production confidence and presentation quality

- Establish measured performance baselines for home, project library, reader and proposal. Profile loading, input responsiveness, memory and GPU activity under a documented mobile throttling setup. Lazy-load optional scenes, cap pixel density, pause offscreen/background rendering, dispose resources and avoid expensive layered blur on mobile where profiling shows a cost.
- Target Core Web Vitals LCP <=2.5s, INP <=200ms and CLS <=0.1 at the 75th percentile, segmented by mobile/desktop. These are targets, not current results. Lab tests guide development; insufficient real-user field data must be reported honestly. Do not introduce external analytics or transmit research content merely to collect measurements.
- Audit WCAG 2.2 AA: contrast, semantic labels, keyboard access, dialog focus, unobscured focus, status announcements and alternatives to dragging. Use 44px primary touch controls as a REI design target; WCAG AA target-size requirements have different minimums and exceptions. Check focus visibility against glass and ivory surfaces.
- Complete Firefox/Safari and physical iOS/Android tests, keyboard/zoom/reflow checks and at least one screen-reader workflow. Test empty, dense and long-content fixtures; PDF loading/failure, storage failure, backup/import recovery and rapid navigation. Recheck production after deployment.
- Polish copy and credibility: explain what REI does in one sentence, distinguish illustrative examples from research evidence, state local-storage/backup limits clearly and remove vague claims. Add appropriate share metadata, a coherent social preview and an editorial product walkthrough with genuine screenshots.
- Prepare an award presentation only after the product and performance gates pass: original concept statement, short interaction recording, responsive screenshots and a case study explaining how the visual idea helps research. Award entry fees or external submissions require a separate user request; winning cannot be guaranteed.

Acceptance: a release report separating passed checks, failures and untested areas; representative public assets matching the release; no critical open data-loss or task-blocking issues; documented accessibility and performance results. Keep a recoverable release checkpoint and truthful HANDOFF.md.

### Recommended next action and implementation order

Start with Stage 1: audit the three real task journeys and prototype a compact project overview/mobile room switcher. Then build the shared component inventory from Stage 2. Run accessibility and performance baselines early, before committing to Stage 3's more ambitious graphics. Ship each stage with its own review and evidence; do not add another broad CSS patch layer or more motion merely to increase visual complexity.

Likely touchpoints: app.js, research.js, workbench.js and local-search.js for task flows; learning.js/research-room.js for room framing; dream-home.js/atelier-home.js for narrative composition; dream.js/sculptures.js/observatory.js for 3D; motion.js/spatial.js/dream-polish.js for interactions; the active CSS layers and visual-finish.css for component consolidation. Check current file ownership before edits. Keep alternate remote scripts inactive until specifically evaluated.

### Reference standards consulted for this roadmap

- [W3C: WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [new accessibility criteria](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/): focus, target size and dragging alternatives.
- [Google web.dev: Web Vitals](https://web.dev/articles/vitals): performance thresholds and the distinction between lab and field evidence.
- Local ui-ux-pro-max guidance: task navigation, visible keyboard focus and predictable location. These support the roadmap; they do not replace app-specific user testing.

## GitHub/Vercel release — 1 October 2026

User requested publishing all completed local redesign work. Committed the verified immersive redesign and visual finish as cbc27d0. Fetched origin/master and discovered 20 newer commits for a separate moonlight direction (through b66f210). Merged that history without a force push. Resolved index.html in favor of the verified local Observatory/Atelier/visual-finish stack and preserved the tested Motion on/off label. Remote-added files/history remain available; the alternate visual and bridge scripts are not loaded by this release. Remote universe color refinements retained.

Release validation: workbench-core, local-search and reader-regression passed again; all 29 top-level JavaScript files passed syntax checks after merge. Pushed merge commit a5808689c19bc6a25e71a299d29445778eee8c60 to origin/master. Production https://rei-pink.vercel.app/ is verified: index.html plus eight representative redesign assets match committed Git bytes exactly. Initial raw checkout comparisons differed only because of Windows line endings; committed-byte comparisons all passed. Live home browser shows the new magnifier and Observatory/Atelier experience; captured warning/error logs empty. Evidence is in C:/Users/admin/Documents/Codex/2026-10-01/co/outputs/vercel-release-verification.json and vercel-live-rei.png. Local and production origins have separate browser storage; project/notes are not transmitted by this deployment. Previous responsive verification and remaining QA limits are documented below.

## Consistent visual finish — 1 October 2026

Added visual-finish.css and visual-finish.js, loaded last in index.html. Shared typography, spacing, glass controls, tabs, focus states, forms, empty states, disclosure panels, research tables, dialogs and responsive wrapping now use one final layer. Notebook/proposal writing surfaces use ivory and readable ink; fixed competing legacy title/textarea colors and placeholder contrast. Notebook mobile sculpture shortened. Added polite note status, invalid-field semantics and keyboard-focusable named table regions only when they overflow. Existing storage and save workflows retained.

Verified 164 structural route checks: all 63 routes at 1440x960 and 390x844, plus 19 representative routes at 320x740 and 768x1024. No document horizontal overflow, missing main heading or duplicate IDs found. Visually inspected desktop/mobile notebook, mobile dialog and proposal. Checked required validation, notebook search reset, dropdown ArrowDown/Escape and focus return, Explore Escape/focus return, table keyboard region, saved fictional PDF rendering, mobile companion pane switching and closing. Captured warning/error logs empty. 25 top-level JavaScript syntax checks plus workbench-core, local-search and reader-regression passed; git diff --check passed. User-authored contents were not edited.

Evidence/report/screenshots and runnable rei-visual-finish.zip are in C:/Users/admin/Documents/Codex/2026-10-01/co/outputs. Route checks are structural, not exhaustive interaction tests. Physical devices, Firefox/Safari, full accessibility audit, OS reduced-motion emulation, low-end performance and backup restore remain unverified. No commit/push/deployment in this pass. Preview returned to notebook; viewport override reset. Existing runnable repository bundle refreshed.

## Observatory implementation — 1 October 2026

Implemented the researched direction locally. Replaced the earlier SVG research story with an original, lazy-loaded Three.js optical archive: machined lens, engraved bezel, orbiting source sheets, context-focused evidence view, connected argument assembly, and coordinated chapter captions. Desktop scroll advances four chapters; manual tabs and Arrow/Home/End controls remain available. Mobile uses manual chapters. A skip control preserves normal navigation and transfers focus to the next reading section. Refined hero transmission (opacity 1), dark transmission background, reflections and contextual inspection feedback. Added optical-observatory.css separately from the existing observatory.css; existing foundation stylesheet preserved.

Added optional companion desk in Reader and Proposal. Reader keeps the real local proposal beside the PDF/capture workflow; Proposal shows source-linked findings and allows explicit append into the existing draft. Existing DOM controls are moved, not cloned, preserving handlers and PDF state. Desktop separator supports pointer drag, Left/Right and Home/End, with width preference stored locally. Mobile/tablet has a single-pane switch. Closing restores project navigation. Ivory writing surface and restrained warm accents complement the charcoal/chrome system. No new framework, external asset requests, accounts, schema changes or paid service. Corrected Synthesis ordering in shared project transitions.

Verified: bundled Node syntax checks for new/changed scripts; workbench-core, local-search and reader-regression tests; git diff --check. In-app browser: local PDF opened alongside proposal; fictional companion draft and source-linked insertion persisted after reload; fictional QA draft restored afterward; separator ArrowLeft changed 60 to 58; close restored navigation; chapter click/End keyboard, native scroll progression and inspection feedback worked; motion pause made story non-sticky and was restored. 390px home/story/Reader/Proposal and 768px companion checked without document horizontal overflow; desktop checked at 1440x960. Native browser skip action preserved #home and focused the next reading heading. Browser captured warning/error logs empty at inspected checkpoints. User research was not edited. The original QA fixture remains local.

Limits: Firefox/Safari, screen-reader audit, OS reduced-motion emulation, real touch and low-end GPU testing, field Core Web Vitals, complete-backup download/restore and full all-route regression remain unverified. The story uses clearly labeled illustrative sheets, not live project data. The actual companion desk uses local project data. No commit, push or deployment performed in this pass. Current browser preview is http://127.0.0.1:4187/#home. Runnable bundle refreshed; public Vercel remains the previously deployed version.


## Optical Research Atelier enhancement — 1 October 2026

Added atelier-home.js, atelier.js and atelier.css. Original interactive research story transitions between question, sources, evidence and argument, with glass instrument, silver orbit lines and restrained violet accents. Arrow/Home/End tab keyboard behavior and real destination links. Orbit pauses offscreen and honors motion preference. Navigation directory now previews focused/hovered destinations. Research desk gets reversible focus mode and a live Markdown-heading outline with jump-to-heading selection in the proposal editor. Refined hero typography and optical interaction hint. Existing 3D magnifying-glass controls, all routes and local storage preserved.

Validation: syntax checks and existing workbench-core, reader-regression and local-search tests passed; git diff --check passed. Browser optical stage selection and ArrowRight checked. 390px optical story showed no horizontal overflow. Motion pause resulted in animationName none and was restored. Focus room concealed project rail and restored through Show project navigation. Fictional proposal headings appeared in outline; Methods selected the corresponding heading in the editor. Directory preview updated on keyboard focus. No user-authored research changed; existing fictional QA proposal was updated with test headings. Full cross-browser, backup restore and performance benchmarking remain unverified as documented in stage 4. No commit, push or public deployment.


## Stage 4 — final polish and targeted regression

# REI final design pass — 1 October 2026

All four design stages are implemented locally. No commit, push or public deployment was performed.

## Final changes
- Brought the notebook, proposal draft and readiness surfaces into the glass/chrome design system.
- Unified visible focus outlines, disabled controls, editor typography and mobile form spacing.
- Removed overlapping learning entrance animations and tilt on large resource rows.
- Fixed the PDF reader's malformed saved-page key and cleanup failures when reopening documents.
- Added a targeted PDF regression test for page persistence, bounds, extracted text and cleanup variants.

## Verified
- Syntax checks for the changed design, application and research scripts.
- Workbench-core, local-search and reader-regression tests pass; whitespace checks pass.
- Saved local PDF fixture renders with selectable text and reopens successfully.
- Keyboard Enter opens the directory; Escape closes it and returns focus to Explore REI.
- Keyboard motion toggle works and paused preference survives reload; motion restored afterward.
- At 390px: homepage, academy, journey, toolkit, workshops, notebook, draft, readiness and lesson writing had no document horizontal overflow.
- Tablet notebook at 768px had no document horizontal overflow.
- Stage 3 previously checked all nine research routes on desktop/mobile and fictional local source, evidence and proposal persistence.
- Final captured browser error logs were empty.

## Verification limits
- Complete-backup export was clicked, but the browser download event timed out. Completed download and restore were not verified.
- OS reduced-motion emulation, full screen-reader audit, every keyboard/form state, real touch devices, Firefox/Safari and low-end performance benchmarking were not completed. Implemented safeguards are not formal accessibility/performance certification.
- QA uses the explicitly fictional design project and local PDF fixture; user research was not edited. Local browser storage was preserved.

Preview: http://127.0.0.1:4187/#home



## Stage 3 — contextual research desk (2026-10-01)

Added research-room.css and research-room.js. Replaced the horizontal project tabs with a numbered, sticky glass sidebar on desktop and a two-column destination menu on mobile. All nine destinations, real routes, forms and storage contracts remain. Applied optical surfaces, typography, readable editors, restrained section entrances and disclosure animations to projects, Library, Reader, Evidence, Claims, Synthesis, Design, Map, Proposal and Review. Corrected inherited content width and heading centering. New animations cancel on motion pause and route changes; editors are not animated.

Verified bundled Node syntax for changed research scripts; existing workbench-core and local-search tests passed; git diff --check passed. Browser opened all nine destinations and confirmed active sidebar destinations. Mobile 390px inspected all nine with no document horizontal overflow. Fictional design QA project saved a source, source note, evidence note and proposal; evidence persisted after reload, source note and proposal survived navigation. Browser captured error logs were empty. QA data is explicitly fictional and remains only in the existing local preview QA project. No user-authored research modified. Reader UI checked; attaching/rendering a PDF, full exports/restores, keyboard, screen reader, cross-browser and performance checks remain for stage 4.

Stages 1-3 implemented as local previews. Stage 4 final polish/regression remains. No commit, push or deployment for this design pass.


## Stage 2 — editorial learning rooms (2026-10-01)

Added learning.css and learning.js, scoped to academy, journey, toolkit, workshops, lessons and resource/session guides. Larger sans-serif hierarchy; editorial lesson rows; sequential phase sections; stacked workshops; glass filter/step controls; readable writing surfaces; contextual edition navigation; cancellable scroll entrances. Existing particle illustrations, routes, draft handlers and local storage retained. Motion preferences respected; pause cancels new entrance animations. No new dependency or paid service.

Verified: bundled Node syntax and existing workbench-core/local-search tests passed; git diff --check passed. Browser academy search/phase filter, toolkit Evidence filter, lesson Learn/Example/Write/Check transitions, correct quiz feedback and workshop/resource guide navigation checked. Mobile 390px horizontal overflow absent on inspected academy, journey, seminars, workshop guide, lesson writing, toolkit and resource guide. Motion toggle set off and was restored. Draft textarea present with expected stage binding; full autosave/download/export, all lesson states, keyboard, cross-browser and performance regression remain for stage 4. QA answered lesson 4 check on the local preview origin; no user draft text modified. No commit, push or deployment.

Next: stage 3 research workspace and contextual sidebar. Stage 4 full polish and regression. Stage 1-2 are local previews, not a verified public release.


## Stage 1 — realistic optical instrument and richer motion

Rebuilt the hero as a magnifying glass with beveled annular metal housing, curved glass, grip, collar and reflective trim. Added mouse drag plus Rotate/Inspect/Reset controls, enlarged inspection, pointer response and scroll transformations. Added dream-polish.js for menu stagger, button ripples and scroll parallax, alongside hover border sweeps and link movement. Referenced user-approved motion libraries without importing React or copying premium source. Desktop drag and controls and mobile 390px/no-overflow inspected; no console errors observed. Syntax, existing workbench-core/local-search tests and whitespace checks passed. Full cross-browser/performance/accessibility regression remains stage 4. Stages 2–4 remain unimplemented in this pass.

## Stage 1 refinement — lens identity

User approved the overall direction but rejected the knot sculpture and logo. Replaced both with a glass research lens and connected points, including SVG logo fallback and favicon. Retained pointer/scroll response and particles. Syntax/whitespace checks passed; desktop scene inspection showed no console errors. Four total redesign stages remain the agreed structure.

## Design continuation — 2026-10-01: Dream Laboratory, stage 1

Approved direction: original immersive redesign in stages, charcoal/silver/liquid chrome, glass plus evolving particles, oversized clean sans-serif, minimal header and full-screen navigation, expressive motion across the site. Keep REI logo and all working research features/storage. Mobile retains rich visuals within device capacity. Optional ambient sound starts off. Reference direction: Alche and GetLayers; exact MotionUI/Lumen references remain unconfirmed.

Implemented stage 1:
- New original homepage composition with oversized typography, editorial sections, connected-space links, and existing learning/progress destinations.
- Locally rendered Three.js chrome form with glass orbital lenses and surrounding particles; responds to pointer and scroll, uses a generated reflection environment and CSS fallback, and disposes resources on route changes.
- Minimal global header and full-screen glass directory retaining existing destination search and Ctrl/Cmd K navigation.
- Shared glass buttons, inputs, dropdowns, optical hover highlights, magnetic homepage CTAs, tilted particle illustrations, entrance/reveal animations, and desktop cursor accent.
- Glass dropdowns preserve underlying native select/form state and existing change handlers. Arrow keys, Enter, Escape, Tab and type-ahead supported.
- Local synthesized ambient sound with explicit on/off control; starts off each page load and fades when page is hidden. No external audio assets or requests.
- Motion pause/reduced-motion support, offscreen scene pause, 30fps scene budget and capped rendering resolution.

Validation actually completed:
- Syntax checks for dream.js, dream-home.js and app.js; existing workbench-core and local-search tests passed; git diff --check passed.
- In-app-browser desktop and 390x844 mobile homepage inspected, WebGL scene rendered, no horizontal overflow in inspected homepage states.
- Full-screen menu opened/closed on desktop and mobile; directory search for methods returned three results and concealed the directory grid.
- Starter-template dropdown opened, ArrowDown + Enter selected Literature review and updated the underlying native selection.
- Animation pause toggled document motion state. Audio on/off UI toggled and reset to off on reload; audio fidelity was not independently assessed.
- Fictional project created and reopened in Library with saved-on-device status; local browser error logs were empty in inspected routes.
- Mobile sculpture/copy overlap fixed during visual review.

Remaining: user review of stage 1; public-page/lesson layout redesign; contextual research sidebar and full reader/evidence/claim/synthesis/design/proposal/review redesign; lower-page full regression; OS reduced-motion emulation, full keyboard/touch, low-end-device performance, Safari/Firefox, audio fidelity and complete storage/export regression. Do not claim the whole website redesign or formal accessibility/performance certification is complete. No commit, push or deployment performed for this design stage.

Files: dist/dream-home.js, dist/dream.js, dist/dream.css, integration in dist/app.js and dist/index.html; approved direction in design-system/rei-dream-laboratory/MASTER.md. Prior local-search changes are retained.


## Continuation update — 2026-10-01: local workspace search

Implemented a read-only search panel on the research project overview. It searches project questions, source metadata and reading notes, evidence passages and findings, claims, decisions, proposals, learning notebook notes, and lesson drafts. Workspace and content-type filters, excerpts, section links, empty-state guidance, and a polite result-count announcement are included. Results are capped at 100 visible entries with refinement guidance. Search operates in this browser without accounts or network requests.

Files: `dist/local-search.js`, integration in `dist/research.js` and `dist/index.html`, and `tests/local-search.cjs`.

Validation: local-search tests and existing workbench-core tests passed; syntax checks for both changed scripts and git diff whitespace checks passed. Browser visual, keyboard, mobile, and large-project performance checks have not been completed in this continuation. Links open the relevant section; they do not focus an individual record. Unsaved forms and PDF binary contents are not indexed. Workspace filters currently group projects with identical titles.

Changes are local and have not been committed, pushed, or deployed in this continuation. Next: verify browser interaction and performance, then consider individual-record navigation and project-ID-based filters. Preserve the free/local-first product direction.


## Current continuation update — 2026-09-25: research depth pass

The latest work is pushed to `master` through commit `ddb11e7`. The repository is clean and synchronized with `https://github.com/hoshixdd/REI`.

### Implemented since the previous handoff

- Research form drafts survive switching between project sections and restore with a visible local-draft message. Successful submission clears the draft.
- PDF restore validates attachment ownership, data URL format, PDF signatures, and stages records before IndexedDB writes.
- The PDF reader remembers the last page separately for each project and paper.
- Mobile research navigation remains visible while scrolling.
- Research progress feedback shows the four foundational areas: sources, evidence, proposal, and research design.
- The research argument debugger adds transparent prompts for unsupported claims, one-note claims, unlinked evidence, unresolved challenging evidence, incomplete comparisons, proposal text without claims, and missing design fields. These are prompts, not scientific scores.
- Evidence notes now support researcher-authored source-quality context: study type, sample or material, transferability or boundaries, conflicts or funding, and confidence in the interpretation.
- Research Design includes a separate readiness map for question clarity, source coverage, evidence traceability, method alignment, ethics planning, feasibility, proposal coherence, and review readiness.

### Current validation

- `tests/workbench-core.cjs` passes after the research-depth changes.
- `node --check` passes for the changed research and workbench modules.
- The repository is clean and pushed to GitHub.
- Full Playwright browser suites remain environment-blocked because browser automation hangs in the current restricted runtime. Do not claim those suites passed.

### Next implementation order

1. Cross-project local search across papers, passages, findings, claims, decisions, proposals, notes, and lesson drafts.
2. Synthesis matrix and thematic coding tools.
3. Review modes with unresolved actions for evidence, methods, ethics, and supervisor feedback.
4. Rich exports: evidence matrix, claim graph, source audit, decision journal, and supervisor packet.
5. Toolkit resource progress tracking.
6. Broader mobile, accessibility, and cross-browser QA.

### Product direction

REI should compete through transparent research reasoning rather than paid discovery or automatic scoring. Keep the evidence chain visible: question → claim → evidence note → exact passage → source → limitation. Preserve researcher control, fictional or non-personal test data, explicit consent, teacher or supervisor review, and no automatic scientific judgment.

Cloud accounts, sync, live provider discovery, AI extraction, OCR, collaboration, citation services, and AR/VR remain future work requiring external service or plan decisions.

## Current handoff — 2026-09-22: free research workbench

This section is the current source of truth; older sections below describe historical releases. The user requested immediate publication of the current version and a continuation handoff. The broader innovation roadmap is not complete.

### Product and cost constraints

- Product name: REI. Repository: https://github.com/hoshixdd/REI (master). Production: https://rei-pink.vercel.app/.
- Stay on the free/local-first path. No required paid APIs, AI subscriptions, or cloud accounts were added. No keys or credentials are needed for the new workbench.
- Preserve the interactive particle direction, glass logo, and recently shortened transitions. The user rejected solid decorative sculptures and crowded/high-force particles.
- Existing learning lessons, notebook, toolkit, and research functionality remain. Research data is separate from the learning notebook.

### What this version adds

Project navigation now includes Library, Reader, Evidence table, Claims, Research design, Literature map, Proposal studio, and Review & history.

1. CSV, RIS, and basic BibTeX imports with preview, selection, duplicate DOI/title exclusion, and library/bibliography exports. Complex BibTeX macros are not expanded.
2. Local PDF attachment and rendering using vendored Mozilla PDF.js 6.3.289. Page navigation, extracted selectable text, and passage capture with a PDF page locator. Exact quotations remain separate from researcher interpretations. No OCR; scanned PDFs may have no extractable text. Selection operates in the extracted text panel, not an overlay on the PDF image.
3. Claims with supporting/challenging/mixed/uncertain evidence links, editing, review state, and insertion into the proposal with source details and stable evidence IDs. Linked evidence cannot be removed until unlinked from claims/comparisons.
4. Objectives, measures, collection methods, analysis plans, and alignment rationales. Transparent completeness checks; these do not assess scientific validity.
5. Collection coverage table and manually authored comparisons of two evidence notes. These cannot establish that a gap exists in the entire literature.
6. Expandable question/claim/evidence/source outline above the existing citation map. This is an accessible project model, not a full spatial/VR digital twin.
7. Defense rehearsal prompts, decision journal, search log, and the latest 20 proposal/question snapshots. Changing the research question creates a snapshot and requests a design review. Draft restoration saves the current draft first.
8. Markdown review package, standalone readable HTML review, storage estimates, optional persistent-storage request, and complete JSON backup/restore including PDFs.

### Files and storage

- `dist/workbench-core.js`: pure import parsing, duplicate planning, workbench normalization/validation, completeness checks, bibliography.
- `dist/workbench.js`: feature views and event handling, PDF lifecycle, attachment storage, exports, and integration API.
- `dist/workbench.css`: responsive workbench layouts using existing REI styling.
- `dist/research.js`: original project store and routes; calls the workbench extension. `persist` clones the selected project before asynchronous writes.
- `dist/index.html`: loads core and workbench before research/app; asset token `rei-workbench-20260922`.
- `dist/vendor/pdfjs/`: local PDF.js module/worker, CMaps, fonts, WASM, and license. Lazy loaded when a PDF is opened. No runtime CDN needed.
- IndexedDB `rei-research` / `projects`: project records. `project.workbench.version = 1` holds new records.
- IndexedDB `rei-documents` / `files`: PDF blobs keyed by project ID and paper ID. Normal project JSON backups exclude PDFs; Review & history offers complete backups.
- Limits: 5 projects, 200 sources/project, 2 MB reference imports, 20 MB/PDF, 60 MB attachments/project, 100 MB backup restore input. Browser storage can still be cleared; keep external backups.
- Localhost and Vercel use different browser storage. Restoring creates a separate project; existing projects are not overwritten.

### Validation actually completed

- `tests/workbench-core.cjs` passed: quoted/multiline CSV, RIS authors/year, nested BibTeX, malformed imports, duplicate planning, broken evidence-link validation, PDF attachment validation, and missing design fields.
- Browser QA on a fictional local test project: imported two distinct sources while excluding a duplicate; rendered a locally generated PDF; extracted text; saved passage/page/finding; created a claim; linked evidence; inserted it into a proposal; saved a complete objective and methods plan; saved rehearsal answer and milestone; checked storage feedback.
- Exported complete JSON backup to Downloads, validated its contents with the core validator (2 sources, 1 evidence note, 1 claim, 1 objective, 2 snapshots, 1 PDF), restored as a separate project, and reopened the restored PDF successfully.
- Reader layout at 390px: one-column layout and no horizontal overflow. Console error checks passed on the inspected workflow.
- All-section mobile QA was interrupted after a browser-control timeout while moving from Evidence to Claims. Do not describe the entire mobile suite as passed. No full end-to-end automated browser suite was run in this pass.
- The readable HTML review export was implemented after the backup check and still needs a dedicated visual/export check. PDF text-selection capture button, comparisons, deletion guards, draft restore, reduced-motion traversal, and large/complex PDF cases need further dedicated QA.

### Continue here next

1. Resume QA with a local server and a fictional test project. Test remaining mobile sections, import variants, evidence unlink/remove guards, two-note comparisons, snapshot restore, and both review exports. Check keyboard navigation and reduced motion.
2. Improve recovery of partially completed forms when switching views; most forms currently save on explicit submission. Proposal and paper reading notes retain existing autosave behavior.
3. Strengthen attachment lifecycle/concurrency tests (switching sources/routes while reading, replacement, quota failures, malformed backups) and large-project performance checks before increasing limits.
4. Build on this working evidence-to-proposal foundation. Live discovery, Supabase accounts/sync, collaboration, AI extraction/chat, OCR, formal citation-style formatting, automatic contradiction detection, and full AR/VR/presentation modes are NOT implemented. Existing free setup scaffolding does not mean a backend is connected.
5. Keep the handoff truthful about what is implemented versus the broader roadmap. Never label completeness checks as a scientific quality score or claim reviewed-collection gaps prove novelty.

### Run and deploy

Static vanilla JS application; no build or npm installation is required. Serve `dist` locally on port 4173 with Python. Run `node tests/workbench-core.cjs` and `node --check` on changed scripts. `vercel.json` deploys `dist` directly; pushing master triggers the existing Vercel integration. Verify live asset contents after deployment rather than assuming a successful push means the site updated.

The tracked `outputs/research-ready-hub.zip` is a historical filename for the current distributable and is refreshed with this release. Test fixtures and scratch scripts under `work/` are ignored and are not shipped.

---


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

## Current research depth checkpoint — 26 September 2026
- Implemented the requested free/local improvements across Research Studio without requiring accounts, paid APIs, or cloud services.
- Synthesis matrix: researcher-defined themes with definitions and colors, evidence coding memos, multi-theme rows, safe coding removal, and `rei-synthesis-matrix.csv` export. Evidence rows now show finding/relevance, method/context, limitations, and theme columns.
- Review action queue: generated unresolved prompts from the existing checks plus manual supervisor actions. Prompts can be marked done; manual actions can be completed or removed.
- Source audit: checks source author/year/venue/DOI-or-URL metadata, evidence findings/limitations/confidence/locations, and claim traceability. Exports `rei-source-audit.csv`.
- Method alignment worksheet: objective, measure, population, sample, collection, analysis, ethics, feasibility, expected output, and rationale. Existing design records remain loadable; missing new fields appear as explicit prompts.
- Student starter templates: blank, literature review, survey, interview, and experiment/evaluation. Templates seed a starting question and method plan when creating a project; students can edit or replace every field.
- Supervisor review packet: exports question, open actions, source audit, complete method alignment plan, synthesis themes/coding, comparisons, claims/evidence, student reflection, and bibliography as `rei-supervisor-packet.md`.
- Evidence removal now also respects synthesis coding links. A note must be unlinked from claims, comparisons, and themes before removal.
- Validation: `tests/workbench-core.cjs` passed; `node --check` passed for `dist/research.js`, `dist/workbench-core.js`, and `dist/workbench.js`; `git diff --check` passed. Browser inspection covered the existing project, Synthesis matrix, Review & history, method alignment, starter-template controls, and empty/error prompts. Browser console logs were empty on the inspected routes.
- Full all-route Playwright regression, formal accessibility certification, cross-browser testing, and Vercel production verification remain incomplete. These features are researcher-authored prompts and organization tools, not automatic scientific judgments.

## GitHub and Vercel release checkpoint — 26 September 2026
- GitHub `master` is synchronized with the research-depth release and this deployment checkpoint on `https://github.com/hoshixdd/REI` (feature commit `36b9767`; the handoff metadata was committed immediately after it).
- The current build was deployed with the authenticated Vercel CLI to the existing `probablecause/rei` project on the Hobby plan.
- Production alias: `https://rei-pink.vercel.app`.
- Deployment inspection: `https://vercel.com/probablecause/rei/32swGBoT7ptj7kVkmmz8qdjQXRB9`.
- Verification completed after deployment: the production alias returned HTTP 200; the root page served the REI app; the public `workbench.js?v=rei-research-depth-20260926` asset returned HTTP 200 and contained the supervisor packet and synthesis export implementations.
- Vercel created local `.vercel` and `.env*` ignore rules. No credentials or generated environment files were committed.
- Vercel production is updated for this release. Full all-route regression, formal accessibility certification, cross-browser testing, and performance testing are still pending.
