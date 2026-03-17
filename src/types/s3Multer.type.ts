export interface S3MulterFile extends Express.Multer.File {
    location: string;
  }