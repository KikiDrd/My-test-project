import {SHIPMENT_SELECTORS} from '../../../../selectors/shipmentSelectors'

function handlePacketaShipment() {
    cy.get(SHIPMENT_SELECTORS.PACKETA.WIDGET, {timeout: 100000})
        .should('exist')
        .then(($iframe) => {
            // Wait for an element within the iframe
            const waitForIframeElement = (selector, retries = 10) => {
                return new Cypress.Promise((resolve, reject) => {
                    const content = $iframe.contents()
                    const element = content.find(selector)
                    if (element.length > 0) {
                        resolve(element)
                    } else if (retries > 0) {
                        setTimeout(() => {
                            waitForIframeElement(selector, retries - 1)
                                .then(resolve)
                                .catch(reject)
                        }, 500)
                    } else {
                        reject(new Error(`Element not found: ${selector}`))
                    }
                })
            }

            // Interact with elements within the iframe
            return waitForIframeElement(SHIPMENT_SELECTORS.PACKETA.COOKIES_CONSENT)
                .then((cookies) => cy.wrap(cookies).click({force: true}))
                .then(() =>
                    waitForIframeElement(
                        SHIPMENT_SELECTORS.PACKETA.BRANCH_SEARCH_CONTAINER
                    )
                )
                .then((search) => cy.wrap(search).click({force: true}))
                .then(() =>
                    waitForIframeElement(SHIPMENT_SELECTORS.PACKETA.BRANCH_LIST_ITEM)
                )
                .then((branch) => cy.wrap(branch).first().click({force: true}))
                .then(() =>
                    waitForIframeElement(SHIPMENT_SELECTORS.PACKETA.BRANCH_SELECT)
                )
                .then((button) => cy.wrap(button).click({force: true}))
        })
}

export default handlePacketaShipment
