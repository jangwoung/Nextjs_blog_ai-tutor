export default function Home() {
  const phases = [
    {
      phase: 0,
      title: "環境準備",
      summary: "Next.js プロジェクト作成、Tailwind・Supabase・環境変数、Cloudflare の制約把握",
      deliverable: "起動できる Next.js アプリ、Supabase プロジェクトの準備",
    },
    {
      phase: 1,
      title: "公開ブログ（閲覧側）",
      summary: "記事型・Supabase 取得、一覧・詳細ページ、Markdown 表示、XSS 対策",
      deliverable: "一覧・詳細が表示できる公開サイト",
    },
    {
      phase: 2,
      title: "管理者画面の基盤",
      summary: "/admin ルート、ログイン（署名付き Cookie）、middleware で保護",
      deliverable: "/admin にログインできる管理画面の土台",
    },
    {
      phase: 3,
      title: "記事の投稿・編集機能",
      summary: "新規投稿・編集・削除、画像アップロード（Supabase Storage）、posts テーブル",
      deliverable: "管理画面から記事の CRUD ができる状態",
    },
    {
      phase: 4,
      title: "公開状態・下書き",
      summary: "published の区別、公開は公開済みのみ・管理は全件表示",
      deliverable: "下書きと公開の切り替えができる状態",
    },
    {
      phase: 5,
      title: "仕上げ・運用",
      summary: "バリデーション、セキュリティ確認（XSS・環境変数）、テスト、README",
      deliverable: "そのままデプロイ・運用できる状態",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Next.js ブログ 学習プラン
        </h1>
        <p className="mt-2 text-gray-600">
          Supabase + Cloudflare を前提に、フェーズ順でブログを組み上げます。
        </p>

        <ul className="mt-8 space-y-6">
          {phases.map(({ phase, title, summary, deliverable }) => (
            <li
              key={phase}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-indigo-600">
                  Phase {phase}
                </span>
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              </div>
              <p className="mt-2 text-sm text-gray-600">{summary}</p>
              <p className="mt-2 text-xs text-gray-500">
                成果物: {deliverable}
              </p>
            </li>
          ))}
        </ul>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900">
            フォルダ構成と役割
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Next.js App Router の単一アプリ。公開サイトと管理画面をルートで分離しています。
          </p>
          <div className="mt-4 rounded-lg border border-gray-200 bg-white p-5 font-mono text-sm">
            <ul className="space-y-2 text-gray-700">
              <li>
                <span className="font-semibold text-gray-900">app/</span>
                <span className="ml-2 text-gray-600">— ページ・レイアウト・API（ルートに応じた役割）</span>
              </li>
              <li className="ml-2">
                <span className="text-gray-500">page.tsx, layout.tsx</span>
                <span className="ml-2 text-gray-600">— 公開トップ・共通レイアウト</span>
              </li>
              <li className="ml-2">
                <span className="text-gray-500">posts/[slug]/</span>
                <span className="ml-2 text-gray-600">— 記事詳細ページ</span>
              </li>
              <li className="ml-2">
                <span className="text-gray-500">admin/</span>
                <span className="ml-2 text-gray-600">— 管理画面（一覧・ログイン・新規・編集）</span>
              </li>
              <li className="ml-2">
                <span className="text-gray-500">api/</span>
                <span className="ml-2 text-gray-600">— Route Handlers（認証・画像アップロード・投稿 CRUD）</span>
              </li>
              <li>
                <span className="font-semibold text-gray-900">lib/</span>
                <span className="ml-2 text-gray-600">— 共有ロジック</span>
              </li>
              <li className="ml-2">
                <span className="text-gray-500">supabase/</span>
                <span className="ml-2 text-gray-600">— Supabase クライアント（ブラウザ・サーバー用）</span>
              </li>
              <li className="ml-2">
                <span className="text-gray-500">auth/</span>
                <span className="ml-2 text-gray-600">— 署名付き Cookie・セッション検証</span>
              </li>
              <li>
                <span className="font-semibold text-gray-900">components/</span>
                <span className="ml-2 text-gray-600">— 再利用する UI コンポーネント</span>
              </li>
              <li>
                <span className="font-semibold text-gray-900">public/</span>
                <span className="ml-2 text-gray-600">— 静的アセットのみ（サーバーからの書き込みはしない）</span>
              </li>
              <li>
                <span className="font-semibold text-gray-900">middleware.ts</span>
                <span className="ml-2 text-gray-600">— /admin の保護（未認証はログインへ）</span>
              </li>
            </ul>
          </div>
        </section>

        <p className="mt-8 text-center text-sm text-gray-500">
          詳細は <code className="rounded bg-gray-200 px-1">docs/development-plan.md</code> を参照
        </p>
      </div>
    </main>
  );
}
