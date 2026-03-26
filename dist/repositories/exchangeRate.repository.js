"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeRateRepository = void 0;
const database_config_1 = require("../config/database.config");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
const entity_1 = require("../entity");
class ExchangeRateRepository extends baseRepositories_core_1.BaseRespository {
    constructor() {
        super(...arguments);
        this.upsert = (data) => {
            return this.handleWithTryCatch(async () => {
                const repository = database_config_1.AppDataSource.getRepository(entity_1.SiteExchangeRate);
                // mặc định nếu chưa có thì tạo bản ghi mới, nếu đã có thì update
                const dataSave = await repository.save({
                    id: 1,
                    currency: data.currency,
                    rate: data.rate,
                });
                return dataSave;
            });
        };
        this.findData = () => {
            return this.handleWithTryCatch(async () => {
                const repository = database_config_1.AppDataSource.getRepository(entity_1.SiteExchangeRate);
                const data = await repository.findOne({
                    where: {
                        id: 1,
                    },
                });
                return data;
            });
        };
    }
}
exports.exchangeRateRepository = new ExchangeRateRepository();
//# sourceMappingURL=exchangeRate.repository.js.map