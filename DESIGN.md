---
name: Toby Godat
description: A narrow, centred, name-first column in Inter, with a light theme and a soft dark theme, white cards with drawn ASCII art, and one teal accent.
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
  name: { fontSize: "52px, down to 40px on phones", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.045em" }
  headline: { fontSize: "19px", fontWeight: 500, lineHeight: 1.4, letterSpacing: "-0.02em" }
  section: { fontSize: "26px", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.035em" }
  card-title: { fontSize: "20px", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.03em" }
  column-title: { fontSize: "22px", fontWeight: 600, letterSpacing: "-0.03em" }
  entry-title: { fontSize: "16px", fontWeight: 600, letterSpacing: "-0.015em" }
  body: { fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }
  summary: { fontSize: "15px", lineHeight: 1.7, letterSpacing: "-0.011em" }
  small: "14px nav, buttons and entry rows, 13px kicker, footer and chips"
  scene: { fontSize: "13px", lineHeight: "16px" }
spacing:
  page: "640px max, centred, 24px side gutter, 16px below 640px"
  page-top: "32px, 16px below 640px"
  page-bottom: "56px"
  between-blocks: "88px, 64px below 640px"
  hero-gap: "40px between the text and the scene"
  card-radius: "14px"
  drawing: "spans the top of the card, 200px tall at least"
  scene: "320px tall band, as wide as the column"
---

# Design

This records how the page looks today. It is a reference, not a rulebook. When the page changes on purpose, update this file to match.

## Layout

One centred column, up to 640px wide, with empty space on both sides. Everything stacks, in this order:

1. A header row. Section links (projects, work, school) sit on the left and contact links (github, linkedin, x.com, email) on the right. Each link has 12px of block padding so the tap target is about 48px tall.
2. The hero. Toby's name, his LinkedIn headline, "Atlanta and St. Louis", then two pill buttons, "Reach out" (email) and "See projects". The framed sky scene sits below as a band.
3. "Things I've built". Each project is a card with a drawing on a grey well across the top and the text below it. The text is a small grey line (kind, award if any, dates), the name, the summary, and a row of stack chips followed by the project's links. A name links to the project's first real link.
4. Work, then School, below a hairline. A role shows its location once when consecutive positions share it.
5. A footer with the last-updated date and the theme pill.

Copy lives in `content/site.ts`. Each project's drawing comes from the registry in `components/thumbnails.tsx`, keyed by project id, so a project without a drawing fails to compile.

## Type

Inter carries everything readable. The name is the largest thing on the page, so a skimmer reads it first, then the headline at 19px and 500. Section titles are 26px and 600, and project names are 20px. Body text is 16px, summaries are 15px with a looser 1.7 line height, and dates, kickers and coursework are muted.

JetBrains Mono is only for drawings: the scene and the three project thumbnails. Glyphs it lacks in the Latin subset, such as box-drawing lines and dots, fall back to the system monospace face.

## Colour

Each theme is one table of tokens on `:root[data-theme="light"]` and `:root[data-theme="dark"]` in `app/globals.css`. Components use the tokens only. Light is a warm off-white ground with white cards. Soft dark is a charcoal ground with lifted charcoal cards, kept off pure black. The values are in the front matter above.

A script in the document head applies the saved theme or, without one, the system preference, before paint. The footer pill swaps it, saves the choice, and the swap is instant. The browser chrome colour follows the two grounds.

Teal is the accent. It marks what reacts to you: links and nav turn teal on hover, the filled button turns teal on hover, and focus rings are teal. In the drawings it marks the one thing to look at: the lit path in Fiada's map, Keystone's recovery lines, Stilltype's weak pairs and caret, and the bird. Nothing else is teal.

## Sky scene

The band under the hero holds an ASCII scene in JetBrains Mono at 13px on 16px lines. The drawing is 50 characters wide and is centred in the band, so the sky, wire and pole stay together however wide the column is. Two clouds and a far-off bird drift slowly along the top, a telephone wire sags from the left edge to a pole on the right, a cat sits under the wire, and a bird lives on the wire. The clouds, wire and pole are faint, the far bird is dim, the cat is quiet grey, and the bird is teal so the eye finds it. The scene is decoration. It is hidden from assistive tech, never focusable, and takes no clicks except a hover on the bird.

The bird rests on the wire, wanders the open sky between the wire and the clouds, changes course every few seconds, and after 9 to 16 seconds glides down to land on one of two spots on the wire or on top of the pole. It rests 4 to 9 seconds and takes off again. Hovering a resting bird startles it into flight. The cat's eyes follow the bird, and it dozes once the bird settles.

One clock ticks 8 times a second and drives the wing frames, the drift, and every move, using `transform` only. The bird's behaviour is a small state machine (perched, takeoff, flying, landing) advanced by a pure step function. Character width is measured from the rendered ground, and measured again when the web font swaps in, so perches line up with the wire in any font. The bird is clamped by the width of the glyph it is showing, so it never leaves the frame.

The clock stops while the tab is hidden or the scene is off screen. With reduced motion the scene is a still picture of the bird resting on the wire, which is also what the server renders. Turning reduced motion on mid-flight puts the bird straight back on the wire.

## Phones

Below 640px the scene is hidden so the projects come sooner, the side gutter is 16px, and the gap between blocks drops to 64px. The name scales down to 40px. At 390px wide nothing scrolls sideways. The scene is also hidden in any window under 560px tall, such as a landscape phone, where the square would push the projects a full screen down.

## What was dropped

The two-panel sidebar page is gone: the sticky sidebar, its section scroll-spy, the blue accent, Schibsted Grotesk, and the About paragraphs. So is the 1280px spread with the scene beside the name and drawings beside the text.
