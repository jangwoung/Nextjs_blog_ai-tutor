# Next.js Blog Tutorial — Event Intro Copy

Use these for event pages, SNS, or session intros. Adjust event name, host, date, and URL as needed.

---

## Short (1–2 lines, SNS / banner)

**Hands-on: build a “read + manage” blog with Next.js 16. Supabase and Cloudflare; step through phases from zero to a working app.**

---

## Standard (event description, e.g. connpass / Doorkeeper)

### What this is

A hands-on where we build a blog with **public pages** and an **admin** using Next.js 16 (App Router) and Supabase, phase by phase.

- **Public:** List and detail with one image + body (Markdown).
- **Admin:** Log in to create, edit, delete posts and toggle draft/published.

Data and images use **Supabase (DB + Storage)**; deploy target is **Cloudflare.** The app is production-ready so you can reuse it in real projects or portfolios.

### What you’ll do

- Next.js 16 (App Router) pages and Route Handlers
- Supabase for data and image upload (Storage → URL in DB)
- Admin auth (simple password + signed cookie) and middleware protection
- Markdown rendering, XSS safety, env vars (client vs server)

We go **Phase 0 (setup) → Phase 5 (polish).** Each phase has a clear goal and “done” criteria so even beginners can follow.

### Who it’s for

- Some experience with Next.js or React
- Want to use App Router and Supabase in practice
- Want to build a small blog/CMS-style app

### Prerequisites

- Node.js 20+
- Editor (VS Code, Cursor, etc.)
- (Optional) Supabase account (can be created during the session)

### Good fit if you

- Prefer thinking and typing over copy-paste only
- Want to try Next.js + Cloudflare + Supabase together
- Are looking for a “blog build” workshop or study material

---

## Longer (blog / LP)

### Title ideas

- **Next.js 16 + Supabase × Cloudflare Blog Hands-on**
- **Build a “read + manage” blog from scratch with Next.js**

### Body

In this event we build **both** the “read posts” side and the “write and manage posts” side in one Next.js app.

**Why Supabase and Cloudflare**

We target **Cloudflare (Pages / Workers).** There’s no server-side file write (`fs.writeFile`), so to keep content from the admin we need **a database** and **storage.** We use **Supabase** for both: posts in the DB, images in Storage (URL in DB). That way the app runs on Cloudflare without “works locally but not in production.”

**Phased learning**

We progress in **Phase 0–5:** setup → public blog → admin base → create/edit → draft vs published → polish. Each phase has a clear objective and “done” state so you can see how far you’ve got and continue later using the repo and docs.

**Optional: use AI**

The repo includes a **learning plan** and **progress checklists** (`.idx` / learning-index). You can say “I want to start the blog tutorial” to an AI agent and get hints and next steps. The event works with or without AI.

---

## Hashtags

`#Next.js` `#Supabase` `#Cloudflare` `#blog` `#handson` `#workshop`

---

## Notes

- Add event name, host, date, venue, and registration URL for your platform.
- Shorten or drop the “AI” part to match your event style.
