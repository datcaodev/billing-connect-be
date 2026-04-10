import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SiteProduct } from "./siteProduct.entity";
import { SiteCategory } from "./siteCategory.entity";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("site_products_categories_mapping")
export class SiteProductCategoryMapping extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "integer", nullable: false })
    product_id: number;

    @Column({ type: "integer", nullable: false })
    category_id: number;

    @ManyToOne(() => SiteProduct)
    @JoinColumn({ name: "product_id" })
    product: SiteProduct;

    @ManyToOne(() => SiteCategory)
    @JoinColumn({ name: "category_id" })
    category: SiteCategory;
}
