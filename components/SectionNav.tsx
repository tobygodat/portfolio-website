"use client";

import { useEffect, useRef, useState } from "react";

const sections = ["about", "education", "experience", "projects"] as const;

/** Sidebar words; the section you are reading is marked current. */
export function SectionNav() {
  const [active, setActive] = useState<string>("about");
  // After a click the chosen word stays current until the jump has settled.
  const lockedUntil = useRef(0);

  useEffect(() => {
    function update() {
      if (performance.now() < lockedUntil.current) return;
      // The reading line slides from the top of the screen to the bottom as the page scrolls,
      // so every section gets its turn even when the page is too short to bring it to the top.
      const room = document.documentElement.scrollHeight - window.innerHeight;
      const progress = room > 0 ? Math.min(1, Math.max(0, window.scrollY / room)) : 0;
      const line = progress * window.innerHeight;
      let current: string = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line + 1) current = id;
      }
      setActive(current);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav className="section-nav" aria-label="Sections">
      {sections.map((section) => (
        <a
          key={section}
          href={`#${section}`}
          aria-current={active === section ? "true" : undefined}
          onClick={() => {
            lockedUntil.current = performance.now() + 600;
            setActive(section);
          }}
        >
          <span>{section}</span>
        </a>
      ))}
    </nav>
  );
}
