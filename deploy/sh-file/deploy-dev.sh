echo "Pull image tag new..."
read -p "Enter Tag image new version: " tag
DOCKER_USERNAME="codechub"
DOCKER_PASSWORD="123@45678"
IMAGE_NAME="billion_connect";
echo  "Tags: $tag";
echo "==============START BUILD DOCKER=============="
docker build -t "$IMAGE_NAME:$tag" -f deploy/docker/Dockerfile-dev .
echo "BUILD DOCKER";
sleep 10

echo "Auto login to $DOCKER_USERNAME"
docker login --username=$DOCKER_USERNAME --password=$DOCKER_PASSWORD

# echo "login manual...";
# echo "login to $DOCKER_USERNAME"
# echo "password:"
# read pass
# echo "$pass" | docker login --username=$DOCKER_USERNAME --password-stdin

echo "Start push dockerhub";
docker tag "$IMAGE_NAME:$tag" "$DOCKER_USERNAME/$IMAGE_NAME:$tag"
sleep 10
docker push  "$DOCKER_USERNAME/$IMAGE_NAME:$tag"
echo "Push dockerhub successfully!";
sleep 10
docker image prune -f
echo "prune image!";

sleep 30
