import { ThemeToggle } from "@/components/ThemeToggle";
import { SectionTabs } from "@/components/SectionTabs";
import { about, education, experience, links, projects, site } from "@/content/site";

type Part = string | { text: string; href: string };

function Rich({ parts }: { parts: Part[] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <a key={i} href={part.href} target="_blank" rel="noreferrer">
            {part.text}
          </a>
        ),
      )}
    </>
  );
}

function Name({ name, href }: { name: string; href?: string }) {
  if (!href) return <>{name}</>;
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {name}
    </a>
  );
}

function Joined({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 && " · "}
          {item}
        </span>
      ))}
    </>
  );
}

export default function Page() {
  return (
    <main className="page">
      <header>
        {site.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="photo" src={site.photo} alt={`Photo of ${site.name}`} width={96} height={96} />
        )}
        <h1>{site.name}</h1>
        <p className="tagline">
          {site.tagline.split(" · ").map((phrase, i) => (
            <span key={phrase}>
              {i > 0 && " · "}
              <span className="nowrap">{phrase}</span>
            </span>
          ))}
        </p>
        <p className="contact">
          {links.map((l, i) => (
            <span key={l.href}>
              {i > 0 && " · "}
              <a href={l.href} target={l.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">
                {l.label}
              </a>
            </span>
          ))}
        </p>
      </header>

      <SectionTabs>
        <section id="about" className="bio" aria-label="About">
          {about.map((parts, i) => (
            <p key={i}>
              <Rich parts={parts} />
            </p>
          ))}
          <figure className="branch-study">
            {/* Decorative generated artwork, kept independent of portfolio facts. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/recursion-tree.png" alt="" width={2000} height={800} />
            <figcaption>small ideas, many branches.</figcaption>
          </figure>
        </section>

        <section id="experience" aria-labelledby="experience-title">
          <h2 id="experience-title">experience</h2>
          <ul className="list">
            {experience.map((r) => (
              <li key={r.org + r.role}>
                <p className="line">
                  <span>
                    <Name name={r.org} href={r.href} />
                  </span>
                  <span className="when">{r.dates}</span>
                </p>
                <p className="sub">
                  <Joined items={[r.role, r.location]} />
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" aria-labelledby="projects-title">
          <h2 id="projects-title">projects</h2>
          <ul className="list">
            {projects.map((p) => (
              <li key={p.name}>
                <p className="line">
                  <span>{p.name}</span>
                  <span className="when">{p.context}</span>
                </p>
                <p className="summary">{p.summary}</p>
                <p className="meta">
                  <Joined items={p.stack} />
                  {p.links.map((l) => (
                    <span key={l.href}>
                      {" · "}
                      <a href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="education" aria-labelledby="education-title">
          <h2 id="education-title">education</h2>
          <ul className="list">
            <li>
              <p className="line">
                <span>
                  <Name name={education.school} href={education.href} />
                </span>
                <span className="when">{education.dates}</span>
              </p>
              <p className="sub">
                <Joined items={[education.degree, education.detail, education.location]} />
              </p>
              <p className="meta">
                <Joined items={education.coursework} />
              </p>
            </li>
          </ul>
        </section>

      </SectionTabs>

      <footer className="footer">
        <span>last updated {site.updated.toLowerCase()}</span>
        <ThemeToggle />
      </footer>
    </main>
  );
}
