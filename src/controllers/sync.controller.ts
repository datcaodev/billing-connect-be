import { NextFunction, Request, Response } from "express";
import { BaseController } from "../core/baseController.core";
import { syncService } from "../services/sync.service";
import { ServiceResponse } from "../core/serviceResponse.core";

class SyncController extends BaseController {
    /**
     * HTTP handler làm mới các materialized views để đồng bộ dữ liệu lên website
     */
    public refreshViews = async (req: Request, res: Response, next: NextFunction) => {
        return this.handleWithTryCatch(
            async () => {
                await syncService.refreshViews();
                return ServiceResponse.success({
                    message: "Đồng bộ dữ liệu lên website thành công",
                    data: true
                });
            },
            res,
            next
        );
    };
}

export const syncController = new SyncController();
