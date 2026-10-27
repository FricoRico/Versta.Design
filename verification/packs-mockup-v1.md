---
title: "Verification record — pack management mockup v1"
paperclip_issue: NEU-57
document_key: packs-mockup-v1
revision: 1
revision_id: a1ea3a2f-e0ab-4b73-8363-ef3661a5fa0f
exported: 2026-10-27
---

# Verification record — pack management mockup v1

**Artifacts under verification**
- `neurora-packs-mockup-v1.html` — sha256 `1fe1706ab2ea`, 240,344 bytes, single file, fonts subset-embedded, zero network dependencies
- `neurora-packs-state-sheet-v1.png` — sha256 `cc9eb7e1c258`, 8 tiles rendered from the final embedded file at 390×844 (2x capture)
- Spec verified against: hifi-packs-offline v1 rev 4 (`c42f53dc`)

**Method:** headless Chromium 153 (puppeteer-core + @sparticuz/chromium), viewport 450×950 @2x, element-level capture of the 390×844 phone frame. DOM assertions evaluated in-page against live layout; pixel probes (PIL) on the rendered PNGs; embedded-font forced-load probe (`document.fonts.load` on all five faces, executed with no external stylesheet injection — the file stands alone).

## Result: ALL-STATES-PASS — 798 DOM assertions / 43 pixel probes, 0 failures

Per-state assertion counts are uniform; every state passes the full battery:

| # | State | Covers |
|---|---|---|
| 1 | resting | §5.1 resting list, §3 six-state anatomy (READY, UPDATE chip, GET), aggregate `2 PACKS READY · EVERYTHING WORKS OFFLINE` |
| 2 | downloading | §4.3 progress cluster `62% · 130/210 MB` + 2pt ink bar, QUEUED row with `GET NOW`, §6.3 header sublabel `JA PACK · 62%` (header still 44.0pt) |
| 3 | paused | §3/§4.3 paused variants (`TAP TO RESUME` / `RESUMES ON WI-FI`) sorted top, §4.6 failure caption `SERVER UNREACHABLE — TRY AGAIN LATER` (content+position, no error color) |
| 4 | confirm | §4.1 confirm card: fixed order Wi-Fi-primary ink fill, mobile-data outlined, size+ETA in mono |
| 5 | confirm-queue | §5.3 airplane variant: primary `QUEUE FOR WI-FI`, list pixel-identical law holds |
| 6 | storage | §5.6 banner row pinned top (`STORAGE FULL — FREE 210 MB TO CONTINUE`), error row state, no modal, no red |
| 7 | delete | §5.7 action sheet: `DELETE PACK · FREES 84 MB` ink / `KEEP` outlined, exactly two buttons |
| 8 | first-run | §5.2 all-DOWNLOADABLE, suggested row pinned top, aggregate `NOTHING DOWNLOADED YET — PICK A LANGUAGE` |

**Geometry battery (each state):** sheet pinned y=44 below the 44pt header (header identical contract to both sibling surfaces, never moves, holds with the sublabel present), sheet spans 390 width, corners r=24, grabber 36×4 at 12pt in a 28pt hit zone, `DONE` ≥44pt hit top-right, margins 20, row h=72 with hairline #E3E3E3 top, native name 17pt body/CJK, caption mono 10.5 caps, right cluster ≥44pt hit, GET button outlined #A6A6A6 r=16, progress bar 2pt ink fill on hairline track.

**Rule batteries:** honest size figure present in **every** row of **every** state (regex sweep); per-element acid sweep finds zero `rgb(230,255,0)` on the surface across all 8 states; pixel-level acid sweep of rendered output finds zero; red-paint sweep finds zero (there is no error color); no clipped strings anywhere (scrollWidth/Height vs client, all text nodes in the sheet); the pack list is a real scroll region (`overflow-y:auto`, scrollHeight > clientHeight) and the last row is fully reachable at max scroll — the scroll assertion class added after Maya's F2F-v2 catch; nothing escapes the phone frame except scroll-clipped rows; contrast: ink-text #0D0D0D and mono-gray #5D5D5D on paper/canvas ≥4.5:1 by token.

## Interpretations rendered (flagged for spec rev 2 — comment to dispute)

1. **C1 — size on transient rows.** §3's table shows no size on QUEUED/PAUSED, but §3's own promise is a size in *every* state. Mockup resolves toward the promise: `QUEUED — WI-FI · 210 MB`, `PAUSED · 130/210 MB` (+`TAP TO RESUME` beneath). PROGRESS bar persists on user-paused rows in spirit; render shows the fraction instead (denser, matches the promise).
2. **C2 — airplane confirm card secondary.** §5.3 renames the primary to `QUEUE FOR WI-FI` and is silent about `DOWNLOAD NOW — USES MOBILE DATA`. A live data button in airplane mode dead-ends, violating §5.3's own law. Rendered: secondary present but disabled (mono-gray, 55%).
3. **C3 — sort class of active operations.** §3's sort rule (attention → ready → A→Z) doesn't name downloading/queued rows. Rendered: active operations pin above ready (closest to live state), attention (storage/paused) above them.
4. **C4 — first-run caption literal.** §5.2's `SUGGESTED FOR THIS PHONE` replaces the locale caption on the pinned row (the native name `日本語` carries the identity). If the caption should compose (`JAPANESE · …`), it needs a width budget — flagged.

## Deliberate approximations (static artifact)

- States switch instantly; §4.4's 200–300 ms commit shimmer and sheet spring settle (≤250 ms) are timing notes for engineering, not demoed.
- The sheet's drag-to-dismiss and the card scrims are posed; the scroll region is live (the list genuinely scrolls in a browser).
- Runner chrome (top switcher strip) is not part of the design; stage padding keeps it clear of the phone (fixed after it overlapped early captures).

## Harness provenance

`/tmp/opencode/packs/`: `verify.mjs` (DOM battery), `probe.py`/`probe_final.py` (pixel battery), `shot.mjs` (element-level 2x capture), `embed.py` (font subsetting via pyftsubset → woff2 data URIs), `sheet.py` (contact sheet). Fonts: M PLUS Rounded 1c ExtraBold (display), Noto Sans JP 700 (CJK), Noto Sans 400 (body), Space Mono 400/700 (mono) — system stand-ins per design-language §2, consistent with both sibling packages.

