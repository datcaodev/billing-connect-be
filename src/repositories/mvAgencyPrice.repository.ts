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
            // 1. Khởi tạo query builder với các filter cơ bản
            const baseQuery = this.repository.createQueryBuilder("mv")
                .where("1=1");

            if (filters.productSku) {
                baseQuery.andWhere("mv.product_sku ILIKE :productSku", { productSku: `%${filters.productSku}%` });
            }
            if (filters.name) {
                baseQuery.andWhere("mv.name ILIKE :name", { name: `%${filters.name}%` });
            }
            if (filters.countryMcc && filters.countryMcc.length > 0) {
                baseQuery.andWhere("mv.country_mcc IN (:...countryMcc)", { countryMcc: filters.countryMcc });
            }
            if (filters.areaName) {
                baseQuery.andWhere("mv.area_name = :areaName", { areaName: filters.areaName });
            }

            // 2. Lấy danh sách SKU duy nhất có phân trang
            const skuQuery = baseQuery.clone()
                .select("DISTINCT mv.product_sku", "product_sku")
                .orderBy("mv.product_sku", pagination.orderBy as "ASC" | "DESC")
                .offset(pagination.skip)
                .limit(pagination.take);

            const skuResult = await skuQuery.getRawMany();
            const skus = skuResult.map(r => r.product_sku);

            if (skus.length === 0) {
                return [[], 0] as [MvAgencyPrice[], number];
            }

            // 3. Đếm tổng số SKU duy nhất
            const totalResult = await baseQuery.clone()
                .select("COUNT(DISTINCT mv.product_sku)", "count")
                .getRawOne();
            const total = parseInt(totalResult?.count || "0");

            // 4. Lấy đầy đủ dữ liệu cho các SKU đã tìm được
            const finalData = await this.repository.createQueryBuilder("mv")
                .where("mv.product_sku IN (:...skus)", { skus })
                .orderBy("mv.product_sku", pagination.orderBy as "ASC" | "DESC")
                .addOrderBy("mv.copies", "ASC")
                .getMany();

            return [finalData, total] as [MvAgencyPrice[], number];
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
