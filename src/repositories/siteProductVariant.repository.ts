import { AppDataSource } from "../config/database.config";
import { SiteProductVariant } from "../entity/siteProductVariant.entity";
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
}

export const siteProductVariantRepository = new SiteProductVariantRepository();
