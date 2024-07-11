Cypress.Commands.add('choosePayment', (paymentOptionObj) => {
  const paymentOptions = Cypress.env('cart').paymentOption
  if (!paymentOptions) {
    throw new Error(`Payment options are not defined in the environment.`)
  }

  const paymentOptionId = paymentOptions[paymentOptionObj.value]
  if (!paymentOptionId) {
    throw new Error(
      `Payment option with key "${paymentOptionObj.value}" does not exist.`
    )
  }

  const selectorById = `[data-testid="checkout-select-option-${paymentOptionId}"]`
  cy.get(selectorById).click()

  if (paymentOptionObj.handler) {
    paymentOptionObj.handler()
  }

  cy.wait('@paymentUpdate').its('response.statusCode').should('eq', 200)
})
