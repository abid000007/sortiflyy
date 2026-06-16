# Multi-stage Dockerfile for Vite + React
# 1) Build stage: use official Node image to install deps and build the app
# 2) Production stage: serve the built static files with lightweight nginx

### Stage 1: build
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN apk add --no-cache git python3 make g++ || true
RUN npm i --legacy-peer-deps --silent

# Web3Forms access key is baked into the bundle at build time (Vite inlines
# VITE_* vars). Passed via build arg since .env is excluded from the context.
ARG VITE_WEB3FORMS_KEY="7d57055e-3584-4b94-a0a5-f9d7977d99bc"
ENV VITE_WEB3FORMS_KEY=7d57055e-3584-4b94-a0a5-f9d7977d99bc
COPY . .
RUN npm run build

### Stage 2: production image
FROM nginx:stable-alpine AS production

# certbot + openssl (cert issuance/renewal & self-signed bootstrap),
# gettext provides envsubst used to render the HTTPS config at runtime.
RUN apk add --no-cache certbot openssl gettext

COPY --from=build /app/dist /usr/share/nginx/html

# HTTP server (ACME challenge + HTTPS redirect) is active immediately.
COPY nginx.conf /etc/nginx/conf.d/default.conf
# HTTPS server template; rendered to conf.d/ssl.conf by the entrypoint.
COPY nginx-ssl.conf.template /etc/nginx/nginx-ssl.conf.template

COPY docker-entrypoint.sh /docker-entrypoint-certbot.sh
RUN chmod +x /docker-entrypoint-certbot.sh

# Persist issued certificates and the ACME webroot across container restarts.
VOLUME ["/etc/letsencrypt", "/var/www/certbot"]

EXPOSE 80 443
ENTRYPOINT ["/docker-entrypoint-certbot.sh"]