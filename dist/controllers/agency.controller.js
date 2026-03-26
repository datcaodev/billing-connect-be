"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agencyController = void 0;
const serviceResponse_core_1 = require("../core/serviceResponse.core");
const baseController_core_1 = require("../core/baseController.core");
const agency_service_1 = require("../services/agency.service");
class AgencyController extends baseController_core_1.BaseController {
    constructor() {
        super(...arguments);
        this.createAgency = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const data = await agency_service_1.agencyService.createAgency(req.body);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Tạo mới đại lý thành công",
                    data
                });
            }, res, next);
        };
        this.updateAgency = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { guid } = req.params;
                const data = await agency_service_1.agencyService.updateAgency(guid, req.body);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Cập nhật đại lý thành công",
                    data
                });
            }, res, next);
        };
        this.deleteAgency = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { guid } = req.params;
                await agency_service_1.agencyService.deleteAgency(guid);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Xóa đại lý thành công"
                });
            }, res, next);
        };
        this.searchAgency = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const data = await agency_service_1.agencyService.searchAgency(req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách đại lý thành công",
                    data
                });
            }, res, next);
        };
        this.getAllAgencies = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const data = await agency_service_1.agencyService.getAllAgencies();
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách tất cả đại lý thành công",
                    data
                });
            }, res, next);
        };
    }
}
exports.agencyController = new AgencyController();
//# sourceMappingURL=agency.controller.js.map