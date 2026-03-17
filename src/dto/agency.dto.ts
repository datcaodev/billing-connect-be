import { Exclude, Expose } from "class-transformer";

@Exclude()
export class AgencyPaginationDto {
    @Expose({ name: "guid" }) guid: string;
    @Expose({ name: "code" }) code: string;
    @Expose({ name: "name" }) name: string;
    @Expose({ name: "email" }) email: string;
    @Expose({ name: "phone" }) phone: string;
    @Expose({ name: "address" }) address: string;
    @Expose({ name: "website" }) website: string;
    @Expose({ name: "created_at" }) created_at: Date;
    @Expose({ name: "updated_at" }) updated_at: Date;
}
