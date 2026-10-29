"use client";

import { useEffect, useRef } from "react";

// Wings up, mid, down, mid. Near birds get a body; far ones are a single stroke.
const NEAR = ["\\v/", "~v~", "/v\\", "~v~"];
const FAR = ["v", "~", "v", "~"];
const NEAR_GLIDE = "-v-";
const FAR_GLIDE = "v";

type Bird = {
  el: HTMLSpanElement;
  near: boolean;
  x: number;
  y: number;
  /** Horizontal speed in px/s; the sign is the heading. */
  vx: number;
  /** Seconds per wing frame. */
  beat: number;
  frame: number;
  frameTime: number;
  /** Wingbeats left before the next glide; 0 while gliding. */
  flaps: number;
  glideLeft: number;
  phase: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** A few ASCII birds crossing the page behind the content. Decorative only. */
export function Birds() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const count = Math.round(Math.min(12, Math.max(5, (width * height) / 110_000)));

    const birds: Bird[] = Array.from({ length: count }, (_, i) => {
      const near = Math.random() < 0.45;
      const heading = Math.random() < 0.7 ? 1 : -1;
      const el = document.createElement("span");
      el.className = near ? "bird bird-near" : "bird";
      el.textContent = near ? NEAR_GLIDE : FAR_GLIDE;
      el.style.transitionDelay = `${i * 70}ms`;
      root.appendChild(el);
      return {
        el,
        near,
        x: rand(0, width),
        y: rand(height * 0.06, height * 0.75),
        vx: heading * (near ? rand(26, 40) : rand(14, 24)),
        beat: near ? rand(0.11, 0.15) : rand(0.08, 0.11),
        frame: Math.floor(rand(0, 4)),
        frameTime: 0,
        flaps: Math.floor(rand(2, 7)),
        glideLeft: 0,
        phase: rand(0, Math.PI * 2),
      };
    });

    const place = (b: Bird) => {
      b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
    };
    birds.forEach(place);
    // Next frame, so the fade-in transition has a start state to run from.
    const shown = requestAnimationFrame(() => birds.forEach((b) => b.el.classList.add("is-in")));

    const step = (b: Bird, dt: number, t: number) => {
      const frames = b.near ? NEAR : FAR;
      if (b.flaps > 0) {
        b.frameTime += dt;
        while (b.frameTime >= b.beat) {
          b.frameTime -= b.beat;
          b.frame = (b.frame + 1) % 4;
          // A wingbeat ends on the level frame after the downstroke.
          if (b.frame === 3 && --b.flaps === 0) {
            b.glideLeft = rand(0.8, 2.6);
            b.el.textContent = b.near ? NEAR_GLIDE : FAR_GLIDE;
            break;
          }
          b.el.textContent = frames[b.frame];
        }
      } else {
        b.glideLeft -= dt;
        if (b.glideLeft <= 0) {
          b.flaps = Math.floor(rand(3, 8));
          b.frame = 0;
          b.frameTime = 0;
          b.el.textContent = frames[0];
        }
      }

      // Flapping climbs a little, gliding sinks a little, and everything drifts on a slow swell.
      const lift = b.flaps > 0 ? -7 : 9;
      const swell = Math.sin(t * 0.6 + b.phase) * 6;
      b.x += b.vx * dt;
      b.y += (lift + swell) * dt;
      if (b.y < height * 0.04) b.y += 12 * dt;
      if (b.y > height * 0.85) b.y -= 12 * dt;

      // Off one edge, back in at the other at a new height.
      const margin = 48;
      if (b.vx > 0 && b.x > width + margin) {
        b.x = -margin;
        b.y = rand(height * 0.06, height * 0.7);
      } else if (b.vx < 0 && b.x < -margin) {
        b.x = width + margin;
        b.y = rand(height * 0.06, height * 0.7);
      }
      place(b);
    };

    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      // Clamp the step so a backgrounded tab resumes where it left off instead of jumping.
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      for (const b of birds) step(b, dt, now / 1000);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Reduced motion keeps the flock where it is, wings level.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches || document.hidden) {
        stop();
        if (reduce.matches) for (const b of birds) b.el.textContent = b.near ? NEAR_GLIDE : FAR_GLIDE;
      } else {
        start();
      }
    };
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };

    sync();
    reduce.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      cancelAnimationFrame(shown);
      reduce.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", onResize);
      root.replaceChildren();
    };
  }, []);

  return <div ref={ref} className="birds" aria-hidden="true" />;
}
