echo "Pull image tag new..."
read -p "Enter Tag image new version: " tag

IMAGE_NAME="skyenm_be_cms"
TAR_NAME="${IMAGE_NAME}_${tag}.tar"

SERVER_USER="root"
SERVER_IP="103.82.27.77"
SERVER_PATH="/opt/skyenm"

echo "Tags: $tag"
echo "==============START BUILD DOCKER=============="

docker build -t "$IMAGE_NAME:$tag" -f deploy/docker/Dockerfile-prod .

echo "BUILD DOCKER DONE"
sleep 5

echo "==============SAVE TO TAR=============="
docker save -o $TAR_NAME "$IMAGE_NAME:$tag"

echo "Saved image to $TAR_NAME"
sleep 5

echo "==============UPLOAD TO SERVER=============="
scp $TAR_NAME $SERVER_USER@$SERVER_IP:$SERVER_PATH

echo "Upload done"
sleep 5

echo "==============LOAD IMAGE ON SERVER=============="
ssh $SERVER_USER@$SERVER_IP << EOF
docker load -i $SERVER_PATH/$TAR_NAME
docker images | grep $IMAGE_NAME
EOF

echo "Deploy done!"

# optional cleanup local
rm -f $TAR_NAME
docker image prune -f

echo "Cleanup done!"

