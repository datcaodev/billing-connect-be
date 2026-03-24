import { BaseService } from "../core/baseService.core";
import { orderRepository } from "../repositories/order.repository";
import { getPagination } from "../utils";
import { mapPaginatedData } from "../core/basePagination.core";
import { OrderDto } from "../dto/order.dto";

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
}

export const orderService = new OrderService();
