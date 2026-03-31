import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class CategoryDto {
    @Expose() guid: string;
    @Expose() code: string;
    @Expose() name: string;
    @Expose({ name: "country_mcc" }) countryMcc: string;

    @Expose()
    @Type(() => CategoryDto)
    parent: CategoryDto;
}

@Exclude()
export class DiscountSimpleDto {
    // @Expose() id: number;
    @Expose() guid: string;
    @Expose() name: string;
    @Expose() type: string;
    @Expose() value: number;
}

@Exclude()
export class SiteProductOptionPriceDto {
    @Expose() guid: string;
    @Expose({ name: "product_sku" }) productSku: string;
    @Expose() copies: number;
    @Expose({ name: "retail_price" }) retailPrice: number;
    @Expose({ name: "original_price" }) originalPrice: string;
    @Expose({ name: "final_price" }) finalPrice: string;
    @Expose() currency: string;

    @Expose()
    @Type(() => DiscountSimpleDto)
    discount: DiscountSimpleDto;
}

@Exclude()
export class SiteProductVariantDto {
    @Expose({ name: "product_sku" }) productSku: string;
    @Expose({ name: "plan_type" }) planType: string;
    @Expose() name: string;
    @Expose() status: string;
}

@Exclude()
export class SiteProductPaginationDto {
    @Expose() guid: string;
    @Expose() name: string;
    @Expose() type: string;
    @Expose() status: string;
    @Expose({ name: "image_url" }) imageUrl: string;
    @Expose() desc: string;
    @Expose() slug: string;
    @Expose({ name: "created_at" }) createdAt: string;
    @Expose({ name: "updated_at" }) updatedAt: string;

    @Expose()
    @Type(() => SiteProductVariantDto)
    variants: SiteProductVariantDto[];

    @Expose()
    @Type(() => CategoryDto)
    categories: CategoryDto[];
}

@Exclude()
export class SiteProductOptionPriceSimpleDto {
    @Expose() guid: string;
    @Expose() copies: number;
    @Expose({ name: "retail_price" }) retailPrice: number;
    @Expose() currency: string;

    @Expose()
    @Type(() => DiscountSimpleDto)
    discount: DiscountSimpleDto;
}

@Exclude()
export class SiteProductVariantWithPriceDto {
    @Expose() guid: string;
    @Expose({ name: "product_sku" }) productSku: string;
    @Expose() name: string;
    @Expose({ name: "name_original" }) nameOriginal: string;
    @Expose({ name: "plan_type" }) planType: string;

    @Expose()
    @Type(() => SiteProductOptionPriceSimpleDto)
    options: SiteProductOptionPriceSimpleDto[];
}
