import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameIsDeleteToIsDeleted1774521923629 implements MigrationInterface {
    name = 'RenameIsDeleteToIsDeleted1774521923629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "site_product_variant" DROP COLUMN "is_delete"`);
        await queryRunner.query(`ALTER TABLE "site_products" DROP COLUMN "is_delete"`);
        await queryRunner.query(`ALTER TABLE "site_product_option_price" DROP COLUMN "is_delete"`);
        await queryRunner.query(`ALTER TABLE "site_product_variant" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "site_product_variant" ALTER COLUMN "guid" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "site_discounts" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "site_discounts" ALTER COLUMN "guid" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "site_categories" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "site_categories" ALTER COLUMN "guid" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "site_product_option_price" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "site_product_option_price" ALTER COLUMN "guid" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "biz_agency" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "biz_agency" ALTER COLUMN "guid" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "biz_bundle_by_agency" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "biz_bundle_by_agency" ALTER COLUMN "guid" SET DEFAULT gen_random_uuid()`);
        await queryRunner.query(`ALTER TABLE "biz_copies_by_bundle" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "biz_copies_by_bundle" ALTER COLUMN "guid" SET DEFAULT gen_random_uuid()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "biz_copies_by_bundle" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "biz_copies_by_bundle" ALTER COLUMN "guid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "biz_bundle_by_agency" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "biz_bundle_by_agency" ALTER COLUMN "guid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "biz_agency" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "biz_agency" ALTER COLUMN "guid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "site_product_option_price" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "site_product_option_price" ALTER COLUMN "guid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "site_categories" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "site_categories" ALTER COLUMN "guid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "site_discounts" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "site_discounts" ALTER COLUMN "guid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "site_product_variant" ALTER COLUMN "guid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "site_product_variant" ALTER COLUMN "guid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "site_product_option_price" ADD "is_delete" boolean`);
        await queryRunner.query(`ALTER TABLE "site_products" ADD "is_delete" boolean`);
        await queryRunner.query(`ALTER TABLE "site_product_variant" ADD "is_delete" boolean`);
    }

}
