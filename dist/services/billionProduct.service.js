"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billionProductService = void 0;
const billionProduct_repository_1 = require("../repositories/billionProduct.repository");
const utils_1 = require("../utils");
const basePagination_core_1 = require("../core/basePagination.core");
const billionProduct_dto_1 = require("../dto/billionProduct.dto");
const class_transformer_1 = require("class-transformer");
class BillionProductService {
    async searchProducts(data) {
        const { page, size, sortBy } = data;
        const pagination = (0, utils_1.getPagination)({ page, size, sortBy });
        const result = await billionProduct_repository_1.billionProductRepository.searchProducts(data, pagination);
        const dataMappingDTO = (0, basePagination_core_1.mapPaginatedData)({
            dtoClass: billionProduct_dto_1.BillionProductPaginationDto,
            entities: result.result,
            skip: pagination.skip,
            take: pagination.take,
            total: result.total
        });
        return dataMappingDTO;
    }
    async getProductDetail(skuId) {
        const product = await billionProduct_repository_1.billionProductRepository.getProductBySku(skuId);
        if (!product) {
            return null;
        }
        return (0, class_transformer_1.plainToInstance)(billionProduct_dto_1.BillionProductDetailDto, product);
    }
}
exports.billionProductService = new BillionProductService();
//# sourceMappingURL=billionProduct.service.js.map