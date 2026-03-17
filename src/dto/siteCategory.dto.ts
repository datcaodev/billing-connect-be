import { Expose, Type } from "class-transformer";

export class SiteCategoryDto {
    @Expose()
    guid: string;

    @Expose()
    name: string;

    @Expose()
    code: string;

    @Expose({ name: "country_mcc" })
    countryMcc: string | null;

    @Expose()
    position: number | null;

    @Expose({ name: "is_active" })
    isActive: boolean;

    @Expose({ name: "created_at" })
    createdAt: Date;

    @Expose({ name: "updated_at" })
    updatedAt: Date;

    @Expose()
    @Type(() => SiteCategoryDto)
    area?: SiteCategoryDto;

    @Expose()
    @Type(() => SiteCategoryDto)
    countries?: SiteCategoryDto[];
}
