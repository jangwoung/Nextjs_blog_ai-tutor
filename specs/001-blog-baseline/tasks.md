# Tasks: ブログ ベースライン

**Input**: Design documents from `specs/001-blog-baseline/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested in spec; no test tasks included.

**Organization**: Tasks are grouped by user story (US1 = 公開サイトで記事を読む, US2 = 管理者ログイン・管理画面, US3 = 記事の投稿・編集・削除).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1, US2, US3
- Include exact file paths in descriptions

## Path Conventions

- Next.js App Router: `app/`, `lib/`, `middleware.ts` at repository root (per plan.md)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create Next.js 16 project with App Router and TypeScript in repository root per plan.md
- [ ] T002 Install and configure Tailwind CSS (tailwind.config.*, postcss, app/globals.css)
- [ ] T003 [P] Add @supabase/supabase-js to package.json and install
- [ ] T004 Create .env.example with NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_PASSWORD, SESSION_SECRET per quickstart.md
- [ ] T005 Create app/layout.tsx and app/page.tsx as minimal root layout and placeholder page

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 [P] Create lib/supabase/client.ts and lib/supabase/server.ts for Supabase client (browser and server) per plan
- [ ] T007 [P] Define Post type in lib/types.ts per data-model.md (id, title, body, slug, image_url, published, published_at, created_at, updated_at)
- [ ] T008 Create lib/auth/session.ts with helpers to set and verify signed admin session cookie (using SESSION_SECRET)
- [ ] T009 Create middleware.ts at repository root to protect /admin: redirect to /admin/login when no valid session cookie
- [ ] T010 Document Supabase setup (posts table, Storage bucket "images", .env) in README per quickstart.md and data-model.md

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - 公開サイトで記事を読む (Priority: P1) 🎯 MVP

**Goal**: Visitors see a list of published posts on the top page and can open a post detail page with one top image and Markdown body.

**Independent Test**: Open top page → see published posts list; click a post → see detail with image and body. Draft posts do not appear.

- [ ] T011 [US1] Implement app/page.tsx to fetch published posts only (published = true) from Supabase, display list with title, slug, image_url, published_at, and body excerpt per contracts
- [ ] T012 [US1] Implement app/posts/[slug]/page.tsx to fetch single post by slug (published only), return notFound() when missing, display image and body
- [ ] T013 [US1] Add Markdown rendering for post body in app/posts/[slug]/page.tsx using react-markdown without rehype-raw (XSS-safe per FR-008)
- [ ] T014 [US1] Add public layout or navigation in app/layout.tsx (e.g. header with link to home)

**Checkpoint**: User Story 1 is independently testable; public site shows list and detail

---

## Phase 4: User Story 2 - 管理者がログインして管理画面を使う (Priority: P2)

**Goal**: Admin can open /admin, see login form when unauthenticated, log in with password to reach admin dashboard/list; session persists on reload; direct links to /admin/* redirect to login when not logged in.

**Independent Test**: Open /admin → login page; submit correct password → admin area; reload → still in admin; open /admin in incognito → login page.

- [ ] T015 [US2] Create app/admin/login/page.tsx with password form that POSTs to login API
- [ ] T016 [US2] Implement POST app/api/admin/login/route.ts to verify password against ADMIN_PASSWORD and set signed session cookie on success
- [ ] T017 [US2] Implement POST app/api/admin/logout/route.ts to clear session cookie
- [ ] T018 [US2] Create app/admin/layout.tsx (admin shell; auth is enforced by middleware)
- [ ] T019 [US2] Create app/admin/page.tsx to show admin top (e.g. link to article list and new post)
- [ ] T020 [US2] Implement app/admin/page.tsx (or dedicated list route) to fetch all posts (no published filter) from Supabase and display admin list with links to edit per contracts

**Checkpoint**: User Story 2 is independently testable; admin can log in and see admin list

---

## Phase 5: User Story 3 - 管理者が記事を投稿・編集・削除する (Priority: P3)

**Goal**: Admin can create a new post (title, body, slug, top image, published flag), edit and delete existing posts; drafts stay hidden on public site; published posts appear on public list.

**Independent Test**: Log in → create post (with image) → see in admin list; set published → see on public top; edit/delete from admin list.

- [ ] T021 [US3] Create app/admin/new/page.tsx with form: title, body, slug, image upload, published; submit creates post
- [ ] T022 [US3] Implement POST app/api/admin/upload/route.ts to upload file to Supabase Storage bucket, return public URL in JSON (auth required)
- [ ] T023 [US3] Implement POST app/api/admin/posts/route.ts to create post in Supabase posts table (title, body, slug, image_url, published); validate and return 400/409 on error
- [ ] T024 [US3] Create app/admin/[id]/edit/page.tsx to load post by id and show edit form (title, body, slug, image_url, published)
- [ ] T025 [US3] Implement PATCH app/api/admin/posts/[id]/route.ts and DELETE app/api/admin/posts/[id]/route.ts (or equivalent Server Actions) for update and delete
- [ ] T026 [US3] Wire app/admin/new and app/admin/[id]/edit forms to create/update posts and set image_url from upload API response

**Checkpoint**: User Story 3 complete; admin can full CRUD and toggle published; public site shows only published

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validation, errors, security review, documentation

- [ ] T027 Add form validation (required title, body, slug; slug format) and user-visible error messages in app/admin/new and app/admin/[id]/edit
- [ ] T028 Add README section for run instructions, npm scripts, and .env variables per quickstart.md
- [ ] T029 Security pass: confirm XSS (no rehype-raw), env var separation (NEXT_PUBLIC_ vs server-only), middleware protects all /admin

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational only
- **User Story 2 (Phase 4)**: Depends on Foundational only (middleware + auth)
- **User Story 3 (Phase 5)**: Depends on Foundational; uses admin UI from US2
- **Polish (Phase 6)**: Depends on completion of desired user stories

### User Story Dependencies

- **US1 (P1)**: No dependency on US2/US3. Implement and test first (MVP).
- **US2 (P2)**: No dependency on US1. Can be built in parallel after Foundational.
- **US3 (P3)**: Requires US2 (admin routes and auth). Build after US2 or in sequence.

### Within Each User Story

- Data/API layer before UI where applicable (e.g. upload API before new post form that uses it)
- Commit after each task or logical group

### Parallel Opportunities

- Phase 1: T003 can run in parallel with T002
- Phase 2: T006, T007 can run in parallel; T008, T009 depend on T006/T007
- After Phase 2: US1 and US2 can be developed in parallel; US3 after US2

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup  
2. Complete Phase 2: Foundational  
3. Complete Phase 3: User Story 1  
4. **STOP and VALIDATE**: Public list and detail work with published posts only  
5. Deploy/demo if ready  

### Incremental Delivery

1. Setup + Foundational → foundation ready  
2. Add User Story 1 → validate public site (MVP)  
3. Add User Story 2 → validate admin login and list  
4. Add User Story 3 → validate full CRUD and draft/published  
5. Polish → validation, docs, security  

### Parallel Team Strategy

- After Foundational: Developer A = US1, Developer B = US2; then Developer B or C = US3 after US2.

---

## Notes

- [P] = parallelizable (different files, no ordering dependency within phase)
- [USn] = task belongs to User Story n for traceability
- Each user story is independently testable per spec.md
- Paths follow plan.md (app/, lib/, middleware.ts at repo root)
