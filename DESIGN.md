---
name: Toby Godat
description: A single-column, name-first page in Inter, with a light theme and a soft dark theme, white cards with drawn ASCII art, and one teal accent.
colors:
  ground-light: "#fafaf9"
  card-light: "#ffffff"
  well-light: "#f4f4f5"
  chip-light: "#f1f1f2"
  border-light: "#e4e4e7"
  outline-light: "#d4d4d8"
  ink-light: "#111113"
  body-light: "#3f3f46"
  nav-light: "#52525b"
  muted-light: "#6b6b73"
  quiet-light: "#71717a"
  dim-light: "#a1a1aa"
  faint-light: "#c4c4c8"
  underline-light: "#c4c4c8"
  accent-light: "#0f766e"
  on-ink-light: "#ffffff"
  ground-dark: "#1c1c1f"
  card-dark: "#242428"
  well-dark: "#202024"
  chip-dark: "#2c2c31"
  border-dark: "#303035"
  outline-dark: "#3a3a40"
  ink-dark: "#ececea"
  body-dark: "#b9b9b4"
  nav-dark: "#b9b9b4"
  muted-dark: "#8f8f8a"
  quiet-dark: "#8f8f8a"
  dim-dark: "#6a6a6f"
  faint-dark: "#4a4a50"
  underline-dark: "#5a5a60"
  accent-dark: "#6cc7ad"
  on-ink-dark: "#1c1c1f"
typography:
  sans: "Inter through next/font with the optical size axis, features cv11 and ss01"
  mono: "JetBrains Mono through next/font, for the scene and the project drawings"
  name: { fontSize: "96px, down to 56px on phones", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.055em" }
  headline: { fontSize: "26px, down to 22px", fontWeight: 500, lineHeight: 1.35, letterSpacing: "-0.025em" }
  section: { fontSize: "44px, down to 32px", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.04em" }
  card-title: { fontSize: "26px", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.03em" }
  column-title: { fontSize: "28px", fontWeight: 600, letterSpacing: "-0.03em" }
  entry-title: { fontSize: "17px", fontWeight: 600, letterSpacing: "-0.015em" }
  body: { fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }
  summary: { fontSize: "16px", lineHeight: 1.7, letterSpacing: "-0.011em" }
  small: "15px nav and entry rows, 14px kicker and footer, 13px chips"
  scene: { fontSize: "13px", lineHeight: "16px" }
spacing:
  page: "1280px max, 24px side gutter, 16px below 640px"
  page-top: "40px, 16px below 640px"
  page-bottom: "64px"
  between-blocks: "112px, 72px below 640px"
  hero-gap: "80px across, 56px when wrapped"
  card-radius: "16px"
  drawing: "340px wide beside the text, the full card once it wraps"
  scene: "460px square"
---

# Design

This records how the page looks today. It is a reference, not a rulebook. When the page changes on purpose, update this file to match.

## Layout

One column, up to 1280px wide, in this order:

1. A header row. Section links (projects, work, school) sit on the left and contact links (github, linkedin, x.com, email) on the right. Each link has 12px of block padding so the tap target is about 48px tall.
2. The hero. Toby's name, his LinkedIn headline, and "Atlanta and St. Louis" sit on the left, then two pill buttons, "Reach out" (email) and "See projects". The framed sky scene sits on the right.
3. "Things I've built". Each project is a card with a drawing on a grey well on the left and the text on the right. The text is a small grey line (kind, award if any, dates), the name, the summary, and a row of stack chips followed by the project's links. A name links to the project's first real link.
4. Work and School as two columns above a hairline. A role shows its location once when consecutive positions share it.
5. A footer with the last-updated date and the theme pill.

Copy lives in `content/site.ts`. Each project's drawing comes from the registry in `components/thumbnails.tsx`, keyed by project id, so a project without a drawing fails to compile.

## Type

Inter carries everything readable. The name is the largest thing on the page, so a skimmer reads it first, then the headline at 26px and 500. Section titles are 44px and 600, and project names are 26px. Body text is 16px, summaries get a looser 1.7 line height, and dates, kickers and coursework are muted.

JetBrains Mono is only for drawings: the scene and the three project thumbnails. Glyphs it lacks in the Latin subset, such as box-drawing lines and dots, fall back to the system monospace face.

## Colour

Each theme is one table of tokens on `:root[data-theme="light"]` and `:root[data-theme="dark"]` in `app/globals.css`. Components use the tokens only. Light is a warm off-white ground with white cards. Soft dark is a charcoal ground with lifted charcoal cards, kept off pure black. The values are in the front matter above.

A script in the document head applies the saved theme or, without one, the system preference, before paint. The footer pill swaps it, saves the choice, and the swap is instant. The browser chrome colour follows the two grounds.

Teal is the accent. It marks what reacts to you: links and nav turn teal on hover, the filled button turns teal on hover, and focus rings are teal. In the drawings it marks the one thing to look at: the lit path in Fiada's map, Keystone's recovery lines, Stilltype's weak pairs and caret, and the bird. Nothing else is teal.

## Sky scene

The hero's square frame holds an ASCII scene in JetBrains Mono at 13px on 16px lines. Two clouds and a far-off bird drift slowly along the top, a telephone wire sags from the left edge to a pole on the right, a cat sits under the wire, and a bird lives on the wire. The clouds, wire and pole are faint, the far bird is dim, the cat is quiet grey, and the bird is teal so the eye finds it. The scene is decoration. It is hidden from assistive tech, never focusable, and takes no clicks except a hover on the bird.

The bird rests on the wire, wanders the open sky between the wire and the clouds, changes course every few seconds, and after 9 to 16 seconds glides down to land on one of two spots on the wire or on top of the pole. It rests 4 to 9 seconds and takes off again. Hovering a resting bird startles it into flight. The cat's eyes follow the bird, and it dozes once the bird settles.

One clock ticks 8 times a second and drives the wing frames, the drift, and every move, using `transform` only. The bird's behaviour is a small state machine (perched, takeoff, flying, landing) advanced by a pure step function. Character width is measured from the rendered ground, and measured again when the web font swaps in, so perches line up with the wire in any font. The bird is clamped by the width of the glyph it is showing, so it never leaves the frame.

The clock stops while the tab is hidden or the scene is off screen. With reduced motion the scene is a still picture of the bird resting on the wire, which is also what the server renders. Turning reduced motion on mid-flight puts the bird straight back on the wire.

## Phones

Below 640px the scene is hidden so the projects come sooner, the side gutter is 16px, and the gap between blocks drops to 72px. The name scales down to 56px and the headline to 22px. A project card wraps once it is too narrow for the drawing beside the text, and the drawing then spans the top of the card. Work and School stack. At 390px wide nothing scrolls sideways.

## What was dropped

The two-panel sidebar page is gone: the sticky sidebar, its section scroll-spy, the blue accent, Schibsted Grotesk, and the About paragraphs.
