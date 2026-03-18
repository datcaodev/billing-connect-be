import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ExchangeRateHistoryPaginationDto {
    @Expose({ name: "currency" }) currency: string;
    @Expose({ name: "rate" }) rate: string;
    @Expose({ name: "start_date" }) startDate: Date;
    @Expose({ name: "end_date" }) endDate: Date;
    @Expose({ name: "id" }) id: number;
}

@Exclude()
export class ExchangeRateDto {
    @Expose({ name: "currency" }) currency: string;
    @Expose({ name: "rate" }) rate: string;
}