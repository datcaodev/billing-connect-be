// utils/date.util.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";


const generateCurrentTime = () => {
  return (new Date()).toJSON();
};

export {
  generateCurrentTime
};


dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Lấy thời gian hiện tại theo giờ Việt Nam (GMT+7)
 */
export function getNowVN(): Date {
  const formatted = dayjs().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
  return new Date(formatted);
}

/**
 * hàm convert thời gian thành định dạng YYYYMMDD
 * @returns {string} ex: 20221012
 */
export function getCurrentDateYYYYMMDD() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

/**
 * Hàm lấy số giây còn lại trong ngày (tính từ thời điểm hiện tại đến 23:59:59).
 * @returns {number} Số giây còn lại trong ngày.
 */
export function getSecondsLeftInDay() {
  const now = new Date();

  // Tạo thời điểm cuối ngày (23:59:59.999)
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  // Tính khoảng cách thời gian (ms → giây)
  const diffMs = endOfDay.getTime() - now.getTime();
  return Math.floor(diffMs / 1000);
}