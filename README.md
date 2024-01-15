# 取扱説明書(開発者向け)
## 環境変数の設定方法
プロジェクトのルートディレクトリに.envファイルを作成し、下記の環境変数を設定してください。
- FRONT_PROJ_NAME=<frontのプロジェクト名>
- API_PROJ_NAME=<apiのプロジェクト名>
- DB_NAME=<dbで使用するデータベース名>
- DB_USER=<dbで使用するユーザー名>
- DB_PASS=<dbで使用するパスワード>

## makeコマンドを用いた諸々の操作方法
Makefile内コマンドを用いた諸々の操作方法は以下のとおりです。
- imageのビルド: make build
- 環境の起動: make up
- 環境のシャットダウン: make down
- 各種コンテナに入り作業をする: make front-exec / make api-exec / make db-exec
- dbコンテナに入りつつデータベースにログイン: make db-login
- front(React)のプロジェクト新規作成: make front-create-app
- api(NestJS)のプロジェクト新規作成: make api-create-app
- (注意)front, apiイメージを削除: make front-rmi / make api-rmi
- (注意)各種volume削除: make front-rmvol / make api-rmvol / make db-rmvol
