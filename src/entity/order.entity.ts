import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 32, unique: true, nullable: true })
    order_id: string;

    @Column({ type: "int8", nullable: true })
    product_id: number;

    @Column({ type: "text", nullable: true })
    email: string;

    @Column({ type: "numeric", nullable: true })
    total_amount: number;

    @Column({ type: "numeric", nullable: true })
    discount_amount: number;

    @Column({ type: "numeric", nullable: true })
    voucher_amount: number;

    @Column({ type: "numeric", nullable: true })
    rate_amount: number;

    @Column({ type: "varchar", length: 20, nullable: true })
    payment_status: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    status: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    partner_order_id: string;

    @Column({ type: "varchar", length: 64, nullable: true })
    transaction_id: string;

    @CreateDateColumn({ type: "timestamptz", default: () => "now()" })
    created_at: Date;
}
