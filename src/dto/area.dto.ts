import { Exclude, Expose } from "class-transformer";

@Exclude()
export class AreaDto {
    @Expose() name: string;
}
