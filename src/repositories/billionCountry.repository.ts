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
}

export const billionCountryRepository = new BillionCountryRepository();
