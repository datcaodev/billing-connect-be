import { AppDataSource } from "../config/database.config";
import { BaseRespository } from "../core/baseRepositories.core";
import { SiteExchangeRateHistory } from "../entity";
import { ISearchExchangeRateHistoryRequest } from "../types/exchangeRate.type";
import { IPaginationMapping } from "../types/pagination.type";

class ExchangeRateHistoryRepository extends BaseRespository {
    public create = (data: {
        currency: string;
        rate: string;
        startDate: Date;
        endDate: Date;
    }) => {
        return this.handleWithTryCatch(async () => {
            const repository = AppDataSource.getRepository(SiteExchangeRateHistory);
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
    public searchExchangeRateHistory = (data: ISearchExchangeRateHistoryRequest, pagination: IPaginationMapping) => {
        return this.handleWithTryCatch(async () => {

            const { currency, startDate } = data;
            const { orderBy, skip, take } = pagination;

            const repository = AppDataSource.getRepository(SiteExchangeRateHistory);

            const qb = repository
                .createQueryBuilder("exchangeRateHistory")
                .where("1 = 1");

            // filter currency
            if (currency) {
                qb.andWhere("exchangeRateHistory.currency = :currency", { currency });
            }

            // filter startDate
            if (startDate) {
                const [day, month, year] = startDate.split("/");
                const parsedDate = `${year}-${month}-${day}`;
                qb.andWhere("DATE(exchangeRateHistory.start_date) = :parsedDate", { parsedDate });
            }

            qb.orderBy("exchangeRateHistory.created_at", orderBy as "ASC" | "DESC")
                .skip(skip)
                .take(take);

            const [result, total] = await qb.getManyAndCount();

            return { result, total };
        });
    };
}

export const exchangeRateHistoryRepository = new ExchangeRateHistoryRepository();
