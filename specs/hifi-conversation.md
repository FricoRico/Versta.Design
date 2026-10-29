---
key: hifi-conversation
revision: 3
updated: 2026-10-29T12:19:15Z
source: paperclip
---

# Hi-fi spec — conversation split (Face-to-Face) · v3

> **Rev 3 (2026-10-29, founder revision pass: "redesign from the ground up — too cluttered, radius drift"):** the surface is re-architected, not patched. **Elements per resting state: 15 chrome pieces (v2) → 8.** The 64pt mic-bar band is deleted; capture lives in each half as one ø64 circle mic on its owner's side. Per-turn `COPY·PLAY·KEEP` rows leave the resting surface (actions live on the show-card; the message block is the tap target). History leaves the resting surface: the divider no longer resizes the halves — the seam is one gesture that opens a 656pt history sheet (`PHRASES`/`HISTORY` text buttons cover discoverability). A **temporal coherence** rule now governs content (§4): a half shows only what exists at that moment — `TRANSLATING…` renders no text on the receiving side, live states show the live partial only. Country flags become the language mark wherever a language is named (coordinated with [tokens doc](design-system-tokens) rev 5: flags are *content*, not accent; the one-acid law and no-error-red law exclude flag glyphs). Verified reference: mockup v5 (11 states, audit zero-blocking/zero-off-grid).
>
> Rev 2 (2026-10-27): declutter + grid/shape compliance (utility row removed, meta de-duplicated, radii tokenized). Superseded in layout by rev 3; its grid/shape laws stand and are inherited here unchanged.

**What this is:** the pixel-level spec for the conversation surface in the reconciled ink/acid language. Sources: [concepts doc](concepts) rev 4 §Adapts/§Diverges; [design language inventory](design-language) v1. Runtime constraints from ADR-0001 rev 3 remain binding: **no cancel affordance anywhere; translations complete sub-200 ms; the one-beat shimmer is the only transition theater.** §9 is the verification checklist for Maya's emulator screenshot comparison.

---

## 1 · Surface geometry (portrait phone, resting state)

```
┌──────────────────────────────┐
│ FLIP  🇬🇧 EN ⇄ JA 🇯🇵 [OFFLINE]│  ← header, 44pt, never moves
├──────────────────────────────┤
│ 🇯🇵 JAPANESE · LISTENING      │  ← partner half (ink), 368pt = 46%
│                              │     of the region below the header
│   partner line, Display 34   │     rotates 180° in flip mode
│                              │        ┌────┐
│   SPEECH STAYS ON YOUR PHONE │        │ ◯  │ mic ø64, bottom-right
├──────────── ( ●●● ) ─────────┤  ← seam grabber 36×4, 44pt hit
│ PHRASES               HISTORY│  ← traveler half (paper), 432pt
│ 🇬🇧 ENGLISH                   │
│   translation, Display 26    │
│   own line, body 17 gray     │        ┌────┐
│                              │        │ ◯  │ mic ø64, bottom-right
└──────────────────────────────┘
```

- **Header** — 44pt, paper canvas. Left: `FLIP` text control (mono caps 10.5pt +8.5% tracking, mono-gray #5D5D5D, 44×44pt hit) — rotates the partner half 180° (§flip below). Center: pair label `🇬🇧 EN ⇄ JA 🇯🇵` — flags are the language mark (tokens doc §flags); mono 700 11pt; `⇄` in mono-gray. Right: status pill `OFFLINE`, 1pt #A6A6A6 outline pill shape, mono 10.5pt, h=24pt. Always honest: offline is the resting face, never an error. Pair label taps open the pack sheet (hifi-packs-offline §2 — canonical entry).
- **Partner half** — ink #0B0B0B, y=44, h=368 (46% law preserved). Language tag top-left (y=64): flag + `JAPANESE` + optional status voice, one line, mono 10.5pt.
- **Traveler half** — paper #FFFFFF, y=412, h=432. Tools row y=432–476: `PHRASES` left, `HISTORY` right — mono 10.5pt mono-gray, 44pt hits, no chrome. Language tag y=484.
- **Seam** — 44pt hit zone centered on the boundary (y=390–434); visible grip 36×4pt pill, #5D5D5D at 50%. One gesture: swipe up → history sheet opens (§5.7). **The halves no longer resize** — one less movable part; layout never re-flows.
- **Circle mics** — §3. One per half, bottom-right, on-grid (x=306, right margin 20; partner y=328, traveler y=760).
- **Margins** 20pt; every structural metric is a 4pt multiple (tokens §0). Radii only from the shape law (tokens §0.6): circle (mics, replay, dots), pill (status pill, chips, grabber, progress hairline), r-chip 8 (KEPT tag), r-ctl 12 (pack buttons), r-card 16 (pack/coach cards), r-sheet 24 (sheets).

**Flip mode** — the *entire* partner-half inner (tag, message, mic, ticks, privacy line) rotates 180° in place, so every element stays upright for the person across the counter and their mic sits near their hand. The header, traveler half, and seam never rotate. Manual only, via `FLIP`; 200 ms rotation, no content re-layout.

## 2 · Type ramp on this surface

| Role | Spec | Used for |
|---|---|---|
| Display | Rounded gothic heavy, 34pt/1.18 → 28pt floor | Partner half message; show-card body (44pt) |
| Display (traveler) | Same face, 26pt/1.22 | Traveler half current line |
| Body | Neo-grotesk 17pt/1.35 | Own-language echo line, coach text |
| History rows | Body 15pt ink + CJK-bold 14pt mono-gray | Paired lines, shared anatomy with home recents |
| Mono status | Caps 11–10.5–9.5–9pt, +8.5% tracking | Header, tags, status voice, tools, timestamps, mic labels, privacy line |

- Partner-facing strings never render below the 28pt floor; CJK partner text in the high-legibility face (Diverges-1). Type wraps; it never ellipsis-truncates on the halves.
- Mono-caps locale budget: 1.45× width allowance; pill labels clip center, never wrap.
- **Flags** — emoji glyphs at 13px in an 11pt mono context, letter-spacing 0, 6px gap. From the OS emoji set (never embedded); tokens doc §flags owns the language→flag table.

## 3 · Paired circle mics (the capture control, ground-up)

One control per person, physically on their side of the phone — no shared bar, no mode ambiguity:

- **Geometry** — circle, ø64pt, bottom-right of its half (right/bottom margin 20pt). Partner mic y=328, traveler mic y=760; both x=306 (right-anchored grid seat).
- **Idle** — 1pt outline, no fill: white 45% on ink (partner), ink on paper (traveler); 22px mic glyph + 9pt mono language label (`JA` / `EN`).
- **Live** — acid #E6FF00 fill, on-acid #0D0D0D glyph/label. **One acid element per screen, always the live capture** (the law; design-language §2). The idle side stays visible and steals the turn on press (§6).
- **Disabled** (missing pack) — 40% opacity, no sublabel clutter; the pack card owns the fix (§5.10).
- **Waveform** — while a half listens, sparse 1px ticks (white 55% on ink; ink 55% on paper) render in the 24pt band directly above that half's mic; the half's message, if any, lifts its bottom anchor to 116pt to clear the band.
- **Hold-to-speak** primary; tap-to-toggle as the settings-flag alternative (single tap arms, second commits). Unchanged from v2.

## 4 · Content model — one moment, temporal coherence

Each half carries at most: one language tag line, one message block, one mic, one mic-adjacent medium (ticks). No logs on the resting surface.

- **Partner half message** — the current partner-facing line (their original while they speak; the translation after a traveler commit). Display 34pt, white on ink, bottom-anchored so text sits near the partner in flip mode. While partner TTS plays, a 120×2pt acid progress hairline rides just under the message (live output = live; one-acid accounting: mic is never live at the same moment).
- **Traveler half message** — the traveler's live partial while speaking; the committed English line after. Display 26pt ink.
- **Own echo** — resting states may add the partner-language rendering beneath at body 17pt mono-gray (`own`). During live/translating states it does not exist yet, so it is not rendered (temporal coherence).
- **Temporal coherence rule** — a state shows only what exists at that moment: TRANSLATING renders nothing on the receiving half; a live half shows the partial, not a stale paragraph.
- **Privacy line** — `SPEECH STAYS ON YOUR PHONE`, mono 9.5pt, white 50% on ink, bottom-left of the partner half. Standing reassurance for the local; never an action.

## 5 · States

1. **Ready (empty)** — teaching copy instead of emptiness: traveler half `Hold the phone between you. Each taps their mic.` (Display 26pt) + partner-line instruction rendered in the partner language both halves can read. No history, no own echo.
2. **Listening (traveler)** — traveler mic acid; ticks above it; traveler tag `YOU — LISTENING`; partner half keeps the last partner-facing line.
3. **Listening (partner, flip mode)** — mirrored: partner mic acid, ticks, partner's own live partial in CJK at 34pt; traveler half keeps the last committed turn incl. own echo.
4. **Translating (commit)** — one-beat shimmer ≤300 ms on the committing block, no shimmer elsewhere (ADR-0001); receiving half shows tag `TRANSLATING…` and nothing else. No spinner, no progress UI, **no cancel**.
5. **Result + speaking** — partner half crossfades in the new line (150 ms), TTS auto-plays to the partner-facing audio path, acid progress hairline under the message, tag `SPEAKING`. Traveler half: the committed English line.
6. **Turn steal** — pressing the opposite mic mid-capture commits the in-progress side and arms the new one, with haptic. Never two live mics.
7. **History** — seam swipe-up (or `HISTORY`) opens a paper sheet, top=188 (656pt, r24). Title `HISTORY` + `N TURNS · OFFLINE`. Rows share the home-recents anatomy: EN line body 15pt, JA line CJK 14pt mono-gray, timestamp mono 9.5pt, optional `KEPT` chip (r8); hairline separators; tap row → show-card. Sheet content is a real scroll region; dismiss via scrim tap / drag-down.
8. **Show-card** — tap any message: fullscreen ink canvas, the line at 44pt display, replay circle ø64 (white 40% outline) bottom-center, `DONE` top-right 44pt hit. Exit returns to the exact prior state.
9. **Quick-phrase sheet** — `PHRASES` opens a paper sheet (top=252, r24): title `🇯🇵 QUICK PHRASES` + `OFFLINE`, one category chip row (`ALL` current), items body 17pt EN + CJK 15pt mono-gray; tap → show-card + partner TTS. 100% offline, ships with every pack.
10. **Missing pack** — both mics disabled (40%); pack card (shape r16, canonical copy from hifi-packs-offline §6.2) rides the traveler half: `🇯🇵 JAPANESE PACK NEEDED`, `210 MB · downloads over Wi-Fi by default…`, buttons `NOT NOW` (outline) / `GET PACK` (ink fill). The phrase sheet remains the zero-pack path.
11. **First run** — three coach marks, one per launch: (1) your mic, (2) their mic + FLIP, (3) seam → history. Paper bubble r16 with arrow over a 62% ink scrim; target raised above scrim; dismiss on use.
12. **No network / airplane** — pixel-identical to the same state online. The pill already tells the truth.

## 6 · Interaction notes

- **Turn arbitration** — exactly one capture channel at a time; steal commits, never discards audio already heard.
- **TTS routing** — partner language plays toward the partner; replay lives only on the show-card; replay never re-arms a mic.
- **Seam** — history gesture only. The 30/54/78% resize physics from v2 is **removed** (declutter; kills the elastic re-layout feasibility concern Q2 as a bonus).
- **Keyboard / camera** — not on this surface. Home dock owns both utilities (one home per utility); partner side never has a keyboard.
- **Keep semantics** — `KEPT` marks ride history rows; kept turns are the same store as home `SAVED` (one door).
- **Pair swap** — header only; tags, mic labels, flag order re-label instantly; no navigation.

## 7 · Accessibility

- Dynamic Type honored traveler-side; partner side floors at 28pt.
- VoiceOver focus order is announced *unrotated* (a11y tree vs visual geometry — Maya Q1; if rotated containers scramble order, hand-order the a11y tree, keep the visual flip).
- Tap-to-toggle mic alternative (§3). Haptics on commit and steal. 44pt minimum hits on FLIP / PHRASES / HISTORY / DONE (mics are 64).
- Flag glyphs carry `EN`/`JA` codes adjacent — color is never the only language cue.

## 8 · Constraint compliance checklist

- [x] No cancel affordance anywhere (ADR-0001 R1.7/R2.10).
- [x] One acid element per state: the live mic, or the TTS progress hairline while speaking. Never both; never decorative.
- [x] Flags are content color, excluded from the one-acid and no-error-red laws (tokens doc §flags).
- [x] Offline is ambient and identical; no banners/modals/toasts for connectivity.
- [x] Privacy line present in partner half in capture states.
- [x] Partner display ≥28pt floor; CJK legibility face; mono owns all meta strings.
- [x] No mode bar; no inline per-row actions on the resting surface.
- [x] Radii only from the shape law; all structural metrics on the 4pt grid — mockup v5 audit: 0 blocking issues, 0 grid flags, 11/11 states.

## 9 · For Maya — verification checklist (emulator vs spec)

1. Header h=44pt: `FLIP` left, flagged pair label centered, `OFFLINE` pill right. Pair label grammar `🇬🇧 EN ⇄ JA 🇯🇵` matches home/packs exactly.
2. Partner half y=44 h=368 ink; traveler half y=412 h=432 paper; seam hit y=390–434 with 36×4 grip.
3. Circle mics ø64 at (306,328) partner / (306,760) traveler; idle = outline only; acid fill only while live.
4. Flip mode rotates the whole partner inner 180° (mic included), nothing else rotates.
5. Tags mono 10.5pt with flag glyphs color-rendered (system emoji font, not bundled assets).
6. History sheet top=188, rows share home-recents anatomy; show-card identical geometry to the spec here.
7. States 2/3/5: acid exactly once (live mic; or 120×2 progress hairline under the speaking line). States 1/4/7/9/10/11: zero acid.
8. Tokens: ink #0B0B0B, acid #E6FF00, canvas #F4F4F4, margins 20, sheet r24; every radius resolves to a shape token.
9. Temporal coherence: TRANSLATING shows no receiving-side text; live states show partials only.

**Open feasibility items** (carried, non-blocking): rotated container + mic/TTS routing per half + accessibility focus order; TTS/partner-mic audio-session policy. The elastic-history question (Q2) is withdrawn — the v3 seam opens a bounded sheet, there is no live re-flow to cost.

## 10 · Siblings

[hifi-home-solo](hifi-home-solo) (orb-dock solo surface), [hifi-packs-offline](hifi-packs-offline) (pack management + offline states, canonical owner of the missing-pack card + header download sublabels), [design-system-tokens](design-system-tokens) (normative tokens incl. the flags rule).
