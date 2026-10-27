---
title: "Face-to-Face mockup — v2 (verified)"
paperclip_issue: NEU-57
document_key: facetoface-mockup-v2
revision: 3
revision_id: b3fe5862-28ed-4cfe-ba13-bfba26085e8e
exported: 2026-10-27
---

# Face-to-Face mockup — v2 (rebuilt after rejection)

Rebuilt against spec hifi-conversation v1 with a headless verification loop (Chromium screenshots at 390×844 + programmatic geometry/clip/contrast assertions per spec §9). v1's failure mode — overlaps and layout errors shipped unverified — is addressed by checking every state numerically before posting.

## Artifacts

- **State sheet (PNG)** — all 11 states in one contact sheet: see attachment `neurora-facetoface-v2-state-sheet.png`
- **Single-file mockup (HTML)** — state switcher baked in; open at 390×844 or any phone-size window, click states in the top strip: see attachment `neurora-facetoface-mockup-v2.html` (fonts subset-embedded, works offline)

## What changed from v1

- Rebuilt geometry from spec §1/§9: header 44pt; partner panel 46% of the region below it (368 of 800pt); mic bar 64pt straddling the seam; divider 28pt hit; traveler sheet bottom-anchored with r=24pt top corners; 20pt margins throughout.
- Tokens corrected to ink #0B0B0B / acid #E6FF00 / canvas #F4F4F4; mono owns meta strings; partner CJK in the high-legibility face (Noto Sans JP), Latin display in rounded gothic (M PLUS Rounded 1c).
- Fixed classes of error caught by the verifier: meta line vs mic-bar occlusion (content now clears the straddling bar), phrase-sheet category chips overflowing the panel edge (wrap to two rows), history cards clipping mid-action-row (scroll fade cue), coach bubble grazing mic labels (arrow now lands in the bar's center gap).

## States verified (numeric pass, all clean)

1. Ready (resting) — empty-state copy, honest OFFLINE pill, both zones armed
2. Listening (traveler) — acid traveler zone, partner zone at 40%, partial card 60% ink, ticks, privacy line
3. Listening (partner, flip) — partner subtree rotated 180° only; 28pt/60% partial on panel
4. Commit — one-beat shimmer mid-pulse on the committing card; no spinner, no cancel
5. Result + TTS — partner line at 34pt (3-line wrap), action row, PLAY progress ring
6. Turn steal — committing side shimmers, new side acid; never two live zones
7. History revealed — sheet at 78% snap, partner panel to 3-line strip
8. Show-card — fullscreen ink, 44pt line, DONE + replay
9. Quick-phrase sheet — 5 pack categories, 100% offline
10. Missing pack — inline pack card, partner mic disabled with PACK NEEDED sublabel
11. No network — identical to Ready by design (offline is ambient; §5.11)
12. First run — coach mark 1 of 3, non-modal

Contrast: all text ≥4.5:1 against its surface except the privacy line (#5D5D5D on ink, the spec-mandated quiet mono-gray, §4).
## Rev-2 known issues (from Maya's independent review pass, 2026-10-26 17:01)

Maya re-verified the v2 HTML headlessly (sha ca13e965, independent assertions) — geometry, tokens, flip behavior, and offline font load all confirmed. Two non-blocking findings, both accepted:

1. **History sheet doesn't actually scroll.** `.p-scrolly` is `overflow: visible` (scrollHeight == clientHeight == 630), so the last card's COPY·PLAY·KEEP row crops under the phone's `overflow: hidden` and the fade cue promises a scroll that isn't wired. **Gap in my verifier:** clip/overlap assertions never measured scrolling-region metrics, so a static-layout failure passed as verified. **Fix (rev 2):** constrain `.p-scrolly` to the sheet region with `overflow-y: auto`; add assertions `scrollHeight > clientHeight` in state 7 and last action row fully in-viewport at min-scroll.
2. **Motion is stills-only.** Shimmer/flip/progress render as mid-motion stills by construction — fine for a direction check; live transitions are engineering's (spec §5–§6 timing, ADR-0001 ≤300 ms shimmer). Noted so demo expectations are set.

Both roll into rev 2 alongside Maya's open feasibility answers; no rev 3 of the artifact ahead of the founder's direction call.

