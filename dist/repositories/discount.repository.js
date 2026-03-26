"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discountRepository = void 0;
const database_config_1 = require("../config/database.config");
const siteDiscounts_entity_1 = require("../entity/siteDiscounts.entity");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
const discountStatus_enum_1 = require("../enums/discountStatus.enum");
class DiscountRepository extends baseRepositories_core_1.BaseRespository {
    constructor() {
        super(...arguments);
        this.repository = database_config_1.AppDataSource.getRepository(siteDiscounts_entity_1.SiteDiscount);
    }
    async findByName(name) {
        return await this.repository.findOne({ where: { name } });
    }
    async findByGuid(guid) {
        return await this.repository.findOne({ where: { guid } });
    }
    async createDiscount(data) {
        const newDiscount = this.repository.create(data);
        return await this.repository.save(newDiscount);
    }
    async searchDiscounts(data, pagination) {
        return this.handleWithTryCatch(async () => {
            const { guid, status } = data;
            const { orderBy, skip, take } = pagination;
            const qb = this.repository.createQueryBuilder("discount").where("discount.is_deleted = false");
            if (guid) {
                qb.andWhere("discount.guid = :guid", { guid });
            }
            if (status) {
                if (status === discountStatus_enum_1.DiscountStatus.INACTIVE) {
                    qb.andWhere("discount.start_date > CURRENT_TIMESTAMP");
                }
                else if (status === discountStatus_enum_1.DiscountStatus.ACTIVE) {
                    qb.andWhere("discount.start_date <= CURRENT_TIMESTAMP AND discount.end_date >= CURRENT_TIMESTAMP");
                }
                else if (status === discountStatus_enum_1.DiscountStatus.EXPIRED) {
                    qb.andWhere("discount.end_date < CURRENT_TIMESTAMP");
                }
            }
            qb.orderBy("discount.id", orderBy)
                .skip(skip)
                .take(take);
            return await qb.getManyAndCount();
        });
    }
    async searchDiscountsAll(data) {
        return this.handleWithTryCatch(async () => {
            const { guid, status } = data;
            const qb = this.repository.createQueryBuilder("discount")
                .where("discount.is_deleted = false")
                .andWhere("discount.end_date >= CURRENT_TIMESTAMP");
            if (guid) {
                qb.andWhere("discount.guid = :guid", { guid });
            }
            if (status) {
                if (status === discountStatus_enum_1.DiscountStatus.INACTIVE) {
                    qb.andWhere("discount.start_date > CURRENT_TIMESTAMP");
                }
                else if (status === discountStatus_enum_1.DiscountStatus.ACTIVE) {
                    qb.andWhere("discount.start_date <= CURRENT_TIMESTAMP AND discount.end_date >= CURRENT_TIMESTAMP");
                }
                else if (status === discountStatus_enum_1.DiscountStatus.EXPIRED) {
                    qb.andWhere("discount.end_date < CURRENT_TIMESTAMP");
                }
            }
            qb.orderBy("discount.id", "DESC");
            return await qb.getMany();
        });
    }
}
exports.discountRepository = new DiscountRepository();
//# sourceMappingURL=discount.repository.js.map