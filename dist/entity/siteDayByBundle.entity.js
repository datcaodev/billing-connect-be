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
exports.SiteDayByBundle = void 0;
const typeorm_1 = require("typeorm");
const siteDiscounts_entity_1 = require("./siteDiscounts.entity");
const baseEntity_core_1 = require("../core/baseEntity.core");
let SiteDayByBundle = class SiteDayByBundle extends baseEntity_core_1.BaseTimeEntity {
};
exports.SiteDayByBundle = SiteDayByBundle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SiteDayByBundle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], SiteDayByBundle.prototype, "site_product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    __metadata("design:type", String)
], SiteDayByBundle.prototype, "product_sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], SiteDayByBundle.prototype, "base_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SiteDayByBundle.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SiteDayByBundle.prototype, "discount_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => siteDiscounts_entity_1.SiteDiscount),
    (0, typeorm_1.JoinColumn)({ name: "discount_id", referencedColumnName: "id" }),
    __metadata("design:type", siteDiscounts_entity_1.SiteDiscount)
], SiteDayByBundle.prototype, "discount", void 0);
exports.SiteDayByBundle = SiteDayByBundle = __decorate([
    (0, typeorm_1.Entity)("site_day_by_bundle")
], SiteDayByBundle);
//# sourceMappingURL=siteDayByBundle.entity.js.map