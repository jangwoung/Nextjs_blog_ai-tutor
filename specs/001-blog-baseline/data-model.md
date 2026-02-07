# Data Model: ブログ ベースライン

**Branch**: 001-blog-baseline  
**Date**: 2026-02-04

## 1. Post（記事）

記事を表すエンティティ。Supabase の `posts` テーブルにマッピングする。

| 属性 | 型 | 必須 | 説明 |
| ---- | -- | ---- | ---- |
| id | UUID | ✓ | 主キー。Supabase の default gen_random_uuid() 等で生成 |
| title | text | ✓ | タイトル |
| body | text | ✓ | 本文（Markdown 文字列） |
| slug | text | ✓ | URL 用の一意な識別子。一覧・詳細の取得で使用 |
| image_url | text | - | トップ用画像の URL（Supabase Storage の public URL） |
| published | boolean | ✓ | 公開済みなら true、下書きなら false。default false 推奨 |
| published_at | timestamptz | - | 公開日時。published が true になった時点を記録 |
| created_at | timestamptz | ✓ | 作成日時 |
| updated_at | timestamptz | ✓ | 更新日時 |

### バリデーション

- `title`: 空でない。長さ上限は実装で定義（例: 200 文字）。
- `body`: 空でない。
- `slug`: 空でない。一意制約。URL 安全な文字のみ（英数字・ハイフン等）。
- `image_url`: 存在する場合、有効な URL 形式。Storage の URL であること。

### 状態

- **下書き (draft)**: `published = false`。公開サイトの一覧・詳細には出現しない。
- **公開 (published)**: `published = true`。公開サイトで表示可能。`published_at` を設定する。

### 取得方針（Constitution IV）

- **公開用**: `published = true` かつ必要な列のみ。一覧は `created_at` または `published_at` の降順。
- **管理用**: `published` の条件なしで全件。一覧は `updated_at` 降順等でよい。

---

## 2. Session / 認証状態

管理者がログイン済みかどうかは、サーバーで検証可能な署名付き Cookie で表現する。DB にセッションテーブルは持たず、Cookie の署名検証のみで「ログイン済み」を判定する。

- **Cookie 名**: 実装で定義（例: `admin_session`）。
- **内容**: 署名付きのペイロード（例: ユーザー識別子や有効期限）。秘密鍵は環境変数で保持し、サーバー専用。
- **検証**: middleware および管理 API 内で、Cookie の存在・署名・有効期限をチェックする。

---

## 3. 画像ストレージ（Supabase Storage）

- **バケット**: 1 つ（例: `images`）。公開読み取り可、アップロードはサーバー側のみ（Service Role 等）。
- **保存**: アップロード時に一意なパス（例: `posts/{postId}/{filename}` または UUID）を生成し、Storage に保存。取得した public URL を `posts.image_url` に保存する。
- **制約**: ファイル形式・サイズの制限を API で実施する（仕様のエッジケースに合わせる）。
