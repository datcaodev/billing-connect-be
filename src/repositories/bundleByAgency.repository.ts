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
        filters: { productSku?: string, name?: string, countryMcc?: string[], areaName?: string } = {},
        pagination?: { skip: number, take: number, orderBy: FindOptionsOrderValue }
    ) {
        const { productSku, name, countryMcc, areaName } = filters;
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

        if (countryMcc && countryMcc.length > 0) {
            qb.andWhere("bundle.country_mcc IN (:...countryMcc)", { countryMcc });
        }

        if (areaName) {
            qb.andWhere("bundle.area_name ILIKE :areaName", { areaName: `%${areaName}%` });
        }

        if (pagination) {
            const { skip, take, orderBy } = pagination;
            qb.orderBy("bundle.created_at", orderBy as "ASC" | "DESC")
                .skip(skip)
                .take(take);
        }

        return await qb.getManyAndCount();
    }

    public async bulkInsert(data: any[], queryRunner?: any) {
        const repo = queryRunner ? queryRunner.manager.getRepository(BizBundleByAgency) : AppDataSource.getRepository(BizBundleByAgency);
        const result = await repo.createQueryBuilder()
            .insert()
            .values(data)
            .returning("*")
            .execute();
        return result.raw;
    }

    public async deleteByAgentId(agentId: number, queryRunner?: any) {
        const repo = queryRunner ? queryRunner.manager.getRepository(BizBundleByAgency) : AppDataSource.getRepository(BizBundleByAgency);
        return await repo.delete({ agent_id: agentId });
    }
}

export const bundleByAgencyRepository = new BundleByAgencyRepository();
