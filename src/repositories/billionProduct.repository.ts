import { AppDataSource } from "../config/database.config";
import { BillionProduct } from "../entity/billionProduct.entity";
import { BaseRespository } from "../core/baseRepositories.core";

class BillionProductRepository extends BaseRespository {
    public async searchProducts(data: any, pagination: any) {
        return this.handleWithTryCatch(async () => {
            const { keyword, sku_id, name, country } = data;
            const { orderBy, skip, take } = pagination;

            const repository = AppDataSource.getRepository(BillionProduct);
            const qb = repository.createQueryBuilder("product")
                .leftJoinAndMapMany("product.prices", "billion_product_prices", "prices", "prices.product_sku = product.sku_id")
                .where("1 = 1");

            if (keyword) {
                qb.andWhere("(product.name ILIKE :keyword OR product.sku_id ILIKE :keyword)", { keyword: `%${keyword}%` });
            }

            if (sku_id) {
                qb.andWhere("product.sku_id ILIKE :sku_id", { sku_id: `%${sku_id}%` });
            }

            if (name) {
                qb.andWhere("product.name ILIKE :name", { name: `%${name}%` });
            }

            if (country) {
                qb.andWhere((subQb) => {
                    const existsSubQuery = subQb.subQuery()
                        .select("1")
                        .from("billion_product_countries", "pc")
                        .leftJoin("billion_countries", "c", "c.mcc = pc.country_mcc")
                        .where("pc.product_sku = product.sku_id")
                        .andWhere("(pc.country_mcc = :country OR c.name = :country)", { country })
                        .getQuery();
                    return "EXISTS " + existsSubQuery;
                });
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
}

export const billionProductRepository = new BillionProductRepository();
