export function userAccountIntercepts() {
  const PATH_ACCOUNT_MY_ORDER = Cypress.env('url').myOrder
  cy.intercept({
    method: 'HEAD',
    path: PATH_ACCOUNT_MY_ORDER,
  }).as('waitMyOrder')

  const PATH_ACCOUNT_MY_ORDER_DETAIL_ORDER = '/web-api/v1/*/profile/orders/*'
  cy.intercept({
    method: 'GET',
    path: PATH_ACCOUNT_MY_ORDER_DETAIL_ORDER,
  }).as('waitOrderDetail')

  const PATH_CLUB_VOUCHERS = '/web-api/v1/*/profile/club-vouchers*'
  cy.intercept({
    method: 'GET',
    path: PATH_CLUB_VOUCHERS,
  }).as('waitVoucherClubPage')

  const PATH_CLAIM_CLUB_VOUCHER = '/web-api/v1/*/profile/club-vouchers/claim*'
  cy.intercept({
    method: 'POST',
    path: PATH_CLAIM_CLUB_VOUCHER,
  }).as('claimVoucher')

  const PATH_VOUCHER_DETAIL = '/web-api/v1/*/profile/club-vouchers/*/*'
  cy.intercept({
    method: 'GET',
    path: PATH_VOUCHER_DETAIL,
  }).as('waitVoucherDetailPage')
}
