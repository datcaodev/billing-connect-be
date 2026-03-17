import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, Index } from "typeorm";
import { BizAgency } from "./bizAgency.entity";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("biz_bundle_by_agency")
@Unique("uq_bundle_agent_product", ["agent_id", "product_sku"])
export class BizBundleByAgency extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "uuid", unique: true, nullable: true, default: () => "gen_random_uuid()" })
    guid: string;

    @Index("idx_bundle_agent")
    @Column({ nullable: false })
    agent_id: number;

    @Index("idx_bundle_product")
    @Column({ nullable: false })
    product_sku: string;

    @Column({ nullable: true })
    name: string;

    @Column({ default: true, nullable: true })
    is_active: boolean;

    @Column({ nullable: true })
    high_flow_size: string;

    @Column({ nullable: true })
    plan_type: string;

    @Column({ nullable: true })
    type: string;

    @ManyToOne(() => BizAgency)
    @JoinColumn({ name: "agent_id" })
    agency: BizAgency;
}
