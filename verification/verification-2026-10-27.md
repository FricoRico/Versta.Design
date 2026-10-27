---
key: verification-2026-10-27
revision: 1
updated: 2026-10-27T15:55:55.902Z
source: paperclip
---

# Verification record — packs v2 · f2f v3 · state sheets v2/v3 (2026-10-27)

**Trigger:** founder review on NEU-57 — "still missing colors in `neurora-packs-state-sheet-v1`" + "some of the texts in the state sheets overlap." This record covers the revision packages built in response.

## 1 · What changed

| Package | Rev | Delta |
|---|---|---|
| Packs mockup | v1 → v2 | Acid = live/ready: 6pt acid dots on READY rows + aggregate line; acid progress fill on download rows; acid fill + on-acid text on confirm-card primary. DONE label right-margin fixed to spec (20pt). Failures/banner stay mono; first-run carries no dots by honesty. |
| F2F mockup | v2 → v3 | Maya's rev-2 item #1 folded in: history `.p-scrolly` now `height:100%; overflow-y:auto` — sheet genuinely scrolls, last card's COPY·PLAY·KEEP row fully reachable at max scroll. |
| Home/solo mockup | v1 (unchanged) | Re-verified only; no content delta. |
| All 3 state sheets | recomposed | New verified composer (HTML grid → DOM-audit → 2× raster): two-line captions per tile, single-line name rows, no-wrap enforcement verified. |

## 2 · Method (harness hardened this pass)

1. **Click-based state switching** (previous passes over-relied on initial state — a `location.hash` no-op silently re-audited the resting state; fixed, all states now genuinely exercised).
2. **Occlusion-aware text-overlap auditor:** pairwise text-run intersection via Range rects, each run intersected with its own + ancestor clip boxes; a pair is only a defect if `elementsFromPoint` sampling proves both paint at the same point with no opaque separator. This eliminates the v1 auditor's false positives (text under the opaque sheet; unclipped nowrap Range rects).
3. **Slice detector:** partially-masked text lines flagged (ellipsis truncation exempt — intentional).
4. **Composer audit:** the state-sheet page itself is DOM-audited for caption collisions, caption overflow, and clamped description lines before rasterizing.
5. **Pixel probes** on rendered 390×844 PNGs (raw RGB): acid policy in paint, plus a red-free sweep (no error color).
6. **Font forced-load checks** on the self-contained files; geometry spot checks (sheet top 44.0, row h 72.0, DONE inset 20.0).

## 3 · Results — ALL-STATES-PASS

| Surface | States | overlap/slice | acid inventory (DOM) | acid px (paint) |
|---|---|---|---|---|
| Packs v2 | 8 | all clean | resting 3 dots · downloading +acid pbar · confirm(±queue) +acid primary (bg #E6FF00 / fg #0D0D0D) · delete/first-run zero acid | resting 48 · downloading 152 · confirm 16,235 · delete 0 · first-run 0 · **red 0 everywhere** |
| F2F v3 | 11 | all clean | unchanged token set | listening-traveler 12,072 (live EN zone) |
| Home/solo v1 | 9 | all clean | unchanged (orb only) | 2,213 (orb ø56) |
| Sheets ×3 | — | captions: 0 overlaps, 0 overflow, 0 clamped | — | 8/9/11 tiles all embedded at native 390×844 |

F2F history scroll, post-fix: `scrollHeight 630 > clientHeight 560`; last action row bottom 855.75 < phone 890 — fully reachable. 

**On the reported overlap:** the in-screen audit across all 28 states finds no text-on-text collisions in any surface. The v1–v2 sheets' collisions lived in the composition layer (tile captions/layout); that layer is now itself a verified DOM surface, so the failure mode is covered by the per-state audit from here on.

## 4 · Open items (unchanged, non-blocking)

- Packs C1–C4 rendered interpretations (sizes on transient rows; airplane secondary disabled; active-op sort; first-run caption literal) — still flagged in the v1 record, still resolvable by comment.
- Home/solo C1 (capture cluster owns the pill row during solo capture) — flagged in its record.
- Maya: 3 feasibility questions + split-mic-bar bindings — fold-in on arrival.
- Motion is stills-only by construction (transition timing lives in the specs; ADR-0001 ≤300 ms shimmer).

## 5 · Provenance (sha256)

- `neurora-packs-mockup-v2.html` `43ee01cecc01`
- `neurora-facetoface-mockup-v3.html` `20a3c0b53644`
- `neurora-home-solo-mockup-v1.html` `0d7c6fa226fe` (unchanged)
- `neurora-packs-state-sheet-v2.png` `c41a577e2f84`
- `neurora-home-solo-state-sheet-v2.png` `fb11b1e39ee6`
- `neurora-facetoface-state-sheet-v3.png` `bbd48cfb76f8`

Mirrored to [FricoRico/Versta.Design](https://github.com/FricoRico/Versta.Design); prior revs preserved under `archive/`. Related docs: [hifi-packs-offline rev 5](#document-hifi-packs-offline) · [design-system-tokens rev 3](#document-design-system-tokens).
