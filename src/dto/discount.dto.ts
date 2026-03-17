import { Expose } from "class-transformer";

export class DiscountDto {
    @Expose() guid: string;
    @Expose() name: string;
    @Expose() type: string;
    @Expose() value: number;
    // @Expose({ name: "is_active" }) isActive: boolean;
    @Expose({ name: "start_date" }) startDate: Date;
    @Expose({ name: "end_date" }) endDate: Date;
    // @Expose({ name: "usage_limit" }) usageLimit: number;
    // @Expose({ name: "used_count" }) usedCount: number;
    @Expose() status: string;
    @Expose({ name: "created_at" }) createdAt: Date;
    @Expose({ name: "updated_at" }) updatedAt: Date;
}
