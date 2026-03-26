"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agencyRepository = void 0;
const database_config_1 = require("../config/database.config");
const bizAgency_entity_1 = require("../entity/bizAgency.entity");
class AgencyRepository {
    constructor() {
        this.repository = database_config_1.AppDataSource.getRepository(bizAgency_entity_1.BizAgency);
    }
    async checkExistCode(code) {
        const count = await this.repository.count({ where: { code, is_deleted: false } });
        return count > 0;
    }
    async checkExistEmail(email) {
        const count = await this.repository.count({ where: { email, is_deleted: false } });
        return count > 0;
    }
    async createAgency(data) {
        const newAgency = this.repository.create(data);
        return await this.repository.save(newAgency);
    }
    async findByGuid(guid) {
        return await this.repository.findOne({ where: { guid, is_deleted: false } });
    }
    async checkExistEmailExcludeGuid(email, excludeGuid) {
        const count = await this.repository.createQueryBuilder("agency")
            .where("agency.email = :email", { email })
            .andWhere("agency.guid != :excludeGuid", { excludeGuid })
            .andWhere("agency.is_deleted = false")
            .getCount();
        return count > 0;
    }
    async updateAgency(guid, data) {
        await this.repository.update({ guid }, data);
        return this.findByGuid(guid);
    }
    async deleteAgency(guid) {
        await this.repository.update({ guid }, { is_deleted: true });
    }
    async updateAgencyFormula(id, formula, remark, queryRunner) {
        const repo = queryRunner ? queryRunner.manager.getRepository(bizAgency_entity_1.BizAgency) : this.repository;
        await repo.update({ id }, {
            formula,
            formula_note: remark
        });
    }
    async searchAgency(data, pagination) {
        const { code, name } = data;
        const { orderBy, skip, take } = pagination;
        const qb = this.repository.createQueryBuilder("agency")
            .where("agency.is_deleted = false");
        if (code) {
            qb.andWhere("agency.code ILIKE :code", { code: `%${code}%` });
        }
        if (name) {
            qb.andWhere("agency.name ILIKE :name", { name: `%${name}%` });
        }
        qb.orderBy("agency.created_at", orderBy)
            .skip(skip)
            .take(take);
        const [result, total] = await qb.getManyAndCount();
        return { result, total };
    }
    async findAllAgencies() {
        return await this.repository.find({
            where: { is_deleted: false },
            order: { name: "ASC" }
        });
    }
}
exports.agencyRepository = new AgencyRepository();
//# sourceMappingURL=agency.repository.js.map