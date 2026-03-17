import cloudinaryConfig from "../config/cloudinary.config";

export const uploadToCloudinary = async (file: Express.Multer.File, folder: string = "site_products"): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinaryConfig.uploader.upload_stream(
            {
                folder: folder,
                resource_type: "auto",
            },
            (error, result) => {
                if (error) return reject(error);
                if (result) resolve(result.secure_url);
                else reject(new Error("Upload failed with no result"));
            }
        );

        uploadStream.end(file.buffer);
    });
};
