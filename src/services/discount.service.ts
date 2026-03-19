import { BaseService } from "../core/baseService.core";
import { discountRepository } from "../repositories/discount.repository";
import { ICreateDiscountRequest, ISearchDiscountRequest, ISearchDiscountAllRequest } from "../schemas/discount.schema";
import { DiscountStatus } from "../enums";
import { getPagination } from "../utils";
import { mapPaginatedData } from "../core/basePagination.core";
import { DiscountDto } from "../dto/discount.dto";
import { ConflictError } from "../utils/errors/ConflictError.error";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { plainToInstance } from "class-transformer";

dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY HH:mm:ss";

class DiscountService extends BaseService {
    public async createDiscount(data: ICreateDiscountRequest) {
        return await this.handleWithTryCatch(async () => {
            const { name, type, value, startDate, endDate } = data;

            // Kiểm tra tên đã tồn tại chưa
            const existingDiscount = await discountRepository.findByName(name);
            if (existingDiscount) {
                throw new ConflictError("Tên giảm giá đã tồn tại");
            }

            // Tạo mới discount
            const newDiscount = await discountRepository.createDiscount({
                name,
                type,
                value,
                start_date: dayjs(startDate, dateFormat).toDate(),
                end_date: dayjs(endDate, dateFormat).toDate(),
                is_active: true,
                used_count: 0
            });

            return newDiscount;
        });
    }

    public async searchDiscounts(data: ISearchDiscountRequest) {
        return await this.handleWithTryCatch(async () => {
            const { page, size, sortBy } = data;
            const pagination = getPagination({ page, size, sortBy });
            const [result, total] = await discountRepository.searchDiscounts(data, pagination);

            const now = dayjs();
            const resultWithStatus = result.map(discount => {
                let status = DiscountStatus.ACTIVE;
                const start = dayjs(discount.start_date);
                const end = dayjs(discount.end_date);

                if (now.isBefore(start)) {
                    status = DiscountStatus.INACTIVE;
                } else if (now.isAfter(end)) {
                    status = DiscountStatus.EXPIRED;
                }

                return {
                    ...discount,
                    status
                };
            });

            return mapPaginatedData({
                dtoClass: DiscountDto,
                entities: resultWithStatus,
                skip: pagination.skip,
                take: pagination.take,
                total
            });
        });
    }

    public async searchDiscountsAll(data: ISearchDiscountAllRequest) {
        return await this.handleWithTryCatch(async () => {
            const result = await discountRepository.searchDiscountsAll(data);

            const now = dayjs();
            const resultWithStatus = result.map(discount => {
                let status = DiscountStatus.ACTIVE;
                const start = dayjs(discount.start_date);
                const end = dayjs(discount.end_date);

                if (now.isBefore(start)) {
                    status = DiscountStatus.INACTIVE;
                } else if (now.isAfter(end)) {
                    status = DiscountStatus.EXPIRED;
                }

                return {
                    ...discount,
                    status
                };
            });

            return plainToInstance(DiscountDto, resultWithStatus);
        });
    }
}

export const discountService = new DiscountService();
