# Hướng dẫn Setup CI/CD với GitHub Actions

Tài liệu này hướng dẫn cách cấu hình và sử dụng hệ thống CI/CD tự động cho dự án **Billion Connect BE** thông qua GitHub Actions.

## 1. Luồng hoạt động (Workflow)

Hệ thống được cấu hình tự động thực hiện các bước sau khi có code mới push vào branch `deploy-dev`:
1.  **Kiểm tra code & Môi trường**: Checkout code và thiết lập Node.js.
2.  **Cài đặt**: Chạy `npm ci` để cài đặt dependencies.
3.  **Build Docker Image**: Sử dụng file `deploy/docker/Dockerfile-dev` để build image.
4.  **Push Image**: Đẩy image lên Docker Hub với tag là 7 ký tự đầu của commit SHA.
5.  **Deploy**: SSH vào server, pull image mới nhất và restart service bằng Docker Compose.

## 2. Các Secrets cần cấu hình trên GitHub

Để workflow có thể chạy được, bạn cần truy cập vào Repo GitHub:
**Settings** > **Secrets and variables** > **Actions** > **New repository secret** và thêm các biến sau:

### Docker Hub Credentials
*   `DOCKER_USERNAME`: Tài khoản Docker Hub của bạn (ví dụ: `codechub`).
*   `DOCKER_PASSWORD`: Access Token hoặc Password của Docker Hub.

### Server SSH Credentials (Deploy Dev)
*   `DEV_HOST`: Địa chỉ IP của máy chủ Dev.
*   `DEV_PORT`: Cổng SSH (thường là `22`).
*   `DEV_USER`: Username SSH (ví dụ: `root` hoặc `ubuntu`).
*   `DEV_PASSWORD`: Mật khẩu SSH của server.

## 3. Cấu hình Workflow

File cấu hình nằm tại: `.github/workflows/deploy-dev.yml`.

### Lưu ý quan trọng trên Server:
Workflow thực hiện lệnh deploy tại thư mục `~/billion-connect`. Đảm bảo trên server đã có:
1.  Thư mục dự án đã được clone.
2.  File `docker-compose.yml` đã được cấu hình đúng.
3.  Đã login Docker trên server hoặc sử dụng image public (nếu private cần setup `docker login` trên server trước).

## 4. Cách sử dụng

Mỗi khi bạn hoàn thành code và muốn deploy lên môi trường Dev:

```bash
# Chuyển sang branch deploy-dev
git checkout deploy-dev

# Merge code từ branch tính năng
git merge feature-branch

# Push lên GitHub
git push origin deploy-dev
```

Sau khi push, bạn có thể theo dõi tiến trình tại tab **Actions** trên GitHub.

## 5. Cấu trúc thư mục liên quan

*   `.github/workflows/deploy-dev.yml`: File định nghĩa workflow.
*   `deploy/sh-file/deploy-dev.sh`: Script build và push Docker image.
*   `deploy/docker/Dockerfile-dev`: Dockerfile cho môi trường development.
