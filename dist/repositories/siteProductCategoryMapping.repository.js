"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteProductCategoryMappingRepository = void 0;
const database_config_1 = require("../config/database.config");
const siteProductCategoryMapping_entity_1 = require("../entity/siteProductCategoryMapping.entity");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
class SiteProductCategoryMappingRepository extends baseRepositories_core_1.BaseRespository {
    constructor() {
        super(...arguments);
        this.repository = database_config_1.AppDataSource.getRepository(siteProductCategoryMapping_entity_1.SiteProductCategoryMapping);
    }
    async createMapping(data, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(siteProductCategoryMapping_entity_1.SiteProductCategoryMapping) : this.repository;
        const mapping = repo.create(data);
        return await repo.save(mapping);
    }
}
exports.siteProductCategoryMappingRepository = new SiteProductCategoryMappingRepository();
//# sourceMappingURL=siteProductCategoryMapping.repository.js.map