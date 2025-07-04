#!/usr/bin/env bash
set -euo pipefail

: "${HCLOUD_TOKEN:?HCLOUD_TOKEN environment variable not set}"

# === Parameters ===
LOCATION=nbg1
DATACENTER=nbg1-dc3
IMAGE=debian-12
SERVER_TYPE=cpx11
NETWORK_NAME=vpc-load-balancer
FIREWALL_NAME=firewall-ssh-only
PLACEMENT_GROUP_ID=548379
LB_NAME=lb-landing
SERVERS=(web-1 web-2)
SSH_KEY_NAME="deploy key"
USER_DATA=infra/cfg.yaml
CERT_NAME=qmates-all

command -v jq >/dev/null 2>&1 || { echo "jq is required" >&2; exit 1; }

ihcloud() { hcloud "$@"; }

# === Pre‑flight ===
if ! ihcloud network describe "$NETWORK_NAME" >/dev/null 2>&1; then
  echo "network $NETWORK_NAME not found" >&2; exit 1
fi
if ! ihcloud firewall describe "$FIREWALL_NAME" >/dev/null 2>&1; then
  echo "firewall $FIREWALL_NAME not found" >&2; exit 1
fi

# === Servers ===
for s in "${SERVERS[@]}"; do
  ihcloud server describe "$s" >/dev/null 2>&1 && continue
  ihcloud server create \
    --name "$s" \
    --type "$SERVER_TYPE" \
    --image "$IMAGE" \
    --datacenter "$DATACENTER" \
    --ssh-key "$SSH_KEY_NAME" \
    --network "$NETWORK_NAME" \
    --placement-group "$PLACEMENT_GROUP_ID" \
    --firewall "$FIREWALL_NAME" \
    --user-data-from-file "$USER_DATA" \
    --label role=landing
  sleep 2
done

# === Load Balancer ===
ihcloud load-balancer describe "$LB_NAME" >/dev/null 2>&1 || \
  ihcloud load-balancer create --name "$LB_NAME" --type lb11 --location "$LOCATION"

for s in "${SERVERS[@]}"; do
  ihcloud load-balancer describe "$LB_NAME" | grep -q " $s$" || ihcloud load-balancer add-target "$LB_NAME" --server "$s"
  sleep 2
done

# HTTP 80 service (idempotent)
if ! ihcloud load-balancer describe "$LB_NAME" | grep -q "listen port: 80"; then
  ihcloud load-balancer add-service "$LB_NAME" --protocol http --listen-port 80 --destination-port 80
fi

# === Optional HTTPS 443 service ===
CERT_ID=$(ihcloud certificate list 2>/dev/null | awk -v n="$CERT_NAME" '$0 ~ n {print $1}' | head -n1 || true)
if [ -n "$CERT_ID" ]; then
  if ! ihcloud load-balancer describe "$LB_NAME" | grep -q "listen port: 443"; then
    ihcloud load-balancer add-service "$LB_NAME" \
      --protocol https \
      --listen-port 443 \
      --destination-port 80 \
      --certificate "$CERT_ID"
  fi
else
  echo "No certificate named '$CERT_NAME' found – skipping HTTPS service" >&2
fi

echo "Infrastructure provisioning complete."