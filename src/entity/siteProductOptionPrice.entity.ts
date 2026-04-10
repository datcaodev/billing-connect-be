import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("site_product_option_price")
export class SiteProductOptionPrice extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "uuid", unique: true, nullable: true, default: () => "gen_random_uuid()" })
    guid: string;

    @Column({ type: "integer", nullable: true })
    site_product_id: number;

    @Column({ type: "varchar", nullable: true })
    product_sku: string;

    @Column({ type: "integer", nullable: false })
    copies: number;

    @Column({ type: "numeric", precision: 12, scale: 2, nullable: true })
    retail_price: number;

    @Column({ type: "integer", nullable: true })
    discount_id: number;

    @Column({ type: "varchar", default: 'CN' })
    currency: string;
}
