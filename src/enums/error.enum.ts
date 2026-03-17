// export enum ErrorCode {
//     FORBIDDEN = 403, // Không có quyền truy cập
//     UNAUTHORIZED = 401, // Xác thực thất bại
//     DATA_CONFLICT = 409, // sung đột dữ liêuj
//     GATEWAY_TIMEOUT = 504, // Sever timeout
//     SERVER_ERROR = 500, // lỗi máy chủ
//     NOT_FOUND = 404, // Không tìm thấy tài nguyên
//     SERVICE_UNAVAILABLE = 503, // Dịch vụ tạm thời không sẵn sàng
//     VALIDATION_ERROR = 400 // Dữ liệu đầu vào không hợp lệ
// }

export enum ErrorCode {
  // ✅ Xác thực & phân quyền
  UNAUTHORIZED = 401,           // Xác thực thất bại (chưa đăng nhập)
  FORBIDDEN = 403,              // Không có quyền truy cập

  // ✅ Lỗi nghiệp vụ / thao tác không thành công
  VALIDATION_ERROR = 400,       // Dữ liệu đầu vào không hợp lệ
  DATA_CONFLICT = 409,          // Xung đột dữ liệu (trạng thái không hợp lệ để thao tác)
  BUSINESS_REJECTED = 422,      // Bị từ chối bởi nghiệp vụ (ví dụ đã duyệt, không thể sửa)
  ACTION_FAILED = 417,          // Thao tác thất bại nhưng không phải lỗi hệ thống (Expectation Failed) (lỗi chung)


  // ✅ Tài nguyên
  NOT_FOUND = 404,              // Không tìm thấy tài nguyên

  // ✅ Lỗi hệ thống
  SERVER_ERROR = 500,           // Lỗi máy chủ
  SERVICE_UNAVAILABLE = 503,    // Dịch vụ tạm thời không sẵn sàng
  SERVICE_ERROR = 505,    // lỗi khi gọi sang dịch vụ khác
  GATEWAY_TIMEOUT = 504,         // Server timeout
}
  