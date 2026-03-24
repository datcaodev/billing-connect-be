import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("order_details")
export class OrderDetail {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 32, nullable: true })
    order_id: string;

    @Column({ type: "text", nullable: true })
    customer_email: string;

    @Column({ type: "text", nullable: true })
    customer_name: string;

    @Column({ type: "text", nullable: true })
    customer_phone: string;

    @Column({ type: "jsonb", nullable: true })
    billing_address: any;

    @Column({ type: "jsonb", nullable: true })
    extra_data: any;

    @CreateDateColumn({ type: "timestamptz", default: () => "now()" })
    created_at: Date;
}
