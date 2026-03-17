import { StatusCodes } from "http-status-codes";
import { SuccessCode } from "../enums/success.enum";
import { ErrorCode } from "../enums";

export interface PaginationResult<T> {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    items: T[];
  }
  
  export interface IServiceResponseParams<T> {
    message?: string;
    data?: T;
    code?: SuccessCode | ErrorCode;
    headerStatusCode?: StatusCodes
    error_code?: string
  }