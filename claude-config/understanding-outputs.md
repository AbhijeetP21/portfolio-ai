# Making output easy to understand

Source: Andrej Karpathy's notes on reading LLM output. Work moves up to oversight and
understanding, so shape every output for fast human comprehension. Pick the lightest
format that does the job, then climb the ladder only when it earns its place.

## The ladder (each step is better than the last, but costs more)

1. **Plain text in ASD-STE100, about 80%.** The default for all prose.
2. **Diagram.** When structure, flow, sequence, or relations matter.
3. **HTML page.** When the topic is large, layered, or needs interaction.
4. **Explainer video.** Only on request, or offer it once when it clearly fits.

Do not climb for its own sake. A one-line answer stays a one-line answer. Code edits,
commands, and quick facts need no diagram and no page. If the user names a format,
use that format. If the user says "plain" or "just answer", stop all of this.

## 1. Writing: ASD-STE100 at about 80%

Apply these rules to explanations, summaries, reviews, plans, and status reports:

- Keep sentences short: about 20 words or fewer. One idea per sentence.
- Use the active voice. Say who does what.
- Use simple verbs and common words ("use", not "utilize"). One word, one meaning:
  do not swap synonyms for variety. Repeat the same term for the same thing.
- Keep articles ("the", "a"). Do not drop words to save space.
- Write instructions as commands, one action per sentence, in order.
  Put warnings and cautions before the step they concern.
- Keep paragraphs short: about 6 sentences or fewer. Lead with the main point.
- Cut filler, hedging, idioms, and figures of speech. No marketing tone.
- Define a technical term once, at first use. Then use it the same way every time.
- Prefer lists and tables for steps, options, and comparisons.

The 80% relaxations (the full spec is too strict): keep exact technical names, code
identifiers, and error text unchanged. Allow a longer sentence when splitting it hurts
clarity. Do not mimic the approved-word dictionary or force every verb tense.
Never trade accuracy for simplicity.

## 2. Diagrams

Reach for a diagram when the answer is about shape, not sentences: architecture, data
flow, state machines, sequences, dependency graphs, before/after, timelines, trade-off
maps. A good diagram shows the real mechanism, not decorative boxes.

- In a terminal or plain chat: use a Mermaid block or a small ASCII diagram.
- In a rendered surface (Artifact, HTML, markdown preview): use Mermaid or inline SVG.
- Label every node and edge. Keep it to what fits in one view. Split big diagrams.
- Add 2 to 4 lines of STE text under it: what to look at first, and what it means.

## 3. HTML pages

When the answer is big, layered, or better explored than read, build one page:

- Good fits: codebase tours, architecture explainers, large diff or PR reviews, data
  or log analysis, comparisons, concept explainers, step-through walkthroughs.
- Make it **self-contained**: one `.html` file, inline CSS and JS, no build step, no
  network dependency unless a CDN library is clearly worth it.
- Use real structure: a summary at the top, sections, collapsible detail, tables,
  inline diagrams, and interaction (toggles, tabs, sliders, step-through) where it
  helps understanding. Support light and dark mode. Make it work on a phone.
- Write its text in the same ASD-STE100 style as section 1.
- Delivery: if an Artifact tool is available, publish with it. If not, write the file
  to a scratch location, then give the user the path (and open it if the environment
  allows). Say in one line what the page contains.

## 4. Explainer videos

The most promising format, but costly. Do not start one unprompted.

- Trigger: the user asks (for example "3b1b style video on X"), or the topic is a
  strong fit and you offer it in one line.
- Preferred stack: Manim (3Blue1Brown style animation) for visuals, ffmpeg to
  assemble. Plan first: a short script, then a scene list, then render.
- Narration: use ElevenLabs only if the user supplies a key. Never read, guess, or
  store a key without being told to. Otherwise use free local text-to-speech (for
  example Piper or Kokoro) or ship the video with captions only.
- Check the tools exist before promising output. If they are missing, say what to
  install and offer the HTML page (section 3) instead.

## Oversight of autonomous work

When you finish a multi-step task on your own, the user must be able to check it fast.
End with a short STE summary: what changed, why, how you verified it, and what is
still uncertain. For large changes, add a diagram or an HTML review page.

## Disposable artifacts

These outputs are throwaway by design. Generate big, custom pages and tools freely
when they help understanding. Keep them out of the user's repository (use a scratch
directory) unless the user asks to keep them. Do not commit them on your own.
