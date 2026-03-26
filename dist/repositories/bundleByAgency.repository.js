"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundleByAgencyRepository = void 0;
const database_config_1 = require("../config/database.config");
const bizBundleByAgency_entity_1 = require("../entity/bizBundleByAgency.entity");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
class BundleByAgencyRepository extends baseRepositories_core_1.BaseRespository {
    async findByAgentAndSku(agentId, productSku) {
        return await database_config_1.AppDataSource.getRepository(bizBundleByAgency_entity_1.BizBundleByAgency).findOne({
            where: { agent_id: agentId, product_sku: productSku }
        });
    }
    async upsertBundle(data, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(bizBundleByAgency_entity_1.BizBundleByAgency) : database_config_1.AppDataSource.getRepository(bizBundleByAgency_entity_1.BizBundleByAgency);
        let bundle = await repo.findOne({
            where: { agent_id: data.agent_id, product_sku: data.product_sku }
        });
        if (bundle) {
            Object.assign(bundle, data);
            return await repo.save(bundle);
        }
        else {
            bundle = repo.create(data);
            return await repo.save(bundle);
        }
    }
    async findActiveBundlesByAgentId(agentId, filters = {}, pagination) {
        const { productSku, name } = filters;
        const qb = database_config_1.AppDataSource.getRepository(bizBundleByAgency_entity_1.BizBundleByAgency)
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
            qb.orderBy("bundle.created_at", orderBy)
                .skip(skip)
                .take(take);
        }
        return await qb.getManyAndCount();
    }
    async findActiveBundlesFiltered(agentId, filters = {}, pagination) {
        const { productSku, name, countryMcc, areaName } = filters;
        const qb = database_config_1.AppDataSource.getRepository(bizBundleByAgency_entity_1.BizBundleByAgency)
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
            qb.orderBy("bundle.created_at", orderBy)
                .skip(skip)
                .take(take);
        }
        return await qb.getManyAndCount();
    }
    async deleteByAgentId(agentId, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(bizBundleByAgency_entity_1.BizBundleByAgency) : database_config_1.AppDataSource.getRepository(bizBundleByAgency_entity_1.BizBundleByAgency);
        return await repo.delete({ agent_id: agentId });
    }
}
exports.bundleByAgencyRepository = new BundleByAgencyRepository();
//# sourceMappingURL=bundleByAgency.repository.js.map