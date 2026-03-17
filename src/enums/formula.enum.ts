export enum PriceAdjustType {
    RETAIL_PRICE = "RETAIL_PRICE",        // Giữ nguyên theo giá bán lẻ
    INCREASE_PERCENT = "INCREASE_PERCENT",// Cộng thêm theo %
    DECREASE_PERCENT = "DECREASE_PERCENT",// Giảm theo %
    INCREASE_FIXED = "INCREASE_FIXED",    // Cộng thêm số tiền cố định
    DECREASE_FIXED = "DECREASE_FIXED",    // Giảm số tiền cố định
}