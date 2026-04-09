import { AppDataSource } from "../config/database.config";
import { MvAgencyPrice } from "../entity/mvAgencyPrice.entity";
import { FindOptionsOrderValue } from "typeorm";

export const mvAgencyPriceRepository = AppDataSource.getRepository(MvAgencyPrice).extend({
    async findActiveBundlesFiltered(
        agentId: number,
        filters: { productSku?: string; name?: string; countryMcc?: string[]; areaName?: string },
        pagination: { skip: number; take: number; orderBy: FindOptionsOrderValue }
    ) {
        const query = this.createQueryBuilder("mv")
            .where("1=1");

        if (filters.productSku) {
            query.andWhere("mv.product_sku ILIKE :productSku", { productSku: `%${filters.productSku}%` });
        }
        if (filters.name) {
            query.andWhere("mv.name ILIKE :name", { name: `%${filters.name}%` });
        }
        if (filters.countryMcc && filters.countryMcc.length > 0) {
            query.andWhere("mv.country_mcc IN (:...countryMcc)", { countryMcc: filters.countryMcc });
        }
        if (filters.areaName) {
            query.andWhere("mv.area_name = :areaName", { areaName: filters.areaName });
        }

        query.orderBy("mv.product_sku", pagination.orderBy as "ASC" | "DESC")
            .skip(pagination.skip)
            .take(pagination.take);

        return await query.getManyAndCount();
    }
});
