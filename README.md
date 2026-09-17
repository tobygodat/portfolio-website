# tobygodat portfolio

A one-page personal site built with Next.js (App Router, static output, no backend).

## Edit content

Everything visible lives in [`content/site.ts`](content/site.ts): name, tagline, links, bio, experience, projects, education. Components never hard-code copy.

- **Photo:** drop an image in `public/` and set `site.photo` to its path (e.g. `"/me.jpg"`).
- **Project links:** add `{ label, href }` entries to a project's `links` array once the repos are public.

## Run

```bash
npm install
npm run dev
```

`npm run build` produces a fully static site; deploy to Vercel, Netlify, or GitHub Pages.

## Design

`DESIGN.md` records the visual system (tokens, type, components). `PRODUCT.md` records product facts and decisions.
