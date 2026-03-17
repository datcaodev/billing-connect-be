import { z } from "zod";
import { currencyUnitData } from "../datas/currencyUnit.data";
import { basePaginationRequestSchema } from "./pagination.schema";

const currencyValues = currencyUnitData.map(
    (item) => item.value
) as [string, ...string[]];

export const createExchangeRateSchema = z.object({
    targetCurrency: z.enum(currencyValues, {
        required_error: "Thiếu tham số bắt buộc: 'targetCurrency'",
        invalid_type_error: "Sai kiểu dữ liệu: 'targetCurrency' phải là String",
    }),
    rate: z
        .string({
            required_error: "Thiếu tham số bắt buộc: 'rate'",
            invalid_type_error: "Sai kiểu dữ liệu: 'rate' phải là String",
        })
})

export const searchExchangeRateHistorySchema = z.object({
    currency: z.string({
        required_error: "Thiếu tham số bắt buộc: 'currency'",
        invalid_type_error: "Sai kiểu dữ liệu: 'currency' phải là String",
    }).optional(),
    startDate: z
        .string({
            required_error: "Thiếu tham số bắt buộc: 'startDate'",
            invalid_type_error: "Sai kiểu dữ liệu: 'startDate' phải là String",
        }).regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/, {
            message: "startDate phải có định dạng dd/mm/yyyy",
        }).optional(),
}).merge(basePaginationRequestSchema)