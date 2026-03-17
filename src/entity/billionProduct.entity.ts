import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("billion_products")
export class BillionProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    sku_id: string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    days: string;

    @Column({ nullable: true })
    capacity: string;

    @Column({ nullable: true })
    high_flow_size: string;

    @Column({ nullable: true })
    limit_flow_speed: string;

    @Column({ nullable: true })
    hotspot_support: string;

    @Column({ nullable: true })
    product_id: string;

    @Column({ nullable: true })
    product_name: string;

    @Column({ nullable: true })
    apn: string;

    @Column({ nullable: true })
    operator_info: string;

    @Column({ nullable: true })
    plan_type: string;

    @Column({ nullable: true })
    validity_period: string;

    @Column({ nullable: true })
    acceleration_support: string;

    @Column({ type: "text", nullable: true })
    desc: string;

    @Column({ nullable: true })
    point_contact_type: string;

    @Column({ nullable: true })
    time_zone: string;

    @Column({ nullable: true })
    point_contact_hours: string;

    @Column({ nullable: true })
    usage_count: string;

    @Column({ nullable: true })
    estimated_use_time_flag: string;

    @Column({ nullable: true })
    estimated_use_time_gap_hours: string;

    @Column({ nullable: true })
    apply_to_device: string;

    @Column({ type: "jsonb", nullable: true })
    apply_to_device_type: any;

    @Column({ nullable: true })
    rechargeable_product: string;

    @Column({ nullable: true })
    rechargeable_product_series_id: string;

    @Column({ nullable: true })
    rechargeable_product_series_name: string;

    @Column({ nullable: true })
    provider: string;

    @Column({ nullable: true })
    refund_policy: string;

    @Column({ nullable: true })
    speed_limit_rule: string;

    @Column({ nullable: true })
    carrier_validity_peroid: string;

    @Column({ type: "jsonb", nullable: true })
    country: any;
}
