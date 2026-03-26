"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeRateController = void 0;
const serviceResponse_core_1 = require("../core/serviceResponse.core");
const baseController_core_1 = require("../core/baseController.core");
const currencyUnit_data_1 = require("../datas/currencyUnit.data");
const services_1 = require("../services");
class ExchangeRateController extends baseController_core_1.BaseController {
    constructor() {
        super(...arguments);
        this.getUnits = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                return serviceResponse_core_1.ServiceResponse.success({
                    data: currencyUnit_data_1.currencyUnitData,
                });
            }, res, next);
        };
        this.create = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                await services_1.exchangeRateService.create(req.body);
                return serviceResponse_core_1.ServiceResponse.successAndNotify({
                    message: 'Tạo tỷ giá thành công',
                });
            }, res, next);
        };
        this.searchExchangeRateHistory = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const result = await services_1.exchangeRateService.searchExchangeRateHistory(req.query);
                return serviceResponse_core_1.ServiceResponse.success({
                    data: result,
                });
            }, res, next);
        };
        this.getExchangeRate = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                const result = await services_1.exchangeRateService.getExchangeRate();
                return serviceResponse_core_1.ServiceResponse.success({
                    data: result,
                });
            }, res, next);
        };
    }
}
exports.exchangeRateController = new ExchangeRateController();
//# sourceMappingURL=exchangeRate.controller.js.map