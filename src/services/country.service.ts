import { mapData, mapDataArray } from "../core/basePagination.core";
import { BaseService } from "../core/baseService.core";
import { CountryDto } from "../dto/country.dto";
import { AreaDto } from "../dto/area.dto";
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

    public getAllAreas = (): Promise<AreaDto[]> => {
        return this.handleWithTryCatch(async () => {
            const data = await billionCountryRepository.getAllAreas();

            const dataMappingDTO = mapDataArray({
                dtoClass: AreaDto,
                entities: data.map(name => ({ name }))
            });

            return dataMappingDTO;
        });
    };
}

export const countryService = new CountryService();
