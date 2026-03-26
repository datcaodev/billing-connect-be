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
exports.SiteCategory = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_core_1 = require("../core/baseEntity.core");
let SiteCategory = class SiteCategory extends baseEntity_core_1.BaseTimeEntity {
};
exports.SiteCategory = SiteCategory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SiteCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", nullable: true, default: () => "gen_random_uuid()" }),
    __metadata("design:type", String)
], SiteCategory.prototype, "guid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int4", nullable: true }),
    __metadata("design:type", Number)
], SiteCategory.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SiteCategory.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], SiteCategory.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], SiteCategory.prototype, "country_mcc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "smallint", nullable: true }),
    __metadata("design:type", Number)
], SiteCategory.prototype, "position", void 0);
exports.SiteCategory = SiteCategory = __decorate([
    (0, typeorm_1.Entity)("site_categories")
], SiteCategory);
//# sourceMappingURL=siteCategory.entity.js.map