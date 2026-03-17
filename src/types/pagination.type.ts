import { FindOptionsOrderValue } from "typeorm";

export interface IPaginationMapping {
  take: number;
  skip: number;
  orderBy: FindOptionsOrderValue;
}

export interface IQueryPaginationRepository<T> {
  data: T
  total: number
}


export type PaginateORMdResult<T> = [T[], number];
