---
name: Toby Godat
description: A two-panel portfolio page in dark greys or light neutrals, set in one grotesk, with blue kept for interactive things.
colors:
  ground-dark: "#141414"
  panel-dark: "#1f1f1f"
  hairline-dark: "#252526"
  text-dark: "#ececec"
  body-dark: "#c9c9cb"
  muted-dark: "#9b9b9f"
  accent-dark: "#6ab0ff"
  ground-light: "#ffffff"
  panel-light: "#f4f4f5"
  hairline-light: "#d4d4d8"
  text-light: "#18181b"
  body-light: "#3f3f46"
  muted-light: "#6b6b73"
  accent-light: "#0a5fd1"
typography:
  family: "Schibsted Grotesk, self-hosted through next/font, with a system sans fallback"
  title: { fontSize: "32px", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.02em" }
  name: { fontSize: "18px", fontWeight: 600, lineHeight: 1.35 }
  body: { fontSize: "16px", fontWeight: 400, lineHeight: 1.65 }
  heading: { fontSize: "14px", fontWeight: 500, lineHeight: 1.3 }
  small: { fontSize: "14px", fontWeight: 400, lineHeight: 1.65 }
  award: { fontSize: "14px", fontWeight: 500, lineHeight: 1.65 }
spacing:
  group: "956px"
  sidebar: "232px"
  column: "620px"
  gutter: "24px, 20px at 760px and below"
  page-top: "96px, 40px at 760px and below or under 480px tall"
  page-bottom: "56px, 40px at 760px and below"
  section: "56px, 48px at 760px and below"
  list-row: "28px above and below the rule"
---

# Design

This records how the page looks today. It is a reference, not a rulebook. When the page changes on purpose, update this file to match.

## Layout

Above 760px the page has two panels. The sidebar holds the name, tagline, section words and contact links, and it stays in view as the page scrolls. In a window under 480px tall it scrolls away with the page instead, so a landscape phone can reach the contact links. The content column holds about, education, experience and projects, in that order.

The panel colour runs to the left edge of the screen while the content stays in a centred 956px group, with a 232px sidebar and a 620px column. The group is kept tight on purpose, so wide screens get more margin and not longer lines.

At 760px and below the sidebar stacks on top and the section words are hidden. At 560px and below, dates move under their names.

## Hierarchy

A skimmer should be able to read the names alone. The sidebar name is the largest thing on the page, and project, employer and school names come next at 18px and 600.

Section headings are deliberately quiet: 14px, muted, lowercase. They label the page without competing with the names. They stay out of tracked capitals because the voice is lowercase and tracked caps read as a stock template.

Body text is 16px. Dates, roles, stacks and coursework are small and muted. An award is small too, but it uses the text colour at weight 500 so a prize is noticed without any colour of its own.

A 1px hairline separates rows within a section, with no rule above a section's first row. Contact links stay at 14px with 6px of block padding for a tap target of about 35px, and the row's negative margin keeps that padding from moving anything.

## Colour and motion

Both themes use the same roles, swapped on `:root[data-theme="light"]`. A script in the document head applies the saved theme or the system one before paint.

Blue means something can be acted on: links, the current section word and focus. Body links keep the colour around them with a blue underline, linked names and contact links turn blue on hover, and project links are blue at rest. Nothing else is blue, including awards and headings.

Links fade their colour over 120ms, and anchor jumps scroll smoothly unless the visitor asks for reduced motion. The theme swap is instant.

## Sidebar scene

Below the contact links, the sidebar fills the rest of the window with a small ASCII scene in a system monospace face at 12px. It has two clouds, a telephone wire sagging to a pole, a cat sitting under the wire, and a bird. It is decoration, so it is hidden from assistive tech, takes no clicks, and uses no blue. The clouds, wire and pole are a faint mix of muted into the panel colour, the cat is muted, and the bird is body text so the eye can find it.

The bird wanders the open sky below the clouds, changes course every few seconds, and after 9 to 16 seconds glides down to land on the wire or the pole top. It rests for 4 to 9 seconds, then takes off again. Hovering a resting bird startles it into flight. The cat's eyes follow the bird, and it dozes once the bird has settled. One clock ticks 8 times a second and drives the wing frames, the drift of the clouds, and every move, which uses `transform` only.

The scene needs at least 160px of leftover height. With less, as in a short window or a landscape phone where the sidebar scrolls away, it is hidden. It is also hidden at 760px and below, where the sidebar sits above the content and any scene would push the first section down. The clock stops while the tab is hidden or the scene is not shown. With reduced motion the scene is a still picture of the bird resting on the wire, which is also what the server renders.

## What was dropped

The earlier plain-text system is gone: the book serif, the warm paper colours, the green accent, and its bans on navigation, panels and motion.
