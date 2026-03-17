import { AppDataSource } from "../config/database.config";
import { BizCopiesByBundle } from "../entity/bizCopiesByBundle.entity";
import { BaseRespository } from "../core/baseRepositories.core";

class CopiesByBundleRepository extends BaseRespository {
    public async upsertCopy(data: Partial<BizCopiesByBundle>, queryRunner?: any) {
        const repo = queryRunner ? queryRunner.manager.getRepository(BizCopiesByBundle) : AppDataSource.getRepository(BizCopiesByBundle);

        let copy = await repo.findOne({
            where: { bundle_id: data.bundle_id, copies: data.copies }
        });

        if (copy) {
            Object.assign(copy, data);
            return await repo.save(copy);
        } else {
            copy = repo.create(data);
            return await repo.save(copy);
        }
    }

    public async deleteByBundleIdExcludeCopies(bundleId: number, activeCopies: number[], queryRunner?: any) {
        const repo = queryRunner ? queryRunner.manager.getRepository(BizCopiesByBundle) : AppDataSource.getRepository(BizCopiesByBundle);
        // Soft delete or hard delete? The entity has BaseTimeEntity but not is_deleted.
        // Let's just deactivate them if is_active exists, or hard delete if they are no longer in the list.
        // User didn't specify, but usually we sync.
        if (activeCopies.length > 0) {
            await repo.createQueryBuilder()
                .delete()
                .where("bundle_id = :bundleId AND copies NOT IN (:...activeCopies)", { bundleId, activeCopies })
                .execute();
        } else {
            await repo.delete({ bundle_id: bundleId });
        }
    }

    public async getPriceBySkuAndCopies(sku: string, copies: number) {
        return await AppDataSource.getRepository(BizCopiesByBundle)
            .createQueryBuilder("cb")
            .innerJoin("cb.bundle", "bundle")
            .where("bundle.product_sku = :sku", { sku })
            .andWhere("cb.copies = :copies", { copies })
            .andWhere("bundle.is_active = true")
            .andWhere("cb.is_active = true")
            .getOne();
    }

    public async findActiveCopiesByBundleIds(bundleIds: number[]) {
        return await AppDataSource.getRepository(BizCopiesByBundle)
            .createQueryBuilder("copy")
            .where("copy.bundle_id IN (:...bundleIds)", { bundleIds })
            .andWhere("copy.is_active = true")
            .getMany();
    }
}

export const copiesByBundleRepository = new CopiesByBundleRepository();
