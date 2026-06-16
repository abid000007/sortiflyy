#!/bin/sh
# Entrypoint: make HTTPS work *immediately* with a self-signed certificate, then
# transparently upgrade to a real Let's Encrypt certificate via certbot when the
# domain is publicly reachable. nginx serves HTTP (and the ACME challenge) the
# whole time, so port 443 is never left dead.
set -eu

DOMAIN="${CERTBOT_DOMAIN:-sortifly.com}"
EXTRA_DOMAIN="${CERTBOT_EXTRA_DOMAIN:-www.sortifly.com}"
EMAIL="${CERTBOT_EMAIL:-abidrahim@sortifly.com}"
WEBROOT="/var/www/certbot"
LIVE_DIR="/etc/letsencrypt/live/${DOMAIN}"
SELF_DIR="/etc/nginx/ssl"
SERVER_NAME="${DOMAIN} ${EXTRA_DOMAIN}"

# Set CERTBOT_STAGING=1 while testing to avoid Let's Encrypt rate limits.
STAGING_FLAG=""
if [ "${CERTBOT_STAGING:-0}" = "1" ]; then
    STAGING_FLAG="--staging"
fi

mkdir -p "$WEBROOT" "$SELF_DIR"

# Render the HTTPS server block pointing at the given cert/key.
# envsubst only substitutes the listed vars, leaving nginx's own $uri/$host.
write_ssl_conf() {
    export SSL_CERT="$1" SSL_KEY="$2" SERVER_NAME
    envsubst '${SSL_CERT} ${SSL_KEY} ${SERVER_NAME}' \
        < /etc/nginx/nginx-ssl.conf.template > /etc/nginx/conf.d/ssl.conf
}

# 1) Ensure HTTPS is available right away.
if [ -f "${LIVE_DIR}/fullchain.pem" ]; then
    echo "Using existing Let's Encrypt certificate for ${DOMAIN}."
    write_ssl_conf "${LIVE_DIR}/fullchain.pem" "${LIVE_DIR}/privkey.pem"
else
    if [ ! -f "${SELF_DIR}/fullchain.pem" ]; then
        echo "Generating self-signed bootstrap certificate for ${DOMAIN}..."
        openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
            -keyout "${SELF_DIR}/privkey.pem" \
            -out "${SELF_DIR}/fullchain.pem" \
            -subj "/CN=${DOMAIN}" 2>/dev/null
    fi
    write_ssl_conf "${SELF_DIR}/fullchain.pem" "${SELF_DIR}/privkey.pem"
fi

# 2) Start nginx (HTTP on :80 + HTTPS on :443) in the background.
nginx

# 3) Try to obtain a real certificate if we don't have one yet.
if [ ! -f "${LIVE_DIR}/fullchain.pem" ]; then
    echo "Requesting Let's Encrypt certificate for ${DOMAIN} / ${EXTRA_DOMAIN}..."
    if certbot certonly --webroot -w "$WEBROOT" \
        -d "$DOMAIN" -d "$EXTRA_DOMAIN" \
        --email "$EMAIL" --agree-tos --no-eff-email -n $STAGING_FLAG; then
        write_ssl_conf "${LIVE_DIR}/fullchain.pem" "${LIVE_DIR}/privkey.pem"
        nginx -s reload
        echo "HTTPS is now using the Let's Encrypt certificate."
    else
        echo "certbot failed — staying on the self-signed cert."
        echo "Make sure ${DOMAIN} points to this host and ports 80/443 are open, then restart."
    fi
fi

# 4) Background renewal: renews near expiry and reloads nginx to pick it up.
while true; do
    sleep 12h
    certbot renew --webroot -w "$WEBROOT" --quiet \
        --deploy-hook "nginx -s reload" || true
done &

# 5) Hand PID 1 to a foreground nginx so the container tracks its lifecycle.
nginx -s stop || true
sleep 1
exec nginx -g "daemon off;"
