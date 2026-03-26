"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteProductRepository = void 0;
const database_config_1 = require("../config/database.config");
const siteProduct_entity_1 = require("../entity/siteProduct.entity");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
dayjs_1.default.extend(customParseFormat_1.default);
class SiteProductRepository extends baseRepositories_core_1.BaseRespository {
    constructor() {
        super(...arguments);
        this.repository = database_config_1.AppDataSource.getRepository(siteProduct_entity_1.SiteProduct);
    }
    async createProduct(data, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProduct_entity_1.SiteProduct) : this.repository;
        const product = repo.create(data);
        return await repo.save(product);
    }
    async findBySlug(slug) {
        return await this.repository.findOne({ where: { slug, is_deleted: false } });
    }
    async getNextId() {
        const lastProduct = await this.repository.findOne({
            where: { is_deleted: false },
            order: { id: "DESC" },
        });
        return ((lastProduct === null || lastProduct === void 0 ? void 0 : lastProduct.id) || 0) + 1;
    }
    async searchProducts(data, pagination) {
        return this.handleWithTryCatch(async () => {
            const { status, name, skuId, categoryCode, categoryName, areaGuid, countryGuid, fromDate, toDate } = data;
            const { orderBy, skip, take } = pagination;
            const qb = this.repository.createQueryBuilder("product")
                .leftJoinAndMapMany("product.variants", "site_product_variant", "variants", "variants.site_product_id = product.id")
                .leftJoinAndMapMany("product.categoryMappings", "site_products_categories_mapping", "mapping", "mapping.product_id = product.id")
                .leftJoinAndMapOne("mapping.category", "site_categories", "category", "category.id = mapping.category_id")
                .leftJoinAndMapOne("category.parentCategory", "site_categories", "parent", "parent.id = category.parent")
                .where("1 = 1")
                .andWhere("product.is_deleted = false");
            if (name) {
                qb.andWhere("product.name ILIKE :name", { name: `%${name}%` });
            }
            if (status) {
                qb.andWhere("product.status = :status", { status });
            }
            if (skuId) {
                qb.andWhere("EXISTS (SELECT 1 FROM site_product_variant v WHERE v.site_product_id = product.id AND v.product_sku ILIKE :skuId)", { skuId: `%${skuId}%` });
            }
            if (categoryCode) {
                qb.andWhere("EXISTS (SELECT 1 FROM site_products_categories_mapping spcm INNER JOIN site_categories c ON c.id = spcm.category_id WHERE spcm.product_id = product.id AND c.code ILIKE :categoryCode)", { categoryCode: `%${categoryCode}%` });
            }
            if (categoryName) {
                qb.andWhere("EXISTS (SELECT 1 FROM site_products_categories_mapping spcm INNER JOIN site_categories c ON c.id = spcm.category_id WHERE spcm.product_id = product.id AND c.name ILIKE :categoryName)", { categoryName: `%${categoryName}%` });
            }
            if (areaGuid) {
                qb.andWhere("EXISTS (SELECT 1 FROM site_products_categories_mapping spcm INNER JOIN site_categories c ON c.id = spcm.category_id WHERE spcm.product_id = product.id AND c.guid = :areaGuid)", { areaGuid });
            }
            if (countryGuid) {
                qb.andWhere("EXISTS (SELECT 1 FROM site_products_categories_mapping spcm INNER JOIN site_categories c ON c.id = spcm.category_id WHERE spcm.product_id = product.id AND c.guid = :countryGuid)", { countryGuid });
            }
            if (fromDate) {
                const startOfDay = (0, dayjs_1.default)(fromDate, "DD/MM/YYYY").startOf("day").toDate();
                qb.andWhere("product.created_at >= :fromDate", { fromDate: startOfDay });
            }
            if (toDate) {
                const endOfDay = (0, dayjs_1.default)(toDate, "DD/MM/YYYY").endOf("day").toDate();
                qb.andWhere("product.created_at <= :toDate", { toDate: endOfDay });
            }
            qb.orderBy("product.id", orderBy)
                .skip(skip)
                .take(take);
            const [result, total] = await qb.getManyAndCount();
            // Transform raw structure to nested structure for DTO
            const transformedResult = result.map((product) => {
                const categories = (product.categoryMappings || []).map((m) => {
                    if (m.category) {
                        const cat = m.category;
                        cat.parent = cat.parentCategory || null;
                        return cat;
                    }
                    return null;
                }).filter((c) => c !== null);
                return Object.assign(Object.assign({}, product), { categories });
            });
            return { result: transformedResult, total };
        });
    }
    async getVariantsByDiscountGuid(discountGuid) {
        return this.handleWithTryCatch(async () => {
            const rows = await database_config_1.AppDataSource.getRepository("site_product_variant")
                .createQueryBuilder("variant")
                .select([
                'variant.site_product_id AS "site_product_id"',
                'variant.product_sku AS "product_sku"',
                'variant.name AS "name"',
                'variant.plan_type AS "plan_type"',
                'spop.copies AS "copies"',
                'spop.retail_price AS "retail_price"',
                'spop.currency AS "currency"',
                'discount.type AS "discount_type"',
                'discount.value AS "discount_value"'
            ])
                .innerJoin("site_product_option_price", "spop", "spop.product_sku = variant.product_sku")
                .innerJoin("site_discounts", "discount", "discount.id = spop.discount_id")
                .where("discount.guid = :discountGuid", { discountGuid })
                .andWhere("variant.is_deleted = false")
                .getRawMany();
            return rows;
        });
    }
    async softDeleteByGuid(guid, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProduct_entity_1.SiteProduct) : this.repository;
        await repo.update({ guid }, { is_deleted: true, status: "inactive" });
    }
    async findByGuid(guid) {
        return await this.repository.findOne({ where: { guid, is_deleted: false } });
    }
    async updateByGuid(guid, data, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProduct_entity_1.SiteProduct) : this.repository;
        await repo.update({ guid }, data);
    }
}
exports.siteProductRepository = new SiteProductRepository();
//# sourceMappingURL=siteProduct.repository.js.map