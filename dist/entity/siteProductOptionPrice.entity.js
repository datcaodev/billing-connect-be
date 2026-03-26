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
exports.SiteProductOptionPrice = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_core_1 = require("../core/baseEntity.core");
let SiteProductOptionPrice = class SiteProductOptionPrice extends baseEntity_core_1.BaseTimeEntity {
};
exports.SiteProductOptionPrice = SiteProductOptionPrice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SiteProductOptionPrice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", unique: true, nullable: true, default: () => "gen_random_uuid()" }),
    __metadata("design:type", String)
], SiteProductOptionPrice.prototype, "guid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SiteProductOptionPrice.prototype, "site_product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SiteProductOptionPrice.prototype, "product_sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], SiteProductOptionPrice.prototype, "copies", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], SiteProductOptionPrice.prototype, "retail_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SiteProductOptionPrice.prototype, "discount_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'CN' }),
    __metadata("design:type", String)
], SiteProductOptionPrice.prototype, "currency", void 0);
exports.SiteProductOptionPrice = SiteProductOptionPrice = __decorate([
    (0, typeorm_1.Entity)("site_product_option_price")
], SiteProductOptionPrice);
//# sourceMappingURL=siteProductOptionPrice.entity.js.map