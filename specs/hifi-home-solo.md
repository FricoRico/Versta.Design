---
key: hifi-home-solo
revision: 6
updated: 2026-10-29T12:19:15Z
source: paperclip
---

# Hi-fi spec — home/solo (orb-dock) · v2

> **Rev 6 (2026-10-29, flags pass):** the header pair label adopts the cross-surface grammar `🇬🇧 EN ⇄ JA 🇯🇵` — flag glyphs at 13px, codes mono 11pt, `⇄` mono-gray (was `English ↔ Japanese`). Flags are *content*, not accent (tokens doc rev 5); the orb stays the only acid element on this surface and the acid sweep assertion is unchanged. No other anatomy change. Verified reference: mockup v3 + state sheet v4 (audit: 0 blocking, 0 grid flags, 9/9 states).

> **Rev 2 (2026-10-27, second founder revision pass):** declutter + placement consistency + grid/shape compliance. Cells lose the per-row replay glyph (replay lives on the show-card the cell opens); the `KEEP` tag moves *inline into the timestamp line* (one right-edge meta line per cell, no trailing cluster fighting the timestamp); the `RECENT` header drops the redundant `ALL` chip — a single `SAVED` toggle chip does the filter. All radii resolve to the shape law ([tokens §0.6](design-system-tokens)); placement follows the binding placement law (tokens §0.7) — dock owns the bottom 84pt, utilities never move, the row above the dock holds one tenant (FACE TO FACE bar ⇄ capture cluster). The whole surface aligns to the 4pt grid (tokens §0) — mockup v2 is the verified reference.

**What this is:** the pixel-level spec for the **home/solo surface** — the not-in-conversation state of the app — in the reconciled ink/acid language. Sibling spec: [hifi-conversation](hifi-conversation) v1 (the ink-split partner surface). Binding sources: [concepts doc](concepts) rev 4 (§Adapts-5 is this surface's charter; F1–F3/F5 fixes), [design language inventory](design-language) v1 (measured tokens), ADR-0001 rev 3 runtime constraints (no cancel anywhere; one-beat shimmer is the only transition theater).

**IA in one line (concepts §Adapts-5):** one app, two geometries, one state change. Home/solo speaks orb-dock (single column + recents + orb); engaging a partner flips to the ink-split conversation surface. This spec covers the orb-dock half of that pair.

Verification notes for Maya live in §9.

---

## 1 · Surface geometry (portrait phone, resting state)

```
┌──────────────────────────────┐
│ ⇄   ENGLISH ⇄ JAPANESE [OFF] │  ← status header, 44pt (identical to conversation)
│──────────────────────────────│
│  empty state copy, 17pt      │  ← teaches the exchange (F5 fix)
│           or                 │
│  RECENT            [SAVED]   │  ← single history door · one toggle (three-door fix)
│  ──────────────────────────  │
│  paired-phrase cells …       │
│                              │
│        [FACE TO FACE]        │  ← conversation entry pill, outlined
│──────────────────────────────│
│   (T)      ⬤      (◫)        │  ← orb dock, h=84pt
└──────────────────────────────┘
```

- **Status header** — 44pt, identical construction to hifi-conversation §1 (⇄ 24pt glyph / pair label mono 11pt +8.5% / `OFFLINE` pill h=24). One header across both geometries: swapping surfaces never moves it, so the flip reads as one state change, not navigation.
- **Content zone** — paper-canvas #F4F4F4, margins 20pt, top-anchored. Two faces: fresh install (empty state, §5.1) and recents (§4).
- **Conversation entry** — `FACE TO FACE` pill, outlined 1pt #A6A6A6, mono 11pt caps, h=44pt, pinned 12pt above the dock. Deliberately *not* in the dock (F1 fix, §3). Entering = the state change to ink-split; 200 ms surface crossfade, no animation theater.
- **Orb dock** — §3. Bottom-anchored, home-indicator aware. Unlike the conversation surface it has no seam: home is one flat plane, with the dock as its only chrome below the header.
- **Screen margin** 20pt throughout (measured build geometry, design-language §3).

## 2 · Type ramp on this surface

| Role | Spec | Used for |
|---|---|---|
| Display | Rounded gothic heavy, 34pt → 3-line wrap → 28pt floor | Partner line on solo quick-result cards |
| Body | Neo-grotesk 17pt / 1.35 | Traveler originals, empty-state copy |
| Mono status | Caps 11pt, +8.5% tracking | Header, pill, meta lines, cell timestamps, `FACE TO FACE`, privacy line |

Same rules as conversation: mono-caps strings carry a 1.45× localization width allowance and clip center, never wrap; display floor 28pt wherever a line is partner-legible (even solo — home results are often shown across a counter before the mode switch).


## 3 · Orb dock anatomy (the F1 fix)

The build's current dock crowds four co-equal cues (type / mic / Conversation / Saved — teardown F1). Home gets **three items with exactly one primary**:

- **Orb (center)** — the voice affordance. Acid #E6FF00 circle, ø56pt, ink mic glyph, ≥48pt hit. The **only acid element on this surface** (design-language §2 rule: one acid element per screen, always the live capture affordance). Hold-to-speak primary; tap-to-toggle settings-flag alternative identical to hifi-conversation §3.
- **`T` glyph (left)** — typed input utility. 24pt neo-grotesk glyph, ink-text #0D0D0D, ≥44pt hit. Opens the composer on this surface (plain single-field sheet — build surface; inherits the conversation spec's traveler-sheet `T` semantics, §Adapts-4: text is a traveler-side utility).
- **Camera glyph (right)** — viewfinder, same spec as `T`. Opens the vision flow; results land as recents cells (§4).

**Explicitly not in the dock:** the Conversation door (moved to the `FACE TO FACE` pill, §1 — it is a *surface change*, not a capture utility) and Saved (folded into the `RECENT` header as a filter chip, §4 — killing the third history door, teardown F3).

Dock container: no visible bar. The three items sit directly on the paper-canvas, vertically centered in an 84pt bottom-anchored region, spaced center / ~64pt-from-center symmetric. This keeps home visually flat: *one loud thing, everything else quiet.*

While the orb is live, `T` and camera dim to 40% (mirrors the resting-zone behavior in hifi-conversation §3); taps during capture are ignored with a mono hint `FINISH SPEAKING FIRST` above the dock — solo surface has exactly one capture channel.

## 4 · Recents cells + the single history door

**RECENT header** — `RECENT` mono 11pt section label; **one trailing toggle chip `SAVED`** (mono 10.5pt capsule, outlined 1pt #A6A6A6, 32pt h, on-state fills ink with paper text; off = the full list). ~~Two chips `ALL`/`SAVED`~~ simplified in v2: `ALL` was the visible-default restating itself. **This collapses the build's three history doors (recents / saved / conversation log) into one list with one filter** (teardown F3). `SAVED` == trip notebook content fed by `KEEP` actions from both surfaces (concepts §Carries-6).

**Paired-phrase cell** (per boards `home-orb-dock`), h auto 64–96pt:
- Hairline #E3E3E3 top; timestamp right in mono 10.5pt (`19:04`).
- Traveler original: body 15pt ink-text (list scale, one line, truncates).
- Partner line: display face 17pt (list scale, one line, truncates — full display lives on the surface it belongs to via tap).
- Right edge carries exactly one meta line: `[KEEP] 19:04` — saved cells prepend the `KEEP` tag (mono 9.5pt, ink fill, paper text, r-chip 8pt) inline before the timestamp. Nothing else on the right edge (v2 placement law; the prior trailing cluster is gone).
- ~~Trailing speaker glyph 20pt replays partner TTS~~ **removed in v2** — replay is a show-card action; the cell opens the card, the card replays. One replay door, not two.

**Cell tap →** inline expansion is *rejected* — tapping a cell opens that line as a **show-card** (fullscreen ink canvas, 44pt display, replay, `DONE`), the identical escalation component as hifi-conversation §5.8. **One show-card component across both surfaces**; engineering builds it once. Exit returns to the list's exact scroll offset.

**List behavior** — newest first; virtualization per Maya's feasibility Q2 (long strings, elastic cells — same cost question as conversation history); no pagination chrome, cellular load only.

## 5 · States

1. **Fresh install / empty (resting)** — content zone carries the exchange-teaching empty state (F5 fix): body 17pt, ink-text, centered in the upper third: `Hold the button. Talk. It translates — no signal needed.` Second line, mono-gray 11pt: `SPEECH STAYS ON YOUR PHONE`. The `FACE TO FACE` pill reads as the obvious next step once a partner is present. **Never teaches the keyboard** (the build's empty state teaches typing; that inversion is the bug).
2. **Listening (solo)** — orb stays acid, mic glyph swaps to the stop square; sparse waveform ticks (design-language §3 motif) render above the dock; live partial transcript appears as an in-progress cell at the top of the zone, body 17pt at 60% ink. T and camera at 40% (§3).
3. **Commit → quick result** — release: one-beat shimmer (200–300 ms) on the committing cell, then it completes as a paired-phrase cell with the partner line in list scale. **No spinner, no progress, no cancel** (ADR-0001). TTS does **not** auto-play on home — solo capture is often private (checking a phrase for yourself); replay lives on the show-card (v2). Deliberate asymmetry with the conversation surface (where TTS auto-plays per hifi-conversation §5.5): home assumes one listener, the split surface assumes two.
4. **Recents populated** — the resting face after first use; the `SAVED` toggle is off.
5. **Entering conversation** — `FACE TO FACE` tap: 200 ms crossfade to the ink-split surface (hifi-conversation §1); header never moves. Recents carry over as conversation history — **one conversation log under both surfaces** (the third-door fix applied to data, not just chrome).
6. **Missing pack** — the header's language meta line gains a mono sublabel `PACK NEEDED` on the affected side; the orb's glyph stays armed but commit produces the inline pack card (identical component to hifi-conversation §5.10: honest cost, `SCHEDULE DOWNLOAD` / `USE SAVED PHRASES`, never an unsolicited mobile-data download). Home never dead-ends.
7. **No network / airplane** — identical UI to every resting state; the pill already says offline. Zero change (the product's core promise).
8. **First run** — shares the conversation surface's coach-mark ladder (hifi-conversation §5.12): home shows mark #0 identical in form — `Each of you gets one button — this one's yours` anchored to the orb, non-modal, dismisses on first capture. Counterpart marks live on the conversation surface.

## 6 · Interaction notes

- **Orb capture semantics** — identical to the conversation surface's traveler zone: hold-to-speak primary; tap-to-toggle via the settings flag; steal semantics do not exist on home (one channel — nothing to steal).
- **T** — opens the composer as a bottom sheet over home (not a mode switch, not a navigation). Field inherits acid focus ring (the one permitted acid exception per design-language §3 composer note — focus state, not resting chrome). Typed results complete as the same paired-phrase cells; identical data path to voice.
- **Camera** — vision flow opens; capture result returns as a paired-phrase cell (translation of the recognized text) with an `IMAGE` mono chip instead of a timestamp ornament. No mode bar anywhere.
- **Surface switch cost discipline** — home ⇄ conversation is the only top-level transition in the app; it must remain one tap in both directions (back affordance on conversation = the system back / edge swipe; no explicit `EXIT CONVERSATION` chrome — the conversation surface owns the live exchange and heading home mid-exchange remains one gesture).
- **KEEP source of truth** — `KEEP` on conversation cards and any future home-card action row writes into the same `SAVED` filter. No second notebook concept.

## 7 · Accessibility

- Dynamic Type honored across the whole surface; cells grow elastically (Maya Q2 virtualization cost noted).
- VoiceOver order: header → FACE TO FACE → list (newest first) → orb → T → camera. The orb announces as `Translate by voice, double-tap and hold`.
- Tap-to-toggle alternative for the orb carries from conversation spec §3 — no coordination needed solo, but motor-impaired travelers get the same escape.
- Partner-line display floor (28pt) applies wherever a line may be shown across a counter — including show-card escalation from recents.

## 8 · Constraint compliance checklist

- [x] No cancel affordance anywhere (ADR-0001 R1.7/R2.10) — incl. composer and vision sheets.
- [x] One acid element per screen: the orb (live or resting); composer focus ring is the only sanctioned focus-state exception.
- [x] Offline ambient and identical; no banners/modals/toasts on connectivity change.
- [x] Privacy line present in the resting state; present during every capture.
- [x] No mode bar; voice orb primary; text/camera demoted to 24pt utilities.
- [x] One history door (RECENT + ALL/SAVED); one show-card component; one conversation log under both surfaces.
- [x] Header identical to the conversation surface — surface switch never re-frames.

## 9 · For Maya — verification checklist (emulator screenshots vs this spec)

1. Header identical to conversation spec §1 construction (44pt, ⇄ / pair / OFFLINE pill); identical across both surfaces, no offset on surface switch.
2. Dock = three items, one primary: acid orb ø56pt center / `T` and camera 24pt glyphs ≥44pt hit / no visible bar / 84pt bottom region. No Conversation cue, no Saved cue in the dock.
3. Orb live: floods acid, glyph→stop, ticks above dock, partial cell 60% ink, T/camera at 40%, mono hint blocks utility taps mid-capture.
4. Recents: hairline cells, traveler 15pt body + partner 17pt display (one line each, truncated), meta line right = `[KEEP?] timestamp` only; single `SAVED` toggle chip in the header.
5. Cell tap → shared show-card (fullscreen ink, 44pt, replay, `DONE`); exit restores exact scroll offset.
6. Fresh install: exchange-teaching empty state (17pt + mono privacy line); no keyboard-first copy anywhere.
7. Missing pack: mono `PACK NEEDED` sublabel in header + inline pack card on commit (honest cost, two choices, no auto-download).
8. No-network = pixel-identical resting state.
9. Tokens: acid #E6FF00 / ink #0B0B0B / paper-canvas #F4F4F4 / hairline #E3E3E3 / outlines #A6A6A6 / margins 20pt.

## 10 · Next in the hi-fi sequence

1. **Home/solo mockup + state sheet** (single-file HTML, headless-verified at 390×844, fonts embedded) — the previewable pair for this spec, same delivery shape as the accepted Face-to-Face package.
2. Pack management + offline states spec (direction-independent, already low-fi in concepts §Shared).
3. Light design-system doc (tokens → SwiftUI/Kotlin names) once the three surface specs stabilize.

*Rev 1 skeleton (19:55) · rev 2 adds §3–4 · rev 3 adds §5–6 · rev 4 completes §7–10. Self-review against concepts rev 4 bindings and design-language tokens: no contradictions found.*