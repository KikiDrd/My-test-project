import deliveryConfig from '../../../support/commands/cart/deliveryOptionConfig'

const envName = Cypress.env('configEnv')
const envCombinations = deliveryConfig[envName]?.validCombinations
const CHECKOUT_BUTTON = 'checkout-shippay-order-now-button'

describe('Create Pickup Place Orders - partner delivery', () => {
  if (envCombinations) {
    envCombinations.forEach((combination, index) => {
      it(`Test ${index + 1}: should create an order with ${
        combination.shipment.value
      } shipment and ${combination.payments.value} payment`, () => {
        cy.goCartAndFillContactForm()

        cy.goToCartDelivery()
        cy.chooseShipment(combination.shipment)

        cy.goToCartPayment()
        cy.choosePayment(combination.payments)
        cy.getByTestId(CHECKOUT_BUTTON).click()
      })
    })
  }
})
