import { NextFunction, Response } from "express";
import { ServiceResponse } from "../core/serviceResponse.core";
import { BaseController } from "../core/baseController.core";
import { AuthenticatedRequest } from "../types";
import { agencyPriceService } from "../services/agencyPrice.service";

class AgencyPriceController extends BaseController {
    public getAgencyPackages = async (
        req: AuthenticatedRequest<object, object, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const { agency_guid } = req.params as any;
                const data = await agencyPriceService.getAgencyPackages(agency_guid);
                return ServiceResponse.success({
                    message: "Lấy bảng giá đại lý thành công",
                    data
                });
            },
            res,
            next
        );
    };

    public createAgencyPriceTable = async (
        req: AuthenticatedRequest<object, object, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                await agencyPriceService.createAgencyPriceTable(req.body);
                return ServiceResponse.success({
                    message: "Tạo bảng giá đại lý thành công",
                    data: true
                });
            },
            res,
            next
        );
    };
}

export const agencyPriceController = new AgencyPriceController();
