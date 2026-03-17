import Redis from "ioredis";
import { logger } from "./sever.config";
import { env } from "../utils";

class RedisSingleton {
  // Lưu danh sách các Redis instance theo DB index
  private static instances: Map<number, Redis> = new Map();

  static getInstance(db: number = 0): Redis {
    // Nếu instance cho DB này chưa tồn tại thì khởi tạo
    if (!this.instances.has(db)) {
      const client = new Redis({
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        password: env.REDIS_PASSWORD,
        db, // <-- chọn DB theo tham số
        retryStrategy: (times) => {
          const delay = Math.min(times * 100, 2000);
          return delay;
        },
      });

      client.on("connect", () => logger.info(`✅ Connected to Redis (DB ${db})`));
      client.on("error", (err) => logger.error(`❌ Redis (DB ${db}) connect error:`, err));

      this.instances.set(db, client);
    }

    return this.instances.get(db)!;
  }
}

export default RedisSingleton;
