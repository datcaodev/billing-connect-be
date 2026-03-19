import { AppDataSource } from "../config/database.config";
import { SiteCategory } from "../entity/siteCategory.entity";
import { BaseRespository } from "../core/baseRepositories.core";
import { In } from "typeorm";
import { IPaginationMapping } from "../types/pagination.type";

class SiteCategoryRepository extends BaseRespository {
    private repository = AppDataSource.getRepository(SiteCategory);

    public async findByIds(ids: number[]) {
        return await this.repository.find({
            where: { id: In(ids) }
        });
    }

    public async findByGuids(guids: string[]) {
        return await this.repository.find({
            where: { guid: In(guids) }
        });
    }

    public async findByCode(code: string) {
        return await this.repository.findOne({ where: { code } });
    }

    public async findByGuid(guid: string) {
        return await this.repository.findOne({
            where: {
                guid: guid,
                is_deleted: false
            },
        });
    }

    public async createArea(data: Partial<SiteCategory>) {
        data.parent = null;

        const newArea = this.repository.create(data);
        return await this.repository.save(newArea);
    }

    public async createCountry(data: Partial<SiteCategory>) {
        // Parent = Area ID ở hàm service truyền vào
        const newCountry = this.repository.create(data);
        return await this.repository.save(newCountry);
    }

    public async getCountries(name: string | undefined, code: string | undefined, pagination: IPaginationMapping) {
        const query = this.repository.createQueryBuilder("c")
            .leftJoinAndMapOne("c.area", SiteCategory, "area", "area.id = c.parent")
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

    public async getCountriesByArea(areaGuid?: string) {
        const query = this.repository.createQueryBuilder("c")
            .where("c.parent IS NOT NULL")
            .andWhere("c.is_deleted = false");

        if (areaGuid) {
            query.innerJoin(SiteCategory, "area", "area.id = c.parent")
                .andWhere("area.guid = :areaGuid", { areaGuid });
        }

        query.orderBy("c.position", "ASC", "NULLS LAST")
            .addOrderBy("c.created_at", "DESC");

        return await query.getMany();
    }

    public async getAreas(name: string | undefined, code: string | undefined, pagination: IPaginationMapping) {
        const query = this.repository.createQueryBuilder("c")
            .leftJoinAndMapMany("c.countries", SiteCategory, "country", "country.parent = c.id AND country.is_deleted = false")
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

    public async getAreasAll(name: string | undefined, code: string | undefined) {
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

    public async update(id: number, data: Partial<SiteCategory>) {
        return await this.repository.update(id, data);
    }
}

export const siteCategoryRepository = new SiteCategoryRepository();
