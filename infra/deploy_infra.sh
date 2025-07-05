#!/usr/bin/env bash
set -euo pipefail

: "${HCLOUD_TOKEN:?HCLOUD_TOKEN environment variable not set}"

# === Parameters ===
LOCATION=nbg1                      # Load Balancer location
DATACENTER=nbg1-dc3                # Data center for servers
IMAGE=debian-12
SERVER_TYPE=cpx11                  # shared vCPU
PRIVATE_NETWORK=lb-internal        # private network name for LB and servers
FIREWALLS=(firewall-ssh-only allow-http-internal)  # existing firewalls
LB_NAME=lb-landing                 # load balancer name
SERVERS=(web-1 web-2)              # server hostnames
SSH_KEY_NAME="deploy key"         # SSH key name in Hetzner
USER_DATA=infra/cfg.yaml           # cloud-init file path
CERT_NAME=qmates-all               # certificate name for HTTPS
LABEL_KV=role=landing              # resource label

# hcloud CLI wrapper
hc() { hcloud "$@"; }

# === Pre-flight checks ===
# Ensure network exists
hc network describe "$PRIVATE_NETWORK" >/dev/null 2>&1 || { echo "Error: network '$PRIVATE_NETWORK' not found" >&2; exit 1; }
# Ensure required firewalls exist
for fw in "${FIREWALLS[@]}"; do
  hc firewall describe "$fw" >/dev/null 2>&1 || { echo "Error: firewall '$fw' not found" >&2; exit 1; }
done

# === Load Balancer ===
if ! hc load-balancer describe "$LB_NAME" >/dev/null 2>&1; then
  hc load-balancer create --name "$LB_NAME" --type lb11 --location "$LOCATION" --label "$LABEL_KV"
fi
# Attach LB to private network
if ! hc load-balancer describe "$LB_NAME" | grep -q "$PRIVATE_NETWORK"; then
  NETWORK_ID=$(hc network list | awk -v n="$PRIVATE_NETWORK" '$2==n {print $1; exit}')
  hc load-balancer attach-to-network --network "$NETWORK_ID" "$LB_NAME"
fi

# === Provision servers ===
for s in "${SERVERS[@]}"; do
  if ! hc server describe "$s" >/dev/null 2>&1; then
    # build firewall flags
    FIREWALL_FLAGS=()
    for fw in "${FIREWALLS[@]}"; do FIREWALL_FLAGS+=(--firewall "$fw"); done
    hc server create \
      --name "$s" \
      --type "$SERVER_TYPE" \
      --image "$IMAGE" \
      --datacenter "$DATACENTER" \
      --ssh-key "$SSH_KEY_NAME" \
      --network "$PRIVATE_NETWORK" \
      "${FIREWALL_FLAGS[@]}" \
      --user-data-from-file "$USER_DATA" \
      --label "$LABEL_KV"
    sleep 2
  fi
done

# === Attach servers to LB via private IP ===
for s in "${SERVERS[@]}"; do
  if ! hc load-balancer describe "$LB_NAME" | grep -q "server $s"; then
    hc load-balancer add-target "$LB_NAME" --server "$s" --use-private-ip
    sleep 2
  fi
done

# === Configure services ===
CERT_ID=$(hc certificate list | awk -v name="$CERT_NAME" '$2==name{print $1; exit}')
if [ -n "$CERT_ID" ]; then
  echo "Configuring HTTPS only (certificate: $CERT_NAME)"
  if ! hc load-balancer describe "$LB_NAME" | grep -q "listen port: 443"; then
    hc load-balancer add-service \
      --protocol https --listen-port 443 --destination-port 80 --http-certificates "$CERT_ID" "$LB_NAME"
  fi
else
  echo "No certificate found: enabling HTTP"
  if ! hc load-balancer describe "$LB_NAME" | grep -q "listen port: 80"; then
    hc load-balancer add-service \
      --protocol http --listen-port 80 --destination-port 80 "$LB_NAME"
  fi
fi

echo "Deployment complete. LB and servers communicate over private network."
