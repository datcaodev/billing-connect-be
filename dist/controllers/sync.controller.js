"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncController = void 0;
const baseController_core_1 = require("../core/baseController.core");
const sync_service_1 = require("../services/sync.service");
const serviceResponse_core_1 = require("../core/serviceResponse.core");
class SyncController extends baseController_core_1.BaseController {
    constructor() {
        super(...arguments);
        /**
         * HTTP handler làm mới các materialized views để đồng bộ dữ liệu lên website
         */
        this.refreshViews = async (req, res, next) => {
            return this.handleWithTryCatch(async () => {
                await sync_service_1.syncService.refreshViews();
                return serviceResponse_core_1.ServiceResponse.success({
                    message: "Đồng bộ dữ liệu lên website thành công",
                    data: true
                });
            }, res, next);
        };
    }
}
exports.syncController = new SyncController();
//# sourceMappingURL=sync.controller.js.map