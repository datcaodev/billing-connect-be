import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class AgencyPackagePriceDto {
    @Expose() productSku: string;
    @Expose() copies: string;
    @Expose() retailPrice: string;
    @Expose() settlementPrice: string;
    @Expose() finalPrice: string;
}

@Exclude()
export class AgencyPackageDto {
    @Expose() skuId: string;
    @Expose() name: string;
    @Expose() type: string;
    @Expose() highFlowSize: string;
    @Expose() planType: string;

    @Expose()
    @Type(() => AgencyPackagePriceDto)
    prices: AgencyPackagePriceDto[];
}
