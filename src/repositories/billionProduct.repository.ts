import { AppDataSource } from "../config/database.config";
import { BillionProduct } from "../entity/billionProduct.entity";
import { BillionProductCountry } from "../entity/billionProductCountry.entity";
import { BaseRespository } from "../core/baseRepositories.core";
import { ISearchBillionProduct } from "../schemas";
import { CommodityType } from "../enums";

class BillionProductRepository extends BaseRespository {
    public async searchProducts(data: ISearchBillionProduct, pagination: any) {
        return this.handleWithTryCatch(async () => {
            const { skuId, name } = data;
            const { orderBy, skip, take } = pagination;

            const repository = AppDataSource.getRepository(BillionProduct);
            const qb = repository.createQueryBuilder("product")
                .leftJoinAndMapMany("product.prices", "billion_product_prices", "prices", "prices.product_sku = product.sku_id")
                .where("1 = 1")
                .andWhere(`product.type IN ('${CommodityType.ESIM}', '${CommodityType.ESIM_AIR}', '${CommodityType.ESIM_SELF_SELECTED_PLAN}', '${CommodityType.ESIM_FIXED_PLAN}')`);

            if (skuId) {
                qb.andWhere("product.sku_id ILIKE :skuId", { skuId: `%${skuId}%` });
            }

            if (name) {
                qb.andWhere("product.name ILIKE :name", { name: `%${name}%` });
            }

            qb.orderBy("product.id", orderBy as "ASC" | "DESC")
                .skip(skip)
                .take(take);

            const [result, total] = await qb.getManyAndCount();
            return { result, total };
        });
    }

    public async getAllProductsWithPrices() {
        return this.handleWithTryCatch(async () => {
            const repository = AppDataSource.getRepository(BillionProduct);
            const qb = repository.createQueryBuilder("product")
                .leftJoinAndMapMany("product.prices", "billion_product_prices", "prices", "prices.product_sku = product.sku_id")
                .where(`product.type IN ('${CommodityType.ESIM}', '${CommodityType.ESIM_AIR}', '${CommodityType.ESIM_SELF_SELECTED_PLAN}', '${CommodityType.ESIM_FIXED_PLAN}')`);

            return await qb.getMany();
        });
    }

    public async getProductBySku(sku_id: string) {
        return this.handleWithTryCatch(async () => {
            const repository = AppDataSource.getRepository(BillionProduct);
            const product = await repository.createQueryBuilder("product")
                .where("product.sku_id = :sku_id", { sku_id })
                .getOne();
            return product;
        });
    }

    public async getAllProductCountriesMapped() {
        return this.handleWithTryCatch(async () => {
            const repository = AppDataSource.getRepository(BillionProductCountry);
            const records = await repository.find({
                relations: ["country_details"]
            });

            // Ghép theo sku_id để tra cứu nhanh
            const map = new Map<string, BillionProductCountry[]>();
            records.forEach(r => {
                const list = map.get(r.product_sku) || [];
                list.push(r);
                map.set(r.product_sku, list);
            });
            return map;
        });
    }
}

export const billionProductRepository = new BillionProductRepository();
