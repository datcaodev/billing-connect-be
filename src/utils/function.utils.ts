import bcrypt from "bcrypt";
import { handleServiceResponse } from "./httpHandlers.utils";
import { ServiceResponse } from "../core/serviceResponse.core";
import { Response } from "express";
import { APP_CONFIG } from "../config/app.config";
import { IPaginationMapping } from "../types/pagination.type";
import { STATUS_COMMON } from "../enums/common.enum";
export const bcryptHashValue = (value: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(value, salt);
};

export const bcryptCompare = (
  valueReal: string | Buffer<ArrayBufferLike>,
  valueHash: string
): boolean => {
  return bcrypt.compareSync(valueReal, valueHash);
};

// common response bad response
export const BadResponse = (res: Response, error?: string) => {
  return handleServiceResponse(
    ServiceResponse.failure({
      message: error || "Gặp lỗi xảy ra trong quá trình xử lý. Vui lòng kiểm tra lại"
    }),
    res
  );
};

export const generateRandomPassword = () => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

  const allChars = lowercase + uppercase + digits + specialChars;

  // Random password length between 10 and 13
  const length = Math.floor(Math.random() * 4) + 10;

  let password = '';

  // Ensure at least one character from each type
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to randomize the guaranteed characters
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  return password;
}

// convert kiểu dữ liệu phân trang đầu vào
export const getPagination = (params: { page: string, size: string, sortBy: string }): IPaginationMapping => {
  try {
    const { page, size, sortBy } = params
    const parsePage = +page + 1 || APP_CONFIG.pageDefault;
    const parseSize = +size || APP_CONFIG.limitDefault;
    const offset = (parsePage - 1) * parseSize;
    const limit = parseSize;
    const sortByMapping = sortBy === 'ASC' ? 'ASC' : 'DESC'

    return { skip: offset, take: limit, orderBy: sortByMapping };
  } catch (error) {
    return error;
  }
};

export function getGmailUsername(email: string) {
  if (typeof email !== 'string') return '';
  const parts = email.split('@');
  return parts[0] || '';
}



// tạo tên nhóm quyền nhân viên keycloak
export const groupNamingFormulaEmployee = (params: {
  taxCode: string
  nameGroup: string
}) => {

  const { taxCode, nameGroup } = params

  const randomNumber = Math.floor(1000000 + Math.random() * 9000000);

  return `Employee_${nameGroup}_${taxCode}_${randomNumber}`
}

export function stringToBoolean(value: string | null | undefined): boolean | null {
  if (value === null || value === undefined) {
    return null; // Trả về null nếu giá trị là null hoặc undefined
  }

  // Chuyển đổi chuỗi 'true' thành true và chuỗi 'false' thành false
  if (value.toLowerCase() === 'true') {
    return true;
  } else if (value.toLowerCase() === 'false') {
    return false;
  }

  // Nếu giá trị không phải 'true' hoặc 'false', trả về null
  return null;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateAccountStatus(value: any): STATUS_COMMON | undefined {
  return Object.values(STATUS_COMMON).includes(value) ? value as STATUS_COMMON : undefined;
}

// validate uuid
export function validateUUID(value: string): string | undefined {
  const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return typeof value === 'string' && uuidV4Regex.test(value) ? value : undefined;
}

// Hàm encode JSON object thành Base64
export function encodeBase64(obj) {
  const jsonString = JSON.stringify(obj);
  return Buffer.from(jsonString).toString('base64');
}

// Hàm decode Base64 thành JSON object
export function decodeBase64(base64Str) {
  const jsonString = Buffer.from(base64Str, 'base64').toString('utf-8');
  return JSON.parse(jsonString)
}


export function renderPlanName(high_flow_size: string, plan_type: string) {
  const size = Number(high_flow_size);

  // Không giới hạn
  if (size === -1) {
    return "UNLIMITED";
  }

  const mb = size / 1024;

  let value: number;
  let unit: string;

  if (mb < 1024) {
    // Làm tròn xuống hàng trăm MB
    value = Math.floor(mb / 100) * 100;
    unit = "MB";
  } else {
    const gb = mb / 1024;
    value = Math.round(gb * 10) / 10;
    unit = "GB";
  }

  return Number(plan_type) === 1
    ? `${value}${unit}/ngày`
    : `${value}${unit}`;
}