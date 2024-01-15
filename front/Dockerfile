FROM node:21-alpine3.19
ARG FRONT_WORKDIR
WORKDIR ${FRONT_WORKDIR}
ENV TZ Asia/Tokyo
RUN apk update
RUN apk upgrade
RUN apk add git vim
