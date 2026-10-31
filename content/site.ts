/**
 * Everything on the site lives here. Edit this file, not the components.
 * Facts come from the resume and Notion (Oct 2026); keep them true.
 */

export const site = {
  name: "Toby Godat",
  /** One line under the name. */
  tagline: "cs + math @ georgia tech · part-time swe @ wwt",
  /** Browser tab and link previews. */
  description:
    "Toby Godat is a software engineer and math & computing student at Georgia Tech, building developer tools and full-stack products.",
  /** Set to a path in /public (e.g. "/me.jpg") once you add a photo. */
  photo: null as string | null,
  /** Shown in the page footer. */
  updated: "October 2026",
};

export type LinkKind = "github" | "linkedin" | "mail";

export const links: { kind: LinkKind; label: string; href: string }[] = [
  { kind: "github", label: "github", href: "https://github.com/tobygodat/" },
  { kind: "linkedin", label: "linkedin", href: "https://www.linkedin.com/in/tobygodat/" },
  { kind: "mail", label: "email", href: "mailto:tobygodat@gmail.com" },
];

/** Paragraphs of the bio (from the LinkedIn About section). Plain text, or a small array of text and links. */
export const about: (string | { text: string; href: string })[][] = [
  [
    "Hi, I'm Toby, an undergraduate mathematics and computer science major at Georgia Tech! I'm very passionate about software development, machine learning, computer architecture, and anything else related to innovation in science and technology.",
  ],
  [
    "Right now I'm a part-time software engineering intern at ",
    { text: "World Wide Technology", href: "https://www.wwt.com/" },
    " while studying in Atlanta, and I'm based in St. Louis when I'm home.",
  ],
  [
    "I'm open to chat about any potential opportunities! Reach me on ",
    { text: "LinkedIn", href: "https://www.linkedin.com/in/tobygodat/" },
    " or by ",
    { text: "email", href: "mailto:tobygodat@gmail.com" },
    ".",
  ],
];

export type Position = {
  role: string;
  /** e.g. "May 2026 – present" */
  dates: string;
  location: string;
};

export type Role = {
  org: string;
  href?: string;
  /** One or more roles at the same place, newest first. */
  positions: Position[];
};

export const experience: Role[] = [
  {
    org: "World Wide Technology",
    href: "https://www.wwt.com/",
    positions: [
      { role: "Software Engineer Intern (part-time)", dates: "Aug\u00A02026 – present", location: "St. Louis, MO" },
      { role: "Software Engineer Intern", dates: "May\u00A02026 – Aug\u00A02026", location: "St. Louis, MO" },
    ],
  },
  {
    org: "Tech Healthcare Consulting @ GT",
    positions: [{ role: "Co-founder & Tech Lead", dates: "Aug\u00A02026 – present", location: "Atlanta, GA" }],
  },
];

export type Project = {
  name: string;
  /** Where or when it happened. */
  context: string;
  summary: string;
  stack: string[];
  links: { label: string; href: string }[];
};

/** Only the projects with the strongest signal, matching the current resume. */
export const projects: Project[] = [
  {
    name: "Fiada",
    context: "1st place, HackGT\u00A013 · Sep\u00A02026",
    summary:
      "A zoomable map of a codebase that sorts and explains itself and lights up where your coding agent is working. It matched 81 of 88 frontend HTTP calls to backend routes in Outline with no wrong matches, and a Canvas renderer cut zoom frame time from about 60 to 17 ms on a 13K-node map.",
    stack: ["TypeScript", "React", "Fastify", "tree-sitter", "MCP"],
    links: [
      { label: "site", href: "https://fiada.tech" },
      { label: "github", href: "https://github.com/tobygodat/fiada" },
      { label: "npm", href: "https://www.npmjs.com/package/@fiadatech/agent" },
    ],
  },
  {
    name: "Keystone",
    context: "Oct\u00A02026",
    summary:
      "A native desktop client for Claude Code and Codex that drives the installed CLIs directly. Sessions live in an append-only SQLite event log, crash recovery never resends an interrupted request, and an MCP server lets agents orchestrate each other across providers.",
    stack: ["Rust", "GPUI", "SQLite", "MCP"],
    // The repo (github.com/tobygodat/keystone) is private; add { label: "github", href } once it is public.
    links: [],
  },
  {
    name: "Stilltype",
    context: "Sep\u00A02026 – present",
    summary:
      "Typing practice for people who already touch type: it finds weak letter pairs, drills them, and retests on text you haven't seen. Rendering only the text near the cursor halved p95 keydown-to-paint latency from 64 to 32 ms.",
    stack: ["JavaScript", "PostgreSQL", "Supabase", "Cloudflare Workers"],
    // The repo (github.com/tobygodat/typingsite) is private.
    links: [{ label: "live app", href: "https://stilltype.tobygodat.workers.dev" }],
  },
];

export const education = {
  school: "Georgia Institute of Technology",
  href: "https://www.gatech.edu/",
  degree: "B.S. in Mathematics and Computing",
  dates: "expected May\u00A02028",
  location: "Atlanta, GA",
  detail: "GPA 4.0\u00A0/\u00A04.0",
  coursework: [
    "Data Structures & Algorithms",
    "Machine Learning",
    "Linear Algebra",
    "Applied Combinatorics",
    "Object-Oriented Programming",
  ],
};
