import { NextFunction, Response } from "express";
import { ServiceResponse } from "../core/serviceResponse.core";
import { BaseController } from "../core/baseController.core";
import { AuthenticatedRequest } from "../types";
import { countryService } from "../services";

class SiteController extends BaseController {
    public getAllBillionCountries = async (
        req: AuthenticatedRequest<object, object, object, object>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const data = await countryService.getAllBillionCountries();
                return ServiceResponse.success({
                    message: "Lấy danh sách quốc gia thành công",
                    data
                });
            },
            res,
            next
        );
    };

    public getAllAreas = async (
        req: AuthenticatedRequest<object, object, object, object>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const data = await countryService.getAllAreas();
                return ServiceResponse.success({
                    message: "Lấy danh sách vùng thành công",
                    data
                });
            },
            res,
            next
        );
    };
}

export const siteController = new SiteController();
