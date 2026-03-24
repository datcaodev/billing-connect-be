import { BaseService } from "../core/baseService.core";
import { orderRepository } from "../repositories/order.repository";
import { getPagination } from "../utils";
import { mapPaginatedData } from "../core/basePagination.core";
import { OrderDto, OrderFullDetailsDto } from "../dto/order.dto";
import { NotFoundError } from "../utils/errors/NotFoundError.error";
import { plainToInstance } from "class-transformer";

class OrderService extends BaseService {
    public async searchOrders(data: any) {
        return await this.handleWithTryCatch(async () => {
            const { page, size, sortBy } = data;
            const pagination = getPagination({ page, size, sortBy });
            const result = await orderRepository.searchOrders(data, pagination);

            return mapPaginatedData({
                dtoClass: OrderDto,
                entities: result.result,
                skip: pagination.skip,
                take: pagination.take,
                total: result.total
            });
        });
    }

    public async getOrderDetails(orderId: string) {
        return await this.handleWithTryCatch(async () => {
            const order = await orderRepository.findByOrderId(orderId);
            if (!order) {
                throw new NotFoundError("Không tìm thấy đơn hàng");
            }

            const [detail, items] = await Promise.all([
                orderRepository.findDetailByOrderId(orderId),
                orderRepository.findItemsByOrderId(orderId),
            ]);

            return plainToInstance(OrderFullDetailsDto, {
                ...order,
                detail,
                items,
            }, { excludeExtraneousValues: true });
        });
    }
}

export const orderService = new OrderService();
