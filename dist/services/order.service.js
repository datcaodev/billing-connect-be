"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const baseService_core_1 = require("../core/baseService.core");
const order_repository_1 = require("../repositories/order.repository");
const utils_1 = require("../utils");
const basePagination_core_1 = require("../core/basePagination.core");
const order_dto_1 = require("../dto/order.dto");
const NotFoundError_error_1 = require("../utils/errors/NotFoundError.error");
const class_transformer_1 = require("class-transformer");
class OrderService extends baseService_core_1.BaseService {
    async searchOrders(data) {
        return await this.handleWithTryCatch(async () => {
            const { page, size, sortBy } = data;
            const pagination = (0, utils_1.getPagination)({ page, size, sortBy });
            const result = await order_repository_1.orderRepository.searchOrders(data, pagination);
            return (0, basePagination_core_1.mapPaginatedData)({
                dtoClass: order_dto_1.OrderDto,
                entities: result.result,
                skip: pagination.skip,
                take: pagination.take,
                total: result.total
            });
        });
    }
    async getOrderDetails(orderId) {
        return await this.handleWithTryCatch(async () => {
            const order = await order_repository_1.orderRepository.findByOrderId(orderId);
            if (!order) {
                throw new NotFoundError_error_1.NotFoundError("Không tìm thấy đơn hàng");
            }
            const [detail, items] = await Promise.all([
                order_repository_1.orderRepository.findDetailByOrderId(orderId),
                order_repository_1.orderRepository.findItemsByOrderId(orderId),
            ]);
            return (0, class_transformer_1.plainToInstance)(order_dto_1.OrderFullDetailsDto, Object.assign(Object.assign({}, order), { detail,
                items }), { excludeExtraneousValues: true });
        });
    }
}
exports.orderService = new OrderService();
//# sourceMappingURL=order.service.js.map