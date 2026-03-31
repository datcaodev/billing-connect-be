import { AppDataSource } from "../config/database.config";
import { BaseRespository } from "../core/baseRepositories.core";

class SyncRepository extends BaseRespository {
  public async refreshMaterializedViews(): Promise<void> {
    return this.handleWithTryCatch(async () => {
      const views = [
        "mv_sku_min_price",
        "mv_product_min_price",
        "mv_category_products",
        "mv_category_cheapest_product"
      ];

      for (const view of views) {
        // Use CONCURRENTLY as requested by the user
        await AppDataSource.query(`REFRESH MATERIALIZED VIEW CONCURRENTLY ${view}`);
      }
    });
  }
}

export const syncRepository = new SyncRepository();
