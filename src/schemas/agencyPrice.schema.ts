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
        highFlowSize: z.string().nullable(),
        planType: z.string().nullable(),
        prices: z.array(z.object({
            productSku: z.string(),
            copies: z.string(),
            retailPrice: z.number(),
            settlementPrice: z.number(),
        })),
    })).min(1, "Danh sách gói không được để trống"),
});

export type IAgencyPriceRequest = z.infer<typeof agencyPriceSchema>;

import { basePaginationRequestSchema } from "./pagination.schema";

export const agencyGuidParamSchema = z.object({
    agencyGuid: z.string({
        required_error: "Thiếu tham số bắt buộc: 'agencyGuid'",
    }).uuid("guid đại lý không hợp lệ"),
});

export const getAgencyPackagesQuerySchema = basePaginationRequestSchema.extend({
    productSku: z.string().optional(),
    name: z.string().optional(),
});

export const getAgencyPackagesFilterQuerySchema = basePaginationRequestSchema.extend({
    productSku: z.string().optional(),
    name: z.string().optional(),
    regionGuid: z.string().uuid().optional(),
    countryGuid: z.preprocess((val) => {
        if (typeof val === "string") return [val];
        return val;
    }, z.array(z.string().uuid())).optional(),
});

export type IGetAgencyPackagesQuery = z.infer<typeof getAgencyPackagesQuerySchema>;

export const getAgencyPackagesAllQuerySchema = z.object({
    productSku: z.string().optional(),
    name: z.string().optional(),
});

export type IGetAgencyPackagesAllQuery = z.infer<typeof getAgencyPackagesAllQuerySchema>;

export const updateAgencyPackagePriceSchema = z.object({
    agencyGuid: z.string().uuid("agencyGuid không hợp lệ"),
    copiesGuid: z.string().uuid("copiesGuid không hợp lệ"),
    price: z.number({
        required_error: "Thiếu giá cập nhật",
        invalid_type_error: "Giá phải là số",
    }).min(0, "Giá không được nhỏ hơn 0"),
});

export type IGetAgencyPackagesFilterQuery = z.infer<typeof getAgencyPackagesFilterQuerySchema>;
export type IUpdateAgencyPackagePrice = z.infer<typeof updateAgencyPackagePriceSchema>;
