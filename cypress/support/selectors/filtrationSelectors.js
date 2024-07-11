export const FILTRATION_SELECTORS = {
  SORT_OPTIONS: 'catalog-desktop-sort-button',
  SORT_BY_HIGHEST_PRICE: 'catalog-desktop-highest-price-listbox',
  SORT_BY_LOWEST_PRICE: 'catalog-desktop-lowest-price-listbox',
  FILTER_PRICE: 'filter-list-desktop-list-price-div',
  MIN_PRICE_IN_FILTER: 'input[name="priceMin"]',
  MAX_PRICE_IN_FILTER: 'input[name="priceMax"]',
  LOADED_PRODUCT_IN_CATALOG:
    '[data-testid="product-list-product-card-vertical-article"] [class^="product-card_price-wrapper"] strong span',
  TOTAL_SEARCH_ITEM: 'search-header-total-items-div',
  FILTERS_SECTION: '[data-testid^="filter-list-desktop-list"]',
  SHOW_HIDE_FILTERS_BUTTON:
    '[data-testid="filter-list-desktop-filter-inner-show-hide-items-button"]',
  DISCOUNT_FILTER: 'filter-list-desktop-list-sale-div',
  DISCOUNT_FILTER_II: '[data-testid="filter-list-desktop-list-sale-div"]',
  PRICE_FILTER: 'filter-list-desktop-list-price-div',
  PRICE_FILTER_II: '[data-testid="filter-list-desktop-list-price-div"]',
  COLOUR_FILTER: 'filter-list-desktop-list-color-div',
  COLOUR_FILTER_II: '[data-testid="filter-list-desktop-list-color-div"]',
  SIZE_FILTER: 'filter-list-desktop-list-size-div',
  SIZE_FILTER_II: '[data-testid="filter-list-desktop-list-size-div"]',
  ACTION_FILTER: 'filter-list-desktop-list-discount-div',
  ACTION_FILTER_II: '[data-testid="filter-list-desktop-list-discount-div"]',
  PARAMETER_FILTER: 'filter-list-desktop-list-parameter-div',
  PARAMETER_FILTER_II: '[data-testid="filter-list-desktop-list-parameter-div"]',
  ACTIVE_FILTERS_SECTION:
    '[data-testid="filter-list-desktop-active-filters-area-div"]',
  REMOVE_ALL_FILTERS_BUTTON: 'filter-list-desktop-delete-all-button',
  PARAMETERS_FILTER_NAME:
    '[data-testid="filter-list-desktop-display-div"] span',
  OPEN_ALL_COLOUR_FILTER:
    '[data-testid="filter-list-desktop-list-color-div"] [data-testid="filter-list-desktop-filter-inner-show-hide-items-button"]',
  OPEN_ALL_SIZE_FILTER:
    '[data-testid="filter-list-desktop-list-size-div"] [data-testid="filter-list-desktop-filter-inner-show-hide-items-button"]',
  OPEN_ALL_PARAMETER_FILTER:
    '[data-testid="filter-list-desktop-list-parameter-div"] [data-testid="filter-list-desktop-filter-inner-show-hide-items-button"]',
  OPEN_ALL_ACTION_FILTER:
    '[data-testid="filter-list-desktop-list-discount-div"] [data-testid="filter-list-desktop-filter-inner-show-hide-items-button"]',
  COLOUR_CHECK:
    '[data-testid="filter-list-desktop-list-color-div"] input[type="checkbox"]',
  SIZE_CHECK:
    '[data-testid="filter-list-desktop-list-size-div"] input[type="checkbox"]',

  PARAMETER_CLICK:
    '[data-testid="filter-list-desktop-list-parameter-div"] label:has(input[type="checkbox"])',
  PARAMETER_CHECK:
    '[data-testid="filter-list-desktop-list-parameter-div"] input[type="checkbox"]',
  ACTION_CHECK:
    '[data-testid="filter-list-desktop-list-discount-div"] input[type="checkbox"]',
  PRICE_MIN_RANGE_FILTER_PRICE:
    '[data-testid="filter-list-desktop-list-price-div"] input[name="priceMin"]',
  PRICE_MAX_RANGE_FILTER_PRICE:
    '[data-testid="filter-list-desktop-list-price-div"] input[name="priceMax"]',
  PRICE_RANGE_BAR_SLIDER:
    '[data-testid="filter-list-desktop-list-price-div"] [role="slider"]',
  DISCOUNT_RANGE_BAR_SLIDER:
    '[data-testid="filter-list-desktop-list-sale-div"] [role="slider"]',
  PRICE_MIN_RANGE_FILTER_DISCOUNT:
    '[data-testid="filter-list-desktop-list-sale-div"] input[name="priceMin"]',
  PRICE_MAX_RANGE_FILTER_DISCOUNT:
    '[data-testid="filter-list-desktop-list-sale-div"] input[name="priceMax"]',
}
