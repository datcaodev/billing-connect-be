"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const database_config_1 = require("../config/database.config");
const sever_config_1 = require("../config/sever.config");
const AppError_error_1 = require("../utils/errors/AppError.error");
const convert_util_1 = require("../utils/convert.util");
class BaseService {
    async handleWithTryCatch(handleRequest) {
        try {
            return await handleRequest();
        }
        catch (error) {
            if (error instanceof AppError_error_1.AppError) {
                const errorConvert = (0, convert_util_1.convertViToEn)(error.message);
                sever_config_1.logger.error(errorConvert);
            }
            throw error;
        }
    }
    // Hàm xử lý với transaction + try/catch
    async handleWithTransaction(handleRequest) {
        const queryRunner = database_config_1.AppDataSource.createQueryRunner();
        // Kết nối và bắt đầu transaction
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Thực hiện yêu cầu với queryRunner (truyền vào transaction)
            const result = await handleRequest(queryRunner);
            // Nếu tất cả thành công, commit transaction
            await queryRunner.commitTransaction();
            return result;
        }
        catch (error) {
            // Nếu có lỗi, rollback transaction
            sever_config_1.logger.error("LOI TRANSACTION");
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            // Đảm bảo luôn release queryRunner
            await queryRunner.release();
        }
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=baseService.core.js.map