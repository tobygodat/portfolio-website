"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import { MoonIcon, SunIcon } from "./Icons";

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

function apply(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* private mode: the choice just won't persist */
  }
}

export function ThemeToggle() {
  // Server renders "dark"; the client reads the real attribute set before paint.
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);

  function onClick(e: MouseEvent<HTMLButtonElement>) {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void };

    if (reduce || !doc.startViewTransition) {
      apply(next);
      return;
    }

    // Circular reveal from the button: the page's one authored motion.
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement.style;
    root.setProperty("--vt-x", `${x}px`);
    root.setProperty("--vt-y", `${y}px`);
    root.setProperty("--vt-r", `${radius}px`);
    doc.startViewTransition(() => apply(next));
  }

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  return (
    <button type="button" className="chip chip--icon" onClick={onClick} aria-label={label} title={label}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
