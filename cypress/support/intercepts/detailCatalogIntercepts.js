export function detailCatalogIntercepts() {
  cy.intercept({
    method: 'GET',
    path: '/api/filter-list?category*',
  }).as('waitForCategory')

  const PD_PAGE = '/_next/data/**'
  cy.intercept({
    method: 'GET',
    path: PD_PAGE,
  }).as('waitForPD')

  cy.intercept({
    method: 'GET',
    path: '/api/filter-list?category*sort=lowestPrice*',
  }).as('lowestPrice')

  cy.intercept({
    method: 'GET',
    path: '/api/filter-list?category*sort=highestPrice*',
  }).as('highestPrice')

  cy.intercept({
    method: 'POST',
    path: 'https://api.luigisbox.com/',
  }).as('luigisBoxData')

  const SEARCH_ARTICLE = '/_next/data/*/*/*.json?q=*'
  cy.intercept({
    method: 'HEAD',
    path: SEARCH_ARTICLE,
  }).as('waitAfterSearch')

  cy.intercept({
    method: 'GET',
    path: '**.json',
  }).as('productDetail')

  cy.intercept({
    method: 'POST',
    path: `/web-api/v1/*/cart/product-size/*`,
  }).as('addProductToCart')

  cy.intercept({
    method: 'GET',
    path: `/api/filter-list?*`,
  }).as('filteredData')
}
