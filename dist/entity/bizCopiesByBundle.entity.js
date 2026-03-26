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
exports.BizCopiesByBundle = void 0;
const typeorm_1 = require("typeorm");
const bizBundleByAgency_entity_1 = require("./bizBundleByAgency.entity");
const baseEntity_core_1 = require("../core/baseEntity.core");
let BizCopiesByBundle = class BizCopiesByBundle extends baseEntity_core_1.BaseTimeEntity {
};
exports.BizCopiesByBundle = BizCopiesByBundle;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BizCopiesByBundle.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", unique: true, nullable: true, default: () => "gen_random_uuid()" }),
    __metadata("design:type", String)
], BizCopiesByBundle.prototype, "guid", void 0);
__decorate([
    (0, typeorm_1.Index)("idx_copies_bundle"),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], BizCopiesByBundle.prototype, "bundle_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, nullable: true }),
    __metadata("design:type", Boolean)
], BizCopiesByBundle.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], BizCopiesByBundle.prototype, "copies", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], BizCopiesByBundle.prototype, "base_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 4, nullable: true }),
    __metadata("design:type", Number)
], BizCopiesByBundle.prototype, "final_price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], BizCopiesByBundle.prototype, "formula_snapsot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bizBundleByAgency_entity_1.BizBundleByAgency, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "bundle_id" }),
    __metadata("design:type", bizBundleByAgency_entity_1.BizBundleByAgency)
], BizCopiesByBundle.prototype, "bundle", void 0);
exports.BizCopiesByBundle = BizCopiesByBundle = __decorate([
    (0, typeorm_1.Entity)("biz_copies_by_bundle")
], BizCopiesByBundle);
//# sourceMappingURL=bizCopiesByBundle.entity.js.map