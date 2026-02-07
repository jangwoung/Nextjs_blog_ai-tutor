# API / Route Contracts: ブログ ベースライン

**Branch**: 001-blog-baseline  
**Date**: 2026-02-04

Next.js App Router における Route Handlers（`app/api/...`）および Server Components / Server Actions の「論理的な契約」を定義する。実装は Next.js の規約に従う。

---

## 公開サイト（認証不要）

### 1. 記事一覧の取得

- **用途**: トップページで公開済み記事の一覧を表示する。
- **データ**: `posts` から `published = true` のレコードを取得。列: id, title, slug, image_url, published_at, body の先頭 N 文字（抜粋）。並び順: published_at または created_at 降順。
- **実装方針**: Server Component で Supabase から直接取得するか、GET API を用意する。公開用のため認証は不要。

### 2. 記事詳細の取得（by slug）

- **用途**: `/posts/[slug]` で 1 件表示する。
- **入力**: path パラメータ `slug`。
- **データ**: `published = true` かつ `slug = :slug` の 1 件。存在しなければ 404。
- **実装方針**: Server Component で Supabase から取得。404 の場合は notFound()。

---

## 管理画面（認証必須）

認証は middleware で `/admin` 配下へのアクセスを保護し、有効な署名付き Cookie がある場合のみ通過させる。以下は「認証済み」を前提とした契約。

### 3. ログイン

- **用途**: 管理者がパスワードを送信し、正しければ署名付き Cookie を付与する。
- **入力**: POST body。パスワード（フィールド名は実装で定義、例: `password`）。
- **成功**: 200 または 302。Set-Cookie で署名付きセッション Cookie を設定。リダイレクト先は `/admin` 等。
- **失敗**: 401 または 200 でエラーメッセージ。Cookie は付与しない。

### 4. ログアウト

- **用途**: セッション Cookie を無効化する。
- **実装**: Cookie を削除するレスポンスを返す。POST または GET どちらでも可。

### 5. 管理用記事一覧の取得

- **用途**: 管理画面の記事一覧。下書き・公開を問わず全件。
- **データ**: `posts` の全件。列: id, title, slug, image_url, published, published_at, created_at, updated_at。並び: updated_at 降順等。
- **認証**: 必須。未認証なら 401 またはログイン画面へリダイレクト。

### 6. 記事の作成（新規投稿）

- **用途**: 新規記事を 1 件作成する。
- **入力**: POST body。title, body, slug, image_url（任意）, published（boolean）。
- **成功**: 201。作成された Post の id 等を返す。または 302 で編集ページへ。
- **失敗**: 400（バリデーションエラー）。409（slug 重複）等。
- **認証**: 必須。

### 7. 記事の更新（編集）

- **用途**: 既存記事を更新する。
- **入力**: path に id（または slug）。body: title, body, slug, image_url, published。
- **成功**: 200 または 302。
- **失敗**: 400, 404。
- **認証**: 必須。

### 8. 記事の削除

- **用途**: 既存記事を 1 件削除する。
- **入力**: path に id（または slug）。DELETE または POST で delete アクション。
- **成功**: 200 または 204。または 302 で一覧へ。
- **失敗**: 404。
- **認証**: 必須。

### 9. 画像アップロード

- **用途**: トップ用画像を Supabase Storage にアップロードし、公開 URL を返す。
- **入力**: multipart/form-data でファイル 1 つ。または base64 等（実装で決定）。
- **成功**: 200。body に `{ "url": "https://..." }` のような JSON。クライアントはこの URL を記事の image_url に設定する。
- **失敗**: 400（形式・サイズ制限違反）、413（サイズ超過）等。
- **認証**: 必須。管理画面からのみ呼び出す想定。

---

## 契約の実装場所（目安）

| 契約 | 実装の目安 |
| ---- | ---------- |
| 1, 2 | Server Component 内で Supabase 呼び出し、または GET Route Handler |
| 3 | POST `/api/admin/login` 等の Route Handler |
| 4 | POST `/api/admin/logout` 等 |
| 5 | Server Component または GET Route Handler（認証は middleware で担保） |
| 6 | POST Route Handler または Server Action |
| 7 | PATCH/PUT Route Handler または Server Action |
| 8 | DELETE Route Handler または Server Action |
| 9 | POST `/api/admin/upload` 等の Route Handler |
