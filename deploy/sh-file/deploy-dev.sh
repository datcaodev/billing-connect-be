# để chạy ở local
# DOCKER_USERNAME=codechub DOCKER_PASSWORD=xxxxx TAG=dev sh deploy/sh-file/_deploy-dev.sh

#!/bin/sh
set -e

DOCKER_USERNAME="${DOCKER_USERNAME}"
DOCKER_PASSWORD="${DOCKER_PASSWORD}"
IMAGE_NAME="billion_connect"
TAG="${TAG:-dev}"

if [ -z "$DOCKER_USERNAME" ] || [ -z "$DOCKER_PASSWORD" ]; then
  echo "Missing DOCKER_USERNAME or DOCKER_PASSWORD"
  exit 1
fi

# nếu TAG là full SHA thì rút gọn 7 ký tự
TAG=$(echo "$TAG" | cut -c1-7)

echo "Tag: $TAG"
echo "============== START BUILD DOCKER =============="

docker build -t "$IMAGE_NAME:$TAG" -f deploy/docker/Dockerfile-dev .

echo "Build Docker success"

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

echo "Start push Docker Hub"
docker tag "$IMAGE_NAME:$TAG" "$DOCKER_USERNAME/$IMAGE_NAME:$TAG"
docker push "$DOCKER_USERNAME/$IMAGE_NAME:$TAG"

echo "Push Docker Hub successfully"

docker image prune -f || true

echo "Prune image done"