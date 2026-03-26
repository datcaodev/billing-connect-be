"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPaginatedData = mapPaginatedData;
exports.mapData = mapData;
exports.mapDataArray = mapDataArray;
const class_transformer_1 = require("class-transformer");
function mapPaginatedData(params) {
    const { dtoClass, entities, skip, take, total } = params;
    const items = (0, class_transformer_1.plainToInstance)(dtoClass, entities, {
        excludeExtraneousValues: true,
        // enableImplicitConversion: true // hiện null nếu k có giá trị
    });
    const currentPage = Math.floor(skip / take);
    const totalPages = Math.ceil(total / take);
    return {
        content: items,
        currentPage,
        pageSize: take,
        currentTotalElementsCount: items.length,
        pagesCount: totalPages,
        hasPrevious: currentPage > 1,
        hasNext: currentPage < totalPages,
        total,
    };
}
function mapData(params) {
    const { dtoClass, entities } = params;
    const items = (0, class_transformer_1.plainToInstance)(dtoClass, entities, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true // hiện null nếu k có giá trị
    });
    return items;
}
function mapDataArray(params) {
    const { dtoClass, entities } = params;
    const items = (0, class_transformer_1.plainToInstance)(dtoClass, entities, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true // hiện null nếu k có giá trị
    });
    return items;
}
//# sourceMappingURL=basePagination.core.js.map