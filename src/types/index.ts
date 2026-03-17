export * from './request.type'
export * from './response.type'
export * from './s3Multer.type'
export * from './siteCategory.type'
export * from '../core/serviceResponse.core'

import 'express';
import { ITokenPayload } from './token.type';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      client?: {
        clientId: string;
        clientSecret: string;
        clientUuid: string;
        code: string;
        realm: string
      },
      user_guid: string
      service?: string,
      token_decode?: ITokenPayload
    }
  }
}