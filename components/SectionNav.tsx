"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const sections = ["education", "experience", "projects"] as const;

const SETTLE_MS = 150;

/**
 * Each section gets one threshold in scroll-position space, and the current section is the last
 * one whose threshold has been passed. A section's threshold is where an anchor jump lands it, so
 * landing on a section by any means marks it. Sections the page is too short to bring that far
 * share what is left of the scroll, so every section still gets a turn.
 */
function currentIndex(tops: number[], pad: number, room: number, scrollY: number): number {
  // A page with no room to scroll puts every threshold at 0, and the top still belongs to the first.
  if (scrollY <= 0) return 0;
  const natural = tops.map((top, i) => (i === 0 ? 0 : top - pad));
  const reachable = natural.filter((at) => at <= room).length;
  const lastReachable = natural[reachable - 1];
  const spacing = (room - lastReachable) / (natural.length - reachable);
  const thresholds = natural.map((at, i) => (i < reachable ? at : lastReachable + spacing * (i - reachable + 1)));
  return thresholds.findLastIndex((at) => at <= scrollY + 1);
}

function measure() {
  return {
    tops: sections.map((id) => document.getElementById(id)!.getBoundingClientRect().top + window.scrollY),
    pad: parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop),
    room: document.documentElement.scrollHeight - window.innerHeight,
  };
}

/** Sidebar words; the section you are reading is marked current. */
export function SectionNav() {
  const [active, setActive] = useState(0);
  // Set while a clicked word holds until its jump has stopped scrolling.
  const pin = useRef<{ index: number; timer: ReturnType<typeof setTimeout> } | null>(null);

  const holdPin = useCallback((index: number) => {
    if (pin.current) clearTimeout(pin.current.timer);
    pin.current = {
      index,
      timer: setTimeout(() => {
        pin.current = null;
        const { tops, pad, room } = measure();
        // Scrolling the pin swallowed may have carried the visitor away from where the jump lands.
        if (Math.abs(window.scrollY - Math.min(tops[index] - pad, room)) > 1) {
          setActive(currentIndex(tops, pad, room, window.scrollY));
        }
      }, SETTLE_MS),
    };
  }, []);

  useEffect(() => {
    function update() {
      if (pin.current) {
        holdPin(pin.current.index);
      } else {
        const { tops, pad, room } = measure();
        setActive(currentIndex(tops, pad, room, window.scrollY));
      }
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (pin.current) clearTimeout(pin.current.timer);
    };
  }, [holdPin]);

  return (
    <nav className="section-nav" aria-label="Sections">
      {sections.map((section, i) => (
        <a
          key={section}
          href={`#${section}`}
          aria-current={active === i ? "true" : undefined}
          onClick={() => {
            holdPin(i);
            setActive(i);
          }}
        >
          {section}
        </a>
      ))}
    </nav>
  );
}
