FROM node:20-alpine3.19
ARG API_WORKDIR
WORKDIR ${API_WORKDIR}
ENV TZ Asia/Tokyo
RUN apk update
RUN apk upgrade
RUN apk add git vim
RUN yarn global add @nestjs/cli