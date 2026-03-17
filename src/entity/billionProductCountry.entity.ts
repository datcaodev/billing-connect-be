import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { BillionProduct } from "./billionProduct.entity";
import { BillionCountry } from "./billionCountry.entity";

@Entity("billion_product_countries")
export class BillionProductCountry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    product_sku: string;

    @Column({ nullable: true })
    country_mcc: string;

    @ManyToOne(() => BillionProduct)
    @JoinColumn({ name: "product_sku", referencedColumnName: "sku_id" })
    product: BillionProduct;

    @ManyToOne(() => BillionCountry)
    @JoinColumn({ name: "country_mcc", referencedColumnName: "mcc" })
    country_details: BillionCountry;
}
