import { AppDataSource } from "../config/database.config";
import { SiteProductVariant } from "../entity/siteProductVariant.entity";
import { SiteProductOptionPrice } from "../entity/siteProductOptionPrice.entity";
import { SiteDiscount } from "../entity/siteDiscounts.entity";
import { BaseRespository } from "../core/baseRepositories.core";
import { QueryRunner } from "typeorm";

class SiteProductVariantRepository extends BaseRespository {
    private repository = AppDataSource.getRepository(SiteProductVariant);

    public async upsertVariant(data: Partial<SiteProductVariant>, queryRunner?: QueryRunner): Promise<SiteProductVariant> {
        const repo = queryRunner ? queryRunner.manager.getRepository(SiteProductVariant) : this.repository;

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

    public async findByProductId(productId: number): Promise<SiteProductVariant[]> {
        return await this.repository.find({
            where: { site_product_id: productId }
        });
    }

    public async softDeleteByProductId(productId: number, queryRunner?: QueryRunner): Promise<void> {
        const repo = queryRunner ? queryRunner.manager.getRepository(SiteProductVariant) : this.repository;
        await repo.update({ site_product_id: productId }, { is_delete: true, status: "inactive" });
    }

    public async getVariantsAndOptionsByProductId(productId: number) {
        return this.handleWithTryCatch(async () => {
            const rows = await this.repository.createQueryBuilder("variant")
                .select([
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
                .leftJoin(SiteProductOptionPrice, "spop", "spop.product_sku = variant.product_sku AND spop.site_product_id = variant.site_product_id")
                .leftJoin(SiteDiscount, "discount", "discount.id = spop.discount_id")
                .where("variant.site_product_id = :productId", { productId })
                .andWhere("(variant.is_delete = false OR variant.is_delete IS NULL)")
                .andWhere("(spop.is_delete = false OR spop.is_delete IS NULL)")
                .addOrderBy("spop.copies", "ASC")
                .getRawMany();

            return rows;
        });
    }
}

export const siteProductVariantRepository = new SiteProductVariantRepository();
