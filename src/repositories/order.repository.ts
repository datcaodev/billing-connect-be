import { AppDataSource } from "../config/database.config";
import { Order } from "../entity/order.entity";
import { BaseRespository } from "../core/baseRepositories.core";

class OrderRepository extends BaseRespository {
    private repository = AppDataSource.getRepository(Order);

    public async searchOrders(data: any, pagination: any) {
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

            qb.orderBy("order.created_at", (orderBy || "DESC") as "ASC" | "DESC")
                .skip(skip)
                .take(take);

            const [result, total] = await qb.getManyAndCount();
            return { result, total };
        });
    }
}

export const orderRepository = new OrderRepository();
