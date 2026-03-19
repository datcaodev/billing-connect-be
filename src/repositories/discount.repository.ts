import { AppDataSource } from "../config/database.config";
import { SiteDiscount } from "../entity/siteDiscounts.entity";
import { BaseRespository } from "../core/baseRepositories.core";
import { DiscountStatus } from "../enums/discountStatus.enum";

class DiscountRepository extends BaseRespository {
    private repository = AppDataSource.getRepository(SiteDiscount);

    public async findByName(name: string): Promise<SiteDiscount | null> {
        return await this.repository.findOne({ where: { name } });
    }

    public async findByGuid(guid: string): Promise<SiteDiscount | null> {
        return await this.repository.findOne({ where: { guid } });
    }

    public async createDiscount(data: Partial<SiteDiscount>): Promise<SiteDiscount> {
        const newDiscount = this.repository.create(data);
        return await this.repository.save(newDiscount);
    }

    public async searchDiscounts(data: any, pagination: any) {
        return this.handleWithTryCatch(async () => {
            const { guid, status } = data;
            const { orderBy, skip, take } = pagination;

            const qb = this.repository.createQueryBuilder("discount").where("discount.is_deleted = false");

            if (guid) {
                qb.andWhere("discount.guid = :guid", { guid });
            }

            if (status) {
                if (status === DiscountStatus.INACTIVE) {
                    qb.andWhere("discount.start_date > CURRENT_TIMESTAMP");
                } else if (status === DiscountStatus.ACTIVE) {
                    qb.andWhere("discount.start_date <= CURRENT_TIMESTAMP AND discount.end_date >= CURRENT_TIMESTAMP");
                } else if (status === DiscountStatus.EXPIRED) {
                    qb.andWhere("discount.end_date < CURRENT_TIMESTAMP");
                }
            }

            qb.orderBy("discount.id", orderBy as "ASC" | "DESC")
                .skip(skip)
                .take(take);

            return await qb.getManyAndCount();
        });
    }

    public async searchDiscountsAll(data: any) {
        return this.handleWithTryCatch(async () => {
            const { guid, status } = data;

            const qb = this.repository.createQueryBuilder("discount")
                .where("discount.is_deleted = false")
                .andWhere("discount.end_date >= CURRENT_TIMESTAMP");

            if (guid) {
                qb.andWhere("discount.guid = :guid", { guid });
            }

            if (status) {
                if (status === DiscountStatus.INACTIVE) {
                    qb.andWhere("discount.start_date > CURRENT_TIMESTAMP");
                } else if (status === DiscountStatus.ACTIVE) {
                    qb.andWhere("discount.start_date <= CURRENT_TIMESTAMP AND discount.end_date >= CURRENT_TIMESTAMP");
                } else if (status === DiscountStatus.EXPIRED) {
                    qb.andWhere("discount.end_date < CURRENT_TIMESTAMP");
                }
            }

            qb.orderBy("discount.id", "DESC");

            return await qb.getMany();
        });
    }
}

export const discountRepository = new DiscountRepository();
