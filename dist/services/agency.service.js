"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agencyService = void 0;
const agency_repository_1 = require("../repositories/agency.repository");
const ConflictError_error_1 = require("../utils/errors/ConflictError.error");
const utils_1 = require("../utils");
const basePagination_core_1 = require("../core/basePagination.core");
const agency_dto_1 = require("../dto/agency.dto");
const class_transformer_1 = require("class-transformer");
class AgencyService {
    async createAgency(data) {
        // Kiểm tra xem mã đại lý đã tồn tại chưa
        if (data.code) {
            const isExistCode = await agency_repository_1.agencyRepository.checkExistCode(data.code);
            if (isExistCode) {
                throw new ConflictError_error_1.ConflictError("Mã đại lý đã tồn tại");
            }
        }
        // Kiểm tra xem email đã tồn tại chưa
        if (data.email) {
            const isExistEmail = await agency_repository_1.agencyRepository.checkExistEmail(data.email);
            if (isExistEmail) {
                throw new ConflictError_error_1.ConflictError("Email đại lý đã tồn tại");
            }
        }
        return await agency_repository_1.agencyRepository.createAgency(data);
    }
    async updateAgency(guid, data) {
        const existingAgency = await agency_repository_1.agencyRepository.findByGuid(guid);
        if (!existingAgency) {
            throw new ConflictError_error_1.ConflictError("Không tìm thấy đại lý");
        }
        // Kiểm tra xem email đã tồn tại chưa (loại trừ đại lý hiện tại)
        if (data.email && data.email !== existingAgency.email) {
            const isExistEmail = await agency_repository_1.agencyRepository.checkExistEmailExcludeGuid(data.email, guid);
            if (isExistEmail) {
                throw new ConflictError_error_1.ConflictError("Email đại lý đã tồn tại");
            }
        }
        return await agency_repository_1.agencyRepository.updateAgency(guid, data);
    }
    async deleteAgency(guid) {
        const existingAgency = await agency_repository_1.agencyRepository.findByGuid(guid);
        if (!existingAgency) {
            throw new ConflictError_error_1.ConflictError("Không tìm thấy đại lý");
        }
        await agency_repository_1.agencyRepository.deleteAgency(guid);
        return true;
    }
    async searchAgency(data) {
        const { page, size, sortBy } = data;
        const pagination = (0, utils_1.getPagination)({ page, size, sortBy });
        const result = await agency_repository_1.agencyRepository.searchAgency(data, pagination);
        const dataMappingDTO = (0, basePagination_core_1.mapPaginatedData)({
            dtoClass: agency_dto_1.AgencyPaginationDto,
            entities: result.result,
            skip: pagination.skip,
            take: pagination.take,
            total: result.total
        });
        return dataMappingDTO;
    }
    async getAllAgencies() {
        const agencies = await agency_repository_1.agencyRepository.findAllAgencies();
        return (0, class_transformer_1.plainToInstance)(agency_dto_1.AgencyPaginationDto, agencies);
    }
}
exports.agencyService = new AgencyService();
//# sourceMappingURL=agency.service.js.map