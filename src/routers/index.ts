import express, { type Express } from "express";
import swaggerRouter from "../api_docs/swaggerApi.router";
import { handleServiceResponse } from "../utils/httpHandlers.utils";
import { ServiceResponse } from "../core/serviceResponse.core";
import exchangeRateRouter from "./exchangeRate.router";
import siteRouter from "./site.router";
import agencyRouter from "./agency.router";
import billionProductRouter from "./billionProduct.router";
import discountRouter from "./discount.router";
import { siteProductRouter } from "./siteProduct.router";
import siteCategoryRouter from "./siteCategory.router";
import orderRouter from "./order.router";
import syncRouter from "./sync.router";

const appRouter: Express = express();

const routers = [
  { path: "/docs", router: swaggerRouter },
  { path: "/exchange-rate", router: exchangeRateRouter },
  { path: "/site", router: siteRouter },
  { path: "/agency", router: agencyRouter },
  { path: "/product", router: billionProductRouter },
  { path: "/discount", router: discountRouter },
  { path: "/site-product", router: siteProductRouter },
  { path: "/category", router: siteCategoryRouter },
  { path: "/order", router: orderRouter },
  { path: "/sync", router: syncRouter },
];

routers.forEach(({ path, router }) => {
  appRouter.use(`/api/v1/billion-connect${path}`, router);
});

// xử lý nếu đường dẫn api không tồn tại
appRouter.use((_req, res) => {
  handleServiceResponse(
    ServiceResponse.failure({
      message: "Đường dẫn API không tồn tại"
    }),
    res
  );
});
export default appRouter;