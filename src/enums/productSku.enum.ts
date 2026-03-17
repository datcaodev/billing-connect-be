export enum CommodityType {
    /** 110 - Gói data tự chọn */
    SELF_SELECTED_DATA_PLAN = 110,

    /** 111 - Gói data cố định */
    FIXED_DATA_PLAN = 111,

    /** 210 - SIM dùng một lần */
    SINGLE_TIME_CARD = 210,

    /** 211 - SIM dùng nhiều lần */
    MULTI_TIME_CARD = 211,

    /** 212 - SIM vật lý */
    HARD_CARD = 212,

    /** 220 - Bán thiết bị MIFI */
    MIFI_SALES = 220,

    /** 221 - Cho thuê thiết bị MIFI */
    MIFI_LEASING = 221,

    /** 230 - eSIM */
    ESIM = 230,

    /** 250 - eSIM Air */
    ESIM_AIR = 250,

    /** 311 - SIM vật lý + gói data */
    HARD_CARD_WITH_FLOW = 311,

    /** 3101 - SIM dùng một lần + gói data tự chọn */
    SINGLE_TIME_CARD_SELF_SELECTED_PLAN = 3101,

    /** 3102 - SIM dùng một lần + gói data cố định */
    SINGLE_TIME_CARD_FIXED_PLAN = 3102,

    /** 3103 - SIM dùng nhiều lần + gói data tự chọn */
    MULTI_TIME_CARD_SELF_SELECTED_PLAN = 3103,

    /** 3104 - SIM dùng nhiều lần + gói data cố định */
    MULTI_TIME_CARD_FIXED_PLAN = 3104,

    /** 3105 - eSIM + gói data tự chọn */
    ESIM_SELF_SELECTED_PLAN = 3105,

    /** 3106 - eSIM + gói data cố định */
    ESIM_FIXED_PLAN = 3106,

    /** 3201 - Bán MIFI + gói data tự chọn */
    MIFI_SALES_SELF_SELECTED_PLAN = 3201,

    /** 3202 - Bán MIFI + gói data cố định */
    MIFI_SALES_FIXED_PLAN = 3202,

    /** 3211 - Thuê MIFI + gói data tự chọn */
    MIFI_LEASING_SELF_SELECTED_PLAN = 3211,

    /** 3212 - Thuê MIFI + gói data cố định */
    MIFI_LEASING_FIXED_PLAN = 3212,
}