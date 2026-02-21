# Constitution Checklist — What to Define

The project’s Constitution (e.g. in `.specify/memory/constitution.md`) defines fixed principles and constraints. This checklist is for filling or checking that file. It aligns with the blog tutorial and **.idx/development-plan.md**.

---

## 1. Template placeholders

Typical placeholders in a constitution file:

| Placeholder | Meaning | Blog example |
| ----------- | ------- | ------------ |
| Project name | Official project name | Next.js Blog (AI-tutor) |
| Principle 1–5 | Core principle names and text | See §2 below |
| Section 2 / 3 | Extra sections | e.g. Technical constraints, Development flow |
| Governance | How the constitution is updated and enforced | Version, amendment process, review |
| Version / dates | Semantic version, ratification, last amended | 1.0.0, YYYY-MM-DD |

---

## 2. Core principles (blog / tutorial example)

For a Supabase + Cloudflare blog tutorial, principles like these fit the development plan.

### I. Deploy and runtime consistency

- Production target is **Cloudflare (Pages / Workers)**.
- Design for Edge limits (no server `fs` write).
- Persistence only via **Supabase (DB + Storage)**; no local files or SQLite.

### II. Data and storage single source

- Post data only in **Supabase `posts`** table.
- Images in **Supabase Storage**; store URL in DB.
- No server writes to `public/` or file-based post storage.

### III. Security first

- **Admin** (`/admin`) protected by **middleware + signed cookie**.
- **XSS:** Safe Markdown rendering; do not enable `rehype-raw` lightly.
- **Env:** Clearly separate `NEXT_PUBLIC_` (client) from server-only secrets.

### IV. Public vs admin separation

- **Public:** Only show posts with `published === true`.
- **Admin:** Show **all** posts (draft + published); allow edit/delete.
- Keep “public” and “admin” APIs/UI responsibilities separate.

### V. Simplicity and tutorial fit

- Use **simple password + signed cookie** first; Auth.js etc. as optional later.
- Features follow the **development plan phases**; avoid scope creep.
- Keep code readable, in small units, and testable.

---

## 3. Extra sections (examples)

### Technical constraints / stack

- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind; Supabase (DB); images in Storage; auth: simple password + signed cookie.
- **Body:** Markdown stored as string; render with `react-markdown` (or similar) safely.

### Development flow / quality

- Implement in **phase order** (see **.idx/development-plan.md**).
- Add tests for critical flows (list, detail, create, edit).
- Security checks: admin protection, XSS, env usage; CSRF e.g. SameSite cookie, POST only.

---

## 4. Governance (example)

- Constitution overrides other project rules when they conflict.
- Changes are documented and versioned (e.g. MAJOR/MINOR/PATCH).
- Reviews and PRs check alignment with the constitution.

---

## 5. Summary

| Category | What to define |
| -------- | ---------------- |
| Project name | Official name |
| Core principles | 3–5 items (deploy, data, security, public/admin split, simplicity) |
| Technical constraints | Stack, auth, body format |
| Development flow | Phase order, testing, security checks |
| Governance | Priority, amendment process, versioning, review |
| Meta | Version, ratification date, last amended (ISO) |

A filled constitution is the shared basis for spec, plan, and tasks.
