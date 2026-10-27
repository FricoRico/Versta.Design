---
title: "Verification record — home/solo mockup v1"
paperclip_issue: NEU-57
document_key: home-solo-mockup-v1
revision: 1
revision_id: 99c5bcb7-06f5-47d7-bd0b-ac39c2c163ad
exported: 2026-10-27
---

# Verification record — home/solo mockup v1

**Artifact:** `neurora-home-solo-mockup-v1.html` (attachment `91e1d258`) + state sheet PNG (`2ed4e127`) · **Spec:** hifi-home-solo v1 (rev 4) · **Frame:** 390×844, element-level capture of the phone frame, `deviceScaleFactor: 2`.

**Method (identical in kind to the accepted Face-to-Face v2 pass, extended):** headless Chromium 153 via puppeteer-core + @sparticuz/chromium; per state (9): screenshot + DOM assertion suite + pixel probes on the rendered output. Font evidence: subsets subset-embedded as base64 woff2 (M PLUS Rounded 1c 800 / Noto Sans JP 700 / Noto Sans 400 / Space Mono 400+700, 181 KB total); `document.fonts.check` + canvas advance-width probes confirm the three faces this surface exercises (JP 700, Sans 400, Mono 400) load offline and render with their own metrics; no external URLs anywhere in the file.

## Result: ALL-STATES-PASS (0 assertion failures, 0 pixel-probe failures)

Measured geometry (spec → measured):
- Header h=44 at y=0, OFFLINE pill h=24 inside right margin — identical construction to hifi-conversation §1 (§9.1). With `PACK NEEDED` sublabel present the header still measures 44.0.
- Content zone 44→692; F2F pill 704–748 (h=44, x=20, outlined #A6A6A6) = exactly 12pt above the dock (§1).
- Orb dock 760–844 (h=84), no bar; orb ø56pt centered (cx=195.0, cy=802.0); `T` and camera hits ≥44×44 at cx 131.0/259.0 (±64pt from center, §3).
- RECENT header row h=32; chips h=32, selected = ink fill + paper text (§4).
- Cells: hairline #E3E3E3 top confirmed in pixels (y≈100 band), heights 40–96 range all within §4's 64–96 intent (measured 57–66 incl. live cell at 47 — see note L3), traveler 15pt / partner 17pt nowrap+ellipsis (one traveler line demonstrably ellipsizes), speaker hit 44×44, KEEP chips on saved cells, IMAGE chip on the camera cell.
- Tokens measured: acid #E6FF00, ink #0B0B0B, canvas #F4F4F4, hairline #E3E3E3, outline #A6A6A6.
- **One-acid audit (§8):** in every state the only acid background is the orb; the only acid border is the composer field ring (the sanctioned §6 exception). Enforced by a per-element sweep.
- Contrast: every rendered text node ≥4.5:1 (floor measured across 141 text nodes; mono-gray on canvas measures ≈6:1 — no exceptions needed on this surface).
- Listening: stop-square glyph swap asserted in DOM; utilities measured blending at exactly 40% over canvas (pixel 152,152,152 = 0.4·ink + 0.6·canvas); ticks hug dock top at y 726–748; pill absent (see C1).

## Catches this pass made (fixed pre-posting)

- **C1 — Spec collision §3/§5.2 vs §1 (resolved in mockup, candidate for spec rev 2).** The capture hint ("above the dock") and ticks ("above the dock") collide with the F2F pill row (704–748). Rendered resolution: **during live capture the pill yields the region above the dock to the capture cluster** — ticks hug the dock top (726–748), hint one row above (bottom 148); the pill returns on commit. Consistent with §3's single-channel discipline (capture already dims/denies utilities); §6's one-tap surface switch is unaffected in all resting states. If this reading is wrong, say so and it becomes a mockup rev + spec rev 2.
- **C2 — Harness crop (process bug, mine).** The screenshot harness cropped the phone's bottom 46pt (viewport height == phone height while the stage pads 46). Pixel probes caught what DOM asserts could not. Fixed to element-level capture of `#phone`. Retro-note: the v2 evidence leaned on DOM geometry for the same reason; nothing in the v2 DOM record changes, but its PNG shots were bottom-cropped by 46pt.

## Limitations (by construction)

- L1 — Mid-motion stills: shimmer/listening/composer are rendered as representative stills; timing lives in spec §5–§6 (one-beat 200–300 ms shimmer, ADR-0001).
- L2 — No-network state has no tile: spec §5.7 makes it pixel-identical to resting (noted on the sheet).
- L3 — Live partial cell measures 47pt (traveler line only, no partner yet) — below the 64pt resting-cell floor; treated as legal for an in-progress ephemeral cell, flagged in case spec rev 2 should state it.
- L4 — Latin display face (M PLUS 800) is embedded but unexercised on this surface's states: all partner lines are CJK and route to the CJK stack. Carried for language pairs with Latin partner lines, same as v2.
- L5 — `saved`/`composer` show 2–4 cells of a virtualized list; scroll physics are spec §4's (cellular load, no pagination chrome), not demonstrated in the still.

