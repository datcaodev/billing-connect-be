"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billionCountryRepository = void 0;
const database_config_1 = require("../config/database.config");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
const billionCountry_entity_1 = require("../entity/billionCountry.entity");
class BillionCountryRepository extends baseRepositories_core_1.BaseRespository {
    constructor() {
        super(...arguments);
        this.getAllBillionCountries = () => {
            return this.handleWithTryCatch(async () => {
                const data = await database_config_1.AppDataSource.getRepository(billionCountry_entity_1.BillionCountry).find();
                return data;
            });
        };
        this.getAllAreas = () => {
            return this.handleWithTryCatch(async () => {
                const data = await database_config_1.AppDataSource.getRepository(billionCountry_entity_1.BillionCountry)
                    .createQueryBuilder("country")
                    .select("DISTINCT(country.continent)", "continent")
                    .where("country.continent IS NOT NULL")
                    .getRawMany();
                return data.map(item => item.continent);
            });
        };
    }
}
exports.billionCountryRepository = new BillionCountryRepository();
//# sourceMappingURL=billionCountry.repository.js.map