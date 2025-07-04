#!/usr/bin/env bash
set -euo pipefail

: "${HCLOUD_TOKEN:?HCLOUD_TOKEN environment variable not set}"

# === Parameters ===
LOCATION=nbg1                      # Load Balancer location
DATACENTER=nbg1-dc3                # Data center for servers
IMAGE=debian-12
SERVER_TYPE=cpx11                  # shared vCPU
NETWORK_NAME=vpc-load-balancer     # existing network
FIREWALL_NAME=firewall-ssh-only    # existing firewall
PLACEMENT_GROUP_ID=548379          # existing placement group ID
LB_NAME=lb-landing                 # Load Balancer name
SERVERS=(web-1 web-2)
SSH_KEY_NAME="deploy key"         # existing SSH key with space
USER_DATA=infra/cfg.yaml           # cloud‑init file path
CERT_NAME=qmates-all               # managed certificate name
LABEL_KV=role=landing

command -v jq >/dev/null 2>&1 || { echo "jq is required" >&2; exit 1; }

# Wrapper for hcloud CLI
ihcloud() { hcloud "$@"; }

# === Pre‑flight ===
for res in network firewall; do
  NAME_VAR="${res^^}_NAME"      # NETWORK_NAME / FIREWALL_NAME
  ihcloud $res describe "${!NAME_VAR}" >/dev/null 2>&1 || {
    echo "$res ${!NAME_VAR} not found" >&2; exit 1; }
done

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
    --label "$LABEL_KV"
  sleep 2
done

# === Load Balancer ===
if ! ihcloud load-balancer describe "$LB_NAME" >/dev/null 2>&1; then
  ihcloud load-balancer create \
    --name "$LB_NAME" \
    --type lb11 \
    --location "$LOCATION" \
    --label "$LABEL_KV"
fi

# Attach servers to LB via private network
for s in "${SERVERS[@]}"; do
  PRIVATE_IP=$(ihcloud server list --selector name="$s" --output columns=private_net_ipv4 | tail -n +2)
  ihcloud load-balancer describe "$LB_NAME" | grep -q "$PRIVATE_IP" || \
    ihcloud load-balancer add-target "$LB_NAME" --ip "$PRIVATE_IP"
  sleep 2
done

# === Certificate lookup ===
CERT_ID=$(ihcloud certificate list 2>/dev/null | awk -v n="$CERT_NAME" '$0 ~ n {print $1}' | head -n1 || true)

if [ -n "$CERT_ID" ]; then
  echo "Certificate '$CERT_NAME' found (id: $CERT_ID) – configuring HTTPS only" >&2
  # Ensure HTTPS service 443 exists
  if ! ihcloud load-balancer describe "$LB_NAME" | grep -q "listen port: 443"; then
    ihcloud load-balancer add-service "$LB_NAME" \
      --protocol https \
      --listen-port 443 \
      --destination-port 80 \
      --certificate "$CERT_ID"
  fi
  # No HTTP 80 creation when cert present
else
  echo "No certificate '$CERT_NAME' – falling back to HTTP 80 only" >&2
  if ! ihcloud load-balancer describe "$LB_NAME" | grep -q "listen port: 80"; then
    ihcloud load-balancer add-service "$LB_NAME" \
      --protocol http \
      --listen-port 80 \
      --destination-port 80
  fi
fi

echo "Infrastructure provisioning complete."
