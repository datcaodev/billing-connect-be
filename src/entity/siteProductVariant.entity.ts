import { Entity, PrimaryColumn, Column } from "typeorm";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("site_product_variant")
export class SiteProductVariant extends BaseTimeEntity {
    @PrimaryColumn({ name: "site_product_id" })
    site_product_id: number;

    @PrimaryColumn({ name: "product_sku" })
    product_sku: string;

    @Column({ nullable: true })
    plan_type: string;

    @Column({ nullable: true })
    name_original: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    status: string;

    @Column({ nullable: true })
    is_delete: boolean;

    @Column({ type: "uuid", unique: true, nullable: true, default: () => "gen_random_uuid()" })
    guid: string;
}
