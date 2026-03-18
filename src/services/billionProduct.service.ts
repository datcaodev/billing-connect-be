import { billionProductRepository } from "../repositories/billionProduct.repository";
import { getPagination } from "../utils";
import { mapPaginatedData } from "../core/basePagination.core";
import { BillionProductDetailDto, BillionProductPaginationDto } from "../dto/billionProduct.dto";
import { plainToInstance } from "class-transformer";

class BillionProductService {
    public async searchProducts(data: any) {
        const { page, size, sortBy } = data;
        const pagination = getPagination({ page, size, sortBy });
        const result = await billionProductRepository.searchProducts(data, pagination);

        const dataMappingDTO = mapPaginatedData({
            dtoClass: BillionProductPaginationDto,
            entities: result.result,
            skip: pagination.skip,
            take: pagination.take,
            total: result.total
        });

        return dataMappingDTO;
    }

    public async getProductDetail(skuId: string) {
        const product = await billionProductRepository.getProductBySku(skuId);
        if (!product) {
            return null;
        }

        return plainToInstance(BillionProductDetailDto, product);
    }
}

export const billionProductService = new BillionProductService();
