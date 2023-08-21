# BUILD PART
FROM node:16.20-slim as build-stage

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock /app/

# Sed path to script
#RUN sed -i 's/scripts\/add-remotes.sh/\/scripts\/add-remotes.sh/g' /app/package.json

COPY ./ /app/

RUN yarn install

RUN yarn build

# Stage nginx
FROM alpine:3.18

ENV NGINX_VERSION nginx-1.22.1

RUN apk --update add openssl-dev pcre-dev zlib-dev wget build-base \
    libxml2-dev libxslt-dev gd-dev perl-dev && \
    mkdir -p /tmp/nginx && chmod 777 /tmp/nginx && \
    mkdir -p /tmp/src && \
    cd /tmp/src && \
    wget http://nginx.org/download/${NGINX_VERSION}.tar.gz && \
    tar -zxvf ${NGINX_VERSION}.tar.gz && \
    cd /tmp/src/${NGINX_VERSION} && \
    ./configure \
        --with-http_ssl_module \
        --with-http_gzip_static_module \
        --with-http_image_filter_module \
        --with-http_perl_module \
        --with-http_xslt_module \
        --with-mail \
        --with-stream \
        --prefix=/tmp/nginx \
        --http-log-path=/var/log/nginx/access.log \
        --error-log-path=/var/log/nginx/error.log \
        --sbin-path=/usr/local/sbin/nginx && \
    make && \
    make install && \
    apk del build-base && \
    rm -rf /tmp/src && \
    rm -rf /var/cache/apk/*

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

VOLUME ["/var/log/nginx"]

WORKDIR /tmp/nginx

# Copy builded source
COPY --from=build-stage /app/dist/ /usr/share/nginx/html

RUN chmod -R 777 /usr/share/nginx/html

# Copy nginx configuration
COPY nginx_conf/default.conf /tmp/nginx/conf.d/default.conf
COPY nginx_conf/nginx.conf /tmp/nginx/conf/nginx.conf

RUN chown -R nobody /tmp/nginx

EXPOSE 1080

CMD ["nginx", "-g", "daemon off;"]

