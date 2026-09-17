import type { Metadata, Viewport } from "next";
import { Literata } from "next/font/google";
import { Chip } from "@/components/Chip";
import { Nav } from "@/components/Nav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { links, site } from "@/content/site";
import "./globals.css";

// A book serif for reading on screens; self-hosted at build time so every OS sees the same lettering.
const serif = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1b1a19" },
    { media: "(prefers-color-scheme: light)", color: "#f4f1eb" },
  ],
};

// Runs before paint: applies the saved theme so it never flashes, and arms the about page's
// shell playback once per session (skipped under reduced motion and on revisits).
const themeScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("theme");if(!t){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}d.dataset.theme=t;if(location.pathname==="/"&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("played")){d.dataset.play="1";sessionStorage.setItem("played","1")}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={serif.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Nav />
        <div className="page">
          <header className="masthead">
            <h1>{site.name}</h1>
            <p className="tagline">{site.tagline}</p>
            <ul className="chips" aria-label="Links">
              {links.map((l) => (
                <li key={l.kind}>
                  <Chip {...l} />
                </li>
              ))}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </header>
          <main className="content">{children}</main>
          <footer className="footer">
            <span>{site.name.toLowerCase()}</span>
            <span>last updated {site.updated.toLowerCase()}</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
