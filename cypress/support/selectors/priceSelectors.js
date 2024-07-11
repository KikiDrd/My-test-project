export const PRICE_SELECTORS = {
  //specified for PD
  RECOMMENDED_SELLING_PRICE_PD:
    '[data-testid="product-detail-price-div"] [data-testid="price-recommended-selling-price-span"]',
  RECOMMENDED_PRICE_PD:
    '[data-testid="product-detail-price-div"] [data-testid="price-recommended-price-span"]', // recommended with discount
  COUPON_PRICE_WITHOUT_CODE_PD:
    '[data-testid="product-detail-price-div"] [data-testid="product-detail-coupon-price-without-code-span"]',
  COUPON_PRICE_WITHOUT_CODE_RECOMMENDED_PD:
    '[data-testid="product-detail-price-div"] [data-testid="coupon-price-without-code-span"]',
  SELLING_PRICE_WITH_COUPON_PD:
    '[data-testid="product-detail-price-div"] [data-testid="price-selling-price-with-coupon-span"]', // discount with coupon from discounted selling price
  COUPON_PRICE_PD:
    '[data-testid="product-detail-price-div"] [data-testid="coupon-price-span"]', // discount with coupon from recommended selling price
  DISCOUNTED_SELLING_PRICE_PD:
    '[data-testid="product-detail-price-div"] [data-testid="price-discounted-selling-price-span"]',
  POPUP_CODE_INFO_PD:
    '[data-testid="product-detail-price-div"] [data-testid="product-detail-coupon-price-popover-info-code-div"]',
  POPUP_CODE_INFO_TEXT_PD:
    '[data-testid="product-detail-price-div"] [data-testid="product-detail-coupon-price-text-div"]',

  //specified for catalog
  RECOMMENDED_SELLING_PRICE_CATALOG:
    '[data-testid="product-list-product-card-vertical-article"]:first-child [data-testid="price-recommended-selling-price-span"]',
  SELLING_PRICE_WITH_COUPON_CATALOG:
    '[data-testid="product-list-product-card-vertical-article"]:first-child [data-testid="price-selling-price-with-coupon-span"]', // discount with coupon from discounted selling price
  COUPON_PRICE_CATALOG:
    '[data-testid="product-list-product-card-vertical-article"]:first-child [data-testid="coupon-price-span"]', // discount with coupon from recommended selling price
  RECOMMENDED_COUPON_PRICE_CATALOG:
    '[data-testid="product-list-product-card-vertical-article"]:first-child [data-testid="recommended-coupon-price-span"]', // recommended without discount
  PRICE_RECOMMENDED_PRICE_CATALOG:
    '[data-testid="product-list-product-card-vertical-article"]:first-child [data-testid="price-recommended-price-span"]', // recommended with discount
  DISCOUNTED_SELLING_PRICE_CATALOG:
    '[data-testid="product-list-product-card-vertical-article"]:first-child [data-testid="price-discounted-selling-price-span"]',
  RECOMMENDED_PRICE_CATALOG:
    '[data-testid="product-list-product-card-vertical-article"]:first-child [data-testid="price-recommended-price-span"]',
  POPUP_CODE_INFO_CATALOG:
    '[data-testid="product-list-product-card-vertical-article"]:first-child [data-testid="product-detail-coupon-price-popover-info-code-div"]',
  POPUP_CODE_INFO_TEXT_CATALOG:
    '[data-testid="product-list-product-card-vertical-article"]:first-child [data-testid="product-detail-coupon-price-text-div"]',

  //specified for flyCart
  RECOMMENDED_SELLING_PRICE_FLY_CART:
    '[data-testid="product-card-tiny-selling-price-span"]',
  RECOMMENDED_PRICE_FLY_CART:
    '[data-testid="product-card-tiny-recommended-price-span"]',
  DISCOUNTED_SELLING_PRICE_FLY_CART:
    '[data-testid="product-card-tiny-discounted-selling-price-span"]',
  DISCOUNT_SUM_PRICE_FLY_CART:
    '[data-testid="product-card-tiny-discount-sum-span"]',
  TOTAL_PRICE_FLY_CART: '[data-testid="fly-cart-total-price-span"]',

  //specified for cart
  DISCOUNTED_SELLING_PRICE_CART:
    '[data-testid="product-card-tiny-discounted-selling-price-span"]',
  RECOMMENDED_SELLING_PRICE_CART:
    '[data-testid="product-card-tiny-recommended-price-span"]',
  SELLING_PRICE_CART: '[data-testid="product-card-tiny-selling-price-span"]',
  DISCOUNT_SUM_PRICE_CART:
    '[data-testid="product-card-tiny-discount-sum-span"]',
  DISCOUNT_PRICE_VOUCHER_CART:
    '[data-testid="product-card-tiny-voucher-discount-label-span"]',

  LABEL_AFTER_APPLY_CODE_CART:
    '[data-testid="product-card-tiny-voucher-discount-label-div"]',
  DISCOUNT_BADGE_CART: '[data-testid="product-card-tiny-discount-div"]',
  DELIVERY_PRICE: '[data-testid="shippay-option-item-price-span"]',
  DELIVERY_PRICE_FREE: '[data-testid="shippay-option-for-free-div"]',
  PAYMENT_PRICE: '[data-testid="shippay-option-item-price-span"]',
  PAYMENT_PRICE_FREE: '[data-testid="shippay-option-for-free-div"]',
  PAYMENT_PRICE_SUMMARY_II:
    '[data-testid="summary-bar-total-payment-price-span"]',
  PAYMENT_FREE_PRICE_SUMMARY_II:
    '[data-testid="summary-bar-total-free-payment-price-span"]',
  SHIPPING_PRICE_SUMMARY_II:
    '[data-testid="summary-bar-total-shipping-price-span"]',
  SHIPPING_FREE_PRICE_SUMMARY_II:
    '[data-testid="summary-bar-total-free-shipping-price-span"]',

  //specific for summary
  CHECKOUT_CART_SUMMARY: '[data-testid="checkout-summary-total-div"]',
  TOTAL_RECOMMENDED_PRICE_SUMMARY:
    '[data-testid="checkout-summary-total-div"] [data-testid="summary-bar-total-recommended-price-span"]',
  DISCOUNT_TOTAL_PRICE_SUMMARY:
    '[data-testid="checkout-summary-total-div"] [data-testid="summary-bar-total-discount-sum-span"]',
  SHIPPING_PRICE_SUMMARY:
    '[data-testid="checkout-summary-total-div"] [data-testid="summary-bar-total-shipping-price-span"]',
  SHIPPING_FREE_PRICE_SUMMARY:
    '[data-testid="checkout-summary-total-div"] [data-testid="summary-bar-total-free-shipping-price-span"]',
  PAYMENT_PRICE_SUMMARY:
    '[data-testid="checkout-summary-total-div"] [data-testid="summary-bar-total-payment-price-span"]',
  PAYMENT_FREE_PRICE_SUMMARY:
    '[data-testid="checkout-summary-total-div"] [data-testid="summary-bar-total-free-payment-price-span"]',
  COUPON_PRICE_TOTAL_SUMMARY:
    '[data-testid="checkout-summary-total-div"] [data-testid="summary-bar-total-coupon-price-span"]',
  TOTAL_PRICE_SUMMARY:
    '[data-testid="checkout-summary-total-div"] [data-testid="summary-bar-total-price-span"]',
}
