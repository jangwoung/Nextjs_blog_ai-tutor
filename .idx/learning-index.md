# Learning Index — Next.js ブログ チュートリアル

エージェントが「今どのフェーズまで完了しているか」を判定するための索引です。プロジェクトのファイル・コードを読んで、下記の Checkpoints を満たしているか確認してください。

**参照**: 学習の流れは `docs/development-plan.md`、仕様は `specs/001-blog-baseline/` にあります。

---

## 使い方

1. **Phase 0 から Phase 5 の順** に、各フェーズの Checkpoints を上から順に確認する。
2. **ある Phase の全 Checkpoint を満たした** 最初の Phase を「完了している最大のフェーズ」とする。
3. それより前の Phase が一つでも未完了なら、**完了している最大のフェーズ** はその前の Phase とする（例: Phase 2 は全部満たすが Phase 1 が未満 → 完了は Phase 1 まで）。
4. 判定結果を **lastCompletedPhase**（0〜5）として保持し、次の課題は **lastCompletedPhase + 1** のフェーズから出す。

---

## Progress Analysis Checkpoints

### Phase 0: 環境準備

| ID | 確認内容 | 判定の目安 |
| -- | -------- | ---------- |
| 0a | Next.js プロジェクトが存在する | `package.json` に `next` が含まれる |
| 0b | TypeScript が有効 | `tsconfig.json` が存在する |
| 0c | Tailwind が導入されている | `tailwind.config.*` または `postcss.config.*` が存在し、`package.json` に `tailwindcss` がある |
| 0d | Supabase クライアントが導入されている | `package.json` に `@supabase/supabase-js` がある |
| 0e | 環境変数の例がある | `.env.example` が存在し、`NEXT_PUBLIC_SUPABASE_URL` や `ADMIN_PASSWORD` 等が記載されている |
| 0f | App Router のルートがある | `app/layout.tsx` および `app/page.tsx` が存在する |

**説明**: 起動できる Next.js アプリと Supabase・Tailwind・環境変数方針が揃っている。

---

### Phase 1: 公開ブログ（閲覧側）

| ID | 確認内容 | 判定の目安 |
| -- | -------- | ---------- |
| 1a | 記事の型または取得が存在する | `lib/` や `app/` に Post 型定義または Supabase から取得するコードがある |
| 1b | トップページで一覧を表示している | `app/page.tsx` が公開済み記事（`published === true` 相当）を取得し、一覧表示している |
| 1c | 記事詳細ページがある | `app/posts/[slug]/page.tsx` が存在し、slug で 1 件取得して表示している |
| 1d | 詳細でトップ画像 1 枚と本文を表示している | 詳細ページで `image_url` と body（Markdown）を表示している |
| 1e | Markdown をレンダリングしている | `react-markdown` 等で本文を表示している（生の HTML をそのまま出していない） |

**説明**: 公開サイトで一覧・詳細が表示され、Markdown 表示と XSS を考慮した実装になっている。

---

### Phase 2: 管理者画面の基盤

| ID | 確認内容 | 判定の目安 |
| -- | -------- | ---------- |
| 2a | 管理用ルートがある | `app/admin/` 配下に `layout.tsx` または `page.tsx` がある |
| 2b | ログイン画面がある | `app/admin/login/` にログインフォーム（パスワード送信）がある |
| 2c | 認証が Cookie 等で保持されている | ログイン成功後に Cookie をセットする、または署名付きセッションを扱うコードがある |
| 2d | middleware で /admin を保護している | `middleware.ts` が存在し、`/admin` へのアクセスを認証で制御している |
| 2e | 管理画面のレイアウトがある | 記事一覧や新規投稿への導線（リンクやタブ）が admin 配下にある |

**説明**: `/admin` にログインして入れること、未認証は弾かれること。

---

### Phase 3: 記事の投稿・編集機能

| ID | 確認内容 | 判定の目安 |
| -- | -------- | ---------- |
| 3a | 新規投稿画面がある | `app/admin/new/` にタイトル・本文・画像入力と保存処理がある |
| 3b | 画像を Supabase Storage にアップロードしている | API Route または Server Action で Storage にアップロードし、URL を返している |
| 3c | 記事を Supabase の posts に保存している | create/update が Supabase の posts テーブルに対して行われている（ファイル書き込みではない） |
| 3d | 管理用記事一覧がある | 全記事（下書き・公開両方）を一覧表示している |
| 3e | 編集・削除ができる | 編集ページ（例: `app/admin/[id]/edit/`）と削除処理がある |

**説明**: 管理画面から記事の作成・編集・削除・画像紐付けができる。

---

### Phase 4: 公開状態・下書き

| ID | 確認内容 | 判定の目安 |
| -- | -------- | ---------- |
| 4a | posts に published がある | データ取得や型に `published`（boolean 等）が含まれる |
| 4b | 公開サイトは published のみ表示 | 一覧・詳細の取得で `published === true`（または同等）でフィルタしている |
| 4c | 管理一覧は全件表示 | 管理用の一覧で `published` でフィルタせず全件取得している |
| 4d | 下書き/公開を切り替えられる | 管理画面で公開状態を変更できる UI または API がある |

**説明**: 下書きと公開が分離し、公開サイトには公開済みだけ表示される。

---

### Phase 5: 仕上げ・運用

| ID | 確認内容 | 判定の目安 |
| -- | -------- | ---------- |
| 5a | フォームのバリデーションがある | 投稿フォームで必須や形式のチェックをしている |
| 5b | エラー表示がある | API やフォームのエラーをユーザーに伝えている |
| 5c | 環境変数・README に説明がある | README または .env.example に起動方法や変数の説明がある |
| 5d | セキュリティの考慮がある | XSS（Markdown の安全な表示）、管理者保護、環境変数の扱いのいずれかがコードやコメントで分かる |

**説明**: 運用を意識したバリデーション・エラー・ドキュメント・セキュリティが揃っている。

---

## フェーズ一覧（TOC 用）

- **Phase 0**: 環境準備  
- **Phase 1**: 公開ブログ（閲覧側）  
- **Phase 2**: 管理者画面の基盤  
- **Phase 3**: 記事の投稿・編集機能  
- **Phase 4**: 公開状態・下書き  
- **Phase 5**: 仕上げ・運用  

現在の課題位置を表示するときは、例: `Phase 2: 管理者画面の基盤 📍（現在の課題）` のようにマークする。
