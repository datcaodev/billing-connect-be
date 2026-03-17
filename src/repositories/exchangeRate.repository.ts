import { AppDataSource } from "../config/database.config";
import { BaseRespository } from "../core/baseRepositories.core";
import { SiteExchangeRate } from "../entity";

class ExchangeRateRepository extends BaseRespository {
    public upsert = (data: {
        currency: string;
        rate: string;
    }) => {
        return this.handleWithTryCatch(async () => {
            const repository = AppDataSource.getRepository(SiteExchangeRate);
            // mặc định nếu chưa có thì tạo bản ghi mới, nếu đã có thì update
            const dataSave = await repository.save({
                id: 1,
                currency: data.currency,
                rate: data.rate,
            });
            return dataSave;
        });
    };

    public findData = () => {
        return this.handleWithTryCatch(async () => {
            const repository = AppDataSource.getRepository(SiteExchangeRate);
            const data = await repository.findOne({
                where: {
                    id: 1,
                },
            });

            return data;
        });
    };
}

export const exchangeRateRepository = new ExchangeRateRepository();
