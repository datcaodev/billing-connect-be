import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAgencyPriceMv1775729499082 implements MigrationInterface {

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
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX uq_mv_agency_price_bundle_copy 
            ON mv_agency_price (sku_guid, copies_guid);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP MATERIALIZED VIEW IF EXISTS mv_agency_price;
        `);
    }

}
