import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { BillionProduct } from "./billionProduct.entity";

@Entity("billion_product_prices")
export class BillionProductPrice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    product_sku: string;

    @Column({ nullable: true })
    copies: string;

    @Column({ nullable: true })
    retail_price: string;

    @Column({ nullable: true })
    settlement_price: string;

    @ManyToOne(() => BillionProduct)
    @JoinColumn({ name: "product_sku", referencedColumnName: "sku_id" })
    product: BillionProduct;
}
