import { Entity, PrimaryColumn, Column } from "typeorm";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("site_product_variant")
export class SiteProductVariant extends BaseTimeEntity {
    @PrimaryColumn({ type: "int4", name: "site_product_id" })
    site_product_id: number;

    @PrimaryColumn({ type: "varchar", name: "product_sku" })
    product_sku: string;

    @Column({ type: "varchar", nullable: true })
    plan_type: string;

    @Column({ type: "varchar", nullable: true })
    name_original: string;

    @Column({ type: "varchar", nullable: true })
    name: string;

    @Column({ type: "varchar", nullable: true })
    status: string;

    @Column({ type: "uuid", unique: true, nullable: true, default: () => "gen_random_uuid()" })
    guid: string;
}
