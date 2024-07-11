export const SELECTORS = {
  HEADER_TOP_BAR_HREF: '[data-testid="top-bar-header-div"] a',
  BELOW_HEADER_BANNER: '[data-testid="header-below-header-banner-div"]',
  BELOW_HEADER_BANNER_HREF: '[data-testid="header-below-header-banner-div"] a',
  ARTICLE_CATALOG:
    'article[data-testid="product-list-product-card-vertical-article"]',
  CATALOG_LIST: '[data-testid="product-list-section"]',
  MENU_MAIN_HEADER_HREF: '[data-testid="header-desktop-nav"] a',
  MAIN_MENU_SUBCATEGORY_LINK_HREF:
    '[data-testid="navigation-desktop-nav-bar-ul"] a',
  LINK_LOGIN_HEADER: 'top-bar-sign-in-link',
  LINK_REGISTRATION_HEADER: 'top-bar-sign-up-link',
  LINK_FAQ_HEADER: 'top-bar-faq-page-link',
  LINK_FORGOTTEN_PASSWORD_SIGN_IN: 'sign-in-forgotten-password-link',
  INPUT_SEARCH: '#pageHeader input[type="search"]',
  INPUT_EMAIL: 'input[name="email"]',
  INPUT_EMAIL_FORGOTTEN_PASSWORD:
    'form[name="forgottenPasswordForm"] input[name="email"]',
  INPUT_PASSWORD: 'input[name="password"]',
  INPUT_FIRSTNAME: 'input[name="firstname"]',
  INPUT_LASTNAME: 'input[name="lastname"]',
  INPUT_DAY: 'input[name="day"]',
  INPUT_MONTH: 'input[name="month"]',
  INPUT_YEAR: 'input[name="year"]',
  GDPR_CHECKBOX: 'input[name="gdpr"]',
  SEARCH_ICON_MAGNIFIER: 'search-link',
  WHISPER_BOX: 'autocomplete-desktop-div',
  SEARCH_NO_RESULT: 'svg.injected-svg[data-src="/images/icons/no-result.svg"]',
  PRODUCT_LIST_SECTION: '[data-testid="product-list-section"]',
  CATALOG_WITH_PRODUCT: 'product-list-product-card-vertical-article',
  PRODUCT_FROM_CATALOG: 'product-list-product-card-vertical-article',
  BUTTON_SUBMIT_REGISTRATION: 'form[name="signUpForm"] button[type="submit"]',
  BUTTON_SUBMIT_REGISTRATION_DONE:
    'form[name="signUpStep2Form"] button[type="submit"]',
  BUTTON_SUBMIT_LOGIN: 'form[name="signInForm"] button[type="submit"]',
  BUTTON_SUBMIT_CONTACT: 'form[id="form-contacts"] button[type="submit"]',
  BUTTON_SUBMIT_CHANGE_PASSWORD:
    'form[name="changePassword"] button[type="submit"]',
  BUTTON_SUBMIT_FORGOTTEN_PASSWORD:
    'form[name="forgottenPasswordForm"] button[type="submit"]',
  FORM_SUBMIT: 'button[type="submit"]',
  DIALOG_POPUP: '[id^=headlessui-dialog-panel]',
  DIALOG_CLOSE_BUTTON: 'dialog-close-button',
  EMAIL: Cypress.env('login'),
  SIZE_CHART_LINK:
    '[data-testid="product-detail-sizes-title-dialog-open-span"]',
  SIZES_WRAPPER:
    '[data-testid="product-detail-sizes-wrapper-select-sizes-div"]',
  PRODUCT_SIZE:
    '[data-testid="product-detail-sizes-wrapper-select-sizes-div"] input[name="productSize"]',
  SELECT_SIZE_ALERT: ' .text-danger-500.text-sm.pt-4',
  WISHLIST_COUNTER: '#wishList-counter',
  REMOVE_BUTTON_WISHLIST: 'product-image-area-remove-from-wish-list-icon',
  PRODUCT_SIMILAR_PRODUCTS:
    '.border-t.pt-12 [data-testid="banners-simple-products-section"] swiper-container article',
  PRODUCT_COMPLETE_OUTFIT:
    'article [data-testid="banners-simple-products-section"] swiper-container article',
}

export const ACCOUNT_SELECTORS = {
  LINK_MY_ACCOUNT: 'top-bar-my-account-link',
  USER_MENU_CHANGE_PASSWORD: 'user-profile-change-password-link',
  OLD_PASSWORD: 'input[name="oldPassword"]',
  NEW_PASSWORD: 'input[name="newPassword"]',
  NEW_REPEAT_PASSWORD: 'input[name="newPasswordRepeat"]',
  LOG_OUT: 'user-profile-sign-out-button',
}

export const CART_SELECTORS = {
  CART_COUNTER: '#cart-counter',
  REMOVE_PRODUCT_FROM_CART:
    '[data-testid="product-card-product-remove-button"]',
  CART_ICON_HEADER: 'header-cart-counter-link',
  CART_SUBMIT_BUTTON:
    '.hidden > .flex > [data-testid="add-to-cart-submit-button"]',
  FLY_CART: '.p-8',
  FLY_CART_CLOSE_BUTTON: 'fly-cart-close-button',
  PRODUCT_IN_FLY_CART: 'product-card-go-to-product-link',
  REMOVE_PRODUCT_FROM_CART_BUTTON: 'product-card-product-remove-button',
  FLY_CART_GO_TO_CART_BUTTON: 'fly-cart-go-to-cart-button',
  BUTTON_TO_CART_CONTACT_PAGE:
    '[data-testid="checkout-summary-bar-order-button"]',
  BUTTON_TO_CART_SHIPMENT_PAGE:
    '[data-testid="checkout-shippay-go-to-shipping-button"]',
  BUTTON_TO_PAYMENT_PAGE:
    '[data-testid="checkout-shippay-go-to-payment-button"]',
  BUTTON_CREATE_ORDER: '[data-testid="checkout-shippay-order-now-button"]',
  CHECKOUT_CART_SECTION: 'checkout-cart-section',
  GO_TO_PRODUCT_LINK: 'product-card-go-to-product-link',
  SIZES_DROPDOWN: '[data-testid="product-card-choose-sizes-dropdown"] select',
  QUANTITY_DROPDOWN:
    '[data-testid="product-card-choose-quantity-dropdown"] select',
  EDIT_ITEMS_BUTTON: '[data-testid="checkout-summary-bar-edit-items-link"]',
  BUTTON_DELIVERY_PAYMENT_CHANGE:
    '[data-testid="layout-main-checkout-change-link"]',
  ARTICLE_IN_CART_SECTION:
    '[data-testid="checkout-summary-bar-cart-list-wrapper-section"]',
  ARTICLE_IN_CART: '[data-testid="checkout-cart-section"] article',
  CONTACT_FORM_CART: '#form-contacts[name="checkoutContactsForm"]',
  JUDET_DROPDOWN:
    '[data-testid="checkout-contacts-select-district-dropdown"] select',
  AGREE_WITH_TERMS: 'input[type="checkbox"][name="agreeWithTerms"]',
  GDPR_CHECKBOX: '[data-testid="checkout-contacts-agree-with-terms-checkbox"]',
  BUTTON_CONTACT_CHANGE: '[data-testid="checkout-change-contacts-link"]',
  CONTACT_INFORMATION: '.px-8.py-6',
  SHIPMENT_SECTION: 'form[name="checkoutListOfCarriersForm"]',
  PAYMENT_SECTION: 'form[name="checkoutListOfCarriersForm"]',
  GO_BACK_BUTTON: '[data-testid="checkout-go-back-button"] .w-2.h-3.mr-2',
  CART_LOGIN_BUTTON: 'checkout-login-promo-sign-in-button',
  CART_REGISTRATION_BUTTON: 'checkout-login-promo-registration-button',
}

export const CLUB_SELECTORS = {
  CLUB_CARD: '[data-testid="account-my-account-div"]',
  ACTIVE_POINTS:
    '[data-testid="vouchers-club-my-account-club-points-balance-active-button"]',
  ACTIVE_POINT_BALANCE:
    '[data-testid="vouchers-club-my-account-club-points-balance-active-div"]',
  INACTIVE_POINTS:
    '[data-testid="vouchers-club-my-account-club-points-balance-inactive-button"]',
  INACTIVE_POINT_BALANCE:
    '[data-testid="vouchers-club-my-account-club-points-balance-inactive-div"]',
  POINTS_METER:
    '[data-testid="vouchers-club-my-account-club-points-meter-div"]',
  CLUB_VOUCHERS_BUTTON:
    '[data-testid="vouchers-club-my-account-vouchers-club-button"]',
  EXISTING_VOUCHERS: '[data-testid="account-vouchers-section"]',
  VOUCHER_DETAIL: '[data-testid="account-vouchers-club-voucher-row"]',
  HOW_TO_USE_VOUCHERS_BUTTON: '.text-sm.underline',
  HOW_TO_USE_VOUCHERS_MODAL: '[data-testid="dialog-opened-main-image-div"]',
  VOUCHERS_OVERVIEW_BUTTON:
    'a.block.m-auto.w-full.pt-\\[11px\\].pb-3.text-center.bg-black.text-white',
  VOUCHER_VALUE: '[data-testid="account-vouchers-div"]',
  GENERATE_VOUCHER:
    '[data-testid="account-vouchers-club-points-section"] button',
  GENERATED_VOUCHER:
    '[data-testid="account-vouchers-section"] [data-testid="account-vouchers-club-voucher-row"]',
  VOUCHER_GENERATION_DATE: 'time.text-base.font-bold.pb-2',
  GENERATED_VOUCHER_VALUE:
    '[data-testid="account-vouchers-club-voucher-row-price-td"]',
  GENERATED_VOUCHER_VALIDITY:
    '[data-testid="account-vouchers-club-voucher-row-validity-td"]',
  VOUCHER_LINK_FROM_USER_ACCOUNT: 'user-profile-vouchers-link',
  VOUCHER_NUMBER:
    '[data-testid="account-vouchers-club-voucher-row-number-div"]',
  VOUCHER_GO_TO_DETAIL_VOUCHER: 'account-vouchers-club-voucher-row-detail-link',
  VOUCHER_DETAIL_H1_NUMBER: '[data-testid="main-profile-div"] h1',
  VOUCHER_DETAIL_VALIDITY: 'account-vouchers-detail-validity-p',
  VOUCHER_DETAIL_ESHOP_CODE: 'account-vouchers-detail-code-div',
  VOUCHER_DETAIL_BUTTON_COPY_CODE:
    '[data-testid="account-vouchers-detail-detail-div"] button',
  VOUCHER_DETAIL_DOWNLOAD_VOUCHER:
    '[data-testid="account-vouchers-detail-download-link"]',
  GO_FROM_VOUCHER_DETAIL_BACK: 'account-vouchers-detail-back-link',
}
