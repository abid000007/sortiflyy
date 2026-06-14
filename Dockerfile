# Multi-stage Dockerfile for Vite + React
# 1) Build stage: use official Node image to install deps and build the app
# 2) Production stage: serve the built static files with lightweight nginx

### Stage 1: build
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
COPY pnpm-lock.yaml* ./
RUN apk add --no-cache git python3 make g++ || true
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build

### Stage 2: production image
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html

# Replace default nginx config with one suitable for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
