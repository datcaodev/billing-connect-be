// import type { Request } from "express";
// import { rateLimit } from "express-rate-limit";
// import { env } from "../utils/envConfig.utils";
// import { ServiceResponse } from "../core/serviceResponse.core";
// import { SuccessCode } from "../enums/success.enum";
// const rateLimiter = rateLimit({
//   legacyHeaders: true,
//   limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS, // lượng request tối đa
//   message: "Vượt quá số lượng request cho phép, vui lòng thử lại sau.",
//   handler: function (req, res) {
//     res.status(429).send(ServiceResponse.failure(
//       {
//         message: "Vượt quá số lượt truy vấn",
//         code: SuccessCode
//       }
//     ));
// },
//   standardHeaders: true,
//   windowMs: 1 * 60 * env.COMMON_RATE_LIMIT_WINDOW_MS, 
//   keyGenerator: (req: Request) => req.ip as string,
// });
// export default rateLimiter;
//# sourceMappingURL=rateLimiter.middleware.js.map