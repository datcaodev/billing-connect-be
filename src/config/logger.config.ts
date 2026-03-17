import pino, { Logger } from "pino";

export const loggerConfig = {
  name: "sever logger",
  level: "debug", // cấp hiển thị log
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true, // Hiển thị màu sắc trên terminal
      translateTime: "yyyy-MM-dd HH:mm:ss", // Format thời gian
      //ignore: "pid", // Bỏ qua `pid` và `hostname` để log gọn hơn
      singleLine: false, // In log trên một dòng duy nhất
      // levelFirst: true // Hiển thị cấp độ log trước
      errorLikeObjectKeys: ["err", "error"] // Giúp pino nhận dạng lỗi tốt hơn
    }
  }
};

export class LoggerPinoSingleton {
  private static instance: LoggerPinoSingleton;
  private logger: Logger<never, boolean>;

  constructor() {
    this.logger = pino(loggerConfig);
  }

  public static getInstance() {
    if (!LoggerPinoSingleton.instance) {
      LoggerPinoSingleton.instance = new LoggerPinoSingleton();
    }
    return LoggerPinoSingleton.instance;
  }

  public getLogger() {
    return this.logger;
  }
}

//pino-elasticsearch -> hỗ trợ đẩy thẳng log vào elasticsearch
//pino-socket -> hỗ trợ đẩy log qua logstash thông qua giao thức TCP HOẶC HTTP

//   const stream = pinoElastic({
//     index: "nodejs-logs",
//     node: "http://localhost:9200", // Địa chỉ Elasticsearch
//   });