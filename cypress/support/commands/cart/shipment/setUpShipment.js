Cypress.Commands.add('chooseShipment', (shipmentOptionObj) => {
    const getShipmentOptionSelectorById = (id) =>
        `[data-testid="checkout-select-option-${id}"]`
    const shipmentOptionsEnv = Cypress.env('cart').shipmentOption
    const shipmentOptionId = shipmentOptionsEnv[shipmentOptionObj.value]

    if (!shipmentOptionId) {
        throw new Error(
            `Shipment option with value "${shipmentOptionObj.value}" does not exist.`
        )
    }

    const selectorById = getShipmentOptionSelectorById(shipmentOptionId)
    cy.get(selectorById).click()

    if (shipmentOptionObj.handler) {
        shipmentOptionObj.handler()
    }

    cy.wait('@shipmentUpdate')
})
