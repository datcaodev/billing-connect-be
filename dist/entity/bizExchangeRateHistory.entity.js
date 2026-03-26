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
exports.SiteExchangeRateHistory = void 0;
const typeorm_1 = require("typeorm");
const baseEntity_core_1 = require("../core/baseEntity.core");
let SiteExchangeRateHistory = class SiteExchangeRateHistory extends baseEntity_core_1.BaseTimeEntity {
};
exports.SiteExchangeRateHistory = SiteExchangeRateHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SiteExchangeRateHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10, nullable: true }),
    __metadata("design:type", String)
], SiteExchangeRateHistory.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 10, scale: 4, nullable: false }),
    __metadata("design:type", String)
], SiteExchangeRateHistory.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], SiteExchangeRateHistory.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], SiteExchangeRateHistory.prototype, "end_date", void 0);
exports.SiteExchangeRateHistory = SiteExchangeRateHistory = __decorate([
    (0, typeorm_1.Entity)("site_exchange_rate_history")
], SiteExchangeRateHistory);
//# sourceMappingURL=bizExchangeRateHistory.entity.js.map