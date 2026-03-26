"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteCategoryService = void 0;
const baseService_core_1 = require("../core/baseService.core");
const siteCategory_repository_1 = require("../repositories/siteCategory.repository");
const NotFoundError_error_1 = require("../utils/errors/NotFoundError.error");
const ConflictError_error_1 = require("../utils/errors/ConflictError.error");
const basePagination_core_1 = require("../core/basePagination.core");
const function_utils_1 = require("../utils/function.utils");
const siteCategory_dto_1 = require("../dto/siteCategory.dto");
const class_transformer_1 = require("class-transformer");
class SiteCategoryService extends baseService_core_1.BaseService {
    async updateCountry(guid, data) {
        return await this.handleWithTryCatch(async () => {
            const country = await siteCategory_repository_1.siteCategoryRepository.findByGuid(guid);
            if (!country) {
                throw new NotFoundError_error_1.NotFoundError("Quốc gia không tồn tại");
            }
            if (country.parent === null) {
                throw new ConflictError_error_1.ConflictError("Dữ liệu không phải là quốc gia");
            }
            const updateData = {
                name: data.name,
                position: data.position
            };
            if (data.areaGuid) {
                const area = await siteCategory_repository_1.siteCategoryRepository.findByGuid(data.areaGuid);
                if (!area) {
                    throw new NotFoundError_error_1.NotFoundError("Khu vực mới không tồn tại");
                }
                if (area.parent !== null) {
                    throw new ConflictError_error_1.ConflictError("Khu vực mục tiêu không hợp lệ");
                }
                updateData.parent = area.id;
            }
            await siteCategory_repository_1.siteCategoryRepository.update(country.id, updateData);
            return true;
        });
    }
    async updateArea(guid, data) {
        return await this.handleWithTryCatch(async () => {
            const area = await siteCategory_repository_1.siteCategoryRepository.findByGuid(guid);
            if (!area) {
                throw new NotFoundError_error_1.NotFoundError("Khu vực không tồn tại");
            }
            if (area.parent !== null) {
                throw new ConflictError_error_1.ConflictError("Không thể cập nhật dữ liệu không phải là khu vực");
            }
            await siteCategory_repository_1.siteCategoryRepository.update(area.id, data);
            return true;
        });
    }
    async createArea(data) {
        return await this.handleWithTryCatch(async () => {
            const { name, code, position } = data;
            // Kiểm tra xem code đã tồn tại chưa
            const existingCode = await siteCategory_repository_1.siteCategoryRepository.findByCode(code);
            if (existingCode) {
                throw new ConflictError_error_1.ConflictError("Mã khu vực đã tồn tại");
            }
            const area = await siteCategory_repository_1.siteCategoryRepository.createArea({
                name,
                code,
                position
            });
            return area;
        });
    }
    async createCountry(data) {
        return await this.handleWithTryCatch(async () => {
            const { name, code, areaGuid, position } = data;
            // 1. Kiểm tra Area GUID có tồn tại không
            const area = await siteCategory_repository_1.siteCategoryRepository.findByGuid(areaGuid);
            if (!area) {
                throw new NotFoundError_error_1.NotFoundError("Khu vực không tồn tại");
            }
            // 2. Kiểm tra xem code quốc gia đã tồn tại chưa
            const existingCode = await siteCategory_repository_1.siteCategoryRepository.findByCode(code);
            if (existingCode) {
                throw new ConflictError_error_1.ConflictError("Mã quốc gia này đã tồn tại trong hệ thống");
            }
            const country = await siteCategory_repository_1.siteCategoryRepository.createCountry({
                name,
                code,
                country_mcc: code,
                position,
                parent: area.id
            });
            return country;
        });
    }
    async getCountries(query) {
        return await this.handleWithTryCatch(async () => {
            const { page, size, name, code } = query;
            const pagination = (0, function_utils_1.getPagination)({ page, size, sortBy: 'ASC' }); // default ASC for position
            const resultData = await siteCategory_repository_1.siteCategoryRepository.getCountries(name, code, pagination);
            const dataMappingDTO = (0, basePagination_core_1.mapPaginatedData)({
                dtoClass: siteCategory_dto_1.SiteCategoryDto,
                entities: resultData.result,
                skip: pagination.skip,
                take: pagination.take,
                total: resultData.total
            });
            return dataMappingDTO;
        });
    }
    async getCountriesByArea(query) {
        return await this.handleWithTryCatch(async () => {
            const { areaGuid } = query;
            const countries = await siteCategory_repository_1.siteCategoryRepository.getCountriesByArea(areaGuid);
            return (0, class_transformer_1.plainToInstance)(siteCategory_dto_1.SiteCategoryDto, countries);
        });
    }
    async getAreas(query) {
        return await this.handleWithTryCatch(async () => {
            const { page, size, name, code } = query;
            const pagination = (0, function_utils_1.getPagination)({ page, size, sortBy: "ASC" });
            const resultData = await siteCategory_repository_1.siteCategoryRepository.getAreas(name, code, pagination);
            const dataMappingDTO = (0, basePagination_core_1.mapPaginatedData)({
                dtoClass: siteCategory_dto_1.SiteCategoryDto,
                entities: resultData.result,
                skip: pagination.skip,
                take: pagination.take,
                total: resultData.total,
            });
            return dataMappingDTO;
        });
    }
    async getAreasAll(query) {
        return await this.handleWithTryCatch(async () => {
            const { name, code } = query;
            const areas = await siteCategory_repository_1.siteCategoryRepository.getAreasAll(name, code);
            return (0, class_transformer_1.plainToInstance)(siteCategory_dto_1.SiteCategoryDto, areas);
        });
    }
}
exports.siteCategoryService = new SiteCategoryService();
//# sourceMappingURL=siteCategory.service.js.map