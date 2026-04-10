import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMvAgencyPrice1775793417091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
CREATE MATERIALIZED VIEW mv_agency_price as 
select 
bbba.guid as sku_guid,
bbba.product_sku, 
bbba."name", 
bbba."type" , 
bbba.high_flow_size ,
bbba.plan_type , 
bbba.country_mcc , 
bbba.country_name , 
bbba.area_name,
bcbb.guid as copies_guid,
bcbb.copies::text ,
bcbb.base_price ,
bcbb.final_price , 
bcbb.formula_snapsot 
from biz_bundle_by_agency bbba join (select * from biz_copies_by_bundle where biz_copies_by_bundle.is_deleted = false) bcbb on bbba.id = bcbb.bundle_id where bbba.agent_id = 16 and bbba.is_deleted = false
and not exists (select spv.product_sku  from site_product_variant spv where spv.product_sku = bbba.product_sku and is_deleted = false)
            `);
        await queryRunner.query(`
CREATE UNIQUE INDEX uq_mv_bundle_price_bundle_copy
ON mv_agency_price (copies_guid);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP MATERIALIZED VIEW mv_agency_price;`);
    }

}
