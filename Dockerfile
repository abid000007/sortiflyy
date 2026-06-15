# Multi-stage Dockerfile for Vite + React
# 1) Build stage: use official Node image to install deps and build the app
# 2) Production stage: serve the built static files with lightweight nginx

### Stage 1: build
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN apk add --no-cache git python3 make g++ || true
RUN npm ci --legacy-peer-deps --silent

# Copy source and build
COPY . .
RUN npm run build

### Stage 2: production image
FROM nginx:stable-alpine AS production

# certbot (+ openssl) for issuing/renewing the Let's Encrypt cert at runtime
RUN apk add --no-cache certbot openssl

COPY --from=build /app/dist /usr/share/nginx/html

# HTTP server (ACME challenge + HTTPS redirect) is active immediately.
COPY nginx.conf /etc/nginx/conf.d/default.conf
# HTTPS server block; enabled by the entrypoint once a cert exists.
COPY nginx-ssl.conf /etc/nginx/nginx-ssl.conf

COPY docker-entrypoint.sh /docker-entrypoint-certbot.sh
RUN chmod +x /docker-entrypoint-certbot.sh

# Persist issued certificates and the ACME webroot across container restarts.
VOLUME ["/etc/letsencrypt", "/var/www/certbot"]

EXPOSE 80 443
ENTRYPOINT ["/docker-entrypoint-certbot.sh"]
