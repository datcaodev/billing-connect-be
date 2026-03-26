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
exports.AgencyPackagesAllDto = exports.AgencyInfoDto = exports.AgencyPackageDto = exports.AgencyPackagePriceDto = void 0;
const class_transformer_1 = require("class-transformer");
let AgencyPackagePriceDto = class AgencyPackagePriceDto {
};
exports.AgencyPackagePriceDto = AgencyPackagePriceDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackagePriceDto.prototype, "guid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackagePriceDto.prototype, "productSku", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackagePriceDto.prototype, "copies", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackagePriceDto.prototype, "retailPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackagePriceDto.prototype, "settlementPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackagePriceDto.prototype, "finalPrice", void 0);
exports.AgencyPackagePriceDto = AgencyPackagePriceDto = __decorate([
    (0, class_transformer_1.Exclude)()
], AgencyPackagePriceDto);
let AgencyPackageDto = class AgencyPackageDto {
};
exports.AgencyPackageDto = AgencyPackageDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackageDto.prototype, "guid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackageDto.prototype, "skuId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackageDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackageDto.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackageDto.prototype, "highFlowSize", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackageDto.prototype, "planType", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackageDto.prototype, "countryMcc", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackageDto.prototype, "countryName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyPackageDto.prototype, "areaName", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => AgencyPackagePriceDto),
    __metadata("design:type", Array)
], AgencyPackageDto.prototype, "prices", void 0);
exports.AgencyPackageDto = AgencyPackageDto = __decorate([
    (0, class_transformer_1.Exclude)()
], AgencyPackageDto);
let AgencyInfoDto = class AgencyInfoDto {
};
exports.AgencyInfoDto = AgencyInfoDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyInfoDto.prototype, "guid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyInfoDto.prototype, "code", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyInfoDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyInfoDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyInfoDto.prototype, "phone", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyInfoDto.prototype, "address", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], AgencyInfoDto.prototype, "website", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], AgencyInfoDto.prototype, "formula", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "formula_note" }),
    __metadata("design:type", String)
], AgencyInfoDto.prototype, "formulaNote", void 0);
exports.AgencyInfoDto = AgencyInfoDto = __decorate([
    (0, class_transformer_1.Exclude)()
], AgencyInfoDto);
let AgencyPackagesAllDto = class AgencyPackagesAllDto {
};
exports.AgencyPackagesAllDto = AgencyPackagesAllDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => AgencyInfoDto),
    __metadata("design:type", AgencyInfoDto)
], AgencyPackagesAllDto.prototype, "agency", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => AgencyPackageDto),
    __metadata("design:type", Array)
], AgencyPackagesAllDto.prototype, "packages", void 0);
exports.AgencyPackagesAllDto = AgencyPackagesAllDto = __decorate([
    (0, class_transformer_1.Exclude)()
], AgencyPackagesAllDto);
//# sourceMappingURL=agencyPrice.dto.js.map