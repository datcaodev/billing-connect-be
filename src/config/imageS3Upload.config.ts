import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from '@aws-sdk/client-s3';
import { env } from "../utils/envConfig.utils";


const s3Config = new S3Client({
    region: 'ap-southeast-2',
    credentials:{
       accessKeyId: env.S3_ACCESS_KEY,
       secretAccessKey: env.S3_ACCESS_SECRET
   }
 })

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
//   }
// };

const uploadConfig = multer({
  storage: multerS3({
    s3: s3Config,
    bucket: env.S3_BUCKETS_NAME,
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

export default uploadConfig;

