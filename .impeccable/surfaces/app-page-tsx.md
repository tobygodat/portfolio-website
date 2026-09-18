---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/layout.tsx","app/globals.css","components/ThemeToggle.tsx","content/site.ts","next.config.ts"]
---

# Surface brief: the whole site (app/page.tsx)

Scope: one route, `/`, holding the whole portfolio; `/experience` and `/projects` permanently redirect to their anchors so old links survive. Visitor mode: Experience with Read discipline; the words are the work and the interface is nearly absent.

Audience and job: recruiters, hiring managers, and engineers arriving from GitHub, LinkedIn, or the resume, asking "who is this and what have they built?" Friends arrive on a phone. The visitor's action is a click-through to GitHub, LinkedIn, or email.

Proof and content: all facts from the resume and Toby's LinkedIn About text (PRODUCT.md, Evidence on Hand). Sections in order: name and one line, contact links, bio, experience, projects, education. Hobbies left off. No phone number. No invented links, logos, or metrics. Photo renders only when Toby supplies one.

Constraints: Next.js App Router, static, no backend, no tracking. Content in content/site.ts. Dark and light themes with no flash on load. No animation of any kind (Toby, Sep 17 2026). Pinned palette and Literata kept.

## Direction contract

THESIS: A plain-text page. The category standard chosen on purpose (canon, decision key d8d5299c) and stripped to prose: name, one line, links as words, paragraphs, and three lists with headings. It refuses boxes, chips, icons, a nav, the terminal or home-directory costume, hero blocks, and motion. leerob.com is the craft bar.

OWN-WORLD: Warm near-black ground #1b1a19 with warm ink #e8e5df, or warm paper #f4f1eb with ink #1b1a19; muted #a39e96 / #6b665e; hairline #3b3936 / #d9d3c9; one green #8fd18a / #2e7d4f used only for link underlines, link hover, and focus. Literata everywhere: 17px body at 1.6, name 24px semibold, headings 17px semibold lowercase with 40px above and 12px below. Lists are hairline-separated lines with a right-aligned muted tabular date. Selection, caret, scrollbar, and focus ring come from the palette. Recognizable with content removed: a narrow column of warm text, thin rules, green underlines, nothing drawn.

STORY: The visitor reads the name and one line, sees three words that are links, reads three short paragraphs in Toby's voice, scans three roles and three projects with dates on the right, notes the degree, and clicks GitHub, LinkedIn, or email. Under a minute.

FIRST VIEWPORT (1440 wide): a 600px column centered with 20px gutters, 64px from the top. "Toby Godat" at 24px, the tagline in muted beneath it, then "github · linkedin · email" as underlined words on one line. Then the three bio paragraphs. The "experience" heading and first row sit at the fold. Primary action: the three link words under the name. Signature interaction: none by contract; the theme switch is a text word in the footer ("light" / "dark") that swaps instantly. Hover on any link turns it green.

FORM: The category standard, the standing exit taken by Toby on the decision page (seed key 997a6851, canon). Not from my grounded list; the assigned Syllabus and the pick, The Letter, were declined. Products to sit alongside: leerob.com (plain text, quiet serif) and andrewvu.me (structure only).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

Unresolved: photo (Toby to supply), Baskr and CartWatch repo links (Toby to confirm), deploy target (Cloudflare Workers via OpenNext is configured).
