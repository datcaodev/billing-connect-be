import { AppDataSource } from "../config/database.config";
import { BizBundleByAgency } from "../entity/bizBundleByAgency.entity";
import { BaseRespository } from "../core/baseRepositories.core";
import { FindOptionsOrderValue } from "typeorm";
import { SiteProductVariant } from "../entity/siteProductVariant.entity";
import { SiteProductCategoryMapping } from "../entity/siteProductCategoryMapping.entity";
import { SiteCategory } from "../entity/siteCategory.entity";

class BundleByAgencyRepository extends BaseRespository {
    public async findByAgentAndSku(agentId: number, productSku: string) {
        return await AppDataSource.getRepository(BizBundleByAgency).findOne({
            where: { agent_id: agentId, product_sku: productSku }
        });
    }

    public async upsertBundle(data: Partial<BizBundleByAgency>, queryRunner?: any) {
        const repo = queryRunner ? queryRunner.manager.getRepository(BizBundleByAgency) : AppDataSource.getRepository(BizBundleByAgency);

        let bundle = await repo.findOne({
            where: { agent_id: data.agent_id, product_sku: data.product_sku }
        });

        if (bundle) {
            Object.assign(bundle, data);
            return await repo.save(bundle);
        } else {
            bundle = repo.create(data);
            return await repo.save(bundle);
        }
    }

    public async findActiveBundlesByAgentId(agentId: number, filters: { productSku?: string, name?: string } = {}, pagination?: { skip: number, take: number, orderBy: FindOptionsOrderValue }) {
        const { productSku, name } = filters;
        const qb = AppDataSource.getRepository(BizBundleByAgency)
            .createQueryBuilder("bundle")
            .where("bundle.agent_id = :agentId", { agentId })
            .andWhere("bundle.is_active = true");

        if (productSku) {
            qb.andWhere("bundle.product_sku ILIKE :productSku", { productSku: `%${productSku}%` });
        }

        if (name) {
            qb.andWhere("bundle.name ILIKE :name", { name: `%${name}%` });
        }

        if (pagination) {
            const { skip, take, orderBy } = pagination;
            qb.orderBy("bundle.created_at", orderBy as "ASC" | "DESC")
                .skip(skip)
                .take(take);
        }

        return await qb.getManyAndCount();
    }

    public async findActiveBundlesFiltered(
        agentId: number,
        filters: { productSku?: string, name?: string, regionGuid?: string, countryGuid?: string[] } = {},
        pagination?: { skip: number, take: number, orderBy: FindOptionsOrderValue }
    ) {
        const { productSku, name, regionGuid, countryGuid } = filters;
        const qb = AppDataSource.getRepository(BizBundleByAgency)
            .createQueryBuilder("bundle")
            .where("bundle.agent_id = :agentId", { agentId })
            .andWhere("bundle.is_active = true");

        if (productSku) {
            qb.andWhere("bundle.product_sku ILIKE :productSku", { productSku: `%${productSku}%` });
        }

        if (name) {
            qb.andWhere("bundle.name ILIKE :name", { name: `%${name}%` });
        }

        // Join to filter by Region/Country via SiteCategory
        if (regionGuid || (countryGuid && countryGuid.length > 0)) {
            qb.innerJoin(SiteProductVariant, "variant", "variant.product_sku = bundle.product_sku")
                .innerJoin(SiteProductCategoryMapping, "mapping", "mapping.product_id = variant.site_product_id")
                .innerJoin(SiteCategory, "category", "category.id = mapping.category_id");

            if (regionGuid && countryGuid && countryGuid.length > 0) {
                qb.andWhere("(category.guid = :regionGuid OR category.guid IN (:...countryGuid))", { regionGuid, countryGuid });
            } else if (regionGuid) {
                qb.andWhere("category.guid = :regionGuid", { regionGuid });
            } else if (countryGuid && countryGuid.length > 0) {
                qb.andWhere("category.guid IN (:...countryGuid)", { countryGuid });
            }
        }

        if (pagination) {
            const { skip, take, orderBy } = pagination;
            qb.orderBy("bundle.created_at", orderBy as "ASC" | "DESC")
                .skip(skip)
                .take(take);
        }

        return await qb.getManyAndCount();
    }

    public async deleteByAgentId(agentId: number, queryRunner?: any) {
        const repo = queryRunner ? queryRunner.manager.getRepository(BizBundleByAgency) : AppDataSource.getRepository(BizBundleByAgency);
        return await repo.delete({ agent_id: agentId });
    }
}

export const bundleByAgencyRepository = new BundleByAgencyRepository();
