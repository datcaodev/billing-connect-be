import { BaseService } from "../core/baseService.core";
import { exchangeRateRepository } from "../repositories";
import { exchangeRateHistoryRepository } from "../repositories/exchangeRateHistory.repository";
import { ICreateExchangeRateRequest, ISearchExchangeRateHistoryRequest } from "../types/exchangeRate.type";
import Decimal from "decimal.js";
import { getPagination } from "../utils";
import { mapPaginatedData } from "../core/basePagination.core";
import { ExchangeRateHistoryPaginationDto } from "../dto/exchangeRate.dto";

class ExchangeRateService extends BaseService {

    public create = (data: ICreateExchangeRateRequest) => {
        return this.handleWithTryCatch(async () => {
            const { targetCurrency, rate } = data;

            const oldExchangeRate = await exchangeRateRepository.findData();

            const newRate = new Decimal(rate)
            const oldRate = new Decimal(oldExchangeRate.rate)

            // nếu tỷ giá không thay đổi thì return true và không lưu log
            if (oldExchangeRate.currency === targetCurrency && oldRate.equals(newRate)) {
                return true;
            }

            // update tỷ giá
            const dataSave = await exchangeRateRepository.upsert({
                currency: targetCurrency,
                rate,
            });

            // lưu log tỷ giá
            await exchangeRateHistoryRepository.create({
                currency: oldExchangeRate.currency,
                rate: oldExchangeRate.rate,
                startDate: oldExchangeRate.updated_at, // lưu ngày áp dụng là ngày update của bản ghi cũ
                endDate: dataSave.updated_at, // lưu ngày kết thúc là ngày update của bản ghi mới
            });

            return true;
        });
    };

    public searchExchangeRateHistory = (data: ISearchExchangeRateHistoryRequest) => {
        return this.handleWithTryCatch(async () => {
            const { page, size, sortBy } = data;
            const pagination = getPagination({ page, size, sortBy });

            const result = await exchangeRateHistoryRepository.searchExchangeRateHistory(data, pagination);

            const dataMappingDTO = mapPaginatedData({
                dtoClass: ExchangeRateHistoryPaginationDto,
                entities: result.result,
                skip: pagination.skip,
                take: pagination.take,
                total: result.total
            });

            return dataMappingDTO;
        });
    };
}

export const exchangeRateService = new ExchangeRateService();
