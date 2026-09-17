---
name: Toby Godat
description: A quiet single-column reading page in a book serif, with hairline boxes whose section names sit on the top border, on warm dark or warm light paper.
colors:
  ground-dark: "#1b1a19"
  text-dark: "#e8e5df"
  muted-dark: "#a39e96"
  hairline-dark: "#3b3936"
  hairline-strong-dark: "#5a5752"
  selection-dark: "#4a463f"
  accent-dark: "#8fd18a"
  ground-light: "#f4f1eb"
  text-light: "#1b1a19"
  muted-light: "#6b665e"
  hairline-light: "#d9d3c9"
  hairline-strong-light: "#b8b1a5"
  selection-light: "#e3dccf"
  accent-light: "#2e7d4f"
typography:
  display:
    fontFamily: "Literata, Iowan Old Style, Palatino Linotype, Palatino, Book Antiqua, Georgia, Times New Roman, serif"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Literata, Iowan Old Style, Palatino Linotype, Palatino, Book Antiqua, Georgia, Times New Roman, serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Literata, Iowan Old Style, Palatino Linotype, Palatino, Book Antiqua, Georgia, Times New Roman, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "kern, liga"
  label:
    fontFamily: "Literata, Iowan Old Style, Palatino Linotype, Palatino, Book Antiqua, Georgia, Times New Roman, serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.01em"
  small:
    fontFamily: "Literata, Iowan Old Style, Palatino Linotype, Palatino, Book Antiqua, Georgia, Times New Roman, serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  fine:
    fontFamily: "Literata, Iowan Old Style, Palatino Linotype, Palatino, Book Antiqua, Georgia, Times New Roman, serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  focus: "2px"
  box: "6px"
  pill: "999px"
spacing:
  hair: "2px"
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "18px"
  gutter: "20px"
  box: "22px"
  section: "36px"
  page-top: "48px"
components:
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.text-dark}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "5px 13px 5px 11px"
    height: "34px"
  chip-hover:
    backgroundColor: "color-mix(in srgb, currentColor 4%, transparent)"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.pill}"
  chip-icon:
    backgroundColor: "transparent"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.pill}"
    padding: "0"
    width: "34px"
    height: "34px"
  box:
    backgroundColor: "transparent"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.box}"
    padding: "26px 22px 22px"
  box-label:
    backgroundColor: "{colors.ground-dark}"
    textColor: "{colors.muted-dark}"
    typography: "{typography.label}"
    padding: "0 7px"
  photo-slot:
    backgroundColor: "color-mix(in srgb, currentColor 3%, transparent)"
    textColor: "{colors.muted-dark}"
    rounded: "{rounded.box}"
    width: "120px"
    height: "120px"
---

# Design System: Toby Godat

## Overview

**Creative North Star: "The Bordered Page"**

A personal portfolio that reads like a well-set page in a book rather than a product landing. One narrow column, one serif family at one body size, and four hairline boxes whose names are cut into their top edge. Nothing announces itself: no hero, no cards in a grid, no gradient, no eyebrow labels, no terminal costume. The content carries the page; the interface is a frame around it.

The material is warm paper in two exposures. By default the page is warm near-black with off-white ink; on request (or when the OS prefers it) it is warm cream with near-black ink. Both are the same six-token palette re-cast, and every incidental surface (selection, caret, scrollbar, focus ring) is tinted from that palette so the page has no foreign blue.

Density is comfortable-reading: 17px Literata at 1.6, a 600px measure, 36px between boxes. Motion is limited to one authored moment, the theme switch, which reveals the new page in a circle from the toggle; everything else is a 160ms ease-out on a hover.

**Key Characteristics:**
- Single 600px column with 20px side gutters, centered; no grid, no sidebars.
- Hairline boxes (1px, 6px radius) with the lowercase section name sitting on the top border in the ground color.
- One family everywhere: self-hosted Literata with optical sizing, falling back to Iowan Old Style / Palatino / Georgia.
- Links are the text color with a muted 1px underline that darkens on hover; no accent hue exists.
- Pill chips with a 16px stroke icon and a lowercase label are the only buttons.
- Dark and light themes via `data-theme` with no flash on load; theme change is a circular view-transition reveal, instant under reduced motion.

## Colors

A six-role warm neutral palette rendered twice (dark ground and light ground); there is no accent color, so links, chips, and focus all use the text color itself.

### Primary
- **Warm Ink** (`{colors.text-dark}` on dark, `{colors.text-light}` on light): body text, headings, chip labels, link text, focus ring, caret, and the hover-state border of chips. The text color is the only emphasis color the system has.

### Neutral
- **Warm Near-Black Ground** (`{colors.ground-dark}`): the default page background and the patch behind each box label that lets the label sit on the border. Also the `theme-color` for dark and the favicon tile.
- **Warm Cream Ground** (`{colors.ground-light}`): the light-theme page background and label patch; `theme-color` for light.
- **Muted** (`{colors.muted-dark}` / `{colors.muted-light}`): the second voice. Tagline, box labels, dates, role and location lines, tag lists, bullet markers, footer, and the photo placeholder text.
- **Hairline** (`{colors.hairline-dark}` / `{colors.hairline-light}`): box borders, chip borders at rest, row dividers, and the photo-slot border. Recedes; it is the quietest visible line.
- **Hairline Strong** (`{colors.hairline-strong-dark}` / `{colors.hairline-strong-light}`): link underlines at rest and the scrollbar thumb. One step louder than the box hairline so an underline reads as a link without shouting.
- **Selection** (`{colors.selection-dark}` / `{colors.selection-light}`): `::selection` background; text stays in the text color.

### Named Rules
**The One Accent Rule.** One green (`accent-dark` #8fd18a on dark, `accent-light` #2e7d4f on light) marks the way, never the content: the active page in the directory tree, the `~` root and `~/` path prefixes on section labels, focus rings, link underlines (at 55% for rest, full on hover), and a hovered chip's border. Headings, body, dates, and tags stay in the neutral ramp. A second hue, or the accent on prose, breaks the world.

**The Directory Tree.** The site is a Linux home directory: routes `/` (~/about, which also holds education), `/experience`, `/projects`, in that order. A fixed tree nav sits left of the column above 1040px (root `~` 19px/600 in accent, entries 15px muted, branch lines drawn as 1px hairline-strong borders, active entry accent/600). Below 1040px it becomes an inline row of `~/name` links above the masthead with the active one underlined.

**The Shell Session.** The about page is a terminal transcript: a prompt `toby@gt:~$` in the accent followed by a command, then that command's output in the page's ordinary serif components. Commands and `ls` output are the only monospace on the site (`--mono`, 14px). On a first visit per session (not under reduced motion) the head script sets `html[data-play]`; commands then type at 42ms per character with `steps()`, each output fades in 160ms after its command, and the next command starts 520ms later, ending on a blinking accent cursor. Without the flag everything is simply visible.

**The Two Exposures Rule.** Dark and light are the same six roles swapped on `:root[data-theme]`, with `color-scheme` set to match. Never add a color that exists in only one theme.

**The Tinted Chrome Rule.** Selection, caret, focus ring, and scrollbar are drawn from the palette (`::selection` uses selection + text, `scrollbar-color` uses hairline-strong, `:focus-visible` is a 2px text-colored outline offset 3px). Browser-default blue is never allowed to appear.

## Typography

**Display Font:** Literata (self-hosted via next/font, latin subset, normal + italic, `opsz` axis; fallback Iowan Old Style, Palatino Linotype, Palatino, Book Antiqua, Georgia, Times New Roman, serif)
**Body Font:** Literata (same family; one family everywhere)
**Label/Mono Font:** none; labels are the same serif at 15px, weight 500

**Character:** A book serif set for screen reading: warm, slightly compact, with optical sizing doing the work of a display cut at 32px and a text cut at 17px. Weights stay between 400 and 600; nothing is bold-black, nothing is hairline-thin. Lowercase is used for interface words (section names, chip labels, footer) and sentence case for content.

### Hierarchy
- **Display** (600, 32px, 1.25, -0.01em): the name at the top of the page only; 28px on phones. `text-wrap: balance`.
- **Title** (600, 17px, 1.25): organization, project, and school names in rows (`h3`). Same size as body; weight alone makes the hierarchy.
- **Body** (400, 17px, 1.6): bio paragraphs and project summaries. Paragraphs are capped at 62–64ch inside the 600px column. `font-feature-settings: "kern", "liga"`, antialiased, `optimizeLegibility`.
- **Label** (500, 15px, 1.2, 0.01em, lowercase): the section name sitting on each box border, in muted on a ground-colored patch.
- **Small** (400, 15px): chip labels, dates (with `font-variant-numeric: tabular-nums`, right-aligned, nowrap on desktop), role/location sub-lines, row links; highlight bullets are 15.5px.
- **Fine** (400, 14.5px): stack and coursework tag lists and the footer, always in muted. The photo placeholder word is 14px.

### Named Rules
**The One Family Rule.** Literata at 400–600 is the entire type system. No second family, no monospace, no uppercase tracking, no kicker or eyebrow line above a heading.

**The Two-Size Rule.** Content runs at 17px; secondary information runs at 15px (14.5px for tag lists and the footer). Hierarchy inside a row comes from weight (600 vs 400) and color (text vs muted), not from more sizes.

**The Tabular Dates Rule.** Any date or range is set in tabular numerals and lives on the right edge of its row head; on phones it drops beneath the title, left-aligned.

## Layout

A single centered column: `width: min(100% - 40px, 600px)`, i.e. the 600px measure with 20px gutters on each side, and never wider. The page is a vertical flex stack with a 36px gap between the masthead, each section box, and the footer; the page has 48px above and 40px below. On phones (`max-width: 560px`) the gap tightens to 30px and the page padding to 32px both ends.

Inside a box, padding is 26px top (leaving room for the border label) and 22px on the sides and bottom; on phones, 24px 16px 18px. The about section is a two-column grid (`1fr auto`, 22px gap) with the 120px photo slot on the right; on phones it collapses to one column and the photo (96px) moves above the text. Experience, project, and education entries are rows: a list whose items are separated by a 1px hairline top border with 18px of block padding, the first and last trimmed to 2px so the box padding does the work. Inside a row the rhythm is small: 2px between head and sub-line, 8–10px before highlights, tags, or links, 6px between bullets, 14px between bio paragraphs.

The masthead is a column with 18px gaps: name, tagline (pulled up 8px to sit closer to the name), then the chip row with 8px between chips and the theme toggle pushed to the row's end with `margin-left: auto`. There is one breakpoint, 560px; no other responsive changes exist.

## Elevation & Depth

No shadows anywhere. Depth is conveyed by lines and by the label patch: a section is a 1px hairline rectangle, and its name sits on the top edge with a ground-colored background that interrupts the line. Hover on a chip does two flat things: the border steps from hairline to text color, and the fill becomes a 4% tint of the text color. The photo slot is a 3% tint of the text color inside a hairline. The theme switch is the only layering the page does, and it is temporal (a clip-path reveal), not spatial.

### Named Rules
**The Flat Page Rule.** No `box-shadow`, no blur, no gradient, no translucent glass. If something needs to separate from the page, draw a hairline around it or tint it by at most 4% of the text color.

## Shapes

Three corners and nothing else. Boxes and the photo slot use a gently softened rectangle (6px). Chips and the scrollbar thumb are full pills (999px). The focus ring is barely rounded (2px). Borders are always 1px in hairline; there are no 2px strokes at rest, and the only stroke that becomes text-colored is a hovered chip or the focus outline. Icons are 24-unit SVGs drawn with a 1.6 stroke, round caps and joins, rendered at 16px inside chips and 13px inside inline project links; solid brand marks (GitHub, LinkedIn) are drawn at 14px with 1px side margins to match the stroke icons' ink. Row dividers are single 1px hairlines. Tag lists are separated by a middle dot with 0.5em on each side, not by chips.

## Components

### Chips
The only button form. A pill of hairline with an icon and a lowercase word; quiet at rest, text-colored on hover, pressed down 1px on active.
- **Shape:** full pill (`{rounded.pill}`), 1px hairline border, transparent background.
- **Size:** 34px min-height, `padding: 5px 13px 5px 11px` (1px less on the icon side), 8px gap between a 16px icon and a 15px label; `line-height: 1`.
- **Hover:** border becomes the text color; background becomes a 4% tint of the text color (`color-mix`). 160ms ease-out on border and background.
- **Active:** `translateY(1px)` on a 160ms exponential ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Focus:** the global ring (2px text-colored outline, 3px offset).
- **Icon-only variant** (`chip--icon`): 34x34px, no padding, centered icon; used for the theme toggle, pushed to the row end. Same states.
- **Icons:** stroke SVGs (mail, file, sun, moon, arrow) at `stroke-width: 1.6`; the GitHub and LinkedIn marks are filled and sized 14px with the `mark` class.

### Section Box
The signature component: a hairline rectangle whose `h2` sits on the top border.
- **Corner Style:** `{rounded.box}`.
- **Border:** 1px hairline; no fill, no shadow.
- **Internal Padding:** `26px 22px 22px` (phones `24px 16px 18px`).
- **Label:** the `h2` is absolutely positioned at `top: 0; left: 14px; transform: translateY(-50%)`, with `padding: 0 7px` and a ground-colored background so it interrupts the line. Muted, 15px, weight 500, 0.01em, lowercase. Section titles are `about`, `experience`, `projects`, `education`; every box is `aria-labelledby` its label.

### Rows
The list form used for experience, projects, and education inside a box.
- **Divider:** each item after the first carries a 1px hairline top border; 18px block padding, trimmed to 2px at the box's top and bottom.
- **Head:** flex, space-between, baseline-aligned, 16px gap: a 600-weight 17px title on the left and a muted 15px tabular date on the right. On phones the head stacks with a 2px gap.
- **Sub-line:** muted 15px, role and location joined by a middle dot with 0.45em on each side, 2px below the head.
- **Body / highlights:** 17px summary capped at 64ch, or a disc list at 15.5px with muted markers and 6px between items.
- **Tags:** muted 14.5px, dot-separated, nowrap per tag, 10px above.
- **Links:** 15px underlined links with a 13px arrow icon, 14px apart; only rendered when a project has confirmed links.

### Links
Inline links are text-colored with a 1px underline in hairline-strong, offset 0.18em. On hover the underline turns text-colored and drops to 0.24em; both animate 160ms ease-out. Row titles that are links drop the underline at rest and regain it on hover. External links open in a new tab with `rel="noreferrer"`.

### Photo Slot
A 120px square (96px on phones, moved above the text), hairline border, `{rounded.box}`, 3% text tint, muted 14px placeholder word centered until an image is supplied; the image then fills it with `object-fit: cover`.

### Footer
A wrapping flex row, space-between, muted 14.5px: lowercase name on the left, `last updated <month year>` on the right, 4px above the row.

### Theme Toggle
An icon-only chip (sun in dark, moon in light) with an `aria-label` and `title`. Clicking sets `data-theme` on `<html>` and persists it to `localStorage`; a pre-paint inline script in the document head restores the saved theme or the OS preference so the page never flashes. When the View Transitions API is available and reduced motion is not requested, the switch runs a clip-path circle from the button's center to the far corner over 520ms on `cubic-bezier(0.16, 1, 0.3, 1)` (`--vt-x`, `--vt-y`, `--vt-r` set on the root); the old view stays static beneath, the new view reveals on top. Under reduced motion or without the API, the theme swaps instantly.

## Do's and Don'ts

### Do:
- **Do** keep every surface inside the 600px column with 20px gutters; new sections are another hairline box with a lowercase label on the top border, stacked 36px below the last.
- **Do** set all type in Literata between 400 and 600 at 17px (content) or 15px (secondary), with dates in tabular numerals on the right of the row head.
- **Do** make any new interactive element a pill chip (34px, 1px hairline, 16px stroke icon at 1.6, lowercase label) or an underlined inline link.
- **Do** define any new color as a pair on `:root` and `:root[data-theme="light"]` and pull it from the six existing roles wherever possible.
- **Do** keep hover motion at 160ms ease-out and leave the theme reveal as the page's only animation; gate every animation behind `prefers-reduced-motion`.
- **Do** tint system chrome (selection, caret, scrollbar, focus ring) from the palette.

### Don't:
- **Don't** add a splash hero, a card grid, a gradient, a background image, a blur, or any box-shadow.
- **Don't** add a kicker, eyebrow, or uppercase tracked label above a heading; the section name on the border is the only label form.
- **Don't** introduce a second typeface, a monospace terminal treatment, or a colored accent hue.
- **Don't** use more than the one 560px breakpoint or a second column wider than the photo slot.
- **Don't** add scroll-triggered reveals, hover lifts, or transitions on non-interactive rows; experience and project rows are not links and have no hover state.
- **Don't** ship a raster icon or an icon font; icons are inline SVG paths at a 24-unit viewBox.
