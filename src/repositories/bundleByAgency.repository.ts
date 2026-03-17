import { AppDataSource } from "../config/database.config";
import { BizBundleByAgency } from "../entity/bizBundleByAgency.entity";
import { BaseRespository } from "../core/baseRepositories.core";

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

    public async findActiveBundlesByAgentId(agentId: number) {
        return await AppDataSource.getRepository(BizBundleByAgency)
            .createQueryBuilder("bundle")
            .where("bundle.agent_id = :agentId", { agentId })
            .andWhere("bundle.is_active = true")
            .getMany();
    }
}

export const bundleByAgencyRepository = new BundleByAgencyRepository();
