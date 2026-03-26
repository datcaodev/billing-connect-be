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
exports.BizBundleByAgency = void 0;
const typeorm_1 = require("typeorm");
const bizAgency_entity_1 = require("./bizAgency.entity");
const baseEntity_core_1 = require("../core/baseEntity.core");
let BizBundleByAgency = class BizBundleByAgency extends baseEntity_core_1.BaseTimeEntity {
};
exports.BizBundleByAgency = BizBundleByAgency;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BizBundleByAgency.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", unique: true, nullable: true, default: () => "gen_random_uuid()" }),
    __metadata("design:type", String)
], BizBundleByAgency.prototype, "guid", void 0);
__decorate([
    (0, typeorm_1.Index)("idx_bundle_agent"),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], BizBundleByAgency.prototype, "agent_id", void 0);
__decorate([
    (0, typeorm_1.Index)("idx_bundle_product"),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], BizBundleByAgency.prototype, "product_sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BizBundleByAgency.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BizBundleByAgency.prototype, "country_mcc", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BizBundleByAgency.prototype, "country_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BizBundleByAgency.prototype, "area_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true, nullable: true }),
    __metadata("design:type", Boolean)
], BizBundleByAgency.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BizBundleByAgency.prototype, "high_flow_size", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BizBundleByAgency.prototype, "plan_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BizBundleByAgency.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bizAgency_entity_1.BizAgency),
    (0, typeorm_1.JoinColumn)({ name: "agent_id" }),
    __metadata("design:type", bizAgency_entity_1.BizAgency)
], BizBundleByAgency.prototype, "agency", void 0);
exports.BizBundleByAgency = BizBundleByAgency = __decorate([
    (0, typeorm_1.Entity)("biz_bundle_by_agency"),
    (0, typeorm_1.Unique)("uq_bundle_agent_product", ["agent_id", "product_sku"])
], BizBundleByAgency);
//# sourceMappingURL=bizBundleByAgency.entity.js.map