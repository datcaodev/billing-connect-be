"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeRateHistoryRepository = void 0;
const database_config_1 = require("../config/database.config");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
const entity_1 = require("../entity");
class ExchangeRateHistoryRepository extends baseRepositories_core_1.BaseRespository {
    constructor() {
        super(...arguments);
        this.create = (data) => {
            return this.handleWithTryCatch(async () => {
                const repository = database_config_1.AppDataSource.getRepository(entity_1.SiteExchangeRateHistory);
                const exchangeRateHistory = repository.create({
                    currency: data.currency,
                    rate: data.rate,
                    start_date: data.startDate,
                    end_date: data.endDate,
                });
                await repository.save(exchangeRateHistory);
                return exchangeRateHistory;
            });
        };
        // search exchange rate history
        this.searchExchangeRateHistory = (data, pagination) => {
            return this.handleWithTryCatch(async () => {
                const { targetCurrency, startDate } = data;
                const { orderBy, skip, take } = pagination;
                const repository = database_config_1.AppDataSource.getRepository(entity_1.SiteExchangeRateHistory);
                const qb = repository
                    .createQueryBuilder("exchangeRateHistory")
                    .where("1 = 1");
                // filter currency
                if (targetCurrency) {
                    qb.andWhere("exchangeRateHistory.currency = :targetCurrency", { targetCurrency });
                }
                // filter startDate
                if (startDate) {
                    const [day, month, year] = startDate.split("/");
                    const parsedDate = `${year}-${month}-${day}`;
                    qb.andWhere("DATE(exchangeRateHistory.start_date) <= :parsedDate", { parsedDate })
                        .andWhere("DATE(exchangeRateHistory.end_date) >= :parsedDate", { parsedDate });
                }
                qb.orderBy("exchangeRateHistory.created_at", orderBy)
                    .skip(skip)
                    .take(take);
                const [result, total] = await qb.getManyAndCount();
                return { result, total };
            });
        };
    }
}
exports.exchangeRateHistoryRepository = new ExchangeRateHistoryRepository();
//# sourceMappingURL=exchangeRateHistory.repository.js.map