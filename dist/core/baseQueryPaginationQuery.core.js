"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseQuery = void 0;
const lodash_1 = require("lodash");
const database_config_1 = require("../config/database.config");
class BaseQuery {
    // ✅ Query thông thường (không phân trang)
    static async query(data) {
        const { params = [], sql } = data;
        const database = database_config_1.DatabaseORMSingleton.getInstance();
        const rows = await database.query(sql, params);
        return rows;
    }
    // ✅ Query có phân trang
    static async paginate(data) {
        var _a, _b;
        const database = database_config_1.DatabaseORMSingleton.getInstance();
        const { params = [], queryParams = {}, tableName, whereCondition = "1=1" } = data;
        // Gán giá trị mặc định nếu `undefined`
        const page = ((queryParams === null || queryParams === void 0 ? void 0 : queryParams.page) && (0, lodash_1.isNumber)(queryParams === null || queryParams === void 0 ? void 0 : queryParams.page)) ? queryParams === null || queryParams === void 0 ? void 0 : queryParams.page : 1;
        const limit = ((queryParams === null || queryParams === void 0 ? void 0 : queryParams.limit) && (0, lodash_1.isNumber)(queryParams === null || queryParams === void 0 ? void 0 : queryParams.limit)) ? queryParams === null || queryParams === void 0 ? void 0 : queryParams.limit : 10;
        const sortBy = (_a = queryParams === null || queryParams === void 0 ? void 0 : queryParams.sortBy) !== null && _a !== void 0 ? _a : "id";
        const sortOrder = (_b = queryParams === null || queryParams === void 0 ? void 0 : queryParams.sortOrder) !== null && _b !== void 0 ? _b : "DESC";
        const offset = (page - 1) * limit;
        const paramsMapping = params.map(item => `%${item || ''}%`);
        // Đếm tổng số bản ghi
        const countQuery = `SELECT COUNT(*) as totalItems FROM ${tableName} WHERE ${whereCondition}`;
        const [countRows] = await database.query(countQuery, paramsMapping);
        const totalItems = countRows[0].totalItems;
        const totalPages = Math.ceil(totalItems / limit);
        // Query lấy dữ liệu
        const dataQuery = `
      SELECT * FROM ${tableName}
      WHERE ${whereCondition}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?
    `;
        const [rows] = await database.query(dataQuery, [...paramsMapping, limit, offset]);
        return {
            totalItems,
            totalPages,
            currentPage: page,
            items: rows,
        };
    }
}
exports.BaseQuery = BaseQuery;
//# sourceMappingURL=baseQueryPaginationQuery.core.js.map