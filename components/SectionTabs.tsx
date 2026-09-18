"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";

const sections = ["about", "experience", "projects", "education"] as const;
type Section = (typeof sections)[number];

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}

function currentSection(): Section {
  const hash = window.location.hash.slice(1);
  return sections.find((section) => section === hash) ?? "about";
}

export function SectionTabs({ children }: { children: ReactNode[] }) {
  const active = useSyncExternalStore(subscribe, currentSection, () => "about" as Section);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function select(section: Section) {
    if (section === active) return;
    window.history.pushState(null, "", `#${section}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  return (
    <div className="sections">
      <div className="section-tabs" role="tablist" aria-label="Portfolio sections">
        {sections.map((section, index) => (
          <button
            key={section}
            ref={(element) => { buttons.current[index] = element; }}
            type="button"
            role="tab"
            id={`tab-${section}`}
            aria-controls={`panel-${section}`}
            aria-selected={active === section}
            tabIndex={active === section ? 0 : -1}
            onClick={() => select(section)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % sections.length;
              else if (event.key === "ArrowLeft") next = (index + sections.length - 1) % sections.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = sections.length - 1;
              else return;
              event.preventDefault();
              select(sections[next]);
              buttons.current[next]?.focus();
            }}
          >
            {section}
          </button>
        ))}
      </div>
      {sections.map((section, index) => (
        <div
          key={section}
          id={`panel-${section}`}
          role="tabpanel"
          aria-labelledby={`tab-${section}`}
          tabIndex={0}
          hidden={active !== section}
          className="section-panel"
        >
          {children[index]}
        </div>
      ))}
      <noscript><style>{`.section-tabs { display: none; } .section-panel[hidden] { display: block; }`}</style></noscript>
    </div>
  );
}
