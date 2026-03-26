"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationMiddleware = void 0;
const httpHandlers_utils_1 = require("../utils/httpHandlers.utils");
const serviceResponse_core_1 = require("../core/serviceResponse.core");
//* Middleware validate phân trang
const paginationMiddleware = (req, res, next) => {
    try {
        // Chuyển đổi query thành số nguyên
        const page = parseInt(req.query.page, 10);
        const size = parseInt(req.query.size, 10);
        // Xác định giá trị hợp lệ
        req.query.page = isNaN(page) || page <= 0 ? "1" : String(page);
        req.query.size = isNaN(size) || size <= 0 ? "10" : String(size);
        next();
    }
    catch (_a) {
        return (0, httpHandlers_utils_1.handleServiceResponse)(serviceResponse_core_1.ServiceResponse.failure({
            message: 'Thông tin phân trang không hợp lệ'
        }), res);
    }
};
exports.paginationMiddleware = paginationMiddleware;
//# sourceMappingURL=pagination.middleware.js.map