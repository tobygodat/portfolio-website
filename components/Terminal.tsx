import type { ReactNode } from "react";
import { prompt } from "@/content/site";

/**
 * A shell session laid out as commands and their output. Everything is server-rendered
 * and visible; when <html data-play> is set (see app/layout.tsx), CSS types the commands
 * and reveals each output in sequence. Timing is computed here so CSS only needs delays.
 */

const MS_PER_CHAR = 42;
const PAUSE_AFTER_CMD = 160;
const PAUSE_BEFORE_NEXT = 520;

export type Step = { cmd: string; out: ReactNode };

export function Terminal({ steps }: { steps: Step[] }) {
  // Timeline: when each command starts typing and when its output appears, in ms.
  const timing: { cmdAt: number; outAt: number }[] = [];
  let t = 350; // let the page settle before the first keystroke
  for (const step of steps) {
    const cmdAt = t;
    const outAt = cmdAt + step.cmd.length * MS_PER_CHAR + PAUSE_AFTER_CMD;
    timing.push({ cmdAt, outAt });
    t = outAt + PAUSE_BEFORE_NEXT;
  }
  const cursorAt = t;

  const blocks = steps.map((step, i) => (
    <div className="term-block" key={i}>
      <p className="cmd">
        <span className="prompt">{prompt}</span>{" "}
        <span
          className="cmd-text"
          style={{ "--n": step.cmd.length, "--t": timing[i].cmdAt } as React.CSSProperties}
        >
          {step.cmd}
        </span>
      </p>
      <div className="out" style={{ "--t": timing[i].outAt } as React.CSSProperties}>
        {step.out}
      </div>
    </div>
  ));

  return (
    <div className="term">
      {blocks}
      <p className="cmd" aria-hidden="true">
        <span className="prompt">{prompt}</span>{" "}
        <span className="cursor" style={{ "--t": cursorAt } as React.CSSProperties} />
      </p>
    </div>
  );
}
