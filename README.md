# tobygodat portfolio

A one-page personal site built with Next.js (App Router, static output, no backend).

## Edit content

Everything visible lives in [`content/site.ts`](content/site.ts): name, headline, place, links, experience, projects, education. Components hard-code only the section names and the footer's wording.

- **Projects:** each needs an `id`, and `components/thumbnails.tsx` needs a drawing for that id or the build fails.
- **Project links:** add `{ label, href }` entries to a project's `links` array once the repos are public.

## Run

```bash
npm install
npm run dev
```

`npm run build` prerenders the page as static content. The site deploys to Cloudflare Workers through OpenNext (`wrangler.jsonc`, `open-next.config.ts`).

## Design

`DESIGN.md` records the current look (tokens, type, spacing, layout). `PRODUCT.md` records product facts and decisions.
