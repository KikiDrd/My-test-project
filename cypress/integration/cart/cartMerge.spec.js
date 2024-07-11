import { CART_SELECTORS } from '../../support/selectors/selectors'

describe('Cart interaction', () => {

  it('Cart merge after sign in', () => {

    cy.logInFromHeader()
    cy.wait(1000)
    cy.setUpCartEmpty()
    cy.logout()
    cy.goToProductDetailFromCategory()
    cy.addProductToCart()
    cy.getProductName()
    cy.get(CART_SELECTORS.CART_COUNTER).should('have.text', '1')
    cy.logInFromHeader()
    cy.get(CART_SELECTORS.CART_COUNTER).should('have.text', '1')
    cy.goToProductDetailFromCategory()
    cy.addProductToCart()
    cy.getProductName()
    cy.get(CART_SELECTORS.CART_COUNTER).should('have.text', '2')
    cy.setUpCartEmpty()
    cy.logout()
  })
})
