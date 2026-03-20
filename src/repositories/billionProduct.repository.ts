import { AppDataSource } from "../config/database.config";
import { BillionProduct } from "../entity/billionProduct.entity";
import { BillionProductCountry } from "../entity/billionProductCountry.entity";
import { BaseRespository } from "../core/baseRepositories.core";
import { ISearchBillionProduct } from "../schemas";

class BillionProductRepository extends BaseRespository {
    public async searchProducts(data: ISearchBillionProduct, pagination: any) {
        return this.handleWithTryCatch(async () => {
            const { skuId, name } = data;
            const { orderBy, skip, take } = pagination;

            const repository = AppDataSource.getRepository(BillionProduct);
            const qb = repository.createQueryBuilder("product")
                .leftJoinAndMapMany("product.prices", "billion_product_prices", "prices", "prices.product_sku = product.sku_id")
                .where("1 = 1");

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
    public async getProductBySku(sku_id: string) {
        return this.handleWithTryCatch(async () => {
            const repository = AppDataSource.getRepository(BillionProduct);
            const product = await repository.createQueryBuilder("product")
                .where("product.sku_id = :sku_id", { sku_id })
                .getOne();
            return product;
        });
    }

    public async getProductCountries(sku_id: string) {
        return this.handleWithTryCatch(async () => {
            const repository = AppDataSource.getRepository(BillionProductCountry);
            return await repository.find({
                where: { product_sku: sku_id },
                relations: ["country_details"]
            });
        });
    }
}

export const billionProductRepository = new BillionProductRepository();
