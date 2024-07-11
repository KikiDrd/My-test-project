import { SELECTORS } from '../../selectors/selectors'

Cypress.Commands.add('verifyWishlistIsEmpty', () => {
  cy.get(SELECTORS.WISHLIST_COUNTER).should('not.exist')
})

Cypress.Commands.add('clearWishlist', () => {
  cy.getByTestId(SELECTORS.REMOVE_BUTTON_WISHLIST).each(($el) => {
    cy.wrap($el).click()
  })
  cy.wait('@removeFromWishlist').its('response.statusCode').should('eq', 200)
  cy.verifyWishlistIsEmpty(SELECTORS.WISHLIST_COUNTER)
})

Cypress.Commands.add('setUpWishlistEmpty', () => {
  cy.get('body').then((body) => {
    let wishlistCounter = body.find(SELECTORS.WISHLIST_COUNTER)
    if (wishlistCounter.length > 0) {
      cy.visit('/wishlist')
      cy.clearWishlist()
      cy.verifyWishlistIsEmpty(SELECTORS.WISHLIST_COUNTER)
    } else {
      cy.print({
        title: 'LOG',
        message: `Wishlist counter does not exist. Skipping wishlist cleanup.`,
        type: 'warning',
      })
      return
    }
  })
})
