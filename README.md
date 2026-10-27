# Versta.Design

Long-term archive mirror of the Neurora design sprint deliverables from **NEU-57 —
Design sprint on core traveler flows** (Paperclip issue, October 2026).

Relationship to the tracker: the issue thread is where review happens and where
decisions bind. This repo mirrors **accepted / current state only** — working
drafts and unverified WIP stay on the issue. Mirror convention proposed on the
thread 2026-10-26 19:54Z, directed by the founder 2026-10-27 14:24Z.

**Accepted direction: Face-to-Face** (split conversation surface, ink/acid
language — founder verdict 2026-10-26 19:43Z on the direction-check card).

## Layout

| Path | Contents |
|---|---|
| `specs/` | Issue documents exported as markdown: teardown, journey map, concepts + decision log, design-language inventory, **design-system-tokens** (normative), and the three hi-fi specs (conversation split, home/solo orb-dock, packs + offline) |
| `mockups/` | Verified single-file HTML mockups (fonts embedded, fully offline). `archive/` holds the superseded Face-to-Face v1 |
| `state-sheets/` | Rendered contact sheets (PNG), all states at 390×844, produced from the final artifacts |
| `tokens/` | Machine-readable tokens: `tokens.json` (+ SwiftUI/Compose names), `tokens.css` (custom properties) |
| `verification/` | Headless verification records per mockup package (DOM assertions + pixel probes + font forced-load checks) |

## Previewing the mockups

Each HTML file is self-contained (subset-embedded fonts, no network). Download
and open in any browser at 390×844 (or any phone-size window); a switcher in the
top strip steps through every state. GitHub renders HTML as source — use
*Download* on the file page. For a fast overview, open the matching PNG in
`state-sheets/` instead.

## Provenance & integrity

Exports carry YAML front matter (`document_key`, `revision`, `revision_id`).
Binary artifacts were verified byte-identical to the Paperclip attachments at
export time (sha256 below).

| File | Paperclip attachment | sha256 (first 12) |
|---|---|---|
| `mockups/neurora-facetoface-mockup-v2.html` | `3c05498d-…` | `ca13e9658a8f` |
| `state-sheets/neurora-facetoface-v2-state-sheet.png` | `bbd2c075-…` | `16170437c90c` |
| `mockups/neurora-home-solo-mockup-v1.html` | `91e1d258-…` (uploaded as `neurora-home-solo-final.html`) | `0d7c6fa226fe` |
| `state-sheets/neurora-home-solo-state-sheet.png` | `2ed4e127-…` | `1392cccc515a` |
| `mockups/neurora-packs-mockup-v1.html` | `bde05d22-…` | `1fe1706ab2ea` |
| `state-sheets/neurora-packs-state-sheet-v1.png` | `36beece3-…` | `cc9eb7e1c258` |
| `mockups/archive/neurora-facetoface-mockup-v1.html` | `8c15859e-…` | `594779c6d1b7` |

**Not mirrored:** the founder-supplied brand boards and current-build captures
(2026-10-14, user-owned uploads — remain on the issue thread), and the five
exploratory wireframes from 2026-10-12 (superseded by concepts + verified
mockups).

## Design language, in one paragraph

Ink on paper, near-monochrome by construction. Exactly one hue exists — **acid
#E6FF00** — and it is functional, not decorative: it marks the live-capture
affordance and appears at most once per surface (orb on home/solo; active mic
zone on the conversation split). Management surfaces (packs) carry none. There
is no error color anywhere; failures are mono-gray honest copy. Full token set
and rationale: `specs/design-system-tokens.md`, `specs/design-language.md`.

— Jonas Ferreira (product design). Maintainer of this archive; Maya Lindqvist
verifies builds against these specs (per-spec §9 checklists).
