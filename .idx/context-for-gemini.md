# Context to Provide to Gemini in Advance

This document lists **which files from this repo should be given to Gemini (or another tutor agent) before or at the start of a session** so it can run the Next.js blog tutorial correctly. All paths are relative to the project root.

---

## Required (give these first)

| Priority | Path | Purpose |
| -------- | ---- | ------- |
| **1** | **`.idx/learning-index.md`** | **Single source of truth.** All tutor rules (no implementation, chat-only examples), Progress Analysis Checkpoints, Gemini concrete checks per phase, “After Phase N → What to implement next,” onboarding flow, skip/jump workflow, and checkpoint logic. The agent must have this. |
| **2** | **`.idx/development-plan.md`** | Phase 0–5 content, deliverables, stack (Supabase, Cloudflare, Tailwind, signed cookie auth), and why `fs` / `public/` are not used. Needed to align exercises and explanations with the intended curriculum. |
| **3** | **`specs/001-blog-baseline/`** | Spec, plan, data model, and API contracts. The agent uses these to keep exercises consistent with requirements. At minimum include **spec.md**, **plan.md**, **data-model.md**; **contracts/README.md** and other files under that directory as needed. |
| **4** | **`.idx/learner-guide.md`** | How the learner is instructed to use the tutorial: how to start a session, how to say “where are we?,” “skip,” “jump,” ask for hints, and that they don’t need to paste code. Giving this to Gemini helps it recognize learner phrasing and behave in line with what the learner was told. |

---

## Optional (helpful but not mandatory)

| Path | Purpose |
| ---- | ------- |
| **`.specify/memory/constitution.md`** | Project principles and technical constraints (if present). Referenced in learning-index; include when the repo has this file so the agent can align with constitution. |
| **`.idx/constitution-checklist.md`** | Explains how the constitution is structured and example principles (e.g. Cloudflare/Supabase, security). Useful if the agent needs to reason about project governance; not required for routine tutoring. |
| **`.idx/event-intro.md`** | Short and standard event introduction text (for SNS, event pages, etc.). Can be given so the agent can use or adapt it when introducing the event at the start of a session. |

---

## Not needed for the agent

| Path | Reason |
| ---- | ------ |
| **`.idx/context-setup.md`** | Instructions for **humans** setting up Cursor/Firestudio. Not needed as context for the agent itself. |
| **`.idx/event-intro.md`** | For event organizers and copy; only give to the agent if you want it to use intro text at session start. |

All required and optional tutor context is under **.idx/** (and **specs/**). A **docs/** folder is not used; if present, it can be ignored or removed.

---

## How to use this list

- **Cursor / IDE rules:** Attach or reference **.idx/learning-index.md** in the agent’s rules (or system prompt). Add **.idx/development-plan.md** and **specs/001-blog-baseline/** (or key files under it) as “read these for context.” Optionally include **.idx/learner-guide.md** so the agent knows how learners are instructed.
- **Firestudio / .idx:** Ensure **.idx/learning-index.md** is in the workspace and that the agent is instructed to use it for progress and behavior. Point the agent to **.idx/development-plan.md** and **specs/001-blog-baseline/** for curriculum and spec.
- **One-off session:** At session start, provide or paste the contents of **.idx/learning-index.md** and **.idx/development-plan.md** (and, if possible, the main spec files). Add **.idx/learner-guide.md** if you want the agent to match the documented learner experience.

Summary: **Always give `.idx/learning-index.md`.** Then add **.idx/development-plan.md**, **specs/001-blog-baseline/** (at least spec, plan, data-model), and **.idx/learner-guide.md**. Optionally add **.specify/memory/constitution.md**, **.idx/constitution-checklist.md**, and **.idx/event-intro.md** as above.
