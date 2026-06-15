#!/bin/sh
# Entrypoint: obtain/renew a Let's Encrypt certificate via certbot, then run
# nginx. Designed so nginx serves HTTP (and the ACME challenge) immediately,
# even before any certificate exists.
set -eu

DOMAIN="${CERTBOT_DOMAIN:-sortifly.com}"
EXTRA_DOMAIN="${CERTBOT_EXTRA_DOMAIN:-www.sortifly.com}"
EMAIL="${CERTBOT_EMAIL:-abidrahim05@gmail.com}"
WEBROOT="/var/www/certbot"
# Set CERTBOT_STAGING=1 while testing to avoid Let's Encrypt rate limits.
STAGING_FLAG=""
if [ "${CERTBOT_STAGING:-0}" = "1" ]; then
    STAGING_FLAG="--staging"
fi

mkdir -p "$WEBROOT"

enable_ssl() {
    if [ -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
        cp /etc/nginx/nginx-ssl.conf /etc/nginx/conf.d/ssl.conf
    fi
}

# Start nginx in the background so the HTTP-01 challenge can be served.
nginx

# Obtain the certificate if we don't already have one (e.g. from a volume).
if [ ! -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
    echo "No certificate found for ${DOMAIN}; requesting one from Let's Encrypt..."
    certbot certonly \
        --webroot -w "$WEBROOT" \
        -d "$DOMAIN" -d "$EXTRA_DOMAIN" \
        --email "$EMAIL" \
        --agree-tos --no-eff-email -n \
        $STAGING_FLAG || echo "certbot failed; continuing with HTTP only."
fi

# Enable the HTTPS server block now that the cert exists, and reload.
enable_ssl
nginx -s reload || true

# Background renewal loop: certbot renews when the cert is near expiry and
# reloads nginx so the new cert is picked up.
while true; do
    sleep 12h
    certbot renew --webroot -w "$WEBROOT" --quiet \
        --deploy-hook "nginx -s reload" || true
done &

# Stop the backgrounded nginx and hand PID 1 to a foreground nginx so the
# container lifecycle tracks it correctly.
nginx -s stop || true
sleep 1
exec nginx -g "daemon off;"
