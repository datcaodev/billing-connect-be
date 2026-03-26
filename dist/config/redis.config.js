"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const sever_config_1 = require("./sever.config");
const utils_1 = require("../utils");
class RedisSingleton {
    static getInstance(db = 0) {
        // Nếu instance cho DB này chưa tồn tại thì khởi tạo
        if (!this.instances.has(db)) {
            const client = new ioredis_1.default({
                host: utils_1.env.REDIS_HOST,
                port: utils_1.env.REDIS_PORT,
                password: utils_1.env.REDIS_PASSWORD,
                db, // <-- chọn DB theo tham số
                retryStrategy: (times) => {
                    const delay = Math.min(times * 100, 2000);
                    return delay;
                },
            });
            client.on("connect", () => sever_config_1.logger.info(`✅ Connected to Redis (DB ${db})`));
            client.on("error", (err) => sever_config_1.logger.error(`❌ Redis (DB ${db}) connect error:`, err));
            this.instances.set(db, client);
        }
        return this.instances.get(db);
    }
}
// Lưu danh sách các Redis instance theo DB index
RedisSingleton.instances = new Map();
exports.default = RedisSingleton;
//# sourceMappingURL=redis.config.js.map