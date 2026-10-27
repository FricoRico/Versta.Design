---
title: "Untitled"
paperclip_issue: NEU-57
document_key: teardown
revision: 1
revision_id: 73fb674c-c437-484a-9da4-4a47d85d55be
exported: 2026-10-27
---

# UX teardown

**Status (14 Oct, rev 3):** first current-build captures landed (3× home screen, iOS). §3 hypotheses are now resolved as far as those captures allow — verdicts below; four evidence gaps remain (§3.4). Layer 1 (category teardown) stands as written.

## 1 · Category teardown — the baseline we're judged against

Reviewed as heuristic/pattern audits of the dominant players' conversation and offline experiences (store builds available to anyone): **Google Translate** conversation mode, **Apple Translate**, **SayHi**-class hold-to-talk apps.

### What the category gets right — we keep these
- **Push-to-talk reliability.** Explicit mic taps beat auto language detection in noisy, offline reality. Auto-detect is a demo feature; tap-to-talk is a street feature.
- **Attention mode (Apple).** A fullscreen, rotated, giant-type card that auto-plays TTS is the single best pattern in the category — but everyone buries it as a per-message action instead of building the exchange around it.
- **Phrasebooks.** Curated phrases cover the formulaic 80% of traveler exchanges with zero ML risk. Universally present, universally underinvested.

### Seven structural frictions — the openings for our redesign
1. **Designed for the owner, not the partner.** The person across the counter gets leftover pixels: the same small chat bubbles, rendered once, viewed upside-down from the other side. Nobody designs the partner's half of the screen.
2. **Turn-taking is implicit.** Whose mic is live? Both people guess. Mis-timed taps interrupt recognition mid-phrase; the app scolds instead of guiding.
3. **Offline capability is invisible — until it fails.** Packs live deep in settings (Google: hamburger → offline translation; Apple: iOS Settings, outside the app entirely). Discovery happens at the moment of need, which is exactly when connectivity is gone. The one sellable truth of an offline-first product is never stated on the primary screen.
4. **No verification loop.** A wrong translation renders with the same confidence as a right one and travels silently into the conversation. No replay, no confirm, no graceful recover — only start-over.
5. **Messaging-app layout debt.** Conversation screens are borrowed chat UIs built for async texting: alternating bubbles, timestamps, read receipts metaphors. A live face-to-face exchange isn't a chat log; the frame is wrong.
6. **Localization-blind layouts.** Fixed-height bubbles and padded pills clip long translations — German compounds, Finnish agglutination — exactly the storefront cases where accuracy matters.
7. **Crowded chrome.** Ads, upsells, toolbars and banners compete with the one screen that needs total calm mid-conversation.

### Dated patterns to retire in our app
- **Flags as language pickers** — flag ≠ language (pt-BR, pt-PT); also a localization own-goal.
- **Modal-first offline warnings** — interrupting alerts that say "no connection" and offer nothing.
- **Permanent connectivity banners** — status that cries wolf until users stop seeing it.

## 2 · Positioning conclusion
The category converged on "chat app with a translate feature." Nobody owns **"a shared surface between two strangers."** That is our opening and it compounds with our only structural advantage: we're offline-first, so we never have to hedge the UI between online and degraded modes — we can state full capability, always.

## 3 · Our current app — verified against first captures (3× home, iOS, 14 Oct)

Screens reviewed: `Versta Home-selection.png`, `(1)`, `(2)` — launch/home at default text size. Verdicts: **confirmed / killed / revised / open**.

| # | Hypothesis | Verdict | Evidence |
|---|---|---|---|
| H1 | IA grown organically: home = language/config, conversation one tap deeper | **Revised** | Flatter than hypothesized: home *is* a capture surface (type row + mic in dock, giant "Tap to start typing." empty state), language pills + swap on top, Conversation as a dock chip. The real friction isn't depth — see F1–F3 below. |
| H2 | Standard chat-bubble conversation, no partner-facing surface | **Open → likely** | No conversation capture supplied. But the "Conversation" chip implies a distinct screen, and nothing in the home language suggests a partner-facing mode. One screenshot settles it (§3.4). |
| H3 | Offline states are textual (snackbars/dialogs), not designed | **Killed (favorably)** | Ambient offline status is *designed*: "⚡ EN → JA · READY OFFLINE" status line + per-language ⚡ badges on both pills. Exactly the calm, always-stated capability we want (§1.3). Missing-pack / degraded / low-storage flows still unverified — no captures. |
| H4 | Language management as abstract A–Z list, not trip-centric | **Open** | Only the pair pills are visible; no pack-management screen supplied. |
| H5 | Accessibility unaddressed: Dynamic Type, contrast, one-handed reach | **Open** | Static default-size captures can't answer it. Proxy notes: display type is huge (good); mono microcopy runs small (watch); mic hit-area is generous (good). Needs a max-text-size render + VoiceOver pass (§3.4). |
| H6 | Platform feel mismatches (iOS vs Android) | **Open** | Captures are iOS only. |

### 3.1 · Strengths worth carrying into the redesign
- **Ambient offline confidence (H3 verdict).** The ⚡ + "READY OFFLINE" pattern is the category gap (§1.3) already half-solved — keep the pattern, extend it to missing-pack and degraded states.
- **Type-led empty state.** The oversized grotesk empty state is distinctive and calm; the redesign keeps the scale, changes what it *says* (F4).
- **Acid accent discipline.** One loud color spent only on the live mic — restraint most products can't hold. Keep.
- **Designed black input dock.** Clear capture zone; the redesign absorbs it.

### 3.2 · Newly observed frictions (home screen)
- **F1 — Home foregrounds typing; the product's core case is spoken, face-to-face.** Biggest type on the screen is "Tap to start typing."; the voice path is the mic button and "TAP TO SPEAK" microcopy, the *conversation* path a chip. For the moment-of-truth (journey map stage 3), the spoken exchange should be the unmissable primary action.
- **F2 — Four competing primary cues in one dock.** Type row, mic, "Conversation", "Saved" — hierarchy is ambiguous on the screen a stressed traveler sees first.
- **F3 — History has three doors.** "SWIPE FOR HISTORY" pager hint, a "Saved" chip, and whatever lives behind "Conversation" — overlapping destinations for past exchanges.
- **F4 — Empty-state copy teaches the keyboard, not the exchange.** "Tap to start typing." instructs; it doesn't reassure ("works offline") or frame the two-person moment the product is for. Copy is a missed first-impression.
- **F5 — Offline status is display-only.** "READY OFFLINE" isn't an entry point to pack management; a traveler can't act on the state it reports (e.g., stale pack, missing pair).

### 3.3 · What this changes
Nothing in the captures contradicts the Concept A recommendation; F1–F5 *strengthen* it (conversation as the hero, partner surface, offline states as first-class). The category openings in §1 stand.

### 3.4 · Remaining evidence gaps (one screenshot each closes them)
1. **Conversation screen mid-exchange** → settles H2.
2. **Language/pack management screen** → settles H4.
3. **Airplane-mode conversation or missing-pack prompt** → extends the H3 verdict past the ambient state.
4. **Any core screen at max text size** → settles H5. (H6 needs Android captures whenever handy — not urgent pre-hi-fi.)

## 4 · Implications for the redesign (input to concepts)
1. The partner-facing half of the conversation screen is a first-class design surface, not an afterthought.
2. Offline status is ambient and confident by design; failures always ship with a next step.
3. Language packs model around **trips**, with size/version/freshness exposed.
4. Recovery from mistranslation is a designed loop inside the flow.
5. Layouts are elastic by default — translations stretch, meaning never truncates.

