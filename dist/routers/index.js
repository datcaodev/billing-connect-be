"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swaggerApi_router_1 = __importDefault(require("../api_docs/swaggerApi.router"));
const httpHandlers_utils_1 = require("../utils/httpHandlers.utils");
const serviceResponse_core_1 = require("../core/serviceResponse.core");
const exchangeRate_router_1 = __importDefault(require("./exchangeRate.router"));
const site_router_1 = __importDefault(require("./site.router"));
const agency_router_1 = __importDefault(require("./agency.router"));
const billionProduct_router_1 = __importDefault(require("./billionProduct.router"));
const discount_router_1 = __importDefault(require("./discount.router"));
const siteProduct_router_1 = require("./siteProduct.router");
const siteCategory_router_1 = __importDefault(require("./siteCategory.router"));
const order_router_1 = __importDefault(require("./order.router"));
const sync_router_1 = __importDefault(require("./sync.router"));
const appRouter = (0, express_1.default)();
const routers = [
    { path: "/docs", router: swaggerApi_router_1.default },
    { path: "/exchange-rate", router: exchangeRate_router_1.default },
    { path: "/site", router: site_router_1.default },
    { path: "/agency", router: agency_router_1.default },
    { path: "/product", router: billionProduct_router_1.default },
    { path: "/discount", router: discount_router_1.default },
    { path: "/site-product", router: siteProduct_router_1.siteProductRouter },
    { path: "/category", router: siteCategory_router_1.default },
    { path: "/order", router: order_router_1.default },
    { path: "/sync", router: sync_router_1.default },
];
routers.forEach(({ path, router }) => {
    appRouter.use(`/api/v1/billion-connect${path}`, router);
});
// xử lý nếu đường dẫn api không tồn tại
appRouter.use((_req, res) => {
    (0, httpHandlers_utils_1.handleServiceResponse)(serviceResponse_core_1.ServiceResponse.failure({
        message: "Đường dẫn API không tồn tại"
    }), res);
});
exports.default = appRouter;
//# sourceMappingURL=index.js.map