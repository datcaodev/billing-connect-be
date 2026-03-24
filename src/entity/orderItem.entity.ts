import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("order_items")
export class OrderItem {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    order_id: string;

    @Column({ type: "int4", nullable: false })
    product_id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    product_sku: string;

    @Column({ type: "numeric", precision: 18, scale: 2, nullable: false })
    price: number;

    @Column({ type: "numeric", precision: 18, scale: 2, nullable: false })
    discount_price: number;

    @Column({ type: "int4", nullable: false })
    quantity: number;

    @Column({ type: "varchar", length: 20, nullable: false })
    copies: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
}
