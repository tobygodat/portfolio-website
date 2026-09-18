---
name: Toby Godat
description: A plain-text reading page in Literata on warm dark or warm light paper, with green-underlined words for links and hairline-separated lists with dates on the right.
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
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
    fontVariation: "opsz auto"
  title:
    fontFamily: "Literata, Iowan Old Style, Palatino Linotype, Palatino, Book Antiqua, Georgia, Times New Roman, serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Literata, Iowan Old Style, Palatino Linotype, Palatino, Book Antiqua, Georgia, Times New Roman, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "kern, liga"
  small:
    fontFamily: "Literata, Iowan Old Style, Palatino Linotype, Palatino, Book Antiqua, Georgia, Times New Roman, serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  focus: "2px"
  photo: "6px"
  scrollbar: "999px"
spacing:
  xs: "4px"
  sm: "12px"
  md: "16px"
  lg: "40px"
  gutter: "20px"
  page-top: "64px"
  page-bottom: "56px"
components:
  link:
    backgroundColor: "transparent"
    textColor: "{colors.text-dark}"
    typography: "{typography.body}"
    padding: "0"
  link-hover:
    backgroundColor: "transparent"
    textColor: "{colors.accent-dark}"
    typography: "{typography.body}"
    padding: "0"
  heading:
    backgroundColor: "transparent"
    textColor: "{colors.text-dark}"
    typography: "{typography.title}"
    padding: "40px 0 12px"
  list-item:
    backgroundColor: "transparent"
    textColor: "{colors.text-dark}"
    typography: "{typography.body}"
    padding: "12px 0"
  date:
    backgroundColor: "transparent"
    textColor: "{colors.muted-dark}"
    typography: "{typography.small}"
    padding: "0"
  theme-word:
    backgroundColor: "transparent"
    textColor: "{colors.muted-dark}"
    typography: "{typography.small}"
    padding: "0"
  theme-word-hover:
    backgroundColor: "transparent"
    textColor: "{colors.accent-dark}"
    typography: "{typography.small}"
    padding: "0"
---

# Design System: Toby Godat

## Overview

**Creative North Star: "The Plain-Text Page"**

A personal site that is only its words. One 600px column of Literata on warm paper, a name, one muted line, three words that are links, three paragraphs, and three headed lists. Nothing is drawn: no boxes, no chips, no icons, no navigation, no hero, no shadow, no gradient. Structure comes from four things only: weight (600 against 400), color (ink against muted), 1px hairlines between list items, and a single green that underlines every link. With the content removed the page is still recognizable as a narrow column of warm text, thin rules, and green underlines.

The material is warm paper in two exposures. By default the ground is warm near-black with off-white ink; when the OS prefers it, or when the visitor clicks the word in the footer, it is warm cream with near-black ink. Both exposures are the same seven roles swapped on `:root[data-theme]`, and every incidental browser surface (selection, caret, scrollbar, focus ring) is drawn from those roles so no foreign blue ever appears.

There is no motion of any kind. Hover changes a color instantly; the theme switch swaps instantly. Density is comfortable reading: 17px at 1.6, paragraphs capped at 62ch, 40px before each heading, 12px of padding around each list line.

**Key Characteristics:**
- Single 600px column with 20px gutters, 64px from the top of the viewport (40px on phones); no grid, no sidebars, no nav.
- One family, Literata with the optical-size axis, at 400 and 600 only; three sizes: 24px name, 17px body and headings, 15px secondary.
- Links are words in the text color with a 1px green underline; the word turns green on hover. Green appears nowhere else except the focus ring.
- Lists are lines separated by 1px hairlines with a right-aligned, muted, tabular date that stacks under the name on phones.
- Dark and light are the same palette re-cast on `data-theme`, restored before paint so there is no flash; the toggle is the word "light" or "dark" in the footer.
- No animation, no transition, no shadow, no box, no icon.

## Colors

A seven-role warm neutral palette rendered twice (dark ground and light ground) plus one green that is allowed to touch only links and focus.

### Primary
- **Link Green** (`{colors.accent-dark}` on dark, `{colors.accent-light}` on light): the underline beneath every link and the theme word at rest, the color of a link's text on hover, and the 2px focus ring. It marks the way and never the content: no heading, date, tag, or paragraph is ever green.

### Neutral
- **Warm Near-Black Ground** (`{colors.ground-dark}`): the default page background and the dark `theme-color`.
- **Warm Cream Ground** (`{colors.ground-light}`): the light-theme background and the light `theme-color`.
- **Warm Ink** (`{colors.text-dark}` / `{colors.text-light}`): body text, the name, section headings, list names, link words at rest, the caret, and text inside a selection.
- **Muted** (`{colors.muted-dark}` / `{colors.muted-light}`): the second voice. The tagline, the contact line, dates, role and location sub-lines, stack and coursework lists, and the whole footer including the theme word.
- **Hairline** (`{colors.hairline-dark}` / `{colors.hairline-light}`): the 1px rule above every list item and below the last one. The only line the page draws.
- **Hairline Strong** (`{colors.hairline-strong-dark}` / `{colors.hairline-strong-light}`): the scrollbar thumb. Reserved for browser chrome; not used on the page itself.
- **Selection** (`{colors.selection-dark}` / `{colors.selection-light}`): the `::selection` background; selected text stays in ink.

### Named Rules
**The One Green Rule.** The accent is used for exactly three things: link underlines (including the footer theme word), link text on hover, and the focus ring. Anything else in green, or any second hue, breaks the world.

**The Two Exposures Rule.** Dark and light are the same seven roles swapped on `:root[data-theme="light"]` with `color-scheme` set to match. Never add a color that exists in only one theme.

**The Tinted Chrome Rule.** Selection (`selection` + `text`), caret (`text`), scrollbar thumb (`hairline-strong`, thin, transparent track), and focus ring (2px `accent` outline, 3px offset, 2px radius) are all drawn from the palette. Browser-default blue never appears.

## Typography

**Display Font:** Literata (self-hosted via next/font, latin subset, `opsz` axis; fallback Iowan Old Style, Palatino Linotype, Palatino, Book Antiqua, Georgia, Times New Roman, serif)
**Body Font:** Literata (same family; one family everywhere)
**Label/Mono Font:** none

**Character:** A book serif set for reading on screens, with optical sizing doing the only display work there is. Two weights (400 for text, 600 for the name, headings, and nothing else), three sizes, and no tracking, no caps, no italics. Interface words (headings, link labels, the footer) are lowercase; content is sentence case.

### Hierarchy
- **Display** (600, 24px, 1.3, -0.01em): the name at the top of the page, and nothing else. `text-wrap: balance`.
- **Title** (600, 17px, 1.3, lowercase): the three section headings `experience`, `projects`, `education`, set 40px below the previous block and 12px above their list (32px above on phones). Same size as body; weight alone makes them headings.
- **Body** (400, 17px, 1.6): bio paragraphs (62ch max), project summaries (60ch max), and the names on list lines. `font-feature-settings: "kern", "liga"`, antialiased, `optimizeLegibility`. Paragraphs are 16px apart.
- **Small** (400, 15px, 1.6): everything secondary and always muted: dates (tabular numerals, nowrap, right-aligned), role and location sub-lines, stack and coursework lists, and the footer. The tagline and contact line are muted at body size.

### Named Rules
**The One Family Rule.** Literata at 400 and 600 is the entire type system. No second family, no monospace, no uppercase tracking, no italic emphasis, no kicker or eyebrow above a heading.

**The Three Sizes Rule.** 24px for the name, 17px for content and headings, 15px for secondary information. Hierarchy inside a list line comes from weight and color, never from a fourth size.

**The Tabular Dates Rule.** Every date or range is set in tabular numerals in muted at 15px, on the right edge of its line, baseline-aligned with the name; below 560px it drops beneath the name, left-aligned.

## Layout

A single centered column: `width: min(100% - 40px, 600px)`, the 600px measure with 20px gutters, never wider. The page has 64px above and 56px below; on phones (`max-width: 560px`) both become 40px. There is no grid, no sidebar, and no navigation; the sections are reached by scrolling or by the `#experience`, `#projects`, and `#education` anchors (the old `/experience`, `/projects`, `/education` routes redirect to them permanently; `scroll-padding-top` is 40px so an anchored heading lands clear of the edge).

Vertical rhythm is a five-step scale: 4px (tagline below the name), 12px (contact line below the tagline, heading to list, list-line padding), 16px (between paragraphs, gap between a name and its date), 40px (bio below the header, above every heading, above the footer; 32px on phones), and 64px (page top). Inside a list item the sub-line sits 2px below the line and a summary or meta line 6px below.

Lists are the only structure on the page: a `ul` with no markers whose items each carry a 1px hairline top border and 12px of block padding, with the last item also carrying a bottom border. The line inside is a baseline-aligned flex row, name on the left and date on the right with a 16px gap; below 560px it becomes a column with the date directly under the name. The footer is the same row shape at 15px muted: "last updated <month year>" on the left, the theme word on the right. One breakpoint, 560px, and no other responsive changes.

## Elevation & Depth

No shadows, no tints, no layering. The page is flat text on one ground; the only separator is a 1px hairline between list items. Hover and focus change color, not depth. The theme switch replaces the palette instantly with no transition.

### Named Rules
**The Nothing Drawn Rule.** No `box-shadow`, blur, gradient, background image, fill, or border on anything except the 1px hairline above and below list items. If a new element needs separation, it gets a hairline or a heading, never a surface.

**The No Motion Rule.** No `transition`, `animation`, view transition, or scroll-triggered effect anywhere, including hover and the theme switch. There is nothing to gate behind `prefers-reduced-motion` because nothing moves.

## Shapes

There are no shapes. The only radii on the page belong to browser chrome and one conditional image: the focus ring is barely rounded (2px), the scrollbar thumb is a pill (999px), and the 96px photo, when Toby supplies one, is a softened square (6px). Every stroke is a 1px hairline: link underlines (1px, 0.2em below the baseline) and list rules. There are no 2px strokes, no boxes, no pills, no icons.

## Components

### Links
The page's only interactive form besides the theme word. A word in the running text, underlined in green.
- **Style:** `color: inherit`, 1px underline in `accent`, `text-underline-offset: 0.2em`. Used identically for contact words, bio links, organization and school names in lists, and project links.
- **Hover:** the word itself turns `accent`; the underline stays. Instant.
- **Focus:** the global ring, 2px `accent` outline offset 3px with a 2px radius.
- **External** links open in a new tab with `rel="noreferrer"`; `mailto:` opens in place.

### Section Heading
A lowercase word at body size and weight 600 (`experience`, `projects`, `education`), 40px above and 12px below, in ink, immediately followed by its list. Every section is `aria-labelledby` its heading.

### List Line
The structure for experience, projects, and education entries.
- **Divider:** each item has a 1px `hairline` top border and 12px block padding; the last item also has a bottom border.
- **Line:** flex, space-between, baseline-aligned, 16px gap: a 17px name (a green-underlined link when there is a URL) on the left and a muted 15px tabular date on the right. Below 560px the line stacks, date under the name.
- **Sub-line:** muted 15px, items joined by " · ", 2px below the line (role · location; degree · GPA · location).
- **Summary:** body 17px capped at 60ch, 6px below the line (projects).
- **Meta:** muted 15px, 6px below, items joined by " · " (stack, coursework, project links as underlined words in ink).

### Masthead
Name at 24px/600 with -0.01em tracking; tagline in muted at body size 4px below, each " · " phrase held on one line with `nowrap`; contact line 12px below in muted with the link words in ink, underlined green, joined by " · ". The 96px photo, rendered only when `site.photo` is set, sits above the name with 16px below it.

### Footer
A 15px muted flex row 40px below the last list: "last updated <month year>" on the left, the theme word pushed to the right.

### Theme Word
A `<button>` reset to inherit its font and color, so it reads as a word in the footer: "light" while dark, "dark" while light, underlined in green like any link and turning green on hover, with an `aria-label` of "Switch to <next> theme". Clicking sets `data-theme` on `<html>` and persists it to `localStorage`; a pre-paint inline script in the document head restores the saved theme or the OS preference so the page never flashes. The swap is instant.

## Do's and Don'ts

### Do:
- **Do** keep every surface inside the 600px column with 20px gutters and the 64px / 56px page padding (40px both ends on phones).
- **Do** set all type in Literata at 400 or 600 and at exactly one of 24px (name), 17px (content, headings), or 15px (secondary, always muted).
- **Do** make any new link an underlined word: ink text, 1px green underline at 0.2em, green text on hover, and nothing else.
- **Do** add new list content as another hairline-separated line with a muted tabular date on the right that stacks below 560px.
- **Do** define any new color as a pair on `:root` and `:root[data-theme="light"]`, and reach for the seven existing roles first.
- **Do** keep selection, caret, scrollbar, and focus ring drawn from the palette.

### Don't:
- **Don't** draw a box, card, chip, pill, button surface, border (other than list hairlines), fill, gradient, background image, blur, or shadow.
- **Don't** add an icon of any kind, raster or SVG; links are words.
- **Don't** add a nav, sidebar, hero, kicker, eyebrow, or uppercase tracked label; the lowercase 17px/600 heading is the only label form.
- **Don't** use green on anything but link underlines, link hover, and the focus ring; never on headings, dates, tags, or prose.
- **Don't** add a transition, animation, or view transition anywhere, including hover states and the theme switch.
- **Don't** introduce a second typeface, a monospace treatment, italics, or a fourth type size; use more than the one 560px breakpoint.
