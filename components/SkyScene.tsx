"use client";

import { useEffect, useRef } from "react";

/** Grid position in characters: `col` from the left, `row` up from the bottom line. */
type Cell = { col: number; row: number };
type Vec = { x: number; y: number };
type Facing = 1 | -1;

type Bird =
  | { phase: "perched"; t: number; perch: Cell; facing: Facing; rest: number }
  | { phase: "takeoff"; t: number; pos: Vec; vel: Vec }
  | { phase: "flying"; t: number; pos: Vec; vel: Vec; goal: Vec; retarget: number; flight: number }
  | { phase: "landing"; t: number; pos: Vec; vel: Vec; perch: Cell };

type Phase = Bird["phase"];

/** Scene size in px, plus the measured width of one character. */
type Box = { w: number; h: number; ch: number };

const TICK_MS = 125;
const LINE = 16;
const SPEED = 40;
const TAKEOFF_MS = 500;

const FRAMES: Record<Phase, readonly string[]> = {
  perched: ['(")>', '(")>', '(")>', '(")>', '(")>', '(")>', '(")>', '(")>', '(-)>', '(")>', '(")>', '(")>'],
  takeoff: ['\\(")/', "\\v/"],
  flying: ["\\v/", "-v-", "/v\\", "-v-"],
  landing: ["-v-", "~v~"],
};
const WIDEST = Math.max(...Object.values(FRAMES).flat().map((glyph) => glyph.length));

const MIRROR: Record<string, string> = { "<": ">", ">": "<", "(": ")", ")": "(", "/": "\\", "\\": "/" };
const mirror = (glyph: string) =>
  [...glyph]
    .reverse()
    .map((c) => MIRROR[c] ?? c)
    .join("");

// Rows run top to bottom; the cat sits in the blank cells at the bottom left.
const GROUND = [
  "                                               _|_",
  "'-._                                     __..--'| ",
  "    '-.________________________...---''''       | ",
  "                                                | ",
  "                                                | ",
  "                                                | ",
];
const COLS = Math.max(...GROUND.map((line) => line.length));
const PERCHES: readonly Cell[] = [
  { col: 10, row: 3 },
  { col: 20, row: 3 },
  { col: 47, row: 6 },
];
const CAT = { col: 1, ears: " /\\_/\\", body: " > ^ <" };
const DRIFTERS = [
  { art: "    .--.\n .-(    ).\n(___.__)__)", kind: "cloud", top: 0, col: 2, drift: 18, period: 47_000 },
  { art: "  .-.\n (   ).\n(___(__)", kind: "cloud", top: 12, col: 38, drift: 14, period: 61_000 },
  { art: "v", kind: "far", top: 150, col: 8, drift: 24, period: 83_000 },
] as const;

const START: Extract<Bird, { phase: "perched" }> = { phase: "perched", t: 0, perch: PERCHES[0], facing: -1, rest: 5000 };

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const cellPos = (c: Cell, box: Box): Vec => ({ x: c.col * box.ch, y: c.row * LINE });

/** A random point in the open sky between the wire and the clouds. */
function skyGoal(box: Box): Vec {
  const low = GROUND.length * LINE;
  return { x: rand(0, box.w - WIDEST * box.ch), y: rand(low, Math.max(low + 20, box.h - 100)) };
}

/** Steers `vel` toward `goal` without exceeding `max` px/s, which bends paths into arcs. */
function steer(pos: Vec, vel: Vec, goal: Vec, max: number, grip: number): Vec {
  const dx = goal.x - pos.x;
  const dy = goal.y - pos.y;
  const dist = Math.hypot(dx, dy) || 1;
  const want = Math.min(max, dist * 2);
  return {
    x: vel.x + (dx / dist * want - vel.x) * grip,
    y: vel.y + (dy / dist * want - vel.y) * grip,
  };
}

/** The nearest point the bird can occupy, leaving room for its widest glyph. */
function reachable(p: Vec, box: Box): Vec {
  return { x: clamp(p.x, 0, box.w - WIDEST * box.ch), y: clamp(p.y, LINE, box.h - LINE) };
}

function move(pos: Vec, vel: Vec, box: Box, dt: number): Vec {
  return reachable({ x: pos.x + vel.x * dt, y: pos.y + vel.y * dt }, box);
}

function step(bird: Bird, box: Box, ms: number): Bird {
  const dt = ms / 1000;
  const t = bird.t + ms;
  switch (bird.phase) {
    case "perched": {
      if (t < bird.rest) return { ...bird, t };
      const pos = cellPos(bird.perch, box);
      return { phase: "takeoff", t: 0, pos, vel: { x: bird.facing * 25, y: 45 } };
    }
    case "takeoff": {
      const pos = move(bird.pos, bird.vel, box, dt);
      if (t < TAKEOFF_MS) return { ...bird, t, pos };
      return { phase: "flying", t: 0, pos, vel: bird.vel, goal: skyGoal(box), retarget: rand(2000, 4000), flight: rand(9000, 16000) };
    }
    case "flying": {
      if (t > bird.flight) {
        const perch = PERCHES[Math.floor(Math.random() * PERCHES.length)];
        return { phase: "landing", t: 0, pos: bird.pos, vel: bird.vel, perch };
      }
      // Changing its mind before arriving keeps the bird on curves rather than straight legs.
      const near = Math.hypot(bird.goal.x - bird.pos.x, bird.goal.y - bird.pos.y) < 16;
      const fresh = near || bird.retarget <= ms;
      const goal = fresh ? skyGoal(box) : bird.goal;
      const retarget = fresh ? rand(2000, 4000) : bird.retarget - ms;
      const vel = steer(bird.pos, bird.vel, goal, SPEED, 0.04);
      return { ...bird, t, goal, retarget, vel, pos: move(bird.pos, vel, box, dt) };
    }
    case "landing": {
      // A perch near the right edge can sit past where the bird may fly when glyphs are wide, so aim for the
      // reachable point or the landing never finishes.
      const target = reachable(cellPos(bird.perch, box), box);
      if (Math.hypot(target.x - bird.pos.x, target.y - bird.pos.y) < 2) {
        const facing: Facing = bird.vel.x < 0 ? -1 : 1;
        return { phase: "perched", t: 0, perch: bird.perch, facing, rest: rand(4000, 9000) };
      }
      const vel = steer(bird.pos, bird.vel, target, SPEED, 0.2);
      return { ...bird, t, vel, pos: move(bird.pos, vel, box, dt) };
    }
  }
}

function startle(bird: Bird): Bird {
  return bird.phase === "perched" ? { ...bird, rest: 0 } : bird;
}

/** Where the bird is drawn and which glyph it shows on clock tick `n`, kept whole inside the box. */
function pose(bird: Bird, box: Box, n: number): { at: Vec; glyph: string } {
  const frames = FRAMES[bird.phase];
  const frame = frames[n % frames.length];
  const glyph = bird.phase === "perched" && bird.facing === -1 ? mirror(frame) : frame;
  const base = bird.phase === "perched" ? cellPos(bird.perch, box) : bird.pos;
  // A flap lifts the bird a pixel or two, so level flight still bobs.
  const bob = bird.phase === "flying" ? Math.sin(n * (Math.PI / 2)) * 1.5 : 0;
  return {
    at: { x: clamp(base.x, 0, box.w - glyph.length * box.ch), y: clamp(base.y + bob, 0, box.h - LINE) },
    glyph,
  };
}

/** The cat watches the bird, and dozes off once it has settled. */
function catFace(bird: Bird, box: Box): string {
  if (bird.phase === "perched") return bird.t > 1500 ? "( -.- )" : "( o.o )";
  const offset = bird.pos.x - (CAT.col + 3) * box.ch;
  if (offset < -40) return "(o.o  )";
  if (offset > 40) return "(  o.o)";
  return "( ^.^ )";
}

const translate = (at: Vec) => `translate(${at.x.toFixed(1)}px, ${(-at.y).toFixed(1)}px)`;

/** The framed band under the hero: clouds, a wire, a cat, and a bird that wanders and perches. */
export function SkyScene() {
  const artRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLPreElement>(null);
  const birdRef = useRef<HTMLSpanElement>(null);
  const faceRef = useRef<HTMLSpanElement>(null);
  const drifterRefs = useRef<(HTMLPreElement | null)[]>([]);

  useEffect(() => {
    const art = artRef.current!;
    const ground = groundRef.current!;
    const birdEl = birdRef.current!;
    const faceEl = faceRef.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");

    let bird: Bird = START;
    let n = 0;
    let onScreen = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const box: Box = { w: 0, h: 0, ch: 0 };

    // The ground is plain monospace text, so its rendered width over its column count is the real glyph width,
    // whichever font actually loaded.
    function measure() {
      box.w = art.clientWidth;
      box.h = art.clientHeight;
      box.ch = ground.getBoundingClientRect().width / COLS;
    }

    function render() {
      const { at, glyph } = pose(bird, box, n);
      birdEl.style.transform = translate(at);
      if (birdEl.textContent !== glyph) birdEl.textContent = glyph;
      const face = catFace(bird, box);
      if (faceEl.textContent !== face) faceEl.textContent = face;
      DRIFTERS.forEach((d, i) => {
        const x = Math.sin(((n * TICK_MS) / d.period) * 2 * Math.PI) * d.drift;
        drifterRefs.current[i]!.style.transform = `translateX(${x.toFixed(1)}px)`;
      });
    }

    function tick() {
      n += 1;
      bird = step(bird, box, TICK_MS);
      render();
    }

    function sync() {
      if (reduce.matches && bird.phase !== "perched") {
        bird = START;
        measure();
        render();
      }
      const run = onScreen && document.visibilityState === "visible" && !reduce.matches;
      if (run && timer === undefined) {
        measure();
        timer = setInterval(tick, TICK_MS);
      } else if (!run && timer !== undefined) {
        clearInterval(timer);
        timer = undefined;
      }
    }

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    io.observe(art);
    // Watching the ground too catches the web font swapping in, which changes the glyph width but not the frame.
    const ro = new ResizeObserver(measure);
    ro.observe(art);
    ro.observe(ground);
    const onEnter = () => {
      bird = startle(bird);
    };
    birdEl.addEventListener("pointerenter", onEnter);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);

    return () => {
      clearInterval(timer);
      io.disconnect();
      ro.disconnect();
      birdEl.removeEventListener("pointerenter", onEnter);
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div className="scene" aria-hidden="true">
      <div className="scene-art" ref={artRef}>
        {DRIFTERS.map((d, i) => (
          <pre
            key={i}
            className={`scene-${d.kind}`}
            style={{ top: d.top, left: `${d.col}ch` }}
            ref={(el) => {
              drifterRefs.current[i] = el;
            }}
          >
            {d.art}
          </pre>
        ))}
        <pre className="scene-ground" ref={groundRef}>
          {GROUND.join("\n")}
        </pre>
        <pre className="scene-cat" style={{ left: `${CAT.col}ch` }}>
          {CAT.ears}
          {"\n"}
          <span ref={faceRef}>{catFace(START, { w: 0, h: 0, ch: 0 })}</span>
          {"\n"}
          {CAT.body}
        </pre>
        <span
          className="scene-bird"
          ref={birdRef}
          style={{ transform: `translate(${START.perch.col}ch, ${-START.perch.row * LINE}px)` }}
        >
          {mirror(FRAMES.perched[0])}
        </span>
      </div>
    </div>
  );
}
