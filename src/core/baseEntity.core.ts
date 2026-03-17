// src/entities/base.entity.ts
import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseFeildEntity {

  @Column({ type: "uuid", default: () => "gen_random_uuid()" })
  guid: string;

  @Column({ default: false, type: "boolean" })
  is_deleted: boolean;

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP"
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP"
  })
  updated_at: Date;
}

export abstract class BaseTimeEntity {

  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP"
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP"
  })
  updated_at: Date;

  @Column({ default: false, type: "boolean" })
  is_deleted: boolean;
}


