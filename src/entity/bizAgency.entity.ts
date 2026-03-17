import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("biz_agency")
export class BizAgency extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "uuid", unique: true, nullable: true, default: () => "gen_random_uuid()" })
    guid: string;

    @Column({ length: 100, unique: true, nullable: false })
    code: string;

    @Column({ length: 255, nullable: false })
    name: string;

    @Column({ length: 255, nullable: false })
    email: string;

    @Column({ length: 255, nullable: false })
    phone: string;

    @Column({ length: 255, nullable: true })
    address: string;

    @Column({ length: 255, nullable: true })
    website: string;

    @Column({ type: "jsonb", nullable: true })
    formula: any;

    @Column({ type: "text", nullable: true })
    formula_note: string;

}
