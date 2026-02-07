# コンテキストの作成 — チュートリアルエージェントの有効化

Firestudio（.idx）や Cursor など、エージェントで「ステップごとのチェックと学習サポート」を動かすためのコンテキストの作り方です。

---

## 1. 用意されているファイル

| ファイル | 役割 |
| -------- | ---- |
| **docs/blog-tutor-rules.md** | チュートリアルエージェントの振る舞いルール（概念→例→課題→支援、スキップ/ジャンプ、進捗判定の考え方など） |
| **.idx/learning-index.md** | 進捗判定用の索引。Phase 0〜5 ごとの「チェック項目」と、どのファイル・コードを見ればよいか |
| **docs/learner-guide.md** | 学習者向け「進め方」。セッションの始め方、言い回し、スキップ・ジャンプの使い方 |
| **docs/development-plan.md** | 講義の元になる開発プラン（フェーズ内容・成果物） |
| **specs/001-blog-baseline/** | 仕様・計画・データモデル・API 契約。エージェントが課題の整合性を取るために参照 |

---

## 2. Cursor で使う

1. **ルールとして読み込ませる**  
   - Cursor の Rules（.cursor/rules またはプロジェクトルール）に、**docs/blog-tutor-rules.md** の内容を含めるか、  
     「Next.js ブログチュートリアルを行うときは `docs/blog-tutor-rules.md` に従う」と書く。
   - 新しいルールファイルを作る例: `.cursor/rules/blog-tutor.md` に「See docs/blog-tutor-rules.md」と書き、必要なら要約を貼る。
2. **進捗判定の参照先**  
   - エージェントに「進捗は `.idx/learning-index.md` の Checkpoints で判定する」と伝わるように、  
     **blog-tutor-rules.md** やルール内に「.idx/learning-index.md を参照する」と書いておく（すでに blog-tutor-rules.md に記載済み）。
3. **学習者**  
   - 「ブログチュートリアルを始めたい」とチャットで伝えれば、ルールに従ってオンboarding（プロジェクト解析 → 現在フェーズの提示）が動く想定。

※ .cursor を .gitignore に入れている場合は、ルールの追加はローカルのみ。他メンバーには「docs/blog-tutor-rules.md を Cursor のルールで読ませる」と案内すればよい。

---

## 3. Firestudio（.idx のイメージ）で使う

- Firestudio の `.idx` は主に **dev.nix** で環境を定義しますが、**「プロジェクトの文脈・進捗の索引」** として同じ .idx フォルダに **learning-index.md** を置いています。
- **コンテキストの作成**  
  - `.idx/learning-index.md` をリポジトリに含めておく。  
  - AI エージェントに「このプロジェクトでは ` .idx/learning-index.md` を見て、Next.js ブログチュートリアルの進捗（Phase 0〜5）を判定する」と伝えられるように、  
    プロジェクトの説明やエージェント用の指示にその旨を書く。
- **振る舞いの統一**  
  - Firestudio のエージェントのプロンプトやルールに、**docs/blog-tutor-rules.md** の要約またはパスを渡す。  
    「Next.js ブログ講義モードのときは docs/blog-tutor-rules.md に従う」と書いておけば、Cursor と同様のサイクル（概念→例→課題→支援）とチェックが再現しやすい。

---

## 4. その他のエージェントで使う

- **コンテキストの作成**  
  1. **進捗の索引**: エージェントが読める場所に **.idx/learning-index.md** を置く（または **docs/learning-index.md** にコピーして参照する）。  
  2. **振る舞いルール**: エージェントの「ルール」「システムプロンプト」「カスタム指示」に **docs/blog-tutor-rules.md** の内容（または要約）を含める。  
  3. **参照ドキュメント**: 必要に応じて **docs/development-plan.md** と **specs/001-blog-baseline/** を「参照してよいドキュメント」として指定する。
- **学習者の実施方法**  
  - **docs/learner-guide.md** を共有し、「始め方・言い回し・スキップ・ジャンプ」を案内する。

---

## 5. まとめ

- **コンテキスト作成**:  
  - 進捗用に **.idx/learning-index.md**（または docs/learning-index.md）を置く。  
  - エージェントのルールに **docs/blog-tutor-rules.md** を反映する。  
  - 必要なら development-plan と specs を参照指定する。
- **学習者の実施方法**:  
  - **docs/learner-guide.md** のとおりに、セッションの始め方・課題の進め方・「今どこ？」「スキップ」「ジャンプ」の言い回しを使う。

これで、今回のプランに沿った「ステップごとのチェックと学習サポート」が、Firestudio の .idx のようにコンテキストを一箇所にまとめて、複数エージェントで再現しやすくなります。
