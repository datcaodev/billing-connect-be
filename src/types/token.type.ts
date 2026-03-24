
/**
 * Payload của Access Token được decode từ Keycloak
 */
export interface ITokenPayload {
  /** Thời điểm token hết hạn (UNIX timestamp, giây) */
  exp: number;

  /** Thời điểm token được tạo (issued at) */
  iat: number;

  /** Thời điểm người dùng đăng nhập xác thực */
  auth_time: number;

  /** ID duy nhất của token */
  jti: string;

  /** URL của realm phát hành token */
  iss: string;

  /** Đối tượng được cấp token (thường là clientId như "account") */
  aud: string;

  /** ID duy nhất của người dùng */
  sub: string;

  /** Loại token (thường là "Bearer") */
  typ: string;

  /** Client ID đã yêu cầu token */
  azp: string;

  /** ID phiên làm việc */
  session_state: string;

  /** Cấp độ xác thực (thường là "1") */
  acr: string;

  /** Danh sách các origin được phép (CORS) */
  "allowed-origins": string[];

  /** Vai trò ở cấp Realm */
  realm_access: Realmaccess;

  /** Vai trò ở cấp Client */
  resource_access: Resourceaccess;

  /** Phạm vi truy cập được cấp (VD: "openid email profile") */
  scope: string;

  /** Session ID người dùng */
  sid: string;

  /** Đã xác minh email hay chưa */
  email_verified: boolean;

  /** Tên đầy đủ người dùng */
  name: string;

  /** Tên đăng nhập (username) */
  preferred_username: string;

  /** Tên riêng (first name) */
  given_name: string;

  /** Họ (last name) */
  family_name: string;

  /** Email người dùng */
  email: string;
}

/**
 * Vai trò truy cập theo client
 */
interface Resourceaccess {
  /** Vai trò trong ứng dụng */
  [x: string]: Realmaccess;
}

/**
 * Danh sách các vai trò (roles)
 */
interface Realmaccess {
  /** Mảng chứa các vai trò được gán */
  roles: string[];
}


export interface ITokenOTP {
  email: string;
  type: any;
}