# Quickstart: ブログ ベースライン

**Branch**: 001-blog-baseline  
**Date**: 2026-02-04

実装を開始する前に、以下を用意する。

## 前提条件

- Node.js 20+
- Supabase アカウント
- リポジトリのルートで作業する

## 1. 環境変数

リポジトリルートに `.env.local` を用意する（`.env.example` をコピーして編集）。

```bash
# Supabase（Constitution: データ・画像は Supabase）
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>

# サーバー専用（クライアントに露出しない）
SUPABASE_SERVICE_ROLE_KEY=<service role key>

# 管理者認証（Constitution: 簡易パスワード + 署名 Cookie）
ADMIN_PASSWORD=<任意の強力なパスワード>
SESSION_SECRET=<署名用のランダム文字列、32 文字以上推奨>
```

- `NEXT_PUBLIC_*`: クライアントに露出するため、秘密情報を入れない。
- `ADMIN_PASSWORD`, `SESSION_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`: サーバー専用。絶対にクライアントに渡さない。

## 2. Supabase の準備

1. Supabase プロジェクトを作成する。
2. **Table Editor** で `posts` テーブルを作成する。列は [data-model.md](./data-model.md) に従う（id, title, body, slug, image_url, published, published_at, created_at, updated_at）。slug に unique 制約を付与する。
3. **Storage** でバケットを 1 つ作成する（例: `images`）。公開読み取り可、アップロードは認証済みまたは Service Role に限定する。
4. RLS（Row Level Security）が必要なら、公開用は `published = true` の読み取りのみ許可、管理用は Service Role または認証済みロールで CRUD を許可するポリシーを検討する。

## 3. プロジェクトのセットアップ

```bash
# 依存関係のインストール（Next.js, Supabase, Tailwind 等は package.json に追加済みと仮定）
npm install

# 開発サーバー起動
npm run dev
```

- 公開サイト: `http://localhost:3000/`
- 管理画面: `http://localhost:3000/admin`（未ログイン時はログイン画面へ）

## 4. 実装の順序（開発プランとの対応）

1. **フェーズ 0**: Next.js プロジェクト作成、Tailwind、Supabase クライアント、環境変数。`posts` テーブル・Storage バケットの準備。
2. **フェーズ 1**: 公開用の一覧・詳細（Server Component + Supabase）。Markdown レンダリングと XSS 対策。
3. **フェーズ 2**: `/admin` のルート、ログイン（署名付き Cookie）、middleware で保護。
4. **フェーズ 3**: 管理用の記事 CRUD、画像アップロード（Storage）、下書き/公開の切り替え。
5. **フェーズ 4**: 公開側は `published = true` のみ表示することを再確認。管理側は全件表示。
6. **フェーズ 5**: バリデーション、エラーハンドリング、セキュリティ確認、README 更新。

詳細は [docs/development-plan.md](../../../docs/development-plan.md) および [plan.md](./plan.md) を参照。

## 5. 検証

- 公開トップで公開済み記事が一覧表示されること。
- 記事詳細でトップ画像 1 枚と本文が表示されること。
- `/admin` に未ログインでアクセスするとログイン画面になること。
- ログイン後、記事の新規作成・編集・削除・公開/下書き切り替えができること。
- 画像アップロード後、記事に URL が紐づき、詳細で表示されること。
