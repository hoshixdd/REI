# REI — Dream Laboratory

Approved direction, 2026-10-01. This direction supersedes the older visual recommendations; storage and feature behavior remain compatible.

- Entire website, staged implementation; one cohesive working direction before refinement.
- Keep REI name. The user requested replacing the old knot logo and sculpture; use a research lens with connected light points. Freely evolve particle forms, composition, layout, navigation, and visuals.
- Charcoal #090a0c, silver #eef0f2, muted #a8abb2; liquid chrome and restrained iridescent reflections.
- Oversized clean sans-serif: bundled Manrope for display and DM Sans for readable interface text. No external font requests.
- Dreamlike laboratory: flowing glass forms and evolving particles, layered scroll transformations, immersive motion throughout.
- Minimal header, cinematic full-screen navigation, contextual research sidebar.
- Glass buttons and dropdowns; magnetic hover, pointer highlights, tilt, text entrances, transitions, desktop cursor accent, optional ambient sound off by default.
- Real links, semantic forms, keyboard-visible focus, natural scrolling, reduced-motion and explicit pause controls. Essential reading text stays stable and readable.
- Mobile should retain spectacle within device capacity; measure frame pacing, avoid simultaneous offscreen rendering, and degrade gracefully without WebGL.
- No changes to research IndexedDB schema, PDF storage, or rrh-v2 learning workspace.

## Stages
1. Foundation, original homepage, navigation, chrome/glass 3D, shared interactions and audio.
2. Journey, academy, toolkit, workshops, lessons.
3. Research overview and contextual sidebar, reader, evidence, claims, synthesis, design, proposal, review.
4. Complete mobile, keyboard, performance and cross-browser pass; iterate with user on each stage.

References: Alche https://alche.studio/ and GetLayers https://www.getlayers.ai/. MotionUI and Lumen exact URLs are unconfirmed. Original graphics and scene code; no copied proprietary assets.

## Stage 1 optical refinement and future motion references
The user requested a realistic, interactive magnifying glass instead of the flat lens. Use machined metal rim, curved glass, a dark grip and reflective handle trim. Pointer tilt, mouse drag, Rotate/Inspect/Reset buttons and scroll response. Added menu stagger, click ripples, scroll depth, border sweeps and link motion.
References approved across stages 1–4: https://github.com/pmndrs/react-three-fiber, https://animmasterlib.dev/, https://www.vengenceui.com/components, https://skiper-ui.com/. Review relevant model-viewer, stagger-text, glass-dock, hover and scroll patterns at each stage. Current implementation remains native Three.js and Web Animations; no React migration or premium source copied.
