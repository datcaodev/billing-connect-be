import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("site_discounts")
export class SiteDiscount extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "uuid", unique: true, nullable: true, default: () => "gen_random_uuid()" })
    guid: string;

    @Column({ length: 50, unique: true, nullable: false })
    name: string;

    @Column({ length: 10, nullable: false })
    type: string;

    @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
    value: number;

    @Column({ nullable: true })
    is_active: boolean;

    @Column({ type: 'timestamptz', nullable: true })
    start_date: Date;

    @Column({ type: 'timestamptz', nullable: true })
    end_date: Date;

    @Column({ nullable: true })
    usage_limit: number;

    @Column({ nullable: true })
    used_count: number;
}
