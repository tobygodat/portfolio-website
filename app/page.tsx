import Link from "next/link";
import { EducationRows } from "@/components/Rows";
import { Section } from "@/components/Section";
import { Terminal } from "@/components/Terminal";
import { about, pages, site } from "@/content/site";

function Rich({ parts }: { parts: (string | { text: string; href: string })[] }) {
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

export default function AboutPage() {
  return (
    <Section id="about" title="about">
      <Terminal
        steps={[
          {
            cmd: "cat about.txt",
            out: (
              <div className="about">
                <div className="about-text">
                  {about.map((parts, i) => (
                    <p key={i}>
                      <Rich parts={parts} />
                    </p>
                  ))}
                </div>
                <div className="photo" aria-hidden={site.photo ? undefined : true}>
                  {site.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={site.photo} alt={`Photo of ${site.name}`} width={120} height={120} />
                  ) : (
                    <span>photo</span>
                  )}
                </div>
              </div>
            ),
          },
          {
            cmd: "cat education.txt",
            out: <EducationRows />,
          },
          {
            cmd: "ls",
            out: (
              <ul className="ls" aria-label="Files and pages">
                <li>about.txt</li>
                <li>education.txt</li>
                {pages
                  .filter((p) => p.href !== "/")
                  .map((p) => (
                    <li key={p.slug}>
                      <Link href={p.href} className="dir">
                        {p.slug}/
                      </Link>
                    </li>
                  ))}
              </ul>
            ),
          },
        ]}
      />
    </Section>
  );
}
