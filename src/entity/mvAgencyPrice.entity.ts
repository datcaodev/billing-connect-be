import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: 'mv_agency_price',
    synchronize: false,
})
export class MvAgencyPrice {
    @ViewColumn()
    sku_guid: string;

    @ViewColumn()
    product_sku: string;

    @ViewColumn()
    name: string;

    @ViewColumn()
    type: string;

    @ViewColumn()
    high_flow_size: number;

    @ViewColumn()
    plan_type: string;

    @ViewColumn()
    country_mcc: string;

    @ViewColumn()
    country_name: string;

    @ViewColumn()
    area_name: string;

    @ViewColumn()
    copies_guid: string;

    @ViewColumn()
    copies: string;

    @ViewColumn()
    base_price: number;

    @ViewColumn()
    final_price: number;

    @ViewColumn()
    formula_snapsot: any;
}