#!/bin/bash
# Build the frontend image locally, upload it to the NAS, and restart the container.
# Usage: ./scripts/deploy-frontend.sh
# Optional:
#   NAS_USER=foo NAS_HOST=1.2.3.4 NAS_DIR=/path FRONTEND_PORT=15679 ./scripts/deploy-frontend.sh

set -euo pipefail

cd "$(dirname "$0")/.."

PLATFORM="${PLATFORM:-linux/amd64}"
IMAGE="${IMAGE:-ai-stack-frontend:latest}"
CONTAINER="${CONTAINER:-ai-stack-frontend}"
TAR_FILE="${TAR_FILE:-ai-stack-frontend.tar.gz}"
FRONTEND_PORT="${FRONTEND_PORT:-15679}"
NAS_USER="${NAS_USER:-jeffpan}"
NAS_HOST="${NAS_HOST:-192.168.31.10}"
NAS_DIR="${NAS_DIR:-/vol2/1000/WestData/ai-stack}"
BASE_IMAGE="${BASE_IMAGE:-}"
PUBLIC_URL="${PUBLIC_URL:-https://ai-stack.alphaflow.plus}"
REMOTE_TARGET="${NAS_USER}@${NAS_HOST}"

cleanup() {
  rm -f "${TAR_FILE}"
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "Error: command not found: $1"
    exit 1
  }
}

trap cleanup EXIT

require_cmd docker
require_cmd gzip
require_cmd npm
require_cmd scp
require_cmd ssh

if [ -z "${BASE_IMAGE}" ]; then
  if docker image inspect alphaflow-frontend:latest >/dev/null 2>&1; then
    BASE_IMAGE="alphaflow-frontend:latest"
  else
    BASE_IMAGE="nginx:1.27.0"
  fi
fi

echo "=========================================="
echo "  AI Stack frontend deployment"
echo "  Build platform: ${PLATFORM}"
echo "  Image: ${IMAGE}"
echo "  Container: ${CONTAINER}"
echo "  NAS target: ${REMOTE_TARGET}"
echo "  NAS dir: ${NAS_DIR}"
echo "  Frontend port: ${FRONTEND_PORT}"
echo "  Base image: ${BASE_IMAGE}"
echo "=========================================="

if [ ! -x node_modules/.bin/tsc ] || [ ! -x node_modules/.bin/vite ]; then
  echo ""
  echo "[1/6] Installing npm dependencies..."
  npm ci
else
  echo ""
  echo "[1/6] npm dependencies already installed."
fi

echo ""
echo "[2/6] Building frontend assets..."
npm run build

echo ""
echo "[3/6] Building Docker image locally (${PLATFORM})..."
docker buildx build \
  --platform "${PLATFORM}" \
  --build-arg "BASE_IMAGE=${BASE_IMAGE}" \
  -t "${IMAGE}" \
  -f deploy/Dockerfile \
  --load \
  .

echo ""
echo "[4/6] Exporting Docker image..."
docker save "${IMAGE}" | gzip > "${TAR_FILE}"
FILE_SIZE=$(du -h "${TAR_FILE}" | cut -f1)
echo "  Archive size: ${FILE_SIZE}"

echo ""
echo "[5/6] Uploading image archive to NAS..."
ssh "${REMOTE_TARGET}" "mkdir -p '${NAS_DIR}'"
scp "${TAR_FILE}" "${REMOTE_TARGET}:${NAS_DIR}/"

echo ""
echo "[6/6] Loading image and restarting container on NAS..."
ssh "${REMOTE_TARGET}" "sudo -n bash -s" <<EOF
set -euo pipefail
cd "${NAS_DIR}"
gunzip -c "${TAR_FILE}" | docker load
docker stop "${CONTAINER}" 2>/dev/null || true
docker rm "${CONTAINER}" 2>/dev/null || true
docker run -d \\
  --name "${CONTAINER}" \\
  --restart unless-stopped \\
  -p "${FRONTEND_PORT}:80" \\
  "${IMAGE}"
rm -f "${TAR_FILE}"
echo ""
echo "Waiting for service startup..."
sleep 5
docker ps --filter "name=^/${CONTAINER}$" --format "table {{.Names}}\\t{{.Image}}\\t{{.Status}}\\t{{.Ports}}"
EOF

echo ""
echo "=========================================="
echo "  Frontend deployment complete"
echo "=========================================="
echo "  NAS URL: http://${NAS_HOST}:${FRONTEND_PORT}"
echo "  Public URL: ${PUBLIC_URL}"
echo "  Logs: ssh ${REMOTE_TARGET} 'sudo -n docker logs -f ${CONTAINER}'"
echo ""
