"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const uploadToCloudinary = async (file, folder = "site_products") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_config_1.default.uploader.upload_stream({
            folder: folder,
            resource_type: "auto",
        }, (error, result) => {
            if (error)
                return reject(error);
            if (result)
                resolve(result.secure_url);
            else
                reject(new Error("Upload failed with no result"));
        });
        uploadStream.end(file.buffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=cloudinary.util.js.map