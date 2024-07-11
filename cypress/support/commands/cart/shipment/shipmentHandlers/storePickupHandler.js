import randomElement from '../../../../../utilities/randomElement'

function handleStorePickupShipment() {
  const PICKUP_DIALOG =
    '[data-testid="checkout-select-personal-pickup-dialog2"]'
  const PICKUP_OPTION_LIST = '.headlessui-radiogroup-:r2c:'
  const PICKUP_OPTION = '[data-testid^="checkout-select-option-"]'

  cy.get(PICKUP_DIALOG).should('be.visible')

  cy.get(PICKUP_OPTION_LIST)
    .should('be.visible')
    .and('have.attr', 'role', 'radiogroup')
    .find(PICKUP_OPTION)
    .then((options) => {
      randomElement(options)
    })
}

export default handleStorePickupShipment
