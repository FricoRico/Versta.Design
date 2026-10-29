---
key: hifi-packs-offline
revision: 7
updated: 2026-10-29T12:19:15Z
source: paperclip
---

# Hi-fi spec — pack management + offline states

> **Rev 7 (2026-10-29, flags pass):** languages are flagged wherever named on this surface — each pack row's cap line carries the flag glyph first (`🇯🇵 JAPANESE`), the confirm card and delete sheet titles are flagged, and the first-run suggested row is flagged. Pair label adopts the grammar `🇬🇧 EN ⇄ JA 🇯🇵`. Language→flag table ships as product-config content with the catalog (tokens doc rev 5); per-locale flag politics is a *content* decision, not a components decision. Flags are content color: the zero-red / acid policies are untouched (verified in paint: acid counts unchanged from rev 6 — resting 72, confirm ~16k primary only, first-run 0). No row geometry change. Verified reference: mockup v4 + state sheet v4 (audit: 0 blocking, 0 grid flags, 8/8 states).

> **Rev 6 (2026-10-27, second founder revision pass):** contrast + shape/grid compliance. Row actions go high-contrast ink: `GET · nm MB` and `UPDATE · nm MB` are now **ink-filled capsules with paper text** (≈16.9:1; were 1pt outlined); the `GET NOW` secondary goes ink (was mono-gray); confirm/delete secondary buttons get a 1pt ink-text outline (was outline-gray). Acid rule from rev 5 unchanged — acid stays on live/operative state only; idle actions are now *ink*, not acid and not gray. All radii resolve to the shape law ([tokens §0.6](design-system-tokens)); the sheet aligns to the 4pt grid (tokens §0). Host-home surface synced to hifi-home-solo v2 (cell meta line, single SAVED toggle). Mockup v3 is the verified reference.

> **Rev 5 (2026-10-27):** acid semantics extended to live/ready states on this surface by founder decision; confirm-card primary goes acid, ready rows + aggregate gain acid status dots, progress fill goes acid. Failures stay mono. Mockup v2 implements this revision; rev-4 mockup archived. · v1

**What this is:** the pixel-level spec for the **pack management sheet** and the **cross-surface offline state rules**, in the reconciled ink/acid language. Direction-independent — this surface and these rules hold under any of the three concepts (concepts doc §Shared). Sibling specs: [hifi-conversation](hifi-conversation) v1, [hifi-home-solo](hifi-home-solo) v1. Binding sources: [design language inventory](design-language) v1 (measured tokens), ADR-0001 rev 3 (no cancel theater for translation; downloads are a network operation and follow §4's rules, not the translation rule).

**Scope note:** this spec also becomes the canonical owner of two components previously sketched inside sibling specs — the missing-pack card (hifi-conversation §5.10 / hifi-home-solo §5.6) and the header download sublabel. Where wording differs, this doc wins.

Verification notes for Maya live in §9.

---

## 1 · Where it lives, and sheet geometry (390×844 frame)

**Entry points (three, all one tap):**
1. **Header pair label** — tapping `ENGLISH ⇄ JAPANESE` (center of the 44pt header, present and identical on both surfaces) opens the pack sheet. The pair *is* the thing packs belong to; no gear icon, no new chrome anywhere.
2. **Missing-pack card** `SCHEDULE DOWNLOAD` (§6.2) — lands on this sheet with the affected pack row already in its confirm state (§4).
3. **Header download sublabel** (§6.3) — while any download runs, tapping it opens the sheet.

**Sheet geometry** — paper #FFFFFF sheet over the host surface (home or conversation), top edge pinned below the header at y=44: **the header never moves** (one-app rule). Top corners r=24pt (sheet component, same as traveler sheet), grabber 36×4pt ink 20% at 12pt from the sheet top, 28pt hit zone; drag-to-dismiss with spring settle ≤250 ms, plus a mono `DONE` top-right (44pt hit) for discoverability parity with the show-card. Margins 20pt. The sheet is the third and final sheet geometry in the system — no new chrome vocabulary is introduced here.

```
┌──────────────────────────────┐
│ ⇄   ENGLISH ⇄ JAPANESE [OFF] │  ← host header, 44pt, never moves
│ ╭───────────╮                │
│ │  LANGUAGE PACKS       DONE │  ← sheet header row, h=44
│ │ 2 READY · WORKS OFFLINE    │  ← ambient aggregate line, mono
│ │────────────────────────────│
│ │ 日本語  JAPANESE      84 MB │  ← pack row, h=72, hairline top
│ │ READY                      │
│ │────────────────────────────│
│ │ Français FRENCH   GET·210MB│
│ │ ~40 S ON WI-FI             │
│ │ …                          │
╰─┴────────────────────────────┴─╯
```

## 2 · Type on this surface

| Role | Spec | Used for |
|---|---|---|
| Body | Neo-grotesk 17pt / 1.35 | Native language names, confirm-card copy, delete confirm |
| Mono status | Caps 11/10.5pt, +8.5% tracking | Everything else: section labels, sizes, states, ETAs, buttons |
| Display | not used | Management surface — nothing here is partner-facing |

Mono owns all numbers and status (design-language §2: numbers are always mono). All mono-caps strings carry the 1.45× localization width allowance and clip center, never wrap.

**Acid marks what is live here (rev 5, founder call 2026-10-27).** Acid's meaning generalizes from "live capture" to **live/operative state**: a 6pt acid status dot rides every `READY` row and the aggregate line when ≥1 pack is installed ("this pack works right now"), the download progress fill is acid on the hairline track ("transferring now"), and the primary action on the confirm card is acid fill with on-acid ink text ("the live decision"). Idle actions (`GET`, `GET NOW`, queued labels) stay outlined or mono; **failures and the storage banner stay mono-gray — there is still no error color anywhere in the system.** First-run (zero packs) honestly carries no dots. Everything else remains ink/paper; the verb for this surface is still *quiet* — one hue, now doing visible work.

## 3 · Pack row anatomy

One row per language, h=72pt, hairline #E3E3E3 top, margins 20pt. Rows sort: needs-attention first (storage error, paused), then ready, then downloadable A→Z by the traveler's locale name.

- **Left block (two lines):** native name in body 17pt ink-text (`日本語`) over a mono 10.5pt caps caption (`JAPANESE`). Packs are **symmetric** — the JA pack serves EN→JA and JA→EN both; no per-direction rows, ever.
- **Right cluster (state control), 44pt hit:** one of six states, always with the honest number in mono:

| State | Right cluster (mono) | Tap behavior |
|---|---|---|
| `READY` | `● READY · 84 MB` ink-text, 6pt acid dot before the label | Opens row action sheet: `DELETE PACK · FREES 84 MB` / `KEEP` (§5.7) |
| `READY — UPDATE` | `UPDATE · 12 MB` ink-filled capsule on a `READY` row (rev 6) | Tap applies the delta update; row briefly shows §4 progress |
| `DOWNLOADABLE` | `GET · 210 MB` ink-filled capsule, paper text (rev 6 contrast) | Opens the confirm card (§4) |
| `QUEUED` | `QUEUED — WI-FI` + small `GET NOW` beneath | `GET NOW` re-opens the confirm card in its mobile-data variant |
| `DOWNLOADING` | `62% · 130/210 MB` over a 2pt acid progress fill (#E6FF00) on a hairline track | Tap pauses; label flips to `PAUSED — TAP TO RESUME` |
| `ERROR — STORAGE` | `STORAGE FULL — NEED 210 MB` | Tap opens the row action sheet pre-focused on delete candidates (§5.6) |

No chevrons, no decorative glyphs. Size is present at every state — **pack-size honesty is the surface's core promise** (concepts §Shared, design-language §3 meta-line provenance).

## 4 · Download lifecycle (the only state machine on this surface)

1. **Confirm card** (tap `GET`) — half-sheet over the pack sheet: `JAPANESE PACK — 210 MB · ~40 S ON WI-FI`, body 15pt copy: what the pack contains in one line (`VOICE + TEXT, BOTH DIRECTIONS`), then two buttons: `DOWNLOAD ON WI-FI` (primary, acid fill #E6FF00 with on-acid #0D0D0D text, ≈17:1 contrast) and `DOWNLOAD NOW — USES MOBILE DATA` (1pt ink-text outline, rev 6 — reads as a real button, not a ghost). **Default is Wi-Fi; mobile data is always an explicit second tap, never a preselected option, never silent** (missing-pack honesty rule carried from hifi-conversation §5.10). No checkbox garden, no settings toggle on v1.
2. **Queued** — row enters `QUEUED — WI-FI`. Wi-Fi arrival starts the download automatically, no toast, no banner (ambient discipline — §6.1).
3. **Downloading** — progress cluster per §3; downloads continue if the sheet is dismissed (background), surfaced ambiently via the header sublabel (§6.3). Network loss mid-download: the row flips to `PAUSED — RESUMES ON WI-FI`; it resumes on its own. The row *is* the notification.
4. **Commit** — on 100% the row plays the one-beat shimmer (200–300 ms; the system's only transition theater) and lands as `READY · 210 MB` with the final on-disk size. No celebratory modal.
5. **Pause/cancel honesty** — pause is real (network operations may be interrupted; this is not the ADR-0001 translation-cancel case). "Cancel" does not exist as vocabulary: a paused or queued row can be **removed** via the row action sheet (`REMOVE DOWNLOAD`), which deletes partial data. Verbs on this surface: GET, PAUSE, RESUME, REMOVE, DELETE — each does exactly what it says.
6. **Failure** — a failed download returns the row to `DOWNLOADABLE` with `GET · 210 MB` unchanged; the failure reason appears once as mono caption under the row (`SERVER UNREACHABLE — TRY AGAIN LATER`) and clears on next tap. No error color exists in the token set; errors read as content and position, never as red.

## 5 · States

1. **Resting list** — rows per §3; aggregate line under the sheet header compresses the truth to one mono sentence: `2 PACKS READY · EVERYTHING WORKS OFFLINE` / `1 PACK READY · 3 AVAILABLE`. If nothing is installed: `NOTHING DOWNLOADED YET — PICK A LANGUAGE`.
2. **First run** — identical list, all rows `DOWNLOADABLE`; the traveler's device-locale pair is **not** pre-downloaded (consent + storage honesty) but its row is pinned top with caption `SUGGESTED FOR THIS PHONE`. Tapping `GET` from here is the same §4 flow — there is no special first-run wizard.
3. **No network / airplane** — pixel-identical list; `GET` still works and the confirm card's primary button simply reads `QUEUE FOR WI-FI`. **Nothing on this surface dead-ends in airplane mode** — queuing is always available.
4. **Downloading** — §4.3; multiple concurrent downloads allowed, each row carries its own progress; aggregate % shares the header sublabel (§6.3).
5. **Paused / network lost** — §4.3; rows needing attention sort top.
6. **Storage full** — the failed `GET` lands the row in `ERROR — STORAGE`; additionally one mono banner *row* (not a modal) pins at the list top: `STORAGE FULL — FREE 210 MB TO CONTINUE`, tapping it opens the first ready pack's action sheet (delete path, §5.7). One row, dismissible by solving the problem only — no snooze, no X.
7. **Row action sheet (delete)** — small sheet over the pack sheet: pack name + `DELETE PACK · FREES 84 MB` (ink fill) / `KEEP` (outlined). Delete is single-tap-from-here, no third confirmation — the cost of error is a re-download, and the size tag keeps that cost explicit. Deleting the pack backing the *current* header pair additionally flips the header to the `PACK NEEDED` sublabel state on both surfaces (§6.2).
8. **Update available** — `UPDATE · 12 MB` chip rides on the `READY` row; updates are deltas, always smaller than the pack, never auto-applied while the pack is in active use on the conversation surface.

## 6 · Cross-surface offline rules (the umbrella this spec owns)

1. **Ambient = identical.** No banners, modals, or toasts on connectivity change, anywhere in the app (hifi-conversation §5.11, hifi-home-solo §5.7 — restated here as the system rule). The `OFFLINE` pill is the resting face, not an error. The pack sheet follows the same law (§5.3).
2. **Missing pack at capture** — canonical card anatomy, now owned here (referenced from hifi-conversation §5.10 and hifi-home-solo §5.6): inline card on the host surface, mono 11pt `JAPANESE PACK — 210 MB · ~40 S ON WI-FI`, body 15pt one-liner `VOICE + TEXT, BOTH DIRECTIONS`, two buttons `SCHEDULE DOWNLOAD` / `USE SAVED PHRASES` (`SCHEDULE` drops into this sheet with that row in §4.1 confirm state). The affected side's capture affordance renders disabled with mono sublabel `PACK NEEDED`; the header pair label gains the same `PACK NEEDED` sublabel on both surfaces. **Deleting a pack is what re-arms this state** (§5.7) — the loop is closed and honest.
3. **Header download sublabel** — while any pack downloads or sits queued, the header's status side gains a mono sublabel `JA PACK · 62%` / `JA PACK · QUEUED`, downloadable-state changes never toast. Tapping the header pair region opens this sheet. Header height stays 44pt with the sublabel present (verified against the home/solo mockup: 44.0pt measured).
4. **Offline completion guarantee** — anything already downloaded keeps working mid-download-storm: recapture, TTS, phrase sheets are never degraded by background pack traffic (engineering note: pack I/O yields to capture/audio, Maya's queue).
5. **Quick-phrase sheet dependency (flag, non-blocking)** — hifi-conversation §5.9 says the phrase sheet "ships with every pack." With zero packs installed there is no phrase content; `USE SAVED PHRASES` on a fresh install therefore needs either a tiny built-in starter set or honest copy (`NO SAVED PHRASES YET`). Data question for engineering — v1 ships the honest copy; starter set is a product call flagged for the founder, not a design blocker.

## 7 · Accessibility

- Dynamic Type honored; rows grow elastically, the right cluster never truncates the size/ETA figures (mono numbers are the promise).
- VoiceOver order: sheet header → aggregate line → rows in sort order → `DONE`. Each row announces as one unit: `Japanese, ready, 84 megabytes` / `French, available, 210 megabytes, button`.
- All row states are conveyed by text, never by color alone (there is no color to lean on — by design).
- Download progress is announced politely on change at ≥10% steps, never assertive-interrupt during capture on the host surface.

## 8 · Constraint compliance checklist

- [x] Offline ambient and identical; no banners/modals/toasts on connectivity change (§6.1).
- [x] Acid binds to live state only — dots on ready rows, acid progress fill while downloading, acid primary on confirms; zero acid on idle/failure/first-run elements (§2, rev 5).
- [x] ADR-0001 respected in spirit and letter: translation path carries no cancel (siblings); downloads use honest PAUSE/REMOVE verbs on a real interruptible operation (§4.5).
- [x] One-beat shimmer (200–300 ms) is the only transition theater (§4.4).
- [x] Pack-size honesty: a size figure is visible in every row state (§3).
- [x] Never an unsolicited mobile-data download; Wi-Fi default, explicit second tap for data (§4.1).
- [x] No error color introduced; errors are content + position (§4.6).
- [x] Header contract preserved: 44pt, never moves, sublabels verified to fit (§6.3).
- [x] No new chrome vocabulary: sheet + grabber + `DONE` reuse existing components (§1).

## 9 · For Maya — verification checklist (emulator screenshots vs this spec)

1. Sheet pins below the 44pt header (top edge y=44), corners r=24, grabber 36×4 at 12pt, `DONE` top-right 44pt hit; header identical to both sibling surfaces with zero offset.
2. Row anatomy: h=72, hairline #E3E3E3 top, native name 17pt body over mono 10.5 caps caption, right cluster 44pt hit with size figure present in **every** state.
3. The six right-cluster states render per §3 table, incl. `QUEUED — WI-FI` + `GET NOW` (ink-text), and the 2pt progress bar with `62% · 130/210 MB`.
4. Confirm card: two buttons in the fixed order (Wi-Fi primary ink fill, mobile-data outlined), size + Wi-Fi ETA in mono; no preselected data option.
5. Storage-full: mono banner row pinned top (`STORAGE FULL — FREE 210 MB TO CONTINUE`), no modal, no red; delete action sheet offers `DELETE PACK · FREES 84 MB` / `KEEP` exactly.
6. Missing-pack card matches §6.2 anatomy verbatim on both host surfaces; affected capture affordance + header carry the `PACK NEEDED` sublabel; header still measures 44pt.
7. Header download sublabel `JA PACK · 62%` appears while downloading, tappable to this sheet; no toasts on any pack state change.
8. Airplane mode: list pixel-identical, confirm card primary reads `QUEUE FOR WI-FI`.
9. Tokens: paper sheet on paper-canvas, ink #0B0B0B text, hairline #E3E3E3, outlines #A6A6A6, margins 20pt — and a per-element acid sweep confirms acid #E6FF00 only on: ready dots, the live progress fill, and the confirm primary (rev 5). No red/error hues anywhere.

## 10 · Next in the hi-fi sequence

1. **Pack management mockup + state sheet** — single-file HTML, headless-verified at 390×844, same delivery shape as the accepted Face-to-Face and home/solo packages.
2. **Light design-system doc** — tokens → SwiftUI/Kotlin names, once the three surface specs stabilize (carried from hifi-home-solo §10).
3. Sprint close-out: founder's already-accepted direction + three hi-fi specs + two verified mockups become the build reference set; Maya's feasibility answers fold into rev 2s as they land.

*Rev 1 skeleton (geometry + type) · rev 2 adds §3–4 · rev 3 adds §5–6 · rev 4 completes §7–10. Self-review against design-language tokens and sibling contracts: no contradictions found; §6.2 deliberately takes canonical ownership of components first sketched in the siblings.*