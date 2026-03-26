"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agencyPriceController = void 0;
const serviceResponse_core_1 = require("../core/serviceResponse.core");
const baseController_core_1 = require("../core/baseController.core");
const agencyPrice_service_1 = require("../services/agencyPrice.service");
class AgencyPriceController extends baseController_core_1.BaseController {
    constructor() {
        super(...arguments);
        this.getAgencyPackages = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { agencyGuid } = req.params;
                const data = await agencyPrice_service_1.agencyPriceService.getAgencyPackages(agencyGuid, req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy bảng giá đại lý thành công",
                    data
                });
            }, res, next);
        };
        this.getAgencyPackagesAll = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { agencyGuid } = req.params;
                const data = await agencyPrice_service_1.agencyPriceService.getAgencyPackagesAll(agencyGuid, req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy bảng giá đại lý thành công",
                    data
                });
            }, res, next);
        };
        this.createAgencyPriceTable = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                await agencyPrice_service_1.agencyPriceService.createAgencyPriceTable(req.body);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Thao tác thành công",
                    data: true
                });
            }, res, next);
        };
        this.getAgencyPackagesFilter = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { agencyGuid } = req.params;
                const data = await agencyPrice_service_1.agencyPriceService.getAgencyPackagesFilter(agencyGuid, req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy bảng giá đại lý thành công",
                    data
                });
            }, res, next);
        };
        this.updatePackagePrice = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                await agencyPrice_service_1.agencyPriceService.updatePackagePrice(req.body);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Cập nhật giá thành công",
                    data: true
                });
            }, res, next);
        };
    }
}
exports.agencyPriceController = new AgencyPriceController();
//# sourceMappingURL=agencyPrice.controller.js.map