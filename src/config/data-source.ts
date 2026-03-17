import { DataSource } from "typeorm";
import { join } from "path";
import "reflect-metadata";
import { env } from "../utils";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: false, // Chỉ bật synchronize khi môi trường là development
  logging: false, // log query
  entities: [// Điều chỉnh lại đường dẫn từ src/config đến src/entity
    join(__dirname, "../entity/**/*.{ts,js}")],
  migrations: [// Điều chỉnh lại đường dẫn từ src/config đến src/entity
    join(__dirname, "../migration/**/*.{ts,js}")]
});