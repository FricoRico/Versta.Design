---
title: "Traveler journey map — talking to a local, offline"
paperclip_issue: NEU-57
document_key: journey-map
revision: 1
revision_id: 23fccb74-5f6b-42ea-8e2b-ea921f53016b
exported: 2026-10-27
---

# Traveler journey map — talking to a local, offline

**Anchor scenario:** midday, street market. Traveler needs something from a vendor — a price, an allergy check, directions. No data connection (airplane mode / no local SIM / dead zone). Phone has offline packs installed. The whole test of this product happens in the next 90 seconds.

## Stage 1 · Pre-trip prep — *connectivity: yes*
- **Goals:** get ready without thinking about it; trust the app will work there.
- **Actions:** pick destination languages, download offline packs, maybe pin phrases.
- **Category pains:** doesn't know packs exist until it's too late; pack sizes opaque; which language direction is unclear; no idea what still works offline vs. online.
- **Opportunities:** trip-centric setup ("Japan in 2 weeks? Get Japanese — 210 MB"); nudges timed to booking/check-in while still on good Wi-Fi; a curated phrase starter set that ships inside every pack.

## Stage 2 · Arrival, sliding offline — *connectivity: degrading*
- **Goals:** none. The traveler is not thinking about the app — and shouldn't have to.
- **Category pains:** silent degradation; the first feature that fails is the one they trusted; nothing says what's still good offline.
- **Opportunities:** confident ambient state ("Offline · Japanese ready") instead of an alarm; a last-good-Wi-Fi catchup prompt ("Still missing the Japanese pack — grab it now").

## Stage 3 · Moment of need — *connectivity: none*
- **Goals:** start the exchange in seconds; get past the social awkwardness of putting a phone between two people.
- **Actions:** open app, confirm language pair, make the first move — greet, show the screen, or speak.
- **Category pains:** language-picker friction and wrong-direction configs; returning users re-picking what the app already knows; cold-start doubt about whether the mic works offline.
- **Opportunities:** zero-setup relaunch — reopen straight into the conversation with the last pair pinned; a visible "ready offline" affordance on the conversation screen; one thumb-reachable primary action.

## Stage 4 · The exchange — *connectivity: none*  ← **the moment of truth**
- **Goals:** be understood; understand; keep it human — pace and eye contact matter more than throughput.
- **Actions:** speak or type; show or hand over the phone; local replies; repeat; occasionally recover from a mistranslation; play translations aloud when reading isn't practical.
- **Category pains:** type sized for the owner, illegible across a counter at arm's length; implicit turn-taking — both parties guess whose mic is live; chat-bubble logs cram two languages into one scroll the partner can't parse; a missed or mangled recognition has no graceful retry; long translations (German, Finnish) clip fixed-size bubbles; TTS on names and prices is where trust breaks.
- **Opportunities:** a partner-facing surface (rotated, giant type) as a first-class half of the screen; explicit turn structure — one control per side; an in-flow verification loop (replay · re-say · confirm) so errors don't travel silently; tap-to-fullscreen show-card for sun, noise, and accessibility; numerals rendered big — digits cross every language.

## Stage 5 · Recovery & follow-up — *connectivity: none*
- **Goals:** salvage a misunderstanding; capture what mattered — the price, the address, the platform number.
- **Actions:** re-ask, simplify, save or star a translation, copy an address out.
- **Category pains:** no way to flag "that was wrong" so the app can adjust; capturing info means mentally leaving the exchange; fallback to gestures when the model fails.
- **Opportunities:** swipe-to-save into a per-trip notebook; one-tap "say it again slower"; curated fallback phrase cards when free-form keeps missing.

## Stage 6 · Post-trip — *connectivity: yes*
- **Goals:** reclaim storage; keep the useful residue.
- **Category pains:** stale packs sit forever, forgotten.
- **Opportunities:** gentle cleanup ("Back from Tokyo? Free 420 MB") — offered, never automatic; starred phrases survive pack removal.

## Moments of truth, ranked
1. **First 10 seconds of the exchange** — if setup or doubt shows here, the app gets pocketed and the interaction degrades to pointing.
2. **The first mistranslation** — trust is made or lost by how recoverable it feels.
3. **Pack-missing failure at the moment of need** — the single worst outcome; must be designed to a graceful offline fallback, never a dead end.

## Design principles distilled (carried into the concepts)
1. **The local is a user too.** Half the screen belongs to the person who never installed the app.
2. **Offline is the normal case.** Capability stated quietly and confidently — never an apology.
3. **Glance beats dense.** Giant type for the partner side; one action per person.
4. **Turns are explicit.** No guessing whose mic is live.
5. **Recovery is designed.** Mistranslation gets an in-flow fix loop, not an awkward restart.
6. **Type stretches.** Layouts elastic for long translations — meaning never truncates.
7. **One thumb, sunlight, walking.** ≥48pt targets, high contrast, critical actions in reach.

