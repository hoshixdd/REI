# Optical graphics and motion pass — 11 October 2026

The quiet laboratory now has a consistent instrument language across navigation, learning, tools and research. Nine locally authored mesh assemblies use the existing Three.js renderer: lens, archive, prism, junction, weave, balance, orbits, folio and aperture. The interface remains usable through a static fallback when WebGL is unavailable.

| Before | After | Why |
| --- | --- | --- |
| Particle fields served nearly every page illustration. | Nine silver/glass instruments appear in headings, lesson covers, roadmap phases, toolkit resources and the navigation gallery. | Give destinations a recognizable identity without adding external assets or services. |
| Several entrance systems animated the same content; menu items staggered separately. | One short menu entrance, one route transition, restrained selection indicators and local surface highlights. | Maintain continuity and make repeated work feel immediate. |
| Heading graphics and controls inherited conflicting flex/position rules. | Dedicated desktop composition and stacked mobile composition; research thumbnails stay compact. | Keep text, graphics and controls from colliding. |
| Writing-step metadata had low contrast against the selected pale tab. | Dark selected text and stable writing surfaces. | Improve legibility without moving the editor. |
| Quiet decorative models would redraw continuously. | Visible quiet models render on first display, refresh or pointer exploration, then settle. | Reduce unnecessary GPU drawing while preserving interaction. |

Motion review findings resolved:

| Finding | Resolution |
| --- | --- |
| Repeated 750–1000ms content entrances and large click pulses competed with reading. | Removed repeated content entrances and click pulses. |
| Page/menu interactions were slower than their task frequency justified. | Root entry 240ms; chapter entry 180ms; menu 220ms; selection 180ms; disclosure/submit feedback 140–160ms. Hero introduction remains a single 650ms expressive entrance. |
| Keyboard activation replayed pointer-oriented transitions. | Keyboard routes bypass the transition; stage captions, disclosures and submit feedback skip keyboard animation. Rotation/reset remain immediately available. |
| Old portal and shared-element rules overrode the faster root rules. | Final stylesheet owns root and shared-surface timing. Motion pause and reduced-motion rules remain in place. |

Verification completed:

- Nine focused suites: research-depth, method-flow, synthesis-depth, workbench-core, research-flow-save, reader-regression, local-search, project-navigation and lesson-transfer.
- Syntax checks for all eleven changed/new scripts; whitespace checks.
- All nine instrument assemblies instantiated with the local Three.js library: nonempty finite geometry and finite world bounds.
- Browser layout batch at 1440×1000 and 390×844: 23 representative routes per width, including all nine research rooms, lesson Learn/Example/Write/Check, homepage, Academy, Journey, Toolkit, a resource, workshops and three notebook views. No document overflow in that batch.
- Visual review of settled desktop/mobile headings, navigation gallery, home lens, lesson writing and research views. Repaired heading positioning, gallery visibility/first rendering and selected-tab text contrast.
- Academy and toolkit filtering retain the correct instruments; actual lesson-card and chapter navigation work; Escape closes navigation and restores focus; pause/resume and keyboard rotation/reset verified. Paused selection transition is 0s.
- Fictional fixture only: the saved proposal still has its original 198 words. No project schema, saved research records, PDF storage or backup format changed. Browser error logs were empty on inspected routes.

Limits: this is Chromium/in-app browser coverage, not physical touch, Firefox/Safari, screen-reader certification or a performance benchmark. OS reduced-motion guards were reviewed in code; an OS preference change was not exercised. No paid services, required accounts or cloud backend were introduced. Screenshots and route logs are in the current chat's outputs folder.
