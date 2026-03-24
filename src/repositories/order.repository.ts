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

    public async findByOrderId(orderId: string): Promise<Order | null> {
        return await this.repository.findOne({ where: { order_id: orderId } });
    }

    public async findDetailByOrderId(orderId: string) {
        return await AppDataSource.getRepository("order_details").findOne({ where: { order_id: orderId } });
    }

    public async findItemsByOrderId(orderId: string) {
        return await AppDataSource.getRepository("order_items").find({ where: { order_id: orderId } });
    }

    public async findHistoryByOrderId(orderId: string) {
        return await AppDataSource.getRepository("order_status_history").find({
            where: { order_id: orderId },
            order: { created_at: "DESC" }
        });
    }
}

export const orderRepository = new OrderRepository();
