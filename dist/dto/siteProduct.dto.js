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
exports.SiteProductVariantWithPriceDto = exports.SiteProductOptionPriceSimpleDto = exports.DiscountSimpleDto = exports.SiteProductPaginationDto = exports.SiteProductVariantDto = exports.SiteProductOptionPriceDto = exports.CategoryDto = void 0;
const class_transformer_1 = require("class-transformer");
let CategoryDto = class CategoryDto {
};
exports.CategoryDto = CategoryDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CategoryDto.prototype, "guid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CategoryDto.prototype, "code", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "country_mcc" }),
    __metadata("design:type", String)
], CategoryDto.prototype, "countryMcc", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => CategoryDto),
    __metadata("design:type", CategoryDto)
], CategoryDto.prototype, "parent", void 0);
exports.CategoryDto = CategoryDto = __decorate([
    (0, class_transformer_1.Exclude)()
], CategoryDto);
let SiteProductOptionPriceDto = class SiteProductOptionPriceDto {
};
exports.SiteProductOptionPriceDto = SiteProductOptionPriceDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteProductOptionPriceDto.prototype, "guid", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "product_sku" }),
    __metadata("design:type", String)
], SiteProductOptionPriceDto.prototype, "productSku", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SiteProductOptionPriceDto.prototype, "copies", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "original_price" }),
    __metadata("design:type", Number)
], SiteProductOptionPriceDto.prototype, "originalPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "final_price" }),
    __metadata("design:type", Number)
], SiteProductOptionPriceDto.prototype, "finalPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteProductOptionPriceDto.prototype, "currency", void 0);
exports.SiteProductOptionPriceDto = SiteProductOptionPriceDto = __decorate([
    (0, class_transformer_1.Exclude)()
], SiteProductOptionPriceDto);
let SiteProductVariantDto = class SiteProductVariantDto {
};
exports.SiteProductVariantDto = SiteProductVariantDto;
__decorate([
    (0, class_transformer_1.Expose)({ name: "product_sku" }),
    __metadata("design:type", String)
], SiteProductVariantDto.prototype, "productSku", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "plan_type" }),
    __metadata("design:type", String)
], SiteProductVariantDto.prototype, "planType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteProductVariantDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteProductVariantDto.prototype, "status", void 0);
exports.SiteProductVariantDto = SiteProductVariantDto = __decorate([
    (0, class_transformer_1.Exclude)()
], SiteProductVariantDto);
let SiteProductPaginationDto = class SiteProductPaginationDto {
};
exports.SiteProductPaginationDto = SiteProductPaginationDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteProductPaginationDto.prototype, "guid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteProductPaginationDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteProductPaginationDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteProductPaginationDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "image_url" }),
    __metadata("design:type", String)
], SiteProductPaginationDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteProductPaginationDto.prototype, "slug", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "created_at" }),
    __metadata("design:type", String)
], SiteProductPaginationDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "updated_at" }),
    __metadata("design:type", String)
], SiteProductPaginationDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => SiteProductVariantDto),
    __metadata("design:type", Array)
], SiteProductPaginationDto.prototype, "variants", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => CategoryDto),
    __metadata("design:type", Array)
], SiteProductPaginationDto.prototype, "categories", void 0);
exports.SiteProductPaginationDto = SiteProductPaginationDto = __decorate([
    (0, class_transformer_1.Exclude)()
], SiteProductPaginationDto);
let DiscountSimpleDto = class DiscountSimpleDto {
};
exports.DiscountSimpleDto = DiscountSimpleDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DiscountSimpleDto.prototype, "guid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DiscountSimpleDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], DiscountSimpleDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], DiscountSimpleDto.prototype, "value", void 0);
exports.DiscountSimpleDto = DiscountSimpleDto = __decorate([
    (0, class_transformer_1.Exclude)()
], DiscountSimpleDto);
let SiteProductOptionPriceSimpleDto = class SiteProductOptionPriceSimpleDto {
};
exports.SiteProductOptionPriceSimpleDto = SiteProductOptionPriceSimpleDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteProductOptionPriceSimpleDto.prototype, "guid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SiteProductOptionPriceSimpleDto.prototype, "copies", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "retail_price" }),
    __metadata("design:type", Number)
], SiteProductOptionPriceSimpleDto.prototype, "retailPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteProductOptionPriceSimpleDto.prototype, "currency", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => DiscountSimpleDto),
    __metadata("design:type", DiscountSimpleDto)
], SiteProductOptionPriceSimpleDto.prototype, "discount", void 0);
exports.SiteProductOptionPriceSimpleDto = SiteProductOptionPriceSimpleDto = __decorate([
    (0, class_transformer_1.Exclude)()
], SiteProductOptionPriceSimpleDto);
let SiteProductVariantWithPriceDto = class SiteProductVariantWithPriceDto {
};
exports.SiteProductVariantWithPriceDto = SiteProductVariantWithPriceDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteProductVariantWithPriceDto.prototype, "guid", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "product_sku" }),
    __metadata("design:type", String)
], SiteProductVariantWithPriceDto.prototype, "productSku", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteProductVariantWithPriceDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "name_original" }),
    __metadata("design:type", String)
], SiteProductVariantWithPriceDto.prototype, "nameOriginal", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "plan_type" }),
    __metadata("design:type", String)
], SiteProductVariantWithPriceDto.prototype, "planType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => SiteProductOptionPriceSimpleDto),
    __metadata("design:type", Array)
], SiteProductVariantWithPriceDto.prototype, "options", void 0);
exports.SiteProductVariantWithPriceDto = SiteProductVariantWithPriceDto = __decorate([
    (0, class_transformer_1.Exclude)()
], SiteProductVariantWithPriceDto);
//# sourceMappingURL=siteProduct.dto.js.map