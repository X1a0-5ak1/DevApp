include .env

########################################### 共通コマンド ###########################################
#	環境の起動
up:
	docker-compose up

# 環境の動作終了
down:
	docker-compose down

# 環境の再起動
restart:
	@make down
	@make up

# dockerイメージの作成
build:
	docker-compose build --no-cache

########################################### frontに関するコマンド ###########################################
# frontコンテナにアクセス
front-exec:
	docker-compose exec front ash

# Reactプロジェクト新規作成
front-create-app:
	docker-compose exec front sh -c \
		"yarn create vite ${FRONT_PROJ_NAME} --template react-ts"

# front	イメージ削除
front-rmi:
	docker rmi $(shell basename `pwd` | tr 'A-Z' 'a-z')_front

# front volume削除
front-rmvol:
	docker volume rm $(shell basename `pwd` | tr 'A-Z' 'a-z')_front_store

########################################### apiに関するコマンド ###########################################
# apiコンテナ(NestJS)にアクセス
api-exec:
	docker-compose exec api ash

# NestJSプロジェクト新規作成
api-create-app:
	docker-compose exec api sh -c \
		"nest new ${API_PROJ_NAME} --package-manager yarn --skip-install --skip-git"

# api イメージ削除
api-rmi:
	docker rmi $(shell basename `pwd` | tr 'A-Z' 'a-z')_api

# api volume削除
api-rmvol:
	docker volume rm $(shell basename `pwd` | tr 'A-Z' 'a-z')_api_store

########################################### dbに関するコマンド ###########################################
# dbコンテナのpostgres環境にログイン。先頭に@を付けることでコマンドがターミナル上に表示されなくなる
db-login:
	@docker-compose exec db sh -c "psql -U ${DB_USER} -d ${DB_NAME}"

# dbコンテナにアクセス
db-exec:
	docker-compose exec db ash

# dbコンテナのvolume(データ保存場所)を削除
db-rmvol:
	docker volume rm $(shell basename `pwd` | tr 'A-Z' 'a-z')_db_store
