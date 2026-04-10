# Billion Connect Backend - Node.js API Service

Hệ thống Backend cung cấp API cho dịch vụ Billion Connect, quản lý sản phẩm, gói cước và bảng giá đại lý.

## 🚀 Công nghệ sử dụng
- **Ngôn ngữ**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Validation**: Zod & Class-validator
- **Documentation**: Swagger UI
- **Khác**: Redis, Cloudinary, Docker

## 📁 Cấu trúc thư mục chính
```
src/
├── api_docs/      # Cấu hình Swagger UI
├── config/        # Cấu hình Database, Cloudinary, v.v.
├── controllers/   # Xử lý các request HTTP
├── core/          # Các class Base (BaseService, BaseRepository, v.v.)
├── dto/           # Data Transfer Objects
├── entity/        # Định nghĩa các bảng Database (Entity) & View
├── middlewares/   # Các hàm trung gian xử lý Request
├── migration/     # Lưu trữ các file quản lý phiên bản database
├── repositories/  # Tầng truy cập dữ liệu (Data Access Layer)
├── routers/       # Định nghĩa các đường dẫn API
├── schemas/       # Zod schemas để validate request body
├── services/      # Chứa logic nghiệp vụ (Business Logic)
└── utils/         # Các hàm tiện ích dùng chung
```

## 🛠 Hướng dẫn cài đặt

1.  **Cài đặt các Package**:
    ```bash
    npm install
    ```

2.  **Cấu hình môi trường**:
    Tạo file `.env.development` hoặc `.env.production` dựa trên file mẫu và cấu hình các thông số:
    - Database (DB_HOST, DB_USER, ...)
    - Redis
    - Cloudinary
    - Keycloak (nếu có)

3.  **Chạy dự án ở chế độ phát triển (Dev Mode)**:
    ```bash
    npm run dev
    ```

## 🗄 Quản lý Database (Migration)
Dự án sử dụng TypeORM Migration để quản lý schema database.

- **Tạo migration mới**:
  ```bash
  npm run migration:generate:prod --name=Tên_Migration
  ```
- **Tạo file migration trống**:
  ```bash
  npm run migration:create:prod --name=Tên_Migration
  ```
- **Thực thi migration**:
  ```bash
  npm run migration:run:prod
  ```
- **Hoàn tác migration**:
  ```bash
  npm run migration:revert:prod
  ```

## ✨ Tính năng nổi bật

### 📊 Materialized View (`mv_agency_price`)
Để tối ưu hóa tốc độ truy vấn cho các đại lý khi lấy danh sách hàng ngàn gói cước kèm giá đã tính toán, dự án sử dụng **Materialized View**.
- **Lợi ích**: Giảm thời gian load dữ liệu từ 2-3s xuống còn < 100ms.
- **Cập nhật dữ liệu**: View này không tự động cập nhật. Dữ liệu được Refresh thông qua API hoặc các hook trong Service.

### 🔄 API Refresh Data
Khi có sự thay đổi về sản phẩm hoặc bảng giá, hệ thống cung cấp API để làm mới Materialized View:
- **Endpoint**: `POST /api/v1/billion-connect/site-product/refresh-mv`
- **Tự động**: Hệ thống đã được tích hợp việc tự động gọi hàm refresh sau khi `Tạo mới` hoặc `Xóa` sản phẩm site.

## 📖 API Documentation (Swagger)
Sau khi khởi chạy ứng dụng, bạn có thể truy cập tài liệu API tại:
`http://localhost:<PORT>/api/v1/billion-connect/docs`

---
*Lưu ý: Luôn đảm bảo bạn đã cấu hình đúng môi trường trong file `.env` trước khi thực hiện các lệnh liên quan đến database.*
