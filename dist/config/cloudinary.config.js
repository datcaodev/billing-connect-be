"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const envConfig_utils_1 = require("../utils/envConfig.utils");
cloudinary_1.v2.config({
    cloud_name: envConfig_utils_1.env.CLOUDINARY_NAME,
    api_key: envConfig_utils_1.env.CLOUDINARY_API_KEY,
    api_secret: envConfig_utils_1.env.CLOUDINARY_API_SECRET,
});
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.config.js.map