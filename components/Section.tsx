import type { ReactNode } from "react";

/** A boxed section whose path (~/name) sits on the top border. */
export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const headingId = `${id}-title`;
  return (
    <section id={id} className="box" aria-labelledby={headingId}>
      <h2 id={headingId}>
        <span className="path-prefix" aria-hidden="true">
          ~/
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}
