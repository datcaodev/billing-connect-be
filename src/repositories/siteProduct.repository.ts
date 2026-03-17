import { AppDataSource } from "../config/database.config";
import { SiteProduct } from "../entity/siteProduct.entity";
import { BaseRespository } from "../core/baseRepositories.core";
import { QueryRunner } from "typeorm";

class SiteProductRepository extends BaseRespository {
    private repository = AppDataSource.getRepository(SiteProduct);

    public async createProduct(data: Partial<SiteProduct>, queryRunner?: QueryRunner): Promise<SiteProduct> {
        const repo = queryRunner ? queryRunner.manager.getRepository(SiteProduct) : this.repository;
        const product = repo.create(data);
        return await repo.save(product);
    }

    public async findBySlug(slug: string): Promise<SiteProduct | null> {
        return await this.repository.findOne({ where: { slug } });
    }

    public async getNextId(): Promise<number> {
        const lastProduct = await this.repository.findOne({
            where: {},
            order: { id: "DESC" },
        });
        return (lastProduct?.id || 0) + 1;
    }

    public async searchProducts(data: any, pagination: any) {
        return this.handleWithTryCatch(async () => {
            const { status, name, sku_id, category_code, category_name } = data;
            const { orderBy, skip, take } = pagination;

            const qb = this.repository.createQueryBuilder("product")
                .leftJoinAndMapMany("product.variants", "site_product_variant", "variants", "variants.site_product_id = product.id")
                .leftJoinAndMapMany("product.categoryMappings", "site_products_categories_mapping", "mapping", "mapping.product_id = product.id")
                .leftJoinAndMapOne("mapping.category", "site_categories", "category", "category.id = mapping.category_id")
                .leftJoinAndMapOne("category.parentCategory", "site_categories", "parent", "parent.id = category.parent")
                .where("1 = 1")
                .andWhere("product.is_delete = false");

            if (name) {
                qb.andWhere("product.name ILIKE :name", { name: `%${name}%` });
            }

            if (status) {
                qb.andWhere("product.status = :status", { status });
            }

            if (sku_id) {
                qb.andWhere("EXISTS (SELECT 1 FROM site_product_variant v WHERE v.site_product_id = product.id AND v.product_sku ILIKE :sku_id)", { sku_id: `%${sku_id}%` });
            }

            if (category_code) {
                qb.andWhere("EXISTS (SELECT 1 FROM site_products_categories_mapping spcm INNER JOIN site_categories c ON c.id = spcm.category_id WHERE spcm.product_id = product.id AND c.code ILIKE :category_code)", { category_code: `%${category_code}%` });
            }

            if (category_name) {
                qb.andWhere("EXISTS (SELECT 1 FROM site_products_categories_mapping spcm INNER JOIN site_categories c ON c.id = spcm.category_id WHERE spcm.product_id = product.id AND c.name ILIKE :category_name)", { category_name: `%${category_name}%` });
            }

            qb.orderBy("product.id", orderBy as "ASC" | "DESC")
                .skip(skip)
                .take(take);

            const [result, total] = await qb.getManyAndCount();

            // Transform raw structure to nested structure for DTO
            const transformedResult = result.map((product: any) => {
                const categories = (product.categoryMappings || []).map((m: any) => {
                    if (m.category) {
                        const cat = m.category;
                        cat.parent = cat.parentCategory || null;
                        return cat;
                    }
                    return null;
                }).filter((c: any) => c !== null);

                return {
                    ...product,
                    categories
                };
            });

            return { result: transformedResult, total };
        });
    }

    public async getVariantsByDiscountGuid(discountGuid: string) {
        return this.handleWithTryCatch(async () => {
            const rows = await AppDataSource.getRepository("site_product_variant")
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
                .andWhere("variant.is_delete = false")
                .getRawMany();

            return rows;
        });
    }
}

export const siteProductRepository = new SiteProductRepository();
