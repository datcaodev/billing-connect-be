import { Expose, Transform } from "class-transformer";

export class OrderDto {
    @Expose() id: string; // BIGINT in DB can be string in JS if it exceeds safe integer range
    @Expose({ name: "order_id" }) orderId: string;
    @Expose({ name: "product_id" }) productId: string;
    @Expose() email: string;
    @Expose({ name: "total_amount" }) totalAmount: number;
    @Expose({ name: "discount_amount" }) discountAmount: number;
    @Expose({ name: "voucher_amount" }) voucherAmount: number;
    @Expose({ name: "rate_amount" }) rateAmount: number;
    @Expose({ name: "payment_status" }) paymentStatus: string;
    @Expose() status: string;
    @Expose({ name: "partner_order_id" }) partnerOrderId: string;
    @Expose({ name: "transaction_id" }) transactionId: string;
    @Expose({ name: "created_at" }) createdAt: Date;

    @Expose()
    get payment_status_label(): string {
        if (this.paymentStatus === "PENDING") return "Chờ thanh toán";
        if (this.paymentStatus === "SUCCESS") {
            const successStatuses = ["PAID", "FULFILLED", "FAILED_FULFILLED", "FAILED_FULFILLED_EXTERNAL"];
            if (successStatuses.includes(this.status)) {
                return "Thanh toán thành công";
            }
            return "Thanh toán thất bại";
        }
        return this.paymentStatus || "";
    }

    @Expose()
    get status_label(): string {
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
