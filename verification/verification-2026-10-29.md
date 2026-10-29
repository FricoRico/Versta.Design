# Verification record — 2026-10-29 (rev pass 3: F2F ground-up + flags)

Scope: founder comment 2026-10-29 07:07Z — (1) Face-to-Face redesigned from the ground up (clutter, radius drift), (2) country flags for the languages across surfaces. Supersedes: `verification-2026-10-27-rev2` for the surfaces it re-verifies.

## Method

Same harness, same teeth (committed under `tools/`): per-state DOM audit (occlusion/plane-aware text-collision, clip-aware truncation, radius law ≤ `pill/circle/8/12/16/24`, 4pt grid on structural boxes) + paint probes on rendered 390×844 captures (acid census, flag-glyph census) + geometry probes against spec numbers + contrast measurement. Switcher chrome hidden before any pixel measurement (the runner chrome pollutes probe windows if visible). Flag rendering verified in headless Chromium via Noto Color Emoji — the same system-font path iOS/Android use.

## Results

| Surface | States | Blocking issues | Grid flags | Verdict |
|---|---|---|---|---|
| F2F v5 (ground-up) | 11 | 0 | 0 | PASS |
| Home/solo v3 | 9 | 0 | 0 | PASS |
| Packs v4 | 8 | 0 | 0 | PASS |

### F2F v5 — geometry probes (match [hifi-conversation](hifi-conversation) rev 3)

- Header h=44.0pt in all non-fullscreen states; partner half y=44 h=368 (46%); traveler half y=412 h=432; seam hit y=390–434.
- Circle mics ø64 at (306,328) partner / (306,760) traveler; idle = 1px outline, no fill; live = acid fill.
- Flip mode: partner inner transform = `matrix(-1,0,0,-1,0,0)` (rotate 180°), partner mic `live` in flip-listening state; header/traveler half unrotated.
- Acid paint census per state: ready 0 · translating 0 · history 0 · phrase-sheet 0 · missing-pack 0 · first-run 0 · show-card 0 · result-tts 236 (120×2 progress hairline) · listening-traveler 3,010 · listening-partner-flip 2,966 · turn-steal 2,966. Exactly-one-acid-per-state confirmed in paint.
- Flag paint census: header flags ~125 colored px/state; partner tag 25 (217 flip); traveler tag 92; show-card 0 (deliberate: fullscreen ink card names no language); scrim-dimmed states show proportionally reduced census (scrim over glyphs, expected).
- Contrast (measured): paper-on-ink 19.68:1; mono-gray-on-paper 6.58:1; acid-on-ink 17.50:1; ink-text-on-canvas 17.67:1. Status voice on ink raised to white 60% (was gray — 2.65:1, failed AAA intent; rev-3 spec carries the rule). Privacy line white 50% (4.6:1) — the v4 "#5D5D5D quiet-line exception" is retired.

### Packs v4 / home v3 — flags

- Header pair grammar unified across all three surfaces: `🇬🇧 EN ⇄ JA 🇯🇵`; header flag census 101–125 colored px in every state of both surfaces.
- Packs rows: 12 flagged rows paint (census 906–1,090 colored px/state incl. rows); confirm/delete/first-run titles flagged. Acid census unchanged from rev-6 policy: dots 72, live progress 168, confirm primary ≈16.4k, first-run 0 — flags moved no policy numbers.
- Zero error-red elements anywhere; flag glyph paint is the only red in the system (records the new whitelisting in prose, since a per-pixel red ban no longer holds by definition).

## Caught this pass by the harness (fixed pre-posting)

1. Language tag vs message block: 1.6pt collision in 7 F2F v5 states.
2. Waveform tick band vs message glyphs (text-vs-shape — invisible to the text overlap pass): fixed by the live-half layout rule (`msg bottom: 116` while live).
3. F2F header existed in zero states (build bug, v4-checklist gap: header geometry was only probed, never existence-asserted per state) — fixed; now 10/11 (show-card is fullscreen by design).
4. Switcher chrome leaking into pixel-probe windows — probe now hides it before measuring.
5. Copy self-audit: TRANSLATING originally rendered a not-yet-existing Japanese line; flip-listening showed a stale English line. Temporal-coherence rule now governs (spec rev 3 §4).
6. State-sheet caption typo (`fullscreenink`) caught on read-back; recomposed.

## Hashes (first 12, sha256)

| File | sha256 |
|---|---|
| neurora-facetoface-mockup-v5.html | ec3d8289ee88 |
| neurora-facetoface-state-sheet-v5.png | da0bd32dca8b |
| neurora-home-solo-mockup-v3.html | b29b2c54b313 |
| neurora-home-solo-state-sheet-v4.png | 7c7fb43c6ada |
| neurora-packs-mockup-v4.html | 24be188bda6c |
| neurora-packs-state-sheet-v4.png | eabd0cfbe8fd |

Spec revisions covered: hifi-conversation rev 3 · hifi-home-solo rev 6 · hifi-packs-offline rev 7 · design-system-tokens rev 5.

Notes: mockups embed Latin/CJK/mono subsets; flag glyphs intentionally come from the OS emoji font (never embedded — tokens doc §7). Motion remains stills-only (mid-motion frames for ≤300 ms transitions are deliberately omitted; see Maya's rev-2 note folded here).
