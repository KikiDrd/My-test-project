export function wishlistIntercepts() {
  const PATH_API_WISHLIST_ITEM = '/web-api/v1/*/wishlist/item/*'
  cy.intercept({
    method: 'POST',
    path: PATH_API_WISHLIST_ITEM,
  }).as('addToWishlist')

  cy.intercept({
    method: 'DELETE',
    path: PATH_API_WISHLIST_ITEM,
  }).as('removeFromWishlist')

  const PATH_GO_WISHLIST = '/_next/data/*/*/wishlist.json'
  cy.intercept({
    method: 'HEAD',
    path: PATH_GO_WISHLIST,
  }).as('goToWishlist')
}
