---
title: "Hi-fi spec — conversation split (Face-to-Face) v1"
paperclip_issue: NEU-57
document_key: hifi-conversation
revision: 1
revision_id: d7debda7-dbfd-4c5e-b98e-d74e58316617
exported: 2026-10-27
---

# Hi-fi spec — conversation split (Face-to-Face) · v1

**What this is:** the pixel-level spec for the conversation surface, built in the reconciled ink/acid design language. Sources: [concepts doc](concepts) rev 4 §Adapts/§Diverges (binding decisions) and [design language inventory](design-language) v1 (measured tokens). Runtime constraints from ADR-0001 rev 3 are binding: **no cancel affordance anywhere; translations complete sub-200 ms; the one-beat shimmer is the only transition theater** (regression path per concepts doc §Runtime-constraints).

Verification notes for Maya are in §9 — every number she needs to compare emulator screenshots against this spec lives there.

---

## 1 · Surface geometry (portrait phone, resting state)

```
┌──────────────────────────────┐
│ ⇄   ENGLISH ⇄ JAPANESE [OFF] │  ← status header, 44pt
├──────────────────────────────┤
│                              │
│   PARTNER PANEL (ink)        │  ← rotates 180° in face-to-face mode
│   Display text ≥28pt         │     default share: 46% of viewport
│   JAPANESE — OFFLINE · 84 MB │
│                              │
├──  ════════ ═══  ────────────┤  ← divider grabber, 28pt hit zone
│ [SPEAK EN] │ [話す JA]        │  ← split mic bar, 64pt, straddles seam
├──────────────────────────────┤
│  TURN CARD (paper)           │
│  ENGLISH — YOU · 19:04       │
│  traveler text, 17pt body    │
│  ─────────────────           │
│  partner display text        │
│  COPY · PLAY · KEEP          │
│  ▸ RECENT                    │  ← traveler sheet scrolls
└──────────────────────────────┘
```

- **Status header** — 44pt, paper canvas. Leading: `⇄` swap (24pt glyph zone, ≥44pt hit). Center: pair label, mono caps 11pt +8.5% tracking. Trailing: status pill `OFFLINE`, outlined 1pt #A6A6A6, mono 11pt, h=24pt. The pill is always honest — offline is the resting face, never an error (design-language §3).
- **Partner panel** — ink #0B0B0B canvas, top. Default height 46% of the region below the header. Content sits bottom-anchored (text emerges toward the people, not the status bar). Margins 20pt.
- **Divider / grabber** — 28pt vertical hit zone; visible grip = 36×4pt rounded pill, hairline-on-ink (white 14%) when the sheet rests over ink.
- **Split mic bar** — §3 (the one deliberate deviation from the boards).
- **Traveler sheet** — paper #FFFFFF on paper-canvas #F4F4F4, top corners r=24pt when over the partner panel. Bottom-anchored to the keyboard-avoiding region. Contains turn cards, newest at top.
- **Screen margin** 20pt throughout, matching the measured build geometry.

**Flip mode** (face-to-face): the partner panel subtree rotates 180° in place — text, meta line, and its mic-zone label. The status header and traveler sheet never rotate. Auto-trigger: none on v1 (deliberate — auto-rotation misfires in-hand); manual via the flip affordance on the partner panel (§4). Enter/exit animates 200 ms rotate, no content re-layout.

## 2 · Type ramp on this surface

| Role | Spec | Used for |
|---|---|---|
| Display | Rounded gothic heavy, 34pt default, wraps 3 lines then scales to 28pt floor | Partner-facing lines (live result, card partner text, show-card) |
| Body | Neo-grotesk regular 17pt / 1.35 line | Traveler text on cards |
| Mono status | Caps 11pt, +8.5% tracking | Header pair label, pill, card meta, mic labels, action rows, privacy line |

- Partner-facing strings never render below the 28pt display floor (concepts §Carries-2). Long translations wrap to 3 lines, then the type scales — never truncates with ellipsis.
- CJK partner text renders in the **high-legibility face** (Diverges-1). The wavy brand face is NOT in this spec; if brand wants it, it lands behind the display toggle after the native-reader check. Kept out of v1 on purpose.
- Mono-caps locale budget (design-language §2): all mono strings on this surface get a 1.45× width allowance; pill and mic labels clip center, never wrap.

## 3 · Split mic bar (the deviation, specced)

Rationale (concepts §Adapts-1): the boards' single orb leaves turn assignment ambiguous — the exact category friction this design exists to kill (teardown §1.2). Same straddling form, two labeled zones.

- **Geometry** — full-width bar, h=64pt, straddling the divider seam. Two zones split 50/50 at the seam's center. Each zone's hit area ≥48pt.
- **Traveler zone (left/bottom, sheet side)** — paper fill, ink-text label `SPEAK — ENGLISH` mono 11pt + mic glyph, 1pt #A6A6A6 outline.
- **Partner zone (right/top, ink side)** — ink fill, paper label in the *partner's* language (`話す — 日本語` when JA), same type spec; rotates with the partner panel in flip mode.
- **Live state** — the pressed zone floods acid #E6FF00, label/glyph flip to on-acid #0D0D0D; the resting zone dims to mono-gray. **One acid element per screen, always the live capture affordance** (design-language §2). While a zone is live, the other zone stays visible at 40% opacity and tap-steals the turn (§5).
- **Hold-to-speak** is primary per the boards. Accessibility alternative: tap-to-toggle (single tap arms, second tap commits). Both land in v1; the toggle mode is a settings flag, not a visible mode switch (no mode bars — §Adapts-4).

## 4 · Turn card anatomy + partner panel content

**Turn card** (traveler sheet, one per exchange, newest first):
- Header: mono 10.5pt `ENGLISH — YOU · 19:04`; state token is `YOU/OFFLINE`-class per boards.
- Traveler original: body 17pt ink-text #0D0D0D.
- Hairline #E3E3E3.
- Partner translation: display face at 20pt on-card (the ≥28pt floor applies to the *partner panel* and show-card — the surfaces the partner actually reads; card row is the traveler's record).
- Action row: `COPY · PLAY · KEEP` mono 11pt, ink-text, 44pt hit rows. `KEEP` pins to the trip notebook (B-rail absorption). `PLAY` replays partner-side TTS.

**Partner panel** (what the local across the counter sees):
- Live: latest partner-language line, Display 34pt, white on ink, max 3 lines → scale to 28pt floor.
- Meta line: mono caps acid `JAPANESE — OFFLINE · 84 MB`, trailing speaker glyph (replay) + size honesty (§Carries-4).
- Privacy line, mono-gray #5D5D5D: `—— SPEECH STAYS ON YOUR PHONE` — visible in listening state on both halves.
- Flip affordance: 24pt icon, top-right of the partner panel (bottom-right when rotated), white 60%, ≥44pt hit.
- Sun-invert toggle: lives behind the flip affordance's long-press (invert partner panel to paper/ink-text for direct-sun counters — Diverges-2; beta-validate). Not a header control; discoverability via first-run coach mark #2.

## 5 · States

1. **Ready (resting)** — pill honest, meta line present, both mic zones armed-looking. Empty state copy on traveler sheet (mono-gray, body 17pt): `Hold a mic. Talk. The screen splits the conversation.` — teaches the exchange, not the keyboard (teardown F5).
2. **Listening (traveler)** — traveler zone acid; partner-side waveform ticks render as the sparse hairline motif (type-stack adaptation, one side at a time) under the meta line. Live partial transcript in the traveler sheet as an in-progress card, body 17pt at 60% ink.
3. **Listening (partner, flip mode)** — mirrored: partner zone acid, ticks on the partner side, partial transcript on the partner panel in display face at 28pt/60% white.
4. **Commit** — on release: one-beat shimmer (200–300 ms, opacity 1→0.6→1 on the committing card) so the state change reads as deliberate. No spinner, no progress, **no cancel** (ADR-0001). If beta telemetry trips p95 > 1.5 s, the pre-agreed fallback is a `TRANSLATING…` reassurance chip with elapsed time — not specced in v1, trigger is telemetry-based.
5. **Result + TTS** — partner panel swaps to the new display line (150 ms crossfade), TTS auto-plays routed to the partner-facing audio path; traveler card completes; action row appears on touch. While partner TTS plays, `PLAY` becomes a progress ring on the card; partner mic stays armed (handoff serializes per Maya's Q3 — if the audio session can't overlap, partner-mic press ducks TTS, it never blocks).
6. **Turn steal** — pressing the opposite zone mid-capture commits the in-progress side (as if released) and arms the new side, with haptic. Never two live zones.
7. **History revealed** — divider drags up; partner panel compresses to a 3-line summary strip; sheet expands to full history (elastic cells, virtualized — Maya's Q2). Snap points: 30% / 54% / 78% of viewport. Spring settle 250 ms, no free-float positions.
8. **Show-card** — tap any partner line (card or panel): fullscreen ink canvas, that line at 44pt display, replay button, `DONE` mono top-right. For sun, noise, hand-the-phone-over moments (C absorption). Exit returns to the exact prior divider state.
9. **Quick-phrase sheet** — swipe up from the traveler sheet's grabber: curated pack phrases (Greetings / Prices / Directions / Allergies / Emergency), one tap → show-card + partner TTS. Works 100% offline — ships with every pack (concepts §Shared).
10. **Missing pack** — inline card in the traveler sheet: `JAPANESE PACK — 210 MB · ~40 S ON WI-FI`, two buttons: `SCHEDULE DOWNLOAD` / `USE SAVED PHRASES`. Never a dead end, never an unsolicited mobile-data download (offline states wireframe). Conversation continues with phrase content; mic zones on the unpackaged language render disabled with a mono sublabel `PACK NEEDED`.
11. **No network / airplane** — identical UI; the pill already says offline. Zero state change (the whole point: same face online and off).
12. **First run** — three coach marks, one per launch count: (1) two labeled mics — `Each of you gets one button`, (2) flip + sun-invert, (3) drag divider → history. Non-modal, dismiss on first use; never all at once.

## 6 · Interaction notes

- **Turn arbitration** — exactly one capture channel open at a time (§5.6). Steal commits, never discards audio already heard.
- **TTS routing** — partner language plays toward the partner (flip mode: same speaker, but the *screen* honors orientation); replay never re-arms a mic.
- **Divider physics** — snap-only (§5.7); content re-flows live during drag (elastic, per feasibility Q2 cost check).
- **Keyboard** — traveler sheet header carries a `T` glyph; opens the composer for typed traveler input (text is a traveler-side utility, §Adapts-4). Partner side has no keyboard — the local talks, they don't type.
- **Camera** — traveler sheet header viewfinder glyph, opens the vision flow; results land as normal turn cards. No mode bar anywhere.
- **Keep ⇄ semantics** — pair swap lives only in the header; both mic labels and the meta line re-label instantly; no navigation.

## 7 · Accessibility

- Dynamic Type honored traveler-side; partner side floors at 28pt regardless (design intent: legible across a counter).
- VoiceOver: focus order is announced *unrotated* (screen-reader geometry, not visual geometry) — flagged in Maya Q1; if rotated containers scramble focus order on either platform, the flip visual stays but the a11y tree must be hand-ordered.
- Tap-to-toggle mic alternative (§3). Haptic on commit and steal.
- Sun-invert toggle is also the low-vision high-contrast escape hatch.

## 8 · Constraint compliance checklist

- [x] No cancel affordance anywhere on the surface (ADR-0001 R1.7/R2.10).
- [x] One acid element per screen = the live mic zone only.
- [x] Offline is ambient and identical; no banners/modals/toasts for connectivity.
- [x] Privacy line present in every capture state.
- [x] Partner display ≥28pt floor; CJK legibility face; mono owns all meta strings.
- [x] No mode bar; voice primary; text/camera demoted to traveler utilities.

## 9 · For Maya — verification checklist (emulator screenshots vs this spec)

1. Split geometry: partner panel 46% resting share; mic bar h=64 straddling; divider 28pt hit; snapped positions 30/54/78%.
2. Flip mode rotates partner subtree 180° only; header + traveler sheet never rotate.
3. Mic bar: two labeled zones, labels in each person's language; acid floods only the live zone; resting zone 40%.
4. Turn card: header mono / body 17 / hairline #E3E3E3 / actions `COPY · PLAY · KEEP`.
5. Partner panel: display 34→28 floor, acid meta line `…— OFFLINE · 84 MB`, privacy line, flip affordance.
6. States 2/4/5: acid live zone, one-beat shimmer ≤300 ms, no progress UI, no cancel.
7. Missing-pack card + disabled-mic sublabel; phrase sheet opens offline.
8. Tokens: ink #0B0B0B (not pure black), acid #E6FF00 (not the build's #E4FF3C), paper-canvas #F4F4F4, margins 20pt, sheet corner r=24pt.

**Open feasibility items carried from concepts §Next-steps-3** (non-blocking; answers fold into rev 2 as they land): rotated container + mic/TTS routing per half + accessibility focus order; elastic/virtualized history under long strings; TTS/partner-mic audio-session policy. Split-mic-bar bindings ride along with Q1.

## 10 · Next in the hi-fi sequence

Home/solo (orb-dock) spec next, then pack management + offline states (direction-independent deltas from the low-fi wireframes). Light design-system doc (tokens → SwiftUI/Kotlin names) follows once the three surface specs stabilize.

