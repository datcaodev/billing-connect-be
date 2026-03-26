"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
const envConfig_utils_1 = require("../utils/envConfig.utils");
const s3Config = new client_s3_1.S3Client({
    region: 'ap-southeast-2',
    credentials: {
        accessKeyId: envConfig_utils_1.env.S3_ACCESS_KEY,
        secretAccessKey: envConfig_utils_1.env.S3_ACCESS_SECRET
    }
});
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
//   }
// };
const uploadConfig = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3Config,
        bucket: envConfig_utils_1.env.S3_BUCKETS_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: "TESTING_METADATA" });
        },
        key: function (req, file, cb) {
            // Giữ nguyên phần mở rộng của file gốc
            const fileExtension = file.originalname.split('.').pop(); // Lấy đuôi file
            cb(null, `${Date.now().toString()}.${fileExtension}`);
        }
    }),
});
exports.default = uploadConfig;
//# sourceMappingURL=imageS3Upload.config.js.map