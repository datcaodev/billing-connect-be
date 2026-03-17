import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("site_product_option_price")
export class SiteProductOptionPrice extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    product_sku: string;

    @Column({ nullable: false })
    copies: number;

    @Column({ type: "numeric", precision: 12, scale: 2, nullable: true })
    retail_price: number;

    @Column({ nullable: true })
    discount_id: number;

    @Column({ default: 'CN' })
    currency: string;
}
