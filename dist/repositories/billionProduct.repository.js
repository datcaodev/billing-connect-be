"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billionProductRepository = void 0;
const database_config_1 = require("../config/database.config");
const billionProduct_entity_1 = require("../entity/billionProduct.entity");
const billionProductCountry_entity_1 = require("../entity/billionProductCountry.entity");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
class BillionProductRepository extends baseRepositories_core_1.BaseRespository {
    async searchProducts(data, pagination) {
        return this.handleWithTryCatch(async () => {
            const { skuId, name } = data;
            const { orderBy, skip, take } = pagination;
            const repository = database_config_1.AppDataSource.getRepository(billionProduct_entity_1.BillionProduct);
            const qb = repository.createQueryBuilder("product")
                .leftJoinAndMapMany("product.prices", "billion_product_prices", "prices", "prices.product_sku = product.sku_id")
                .where("1 = 1");
            if (skuId) {
                qb.andWhere("product.sku_id ILIKE :skuId", { skuId: `%${skuId}%` });
            }
            if (name) {
                qb.andWhere("product.name ILIKE :name", { name: `%${name}%` });
            }
            qb.orderBy("product.id", orderBy)
                .skip(skip)
                .take(take);
            const [result, total] = await qb.getManyAndCount();
            return { result, total };
        });
    }
    async getProductBySku(sku_id) {
        return this.handleWithTryCatch(async () => {
            const repository = database_config_1.AppDataSource.getRepository(billionProduct_entity_1.BillionProduct);
            const product = await repository.createQueryBuilder("product")
                .where("product.sku_id = :sku_id", { sku_id })
                .getOne();
            return product;
        });
    }
    async getProductCountries(sku_id) {
        return this.handleWithTryCatch(async () => {
            const repository = database_config_1.AppDataSource.getRepository(billionProductCountry_entity_1.BillionProductCountry);
            return await repository.find({
                where: { product_sku: sku_id },
                relations: ["country_details"]
            });
        });
    }
}
exports.billionProductRepository = new BillionProductRepository();
//# sourceMappingURL=billionProduct.repository.js.map