"use client";

import { useEffect, useRef } from "react";

// Glyphs from faint to dense. A cell's glyph is picked by how much bird covers it.
const RAMP = ".':~+tosxSX%#@8";
const FONT = '11px ui-monospace, "SF Mono", Menlo, Consolas, monospace';
const CELL_W = 9;
const CELL_H = 13;
/** Where the birds pass behind words, and how much they fade there. */
const SHY_SELECTOR = ".content > section, .sidebar-inner, .footer";
const SHY = 0.35;
/** Redraws per second. Low on purpose: the glyphs should step, not smear. */
const FPS = 30;

type Bird = {
  x: number;
  y: number;
  /** Half the wingspan, in px. */
  span: number;
  /** 0 is far (small, faint, slow), 1 is near. */
  depth: number;
  /** Horizontal speed in px/s; the sign is the heading. */
  vx: number;
  /** Wingbeat angle in radians, and how much of a full beat the wings make (0 is a glide). */
  beat: number;
  amp: number;
  /** Beats per second while flapping. */
  rate: number;
  flaps: number;
  glideLeft: number;
  phase: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

// Cheap integer hash to [0, 1), for the shimmer.
function hash(a: number, b: number, c: number) {
  let h = Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(c, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1103515245);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// Signed distance from (px, py) to a segment whose radius tapers from ra to rb.
function capsule(px: number, py: number, ax: number, ay: number, bx: number, by: number, ra: number, rb: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const t = clamp01(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy));
  const ex = px - ax - dx * t;
  const ey = py - ay - dy * t;
  return Math.hypot(ex, ey) - (ra + (rb - ra) * t);
}

/**
 * Signed distance to a gull seen from the front, in units of half-span (u right, v down).
 * Negative inside. The elbow leads the wingtip, so the beat has a little whip to it.
 */
function gull(u: number, v: number, beat: number, amp: number) {
  const glide = 1 - amp;
  // A glide holds the gull's M: elbows up, wrists down.
  const elbowY = -0.26 * amp * Math.cos(beat) - 0.14 * glide;
  const tipY = -0.62 * amp * Math.cos(beat - 0.7) + 0.06 * glide;
  const au = Math.abs(u);
  const wing = Math.min(
    capsule(au, v, 0.05, 0.02, 0.47, elbowY, 0.16, 0.115),
    capsule(au, v, 0.47, elbowY, 1, tipY, 0.115, 0.025),
  );
  const body = (Math.hypot(u / 0.12, (v - 0.06) / 0.22) - 1) * 0.12;
  const head = Math.hypot(u, v + 0.16) - 0.085;
  return Math.min(wing, body, head);
}

/** Big ASCII birds drifting behind the page, drawn as a field of glyphs. Decorative only. */
export function Birds() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let ink = "#a39e96";
    const phone = () => width < 560;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    };
    const readInk = () => {
      ink = getComputedStyle(document.documentElement).getPropertyValue("--muted").trim() || ink;
    };
    resize();
    readInk();

    const spawnY = () => rand(height * 0.12, height * 0.7);
    const makeBird = (x: number): Bird => {
      const depth = Math.random();
      const heading = Math.random() < 0.7 ? 1 : -1;
      const span = (phone() ? rand(55, 85) : rand(110, 190)) * (0.75 + 0.35 * depth);
      return {
        x,
        y: spawnY(),
        span,
        depth,
        vx: heading * (14 + 22 * depth),
        beat: rand(0, Math.PI * 2),
        amp: 1,
        rate: rand(1.2, 1.7),
        flaps: Math.floor(rand(2, 6)),
        glideLeft: 0,
        phase: rand(0, Math.PI * 2),
      };
    };
    const count = Math.round(Math.min(5, Math.max(2, (width * height) / 330_000)));
    const birds = Array.from({ length: count }, (_, i) => makeBird(((i + rand(0.1, 0.9)) / count) * width));

    const step = (b: Bird, dt: number, t: number) => {
      if (b.flaps > 0) {
        const before = Math.floor(b.beat / (Math.PI * 2));
        b.beat += dt * b.rate * Math.PI * 2;
        if (Math.floor(b.beat / (Math.PI * 2)) > before && --b.flaps === 0) b.glideLeft = rand(1.2, 3);
        b.amp += (1 - b.amp) * Math.min(1, dt * 3);
      } else {
        b.glideLeft -= dt;
        b.amp += (0 - b.amp) * Math.min(1, dt * 2.5);
        if (b.glideLeft <= 0) b.flaps = Math.floor(rand(3, 7));
      }

      // Flapping climbs a little, gliding sinks a little, and everything rides a slow swell.
      const lift = b.flaps > 0 ? -6 : 8;
      b.x += b.vx * dt;
      b.y += (lift + Math.sin(t * 0.5 + b.phase) * 7) * dt;
      b.y = Math.min(Math.max(b.y, height * 0.08), height * 0.85);

      // Off one edge, a new bird comes in at the other, fully out of view and heading the same way.
      const margin = b.span * 1.2;
      if ((b.vx > 0 && b.x > width + margin) || (b.vx < 0 && b.x < -margin)) {
        const heading = Math.sign(b.vx);
        const fresh = makeBird(0);
        fresh.vx = heading * Math.abs(fresh.vx);
        fresh.x = heading > 0 ? -fresh.span * 1.2 : width + fresh.span * 1.2;
        Object.assign(b, fresh);
      }
    };

    const draw = (t: number, shimmer: boolean) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = ink;
      const tick = shimmer ? Math.floor(t * 8) : 0;
      const quiet = phone() ? 0.7 : 1;
      // Behind the words the birds go quiet; they are bold only in open space.
      const boxes = Array.from(document.querySelectorAll(SHY_SELECTOR), (el) => el.getBoundingClientRect());

      for (let i = 0; i < birds.length; i++) {
        const b = birds[i];
        const s = b.span;
        // A slow roll, so the bird banks as it rides the swell.
        const roll = Math.sin(t * 0.5 + b.phase) * 0.1;
        const cos = Math.cos(roll);
        const sin = Math.sin(roll);
        // Edges fade over about one cell; the core is solid.
        const edge = (CELL_W * 0.9) / s;
        const core = 0.05;
        const peak = (0.42 + 0.3 * b.depth) * quiet;

        const c0 = Math.floor((b.x - s * 1.15) / CELL_W);
        const c1 = Math.ceil((b.x + s * 1.15) / CELL_W);
        const r0 = Math.floor((b.y - s * 0.85) / CELL_H);
        const r1 = Math.ceil((b.y + s * 0.85) / CELL_H);

        for (let r = r0; r <= r1; r++) {
          const cy = r * CELL_H + CELL_H / 2;
          for (let c = c0; c <= c1; c++) {
            const cx = c * CELL_W + CELL_W / 2;
            const dx = (cx - b.x) / s;
            const dy = (cy - b.y) / s;
            const d = gull(dx * cos + dy * sin, dy * cos - dx * sin, b.beat, b.amp);
            if (d > edge) continue;

            const fill = clamp01((edge - d) / (edge + core));
            const n = hash(c, r, tick + i * 97);
            // Thin edges sparkle in and out; everything else wobbles one step up or down the ramp.
            if (fill < 0.3 && n < 0.35) continue;
            const k = Math.round(fill * (RAMP.length - 1) + (n - 0.5) * 3);
            const glyph = RAMP[Math.min(RAMP.length - 1, Math.max(0, k))];
            let behind = false;
            for (const box of boxes) {
              if (cx >= box.left && cx <= box.right && cy >= box.top && cy <= box.bottom) {
                behind = true;
                break;
              }
            }
            ctx.globalAlpha = peak * (0.3 + 0.7 * fill) * (behind ? SHY : 1);
            ctx.fillText(glyph, cx, cy);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let last = 0;
    let lastDraw = 0;
    const loop = (now: number) => {
      // Clamp the step so a backgrounded tab resumes where it left off instead of jumping.
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      const t = now / 1000;
      for (const b of birds) step(b, dt, t);
      if (now - lastDraw >= 1000 / FPS - 2) {
        lastDraw = now;
        draw(t, true);
      }
      raf = requestAnimationFrame(loop);
    };

    // Reduced motion keeps the flock still, wings out in a glide, with no shimmer.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const drawStill = () => {
      for (const b of birds) b.amp = 0;
      draw(0, false);
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
    const sync = () => {
      if (reduce.matches) {
        stop();
        drawStill();
      } else if (document.hidden) {
        stop();
      } else {
        start();
      }
    };
    const onResize = () => {
      resize();
      if (!raf) drawStill();
    };
    // The theme lives on <html data-theme>; the ink follows it.
    const themeWatch = new MutationObserver(() => {
      readInk();
      if (!raf) drawStill();
    });
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    sync();
    const shown = requestAnimationFrame(() => canvas.classList.add("is-in"));
    reduce.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      cancelAnimationFrame(shown);
      themeWatch.disconnect();
      reduce.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="birds" aria-hidden="true" />;
}
