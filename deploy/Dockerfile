ARG BASE_IMAGE=nginx:1.27.0
FROM ${BASE_IMAGE}

RUN rm -rf /usr/share/nginx/html/*
COPY deploy/ai-stack-nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/
