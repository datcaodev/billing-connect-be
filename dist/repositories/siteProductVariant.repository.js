"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteProductVariantRepository = void 0;
const database_config_1 = require("../config/database.config");
const siteProductVariant_entity_1 = require("../entity/siteProductVariant.entity");
const siteProductOptionPrice_entity_1 = require("../entity/siteProductOptionPrice.entity");
const siteDiscounts_entity_1 = require("../entity/siteDiscounts.entity");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
class SiteProductVariantRepository extends baseRepositories_core_1.BaseRespository {
    constructor() {
        super(...arguments);
        this.repository = database_config_1.AppDataSource.getRepository(siteProductVariant_entity_1.SiteProductVariant);
    }
    async upsertVariant(data, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProductVariant_entity_1.SiteProductVariant) : this.repository;
        // Check if variant already exists for this product and sku
        const existing = await repo.findOne({
            where: {
                site_product_id: data.site_product_id,
                product_sku: data.product_sku
            }
        });
        if (existing) {
            Object.assign(existing, data);
            return await repo.save(existing);
        }
        const variant = repo.create(data);
        return await repo.save(variant);
    }
    async findByProductId(productId) {
        return await this.repository.find({
            where: { site_product_id: productId }
        });
    }
    async softDeleteByProductId(productId, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProductVariant_entity_1.SiteProductVariant) : this.repository;
        await repo.update({ site_product_id: productId }, { is_deleted: true, status: "inactive" });
    }
    async getVariantsAndOptionsByProductId(productId) {
        return this.handleWithTryCatch(async () => {
            const rows = await this.repository.createQueryBuilder("variant")
                .select([
                'variant.guid AS "variant_guid"',
                'variant.site_product_id AS "site_product_id"',
                'variant.product_sku AS "product_sku"',
                'variant.name AS "name"',
                'variant.name_original AS "name_original"',
                'variant.plan_type AS "plan_type"',
                'spop.guid AS "guid"',
                'spop.copies AS "copies"',
                'spop.retail_price AS "retail_price"',
                'spop.currency AS "currency"',
                'spop.discount_id AS "discount_id"',
                'discount.guid AS "discount_guid"',
                'discount.name AS "discount_name"',
                'discount.type AS "discount_type"',
                'discount.value AS "discount_value"'
            ])
                .leftJoin(siteProductOptionPrice_entity_1.SiteProductOptionPrice, "spop", "spop.product_sku = variant.product_sku AND spop.site_product_id = variant.site_product_id")
                .leftJoin(siteDiscounts_entity_1.SiteDiscount, "discount", "discount.id = spop.discount_id")
                .where("variant.site_product_id = :productId", { productId })
                .andWhere("(variant.is_deleted = false OR variant.is_deleted IS NULL)")
                .andWhere("(spop.is_deleted = false OR spop.is_deleted IS NULL)")
                .addOrderBy("spop.copies", "ASC")
                .getRawMany();
            return rows;
        });
    }
    async softDeleteBySku(productId, productSku, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProductVariant_entity_1.SiteProductVariant) : this.repository;
        await repo.update({ site_product_id: productId, product_sku: productSku }, { is_deleted: true, status: "inactive" });
    }
    async hardDeleteByProductId(productId, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProductVariant_entity_1.SiteProductVariant) : this.repository;
        await repo.delete({ site_product_id: productId });
    }
}
exports.siteProductVariantRepository = new SiteProductVariantRepository();
//# sourceMappingURL=siteProductVariant.repository.js.map