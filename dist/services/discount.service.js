"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discountService = void 0;
const baseService_core_1 = require("../core/baseService.core");
const discount_repository_1 = require("../repositories/discount.repository");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const basePagination_core_1 = require("../core/basePagination.core");
const discount_dto_1 = require("../dto/discount.dto");
const ConflictError_error_1 = require("../utils/errors/ConflictError.error");
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
const class_transformer_1 = require("class-transformer");
dayjs_1.default.extend(customParseFormat_1.default);
const dateFormat = "DD/MM/YYYY HH:mm:ss";
class DiscountService extends baseService_core_1.BaseService {
    async createDiscount(data) {
        return await this.handleWithTryCatch(async () => {
            const { name, type, value, startDate, endDate } = data;
            // Kiểm tra tên đã tồn tại chưa
            const existingDiscount = await discount_repository_1.discountRepository.findByName(name);
            if (existingDiscount) {
                throw new ConflictError_error_1.ConflictError("Tên giảm giá đã tồn tại");
            }
            // Tạo mới discount
            const newDiscount = await discount_repository_1.discountRepository.createDiscount({
                name,
                type,
                value,
                start_date: (0, dayjs_1.default)(startDate, dateFormat).toDate(),
                end_date: (0, dayjs_1.default)(endDate, dateFormat).toDate(),
                is_active: true,
                used_count: 0
            });
            return newDiscount;
        });
    }
    async searchDiscounts(data) {
        return await this.handleWithTryCatch(async () => {
            const { page, size, sortBy } = data;
            const pagination = (0, utils_1.getPagination)({ page, size, sortBy });
            const [result, total] = await discount_repository_1.discountRepository.searchDiscounts(data, pagination);
            const now = (0, dayjs_1.default)();
            const resultWithStatus = result.map(discount => {
                let status = enums_1.DiscountStatus.ACTIVE;
                const start = (0, dayjs_1.default)(discount.start_date);
                const end = (0, dayjs_1.default)(discount.end_date);
                if (now.isBefore(start)) {
                    status = enums_1.DiscountStatus.INACTIVE;
                }
                else if (now.isAfter(end)) {
                    status = enums_1.DiscountStatus.EXPIRED;
                }
                return Object.assign(Object.assign({}, discount), { status });
            });
            return (0, basePagination_core_1.mapPaginatedData)({
                dtoClass: discount_dto_1.DiscountDto,
                entities: resultWithStatus,
                skip: pagination.skip,
                take: pagination.take,
                total
            });
        });
    }
    async searchDiscountsAll(data) {
        return await this.handleWithTryCatch(async () => {
            const result = await discount_repository_1.discountRepository.searchDiscountsAll(data);
            const now = (0, dayjs_1.default)();
            const resultWithStatus = result.map(discount => {
                let status = enums_1.DiscountStatus.ACTIVE;
                const start = (0, dayjs_1.default)(discount.start_date);
                const end = (0, dayjs_1.default)(discount.end_date);
                if (now.isBefore(start)) {
                    status = enums_1.DiscountStatus.INACTIVE;
                }
                else if (now.isAfter(end)) {
                    status = enums_1.DiscountStatus.EXPIRED;
                }
                return Object.assign(Object.assign({}, discount), { status });
            });
            return (0, class_transformer_1.plainToInstance)(discount_dto_1.DiscountDto, resultWithStatus);
        });
    }
}
exports.discountService = new DiscountService();
//# sourceMappingURL=discount.service.js.map