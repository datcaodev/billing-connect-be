"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeRateService = void 0;
const baseService_core_1 = require("../core/baseService.core");
const repositories_1 = require("../repositories");
const exchangeRateHistory_repository_1 = require("../repositories/exchangeRateHistory.repository");
const decimal_js_1 = __importDefault(require("decimal.js"));
const utils_1 = require("../utils");
const basePagination_core_1 = require("../core/basePagination.core");
const exchangeRate_dto_1 = require("../dto/exchangeRate.dto");
class ExchangeRateService extends baseService_core_1.BaseService {
    constructor() {
        super(...arguments);
        this.create = (data) => {
            return this.handleWithTryCatch(async () => {
                const { targetCurrency, rate } = data;
                const oldExchangeRate = await repositories_1.exchangeRateRepository.findData();
                const newRate = new decimal_js_1.default(rate);
                const oldRate = new decimal_js_1.default(oldExchangeRate.rate);
                // nếu tỷ giá không thay đổi thì return true và không lưu log
                if (oldExchangeRate.currency === targetCurrency && oldRate.equals(newRate)) {
                    return true;
                }
                // update tỷ giá
                const dataSave = await repositories_1.exchangeRateRepository.upsert({
                    currency: targetCurrency,
                    rate,
                });
                // lưu log tỷ giá
                await exchangeRateHistory_repository_1.exchangeRateHistoryRepository.create({
                    currency: oldExchangeRate.currency,
                    rate: oldExchangeRate.rate,
                    startDate: oldExchangeRate.updated_at, // lưu ngày áp dụng là ngày update của bản ghi cũ
                    endDate: dataSave.updated_at, // lưu ngày kết thúc là ngày update của bản ghi mới
                });
                return true;
            });
        };
        this.searchExchangeRateHistory = (data) => {
            return this.handleWithTryCatch(async () => {
                const { page, size, sortBy } = data;
                const pagination = (0, utils_1.getPagination)({ page, size, sortBy });
                const result = await exchangeRateHistory_repository_1.exchangeRateHistoryRepository.searchExchangeRateHistory(data, pagination);
                const dataMappingDTO = (0, basePagination_core_1.mapPaginatedData)({
                    dtoClass: exchangeRate_dto_1.ExchangeRateHistoryPaginationDto,
                    entities: result.result,
                    skip: pagination.skip,
                    take: pagination.take,
                    total: result.total
                });
                return dataMappingDTO;
            });
        };
        this.getExchangeRate = () => {
            return this.handleWithTryCatch(async () => {
                const data = await repositories_1.exchangeRateRepository.findData();
                return (0, basePagination_core_1.mapData)({
                    dtoClass: exchangeRate_dto_1.ExchangeRateDto,
                    entities: data,
                });
            });
        };
    }
}
exports.exchangeRateService = new ExchangeRateService();
//# sourceMappingURL=exchangeRate.service.js.map