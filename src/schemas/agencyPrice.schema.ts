import { z } from "zod";
import { PriceAdjustType } from "../enums/formula.enum";

export const agencyPriceSchema = z.object({
    agencyGuid: z.string({
        required_error: "Thiếu tham số bắt buộc: 'agencyGuid'",
        invalid_type_error: "Sai kiểu dữ liệu: 'agencyGuid' phải là String",
    }).uuid("agencyGuid không hợp lệ"),
    formula: z.nativeEnum(PriceAdjustType, {
        required_error: "Thiếu tham số bắt buộc: 'formula'",
        invalid_type_error: "Sai kiểu dữ liệu: 'formula' không hợp lệ",
    }),
    amount: z.number({
        invalid_type_error: "Sai kiểu dữ liệu: 'amount' phải là Number",
    }).optional(),
    remark: z.string({
        invalid_type_error: "Sai kiểu dữ liệu: 'remark' phải là String",
    }).optional(),
    packages: z.array(z.object({
        skuId: z.string(),
        type: z.string(),
        name: z.string(),
        highFlowSize: z.string(),
        planType: z.string(),
        prices: z.array(z.object({
            productSku: z.string(),
            copies: z.string(),
            retailPrice: z.string(),
            settlementPrice: z.string(),
        })),
    })).min(1, "Danh sách gói không được để trống"),
});

export type IAgencyPriceRequest = z.infer<typeof agencyPriceSchema>;

export const agencyGuidParamSchema = z.object({
    agencyGuid: z.string({
        required_error: "Thiếu tham số bắt buộc: 'agencyGuid'",
    }).uuid("guid đại lý không hợp lệ"),
});
