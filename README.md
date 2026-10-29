# Versta.Design

Long-term archive mirror of the Neurora design sprint deliverables from **NEU-57 —
Design sprint on core traveler flows** (Paperclip issue, October 2026).

Relationship to the tracker: the issue thread is where review happens and where
decisions bind. This repo mirrors **accepted / current state only** — working
drafts and unverified WIP stay on the issue. Mirror convention proposed on the
thread 2026-10-26 19:54Z, directed by the founder 2026-10-27 14:24Z.

**Accepted direction: Face-to-Face** (split conversation surface, ink/acid
language — founder verdict 2026-10-26 19:43Z on the direction-check card).
Current package (2026-10-29): **F2F v5 ground-up redesign** (paired circle mics,
one-moment content model, seam-history gesture) and **country flags** as the
language mark across all surfaces (tokens §7).

## Layout

| Path | Contents |
|---|---|
| `specs/` | Issue documents exported as markdown: teardown, journey map, concepts + decision log, design-language inventory, **design-system-tokens** (normative), and the three hi-fi specs (conversation split, home/solo orb-dock, packs + offline) |
| `mockups/` | Verified single-file HTML mockups (fonts embedded, fully offline). `archive/` holds superseded revisions |
| `state-sheets/` | Rendered contact sheets (PNG), all states at native 390×844, produced by the audited composer (DOM overlap check before rasterizing). `archive/` holds superseded sheets |
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
| `mockups/neurora-facetoface-mockup-v5.html` | `3d2e0f01-…` | `ec3d8289ee88` |
| `state-sheets/neurora-facetoface-state-sheet-v5.png` | `b7221519-…` | `da0bd32dca8b` |
| `mockups/neurora-home-solo-mockup-v3.html` | `d4dba383-…` | `b29b2c54b313` |
| `state-sheets/neurora-home-solo-state-sheet-v4.png` | `3d864a32-…` | `7c7fb43c6ada` |
| `mockups/neurora-packs-mockup-v4.html` | `daf0e46a-…` | `24be188bda6c` |
| `state-sheets/neurora-packs-state-sheet-v4.png` | `429b0eff-…` | `eabd0cfbe8fd` |
| `mockups/archive/neurora-facetoface-mockup-v4.html` | `463f0a6b-…` | `ca935add61b2` |
| `state-sheets/archive/neurora-facetoface-state-sheet-v4.png` | `c46a2144-…` | `15742f714cfd` |
| `mockups/archive/neurora-home-solo-mockup-v2.html` | `2f515f51-…` | `b3966bb24ff6` |
| `state-sheets/archive/neurora-home-solo-state-sheet-v3.png` | `d7cfd616-…` | `578d192b9f77` |
| `mockups/archive/neurora-packs-mockup-v3.html` | `41ee4490-…` | `1f77349dfa13` |
| `state-sheets/archive/neurora-packs-state-sheet-v3.png` | `0784678c-…` | `b1ac3925429b` |
| `mockups/archive/neurora-facetoface-mockup-v3.html` | `741c793a-…` | `20a3c0b53644` |
| `state-sheets/archive/neurora-facetoface-state-sheet-v3.png` | `f87cd865-…` | `bbd48cfb76f8` |
| `mockups/archive/neurora-home-solo-mockup-v1.html` | `91e1d258-…` (uploaded as `neurora-home-solo-final.html`) | `0d7c6fa226fe` |
| `state-sheets/archive/neurora-home-solo-state-sheet-v2.png` | `057620b9-…` | `fb11b1e39ee6` |
| `mockups/archive/neurora-packs-mockup-v2.html` | `2eafac82-…` | `43ee01cecc01` |
| `state-sheets/archive/neurora-packs-state-sheet-v2.png` | `8b409324-…` | `c41a577e2f84` |
| `mockups/archive/neurora-facetoface-mockup-v2.html` | `3c05498d-…` | `ca13e9658a8f` |
| `mockups/archive/neurora-facetoface-mockup-v1.html` | `8c15859e-…` | `594779c6d1b7` |
| `mockups/archive/neurora-packs-mockup-v1.html` | `bde05d22-…` | `1fe1706ab2ea` |
| `state-sheets/archive/neurora-facetoface-v2-state-sheet.png` | `bbd2c075-…` | `16170437c90c` |
| `state-sheets/archive/neurora-home-solo-state-sheet.png` | `2ed4e127-…` | `1392cccc515a` |
| `state-sheets/archive/neurora-packs-state-sheet-v1.png` | `36beece3-…` | `cc9eb7e1c258` |

The verification harness itself is archived here under `tools/` (auditor,
sheet composer, paint probes) — the same code that produced
`verification/verification-2026-10-27-rev2.md` can re-verify any future rev.

**Not mirrored:** the founder-supplied brand boards and current-build captures
(2026-10-14, user-owned uploads — remain on the issue thread), and the five
exploratory wireframes from 2026-10-12 (superseded by concepts + verified
mockups).

## Design language, in one paragraph

Ink on paper, near-monochrome by construction. Exactly one hue exists — **acid
#E6FF00** — and it is functional, not decorative: it marks anything
*live/operative* (capture orb, live mic zone, ready-status dots, download
progress, confirm primaries). Idle actions are ink; failures are mono-gray
honest copy — there is no error color anywhere. Everything structural sits on a
**4pt-unit grid** with 20pt margins and a five-shape radius law (circle / pill /
chip 8 / control 12 / sheet 24) — defined and made binding in
`specs/design-system-tokens.md` §0, 2026-10-27 (founder order). Token set +
rationale: `specs/design-system-tokens.md`, `specs/design-language.md`.

— Jonas Ferreira (product design). Maintainer of this archive; Maya Lindqvist
verifies builds against these specs (per-spec §9 checklists).
