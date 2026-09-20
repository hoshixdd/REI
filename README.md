# Research Ready Hub

A self-contained, responsive research learning site with nine lessons and a local research workspace.

## Open the site

Extract the ZIP, then serve its folder with a static web server. If Python is installed, run `python -m http.server 4173` from the extracted folder and open `http://localhost:4173` in a browser. No package installation or build step is required.

The workspace saves to the browser's local storage. Keep the same browser and site address to return to your work. Changing the hostname or port creates a different storage location. Use **My workspace → Backup** before moving to another device or address; use **Restore backup** at the new address.

## Included

- An original cinematic research atlas with up to 26,000 GPU particles morphing between a flowing sphere, spiral field, and helix. Phase controls update the scene and next-step destination; pointer and scroll movement influence the field.
- A nine-milestone research roadmap with local progress tracking.
- Nine lessons split into 36 focused pages: Learn, Example, Write, and Check.
- Auto-saved lesson writing assembled into a proposal draft.
- Six downloadable resources with individual resource guides and search.
- An idea notebook with search, editing, unfinished-draft recovery, deletion, and undo.
- Markdown exports and JSON backup/restore.
- A 27-item proposal readiness self-review.
- Three self-guided workshops, each with a dedicated agenda page.
- Coordinated entrance and scroll transitions, global motion controls, and reduced-motion support.
- Local font files, bundled Three.js, and their open-source licenses.

## Scope

This version does not include user accounts, cloud synchronization, an AI service, community features, or real seminar recordings. No recordings were supplied. Workshop materials are original self-guided activities, not recordings of past events. Academic examples are illustrative, not findings from real studies. Follow institutional and supervisor requirements.

Work is stored locally, without account authentication or automatic cloud backup. Do not use the notebook for identifiable research-participant records. Anyone with access to the browser profile may be able to access saved work.

## Files

- `index.html`: application shell
- `styles.css`: design system and responsive layout
- `app.js`: navigation, lesson interactions, storage, notebook, exports, and dialogs
- `data.js`: lessons, examples, resources, and further-reading links
- `universe.js`: particle shaders, phase morphing, pointer response, and WebGL lifecycle
- `atlas.js`: interactive atlas controls and accessible lesson chapter navigation
- `motion.js`: route entrances, scroll reveals, and motion preference
- `future.css` and `observatory.css`: visual layers and responsive scene layouts
- `fonts/`: bundled font assets and licenses
- `favicon.svg`: browser icon

## Validation

Checked lesson search and filtering, quizzes, completion, persistence after reload, proposal assembly, note create/edit/delete/undo, unfinished edits, migration from the earlier notebook, backup restoration, all six resource downloads, readiness checks, keyboard navigation, mobile navigation, reduced motion, and responsive layouts at 375, 768, and 1440 pixels. Enlarged text and landscape layouts were also reviewed. This is functional and visual QA, not a formal accessibility or security certification.


The latest visual pass also checked keyboard phase selection, a pixel-stable paused scene after transitions settle, motion preference persistence, lesson chapter focus, and nine layouts with text enlarged to 200%. Visual references: Alche Studio and the public GetLayers Vesper preview. The implementation and graphics are original; no premium templates were downloaded.


## Spatial interface update

- Distinct live WebGL graphics across the academy, roadmap, toolkit, workspace, and workshop pages.
- Spatial page transitions with browser fallback, reduced-motion support, and safe cancellation during rapid navigation.
- Explore hub directory (Ctrl/Cmd + K), with keyboard focus and Escape handling.
- Focus-reading mode for lessons, clearer page headings, and separate writing/checking steps.
- Additional files: spatial.css, spatial.js, navigation.js.

Validated all 36 lesson routes, 36 responsive route/viewport combinations, browser Back/Forward, missing-draft completion guard, resource download, quiz completion, draft persistence across pages, inner-page WebGL, directory keyboard controls, focus mode, and enlarged text. This remains a local browser application; no headset/camera AR or WebXR session is implemented.


## Search and lesson resumption
Use **Explore hub** or **Ctrl/Cmd + K** to search lessons, resources, workshops, and workspace pages. The academy offers a resume link to your last lesson step. Lesson tabs show saved word counts and checked-answer status. Search supports arrow keys, Enter, and Escape. Resume information is included in JSON backups; earlier backups still load.

## Lesson visual design
- Research Fieldnotes lesson identity: editorial numbered reading sections, contrasting example spreads, a light writing studio, and split-screen knowledge checks with live particle graphics. Responsive layouts retain keyboard-accessible answer controls and existing motion preferences.
