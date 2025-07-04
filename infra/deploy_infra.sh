#!/usr/bin/env bash
set -euo pipefail

# Core parameters
LOCATION=nbg1          # Location slug for resources that accept only a location
DATACENTER=nbg1-dc3    # Specific data‑center for the VMs
IMAGE=debian-12
SERVER_TYPE=cx11
NETWORK_NAME=vpc-load-balancer
NETWORK_CIDR=10.0.0.0/16
SUBNET_CIDR=10.0.1.0/24
PLACEMENT_GROUP=landing-pages
FIREWALL=firewall-ssh-only
LB_NAME=lb-landing
SERVERS=(web-1 web-2)
SSH_KEY_NAME=deploy-key

# Create network if missing
hcloud network describe "$NETWORK_NAME" >/dev/null 2>&1 || {
  hcloud network create --name "$NETWORK_NAME" --ip-range "$NETWORK_CIDR"
  hcloud network add-subnet "$NETWORK_NAME" --type cloud --network-zone eu-central --ip-range "$SUBNET_CIDR"
}

# Create firewall if missing
hcloud firewall describe "$FIREWALL" >/dev/null 2>&1 || {
  hcloud firewall create --name "$FIREWALL"
  hcloud firewall add-rule "$FIREWALL" --direction in --protocol tcp --port 22 --source-ips 0.0.0.0/0
}

# Placement group
hcloud placement-group describe "$PLACEMENT_GROUP" >/dev/null 2>&1 || \
  hcloud placement-group create --name "$PLACEMENT_GROUP" --type spread

# Create servers
for s in "${SERVERS[@]}"; do
  hcloud server describe "$s" >/dev/null 2>&1 || \
    hcloud server create \
      --name "$s" \
      --type "$SERVER_TYPE" \
      --image "$IMAGE" \
      --datacenter "$DATACENTER" \
      --ssh-key "$SSH_KEY_NAME" \
      --network "$NETWORK_NAME" \
      --placement-group "$PLACEMENT_GROUP" \
      --firewall "$FIREWALL" \
      --user-data-from-file cfg.yaml \
      --label role=landing
  sleep 2
done

# Create load balancer
hcloud load-balancer describe "$LB_NAME" >/dev/null 2>&1 || \
  hcloud load-balancer create --name "$LB_NAME" --type lb11 --location "$LOCATION"

# Attach servers to the load balancer
for s in "${SERVERS[@]}"; do
  hcloud load-balancer describe "$LB_NAME" | grep -q "$s" || \
    hcloud load-balancer add-target "$LB_NAME" server --server "$s"
  sleep 2
done

# Add HTTP service with health check
hcloud load-balancer describe "$LB_NAME" | grep -q /healthz || \
  hcloud load-balancer add-service "$LB_NAME" 80 --protocol http --http-health-check-path /healthz
