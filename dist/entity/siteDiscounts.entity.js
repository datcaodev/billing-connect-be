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
exports.SiteDiscount = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_core_1 = require("../core/baseEntity.core");
let SiteDiscount = class SiteDiscount extends baseEntity_core_1.BaseTimeEntity {
};
exports.SiteDiscount = SiteDiscount;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SiteDiscount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", unique: true, nullable: true, default: () => "gen_random_uuid()" }),
    __metadata("design:type", String)
], SiteDiscount.prototype, "guid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true, nullable: false }),
    __metadata("design:type", String)
], SiteDiscount.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: false }),
    __metadata("design:type", String)
], SiteDiscount.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], SiteDiscount.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], SiteDiscount.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], SiteDiscount.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], SiteDiscount.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SiteDiscount.prototype, "usage_limit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SiteDiscount.prototype, "used_count", void 0);
exports.SiteDiscount = SiteDiscount = __decorate([
    (0, typeorm_1.Entity)("site_discounts")
], SiteDiscount);
//# sourceMappingURL=siteDiscounts.entity.js.map