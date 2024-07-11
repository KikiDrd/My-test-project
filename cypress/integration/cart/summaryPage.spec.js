import deliveryConfig from '../../support/commands/cart/deliveryOptionConfig'

const envName = Cypress.env('configEnv')
const envCombinations = deliveryConfig[envName]?.validCombinations
const CHECKOUT_BUTTON = 'checkout-shippay-order-now-button'

describe('Check summary page', () => {
  // create order for first combination from envCombination

  const SUMMARY_HEAD_SECTION = 'checkout-summary-order-processed-div'
  const ORDER_NUMBER = '[data-testid="checkout-summary-order-number-span"]'

  const ORDER_PRODUCT_SECTION = 'checkout-summary-ordered-items-div'
  const ORDER_PRODUCT_HREF =
    '[data-testid="checkout-summary-ordered-items-div"] a'
  const ARTICLE_IN_SUMMARY =
    '[data-testid="checkout-summary-ordered-items-div"] article'
  const PRODUCT_CODE =
    '[data-testid="checkout-summary-ordered-items-div"] [data-testid="product-card-summary-desktop-product-code-div"]'
  const PRODUCT_SIZE =
    '[data-testid="checkout-summary-ordered-items-div"] [data-testid="product-card-summary-desktop-size-div"]'
  const PRODUCT_QUANTITY =
    '[data-testid="checkout-summary-ordered-items-div"] [data-testid="product-card-summary-desktop-quantity-div"]'

  const SHIPMENT_PAYMENT_SECTION =
    '[data-testid="checkout-summary-shipping-payment-div"]'

  const SUMMARY_INVOICE_ADDRESS = 'checkout-summary-invoice-adress-div'
  const SUMMARY_SHIPPING_ADDRESS = 'checkout-summary-shipping-adress-div'

  const BUTTON_GO_TO_HOMEPAGE =
    '[data-testid="checkout-summary-homepage-button-div"] button'

  if (envCombinations && envCombinations.length > 0) {
    const combination = envCombinations[0]
    it(`should create an order with ${combination.shipment.value} shipment and ${combination.payments.value} payment`, () => {
      cy.setUpCart()

      cy.dataArticleFromCart().then((cartArticle) => {
        cy.print({
          title: 'LOG',
          message: `Product code is: ${cartArticle.productCode}`,
          type: 'warning',
        })
        cy.print({
          title: 'LOG',
          message: `Product name is: ${cartArticle.name}`,
          type: 'warning',
        })
        cy.print({
          title: 'LOG',
          message: `Product href is: ${cartArticle.href}`,
          type: 'warning',
        })
        cy.print({
          title: 'LOG',
          message: `Product size is: ${cartArticle.size}`,
          type: 'warning',
        })
        cy.print({
          title: 'LOG',
          message: `Product quantity is: ${cartArticle.quantity}`,
          type: 'warning',
        })

        cy.goContactAndFillForm()

        cy.goToCartDelivery()
        cy.chooseShipment(combination.shipment)

        cy.logSelectedShipment().then((selectedShipment) => {
          cy.goToCartPayment()
          cy.choosePayment(combination.payments)

          cy.logSelectedPayment().then((selectedPaymentText) => {
            cy.getAllAvailablePricesInSummary().then((summaryPricesCart) => {
              cy.getByTestId(CHECKOUT_BUTTON).click()

              // open payment gateway

              cy.wait('@waitAfterSendOrder')
                .its('response.statusCode')
                .should('eq', 200)

              // go to summary page

              cy.wait(8000)
              cy.visit(Cypress.env('url').cart.summary)

              cy.wait('@waitSummaryPage')
                .its('response.statusCode')
                .should('eq', 200)

              // compare product in cart with summary
              cy.get(ORDER_PRODUCT_HREF)
                .should('have.attr', 'href')
                .then((href) => {
                  expect(cartArticle.href).to.include(href)
                })

              cy.get(ARTICLE_IN_SUMMARY)
                .find('h1')
                .should('have.text', cartArticle.name)

              cy.get(PRODUCT_CODE)
                .find('span')
                .invoke('text')
                .then((text) => {
                  const parts = text.split(':')
                  const extractedCode = parts.length >= 3 ? parts[2].trim() : ''
                  expect(extractedCode).to.equal(cartArticle.productCode)
                })

              cy.get(PRODUCT_SIZE)
                .find('span')
                .should('contain.text', cartArticle.size)

              cy.get(PRODUCT_QUANTITY)
                .find('span')
                .should('contain.text', cartArticle.quantity)

              cy.print({
                title: 'LOG',
                message: `The product data on summary is equal to product in cart ${cartArticle.href}, ${cartArticle.name}, ${cartArticle.productCode}, size ${cartArticle.size}, quantity ${cartArticle.quantity}.`,
                type: 'warning',
              })

              // check sections of summary
              cy.getByTestId(SUMMARY_HEAD_SECTION).within(() => {
                cy.get(ORDER_NUMBER).should('be.visible')
              })

              cy.getByTestId(ORDER_PRODUCT_SECTION).should('be.visible')
              cy.get(ORDER_PRODUCT_HREF).should('be.visible')
              cy.checkLinks(ORDER_PRODUCT_HREF)
              cy.get(ARTICLE_IN_SUMMARY).find('h1').should('be.visible')
              cy.get(ARTICLE_IN_SUMMARY).find('img').should('be.visible')
              cy.get(PRODUCT_CODE).should('be.visible')
              cy.get(PRODUCT_SIZE).should('be.visible')
              cy.get(PRODUCT_QUANTITY).should('be.visible')

              // add compare selected shipment -> trouble with grab places -> example PPL smart on summary is grab address -> create ticket for resolve this problem

              // compare selected payment
              cy.get(SHIPMENT_PAYMENT_SECTION)
                .should('be.visible')
                .then(() => {
                  cy.get(SHIPMENT_PAYMENT_SECTION).within(() => {
                    cy.get('strong.pl-1')
                      .eq(1)
                      .invoke('text')
                      .then((summaryPaymentText) => {
                        expect(selectedPaymentText).to.equal(summaryPaymentText)
                        cy.print({
                          title: 'LOG',
                          message: `Selected payment matches with payment in summary: ${selectedPaymentText} is equal to ${summaryPaymentText}`,
                          type: 'warning',
                        })
                      })
                  })
                })

              cy.getByTestId(SUMMARY_INVOICE_ADDRESS).should('be.visible')
              cy.getByTestId(SUMMARY_SHIPPING_ADDRESS).should('be.visible')

              //compare summary price from cart summary with summary page
              cy.getAllAvailablePricesInSummary().then(
                (summaryPricesSummary) => {
                  expect(
                    summaryPricesCart.TOTAL_RECOMMENDED_PRICE_SUMMARY
                  ).equal(summaryPricesSummary.TOTAL_RECOMMENDED_PRICE_SUMMARY)
                  expect(summaryPricesCart.DISCOUNT_TOTAL_PRICE_SUMMARY).equal(
                    summaryPricesSummary.DISCOUNT_TOTAL_PRICE_SUMMARY
                  )
                  expect(summaryPricesCart.SHIPPING_PRICE_SUMMARY).equal(
                    summaryPricesSummary.SHIPPING_PRICE_SUMMARY
                  )
                  expect(summaryPricesCart.SHIPPING_FREE_PRICE_SUMMARY).equal(
                    summaryPricesSummary.SHIPPING_FREE_PRICE_SUMMARY
                  )
                  expect(summaryPricesCart.PAYMENT_PRICE_SUMMARY).equal(
                    summaryPricesSummary.PAYMENT_PRICE_SUMMARY
                  )
                  expect(summaryPricesCart.PAYMENT_FREE_PRICE_SUMMARY).equal(
                    summaryPricesSummary.PAYMENT_FREE_PRICE_SUMMARY
                  )
                  expect(summaryPricesCart.COUPON_PRICE_TOTAL_SUMMARY).equal(
                    summaryPricesSummary.COUPON_PRICE_TOTAL_SUMMARY
                  )
                  expect(summaryPricesCart.TOTAL_PRICE_SUMMARY).equal(
                    summaryPricesSummary.TOTAL_PRICE_SUMMARY
                  )

                  cy.print({
                    title: 'LOG',
                    message:
                      'Summary prices on summary in cart and summary after sending order are equal.',
                    type: 'warning',
                  })
                }
              )

              cy.get(BUTTON_GO_TO_HOMEPAGE).click()

              cy.url().should('eq', Cypress.config().baseUrl)
            })
          })
        })
      })
    })
  }
})
