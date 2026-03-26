"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteCategoryController = void 0;
const serviceResponse_core_1 = require("../core/serviceResponse.core");
const baseController_core_1 = require("../core/baseController.core");
const siteCategory_service_1 = require("../services/siteCategory.service");
class SiteCategoryController extends baseController_core_1.BaseController {
    constructor() {
        super(...arguments);
        this.updateCountry = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { guid } = req.params;
                const result = await siteCategory_service_1.siteCategoryService.updateCountry(guid, req.body);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Cập nhật quốc gia thành công",
                    data: result
                });
            }, res, next);
        };
        this.updateArea = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { guid } = req.params;
                const result = await siteCategory_service_1.siteCategoryService.updateArea(guid, req.body);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Cập nhật khu vực thành công",
                    data: result
                });
            }, res, next);
        };
        this.createArea = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const area = await siteCategory_service_1.siteCategoryService.createArea(req.body);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Tạo khu vực thành công",
                    data: area
                });
            }, res, next);
        };
        this.createCountry = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const country = await siteCategory_service_1.siteCategoryService.createCountry(req.body);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Tạo quốc gia thành công",
                    data: country
                });
            }, res, next);
        };
        this.getCountries = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const result = await siteCategory_service_1.siteCategoryService.getCountries(req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách quốc gia thành công",
                    data: result
                });
            }, res, next);
        };
        this.getCountriesByArea = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const result = await siteCategory_service_1.siteCategoryService.getCountriesByArea(req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách quốc gia thành công",
                    data: result
                });
            }, res, next);
        };
        this.getAreas = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const result = await siteCategory_service_1.siteCategoryService.getAreas(req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách khu vực thành công",
                    data: result
                });
            }, res, next);
        };
        this.getAreasAll = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const result = await siteCategory_service_1.siteCategoryService.getAreasAll(req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách khu vực thành công",
                    data: result
                });
            }, res, next);
        };
    }
}
exports.siteCategoryController = new SiteCategoryController();
//# sourceMappingURL=siteCategory.controller.js.map