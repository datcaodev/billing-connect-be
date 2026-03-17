import { NextFunction, Response } from "express";
import { ServiceResponse } from "../core/serviceResponse.core";
import { BaseController } from "../core/baseController.core";
import { AuthenticatedRequest } from "../types";
import { currencyUnitData } from "../datas/currencyUnit.data";
import { ICreateExchangeRateRequest, ISearchExchangeRateHistoryRequest } from "../types/exchangeRate.type";
import { exchangeRateService } from "../services";

class ExchangeRateController extends BaseController {
    public getUnits = async (
        req: AuthenticatedRequest<object, object, object, object>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                return ServiceResponse.success({
                    data: currencyUnitData,
                });
            },
            res,
            next
        );
    };

    public create = async (
        req: AuthenticatedRequest<object, object, ICreateExchangeRateRequest, object>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                await exchangeRateService.create(req.body);
                return ServiceResponse.successAndNotify({
                    message: 'Tạo tỷ giá thành công',
                });
            },
            res,
            next
        );
    };

    public searchExchangeRateHistory = async (
        req: AuthenticatedRequest<object, object, object, ISearchExchangeRateHistoryRequest>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const result = await exchangeRateService.searchExchangeRateHistory(req.query);
                return ServiceResponse.success({
                    data: result,
                });
            },
            res,
            next
        );
    };
}

export const exchangeRateController = new ExchangeRateController();
