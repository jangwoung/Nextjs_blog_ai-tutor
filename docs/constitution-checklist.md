# /speckit.constitution で定義すべき内容

Constitution は「プロジェクトの不変の方針・原則」を決めるステップです。ここで定義した内容が、その後の spec / plan / tasks の前提になります。

---

## 1. テンプレートの構成（何を埋めるか）

`.specify/memory/constitution.md` には次のプレースホルダーがあります。

| 項目 | 説明 | ブログ向けの例 |
| ---- | ---- | ---------------- |
| `[PROJECT_NAME]` | プロジェクト名 | Next.js ブログ（AI-tutor） |
| `[PRINCIPLE_1_NAME]` ～ 5 | コア原則の名前 | 下記「2. コア原則」参照 |
| `[PRINCIPLE_*_DESCRIPTION]` | 各原則の内容 | 同上 |
| `[SECTION_2_NAME]` | 追加セクション名 | 技術制約 / セキュリティ要件 など |
| `[SECTION_2_CONTENT]` | その内容 | スタック・デプロイ・保存先 など |
| `[SECTION_3_NAME]` | もう一つのセクション | 開発フロー / 品質ゲート など |
| `[SECTION_3_CONTENT]` | その内容 | レビュー・テスト・デプロイ方針 |
| `[GOVERNANCE_RULES]` | ガバナンス | 改正手順・準拠確認のタイミング |
| `[CONSTITUTION_VERSION]` | バージョン | 1.0.0（セマンティック） |
| `[RATIFICATION_DATE]` | 採択日 | YYYY-MM-DD |
| `[LAST_AMENDED_DATE]` | 最終改正日 | YYYY-MM-DD |

原則は 5 本に限らず、プロジェクトに合わせて増減してよいです。

---

## 2. コア原則（ブログプロジェクト向けの例）

講義・Supabase/Cloudflare 前提のブログなら、次のような原則を定義すると開発プランと噛み合います。

### I. デプロイ・ランタイムの一貫性

- 本番は **Cloudflare（Pages / Workers）** を前提とする。
- Edge の制約（サーバー側の `fs` 書き込み不可）を満たす設計にする。
- 永続化は **Supabase（DB + Storage）** に統一し、ローカルファイル・SQLite に依存しない。

### II. データとストレージの単一化

- 記事データは **Supabase の posts テーブル** にのみ保存する。
- 画像は **Supabase Storage** にアップロードし、取得した URL を DB に保存する。
- `public/` へのサーバー側書き込みや、リポジトリ内ファイルによる記事管理は行わない。

### III. セキュリティの最優先

- 管理者ルート（`/admin`）は **middleware + 署名付き Cookie** で保護する。
- Markdown を HTML に変換する際は **XSS 対策** を必須とし、`rehype-raw` を安易に有効にしない。
- 環境変数は **`NEXT_PUBLIC_`（クライアント露出）とサーバー専用** を明確に分け、秘密はサーバー専用に限定する。

### IV. 公開と管理の分離

- **公開側**: `published === true` の記事のみ表示する。
- **管理側**: 下書き・公開を **全件** 表示し、編集・削除できるようにする。
- 取得 API と UI で「公開用」と「管理用」の責務を混在させない。

### V. シンプルさと講義適合

- まずは **簡易パスワード + 署名付き Cookie** で認証を実現する。NextAuth 等は発展課題とする。
- 機能は **開発プランのフェーズ順** に揃え、YAGNI を心がける。
- コードは読みやすく小さな単位にし、テスト可能に保つ。

---

## 3. 追加セクション（SECTION_2 / SECTION_3 の例）

### 技術制約・スタック（SECTION_2 の例）

- **FW**: Next.js 14+（App Router）、TypeScript、Tailwind CSS。
- **データ**: Supabase（DB）。画像: Supabase Storage。
- **認証**: 初版は簡易パスワード + 署名付き Cookie。発展で Auth.js を検討可。
- **本文**: Markdown を DB に文字列で保存し、`react-markdown` 等でレンダリングする。

### 開発フロー・品質（SECTION_3 の例）

- 実装は **開発プラン（docs/development-plan.md）のフェーズ順** に従う。
- 重要なフロー（一覧・詳細・投稿・編集）にはテストを書く。
- セキュリティ確認項目: 管理者保護、XSS、環境変数の扱い。CSRF は SameSite / POST のみでよい。

---

## 4. ガバナンス（GOVERNANCE_RULES の例）

- Constitution は他の開発ルールより優先する。矛盾する場合は Constitution に合わせる。
- 原則の追加・変更・削除は **文書化し、バージョンを上げる**（MAJOR: 原則の破壊的変更、MINOR: 原則追加、PATCH: 文言のみの修正）。
- PR やレビューでは、変更が Constitution に準拠しているかを確認する。

---

## 5. 実行時のポイント

- **ユーザー入力**: `/speckit.constitution` 実行時に「原則を 3 本にしたい」「認証は NextAuth にしたい」などがあれば、その旨を入力すると反映されやすい。
- **バージョン**: 初回は `1.0.0`、採択日は実行日。以後の改正で `LAST_AMENDED_DATE` とバージョンを更新。
- **一貫性**: コマンド説明にあるとおり、constitution 更新後は plan-template / spec-template / tasks-template や README との整合を確認する。

---

## 6. まとめ：定義すべき内容の一覧

| カテゴリ | 定義すべき内容 |
| -------- | ---------------- |
| **プロジェクト名** | 正式なプロジェクト名 |
| **コア原則** | デプロイ・データ・セキュリティ・公開/管理の分離・シンプルさ など 3～5 本 |
| **技術制約** | スタック（Next.js, Supabase, Cloudflare）、認証方針、本文形式 |
| **開発フロー** | フェーズ順の実装、テスト方針、セキュリティ確認の粒度 |
| **ガバナンス** | Constitution の優先順位、改正手順、バージョンルール、レビューでの準拠確認 |
| **メタ** | バージョン番号、採択日、最終改正日（ISO 日付） |

上記を埋めた constitution が、その後の **/speckit.specify → /speckit.plan → /speckit.tasks** の共通前提になります。
