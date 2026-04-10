import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";

@Entity("sync_requests")
export class SyncRequest {
    @PrimaryGeneratedColumn()
    @Index("ix_sync_requests_id")
    id: number;

    @Column({ type: "varchar", nullable: false })
    saga_name: string;

    @Column({ type: "varchar", nullable: true })
    step: string;

    @Column({ type: "varchar", nullable: false })
    status: string;

    @Column({ type: "text", nullable: true })
    error: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
