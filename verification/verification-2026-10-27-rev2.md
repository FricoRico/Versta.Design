---
key: verification-2026-10-27-rev2
revision: 1
source: paperclip
---

# Verification record — 2026-10-27 (second founder revision pass)

**Scope:** Face-to-Face mockup v4, Home/Solo mockup v2, Packs mockup v3 + their three state sheets. Driven by the founder comment on [NEU-57](NEU-57): rounded-corner consistency, declutter, packs contrast, button-placement consistency, and a *defined, always-used* grid system.

## Method

Headless Chromium 153 (Playwright 1.64.1) at 390×844 against the exact posted single-file artifacts (embedded fonts, fully offline). Two harnesses, both committed to the repo (`tools/`):

- **`tools/audit.mjs`** — per state (click-driven switching): (1) plane-partitioned text-overlap detection (occlusion-aware — a covered text flags only when both paint at the same pixel or one element's opaque box chops the other's glyphs; sheet/scrim/modal planes partition legitimately layered content), (2) untruncated-string check (clips without `ellipsis` flag), (3) shape law — every computed `border-radius` must resolve to the five tokens (`50%`, `999px`, `8`, `12`, `16`, `24`), (4) 4pt-grid audit on structural boxes with documented exemptions (full-bleed 390 / content-span 350, centered, right-anchored, content-sized), (5) acid element sweep.
- **`tools/probe.cjs`** — paint-level probes on per-state screenshots: acid `#E6FF00` / ink `#0B0B0B` / red-hue pixel counts (switcher chrome excluded — a capture bug found and fixed in this pass).
- **`tools/compose-sheet.mjs`** — the state-sheet composer; the composed sheet page is itself DOM-audited (caption clamp/overlap, tile load) before rasterizing, then each tile is pixel-verified against its state shot (this pass caught and fixed a tile-order bug and a border-box downscale bug).
- Spec-geometry spot checks (§9 contract): header 44 / partner 368 (46%) / mic bar 380+64 / sheet 412; home h-zone 44–692 / F2F bar 704–748 / dock 84; packs sheet pins y=44, rows 72 — all OK.

## Blocking-layer results (all 28 states, all three mockups)

| Mockup | States | Text overlaps | Clipped strings | Radius-law violations | Off-grid structural |
|---|---|---|---|---|---|
| Face-to-Face v4 | 11 | 0 | 0 | 0 | 0 |
| Home/Solo v2 | 9 | 0 | 0 | 0 | 0 |
| Packs v3 | 8 | 0 | 0 | 0 | 0 |

Baseline sanity: running the auditor on the *previous* packages flags 124 violations on home v1 alone (stray radii etc.) — the gate has teeth.

## Paint probes (acid law)

Acid must appear only where policy binds it. Counts are exact `#E6FF00` pixels in the cropped phone region:

| State group | Expected | Measured |
|---|---|---|
| F2F ready/commit/result/history/phrase/missing/first-run/showcard | 0 (nothing live) | 0 across all 8 |
| F2F listening-traveler / listening-partner / turn-steal | one live mic zone ≈12k | 12001 / 11989 / 11985 |
| Home all dock states | the orb ≈2.2k | 2194 in all 7 + first-run; composer 1483 (field focus ring, on-policy); showcard 0 |
| Packs resting/delete/storage | ready dots only | 48 / 48 / 48 |
| Packs downloading | dots + progress fill | 152 |
| Packs paused | dots (no live fill) | 32 |
| Packs confirm / confirm-queue | acid primary card | 16248 / 16368 |
| Packs first-run | honestly zero | 0 |

Red/error hues: **0 pixels in all 28 states.** Ink-fill verification for the founder's contrast ask: packs resting now carries 26,048 ink px (filled GET/UPDATE capsules + native names) vs the thin-stroke previous package.

## State-sheet integrity

Every tile in every sheet is pixel-equivalent to its verified state shot: per tile, acid px **exactly equal** and strong-pixel-diff (>16 channel delta) **0.00%** across all 28 tiles. Sheets: captions numbered two-liners, no clamp, no overlap, tiles 390×844 native.

## Artifact hashes (sha256, first 16)

| sha256 | file |
|---|---|
| `ca935add61b21839` | neurora-facetoface-mockup-v4.html |
| `b3966bb24ff63d1e` | neurora-home-solo-mockup-v2.html |
| `1f77349dfa132ca1` | neurora-packs-mockup-v3.html |
| `15742f714cfd941e` | neurora-facetoface-state-sheet-v4.png |
| `578d192b9f772d2d` | neurora-home-solo-state-sheet-v2.png |
| `b1ac3925429b9999` | neurora-packs-state-sheet-v3.png |

## Spec/doc revisions landing with this record

- [design-system-tokens](design-system-tokens) rev 4 — new binding §0 grid & shape system (founder order: define it, always use it).
- [hifi-conversation](hifi-conversation) rev 2 — declutter (utility row out, meta single-item), grid/shape compliance.
- [hifi-home-solo](hifi-home-solo) rev 5 ("v2" content) — cell meta line, single SAVED toggle, placement law.
- [hifi-packs-offline](hifi-packs-offline) rev 6 — ink-filled row actions, ink-outline secondaries, shape/grid compliance.
