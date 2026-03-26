"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryService = void 0;
const basePagination_core_1 = require("../core/basePagination.core");
const baseService_core_1 = require("../core/baseService.core");
const country_dto_1 = require("../dto/country.dto");
const area_dto_1 = require("../dto/area.dto");
const repositories_1 = require("../repositories");
class CountryService extends baseService_core_1.BaseService {
    constructor() {
        super(...arguments);
        this.getAllBillionCountries = () => {
            return this.handleWithTryCatch(async () => {
                const data = await repositories_1.billionCountryRepository.getAllBillionCountries();
                const dataMappingDTO = (0, basePagination_core_1.mapDataArray)({
                    dtoClass: country_dto_1.CountryDto,
                    entities: data
                });
                return dataMappingDTO;
            });
        };
        this.getAllAreas = () => {
            return this.handleWithTryCatch(async () => {
                const data = await repositories_1.billionCountryRepository.getAllAreas();
                const dataMappingDTO = (0, basePagination_core_1.mapDataArray)({
                    dtoClass: area_dto_1.AreaDto,
                    entities: data.map(name => ({ name }))
                });
                return dataMappingDTO;
            });
        };
    }
}
exports.countryService = new CountryService();
//# sourceMappingURL=country.service.js.map