"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copiesByBundleRepository = void 0;
const database_config_1 = require("../config/database.config");
const bizCopiesByBundle_entity_1 = require("../entity/bizCopiesByBundle.entity");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
class CopiesByBundleRepository extends baseRepositories_core_1.BaseRespository {
    async upsertCopy(data, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(bizCopiesByBundle_entity_1.BizCopiesByBundle) : database_config_1.AppDataSource.getRepository(bizCopiesByBundle_entity_1.BizCopiesByBundle);
        let copy = await repo.findOne({
            where: { bundle_id: data.bundle_id, copies: data.copies }
        });
        if (copy) {
            Object.assign(copy, data);
            return await repo.save(copy);
        }
        else {
            copy = repo.create(data);
            return await repo.save(copy);
        }
    }
    async deleteByBundleIdExcludeCopies(bundleId, activeCopies, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(bizCopiesByBundle_entity_1.BizCopiesByBundle) : database_config_1.AppDataSource.getRepository(bizCopiesByBundle_entity_1.BizCopiesByBundle);
        // Soft delete or hard delete? The entity has BaseTimeEntity but not is_deleted.
        // Let's just deactivate them if is_active exists, or hard delete if they are no longer in the list.
        // User didn't specify, but usually we sync.
        if (activeCopies.length > 0) {
            await repo.createQueryBuilder()
                .delete()
                .where("bundle_id = :bundleId AND copies NOT IN (:...activeCopies)", { bundleId, activeCopies })
                .execute();
        }
        else {
            await repo.delete({ bundle_id: bundleId });
        }
    }
    async getPriceBySkuAndCopies(sku, copies) {
        return await database_config_1.AppDataSource.getRepository(bizCopiesByBundle_entity_1.BizCopiesByBundle)
            .createQueryBuilder("cb")
            .innerJoin("cb.bundle", "bundle")
            .where("bundle.product_sku = :sku", { sku })
            .andWhere("cb.copies = :copies", { copies })
            .andWhere("bundle.is_active = true")
            .andWhere("cb.is_active = true")
            .getOne();
    }
    async findActiveCopiesByBundleIds(bundleIds) {
        return await database_config_1.AppDataSource.getRepository(bizCopiesByBundle_entity_1.BizCopiesByBundle)
            .createQueryBuilder("copy")
            .where("copy.bundle_id IN (:...bundleIds)", { bundleIds })
            .andWhere("copy.is_active = true")
            .getMany();
    }
    async findByGuidWithAgency(guid) {
        return await database_config_1.AppDataSource.getRepository(bizCopiesByBundle_entity_1.BizCopiesByBundle)
            .createQueryBuilder("copy")
            .innerJoinAndSelect("copy.bundle", "bundle")
            .innerJoinAndSelect("bundle.agency", "agency")
            .where("copy.guid = :guid", { guid })
            .getOne();
    }
    async updateFinalPriceByGuid(guid, price) {
        return await database_config_1.AppDataSource.getRepository(bizCopiesByBundle_entity_1.BizCopiesByBundle)
            .update({ guid }, { final_price: price, formula_snapsot: null });
    }
    async deleteByAgentId(agentId, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(bizCopiesByBundle_entity_1.BizCopiesByBundle) : database_config_1.AppDataSource.getRepository(bizCopiesByBundle_entity_1.BizCopiesByBundle);
        return await repo.createQueryBuilder("copy")
            .delete()
            .where("bundle_id IN (SELECT id FROM biz_bundle_by_agency WHERE agent_id = :agentId)", { agentId })
            .execute();
    }
}
exports.copiesByBundleRepository = new CopiesByBundleRepository();
//# sourceMappingURL=copiesByBundle.repository.js.map