import { Exclude, Expose, Type } from "class-transformer";

@Exclude()
export class BillionProductPriceDto {
    @Expose() id: number;
    @Expose({ name: "product_sku" }) productSku: string;
    @Expose() copies: string;
    @Expose({ name: "retail_price" }) retailPrice: string;
    @Expose({ name: "settlement_price" }) settlementPrice: string;
}

@Exclude()
export class BillionProductPaginationDto {
    @Expose() id: number;
    @Expose({ name: "sku_id" }) skuId: string;
    @Expose() type: string;
    @Expose() name: string;
    // @Expose() days: string;
    // @Expose() capacity: string;
    @Expose({ name: "high_flow_size" }) highFlowSize: string;
    // @Expose() limit_flow_speed: string;
    // @Expose() hotspot_support: string;
    // @Expose() product_id: string;
    // @Expose() product_name: string;
    // @Expose() apn: string;
    // @Expose() operator_info: string;
    @Expose({ name: "plan_type" }) planType: string;
    // @Expose() validity_period: string;
    // @Expose() acceleration_support: string;
    // @Expose() desc: string;
    // @Expose() point_contact_type: string;
    // @Expose() time_zone: string;
    // @Expose() point_contact_hours: string;
    // @Expose() usage_count: string;
    // @Expose() estimated_use_time_flag: string;
    // @Expose() estimated_use_time_gap_hours: string;
    // @Expose() apply_to_device: string;
    // @Expose() apply_to_device_type: any;
    // @Expose() rechargeable_product: string;
    // @Expose() rechargeable_product_series_id: string;
    // @Expose() rechargeable_product_series_name: string;
    // @Expose() provider: string;
    // @Expose() refund_policy: string;
    // @Expose() speed_limit_rule: string;
    // @Expose() carrier_validity_peroid: string;
    // @Expose() country: any;

    @Expose()
    @Type(() => BillionProductPriceDto)
    prices: BillionProductPriceDto[];
}

@Exclude()
export class BillionProductDetailDto extends BillionProductPaginationDto {
    @Expose() days: string;
    @Expose() capacity: string;
    @Expose({ name: "limit_flow_speed" }) limitFlowSpeed: string;
    @Expose({ name: "hotspot_support" }) hotspotSupport: string;
    @Expose({ name: "product_id" }) productId: string;
    @Expose({ name: "product_name" }) productName: string;
    @Expose({ name: "apn" }) apn: string;
    @Expose({ name: "operator_info" }) operatorInfo: string;
    @Expose({ name: "validity_period" }) validityPeriod: string;
    @Expose({ name: "acceleration_support" }) accelerationSupport: string;
    @Expose() desc: string;
    @Expose({ name: "point_contact_type" }) pointContactType: string;
    @Expose({ name: "time_zone" }) timeZone: string;
    @Expose({ name: "point_contact_hours" }) pointContactHours: string;
    @Expose({ name: "usage_count" }) usageCount: string;
    @Expose({ name: "estimated_use_time_flag" }) estimatedUseTimeFlag: string;
    @Expose({ name: "estimated_use_time_gap_hours" }) estimatedUseTimeGapHours: string;
    @Expose({ name: "apply_to_device" }) applyToDevice: string;
    @Expose({ name: "apply_to_device_type" }) applyToDeviceType: any;
    @Expose({ name: "rechargeable_product" }) rechargeableProduct: string;
    @Expose({ name: "rechargeable_product_series_id" }) rechargeableProductSeriesId: string;
    @Expose({ name: "rechargeable_product_series_name" }) rechargeableProductSeriesName: string;
    @Expose({ name: "provider" }) provider: string;
    @Expose({ name: "refund_policy" }) refundPolicy: string;
    @Expose({ name: "speed_limit_rule" }) speedLimitRule: string;
    @Expose({ name: "carrier_validity_peroid" }) carrierValidityPeroid: string;
    @Expose({ name: "country" }) country: any;
}
