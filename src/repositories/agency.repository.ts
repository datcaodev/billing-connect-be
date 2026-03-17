import { AppDataSource } from "../config/database.config";
import { BizAgency } from "../entity/bizAgency.entity";

class AgencyRepository {
    private repository = AppDataSource.getRepository(BizAgency);

    public async checkExistCode(code: string): Promise<boolean> {
        const count = await this.repository.count({ where: { code, is_deleted: false } });
        return count > 0;
    }

    public async checkExistEmail(email: string): Promise<boolean> {
        const count = await this.repository.count({ where: { email, is_deleted: false } });
        return count > 0;
    }

    public async createAgency(data: Partial<BizAgency>): Promise<BizAgency> {
        const newAgency = this.repository.create(data);
        return await this.repository.save(newAgency);
    }

    public async findByGuid(guid: string): Promise<BizAgency | null> {
        return await this.repository.findOne({ where: { guid, is_deleted: false } });
    }

    public async checkExistEmailExcludeGuid(email: string, excludeGuid: string): Promise<boolean> {
        const count = await this.repository.createQueryBuilder("agency")
            .where("agency.email = :email", { email })
            .andWhere("agency.guid != :excludeGuid", { excludeGuid })
            .andWhere("agency.is_deleted = false")
            .getCount();
        return count > 0;
    }

    public async updateAgency(guid: string, data: Partial<BizAgency>): Promise<BizAgency | null> {
        await this.repository.update({ guid }, data);
        return this.findByGuid(guid);
    }

    public async deleteAgency(guid: string): Promise<void> {
        await this.repository.update({ guid }, { is_deleted: true } as any);
    }

    public async updateAgencyFormula(id: number, formula: any, remark: string, queryRunner?: any): Promise<void> {
        const repo = queryRunner ? queryRunner.manager.getRepository(BizAgency) : this.repository;
        await repo.update({ id }, {
            formula,
            formula_note: remark
        });
    }

    public async searchAgency(data: any, pagination: any) {
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

        qb.orderBy("agency.created_at", orderBy as "ASC" | "DESC")
            .skip(skip)
            .take(take);

        const [result, total] = await qb.getManyAndCount();
        return { result, total };
    }
}

export const agencyRepository = new AgencyRepository();
