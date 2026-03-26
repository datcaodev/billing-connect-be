"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteCategoryRepository = void 0;
const database_config_1 = require("../config/database.config");
const siteCategory_entity_1 = require("../entity/siteCategory.entity");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
const typeorm_1 = require("typeorm");
class SiteCategoryRepository extends baseRepositories_core_1.BaseRespository {
    constructor() {
        super(...arguments);
        this.repository = database_config_1.AppDataSource.getRepository(siteCategory_entity_1.SiteCategory);
    }
    async findByIds(ids) {
        return await this.repository.find({
            where: { id: (0, typeorm_1.In)(ids), is_deleted: false }
        });
    }
    async findByGuids(guids) {
        return await this.repository.find({
            where: { guid: (0, typeorm_1.In)(guids), is_deleted: false }
        });
    }
    async findByCode(code) {
        return await this.repository.findOne({ where: { code, is_deleted: false } });
    }
    async findByGuid(guid) {
        return await this.repository.findOne({
            where: {
                guid: guid,
                is_deleted: false
            },
        });
    }
    async createArea(data) {
        data.parent = null;
        const newArea = this.repository.create(data);
        return await this.repository.save(newArea);
    }
    async createCountry(data) {
        // Parent = Area ID ở hàm service truyền vào
        const newCountry = this.repository.create(data);
        return await this.repository.save(newCountry);
    }
    async getCountries(name, code, pagination) {
        const query = this.repository.createQueryBuilder("c")
            .leftJoinAndMapOne("c.area", siteCategory_entity_1.SiteCategory, "area", "area.id = c.parent")
            .where("c.parent IS NOT NULL")
            .andWhere("c.is_deleted = false");
        if (name) {
            query.andWhere("c.name ILIKE :name", { name: `%${name}%` });
        }
        if (code) {
            query.andWhere("c.code ILIKE :code", { code: `%${code}%` });
        }
        query.orderBy("c.position", "ASC", "NULLS LAST")
            .addOrderBy("c.created_at", "DESC");
        query.skip(pagination.skip).take(pagination.take);
        const [data, total] = await query.getManyAndCount();
        return { result: data, total };
    }
    async getCountriesByArea(areaGuid) {
        const query = this.repository.createQueryBuilder("c")
            .where("c.parent IS NOT NULL")
            .andWhere("c.is_deleted = false");
        if (areaGuid) {
            query.innerJoin(siteCategory_entity_1.SiteCategory, "area", "area.id = c.parent")
                .andWhere("area.guid = :areaGuid", { areaGuid });
        }
        query.orderBy("c.position", "ASC", "NULLS LAST")
            .addOrderBy("c.created_at", "DESC");
        return await query.getMany();
    }
    async getAreas(name, code, pagination) {
        const query = this.repository.createQueryBuilder("c")
            .leftJoinAndMapMany("c.countries", siteCategory_entity_1.SiteCategory, "country", "country.parent = c.id AND country.is_deleted = false")
            .where("c.parent IS NULL")
            .andWhere("c.is_deleted = false");
        if (name) {
            query.andWhere("c.name ILIKE :name", { name: `%${name}%` });
        }
        if (code) {
            query.andWhere("c.code ILIKE :code", { code: `%${code}%` });
        }
        query.orderBy("c.position", "ASC", "NULLS LAST")
            .addOrderBy("c.created_at", "DESC");
        query.skip(pagination.skip).take(pagination.take);
        const [data, total] = await query.getManyAndCount();
        return { result: data, total };
    }
    async getAreasAll(name, code) {
        const query = this.repository.createQueryBuilder("c")
            // .leftJoinAndMapMany("c.countries", SiteCategory, "country", "country.parent = c.id AND country.is_deleted = false")
            .where("c.parent IS NULL")
            .andWhere("c.is_deleted = false");
        if (name) {
            query.andWhere("c.name ILIKE :name", { name: `%${name}%` });
        }
        if (code) {
            query.andWhere("c.code ILIKE :code", { code: `%${code}%` });
        }
        query.orderBy("c.position", "ASC", "NULLS LAST")
            .addOrderBy("c.created_at", "DESC");
        return await query.getMany();
    }
    async update(id, data) {
        return await this.repository.update(id, data);
    }
}
exports.siteCategoryRepository = new SiteCategoryRepository();
//# sourceMappingURL=siteCategory.repository.js.map