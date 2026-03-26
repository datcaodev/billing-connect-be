"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discountController = void 0;
const serviceResponse_core_1 = require("../core/serviceResponse.core");
const baseController_core_1 = require("../core/baseController.core");
const discount_service_1 = require("../services/discount.service");
class DiscountController extends baseController_core_1.BaseController {
    constructor() {
        super(...arguments);
        this.createDiscount = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const result = await discount_service_1.discountService.createDiscount(req.body);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Tạo mã giảm giá thành công",
                    data: result
                });
            }, res, next);
        };
        this.searchDiscounts = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const result = await discount_service_1.discountService.searchDiscounts(req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách mã giảm giá thành công",
                    data: result
                });
            }, res, next);
        };
        this.searchDiscountsAll = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const result = await discount_service_1.discountService.searchDiscountsAll(req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Lấy danh sách mã giảm giá thành công",
                    data: result
                });
            }, res, next);
        };
    }
}
exports.discountController = new DiscountController();
//# sourceMappingURL=discount.controller.js.map