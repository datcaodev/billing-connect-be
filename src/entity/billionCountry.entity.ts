import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("billion_countries")
export class BillionCountry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: true })
    mcc: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    continent: string;

    @Column({ nullable: true })
    url: string;
}
