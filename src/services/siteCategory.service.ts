import { BaseService } from "../core/baseService.core";
import { siteCategoryRepository } from "../repositories/siteCategory.repository";
import { AppError } from "../utils/errors/AppError.error";
import { ErrorCode } from "../enums/error.enum";
import { ICreateAreaRequest, ICreateCountryRequest, IGetCountriesRequest, IGetAreasRequest, IUpdateAreaRequest, IUpdateCountryRequest, IGetAreasAllRequest, IGetCountriesByAreaRequest } from "../types";
import { NotFoundError } from "../utils/errors/NotFoundError.error";
import { ConflictError } from "../utils/errors/ConflictError.error";

import { mapPaginatedData } from "../core/basePagination.core";
import { getPagination } from "../utils/function.utils";
import { SiteCategoryDto } from "../dto/siteCategory.dto";
import { plainToInstance } from "class-transformer";

class SiteCategoryService extends BaseService {
    public async updateCountry(guid: string, data: IUpdateCountryRequest) {
        return await this.handleWithTryCatch(async () => {
            const country = await siteCategoryRepository.findByGuid(guid);
            if (!country) {
                throw new NotFoundError("Quốc gia không tồn tại");
            }

            if (country.parent === null) {
                throw new ConflictError("Dữ liệu không phải là quốc gia");
            }

            const updateData: any = {
                name: data.name,
                position: data.position
            };

            if (data.areaGuid) {
                const area = await siteCategoryRepository.findByGuid(data.areaGuid);
                if (!area) {
                    throw new NotFoundError("Khu vực mới không tồn tại");
                }
                if (area.parent !== null) {
                    throw new ConflictError("Khu vực mục tiêu không hợp lệ");
                }
                updateData.parent = area.id;
            }

            await siteCategoryRepository.update(country.id, updateData);

            return true;
        });
    }

    public async updateArea(guid: string, data: IUpdateAreaRequest) {
        return await this.handleWithTryCatch(async () => {
            const area = await siteCategoryRepository.findByGuid(guid);
            if (!area) {
                throw new NotFoundError("Khu vực không tồn tại");
            }

            if (area.parent !== null) {
                throw new ConflictError("Không thể cập nhật dữ liệu không phải là khu vực");
            }

            await siteCategoryRepository.update(area.id, data);

            return true;
        });
    }

    public async createArea(data: ICreateAreaRequest) {
        return await this.handleWithTryCatch(async () => {
            const { name, code, position } = data;

            // Kiểm tra xem code đã tồn tại chưa
            const existingCode = await siteCategoryRepository.findByCode(code);
            if (existingCode) {
                throw new ConflictError("Mã khu vực đã tồn tại");
            }

            const area = await siteCategoryRepository.createArea({
                name,
                code,
                position
            });

            return area;
        });
    }

    public async createCountry(data: ICreateCountryRequest) {
        return await this.handleWithTryCatch(async () => {
            const { name, code, areaGuid, position } = data;

            // 1. Kiểm tra Area GUID có tồn tại không
            const area = await siteCategoryRepository.findByGuid(areaGuid);
            if (!area) {
                throw new NotFoundError("Khu vực không tồn tại");
            }

            // 2. Kiểm tra xem code quốc gia đã tồn tại chưa
            const existingCode = await siteCategoryRepository.findByCode(code);
            if (existingCode) {
                throw new ConflictError("Mã quốc gia này đã tồn tại trong hệ thống");
            }

            const country = await siteCategoryRepository.createCountry({
                name,
                code,
                country_mcc: code,
                position,
                parent: area.id
            });

            return country;
        });
    }

    public async getCountries(query: IGetCountriesRequest) {
        return await this.handleWithTryCatch(async () => {
            const { page, size, name, code } = query;
            const pagination = getPagination({ page, size, sortBy: 'ASC' }); // default ASC for position

            const resultData = await siteCategoryRepository.getCountries(name, code, pagination);

            const dataMappingDTO = mapPaginatedData({
                dtoClass: SiteCategoryDto,
                entities: resultData.result,
                skip: pagination.skip,
                take: pagination.take,
                total: resultData.total
            });

            return dataMappingDTO;
        });
    }

    public async getCountriesByArea(query: IGetCountriesByAreaRequest) {
        return await this.handleWithTryCatch(async () => {
            const { areaGuid } = query;
            const countries = await siteCategoryRepository.getCountriesByArea(areaGuid);
            return plainToInstance(SiteCategoryDto, countries);
        });
    }

    public async getAreas(query: IGetAreasRequest) {
        return await this.handleWithTryCatch(async () => {
            const { page, size, name, code } = query;
            const pagination = getPagination({ page, size, sortBy: "ASC" });

            const resultData = await siteCategoryRepository.getAreas(name, code, pagination);

            const dataMappingDTO = mapPaginatedData({
                dtoClass: SiteCategoryDto,
                entities: resultData.result,
                skip: pagination.skip,
                take: pagination.take,
                total: resultData.total,
            });

            return dataMappingDTO;
        });
    }

    public async getAreasAll(query: IGetAreasAllRequest) {
        return await this.handleWithTryCatch(async () => {
            const { name, code } = query;
            const areas = await siteCategoryRepository.getAreasAll(name, code);
            return plainToInstance(SiteCategoryDto, areas);
        });
    }
}

export const siteCategoryService = new SiteCategoryService();
