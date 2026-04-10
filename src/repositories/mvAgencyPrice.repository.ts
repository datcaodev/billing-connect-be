import { AppDataSource } from "../config/database.config";
import { MvAgencyPrice } from "../entity/mvAgencyPrice.entity";
import { FindOptionsOrderValue } from "typeorm";
import { BaseRespository } from "../core/baseRepositories.core";

class MvAgencyPriceRepository extends BaseRespository {
    private repository = AppDataSource.getRepository(MvAgencyPrice);

    public async findActiveBundlesFiltered(
        agentId: number,
        filters: { productSku?: string; name?: string; countryMcc?: string[]; areaName?: string },
        pagination: { skip: number; take: number; orderBy: FindOptionsOrderValue }
    ) {
        return this.handleWithTryCatch(async () => {
            const query = this.repository.createQueryBuilder("mv")
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
        });
    }

    public async refreshMvAgencyPrice(): Promise<void> {
        return this.handleWithTryCatch(async () => {
            const views = [
                "mv_agency_price"
            ];
            for (const view of views) {
                await AppDataSource.query(`REFRESH MATERIALIZED VIEW CONCURRENTLY ${view}`);
            }
        });
    }

}

export const mvAgencyPriceRepository = new MvAgencyPriceRepository();
