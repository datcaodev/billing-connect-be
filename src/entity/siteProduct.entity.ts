import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseTimeEntity } from "../core/baseEntity.core";

@Entity("site_products")
export class SiteProduct extends BaseTimeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "uuid", unique: true, nullable: true })
    guid: string;

    @Column({ type: "varchar", length: 500, nullable: true })
    name: string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    image_url: string;

    @Column({ type: "text", nullable: true })
    desc: string;

    @Column({ nullable: true })
    status: string;

    @Column({ unique: true, nullable: true })
    slug: string;
}
