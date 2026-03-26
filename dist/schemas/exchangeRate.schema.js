"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchExchangeRateHistorySchema = exports.createExchangeRateSchema = void 0;
const zod_1 = require("zod");
const currencyUnit_data_1 = require("../datas/currencyUnit.data");
const pagination_schema_1 = require("./pagination.schema");
const currencyValues = currencyUnit_data_1.currencyUnitData.map((item) => item.value);
exports.createExchangeRateSchema = zod_1.z.object({
    targetCurrency: zod_1.z.enum(currencyValues, {
        required_error: "Thiếu tham số bắt buộc: 'targetCurrency'",
        invalid_type_error: "Sai kiểu dữ liệu: 'targetCurrency' phải là String",
    }),
    rate: zod_1.z
        .string({
        required_error: "Thiếu tham số bắt buộc: 'rate'",
        invalid_type_error: "Sai kiểu dữ liệu: 'rate' phải là String",
    })
});
exports.searchExchangeRateHistorySchema = zod_1.z.object({
    targetCurrency: zod_1.z.string({
        required_error: "Thiếu tham số bắt buộc: 'targetCurrency'",
        invalid_type_error: "Sai kiểu dữ liệu: 'targetCurrency' phải là String",
    }).optional(),
    startDate: zod_1.z
        .string({
        required_error: "Thiếu tham số bắt buộc: 'startDate'",
        invalid_type_error: "Sai kiểu dữ liệu: 'startDate' phải là String",
    }).regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/, {
        message: "startDate phải có định dạng dd/mm/yyyy",
    }).optional(),
}).merge(pagination_schema_1.basePaginationRequestSchema);
//# sourceMappingURL=exchangeRate.schema.js.map