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
exports.SiteProductCategoryMapping = void 0;
const typeorm_1 = require("typeorm");
const siteProduct_entity_1 = require("./siteProduct.entity");
const siteCategory_entity_1 = require("./siteCategory.entity");
const baseEntity_core_1 = require("../core/baseEntity.core");
let SiteProductCategoryMapping = class SiteProductCategoryMapping extends baseEntity_core_1.BaseTimeEntity {
};
exports.SiteProductCategoryMapping = SiteProductCategoryMapping;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SiteProductCategoryMapping.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], SiteProductCategoryMapping.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], SiteProductCategoryMapping.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => siteProduct_entity_1.SiteProduct),
    (0, typeorm_1.JoinColumn)({ name: "product_id" }),
    __metadata("design:type", siteProduct_entity_1.SiteProduct)
], SiteProductCategoryMapping.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => siteCategory_entity_1.SiteCategory),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", siteCategory_entity_1.SiteCategory)
], SiteProductCategoryMapping.prototype, "category", void 0);
exports.SiteProductCategoryMapping = SiteProductCategoryMapping = __decorate([
    (0, typeorm_1.Entity)("site_products_categories_mapping")
], SiteProductCategoryMapping);
//# sourceMappingURL=siteProductCategoryMapping.entity.js.map