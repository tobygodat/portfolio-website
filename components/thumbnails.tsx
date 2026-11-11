import type { ReactNode } from "react";
import type { Project } from "@/content/site";

function Hl({ children }: { children: ReactNode }) {
  return <span className="hl">{children}</span>;
}

function Fiada() {
  return (
    <pre className="thumb-art thumb-fiada">
      {" ·  ·    ∘   ·      ·   ·\n    ·  "}
      <Hl>●───●</Hl>
      {"     ·     ∘\n ∘     "}
      <Hl>│</Hl>
      {"   ·  ·    ·\n   ·   "}
      <Hl>●──────●</Hl>
      {"   ·   ·\n ·        ·   "}
      <Hl>│</Hl>
      {"  ∘     ·\n    ∘  ·      "}
      <Hl>●───●</Hl>
      {"  ·\n ·   ·    ·      ·    ∘"}
    </pre>
  );
}

function Keystone() {
  return (
    <pre className="thumb-art thumb-keystone">
      {"┌ keystone ───────────────┐\n│ "}
      <span className="ink">claude</span>
      {"   ● running      │\n│ "}
      <span className="ink">codex</span>
      {"    ○ waiting      │\n│ "}
      <span className="ink">mcp</span>
      {"      agents linked  │\n├─────────────────────────┤\n│ "}
      <Hl>↺ recovered from log</Hl>
      {"    │\n│ "}
      <Hl>✓ nothing resent</Hl>
      {"        │\n└─────────────────────────┘"}
    </pre>
  );
}

function Stilltype() {
  return (
    <div className="thumb-stilltype">
      <span className="thumb-note">weak pairs: th · ow · er</span>
      <p className="thumb-typing">
        <span className="ink">
          <span className="pair">th</span>e n<span className="pair">ow</span> fami
        </span>
        <span className="caret" />
        liar weath<span className="pair pair-next">er</span> turned
      </p>
      <span className="thumb-note">p95 keydown → paint · 64 → 32 ms</span>
    </div>
  );
}

/** One drawing per project, keyed by id so a new project fails to compile until it has one. */
export const thumbnails: Record<Project["id"], () => ReactNode> = {
  fiada: Fiada,
  keystone: Keystone,
  stilltype: Stilltype,
};
