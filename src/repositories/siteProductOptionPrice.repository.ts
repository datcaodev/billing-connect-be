import { AppDataSource } from "../config/database.config";
import { SiteProductOptionPrice } from "../entity/siteProductOptionPrice.entity";
import { BaseRespository } from "../core/baseRepositories.core";
import { QueryRunner } from "typeorm";

class SiteProductOptionPriceRepository extends BaseRespository {
    private repository = AppDataSource.getRepository(SiteProductOptionPrice);

    public async upsertOptionPrice(data: Partial<SiteProductOptionPrice>, queryRunner?: QueryRunner): Promise<SiteProductOptionPrice> {
        const repo = queryRunner ? queryRunner.manager.getRepository(SiteProductOptionPrice) : this.repository;

        // Check if option price already exists for this sku and copies
        const existing = await repo.findOne({
            where: {
                product_sku: data.product_sku,
                copies: data.copies
            }
        });

        if (existing) {
            Object.assign(existing, data);
            return await repo.save(existing);
        }

        const optionPrice = repo.create(data);
        return await repo.save(optionPrice);
    }

    public async findBySku(sku: string): Promise<SiteProductOptionPrice[]> {
        return await this.repository.find({
            where: { product_sku: sku },
            order: { copies: "ASC" }
        });
    }
    public async findVariantsByDiscount(discountId: number) {
        const qb = this.repository.createQueryBuilder("op")
            .leftJoinAndSelect("site_product_variant", "spv", "spv.product_sku = op.product_sku")
            .where("op.discount_id = :discountId", { discountId })
            .select([
                "op.guid AS op_guid",
                "op.product_sku AS op_product_sku",
                "op.copies AS op_copies",
                "op.retail_price AS op_retail_price",
                "op.currency AS op_currency",
                "spv.name AS spv_name"
            ])
            .andWhere("spv.is_delete = false")
            .orderBy("op.product_sku", "ASC")
            .addOrderBy("op.copies", "ASC");

        const items = await qb.getRawMany();

        // Map the results grouped by variant
        const variantMap = new Map<string, any>();

        for (const item of items) {
            const sku = item.op_product_sku;
            if (!variantMap.has(sku)) {
                variantMap.set(sku, {
                    product_sku: sku,
                    name: item.spv_name,
                    options: []
                });
            }

            variantMap.get(sku).options.push({
                guid: item.op_guid,
                copies: item.op_copies,
                retail_price: item.op_retail_price,
                currency: item.op_currency,
            });
        }

        return Array.from(variantMap.values());
    }

    /**
     * Bỏ giảm giá ra khỏi các copies (option prices) được chỉ định theo danh sách GUID
     */
    public async removeDiscountFromSpecificGuids(optionPriceGuids: string[]): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update(SiteProductOptionPrice)
            .set({ discount_id: null as any })
            .where("guid IN (:...optionPriceGuids)", { optionPriceGuids })
            .execute();
    }
}

export const siteProductOptionPriceRepository = new SiteProductOptionPriceRepository();
