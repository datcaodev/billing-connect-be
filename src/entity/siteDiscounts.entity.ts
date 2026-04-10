import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("site_discounts")
export class SiteDiscount extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "uuid", unique: true, nullable: true, default: () => "gen_random_uuid()" })
    guid: string;

    @Column({ type: "varchar", length: 255, unique: true, nullable: true })
    name: string;

    @Column({ type: "varchar", length: 10, nullable: false })
    type: string;

    @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
    value: number;

    @Column({ type: "boolean", nullable: true })
    is_active: boolean;

    @Column({ type: 'timestamptz', nullable: true })
    start_date: Date;

    @Column({ type: 'timestamptz', nullable: true })
    end_date: Date;

    @Column({ type: "integer", nullable: true })
    usage_limit: number;

    @Column({ type: "integer", nullable: true })
    used_count: number;
}
