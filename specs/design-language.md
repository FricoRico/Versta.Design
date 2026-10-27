---
title: "Design language inventory — ink/acid v1"
paperclip_issue: NEU-57
document_key: design-language
revision: 1
revision_id: 349826d3-4999-491c-8b18-2c7bb229e18e
exported: 2026-10-27
---

# Design language inventory — ink/acid v1

**What this is:** the measured token and component sheet extracted from the six guideline boards (`home-ink-sheet`, `home-ink-modes`, `home-ink-split`, `home-ink-split-flip`, `home-orb-dock`, `home-type-stack`) and the three current-build home captures attached to this issue. It is the build sheet for hi-fi and for engineering's Swift/Kotlin mapping. It commits to no concept decision — the language applies regardless. Concept-level reconciliation lives in the [concepts doc](concepts) (rev 4); this doc is the *measured layer* underneath it.

## 1 · Color tokens (sampled from the actual assets, sRGB)

| Token | Hex | Observed |
|---|---|---|
| `acid` | **#E6FF00** (boards) / #E4FF3C (build) | Live capture only: mic FAB, hold-to-speak pill/block, focus ring, accent meta line |
| `on-acid` | #0D0D0D | Mic glyph, block label, "HOLD TO SPEAK" copy |
| `acid-dim` | ≈#92A202 | Handle/progress hairline on the acid block |
| `ink` | #000000 (boards) / **#0B0B0B** (build) | Partner-facing canvas, composer dock |
| `paper` | #FFFFFF | Turn cards, sheets, composer field |
| `paper-canvas` | #F4F4F4 | Screen backdrop behind cards (orb-dock) |
| `paper-warm` (build only) | canvas #FFF7FA, chip #F1E5E9, mono-ink #564149 | Legacy mauve tint — see §4 |
| `ink-text` | #0D0D0D (boards) / #22191C (build) | Display + body on paper |
| `mono-gray` (on ink) | ≈#5D5D5D | "Speech stays on your phone", secondary meta |
| hairline on paper | ≈#E3E3E3 | Turn-card divider, wave ticks |
| hairline on ink | white ≈12–16% | Split action-bar divider |
| outline strokes | ≈#A6A6A6 | Language pills, status pill on paper |

## 2 · Type tokens

- **Display** — partner-facing translation type. Heavy rounded gothic; ~34–44pt phone; wraps to 3 lines then scales down. CJK face is an open flag (concepts rev 4, §Diverges-1): hi-fi specs a high-legibility face; any novelty treatment gates behind a native-reader check.
- **Body** — traveler-side prose. Neo-grotesk regular, 17pt.
- **Mono microcopy** — the status voice. Caps, +8–10% tracking, 11–12pt. Owns every meta string: `JAPANESE — OFFLINE · 84 MB`, timestamps, `READY — JAPANESE OFFLINE`, pill labels, `HOLD TO SPEAK — ENGLISH`, `COPY · KEEP`, section labels (`RECENT`).
- Localization budget: mono caps + tracking runs ~35–45% wider in German/Finnish-class languages — meta strings need either wrapping rules or a width cap per component (details at hi-fi).

Rules of voice: **one acid element per screen** (the live capture affordance); partner-facing strings never below the display floor; numbers/status are always mono, never proportional.

## 3 · Component anatomy (board provenance → build note)

- **Status pill** — `Offline`, outlined, mono, top-right of header. Always honest: offline is the resting face, not an error.
- **Language meta line** — mono caps + size + state (`JAPANESE — OFFLINE · 84 MB`); acid on ink, gray on paper. Speaker + copy glyphs trailing.
- **Mic orb / FAB** — acid circle, ink glyph; straddles the seam between the two surfaces. Build renders ø≈52pt in the dock; boards render larger at mock scale (not to pixel scale — geometry locks at hi-fi with a ≥48pt hit area).
- **Split mic bar** — the one deliberate deviation from the boards (concepts rev 4, §Adapts-1): orb form, split into two labeled zones so turn ownership is unambiguous.
- **Acid voice block** — full-bleed hold-to-speak sheet (`home-type-stack`): mono label top, mic glyph center, privacy subline, `acid-dim` progress hairline. This is the charge/engaged state of capture.
- **Conversation turn card** (paper) — mono header `LANGUAGE — YOU|OFFLINE` + timestamp; traveler text; hairline; partner Display text; action row `Copy · Play · Keep` (`Keep` = pin to trip notebook).
- **Recents** — paired-phrase cells, hairline list, timestamps right (`home-orb-dock`).
- **Toast** — white, hairline border, mono (`Ready — Japanese offline`). Ambient confirmation; never a banner.
- **Composer dock** (current build only) — ink panel, white pill field, camera + mic, acid focus states (field fills acid / ring on dark variant). Retires when home adopts orb-dock IA; its focus-state work transfers to the traveler-panel keyboard affordance.
- **Swap ⇄** — arrows-with-dot glyph between the language pair; persists across all boards.
- **Waveform divider** — sparse hairline ticks (`home-type-stack`); adopted as the per-side listening indicator, one at a time.
- **Privacy subline** — `—— Speech stays on your phone`; recurring motif, mono gray; the offline-first promise in one sentence.

Measured geometry from the build captures (@2x, verify in hi-fi): input pill h≈55pt, mic ø≈52pt, dock corner r≈32pt, pills full-round, screen margin ≈20pt.

## 4 · Delta — current build → guideline boards

1. **Canvas warms down.** Build blush (#FFF7FA/#F1E5E9) → boards' neutral white on #F4F4F4. Recommendation: adopt the neutral pair; the warm tint earns no contrast benefit and complicates two-tone parity.
2. **Acid drifts.** #E4FF3C (build) vs #E6FF00 (boards) — unify on #E6FF00.
3. **Ink.** Boards render pure #000000; keep the build's #0B0B0B (avoids OLED smear) — record as intentional.
4. **Entry mode.** Build opens text-first (`Tap to start typing.` + dock). Boards keep voice primary per surface; text becomes a traveler-side utility (concepts rev 4, §Adapts-4).

## 5 · Open for hi-fi (not part of the direction gate)

- Lock acid + on-acid pair against contrast targets; audit `acid-dim` usage.
- CJK display face selection (flag, concepts rev 4 §Diverges-1).
- Sun-invert panels toggle — spec at hi-fi, validate at beta (§Diverges-2).
- Split-mic-bar geometry, hit areas, and flip-mode transitions.
- Mono-caps localization stress pass (German/Finnish expansion).

