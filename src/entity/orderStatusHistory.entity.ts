import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from "typeorm";

@Entity("order_status_history")
export class OrderStatusHistory {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 64, nullable: false })
    @Index("idx_order_history_order_id")
    order_id: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    from_status: string;

    @Column({ type: "varchar", length: 50, nullable: false })
    to_status: string;

    @Column({ type: "text", nullable: true })
    note: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    error_code: string;

    @Column({ type: "jsonb", nullable: true })
    partner_response: any;

    @CreateDateColumn({ type: "timestamptz", default: () => "now()" })
    @Index("idx_order_history_created_at")
    created_at: Date;

    @Column({ type: "varchar", length: 100, nullable: true })
    created_by: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    request_id: string;
}
