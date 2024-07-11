import randomElement from '../../../../../utilities/randomElement'

function handleBankTransfer() {
  const PAYU_DIALOG = 'checkout-select-price-dialog2'
  const PAYU_OPTION = '[data-testid^="checkout-select-option-"]'

  cy.getByTestId(PAYU_DIALOG)
    .should('be.visible')
    .find(PAYU_OPTION)
    .then((options) => {
      randomElement(options)
    })
}

export default handleBankTransfer
