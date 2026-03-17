import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("site_exchange_rate")
export class SiteExchangeRate extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 10, nullable: true })
    currency: string;

    @Column({ type: "numeric", precision: 10, scale: 4, nullable: false })
    rate: string;
}
