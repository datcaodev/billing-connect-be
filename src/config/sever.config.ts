import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import appRouter from "../routers";
import { LoggerPinoSingleton } from "./logger.config";
import requestIp from "request-ip";
import { errorHandler } from "../middlewares";

const app: Express = express();
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
const logger = LoggerPinoSingleton.getInstance().getLogger();

// cấu hình Keycloak để hoạt động như middleware trong ứng dụng
// app.use(keycloak.middleware());

// Cấu hình cho phép server tin tưởng các reverse proxy (như Nginx, AWS ELB). Điều này cần thiết khi xác định IP thực của client khi đi qua proxy.
app.set("trust proxy", true);

// Middleware để parse dữ liệu JSON trong body của request.
app.use(express.json());

// Middleware để parse dữ liệu x-www-form-urlencoded trong body của request.
app.use(express.urlencoded({ extended: true }));

//Middleware quản lý CORS, chỉ cho phép các request từ env.CORS_ORIGIN
// credentials: true: Cho phép gửi cookie hoặc header xác thực qua request.
app.use(cors());

// Middleware bảo mật HTTP headers.
app.use(helmet({
  crossOriginOpenerPolicy: false,
  contentSecurityPolicy: false,
}));
// Middleware xử lý rate limiting (giới hạn số lượng request từ một IP trong một khoảng thời gian).
// app.use(rateLimiter);

// Đăng ký middleware của request-ip
app.use(requestIp.mw());

// cho phép bất kỳ trang web nào cũng có thể truy cập
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use("/", appRouter);

appRouter.use(errorHandler);

export { app, logger };
