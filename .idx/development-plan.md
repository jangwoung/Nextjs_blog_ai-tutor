# Next.js Blog — Development Plan

Curriculum and phase breakdown for the tutorial. All tutor content should align with this plan.

---

## Overview

- **Public site:** Simple blog with one image + body text per post on the top; list and detail views.
- **Admin:** Separate route (e.g. `/admin`) for creating and managing posts.

---

## Assumptions (for this tutorial)

- **Deploy target:** Cloudflare (Pages / Workers)
- **Data and images:** Supabase (DB + Storage) only

Cloudflare’s runtime **cannot write to the filesystem** (`fs.writeFile` etc.), so persisting posts from the admin UI requires **a database and storage**. This tutorial uses Supabase from the start so the app works in production.

For a “quick local file” approach, use a different plan (e.g. Vercel / Node runtime).

---

## Decisions (fixed for this tutorial)

| Topic | Choice |
| ----- | ------ |
| **Data** | Supabase (Cloudflare-friendly) |
| **Admin auth** | Simple password + signed cookie (env var); Auth.js is optional later |
| **Images** | Supabase Storage; store returned URL in DB (no `public/` writes on Cloudflare) |
| **Deploy** | Cloudflare; design for Edge constraints |
| **Post body** | Markdown stored as string in DB |

---

## Phases

### Phase 0: Environment setup

1. Create Next.js project (App Router).
2. Add packages: Tailwind CSS, Supabase client (and server usage), env-based password + signed cookie for auth.
3. Add `.env.example` (e.g. `NEXT_PUBLIC_SUPABASE_URL`, `ADMIN_PASSWORD`, `SESSION_SECRET`).
4. Understand Cloudflare constraints: no `fs` write; DB + Storage required for persistence.

**Outcome:** Runnable Next.js app, Supabase project ready, env and layout conventions in place.

---

### Phase 1: Public blog (viewer)

1. **Data and fetch:** Post type (title, body, image_url, slug, published, etc.); fetch list and single from **Supabase** (**published = true** only).
2. **Top page:** Show post list (title, thumbnail, date, excerpt, link).
3. **Post detail:** Route e.g. `/posts/[slug]`; one image + body (Markdown).
4. **Layout/nav:** Shared layout, header, footer if needed.
5. **XSS:** Do **not** render raw HTML from Markdown; avoid `rehype-raw`; use safe Markdown rendering (e.g. `react-markdown` without raw HTML).

**Outcome:** Public list and detail with safe Markdown.

---

### Phase 2: Admin base

1. **Admin routes:** e.g. `/admin` with layout and pages.
2. **Auth:** Simple password + **signed cookie**; middleware protects `/admin`; unauthenticated users redirect to login.
3. **Admin layout:** Sidebar or tabs for “post list,” “new post,” etc.

**Outcome:** Can log in to `/admin`; unauthenticated access blocked.

---

### Phase 3: Post create and edit

1. **New post:** Title, body (Markdown), top image upload.
2. **Image upload:** API Route (server) receives file, uploads to **Supabase Storage**, returns URL; store URL in DB (no `public/` write).
3. **Save posts:** **Supabase `posts` table** only (no file write, no SQLite).
4. **Admin list:** All posts (draft + published); links to edit/delete.
5. **Edit and delete:** Update/delete via Supabase.

**Outcome:** Full CRUD and image attach from admin.

---

### Phase 4: Published vs draft

1. **Published field:** e.g. `published: boolean` or `status: 'draft' | 'published'` in `posts`.
2. **Public site:** Only **published** posts in list and detail.
3. **Admin:** Show **all** posts; optional draft list, “publish” action, publish date.

**Outcome:** Drafts exist; public sees only published; admin sees all.

---

### Phase 5: Polish and operations

1. **Validation and errors:** Required/format checks on forms; API errors shown in UI.
2. **Security:** XSS (safe Markdown), env vars (`NEXT_PUBLIC_` vs server-only), admin protection (middleware + signed cookie). Optional: CSRF (e.g. SameSite cookie, POST only).
3. **Tests:** Critical flows (list, detail, create, edit).
4. **README and env:** How to run, `.env` description, Cloudflare deploy note.

**Outcome:** Ready to deploy and operate.

---

## Tech stack (for this tutorial)

| Item | Choice |
| ---- | ------ |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data | Supabase (DB); posts in `posts` table |
| Images | Supabase Storage; store URL in DB |
| Body | Markdown (string in DB) + `react-markdown` |
| Auth | Simple password + signed cookie (Auth.js optional later) |
| Deploy | Cloudflare (Pages / Workers) |
