"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerPinoSingleton = exports.loggerConfig = void 0;
const pino_1 = __importDefault(require("pino"));
exports.loggerConfig = {
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
class LoggerPinoSingleton {
    constructor() {
        this.logger = (0, pino_1.default)(exports.loggerConfig);
    }
    static getInstance() {
        if (!LoggerPinoSingleton.instance) {
            LoggerPinoSingleton.instance = new LoggerPinoSingleton();
        }
        return LoggerPinoSingleton.instance;
    }
    getLogger() {
        return this.logger;
    }
}
exports.LoggerPinoSingleton = LoggerPinoSingleton;
//pino-elasticsearch -> hỗ trợ đẩy thẳng log vào elasticsearch
//pino-socket -> hỗ trợ đẩy log qua logstash thông qua giao thức TCP HOẶC HTTP
//   const stream = pinoElastic({
//     index: "nodejs-logs",
//     node: "http://localhost:9200", // Địa chỉ Elasticsearch
//   });
//# sourceMappingURL=logger.config.js.map