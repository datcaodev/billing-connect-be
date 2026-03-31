"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncRepository = void 0;
const database_config_1 = require("../config/database.config");
const baseRepositories_core_1 = require("../core/baseRepositories.core");
class SyncRepository extends baseRepositories_core_1.BaseRespository {
    async refreshMaterializedViews() {
        return this.handleWithTryCatch(async () => {
            const views = [
                "mv_sku_min_price",
                "mv_product_min_price",
                "mv_category_products",
                "mv_category_cheapest_product",
                "mv_product_search",
                "mv_products_full"
            ];
            for (const view of views) {
                // Use CONCURRENTLY as requested by the user
                await database_config_1.AppDataSource.query(`REFRESH MATERIALIZED VIEW CONCURRENTLY ${view}`);
            }
        });
    }
}
exports.syncRepository = new SyncRepository();
//# sourceMappingURL=sync.repository.js.map