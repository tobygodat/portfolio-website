/**
 * Everything on the site lives here. Edit this file, not the components.
 * Facts come from the resume (Sep 2026); keep them true.
 */

export const site = {
  name: "Toby Godat",
  /** One line under the name. */
  tagline: "cs + math @ georgia tech · part-time swe @ wwt",
  /** Browser tab and link previews. */
  description:
    "Toby Godat is a software engineer and math & computing student at Georgia Tech, building full-stack and ML products.",
  /** Set to a path in /public (e.g. "/me.jpg") once you add a photo. */
  photo: null as string | null,
  /** Shown in the page footer. */
  updated: "September 2026",
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
    "Right now I'm a part-time software engineer at ",
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

/** Shell prompt shown on the about page. */
export const prompt = "toby@gt:~$";

/** The site's directory tree: one entry per page, in display order. Education lives inside about. */
export const pages = [
  { slug: "about", href: "/" },
  { slug: "experience", href: "/experience" },
  { slug: "projects", href: "/projects" },
] as const;

export type Role = {
  org: string;
  href?: string;
  role: string;
  /** e.g. "May 2026 – present" */
  dates: string;
  location: string;
};

export const experience: Role[] = [
  {
    org: "World Wide Technology",
    href: "https://www.wwt.com/",
    role: "Software Engineer Intern (part-time since Aug 2026)",
    dates: "May 2026 – present",
    location: "St. Louis, MO",
  },
  {
    org: "Tech Healthcare Consulting @ GT",
    role: "Project Manager",
    dates: "Aug 2026 – present",
    location: "Atlanta, GA",
  },
  {
    org: "SiliconJackets",
    role: "Digital Design Engineer",
    dates: "Aug 2025 – present",
    location: "Atlanta, GA",
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

export const projects: Project[] = [
  {
    name: "orbitOS",
    context: "Sep 2026",
    summary:
      "A productivity app with an editable weekly Google Calendar view and an in-app Google Drive PDF reader, backed by Supabase Postgres and Vercel serverless functions.",
    stack: ["React", "TypeScript", "Python", "Supabase"],
    // The repo (github.com/tobygodat/tobiOS) is private right now; add { label: "github", href } once it is public.
    links: [],
  },
  {
    name: "Baskr",
    context: "UC Berkeley AI Hackathon, Jun 2026",
    summary:
      "An agentic research platform built in 36 hours: OpenAI embeddings, Redis vector search, and Claude classify papers against persistent lab memory, fed by a 6-source Redis Streams pipeline and checked by 350+ automated tests.",
    stack: ["Python", "FastAPI", "React", "TypeScript", "Redis", "Docker"],
    // Add { label: "github", href: "..." } or { label: "devpost", href: "..." } when you have the links.
    links: [],
  },
  {
    name: "CartWatch",
    context: "HackGT 12, Sep 2025",
    summary:
      "A financial insights app and companion Chrome extension: P10/P50/P90 balance projections from 1,000-run Monte Carlo simulations over Capital One Nessie transaction data.",
    stack: ["React", "Python", "AWS Amplify", "Cloud Firestore"],
    links: [],
  },
];

export const education = {
  school: "Georgia Institute of Technology",
  href: "https://www.gatech.edu/",
  degree: "B.S. in Mathematics and Computing",
  dates: "expected May 2028",
  location: "Atlanta, GA",
  detail: "GPA 4.0 / 4.0",
  coursework: [
    "Data Structures & Algorithms",
    "Machine Learning",
    "Linear Algebra",
    "Applied Combinatorics",
    "Object-Oriented Programming",
  ],
};
