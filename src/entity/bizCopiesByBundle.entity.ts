import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { BizBundleByAgency } from "./bizBundleByAgency.entity";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("biz_copies_by_bundle")
export class BizCopiesByBundle extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "uuid", unique: true, nullable: true, default: () => "gen_random_uuid()" })
    guid: string;

    @Index("idx_copies_bundle")
    @Column({ type: "integer", nullable: false })
    bundle_id: number;

    @Column({ type: "boolean", default: true, nullable: true })
    is_active: boolean;

    @Column({ type: "integer", nullable: false })
    copies: number;

    @Column({ type: "numeric", precision: 12, scale: 4, nullable: true })
    base_price: number;

    @Column({ type: "numeric", precision: 12, scale: 4, nullable: true })
    final_price: number;

    @Column({ type: "jsonb", nullable: true })
    formula_snapsot: any;

    @ManyToOne(() => BizBundleByAgency, { onDelete: "CASCADE" })
    @JoinColumn({ name: "bundle_id" })
    bundle: BizBundleByAgency;
}
