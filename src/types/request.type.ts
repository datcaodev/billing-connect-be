/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from "express";
import { ITokenPayload } from "./token.type";

// Kế thừa Request với các tham số kiểu mặc định
export interface AuthenticatedRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
  Locals = any
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  token_info?: ITokenPayload;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface IQueryPaginationOption {
  tableName: string;
  queryParams?: QueryParams;
  whereCondition?: string;
  params?: any[];
}

export interface IQueryOption {
  sql: string;
  params?: any[];
}
