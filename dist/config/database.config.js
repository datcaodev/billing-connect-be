"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.DatabaseORMSingleton = void 0;
const envConfig_utils_1 = require("../utils/envConfig.utils");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const path_1 = require("path");
class DatabaseORMSingleton {
    constructor() {
    }
    static getInstance() {
        if (!DatabaseORMSingleton.instance) {
            DatabaseORMSingleton.instance = new typeorm_1.DataSource({
                type: "postgres",
                host: envConfig_utils_1.env.DB_HOST,
                port: envConfig_utils_1.env.DB_PORT,
                username: envConfig_utils_1.env.DB_USER,
                password: envConfig_utils_1.env.DB_PASSWORD,
                database: envConfig_utils_1.env.DB_NAME,
                synchronize: true, // Chỉ bật synchronize khi môi trường là development
                logging: true, // log query
                extra: {
                    options: "-c timezone=Asia/Ho_Chi_Minh"
                },
                entities: [
                    (0, path_1.join)(__dirname, "../entity/**/*.{ts,js}")
                ],
                migrations: [
                    (0, path_1.join)(__dirname, "../migration/**/*.{ts,js}")
                ]
            });
            ;
        }
        return DatabaseORMSingleton.instance;
    }
    // Hàm này dùng để khởi tạo kết nối
    static async getConnect() {
        const dataSource = DatabaseORMSingleton.getInstance();
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
    }
    // Đóng kết nối khi không cần nữa
    static async close() {
        const dataSource = DatabaseORMSingleton.getInstance();
        if (dataSource.isInitialized) {
            await dataSource.destroy();
        }
    }
}
exports.DatabaseORMSingleton = DatabaseORMSingleton;
exports.AppDataSource = DatabaseORMSingleton.getInstance();
//# sourceMappingURL=database.config.js.map