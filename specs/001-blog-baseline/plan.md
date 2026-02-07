# Implementation Plan: ブログ ベースライン

**Branch**: `001-blog-baseline` | **Date**: 2026-02-04 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/001-blog-baseline/spec.md`

## Summary

公開サイトで記事一覧・詳細（トップ画像1枚 + Markdown 本文）を表示し、管理者が認証後に記事の CRUD と下書き/公開の切り替えを行うブログのベースラインを実装する。データ・画像は Supabase（DB + Storage）に永続化し、Cloudflare デプロイを前提に Edge 制約を満たす。

## Technical Context

**Language/Version**: TypeScript (Node 20+ / Edge)  
**Primary Dependencies**: Next.js 14+ (App Router), Supabase (client + server), Tailwind CSS  
**Storage**: Supabase (PostgreSQL) for posts; Supabase Storage for images  
**Testing**: Vitest or Jest, React Testing Library; E2E optional (Playwright)  
**Target Platform**: Web (Cloudflare Pages / Workers)  
**Project Type**: web (single Next.js app: public + admin routes)  
**Performance Goals**: 公開一覧・詳細の表示は一般的な Web 体感速度（LCP 等）。管理操作は 5 分以内に完了可能な UX。  
**Constraints**: Edge では fs 書き込み不可。永続化は Supabase のみ。XSS 対策必須。  
**Scale/Scope**: 小規模ブログ（講義・個人運用）。同時接続・記事数は標準的範囲で十分。

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
| --------- | ----- | ------ |
| I. デプロイ・ランタイムの一貫性 | 永続化に Supabase（DB + Storage）を使用し、fs 書き込み・SQLite を使わない | ✅ 計画で Supabase に統一 |
| II. データとストレージの単一化 | posts は DB、画像は Storage → URL を DB に保存。`public/` 書き込み禁止 | ✅ データモデル・契約で反映 |
| III. セキュリティの最優先 | `/admin` は middleware + 署名付き Cookie。XSS 対策。環境変数はクライアント/サーバー分離 | ✅ 認証・契約で反映 |
| IV. 公開と管理の分離 | 公開は `published` のみ取得。管理は全件取得。責務を混在させない | ✅ データモデル・契約で反映 |
| V. シンプルさと講義適合 | 簡易パスワード + 署名 Cookie。開発プラン・フェーズ順。YAGNI | ✅ 計画でフェーズ順 |

*Post–Phase 1*: データモデル・契約で上記を満たしていることを確認済み。

## Project Structure

### Documentation (this feature)

```text
specs/001-blog-baseline/
├── plan.md              # This file
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/           # Phase 1 (API / Route contracts)
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 (/speckit.tasks - not created by plan)
```

### Source Code (repository root)

```text
app/
├── page.tsx                 # 公開トップ（記事一覧）
├── layout.tsx
├── posts/
│   └── [slug]/
│       └── page.tsx         # 記事詳細
├── admin/
│   ├── layout.tsx          # 管理レイアウト（認証チェック連携）
│   ├── page.tsx            # 管理トップ（記事一覧）
│   ├── login/
│   │   └── page.tsx        # ログイン
│   ├── new/
│   │   └── page.tsx        # 新規投稿
│   └── [id]/
│       └── edit/
│           └── page.tsx    # 編集
├── api/                    # Route Handlers（認証・画像アップロード・投稿 CRUD のサーバー側）
│   └── ...
lib/
├── supabase/               # Supabase クライアント・サーバー用
├── auth/                   # 署名 Cookie・セッション検証
└── ...
components/
public/                     # 静的アセットのみ（書き込みしない）
middleware.ts               # /admin 保護
```

**Structure Decision**: Next.js App Router の単一アプリ。公開 (`/`, `/posts/[slug]`) と管理 (`/admin/*`) をルートで分離。API は `app/api/` の Route Handlers で実装。Constitution に従い DB は Supabase、画像は Storage、認証は署名付き Cookie + middleware。

## Complexity Tracking

*No violations. This section is empty.*
