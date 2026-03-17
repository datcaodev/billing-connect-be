import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SiteDiscount } from "./siteDiscounts.entity";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("site_day_by_bundle")
export class SiteDayByBundle extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    site_product_id: number;

    @Column({ length: 100, nullable: false })
    product_sku: string;

    @Column({ type: "numeric", precision: 12, scale: 2, nullable: false })
    base_price: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: true })
    discount_id: number;

    @ManyToOne(() => SiteDiscount)
    @JoinColumn({ name: "discount_id", referencedColumnName: "id" })
    discount: SiteDiscount;
}
