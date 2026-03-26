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
exports.SiteProduct = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_core_1 = require("../core/baseEntity.core");
let SiteProduct = class SiteProduct extends baseEntity_core_1.BaseTimeEntity {
};
exports.SiteProduct = SiteProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SiteProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", unique: true, nullable: true }),
    __metadata("design:type", String)
], SiteProduct.prototype, "guid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 500, nullable: true }),
    __metadata("design:type", String)
], SiteProduct.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SiteProduct.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SiteProduct.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], SiteProduct.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SiteProduct.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], SiteProduct.prototype, "slug", void 0);
exports.SiteProduct = SiteProduct = __decorate([
    (0, typeorm_1.Entity)("site_products")
], SiteProduct);
//# sourceMappingURL=siteProduct.entity.js.map