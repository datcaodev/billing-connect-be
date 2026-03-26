"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteController = void 0;
const serviceResponse_core_1 = require("../core/serviceResponse.core");
const baseController_core_1 = require("../core/baseController.core");
const services_1 = require("../services");
class SiteController extends baseController_core_1.BaseController {
    constructor() {
        super(...arguments);
        this.getAllBillionCountries = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const data = await services_1.countryService.getAllBillionCountries();
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách quốc gia thành công",
                    data
                });
            }, res, next);
        };
        this.getAllAreas = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const data = await services_1.countryService.getAllAreas();
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách vùng thành công",
                    data
                });
            }, res, next);
        };
    }
}
exports.siteController = new SiteController();
//# sourceMappingURL=site.controller.js.map