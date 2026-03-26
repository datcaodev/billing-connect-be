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
exports.BizAgency = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_core_1 = require("../core/baseEntity.core");
let BizAgency = class BizAgency extends baseEntity_core_1.BaseTimeEntity {
};
exports.BizAgency = BizAgency;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BizAgency.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid", unique: true, nullable: true, default: () => "gen_random_uuid()" }),
    __metadata("design:type", String)
], BizAgency.prototype, "guid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true, nullable: false }),
    __metadata("design:type", String)
], BizAgency.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false }),
    __metadata("design:type", String)
], BizAgency.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false }),
    __metadata("design:type", String)
], BizAgency.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: false }),
    __metadata("design:type", String)
], BizAgency.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], BizAgency.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], BizAgency.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], BizAgency.prototype, "formula", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], BizAgency.prototype, "formula_note", void 0);
exports.BizAgency = BizAgency = __decorate([
    (0, typeorm_1.Entity)("biz_agency")
], BizAgency);
//# sourceMappingURL=bizAgency.entity.js.map