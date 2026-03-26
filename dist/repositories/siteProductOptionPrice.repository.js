"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteProductOptionPriceRepository = void 0;
const database_config_1 = require("../config/database.config");
const siteProductOptionPrice_entity_1 = require("../entity/siteProductOptionPrice.entity");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
const typeorm_1 = require("typeorm");
class SiteProductOptionPriceRepository extends baseRepositories_core_1.BaseRespository {
    constructor() {
        super(...arguments);
        this.repository = database_config_1.AppDataSource.getRepository(siteProductOptionPrice_entity_1.SiteProductOptionPrice);
    }
    async upsertOptionPrice(data, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProductOptionPrice_entity_1.SiteProductOptionPrice) : this.repository;
        // Check if option price already exists for this product, sku and copies
        const existing = await repo.findOne({
            where: {
                site_product_id: data.site_product_id,
                product_sku: data.product_sku,
                copies: data.copies
            }
        });
        if (existing) {
            Object.assign(existing, data);
            return await repo.save(existing);
        }
        const optionPrice = repo.create(data);
        return await repo.save(optionPrice);
    }
    async findBySku(sku, productId) {
        const where = { product_sku: sku, is_deleted: false };
        if (productId) {
            where.site_product_id = productId;
        }
        return await this.repository.find({
            where,
            order: { copies: "ASC" }
        });
    }
    async findVariantsByDiscount(discountId) {
        const qb = this.repository.createQueryBuilder("op")
            .leftJoinAndSelect("site_product_variant", "spv", "spv.product_sku = op.product_sku AND spv.site_product_id = op.site_product_id")
            .where("op.discount_id = :discountId", { discountId })
            .select([
            "op.guid AS op_guid",
            "op.product_sku AS op_product_sku",
            "op.copies AS op_copies",
            "op.retail_price AS op_retail_price",
            "op.currency AS op_currency",
            "spv.name AS spv_name"
        ])
            .andWhere("spv.is_deleted = false")
            .andWhere("op.is_deleted = false")
            .orderBy("op.product_sku", "ASC")
            .addOrderBy("op.copies", "ASC");
        const items = await qb.getRawMany();
        // Map the results grouped by variant
        const variantMap = new Map();
        for (const item of items) {
            const sku = item.op_product_sku;
            if (!variantMap.has(sku)) {
                variantMap.set(sku, {
                    product_sku: sku,
                    name: item.spv_name,
                    options: []
                });
            }
            variantMap.get(sku).options.push({
                guid: item.op_guid,
                copies: item.op_copies,
                retail_price: item.op_retail_price,
                currency: item.op_currency,
            });
        }
        return Array.from(variantMap.values());
    }
    /**
     * Bỏ giảm giá ra khỏi các copies (option prices) được chỉ định theo danh sách GUID
     */
    async removeDiscountFromSpecificGuids(optionPriceGuids) {
        await this.repository
            .createQueryBuilder()
            .update(siteProductOptionPrice_entity_1.SiteProductOptionPrice)
            .set({ discount_id: null })
            .where("guid IN (:...optionPriceGuids)", { optionPriceGuids })
            .execute();
    }
    /**
     * Xóa mềm các option prices theo danh sách SKU
     */
    async softDeleteBySkus(skus, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProductOptionPrice_entity_1.SiteProductOptionPrice) : this.repository;
        await repo.update({ product_sku: (0, typeorm_1.In)(skus) }, { is_deleted: true });
    }
    /**
     * Xóa mềm các option prices theo Site Product ID
     */
    async softDeleteByProductId(productId, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProductOptionPrice_entity_1.SiteProductOptionPrice) : this.repository;
        await repo.update({ site_product_id: productId }, { is_deleted: true });
    }
    async softDeleteBySku(productId, productSku, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProductOptionPrice_entity_1.SiteProductOptionPrice) : this.repository;
        await repo.update({ site_product_id: productId, product_sku: productSku }, { is_deleted: true });
    }
    async softDeleteByCopies(productId, productSku, copies, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProductOptionPrice_entity_1.SiteProductOptionPrice) : this.repository;
        await repo.update({ site_product_id: productId, product_sku: productSku, copies }, { is_deleted: true });
    }
    async findByVariantSku(productId, productSku) {
        return await this.repository.find({
            where: { site_product_id: productId, product_sku: productSku, is_deleted: false }
        });
    }
    async hardDeleteByProductId(productId, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProductOptionPrice_entity_1.SiteProductOptionPrice) : this.repository;
        await repo.delete({ site_product_id: productId });
    }
}
exports.siteProductOptionPriceRepository = new SiteProductOptionPriceRepository();
//# sourceMappingURL=siteProductOptionPrice.repository.js.map