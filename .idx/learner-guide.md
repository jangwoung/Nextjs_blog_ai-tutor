# Learner Guide — How to Use the Next.js Blog Tutorial

How to run the tutorial with an AI tutor (Cursor, Firestudio, etc.). Share this with learners.

---

## 1. What the tutorial does

- You follow the **development plan** (Phases 0–5) in **.idx/development-plan.md**.
- Each phase: **concept → short example → blog exercise.** Exercises give **objective** and **expected result** only (no step-by-step list). You implement; if stuck, ask for hints or a guided walkthrough.
- The agent **does not edit your files** by default. You write the code. Only when you say **“skip this phase”** or **“jump to phase N”** will it offer code; you choose **apply it yourself** or **have the agent apply it**.

---

## 2. Starting a session

- Open the tutor (e.g. Cursor with rules that load **.idx/learning-index.md**). Say: **“I want to start the blog tutorial”** or **“Continue the Next.js blog tutorial.”**
- The agent **reads your project** and decides where you are, then:
  - If you haven’t started: begins at **Phase 0**.
  - If you’re partway through: continues from the **next phase**.
- It may ask your **experience level** (beginner / intermediate / advanced) once; answers change how deep the explanations and hints are.

---

## 3. Working through an exercise

1. **Read** the **objective** and **expected result** (what the screen/URL should look like when done).
2. **Implement** in your repo (use **.idx/development-plan.md** and **specs/001-blog-baseline/** if you like).
3. When done, say **“I’m done”** or **“Please check.”** The agent will **read your files** and confirm; if OK, you move to the next phase.
4. If stuck, say **“I need a hint”** or **“Explain step by step.”** It will guide with hints, not full answers.
5. **You don’t need to paste code.** The agent reads the repo; you can say “check this file” if needed.

---

## 4. Useful phrases

| You want to… | Say something like… |
| ------------ | ------------------- |
| See progress | “Where are we?” / “Show progress” / “Table of contents” |
| Skip current phase | “Skip this phase” / “Skip this step” |
| Jump to another phase | “I want to do Phase 3” / “Jump to the admin section” |
| Get a hint | “Give me a hint” / “What should I fix?” |
| Step-by-step help | “Give me the steps” / “Step by step” |
| Have work checked | “Is this correct?” / “Review this” |

---

## 5. Skip and jump

- **Skip:** The agent confirms, then shows the **code changes** for that phase. You choose **apply yourself** or **have the agent apply**. Then it describes what you should see; check in the browser.
- **Jump:** It will say which phases are treated as “done” for setup. You may get **setup code**; again choose who applies. After that, the **target phase’s lesson** starts.

---

## 6. Where things live

- **Progress** is defined in **.idx/learning-index.md** (checkpoints per phase).
- **Tutor rules** are in **.idx/learning-index.md** (all behavior and rules).
- **Curriculum** is in **.idx/development-plan.md**.
- **This guide** is **.idx/learner-guide.md**.

---

## 7. Environment

- **Stack:** Next.js (App Router), TypeScript, Supabase, Tailwind. Deploy target: **Cloudflare.**
- **No `fs.writeFile` or SQLite** in this tutorial; data in Supabase, images in Supabase Storage.
- See **.idx/development-plan.md** and **specs/001-blog-baseline/** for details.
