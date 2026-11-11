import type { ReactNode } from "react";
import { SkyScene } from "@/components/SkyScene";
import { ThemeToggle } from "@/components/ThemeToggle";
import { thumbnails } from "@/components/thumbnails";
import { education, experience, links, projects, site, type Project } from "@/content/site";

const sections = ["projects", "work", "school"];

const email = links.find((l) => l.kind === "mail")!;

function External({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const outside = !href.startsWith("mailto:");
  return (
    <a href={href} className={className} target={outside ? "_blank" : undefined} rel={outside ? "noreferrer" : undefined}>
      {children}
    </a>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Thumb = thumbnails[project.id];
  const home = project.links.find((l) => l.href)?.href;
  return (
    <article className="card">
      <div className="thumb" aria-hidden="true">
        <Thumb />
      </div>
      <div className="card-body">
        <p className="kicker">{[project.kind, project.award, project.context].filter(Boolean).join(" · ")}</p>
        <h3 className="card-title">
          {home ? (
            <External href={home} className="title-link">
              {project.name} ↗
            </External>
          ) : (
            project.name
          )}
        </h3>
        <p className="summary">{project.summary}</p>
        <p className="chips">
          {project.stack.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
          {project.links
            .filter((l) => l.href !== home || !l.href)
            .map((l) =>
            l.href ? (
              <External key={l.label} href={l.href} className="chip-link">
                {l.label} ↗
              </External>
            ) : (
              <span key={l.label} className="chip-link">
                {l.label}
              </span>
            ),
          )}
        </p>
      </div>
    </article>
  );
}

function Entry({ title, href, rows, note }: { title: string; href?: string; rows: { what: string; when: string }[]; note?: string }) {
  return (
    <div className="entry">
      <h3 className="entry-title">{href ? <External href={href}>{title}</External> : title}</h3>
      {rows.map((r) => (
        <p key={r.what + r.when} className="entry-row">
          <span>{r.what}</span>
          <span className="when">{r.when}</span>
        </p>
      ))}
      {note && <p className="entry-note">{note}</p>}
    </div>
  );
}

export default function Page() {
  return (
    <div className="page">
      <header className="top">
        <nav aria-label="Sections" className="top-nav">
          {sections.map((id) => (
            <a key={id} href={`#${id}`}>
              {id}
            </a>
          ))}
        </nav>
        <nav aria-label="Elsewhere" className="top-nav">
          {links.map((l) => (
            <External key={l.href} href={l.href}>
              {l.label}
            </External>
          ))}
        </nav>
      </header>

      <main className="main">
        <section className="hero" aria-labelledby="name">
          <div className="hero-text">
            <h1 id="name">{site.name}</h1>
            <p className="headline">{site.headline}</p>
            <p className="place">{site.place}</p>
            <p className="actions">
              <a className="button button-fill" href={email.href}>
                Reach out
              </a>
              <a className="button button-line" href="#projects">
                See projects
              </a>
            </p>
          </div>
          <SkyScene />
        </section>

        <section id="projects" className="projects" aria-labelledby="built">
          <h2 id="built">Things I&apos;ve built</h2>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </section>

        <section className="history" aria-label="Work and school">
          <div id="work" className="history-col">
            <h2>Work</h2>
            {experience.map((r) => (
              <Entry
                key={r.org}
                title={r.org}
                href={r.href}
                rows={r.positions.map((pos, i) => ({
                  what: pos.location === r.positions[i + 1]?.location ? pos.role : `${pos.role} · ${pos.location}`,
                  when: pos.dates,
                }))}
              />
            ))}
          </div>
          <div id="school" className="history-col">
            <h2>School</h2>
            <Entry
              title={education.school}
              href={education.href}
              rows={[{ what: `${education.degree} · ${education.detail}`, when: education.dates }]}
              note={education.coursework.join(" · ")}
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>last updated {site.updated.toLowerCase()}</span>
        <ThemeToggle />
      </footer>
    </div>
  );
}
