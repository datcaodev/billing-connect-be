import { AppDataSource } from "../config/database.config";
import { BaseRespository } from "../core/baseRepositories.core";
import { BillionCountry } from "../entity/billionCountry.entity";

class BillionCountryRepository extends BaseRespository {
    public getAllBillionCountries = (): Promise<BillionCountry[]> => {
        return this.handleWithTryCatch(async () => {
            const data = await AppDataSource.getRepository(BillionCountry).find();
            return data;
        });
    };
    public getAllAreas = (): Promise<string[]> => {
        return this.handleWithTryCatch(async () => {
            const data = await AppDataSource.getRepository(BillionCountry)
                .createQueryBuilder("country")
                .select("DISTINCT(country.continent)", "continent")
                .where("country.continent IS NOT NULL")
                .getRawMany();
            return data.map(item => item.continent);
        });
    };
}

export const billionCountryRepository = new BillionCountryRepository();
