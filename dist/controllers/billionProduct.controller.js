"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billionProductController = void 0;
const serviceResponse_core_1 = require("../core/serviceResponse.core");
const baseController_core_1 = require("../core/baseController.core");
const billionProduct_service_1 = require("../services/billionProduct.service");
const enums_1 = require("../enums");
class BillionProductController extends baseController_core_1.BaseController {
    constructor() {
        super(...arguments);
        this.searchProducts = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const data = await billionProduct_service_1.billionProductService.searchProducts(req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách gói thành công",
                    data
                });
            }, res, next);
        };
        this.getDetail = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const { skuId } = req.params;
                const data = await billionProduct_service_1.billionProductService.getProductDetail(skuId);
                if (!data) {
                    return serviceResponse_core_1.ServiceResponse.failure({
                        headerStatusCode: 404, // map to StatusCodes.NOT_FOUND if needed, but 404 works
                        message: "Không tìm thấy gói này",
                        code: enums_1.ErrorCode.NOT_FOUND
                    });
                }
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy chi tiết gói thành công",
                    data
                });
            }, res, next);
        };
    }
}
exports.billionProductController = new BillionProductController();
//# sourceMappingURL=billionProduct.controller.js.map