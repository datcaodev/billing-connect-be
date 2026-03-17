import { env } from "../utils/envConfig.utils";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";

export class DatabaseORMSingleton {
  private static instance: DataSource;

  private constructor() {
  }

  public static getInstance(): DataSource {
    if (!DatabaseORMSingleton.instance) {
      DatabaseORMSingleton.instance = new DataSource({
        type: "postgres",
        host: env.DB_HOST,
        port: env.DB_PORT,
        username: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        synchronize: true, // Chỉ bật synchronize khi môi trường là development
        logging: true, // log query
        extra: {
          options: "-c timezone=Asia/Ho_Chi_Minh"
        },
        entities: [// Điều chỉnh lại đường dẫn từ src/config đến src/entity
          join(__dirname, "../entity/**/*.{ts,js}")],
        migrations: [// Điều chỉnh lại đường dẫn từ src/config đến src/entity
          join(__dirname, "../migration/**/*.{ts,js}")]
      });
      ;
    }

    return DatabaseORMSingleton.instance;
  }

  // Hàm này dùng để khởi tạo kết nối
  public static async getConnect(): Promise<void> {
    const dataSource = DatabaseORMSingleton.getInstance();
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
  }

  // Đóng kết nối khi không cần nữa
  public static async close(): Promise<void> {
    const dataSource = DatabaseORMSingleton.getInstance();
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

export const AppDataSource = DatabaseORMSingleton.getInstance();