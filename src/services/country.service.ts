import { mapData, mapDataArray } from "../core/basePagination.core";
import { BaseService } from "../core/baseService.core";
import { CountryDto } from "../dto/country.dto";
import { billionCountryRepository } from "../repositories";

class CountryService extends BaseService {

    public getAllBillionCountries = (): Promise<CountryDto[]> => {
        return this.handleWithTryCatch(async () => {
            const data = await billionCountryRepository.getAllBillionCountries();

            const dataMappingDTO = mapDataArray({
                dtoClass: CountryDto,
                entities: data
            });

            return dataMappingDTO;
        });
    };
}

export const countryService = new CountryService();
