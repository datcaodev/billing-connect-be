"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routers_1 = __importDefault(require("../routers"));
const logger_config_1 = require("./logger.config");
const request_ip_1 = __importDefault(require("request-ip"));
const middlewares_1 = require("../middlewares");
const app = (0, express_1.default)();
exports.app = app;
// const memoryStore = keycloakSingleton.getStore();
// const keycloak = keycloakSingleton.getKeycloak();
// Configure session
// app.use(
//   session({
//     secret: "mySecret",
//     resave: false,
//     saveUninitialized: true,
//     store: memoryStore,
//   })
// );
// khởi tạo logger
const logger = logger_config_1.LoggerPinoSingleton.getInstance().getLogger();
exports.logger = logger;
// cấu hình Keycloak để hoạt động như middleware trong ứng dụng
// app.use(keycloak.middleware());
// Cấu hình cho phép server tin tưởng các reverse proxy (như Nginx, AWS ELB). Điều này cần thiết khi xác định IP thực của client khi đi qua proxy.
app.set("trust proxy", true);
// Middleware để parse dữ liệu JSON trong body của request.
app.use(express_1.default.json());
// Middleware để parse dữ liệu x-www-form-urlencoded trong body của request.
app.use(express_1.default.urlencoded({ extended: true }));
//Middleware quản lý CORS, chỉ cho phép các request từ env.CORS_ORIGIN
// credentials: true: Cho phép gửi cookie hoặc header xác thực qua request.
app.use((0, cors_1.default)());
// Middleware bảo mật HTTP headers.
app.use((0, helmet_1.default)({
    crossOriginOpenerPolicy: false,
    contentSecurityPolicy: false,
}));
// Middleware xử lý rate limiting (giới hạn số lượng request từ một IP trong một khoảng thời gian).
// app.use(rateLimiter);
// Đăng ký middleware của request-ip
app.use(request_ip_1.default.mw());
// cho phép bất kỳ trang web nào cũng có thể truy cập
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
});
app.use("/", routers_1.default);
routers_1.default.use(middlewares_1.errorHandler);
//# sourceMappingURL=sever.config.js.map