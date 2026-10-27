---
title: "Untitled"
paperclip_issue: NEU-57
document_key: concepts
revision: 1
revision_id: a62b70fa-213a-4e44-8847-5783f9f88399
exported: 2026-10-27
---

# Redesign concepts — core traveler flows

Concepts for the three core flows: **conversation screen**, **language management**, **offline states**. Grounded in the [journey map](journey-map) and [teardown](teardown). Language management and offline states are direction-independent — designed once, they carry into whichever concept wins.

**Wireframes (low-fi, annotated):**
- [Concept A — Face-to-Face](/api/attachments/617ba221-9119-4e7a-ad95-4e3b9d2d5c26/content)
- [Concept B — Guidebook](/api/attachments/a9550989-7e80-4a1a-ba6b-0ea3d42ae102/content)
- [Concept C — Interpreter Cards](/api/attachments/61f56d2d-5d87-484f-a26b-5414cb87e0ca/content)
- [Language pack management](/api/attachments/c3eb04e1-2e20-49db-8d8c-cc6df1a525e1/content)
- [Offline states](/api/attachments/6e802771-29f7-47a5-97c1-2a105657aabe/content)

---

## Concept A — Face-to-Face · **Recommended**
**One-liner:** the screen physically divides — bottom half faces the traveler, top half rotates 180° to face the local across the counter.

**How it works:** Each person gets exactly one control — a large mic in their own language — so turns are unambiguous and there are no mode toggles. The partner side renders ≥28pt high-contrast type, legible at arm's length; the phone rests on the counter or is held between the two like a shared notepad. A draggable divider reveals turn history on demand; the live exchange owns the screen by default. Tapping any line escalates it to a fullscreen show-card (borrowed from Concept C) for sun, noise, or accessibility. A swipe-up **quick-phrase sheet** (borrowed from Concept B) covers formulaic exchanges — greetings, prices, allergies — with curated offline phrases that show + speak in one tap.

- **Strengths:** matches the true social geometry (two people, one phone, facing each other); kills turn-taking ambiguity by construction; the local finally gets designed-for pixels — no competitor does this; identical behavior online and offline, which the UI states confidently.
- **Risks:** rotated dual-surface is a novel pattern → needs first-run coaching (coach marks + asymmetry does most of the teaching); physically shared-screen intimacy isn't for every interaction (handing the phone over remains possible via the show-card).
- **Build weight (for Maya's review):** rotated text container with independent mic bindings per half; TTS routing per side; elastic bubble-free layout. Moderate native work, no new ML surface.

## Concept B — Guidebook
**One-liner:** the conversation anchors on context-grouped, curated phrase rails — one tap shows + speaks; free-form conversation lives below.

**How it works:** A trip-scoped header frames the exchange ("Lisbon · Português ⇄ English — ready offline"). Curated phrase groups (Greetings / Prices / Directions / Allergies / Emergency) tap straight to a partner-facing card plus offline TTS — human-reviewed content, zero ML risk. Below sits a simplified single-column log: both languages stacked per turn, newest first, stars saving into a per-trip notebook.

- **Strengths:** highest reliability for the 80% formulaic exchanges; lowest cognitive load mid-street; strongest offline story — curated content has no quality cliff.
- **Risks:** formulaic ceiling — when an exchange goes off-script (it will), fallback is the weaker, secondary surface; phrase content is an ongoing authoring cost for the project.
- **Build weight:** lightest. Mostly content + list UI on existing translation surface.

## Concept C — Interpreter Cards
**One-liner:** strict turn-taking walkie-talkie — you tap and speak, the card flips fullscreen to the local with auto-TTS, they tap and reply.

**How it works:** Attention mode becomes the backbone instead of a buried action. One button at a time, labeled with whose turn and which language — impossible to talk over each other. Prior turns live as a tappable filmstrip; "Say again" replays TTS without forcing anyone to re-speak.

- **Strengths:** maximal legibility; simplest mental model; most accessible by default; easiest to build well; audio-first recovery is excellent.
- **Risks:** two fullscreen transitions per turn — pace dies in rapid exchanges (bargaining, back-and-forth directions); reads transactional rather than conversational; weakest continuity for longer dialogues.
- **Build weight:** moderate, mostly contained to one screen's state machine.

## Shared flows — direction-independent
- **Language management (wireframe):** packs modeled as **trips**, not an A–Z list; every pack exposes size, version, freshness and update channel; booking/layover-timed suggestions catch travelers while still on Wi-Fi; storage honesty bar; post-trip cleanup offered, never forced; every pack ships with its curated phrase starter set.
- **Offline states (wireframe):** (1) **Ambient** — a quiet green chip states full capability; no banners, no modals. (2) **Missing pack at the moment of need** — an inline card with honest cost (210 MB, ~40 s on Wi-Fi) and two real choices: schedule the download, or continue instantly with saved phrases. Never a dead end; never an unsolicited mobile-data download. (3) **Low storage** — numbers up front (free / needed / remaining), a one-tap free-up path via old packs, and "download anyway" left to the user's call.

## Recommendation
**Take Concept A forward**, absorbing B's phrase rail as a secondary sheet and C's fullscreen card as the per-message escalation. Rationale:
1. It's the only direction that fixes the category's core miss (teardown §1.1–1.2): the partner is designed-for, and turns are explicit.
2. It converts our offline-first constraint into visible product truth — same UI online and off (teardown §2).
3. It hedges its own novelty: B's rail catches users who don't discover the dual-surface, C's card covers hand-over and accessibility moments.
4. Delta to C is mostly additive; if A's rotated surface tests poorly in beta, we degrade to C semantics without throwing away the system (colors, type ramp, chips, states).

## Guideline reconciliation — existing design language vs Concept A (14 Oct)
Six unimplemented boards supplied: `home-ink-split`, `home-ink-split-flip`, `home-ink-sheet`, `home-ink-modes`, `home-orb-dock`, `home-type-stack`. **Verdict: gate cleared — nothing materially contradicts Concept A. The ink-split family *is* Face-to-Face rendered in the house style; hi-fi proceeds in this design language.** Per the pre-agreement, divergences with consequences are listed here rather than surfacing at handoff.

### Carries over unchanged
1. **Two-tone split, per-side color system.** Traveler half = warm off-white / near-black type; partner half = near-black / white display type + acid microcopy. Maps directly onto Concept A's two surfaces.
2. **Acid = the live mic, and only the live mic.** One loud color reserved for the active capture control — reinforces turn clarity at arm's length, exactly what the split needs.
3. **Mono uppercase microcopy as the status voice** ("READY OFFLINE", "JAPANESE — OFFLINE · 84 MB"). This *is* the ambient offline pattern from the teardown (§1.3) — calm, always-on, never a banner.
4. **Pack honesty in context** — size + offline state on the surface, consistent with trip-centric pack management (shared flows).
5. **"Speech stays on your phone."** Adopted as the standing privacy subline; it is the offline-first promise in one sentence.
6. **Per-turn Copy / Keep** — Keep feeds the trip notebook (B-rail absorption), no conflict.
7. **⇄ swap control** between the pair — carries into the A header as-is.

### Adapts (kept, adjusted)
1. **Center mic FAB → split mic bar.** The boards' single straddling orb reads ambiguous on *whose* turn it is (teardown §1.2). Hi-fi keeps the straddling *form* but splits it into two labeled zones (EN side / JA side, per-side mic bindings) — the guideline look with Concept A's turn-by-construction semantics. This is the one deliberate deviation from the boards; rationale is turn ambiguity, not taste.
2. **ink-split-flip** confirms panel order is a *mode*, not two screens — flip becomes an orientation/layout state (auto by device angle + manual toggle), specced once.
3. **ink-sheet's grabber** = A's draggable divider. Converged: traveler panel is a resizable sheet over the partner surface; history reveal specced off the same gesture.
4. **ink-modes' Text/Vision/Voice switcher dissolves.** Modes are what A removes; Text and Vision become traveler-side utilities (keyboard affordance in the traveler panel, camera in its header), voice stays the per-side primary. No mode bar.
5. **orb-dock = the solo/home surface.** Single-column card + RECENT + orb reads as the not-in-conversation state. IA resolution: **home/solo speaks orb-dock; engaging a partner flips to the ink-split surface.** One app, two geometries, one state change (partner join) — also fixes teardown F1–F3.
6. **type-stack's waveform divider** → adopted as the per-side listening indicator motif (restrained, one at a time).

### Diverges (flagged — none blocking)
1. **Wavy/display treatment on partner CJK glyphs** (ink-split boards). Partner text's only job is instant legibility for a native reader at arm's length; a novelty display face works against that. Hi-fi specs a high-legibility CJK face; if the wavy face is a brand must, it gates behind a display toggle and a native-reader check before beta. Flagging per the "no surprises at handoff" agreement.
2. **Black partner panel in direct sun** — reflectivity risk at outdoor counters. Mitigation is already in the boards (white-on-black ≥ 28pt, max contrast); hi-fi adds an invert-panels accessibility toggle and it goes on the beta-validation list.

## Next steps (revised 14 Oct, post-reconciliation)
1. ~~Maintainer picks direction~~ → **A picked; gate cleared by reconciliation.** Confirmation card on the thread formalizes the pick.
2. Hi-fi in the reconciled language: conversation split (ink), home/solo (orb-dock), language management + offline states (direction-independent, already specced low-fi) → pixel specs + lightweight design system (tokens, type ramp, components).
3. Pair with Maya on the three feasibility questions above + the split-mic-bar bindings before specs freeze.
4. Teardown §3.4: four one-screenshot gaps remain; each gets processed the day it lands.
5. Store-screenshot capture list for beta once hi-fi is stable.

## Open feasibility questions for Maya (non-blocking)
1. Rotated container with live mic/TTS routing per half on both SwiftUI and Kotlin — any platform landmines (rotation + accessibility focus order)?
2. Divider drag + history virtualization under long translation strings — layout cost of fully elastic cells?
3. TTS handoff mid-turn (replay while partner mic armed) — acceptable to serialize, or do we need an audio-session policy?

## Runtime constraints (binding — from NEU-4, ADR-0001 rev 3, approved 13 Oct)
- **No cancel affordance anywhere.** On-device translations complete sub-200 ms post-LeanMT (ADR-0001 R1.7/R2.10); the legacy cancel button was a dead no-op. Plumbing removal: NEU-11; UI removal lands with the redesigned screen. None of the three concepts carry a cancel affordance — confirmed against the five wireframes.
- **Latency budget:** the happy path is effectively instant. The listening → result transition gets a brief one-beat shimmer solely so the state change reads as deliberate — no fake "thinking" UI.
- **Pre-agreed regression path:** if beta telemetry shows p95 > 1.5 s, we design a progress/reassurance state ("Translating…" chip with elapsed time) — never a cancel button. Revisit trigger is telemetry-based, logged here so hi-fi can't regress on it.
- **Design implication of sub-200 ms:** model time ≈ 0, so perceived pace is set by human speech + TTS handoff — the design optimizes the turn handoff, not progress indication. This supports the Concept A recommendation.

## Decision log
- **12 Oct** — Sprint v1 delivered: teardown, journey map, three concepts + recommendation (A), five wireframes. Review card posted.
- **13 Oct** — Runtime constraints from NEU-4 / ADR-0001 rev 3 adopted as binding (section above); concepts verified free of cancel affordances.
- **14 Oct** — Maintainer review: Concept A ("Face-to-Face") is the preferred direction, gated on one input — the existing (not yet implemented) design guidelines, to be attached to this issue for a reconciliation pass before hi-fi. Build-access path chosen: current-app screenshots attached to this issue. On arrival: (1) reconcile the existing visual language (type scale, color, components, tone) against Concept A — same-day, verdict posted on the thread; (2) verify teardown §3 hypotheses against the screenshots; (3) hi-fi proceeds on A in the existing design language unless the guidelines materially contradict the direction — if they do, options come back to this thread.


