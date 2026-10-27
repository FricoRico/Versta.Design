---
title: "Design system tokens — ink/acid v1"
paperclip_issue: NEU-57
document_key: design-system-tokens
revision: 2
revision_id: 6ea8016a-2312-4419-9541-27032cd73c8b
exported: 2026-10-27
---

# Design system tokens — ink/acid v1

**What this is:** the engineering bridge for the accepted direction. Every measured value from the [design-language inventory](#document-design-language) and the three hi-fi specs ([conversation](#document-hifi-conversation) · [home/solo](#document-hifi-home-solo) · [packs](#document-hifi-packs-offline)) consolidated into named tokens with their SwiftUI and Compose counterparts. This doc is normative: where a spec and this table ever disagree, comment here — one source of truth per value.

**Naming:** Swift names assume a `NeuroraTheme` enum namespace; Compose names assume a `NeuroraTheme.kt` object + `MaterialTheme` mapping where noted. Semantic-first: code refers to roles (`surface.partner`), never raw hex.

## 1 · Color tokens (normative hex + platform constants)

All hex is sRGB. `light`/`dark` applies to accessibility variants only — v1 is a single-appearance app per the boards.

| Token | Hex (normative) | SwiftUI | Compose | Used for |
|---|---|---|---|---|
| `acid` | **#E6FF00** | `NeuroraTheme.Color.acid` | `NeuroraTheme.colors.acid` | Live capture affordance only (orb, mic zone fill, focus ring). **One acid element per surface.** |
| `on-acid` | #0D0D0D | `.onAcid` | `.onAcid` | Glyphs/labels on acid |
| `ink` | **#0B0B0B** *(not pure black — OLED smear, §5–3)* | `.ink` | `.ink` | Partner panel canvas, show-card, ink fills, primary buttons |
| `paper` | #FFFFFF | `.paper` | `.paper` | Cards, sheets, fields |
| `paper-canvas` | #F4F4F4 | `.paperCanvas` | `.paperCanvas` | Screen backdrop behind cards/sheets |
| `ink-text` | #0D0D0D | `.inkText` | `.inkText` | Body/display text on paper |
| `mono-gray` | #5D5D5D | `.monoGray` | `.monoGray` | Meta voice on ink/quiet copy (privacy line). Contrast floor: ≥4.5:1 on its painted surface |
| `mono-gray-ink` | white 55% | `.monoGrayInk` | `.monoGrayInk` | Disabled/quiet meta on ink surfaces |
| `hairline-paper` | #E3E3E3 | `.hairlinePaper` | `.hairlinePaper` | Row/card dividers on paper |
| `hairline-ink` | white 14% | `.hairlineInk` | `.hairlineInk` | Dividers/grabber on ink |
| `outline` | #A6A6A6 | `.outline` | `.outline` | 1pt outlines: pills, `GET` buttons, outlined actions |
| `acid-dim` | #92A202 | `.acidDim` | `.acidDim` | Progress hairline riding on the acid block |

**Rule (load-bearing):** acid never appears on a non-capture surface — the packs spec's zero-acid sweep is a per-element assertion, not a style preference. Engineering check: a lint/test asserting `acid` is referenced only by capture components would pay for itself. **There is no error color anywhere in the system** — failures render in mono-gray with honest copy.

## 2 · Type tokens

Three roles, fixed ramp. Point values are @1x iOS points == Android sp/dp for this system.

| Token | Spec | SwiftUI | Compose | Notes |
|---|---|---|---|---|
| `display` | Rounded gothic heavy, **34pt default → 28pt floor**, ≤3 lines then scale (never ellipsis-truncate) | `.neuroraDisplay` (custom face, `Font.custom(...).size(34)` + `$minimumScaleFactor` per §floor) | `NeuroraType.display` (`TextStyle(fontSize=34.sp)`, floor enforced by the component) | Partner-facing; **floor 28pt is hard**, Dynamic Type does not push it lower (hifi-conversation §7) |
| `display-list` | same face, 17pt, one line, truncates | `.neuroraDisplayList` | `.displayList` | Recents partner line |
| `display-card` | same face, 20pt | `.neuroraDisplayCard` | `.displayCard` | Partner text on turn cards |
| `display-showcard` | same face, 44pt | `.neuroraShowcard` | `.showcard` | Shared show-card component |
| `body` | Neo-grotesk regular, **17pt / 1.35 line** | `.neuroraBody` | `.body` | Traveler prose, native language names |
| `body-list` | 15pt | `.neuroraBodyList` | `.bodyList` | Recents traveler original, card copy |
| `mono` | Mono, **caps, 11pt, +8.5% tracking** | `.neuroraMono` (apply `.tracking(0.935)` ≈ +8.5% at 11pt; uppercase at the string layer) | `.mono` (`letterSpacing = 0.085.em`) | The status voice — **all** meta strings |
| `mono-small` | 10.5pt variant | `.neuroraMonoSmall` | `.monoSmall` | Timestamps, captions, filter chips |
| `mono-chip` | 9.5pt | `.neuroraMonoChip` | `.monoChip` | `KEEP` chip only |

**Rules:** mono owns every number/status string (sizes, percents, ETAs, timestamps) — never proportional digits there. Mono-caps strings carry a **1.45× localization width allowance** and clip centered, never wrap (design-language §2). Transform strings to uppercase in UI code; do not rely on font features. Tracking stays +8.5% at every mono size.

## 3 · Geometry & spacing constants

Point == dp == sp for this system (see §2). SwiftUI: `NeuroraTheme.Metric.*`; Compose: `NeuroraMetrics` object.

| Constant | Value | SwiftUI | Compose | Provenance |
|---|---|---|---|---|
| Status header height | **44pt** | `.headerHeight` | `HeaderHeight` | All three specs §1 — identical construction, never moves, packs sheet pins at y=44 |
| Screen margin | **20pt** | `.screenMargin` | `ScreenMargin` | Measured build geometry; all specs |
| Sheet corner radius | **24pt** | `.sheetCorner` | `SheetCorner` | Traveler sheet, pack sheet, pack confirm card |
| Grabber | 36×4pt, 12pt from sheet top, 28pt hit zone | `.grabber*` | `Grabber*` | Sheet anatomy (packs §2) |
| Minimum hit — actionable | **44pt** | `.hitMin` | `HitMin` | Specs' §9 checklists |
| Minimum hit — capture affordances | **48pt** | `.hitCapture` | `HitCapture` | Mic bar zones, orb (design-language §3) |
| Orb diameter | **56pt** | `.orbSize` | `OrbSize` | Home/solo dock (hifi-home-solo §3) |
| Split mic bar height | **64pt** | `.micBarHeight` | `MicBarHeight` | Conversation, straddles seam (hifi-conversation §3) |
| Dock region | 84pt bottom-anchored, no visible bar | `.dockHeight` | `DockHeight` | Home/solo §3 |
| Divider hit / snap points | 28pt zone; snaps at **30 / 54 / 78%** | `.dividerHit`, `.dividerSnaps` | `DividerHit`, `DividerSnaps` | Conversation §1 |
| Partner panel resting share | **46%** of region below header | `.partnerShare` | `PartnerShare` | Conversation §1 |
| Pack row height | **72pt**, hairline top | `.packRowHeight` | `PackRowHeight` | Packs §3 |
| Recents cell | 64–96pt auto | `.cellMin/Max` | `CellMin/Max` | Home/solo §4 |
| Show-card display size | 44pt | (type token) | — | Both surfaces share the component |
| Pill heights | status pill 24pt, filter chip 32pt, `FACE TO FACE` pill 44pt | `.pill*` | `Pill*` | Headers/recents |
| Progress bar (packs) | 2pt ink fill on hairline track | `.progressHeight` | `ProgressHeight` | Packs §3 |
| Transition timing | shimmer 200–300ms; sheet spring ≤250ms; surface crossfade 200ms | `.motion*` | `Motion*` | ADR-0001 shimmer ceiling; packs §2; home/solo §1 |

## 4 · Component name map (spec term → implementation)

One name per component, shared across spec docs and code. **The paired-phrase/show-card/sheet/pack-sheet tables are the contract: build once, reuse per the map.**

| Spec term | SwiftUI view | Compose composable | Defined in |
|---|---|---|---|
| Status header | `NeuroraStatusHeader` | `NeuroraStatusHeader` | hifi-conversation §1; identical on all surfaces |
| Partner panel | `PartnerPanel` | `PartnerPanel` | hifi-conversation §1 |
| Split mic bar | `SplitMicBar` | `SplitMicBar` | hifi-conversation §3 |
| Turn card | `TurnCard` | `TurnCard` | hifi-conversation §4 |
| Show-card | `ShowCard` | `ShowCard` | hifi-conversation §5.8 — **one component**, used by home recents too |
| Traveler sheet | `TravelerSheet` | `TravelerSheet` | hifi-conversation §1 |
| Quick-phrase sheet | `QuickPhraseSheet` | `QuickPhraseSheet` | hifi-conversation §8 (B-rail absorption) |
| Orb dock | `OrbDock` | `OrbDock` | hifi-home-solo §3 |
| Paired-phrase cell | `PairedPhraseCell` | `PairedPhraseCell` | hifi-home-solo §4 |
| Missing-pack card | `MissingPackCard` | `MissingPackCard` | **hifi-packs-offline §6.2 is canonical** — conversation §5.10 and home-solo §5.6 reference it |
| Pack sheet | `PackSheet` | `PackSheet` | hifi-packs-offline §2 |
| Pack row | `PackRow` (six `PackRowState`s) | `PackRow` | hifi-packs-offline §3 |
| Confirm card (packs) | `PackConfirmCard` | `PackConfirmCard` | hifi-packs-offline §4.1 |
| Storage banner | `StorageFullBanner` | `StorageFullBanner` | hifi-packs-offline §5.6 |
| Status pill | `StatusPill` | `StatusPill` | design-language §3 |
| Privacy subline | `PrivacySubline` (`SPEECH STAYS ON YOUR PHONE`) | same | design-language §3 |

## 5 · Drift ledger (current build → tokens)

Deltas engineering hits when applying these tokens to the existing app — recorded once, here, so they don't get re-derived (design-language §4 is the source; provenance in brackets).

1. **Acid unifies on #E6FF00.** Build renders #E4FF3C in places (composer focus). Replace; do not keep both.
2. **Ink stays #0B0B0B, intentionally.** Boards show pure #000000; #0B0B0B avoids OLED smear. Recorded as intentional — don't "fix" toward pure black.
3. **Canvas warms down.** Build blush pair (#FFF7FA / #F1E5E9 / mono-ink #564149) retires → neutral `paper` on `paper-canvas`. The warm chip/carriage earns no contrast benefit and complicates two-tone parity.
4. **`mono-gray` #5D5D5D is the quiet-copy floor on paper** (≥4.5:1). The conversation spec's privacy line sits exactly at it — token-level, do not go lighter on paper.
5. **Entry mode.** Build opens text-first; direction moves voice primary per surface with text as a traveler-side utility. No token change; listed here because it's the largest IA delta hiding behind "colors and fonts."
6. **No red anywhere.** The build's error color retires with these flows; failures are mono-gray copy in the honest-verb pattern (packs §4.6).

## 6 · Consumption notes for engineering

- **iOS**: one `NeuroraTheme` enum, `Color` statics + `Font` statics + metric statics; components in §4 as views. Semantic names only — grep-for-hex in review.
- **Android**: `NeuroraTheme.kt` (colors), `NeuroraType.kt` (styles), `NeuroraMetrics.kt`; Compose `MaterialTheme` slots mapped at the theme boundary (primary → ink, NOT acid — acid is not a Material role).
- Fonts ship with the app (offline product): display face (CJK-legible variant pending per concepts §Diverges-1), neo-grotesk body, mono. Bundling is an engineering decision; the tokens above are face-role-stable regardless of final binary picks.
- Specs render pixel geometry at 390×844 pt; §9 checklists in each spec are the device-verification contract (Maya's lab).

## Revision notes

- rev 1 — skeleton: scope, naming contract, section plan.
- rev 2 — §1 color tokens + §2 type tokens.
- rev 3 — §3 geometry/spacing + §4 component name map.
- rev 4 — §5 drift ledger + §6 engineering consumption notes. Doc complete.

