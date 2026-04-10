import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("billion_countries")
export class BillionCountry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, nullable: true })
    mcc: string;

    @Column({ type: "varchar", nullable: true })
    name: string;

    @Column({ type: "varchar", nullable: true })
    continent: string;

    @Column({ type: "varchar", nullable: true })
    url: string;
}
