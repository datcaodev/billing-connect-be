"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerRouter = (0, express_1.default)();
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "API DOC BILLING CONNECT",
            version: "0.1.0",
            description: "API BILLING CONNECT",
            // servers: [
            //   {
            //     url: "http://113.161.103.134:8104"
            //   }
            // ]
        }
    },
    apis: ["./src/routers/**/*.router.ts"],
};
const openapiSpecification = (0, swagger_jsdoc_1.default)(options);
swaggerRouter.use('/api-docs', swagger_ui_express_1.default.serve);
swaggerRouter.get('/api-docs', swagger_ui_express_1.default.setup(openapiSpecification, { explorer: true }));
swaggerRouter.get('/api-docs.json', (req, res) => {
    res.json(openapiSpecification);
});
exports.default = swaggerRouter;
//# sourceMappingURL=swaggerApi.router.js.map