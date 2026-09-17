---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/layout.tsx","app/globals.css","app/education/page.tsx","app/experience/page.tsx","app/projects/page.tsx","components/Nav.tsx"]
---

# Surface brief: home page (app/page.tsx)

Scope: the portfolio's four routes (`/` = ~/about, `/education`, `/experience`, `/projects`), which share the masthead, directory-tree nav, and footer from app/layout.tsx. This brief covers the shared shell and the about page; the other routes inherit it. Visitor mode: Experience (the work leads, the interface recedes), with Read discipline for the bio and lists.

Audience and job: recruiters, hiring managers, and engineers arriving from GitHub, LinkedIn, or the resume, asking "who is this and what have they built?" Friends arrive on a phone. The visitor's action is a click-through to GitHub, LinkedIn, email, or the resume PDF.

Proof and content: all facts from the resume (see PRODUCT.md, Evidence on Hand). Sections: about (with photo slot), experience, projects, education. Hobbies deliberately left out for now. No phone number. No invented logos, metrics, or repo links; only the orbitOS repo and the GitHub profile are confirmed.

Constraints: Next.js App Router, static, no backend, no tracking. Content lives in one editable data file. Dark and light themes with no flash on load. Reduced motion respected.

## Direction contract

THESIS: A quiet reading page: andrewvu.me's skeleton (one narrow column, sections boxed by a hairline with the section name sitting on the border, a chip row of links, a theme switch) set in leerob.com's voice (warm near-black or warm paper, a system book serif, small type, underlined links, no chrome). It refuses the splash hero, the card grid, the gradient, the eyebrow label, and any "terminal" costume. Canon, played straight; the user chose it.

OWN-WORLD: Dark: ground #1b1a19, text #e8e5df, muted #a09b93, hairline #3a3835, accent for links is the text itself with an underline in muted. Light: ground #f4f1eb, text #1b1a19, muted #6b665e, hairline #d8d3ca. One family everywhere: Literata (self-hosted book serif, optical sizes), falling back to Iowan Old Style / Palatino / Georgia, 17px body, 1.6 line height, tabular numerals for dates. Section boxes are 1px hairlines with a 4px radius; the label sits on the top border in the ground color, lowercase. Chips are 1px pill buttons with a 16px SVG icon and lowercase label. Selection, caret, focus ring, and scrollbar are tinted from the palette. Recognizable with the content removed: hairline boxes with words cut into their top edge, on warm dark paper.

STORY: The visitor reads a name and one line of what Toby does, sees four ways to reach him, reads a three-paragraph bio, scans three roles and three projects with real numbers, and clicks GitHub, LinkedIn, or the resume. Under a minute, no scrolling tricks.

FIRST VIEWPORT (1440 wide): a 600px column centered with 20px side gutters. Top: "Toby Godat" as an h1 at 32px semibold; beneath it one muted line: "software engineer · full-stack / ML · georgia tech '28" (shortened from the first draft so it holds one line on a phone). Then a row of four chips (github, linkedin, email, resume) with the theme toggle as a fifth, icon-only chip at the row's end. Then the "about" box: three short paragraphs on the left, a 120px square photo slot on the right (labeled placeholder until Toby supplies one), stacking above the text on mobile. The top of the "experience" box is visible at the fold. Primary action: the chip row.

FORM: The category standard (canon) chosen by the user on the round-2 decision page (serve-question key 79ec014d, ANSWER optionId "canon"), sitting alongside andrewvu.me (layout) and leerob.com (aesthetic). Not from my grounded list; the roll's assigned direction (The Marginalia Page) and the pick (The Dialogue) were declined by the user. Seed key 174e3c4c, re-roll 1.

Signature interaction: the theme switch. It crossfades the whole page through the View Transitions API with a soft circular reveal from the button, 500ms, exponential ease-out; under reduced motion it swaps instantly. Everything else is still: hover on a chip lifts its hairline to the text color; links shift their underline by 1px. Experience and project rows are not links, so they have no hover state. No scroll-triggered reveals.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

Revision Sep 17 2026: sections became routes labeled as Linux paths, a floating tree nav was added on the left, the bio now uses Toby's LinkedIn About text, and one green accent was added (see DESIGN.md, The One Accent Rule).

Unresolved: photo (Toby to supply), Baskr and CartWatch repo links (Toby to confirm), deploy target.
