# Enabling the Tutorial Agent — Context Setup

How to make the “step-by-step check and support” tutor work in Cursor, Firestudio, or other agents. **All required context lives under `.idx/`.**

---

## 1. Files in .idx

| File | Role |
| ---- | ---- |
| **.idx/learning-index.md** | **Single source of truth.** Tutor rules, progress checkpoints, Gemini concrete checks, “what to implement next” per phase, onboarding, skip/jump workflow. The agent must use this. |
| **.idx/development-plan.md** | Curriculum: Phase 0–5 content, deliverables, stack. |
| **.idx/learner-guide.md** | For learners: how to start, what to say, skip/jump. Share with participants. |
| **.idx/context-for-gemini.md** | List of what to give the agent in advance (required vs optional). |
| **.idx/context-setup.md** | This file: how to wire the agent (Cursor, Firestudio, etc.). |
| **.idx/dev.nix** | Firestudio: `npm install` on create, preview command. |
| **specs/001-blog-baseline/** | Spec, plan, data model, API contracts (outside .idx; agent may read). |

---

## 2. Cursor

1. **Load rules**  
   In Cursor rules (e.g. `.cursor/rules` or project rules), include **.idx/learning-index.md** or state: “When running the Next.js blog tutorial, follow **.idx/learning-index.md**.”
2. **Progress**  
   The agent should determine progress from **.idx/learning-index.md** Checkpoints and Gemini concrete checks (already described there).
3. **Learners**  
   Tell them to say “I want to start the blog tutorial”; the agent will run onboarding (analyze project → report phase → give first exercise).

---

## 3. Firestudio

- Put **.idx/learning-index.md** in the repo and tell the agent to use it for progress (Phase 0–5) and behavior.
- In the agent’s prompt or rules, point to **.idx/learning-index.md** so the same concept→example→exercise→support flow and checks apply.
- **.idx/dev.nix** already configures `npm install` on create and the web preview command.

---

## 4. Other agents

- **Progress and rules:** Put **.idx/learning-index.md** where the agent can read it; use it for progress and all tutor behavior.
- **Curriculum:** Add **.idx/development-plan.md** (and optionally **specs/001-blog-baseline/**) as reference.
- **Learners:** Share **.idx/learner-guide.md** for how to start, what to say, skip/jump.

---

## 5. Summary

- **Context:** Use **.idx/learning-index.md** for progress and rules; **.idx/development-plan.md** for curriculum. Optional: **.idx/context-for-gemini.md** for “what to give the agent in advance.”
- **Learners:** Use **.idx/learner-guide.md** for session start, phrasing, and skip/jump.
- No dependency on a `docs/` folder; everything needed is under **.idx/** (and **specs/** for spec details).
