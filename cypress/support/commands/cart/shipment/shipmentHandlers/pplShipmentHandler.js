import { SHIPMENT_SELECTORS } from '../../../../selectors/shipmentSelectors'
import randomElement from '../../../../../utilities/randomElement'

function handlePPLShipment() {
  const PPL_SEARCH_CONTAINER_TEXT_VALUE = 'Praha'

  cy.get(SHIPMENT_SELECTORS.PPL.SEARCH_CONTAINER)
    .click()
    .type(PPL_SEARCH_CONTAINER_TEXT_VALUE)

  randomElement(SHIPMENT_SELECTORS.PPL.DROPDOWN_MAP_RESULT)

  randomElement(SHIPMENT_SELECTORS.PPL.PICKUP_LINK)

  cy.get(SHIPMENT_SELECTORS.PPL.PICKUP_SUBMIT).click()
}

export default handlePPLShipment
