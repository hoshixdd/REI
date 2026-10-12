# Connected research learning — 12 October 2026

## What changed

The Academy now connects the existing nine milestones with two original fictional teaching projects: a qualitative study of working students’ experiences of study planning, and a quantitative study of the association between paid-work hours and planned study hours. Each has nine worked outputs, a reason for each decision, an explicit limitation and the same three invented evidence records throughout. The final example also assembles earlier outputs into a readable provisional proposal. Teaching sources, sample counts and findings are explicitly invented and must not be cited in real research. No study has been conducted or approved.

Writing support defaults to guided explanations for stages 1–3, hints for 4–6 and independent attempts for 7–9. Learners can override that progression at any stage; college year does not determine assumed competence. Existing project writing remains in the original editor. Teaching text is not automatically inserted into real projects.

Check pages add 27 scenario questions, with feedback specific to every alternative, and nine written reasoning exercises. Scenarios address scope, unsupported causal claims, contrary evidence, search documentation, provisional gaps, objectives, sampling bias, interpretation and proposal coherence. A changed choice hides its old feedback. “Try choices again without feedback” clears the scenario choices and explanations while retaining written reasoning. A nonempty written attempt enables comparison with self-review prompts and one defensible explanation; editing hides the model again. Written work is not automatically graded.

The methods lesson adds six expandable guides covering design, sampling, collection, qualitative analysis, quantitative analysis and ethics/limits. The research Design room offers the same guide beside the existing alignment worksheet. A question/evidence/analysis/claim diagram in lessons 6 and 8 and Design responds to question, collection and selection choices, explains both possible fits and mismatches, and distinguishes selection from treatment assignment. The desktop chain becomes an ordered vertical sequence on phones. The sandbox does not change project records or certify a design.

The original milestone gate still requires a working draft and the quick concept check. New practice is deeper self-guided review, not an automatic mastery assessment. Readiness labels now say “Question recorded,” “Sources recorded,” “Method fields recorded,” “Draft and claims recorded” and “Review and decisions recorded,” avoiding quality claims based only on populated fields.

## Data and recovery

An optional normalized `learningLab` field travels in the existing `rrh-v2` learning notebook JSON backup. It contains the selected example, support preference, scenario choices/feedback state and written attempts. Old backups reset this optional field rather than inheriting practice from the workspace they replace. Imported attempts accept only nine stages and valid alternatives; written responses have the existing 100,000-character limit. New content is escaped before rendering.

Saving failures retain the current response in the open page and its downloadable notebook backup, and explicitly report that device persistence failed. Closing/reloading before a successful save or export can lose that session-only response. There is no account, cloud database, paid API or new dependency. Research IndexedDB stores, PDFs and project schemas are unchanged. Project backups and learning notebook backups remain separate.

## Content basis

All teaching cases and practice wording are original. Instructional choices draw on the [IES practice guide](https://ies.ed.gov/ncee/WWC/PracticeGuide/1): alternate worked examples and attempts, connect graphics with explanations, use retrieval and explanatory questions. These recommendations support the design rationale; they do not demonstrate that REI itself improves learning.

Method links point to [Penn State’s collection/design guidance](https://online.stat.psu.edu/stat200/Lesson01), [sampling and design guidance](https://online.stat.psu.edu/stat100/Lesson02), [OpenStax on gathering data](https://openstax.org/books/contemporary-mathematics/pages/8-1-gathering-and-organizing-data) and [Braun and Clarke’s reflexive thematic analysis guidance](https://www.thematicanalysis.net/doing-reflexive-ta/). Direct fetching of some methods pages timed out; their primary-source search records were available. The guides remain concise orientation rather than a complete methods curriculum. Follow disciplinary and institutional requirements.

## Release

Feature commit 2b1224e was pushed to master. After an initial hosting delay, the production root and six changed/new learning assets returned HTTP 200 and matched this release after CRLF normalization. The download ZIP includes the three new learning files and refreshed README.

## Validation

- New learning suite exercises the actual app startup, normalization and saving: original drafts/completions survive new writes; new attempts round-trip through the import sanitizer; old backups start with empty practice; malformed answers are filtered; saving failure retains the exportable session response. All 18 sandbox combinations distinguish fit from mismatch. Eighteen worked stages and 27 sets of alternative-specific feedback are present.
- Nine existing focused research workflow suites passed. Changed scripts passed syntax checks and whitespace checks.
- Browser batch covered all 36 lesson routes at 1440px and 390px, without document overflow; all Check pages have three scenarios, Example pages have the connected case, and Write pages retain the original editor.
- Actual browser interactions verified example switching, evidence disclosure, automatic guidance and override, incorrect/correct feedback, changed-answer invalidation, written comparison, reload recovery, fresh attempts and exported backup contents. Temporary practice text and answers were cleared afterward; original lesson drafts were not changed.
- Methods sandbox mismatch/fit and keyboard native selection were verified. Design guide has six method sections; the expanded teaching proposal has seven connected sections and no phone overflow. Native controls received a focused confirmation after excluding them from the older decorative dropdown enhancement. Inspected-route browser error logs were empty.

The educational content has not received expert curriculum review or student outcome evaluation. Physical touch, screen readers, other browsers, OS reduced-motion switching and formal accessibility/performance audits remain unverified. Browser export was tested; full browser backup replacement was not performed in this slice (import behavior was tested through the actual app sanitizer). A useful next step is a methods-instructor review followed by a consented student usability/learning pilot. No impact or mastery claim is made.
