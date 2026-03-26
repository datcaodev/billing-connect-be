"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillionProductDetailDto = exports.BillionProductPaginationDto = exports.BillionProductPriceDto = void 0;
const class_transformer_1 = require("class-transformer");
let BillionProductPriceDto = class BillionProductPriceDto {
};
exports.BillionProductPriceDto = BillionProductPriceDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BillionProductPriceDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "product_sku" }),
    __metadata("design:type", String)
], BillionProductPriceDto.prototype, "productSku", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BillionProductPriceDto.prototype, "copies", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "retail_price" }),
    __metadata("design:type", String)
], BillionProductPriceDto.prototype, "retailPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "settlement_price" }),
    __metadata("design:type", String)
], BillionProductPriceDto.prototype, "settlementPrice", void 0);
exports.BillionProductPriceDto = BillionProductPriceDto = __decorate([
    (0, class_transformer_1.Exclude)()
], BillionProductPriceDto);
let BillionProductPaginationDto = class BillionProductPaginationDto {
};
exports.BillionProductPaginationDto = BillionProductPaginationDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], BillionProductPaginationDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "sku_id" }),
    __metadata("design:type", String)
], BillionProductPaginationDto.prototype, "skuId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BillionProductPaginationDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BillionProductPaginationDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "high_flow_size" }),
    __metadata("design:type", String)
], BillionProductPaginationDto.prototype, "highFlowSize", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "plan_type" }),
    __metadata("design:type", String)
], BillionProductPaginationDto.prototype, "planType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => BillionProductPriceDto),
    __metadata("design:type", Array)
], BillionProductPaginationDto.prototype, "prices", void 0);
exports.BillionProductPaginationDto = BillionProductPaginationDto = __decorate([
    (0, class_transformer_1.Exclude)()
], BillionProductPaginationDto);
let BillionProductDetailDto = class BillionProductDetailDto extends BillionProductPaginationDto {
};
exports.BillionProductDetailDto = BillionProductDetailDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "days", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "capacity", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "limit_flow_speed" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "limitFlowSpeed", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "hotspot_support" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "hotspotSupport", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "product_id" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "productId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "product_name" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "productName", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "apn" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "apn", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "operator_info" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "operatorInfo", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "validity_period" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "validityPeriod", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "acceleration_support" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "accelerationSupport", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "desc", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "point_contact_type" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "pointContactType", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "time_zone" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "timeZone", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "point_contact_hours" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "pointContactHours", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "usage_count" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "usageCount", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "estimated_use_time_flag" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "estimatedUseTimeFlag", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "estimated_use_time_gap_hours" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "estimatedUseTimeGapHours", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "apply_to_device" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "applyToDevice", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "apply_to_device_type" }),
    __metadata("design:type", Object)
], BillionProductDetailDto.prototype, "applyToDeviceType", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "rechargeable_product" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "rechargeableProduct", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "rechargeable_product_series_id" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "rechargeableProductSeriesId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "rechargeable_product_series_name" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "rechargeableProductSeriesName", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "provider" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "provider", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "refund_policy" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "refundPolicy", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "speed_limit_rule" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "speedLimitRule", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "carrier_validity_peroid" }),
    __metadata("design:type", String)
], BillionProductDetailDto.prototype, "carrierValidityPeroid", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "country" }),
    __metadata("design:type", Object)
], BillionProductDetailDto.prototype, "country", void 0);
exports.BillionProductDetailDto = BillionProductDetailDto = __decorate([
    (0, class_transformer_1.Exclude)()
], BillionProductDetailDto);
//# sourceMappingURL=billionProduct.dto.js.map