/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginationResult } from "../types/response.type";
import { IQueryOption, IQueryPaginationOption } from "../types/request.type";
import { isNumber } from "lodash";
import { DatabaseORMSingleton } from "../config/database.config";
import { QueryResult } from "pg";

export class BaseQuery {
  // ✅ Query thông thường (không phân trang)
  static async query<T>(data: IQueryOption): Promise<QueryResult<T>> {
    const { params = [], sql } = data
    const database = DatabaseORMSingleton.getInstance()
    const rows = await database.query(sql, params);
    return rows;
  }

  // ✅ Query có phân trang
  static async paginate<T>(data: IQueryPaginationOption): Promise<PaginationResult<T>> {
    const database = DatabaseORMSingleton.getInstance()
    const {
      params = [],
      queryParams = {},
      tableName,
      whereCondition = "1=1"
    } = data
    // Gán giá trị mặc định nếu `undefined`
    const page = (queryParams?.page && isNumber(queryParams?.page)) ? queryParams?.page : 1;
    const limit = (queryParams?.limit && isNumber(queryParams?.limit)) ? queryParams?.limit : 10;
    const sortBy = queryParams?.sortBy ?? "id";
    const sortOrder = queryParams?.sortOrder ?? "DESC";

    const offset = (page - 1) * limit;

    const paramsMapping = params.map(item => `%${item || ''}%`)

    // Đếm tổng số bản ghi
    const countQuery = `SELECT COUNT(*) as totalItems FROM ${tableName} WHERE ${whereCondition}`;
    const [countRows]: any = await database.query(countQuery, paramsMapping);
    const totalItems = countRows[0].totalItems;
    const totalPages = Math.ceil(totalItems / limit);

    // Query lấy dữ liệu
    const dataQuery = `
      SELECT * FROM ${tableName}
      WHERE ${whereCondition}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const [rows]: any = await database.query(dataQuery, [...paramsMapping, limit, offset]);

    return {
      totalItems,
      totalPages,
      currentPage: page,
      items: rows,
    };
  }
}
