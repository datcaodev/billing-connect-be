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
exports.SiteCategoryDto = void 0;
const class_transformer_1 = require("class-transformer");
class SiteCategoryDto {
}
exports.SiteCategoryDto = SiteCategoryDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteCategoryDto.prototype, "guid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteCategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SiteCategoryDto.prototype, "code", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "country_mcc" }),
    __metadata("design:type", String)
], SiteCategoryDto.prototype, "countryMcc", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], SiteCategoryDto.prototype, "position", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "is_active" }),
    __metadata("design:type", Boolean)
], SiteCategoryDto.prototype, "isActive", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "created_at" }),
    __metadata("design:type", Date)
], SiteCategoryDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "updated_at" }),
    __metadata("design:type", Date)
], SiteCategoryDto.prototype, "updatedAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => SiteCategoryDto),
    __metadata("design:type", SiteCategoryDto)
], SiteCategoryDto.prototype, "area", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => SiteCategoryDto),
    __metadata("design:type", Array)
], SiteCategoryDto.prototype, "countries", void 0);
//# sourceMappingURL=siteCategory.dto.js.map