"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sever_config_1 = require("./config/sever.config");
const envConfig_utils_1 = require("./utils/envConfig.utils");
const routers_1 = __importDefault(require("./routers")); // Import router
const database_config_1 = require("./config/database.config");
const startServer = async () => {
    try {
        // Kết nối database
        await database_config_1.DatabaseORMSingleton.getConnect();
        // Đọc nội dung file setup.sql
        // const sqlFilePath = path.join(__dirname, "../initdb.sql");
        // const createTablesSQL = fs.readFileSync(sqlFilePath, "utf8");
        const tz = await database_config_1.AppDataSource.query("SHOW timezone");
        console.log(tz);
        // Thực thi các câu lệnh SQL để tạo bảng
        // await (await data.getConnect()).query(createTablesSQL);
        sever_config_1.logger.info("Database connected successfully!");
        // Thiết lập các router
        sever_config_1.app.use(routers_1.default);
        // Chỉ chạy server nếu kết nối thành công
        const server = sever_config_1.app.listen(envConfig_utils_1.env.PORT, () => {
            sever_config_1.logger.info(`Server is running`);
        });
        // Xử lý tín hiệu đóng server
        const onCloseSignal = () => {
            sever_config_1.logger.info("SIGINT received, shutting down...");
            server.close(() => {
                sever_config_1.logger.info("Server closed");
                process.exit();
            });
            setTimeout(() => process.exit(1), 10000).unref(); // Buộc tắt sau 10 giây
        };
        //
        process.on("SIGINT", onCloseSignal);
        process.on("SIGTERM", onCloseSignal);
    }
    catch (error) {
        console.log(error);
        sever_config_1.logger.error("Database connection failed:", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map