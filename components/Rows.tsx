import { ArrowIcon } from "@/components/Icons";
import { education, experience, projects } from "@/content/site";

export function OrgName({ name, href }: { name: string; href?: string }) {
  if (!href) return <>{name}</>;
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {name}
    </a>
  );
}

export function ExperienceRows() {
  return (
    <ul className="rows">
      {experience.map((r) => (
        <li key={r.org + r.role}>
          <div className="row-head">
            <h3 className="row-title">
              <OrgName name={r.org} href={r.href} />
            </h3>
            <span className="row-when">{r.dates}</span>
          </div>
          <p className="row-sub">
            {r.role}
            <span className="sep">·</span>
            {r.location}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function ProjectRows() {
  return (
    <ul className="rows">
      {projects.map((p) => (
        <li key={p.name}>
          <div className="row-head">
            <h3 className="row-title">{p.name}</h3>
            <span className="row-when">{p.context}</span>
          </div>
          <p className="row-body">{p.summary}</p>
          <ul className="tags" aria-label="Built with">
            {p.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          {p.links.length > 0 && (
            <div className="row-links">
              {p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                  <ArrowIcon />
                </a>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export function EducationRows() {
  return (
    <ul className="rows">
      <li>
        <div className="row-head">
          <h3 className="row-title">
            <OrgName name={education.school} href={education.href} />
          </h3>
          <span className="row-when">{education.dates}</span>
        </div>
        <p className="row-sub">
          {education.degree}
          <span className="sep">·</span>
          {education.detail}
          <span className="sep">·</span>
          {education.location}
        </p>
        <ul className="tags" aria-label="Coursework">
          {education.coursework.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </li>
    </ul>
  );
}
