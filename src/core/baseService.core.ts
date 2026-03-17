import { QueryRunner } from "typeorm";
import { AppDataSource } from "../config/database.config";
import { logger } from "../config/sever.config";
import { AppError } from "../utils/errors/AppError.error";
import { convertViToEn } from "../utils/convert.util";

export class BaseService {
  protected async handleWithTryCatch<T>(
    handleRequest: () => Promise<T>
  ): Promise<T> {
    try {
      return await handleRequest();
    } catch (error) {
      if (error instanceof AppError) {
        const errorConvert = convertViToEn(error.message)
        logger.error(errorConvert);
      }
      throw error;
    }
  }

  // Hàm xử lý với transaction + try/catch
  protected async handleWithTransaction<T>(
    handleRequest: (queryRunner: QueryRunner) => Promise<T>
  ): Promise<T> {
    const queryRunner = AppDataSource.createQueryRunner();

    // Kết nối và bắt đầu transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Thực hiện yêu cầu với queryRunner (truyền vào transaction)
      const result = await handleRequest(queryRunner);

      // Nếu tất cả thành công, commit transaction
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      // Nếu có lỗi, rollback transaction
      logger.error("LOI TRANSACTION");
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Đảm bảo luôn release queryRunner
      await queryRunner.release();
    }
  }
}
