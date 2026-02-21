# Firebase Studio 用ワークスペース設定
# インポート時に npm install を実行し、プレビューで Next.js 開発サーバーを起動する

{ pkgs, ... }: {

  channel = "stable-23.11";

  packages = [
    pkgs.nodejs_20
  ];

  # ワークスペース初回作成・オープン時に実行（npm install で node_modules を用意）
  idx.workspace.onCreate = {
    npm-install = "npm install";
  };

  # Web プレビューの設定
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}
