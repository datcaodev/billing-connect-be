import { AppDataSource } from "../config/database.config";
import { SiteProductCategoryMapping } from "../entity/siteProductCategoryMapping.entity";
import { BaseRespository } from "../core/baseRepositories.core";
import { QueryRunner } from "typeorm";

class SiteProductCategoryMappingRepository extends BaseRespository {
    private repository = AppDataSource.getRepository(SiteProductCategoryMapping);

    public async createMapping(data: Partial<SiteProductCategoryMapping>, queryRunner?: QueryRunner): Promise<SiteProductCategoryMapping> {
        const repo = queryRunner ? queryRunner.manager.getRepository(SiteProductCategoryMapping) : this.repository;
        const mapping = repo.create(data);
        return await repo.save(mapping);
    }
}

export const siteProductCategoryMappingRepository = new SiteProductCategoryMappingRepository();
