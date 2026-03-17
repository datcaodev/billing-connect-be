import { BizAgency } from "../entity/bizAgency.entity";
import { agencyRepository } from "../repositories/agency.repository";
import { ConflictError } from "../utils/errors/ConflictError.error";
import { getPagination } from "../utils";
import { mapPaginatedData } from "../core/basePagination.core";
import { AgencyPaginationDto } from "../dto/agency.dto";

class AgencyService {
    public async createAgency(data: Partial<BizAgency>) {
        // Kiểm tra xem mã đại lý đã tồn tại chưa
        if (data.code) {
            const isExistCode = await agencyRepository.checkExistCode(data.code);
            if (isExistCode) {
                throw new ConflictError("Mã đại lý đã tồn tại");
            }
        }

        // Kiểm tra xem email đã tồn tại chưa
        if (data.email) {
            const isExistEmail = await agencyRepository.checkExistEmail(data.email);
            if (isExistEmail) {
                throw new ConflictError("Email đại lý đã tồn tại");
            }
        }

        return await agencyRepository.createAgency(data);
    }

    public async updateAgency(guid: string, data: Partial<BizAgency>) {
        const existingAgency = await agencyRepository.findByGuid(guid);
        if (!existingAgency) {
            throw new ConflictError("Không tìm thấy đại lý");
        }

        // Kiểm tra xem email đã tồn tại chưa (loại trừ đại lý hiện tại)
        if (data.email && data.email !== existingAgency.email) {
            const isExistEmail = await agencyRepository.checkExistEmailExcludeGuid(data.email, guid);
            if (isExistEmail) {
                throw new ConflictError("Email đại lý đã tồn tại");
            }
        }

        return await agencyRepository.updateAgency(guid, data);
    }

    public async deleteAgency(guid: string) {
        const existingAgency = await agencyRepository.findByGuid(guid);
        if (!existingAgency) {
            throw new ConflictError("Không tìm thấy đại lý");
        }

        await agencyRepository.deleteAgency(guid);
        return true;
    }

    public async searchAgency(data: any) {
        const { page, size, sortBy } = data;

        const pagination = getPagination({ page, size, sortBy });
        const result = await agencyRepository.searchAgency(data, pagination);

        const dataMappingDTO = mapPaginatedData({
            dtoClass: AgencyPaginationDto,
            entities: result.result,
            skip: pagination.skip,
            take: pagination.take,
            total: result.total
        });

        return dataMappingDTO;
    }
}

export const agencyService = new AgencyService();
