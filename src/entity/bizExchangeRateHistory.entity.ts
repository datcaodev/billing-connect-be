import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("site_exchange_rate_history")
export class SiteExchangeRateHistory extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 10, nullable: true })
    currency: string;

    @Column({ type: "numeric", precision: 10, scale: 4, nullable: false })
    rate: string;

    @Column({ type: 'timestamptz', nullable: true })
    start_date: Date;

    @Column({ type: 'timestamptz', nullable: true })
    end_date: Date;
}
