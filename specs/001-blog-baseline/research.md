# Research: ブログ ベースライン (Phase 0)

**Branch**: 001-blog-baseline  
**Date**: 2026-02-04

## 1. データ・永続化

**Decision**: 記事データは Supabase（PostgreSQL）に保存する。画像は Supabase Storage にアップロードし、取得した URL を posts テーブルに保存する。

**Rationale**: 本プロジェクトは Cloudflare（Pages / Workers）へのデプロイを前提とする。Edge ではサーバー側の `fs` 書き込みができず、永続化されない。ローカルファイルや SQLite は Cloudflare 上で永続化・同時更新が破綻しやすい。Supabase は HTTP 経由で利用可能であり、Cloudflare と相性が良い。

**Alternatives considered**: ファイル（Markdown + JSON）や SQLite + Prisma は、Vercel / Node ランタイムなら利用可能だが、Cloudflare 前提のため不採用。D1/KV は Supabase ほどスキーマ・ストレージの一体運用がしやすくないため、講義・ベースラインでは Supabase に統一。

---

## 2. 認証方式

**Decision**: 管理者認証は「簡易パスワード（環境変数）+ 署名付き Cookie」で実装する。ログイン済みを Cookie で表現し、middleware で `/admin` を保護する。

**Rationale**: Constitution および開発プランで「初版は簡易パスワード + 署名付き Cookie」と定めている。管理 API を叩けるのはサーバー側のみにし、ただの「パスワード一致で画面を出す」ではなく、セッションを署名付き Cookie で保持することで、再読み込み・直リンクでも一貫した保護ができる。

**Alternatives considered**: NextAuth（Auth.js）は Cloudflare では Edge 対応・アダプタの考慮が必要であり、ベースラインでは発展課題とする。

---

## 3. 本文の表示と XSS 対策

**Decision**: 記事本文は Markdown を DB に文字列で保存し、表示時にサニタイズされたレンダリングを行う。`react-markdown` を使う場合、`rehype-raw` は安易に有効にしない（講義では OFF 推奨）。

**Rationale**: FR-008 で「記事本文の表示時に危険なコンテンツを無害化」が必須。生の HTML を通すと XSS のリスクが高いため、Markdown から安全な HTML への変換に留める。

**Alternatives considered**: リッチテキスト（WYSIWYG）や `rehype-raw` で任意 HTML を許可する案は、XSS 対策の負荷が高く、ベースラインでは採用しない。

---

## 4. デプロイ・ランタイム

**Decision**: 本番デプロイ先は Cloudflare（Pages / Workers）を想定する。Next.js は Cloudflare 向けのビルド・アダプタを利用する。

**Rationale**: Constitution で Cloudflare 前提としている。Edge の制約（fs 不可、永続化は外部サービス）を満たす設計とする。

**Alternatives considered**: Vercel や Node サーバーでは fs や SQLite も選択肢になるが、講義の前提に合わせて Cloudflare + Supabase に統一する。
