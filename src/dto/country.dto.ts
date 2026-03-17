import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CountryDto {
    @Expose({ name: "url" }) url: string;
    @Expose({ name: "mcc" }) mcc: string;
    @Expose({ name: "continent" }) area: string;
    @Expose({ name: "name" }) name: string;
}