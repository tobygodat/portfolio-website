# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js / React (user's choice). Static export is fine; no server features required. Deployed to Cloudflare Workers via OpenNext (wrangler.jsonc, open-next.config.ts).

## Users

Recruiters, hiring managers, and engineers who land here from Toby's GitHub, LinkedIn, or resume link. They arrive with a specific question: "who is this person, what have they actually built, and are they worth a conversation?" They skim on a laptop, sometimes on a phone from a LinkedIn tap. A second audience is friends and peers who want the personal side.

## Product Purpose

A personal portfolio for Toby Godat: a single-page site that introduces Toby, shows real experience and projects, and points visitors to GitHub, LinkedIn, email, and the resume. Success is a visitor forming a clear, favorable picture in under a minute and clicking through to one of those destinations.

## Positioning

Toby is a math-and-computing student who ships full-stack products end to end and also works below the software stack (RTL processor design in SystemVerilog). The site should read as a builder's page in a personal, casual voice, in the spirit of andrewvu.me: friendly, first person, more "here's what I'm into" than "candidate profile". The user asked for the same spirit as that reference with a distinct identity, not a copy.

## Operating Context

Linked from resume, GitHub profile, and LinkedIn. Read once, quickly. Updated by Toby by hand a few times a year (new role, new project), so content must live in plain data files that are easy to edit.

## Capabilities and Constraints

- Sections confirmed (revised Sep 17 2026): About/intro (a photo appears only once Toby supplies one), Experience, Projects, and Education from the resume, all on one page. Fun extras were offered and then dropped by Toby ("leave them out for now").
- Links confirmed: GitHub https://github.com/tobygodat/, LinkedIn https://www.linkedin.com/in/tobygodat/, email tobygodat@gmail.com. The resume PDF and the per-role bullet points were removed from the site at Toby's request (Sep 17 2026); roles show org, title, dates, and location only.
- Phone number from the resume must NOT appear on the site.
- Dark mode is welcome (the reference has it) but not required.
- No CMS, no backend, no analytics required.

## Brand Commitments

- Name shown: Toby Godat.
- Voice: casual, first person, lowercase-friendly, like andrewvu.me. Not corporate.
- Reference the user liked at the start: https://andrewvu.me/ (single column, dark mode toggle). Binding as spirit only; its boxed sections and chip buttons were dropped on Sep 17 2026.
- Visual direction (standing, Sep 17 2026): plain text. Warm near-black or warm paper, Literata, 17px body, links as underlined words in one green, hairline-separated lists with right-aligned dates; no boxes, chips, icons, nav, or motion. leerob.com is the craft bar.
- Hobbies (philosophy, reading, discussing things with people) are confirmed facts but Toby chose to leave them off the site for now.
- Structure (Sep 17 2026, revised later that day): one page at `/` with about, experience, projects, and education in that order; `/experience`, `/projects`, and `/education` redirect to their anchors. The earlier Linux home-directory routes, tree nav, and typed shell session were removed. Green is the single accent.
- Standing preference (Sep 17 2026, later that day): the Linux home-directory structure, tree nav, and shell-session page were dropped as a "dev workflow" costume. Toby took the category standard on the decision page and asked for plain text with the same palette and Literata: one page, name, one line, links as words, prose, and three headed lists; no boxes, chips, icons, or nav; no animation of any kind (typing playback, blinking cursor, and the theme reveal are all out). leerob.com is the craft bar; andrewvu.me binds structure only. /experience and /projects redirect to anchors.
- Bio copy comes from Toby's LinkedIn About section (headline: "CS + Math @ Georgia Tech | Part-Time SWE @ WWT"; based in St. Louis, MO).

## Evidence on Hand

Source: resume at C:\Users\tobyg\Downloads\Career\Resumes\tobygodat_resume_final_v3.pdf (Sep 13, 2026). All facts below are from it.

Education: Georgia Institute of Technology, Atlanta, GA. B.S. in Mathematics and Computing, GPA 4.0/4.0, expected May 2028. Relevant coursework (resume): Data Structures & Algorithms, Linear Algebra, Object-Oriented Programming, Applied Combinatorics, Machine Learning, Foundations of Math and Computing, Second Course in Linear Algebra; the site lists the first five.

Experience:
- World Wide Technology, St. Louis, MO. Software Engineer Intern, May 2026 – Present (part-time since Aug 2026). Migrated Sales Admin app from AngularJS/Grails to Vue 3/Node.js across 11 business modules; cut median response time across 50+ Node REST endpoints from 340 ms to 100 ms via Oracle connection pooling and SQL optimization; built AI-assisted dev workflow with Claude Code and legacy-parity agents for regression testing and PR validation (est. 22% less migration/triage time).
- SiliconJackets Semiconductor Design Club, Atlanta, GA. Digital Design Engineer, Aug 2025 – Present. Decode stage of a 5-stage dual-issue RV32I processor in SystemVerilog; hazard-aware control signals for all 40 base instructions across R/I/S/B/U/J formats.
- Tech Healthcare Consulting @ GT, Atlanta, GA. Project Manager, Aug 2026 – Present. Flutter iOS/Android app for Augusta University vidaRPM (pregnant and postpartum patients), replacing Qualtrics + spreadsheets; Firestore backend with role-based rules and six-year audit-log retention under a Google Cloud BAA; leads a 3-person team on 1.5-week sprints with emulators, synthetic data, keyless CI/CD.

Projects:
- Baskr, UC Berkeley AI Hackathon 2026, Jun 2026. Python, FastAPI, React, TypeScript, Redis, Docker, Vercel. Agentic research platform built in 36 hours by 3 people; OpenAI embeddings + Redis vector search + Claude classify papers against persistent lab memory; 6-source Redis Streams pipeline; 350+ automated tests.
- CartWatch, HackGT 12, Sep 2025. React, Python, AWS Amplify, Cloud Firestore. Financial insights app + Chrome extension in 36 hours, 4-person team; P10/P50/P90 balance projections from 1,000-run Monte Carlo simulations on Capital One Nessie API data.
- orbitOS, Sep 2026. React, TypeScript, Python, Supabase. Deployed productivity app: editable weekly Google Calendar view + in-app Google Drive PDF reader; Supabase Postgres + Vercel serverless.

Skills: Java, Python, TypeScript/JavaScript, SQL, C, HTML/CSS, SystemVerilog. React, Vue.js, AngularJS, Node.js, Grails, FastAPI. Git, Docker, GitHub Actions, Codefresh, AWS Amplify, Cloud Firestore, Vercel, Render.

Absences (must not be fabricated): no photo supplied yet (the page shows none until `site.photo` is set); orbitOS repo is https://github.com/tobygodat/tobiOS (from local git remote); Baskr and CartWatch repo URLs unconfirmed; hobbies confirmed by Toby: philosophy, reading, discussing things with people (specific books, thinkers, or reading-group details NOT supplied; any named titles in fun-extras are labeled placeholders for Toby to replace); no motto, music, or travel facts supplied; no testimonials, press, or metrics beyond the resume.

## Product Principles

- Real work first: every experience and project entry is a resume fact, stated plainly, with numbers where the resume has them.
- Personal, not corporate: first-person voice, small jokes allowed, no buzzword bios.
- One page, one scroll: everything findable within seconds; links to GitHub, LinkedIn, email, resume always within reach.
- Easy to keep alive: content in editable data files so the site does not rot after the next internship.
- Fast and light: static, no tracking, works on a phone from a LinkedIn tap.

## Accessibility & Inclusion

Standard web accessibility: keyboard-navigable links, sufficient contrast in both themes, reduced-motion respected. No product-specific requirement beyond that.
