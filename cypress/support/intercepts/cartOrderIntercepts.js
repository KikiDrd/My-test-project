export function cartOrderIntercepts() {
  const URL_PAYMENT_UPDATE = '/web-api/v1/*/cart/payment'
  cy.intercept({
    method: 'GET',
    url: URL_PAYMENT_UPDATE,
  }).as('paymentUpdate')

  const URL_SHIPMENT_UPDATE = '/web-api/v1/**/cart/shipping'
  cy.intercept({
    method: 'GET',
    url: URL_SHIPMENT_UPDATE,
  }).as('shipmentUpdate')

  const URL_CART_CONTENT = '**/*'
  cy.intercept({
    method: 'HEAD',
    path: URL_CART_CONTENT,
  }).as('cartContent')

  const URL_CART_API_CONTACT = '/web-api/v1/*/cart/contact'
  cy.intercept({
    method: 'GET',
    path: URL_CART_API_CONTACT,
  }).as('cartContact')

  const URL_CART_API_SHIPMENT_UPDATE = '/web-api/v1/*/cart/shipping'
  cy.intercept({
    method: 'GET',
    path: URL_CART_API_SHIPMENT_UPDATE,
  }).as('cartDelivery')

  const URL_CART_API_PAYMENT_UPDATE = '/web-api/v1/*/cart/payment'
  cy.intercept({
    method: 'GET',
    path: URL_CART_API_PAYMENT_UPDATE,
  }).as('cartPayment')

  const URL_SALE_CODE_APPLY = '/web-api/v1/*/cart/voucher'
  cy.intercept({
    method: 'POST',
    url: URL_SALE_CODE_APPLY,
  }).as('applyVoucher')

  const URL_DELETE_PRODUCT_FROM_CART = '**/web-api/v1/*/cart/**'
  cy.intercept({
    method: 'DELETE',
    path: URL_DELETE_PRODUCT_FROM_CART,
  }).as('waitAfterDeleteProduct')

  const URL_CART_CONTENT_ORDER = '/web-api/v1/*/cart'
  cy.intercept({
    method: 'POST',
    path: URL_CART_CONTENT_ORDER,
  }).as('waitAfterSendOrder')

  const URL_SUMMARY_PAGE = '/web-api/v1/*/cart/summary'
  cy.intercept({
    method: 'GET',
    path: URL_SUMMARY_PAGE,
  }).as('waitSummaryPage')

  const URL_CHANGE_SIZE_OR_QUANTITY = '/web-api/v1/*/cart/product-size/*'
  cy.intercept({
    method: 'PATCH',
    url: URL_CHANGE_SIZE_OR_QUANTITY,
  }).as('changeSizeQuantityProduct')
}
