import { NextFunction, Response } from "express";
import { ServiceResponse } from "../core/serviceResponse.core";
import { BaseController } from "../core/baseController.core";
import { AuthenticatedRequest, ICreateAreaRequest, ICreateCountryRequest, IGetCountriesRequest, IGetAreasRequest, IUpdateAreaRequest, IUpdateCountryRequest, IGetAreasAllRequest, IGetCountriesByAreaRequest } from "../types";
import { siteCategoryService } from "../services/siteCategory.service";

class SiteCategoryController extends BaseController {
    public updateCountry = async (
        req: AuthenticatedRequest<{ guid: string }, object, IUpdateCountryRequest, object>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const { guid } = req.params;
                const result = await siteCategoryService.updateCountry(guid, req.body);
                return ServiceResponse.success({
                    message: "Cập nhật quốc gia thành công",
                    data: result
                });
            },
            res,
            next
        );
    };

    public updateArea = async (
        req: AuthenticatedRequest<{ guid: string }, object, IUpdateAreaRequest, object>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const { guid } = req.params;
                const result = await siteCategoryService.updateArea(guid, req.body);
                return ServiceResponse.success({
                    message: "Cập nhật khu vực thành công",
                    data: result
                });
            },
            res,
            next
        );
    };
    public createArea = async (
        req: AuthenticatedRequest<object, object, object, ICreateAreaRequest>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const area = await siteCategoryService.createArea(req.body);
                return ServiceResponse.success({
                    message: "Tạo khu vực thành công",
                    data: area
                });
            },
            res,
            next
        );
    };

    public createCountry = async (
        req: AuthenticatedRequest<object, object, object, ICreateCountryRequest>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const country = await siteCategoryService.createCountry(req.body);
                return ServiceResponse.success({
                    message: "Tạo quốc gia thành công",
                    data: country
                });
            },
            res,
            next
        );
    };

    public getCountries = async (
        req: AuthenticatedRequest<any, any, any, IGetCountriesRequest>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const result = await siteCategoryService.getCountries(req.query);
                return ServiceResponse.success({
                    message: "Lấy danh sách quốc gia thành công",
                    data: result
                });
            },
            res,
            next
        );
    };

    public getCountriesByArea = async (
        req: AuthenticatedRequest<any, any, any, IGetCountriesByAreaRequest>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const result = await siteCategoryService.getCountriesByArea(req.query);
                return ServiceResponse.success({
                    message: "Lấy danh sách quốc gia thành công",
                    data: result
                });
            },
            res,
            next
        );
    };

    public getAreas = async (
        req: AuthenticatedRequest<any, any, any, IGetAreasRequest>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const result = await siteCategoryService.getAreas(req.query);
                return ServiceResponse.success({
                    message: "Lấy danh sách khu vực thành công",
                    data: result
                });
            },
            res,
            next
        );
    };

    public getAreasAll = async (
        req: AuthenticatedRequest<any, any, any, IGetAreasAllRequest>,
        res: Response,
        next: NextFunction
    ) => {
        return this.handleWithTryCatch(
            async () => {
                const result = await siteCategoryService.getAreasAll(req.query);
                return ServiceResponse.success({
                    message: "Lấy danh sách khu vực thành công",
                    data: result
                });
            },
            res,
            next
        );
    };
}

export const siteCategoryController = new SiteCategoryController();
