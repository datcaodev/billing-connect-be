import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("billion_products")
export class BillionProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, nullable: true })
    sku_id: string;

    @Column({ type: "varchar", nullable: true })
    type: string;

    @Column({ type: "varchar", nullable: true })
    name: string;

    @Column({ type: "varchar", nullable: true })
    days: string;

    @Column({ type: "varchar", nullable: true })
    capacity: string;

    @Column({ type: "varchar", nullable: true })
    high_flow_size: string;

    @Column({ type: "varchar", nullable: true })
    limit_flow_speed: string;

    @Column({ type: "varchar", nullable: true })
    hotspot_support: string;

    @Column({ type: "varchar", nullable: true })
    product_id: string;

    @Column({ type: "varchar", nullable: true })
    product_name: string;

    @Column({ type: "varchar", nullable: true })
    apn: string;

    @Column({ type: "varchar", nullable: true })
    operator_info: string;

    @Column({ type: "varchar", nullable: true })
    plan_type: string;

    @Column({ type: "varchar", nullable: true })
    validity_period: string;

    @Column({ type: "varchar", nullable: true })
    acceleration_support: string;

    @Column({ type: "text", nullable: true })
    desc: string;

    @Column({ type: "varchar", nullable: true })
    point_contact_type: string;

    @Column({ type: "varchar", nullable: true })
    time_zone: string;

    @Column({ type: "varchar", nullable: true })
    point_contact_hours: string;

    @Column({ type: "varchar", nullable: true })
    usage_count: string;

    @Column({ type: "varchar", nullable: true })
    estimated_use_time_flag: string;

    @Column({ type: "varchar", nullable: true })
    estimated_use_time_gap_hours: string;

    @Column({ type: "varchar", nullable: true })
    apply_to_device: string;

    @Column({ type: "jsonb", nullable: true })
    apply_to_device_type: any;

    @Column({ type: "varchar", nullable: true })
    rechargeable_product: string;

    @Column({ type: "varchar", nullable: true })
    rechargeable_product_series_id: string;

    @Column({ type: "varchar", nullable: true })
    rechargeable_product_series_name: string;

    @Column({ type: "varchar", nullable: true })
    provider: string;

    @Column({ type: "varchar", nullable: true })
    refund_policy: string;

    @Column({ type: "varchar", nullable: true })
    speed_limit_rule: string;

    @Column({ type: "varchar", nullable: true })
    carrier_validity_peroid: string;

    @Column({ type: "jsonb", nullable: true })
    country: any;
}
