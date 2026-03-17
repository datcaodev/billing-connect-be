// utils/vietnamTimeTransformer.ts
import { ValueTransformer } from "typeorm";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const vietnamTimeTransformer: ValueTransformer = {
  to(value: Date): Date {
    // Trước khi lưu → lấy giờ VN và gán thẳng
    const formatted = dayjs(value).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
    return new Date(formatted);
  },
  from(value: Date): Date {
    // Khi lấy ra → giữ nguyên, không shift về UTC
    return dayjs(value).tz("Asia/Ho_Chi_Minh").toDate();
  }
};
