---
key: design-system-tokens
revision: 5
updated: 2026-10-29T12:19:15Z
source: paperclip
---

# Design system tokens — ink/acid v1

> **Rev 5 (2026-10-29):** adds §7 — country flags as the language mark (content color, excluded from the acid/no-red laws); fixes the cross-surface pair-label grammar to `🇬🇧 EN ⇄ JA 🇯🇵`. No token value changes; the §0 grid and §0.6 shape law stand.

> **Rev 4 (2026-10-27):** **§0 grid & shape system added (founder order)** — one 4pt-unit layout grid and one five-shape radius law now bind every surface; the three mockups were re-aligned to it and the verification harness asserts it. §1 acid rule unchanged.

> **Rev 3 (2026-10-27):** `acid` semantics extended from capture-only to live/ready states (founder decision on NEU-57 review). Pack-surface bindings: `rdot` status dots, progress fill, confirm primary. Error-color ban unchanged. Packs spec rev 5 + mockup v2 carry the geometry.

**What this is:** the engineering bridge for the accepted direction. Every measured value from the [design-language inventory](#document-design-language) and the three hi-fi specs ([conversation](#document-hifi-conversation) · [home/solo](#document-hifi-home-solo) · [packs](#document-hifi-packs-offline)) consolidated into named tokens with their SwiftUI and Compose counterparts. This doc is normative: where a spec and this table ever disagree, comment here — one source of truth per value.

**Naming:** Swift names assume a `NeuroraTheme` enum namespace; Compose names assume a `NeuroraTheme.kt` object + `MaterialTheme` mapping where noted. Semantic-first: code refers to roles (`surface.partner`), never raw hex.

## 0 · The grid (binding — rev 4, founder order 2026-10-27)

One layout system for every surface. Specs and mockups align to it; the headless verification harness asserts it, so a violation fails verification, loudly.

**0.1 Base unit — 4pt.** Every *structural* metric — positions, sizes, paddings, gaps, row heights, offsets — is a multiple of 4pt. Type metrics (font sizes, line heights) are exempt; the boxes that hold type are not.

**0.2 Frame & margins.** Reference frame 390×844pt. Page margins **20pt** → content column **350pt**. Bottom sheets span the full frame width; the 20pt margins apply inside them.

**0.3 Spacing scale.** `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48`. Gaps, paddings and inter-element offsets come from this scale only — nothing off-scale.

**0.4 Columns (advisory).** The 350pt content column carries a **6-column grid with 12pt gutters** (column width 48⅓pt — fractional by construction; the binding laws are the unit and the margins). Block widths snap to column spans where practical: 1-col ≈48, 2-col ≈109, 3-col ≈170, 6-col = 350. Equal-split groups (e.g. a two-button row) split the container evenly with an on-scale gap.

**0.5 Vertical rhythm.** Rows and fixed regions use on-scale heights: `24 / 32 / 44 / 48 / 56 / 64 / 72 / 84`. Header 44, dock 84, orb 56, mic bar 64, pack row 72, hit floors 44/48 — all already conform.

**0.6 Shape law — five shapes, no others.** Radius is semantic, never decorative variance:

| Shape token | Value | Rule |
|---|---|---|
| `circle` | 50% | Equal-dimension indicators and buttons: capture orb, replay button, status dots |
| `pill` | 999pt (full) | Single-line capsules/bar targets: status pills, filter chips, category chips, `GET`/`UPDATE`/row actions, `FACE TO FACE` bar, sheet grabbers, progress bars |
| `r-chip` | 8pt | Non-interactive inline tags inside text flow: `IMAGE`, `KEEP` |
| `r-ctl` | 12pt | Rectangular controls ≥40pt tall: card/sheet buttons, text field |
| `r-sheet` | 24pt | Bottom sheets and bottom-anchored cards (top corners only) |

**0.7 Placement law (rev 4).** Actions live in a small set of fixed slots so nothing "wanders" between states:
- **Bottom 84pt = the capture dock** (home/solo); the orb is dead-center, utilities flank it — never displaced by state.
- **The row immediately above the dock (y 96–148 from bottom) holds at most one element**: the `FACE TO FACE` entry bar at rest, the capture cluster (ticks + hint) during capture. One slot, one tenant.
- **Two-button rows: primary on the right. Single-action sheets: full-width button at the panel bottom. Fullscreen cards: exit top-right (`DONE`), primary action bottom-center.**
- **Meta voice right edge:** timestamps right-aligned on their own top line; no second right-edge element fights them.

**0.8 Z-scale.** `0` content · `10` sticky chrome/coach bubble · `14` scrim · `15` sheet · `16` modal card. No arbitrary z-index.

## 1 · Color tokens (normative hex + platform constants)

All hex is sRGB. `light`/`dark` applies to accessibility variants only — v1 is a single-appearance app per the boards.

| Token | Hex (normative) | SwiftUI | Compose | Used for |
|---|---|---|---|---|
| `acid` | **#E6FF00** | `NeuroraTheme.Color.acid` | `NeuroraTheme.colors.acid` | **What is live now** (rev 3, founder call 2026-10-27): capture affordance (orb, mic zone fill, focus ring), live transfer progress, ready-status dots, confirm-card primary. Never decoration, never idle actions. |
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

**Rule (load-bearing, rev 3):** acid binds to *live/operative* state only. Allowed bindings: capture surfaces (orb / active mic zone / focus ring), pack surface (ready-status dots, live download progress fill, confirm-card primary), and nothing else. Engineering check: a lint/test asserting `acid` is referenced only by live-state components would pay for itself. **There is no error color anywhere in the system** — failures render in mono-gray with honest copy; that law is unchanged.

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

## 7 · Flags — language marks (binding, added 2026-10-29)

Country flag glyphs are the visual mark of a language wherever a language is *named*: the header pair label (`🇬🇧 EN ⇄ JA 🇯🇵` — one grammar across home, conversation, and packs surfaces), per-half language tags, pack-row cap lines, pack confirm/delete titles, and the first-run suggestion.

- **Flags are content, not accent.** The one-acid law (§1) governs UI chrome; flag glyphs are content paint and are excluded from the acid sweep. Likewise the no-error-red law excludes flag glyphs (the 🇯🇵 disk is red — that is the glyph, not an error signal). All other added color still fails audit.
- **Rendering** — flags come from the OS emoji set (Apple Color Emoji / Noto Color Emoji / Segoe UI Emoji). Never embed flag art, never ship flag PNGs; this keeps colours system-native and the bundle identical offline. `letter-spacing: 0`; 13px at an 11pt mono context, 6px gap to the label.
- **The language→flag table is product-config content** shipped with the pack catalog (e.g. `JA→🇯🇵 KO→🇰🇷 ZH→🇨🇳 AR→🇸🇦 FR→🇫🇷 DE→🇩🇪 HI→🇮🇳 IT→🇮🇹 PT→🇵🇹 RU→🇷🇺 ES→🇪🇸 TH→🇹🇭`, phone locale `EN→🇬🇧`). Per-locale flag choices are copy/content decisions reviewed with the catalog, not component code. A neighbor-language flag never appears next to another language's name.
- **Never flag-only.** A language code or name always rides next to the glyph — color is never the only cue.
