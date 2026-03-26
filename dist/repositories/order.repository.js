"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRepository = void 0;
const database_config_1 = require("../config/database.config");
const order_entity_1 = require("../entity/order.entity");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
class OrderRepository extends baseRepositories_core_1.BaseRespository {
    constructor() {
        super(...arguments);
        this.repository = database_config_1.AppDataSource.getRepository(order_entity_1.Order);
    }
    async searchOrders(data, pagination) {
        return this.handleWithTryCatch(async () => {
            const { transactionId, orderId, paymentStatus, status } = data;
            const { orderBy, skip, take } = pagination;
            const qb = this.repository.createQueryBuilder("order")
                .where("1 = 1");
            if (transactionId) {
                qb.andWhere("order.transaction_id ILIKE :transactionId", { transactionId: `%${transactionId}%` });
            }
            if (orderId) {
                qb.andWhere("order.order_id ILIKE :orderId", { orderId: `%${orderId}%` });
            }
            if (paymentStatus) {
                qb.andWhere("order.payment_status = :paymentStatus", { paymentStatus });
            }
            if (status) {
                qb.andWhere("order.status = :status", { status });
            }
            qb.orderBy("order.created_at", (orderBy || "DESC"))
                .skip(skip)
                .take(take);
            const [result, total] = await qb.getManyAndCount();
            return { result, total };
        });
    }
    async findByOrderId(orderId) {
        return await this.repository.findOne({ where: { order_id: orderId } });
    }
    async findDetailByOrderId(orderId) {
        return await database_config_1.AppDataSource.getRepository("order_details").findOne({ where: { order_id: orderId } });
    }
    async findItemsByOrderId(orderId) {
        return await database_config_1.AppDataSource.getRepository("order_items").find({ where: { order_id: orderId } });
    }
    async findHistoryByOrderId(orderId) {
        return await database_config_1.AppDataSource.getRepository("order_status_history").find({
            where: { order_id: orderId },
            order: { created_at: "DESC" }
        });
    }
}
exports.orderRepository = new OrderRepository();
//# sourceMappingURL=order.repository.js.map