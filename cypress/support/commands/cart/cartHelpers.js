import { CART_SELECTORS } from '../../selectors/selectors'

Cypress.Commands.add('dataArticleFromCart', () => {
  const ARTICLE = '[data-testid="checkout-cart-section"] article'

  return cy.get(ARTICLE).then((elements) => {
    const randomIndex = elements.eq(Math.floor(Math.random() * elements.length))

    const productCodeDiv = randomIndex.find(
      '[data-testid="product-card-product-code-div"] span'
    )

    const textNodes = productCodeDiv
      .contents()
      .filter((index, el) => el.nodeType === 3)

    let productCode = ''
    if (textNodes.length >= 3) {
      productCode = textNodes[2].nodeValue.trim()
    }

    return {
      productCode,
      href: randomIndex.find('a').attr('href'), // article href
      name: randomIndex.find('h2').text(), // article name
      size: randomIndex
        .find(CART_SELECTORS.SIZES_DROPDOWN)
        .find('option:checked')
        .text(),
      quantity: randomIndex
        .find(CART_SELECTORS.QUANTITY_DROPDOWN)
        .find('option:checked')
        .text(),
    }
  })
})

Cypress.Commands.add('logSelectedShipment', () => {
  const SHIPMENT_OPTIONS = '[data-testid^="checkout-select-option-"]'

  let selectedShipmentText

  cy.get(CART_SELECTORS.SHIPMENT_SECTION)
    .find(SHIPMENT_OPTIONS)
    .each(($el) => {
      const isChecked = $el.attr('aria-checked')
      if (isChecked === 'true') {
        cy.print({
          title: 'LOG',
          message: `Shipment option with aria-checked="true" found: ${$el.attr(
            'data-testid'
          )}`,
          type: 'warning',
        })

        // Find the h1 inside the found element and log its text
        cy.wrap($el)
          .find('h1')
          .then(($h1) => {
            selectedShipmentText = $h1.text()

            cy.print({
              title: 'LOG',
              message: `Selected shipment was: ${selectedShipmentText}`,
              type: 'warning',
            })
          })
      }
    })
    .then(() => {
      return selectedShipmentText
    })
})

Cypress.Commands.add('logSelectedPayment', () => {
  const PAYMENT_OPTIONS = '[data-testid^="checkout-select-option-"]'

  let selectedPaymentText

  cy.get(CART_SELECTORS.PAYMENT_SECTION)
    .find(PAYMENT_OPTIONS)
    .each(($el) => {
      const isChecked = $el.attr('aria-checked')
      if (isChecked === 'true') {
        cy.print({
          title: 'LOG',
          message: `Payment option with aria-checked="true" found: ${$el.attr(
            'data-testid'
          )}`,
          type: 'warning',
        })

        cy.wrap($el)
          .find('h1')
          .then(($h1) => {
            selectedPaymentText = $h1.text()

            cy.print({
              title: 'LOG',
              message: `Selected payment was: ${selectedPaymentText}`,
              type: 'warning',
            })
          })
      }
    })
    .then(() => {
      return selectedPaymentText
    })
})
