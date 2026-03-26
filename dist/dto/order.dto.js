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
exports.OrderFullDetailsDto = exports.OrderDetailDto = exports.OrderItemDto = exports.OrderDto = void 0;
const class_transformer_1 = require("class-transformer");
class OrderDto {
    get payment_status_label() {
        if (this.paymentStatus === "PENDING")
            return "Chờ thanh toán";
        if (this.paymentStatus === "SUCCESS") {
            const successStatuses = ["PAID", "FULFILLED", "FAILED_FULFILLED", "FAILED_FULFILLED_EXTERNAL"];
            if (successStatuses.includes(this.status)) {
                return "Thanh toán thành công";
            }
            return "Thanh toán thất bại";
        }
        return this.paymentStatus || "";
    }
    get status_label() {
        switch (this.status) {
            case "CREATE": return "Tạo đơn hàng thành công";
            case "PAID": return "Thanh toán thành công";
            case "FULFILLED": return "Thanh toán thành công + Đơn hàng đã được giao";
            case "FAILED": return "Thanh toán thất bại";
            case "FAILED_FULFILLED": return "Thanh toán thành công + Đã gọi Billion + Không giao được";
            case "FAILED_FULFILLED_EXTERNAL": return "Thanh toán thành công + Lỗi tạo đơn Billion";
            default: return this.status || "";
        }
    }
}
exports.OrderDto = OrderDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], OrderDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "order_id" }),
    __metadata("design:type", String)
], OrderDto.prototype, "orderId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "product_id" }),
    __metadata("design:type", String)
], OrderDto.prototype, "productId", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], OrderDto.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "total_amount" }),
    __metadata("design:type", Number)
], OrderDto.prototype, "totalAmount", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "discount_amount" }),
    __metadata("design:type", Number)
], OrderDto.prototype, "discountAmount", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "voucher_amount" }),
    __metadata("design:type", Number)
], OrderDto.prototype, "voucherAmount", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "rate_amount" }),
    __metadata("design:type", Number)
], OrderDto.prototype, "rateAmount", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "payment_status" }),
    __metadata("design:type", String)
], OrderDto.prototype, "paymentStatus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], OrderDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "partner_order_id" }),
    __metadata("design:type", String)
], OrderDto.prototype, "partnerOrderId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "transaction_id" }),
    __metadata("design:type", String)
], OrderDto.prototype, "transactionId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "created_at" }),
    __metadata("design:type", Date)
], OrderDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ toPlainOnly: true }),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], OrderDto.prototype, "payment_status_label", null);
__decorate([
    (0, class_transformer_1.Expose)({ toPlainOnly: true }),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], OrderDto.prototype, "status_label", null);
class OrderItemDto {
}
exports.OrderItemDto = OrderItemDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "order_id" }),
    __metadata("design:type", String)
], OrderItemDto.prototype, "orderId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "product_id" }),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "productId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "product_sku" }),
    __metadata("design:type", String)
], OrderItemDto.prototype, "productSku", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "discount_price" }),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "discountPrice", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], OrderItemDto.prototype, "quantity", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], OrderItemDto.prototype, "copies", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "created_at" }),
    __metadata("design:type", Date)
], OrderItemDto.prototype, "createdAt", void 0);
class OrderDetailDto {
}
exports.OrderDetailDto = OrderDetailDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], OrderDetailDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "order_id" }),
    __metadata("design:type", String)
], OrderDetailDto.prototype, "orderId", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "customer_email" }),
    __metadata("design:type", String)
], OrderDetailDto.prototype, "customerEmail", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "customer_name" }),
    __metadata("design:type", String)
], OrderDetailDto.prototype, "customerName", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "customer_phone" }),
    __metadata("design:type", String)
], OrderDetailDto.prototype, "customerPhone", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "billing_address" }),
    __metadata("design:type", Object)
], OrderDetailDto.prototype, "billingAddress", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "extra_data" }),
    __metadata("design:type", Object)
], OrderDetailDto.prototype, "extraData", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "created_at" }),
    __metadata("design:type", Date)
], OrderDetailDto.prototype, "createdAt", void 0);
class OrderFullDetailsDto extends OrderDto {
}
exports.OrderFullDetailsDto = OrderFullDetailsDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => OrderDetailDto),
    __metadata("design:type", OrderDetailDto)
], OrderFullDetailsDto.prototype, "detail", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => OrderItemDto),
    __metadata("design:type", Array)
], OrderFullDetailsDto.prototype, "items", void 0);
//# sourceMappingURL=order.dto.js.map