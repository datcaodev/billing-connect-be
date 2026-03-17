import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("site_categories")
export class SiteCategory extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "uuid", nullable: true, default: () => "gen_random_uuid()" })
    guid: string;

    @Column({ type: "int4", nullable: true })
    parent: number;

    @Column({ nullable: false })
    code: string;

    @Column({ nullable: false })
    name: string;

    @Column({ length: 10, nullable: true })
    country_mcc: string;

    @Column({ type: "smallint", nullable: true })
    position: number;
}
