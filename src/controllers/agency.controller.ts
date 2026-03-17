import { NextFunction, Response } from "express";
import { ServiceResponse } from "../core/serviceResponse.core";
import { BaseController } from "../core/baseController.core";
import { AuthenticatedRequest } from "../types";
import { agencyService } from "../services/agency.service";
import { BizAgency } from "../entity/bizAgency.entity";

class AgencyController extends BaseController {
    public createAgency = async (
        req: AuthenticatedRequest<object, object, Partial<BizAgency>, object>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const data = await agencyService.createAgency(req.body);
                return ServiceResponse.success({
                    message: "Tạo mới đại lý thành công",
                    data
                });
            },
            res,
            next
        );
    };

    public updateAgency = async (
        req: AuthenticatedRequest<object, object, Partial<BizAgency>, object>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const { guid } = req.params as any;
                const data = await agencyService.updateAgency(guid, req.body);
                return ServiceResponse.success({
                    message: "Cập nhật đại lý thành công",
                    data
                });
            },
            res,
            next
        );
    };

    public deleteAgency = async (
        req: AuthenticatedRequest<object, object, object, object>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const { guid } = req.params as any;
                await agencyService.deleteAgency(guid);
                return ServiceResponse.success({
                    message: "Xóa đại lý thành công"
                });
            },
            res,
            next
        );
    };

    public searchAgency = async (
        req: AuthenticatedRequest<object, object, object, any>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const data = await agencyService.searchAgency(req.query);
                return ServiceResponse.success({
                    message: "Lấy danh sách đại lý thành công",
                    data
                });
            },
            res,
            next
        );
    };
}

export const agencyController = new AgencyController();
