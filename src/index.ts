import { app, logger } from "./config/sever.config";
import { env } from "./utils/envConfig.utils";
import appRouter from "./routers"; // Import router
import { AppDataSource, DatabaseORMSingleton } from "./config/database.config";

const startServer = async () => {
  try {
    // Kết nối database
    await DatabaseORMSingleton.getConnect();
    // Đọc nội dung file setup.sql
    // const sqlFilePath = path.join(__dirname, "../initdb.sql");
    // const createTablesSQL = fs.readFileSync(sqlFilePath, "utf8");

    const tz = await AppDataSource.query("SHOW timezone");
    console.log(tz);

    // Thực thi các câu lệnh SQL để tạo bảng
    // await (await data.getConnect()).query(createTablesSQL);
    logger.info("Database connected successfully!");

    // Thiết lập các router
    app.use(appRouter);

    // Chỉ chạy server nếu kết nối thành công
    const server = app.listen(env.PORT, () => {
      logger.info(`Server is running`);
    });

    // Xử lý tín hiệu đóng server
    const onCloseSignal = () => {
      logger.info("SIGINT received, shutting down...");
      server.close(() => {
        logger.info("Server closed");
        process.exit();
      });
      setTimeout(() => process.exit(1), 10000).unref(); // Buộc tắt sau 10 giây
    };

    //
    process.on("SIGINT", onCloseSignal);
    process.on("SIGTERM", onCloseSignal);
  } catch (error) {

    console.log(error);
    logger.error("Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
