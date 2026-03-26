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
exports.OrderStatusHistory = void 0;
const typeorm_1 = require("typeorm");
let OrderStatusHistory = class OrderStatusHistory {
};
exports.OrderStatusHistory = OrderStatusHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", Number)
], OrderStatusHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 64, nullable: false }),
    (0, typeorm_1.Index)("idx_order_history_order_id"),
    __metadata("design:type", String)
], OrderStatusHistory.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], OrderStatusHistory.prototype, "from_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], OrderStatusHistory.prototype, "to_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], OrderStatusHistory.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], OrderStatusHistory.prototype, "error_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "jsonb", nullable: true }),
    __metadata("design:type", Object)
], OrderStatusHistory.prototype, "partner_response", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamptz", default: () => "now()" }),
    (0, typeorm_1.Index)("idx_order_history_created_at"),
    __metadata("design:type", Date)
], OrderStatusHistory.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], OrderStatusHistory.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], OrderStatusHistory.prototype, "request_id", void 0);
exports.OrderStatusHistory = OrderStatusHistory = __decorate([
    (0, typeorm_1.Entity)("order_status_history")
], OrderStatusHistory);
//# sourceMappingURL=orderStatusHistory.entity.js.map