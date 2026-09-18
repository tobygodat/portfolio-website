"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

// The <html data-theme> attribute is the source of truth; watch it directly.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

/** A word in the footer that swaps the theme instantly. */
export function ThemeToggle() {
  // Server renders "dark"; the client reads the real attribute set before paint.
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function onClick() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice just won't persist */
    }
  }

  return (
    <button type="button" className="theme" onClick={onClick} aria-label={`Switch to ${next} theme`}>
      {next}
    </button>
  );
}
