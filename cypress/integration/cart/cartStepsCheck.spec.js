import { CART_SELECTORS } from '../../support/selectors/selectors'
import { FORM_SELECTORS } from '../../support/selectors/formInputSelectors'
import { PRICE_SELECTORS } from '../../support/selectors/priceSelectors'

describe('Cart sections visibility', () => {
  it('Cart content is visible', () => {
    const GLS_DELIVERY_ID = Cypress.env('cart').shipmentOption.gls

    cy.goToProductDetailFromCategory()

    cy.addProductToCart()

    cy.goToCart()

    // cart section - with article

    cy.get(CART_SELECTORS.ARTICLE_IN_CART).should('exist')
    cy.get(FORM_SELECTORS.FORM_DISCOUNT).should('exist')
    cy.get(PRICE_SELECTORS.CHECKOUT_CART_SUMMARY).should('exist')
    cy.getByTestId(CART_SELECTORS.CART_LOGIN_BUTTON).should('exist')
    cy.getByTestId(CART_SELECTORS.CART_REGISTRATION_BUTTON).should('exist')
    cy.get(CART_SELECTORS.BUTTON_TO_CART_CONTACT_PAGE).should('exist').click()
    cy.wait('@cartContact').its('response.statusCode').should('eq', 200)

    // cart section - with contact

    cy.verifyUrlContains(Cypress.env('url').cart.contactStep)

    cy.get(CART_SELECTORS.EDIT_ITEMS_BUTTON).should('exist').click()
    cy.wait('@cartContent').its('response.statusCode').should('eq', 200)

    // cart section - with article

    cy.verifyUrlContains(Cypress.env('url').cart.contentStep)

    cy.get(CART_SELECTORS.BUTTON_TO_CART_CONTACT_PAGE).click()
    cy.wait('@cartContact').its('response.statusCode').should('eq', 200)

    // cart section - with contact

    cy.verifyUrlContains(Cypress.env('url').cart.contactStep)

    cy.getByTestId(CART_SELECTORS.CART_LOGIN_BUTTON).should('exist')
    cy.getByTestId(CART_SELECTORS.CART_REGISTRATION_BUTTON).should('exist')
    cy.get(FORM_SELECTORS.FORM_CHECKOUT_CONTACT).should('exist')
    cy.get(FORM_SELECTORS.FORM_DISCOUNT).should('exist')
    cy.get(PRICE_SELECTORS.CHECKOUT_CART_SUMMARY).should('exist')
    cy.get(CART_SELECTORS.ARTICLE_IN_CART_SECTION).should('exist')
    cy.get(CART_SELECTORS.AGREE_WITH_TERMS).should('exist')

    cy.url().then((initialUrl) => {
      cy.get(CART_SELECTORS.BUTTON_TO_CART_SHIPMENT_PAGE)
        .should('exist')
        .click()
      cy.url().should('eq', initialUrl)
    })

    cy.formContactData()
    cy.get(CART_SELECTORS.BUTTON_TO_CART_SHIPMENT_PAGE).click()
    cy.wait('@cartDelivery').its('response.statusCode').should('eq', 200)

    // cart section - with delivery

    cy.verifyUrlContains(Cypress.env('url').cart.deliveryStep)

    cy.get(CART_SELECTORS.BUTTON_CONTACT_CHANGE).should('exist').click()
    cy.wait('@cartContact').its('response.statusCode').should('eq', 200)

    // cart section - with contact

    cy.verifyUrlContains(Cypress.env('url').cart.contactStep)

    cy.get(CART_SELECTORS.BUTTON_TO_CART_SHIPMENT_PAGE).click()
    cy.wait('@cartDelivery').its('response.statusCode').should('eq', 200)

    // cart section - with delivery

    cy.verifyUrlContains(Cypress.env('url').cart.deliveryStep)

    cy.getByTestId(CART_SELECTORS.CART_LOGIN_BUTTON).should('exist')
    cy.getByTestId(CART_SELECTORS.CART_REGISTRATION_BUTTON).should('exist')
    cy.get(CART_SELECTORS.CONTACT_INFORMATION).should('exist')
    cy.get(FORM_SELECTORS.FORM_DISCOUNT).should('exist')
    cy.get(PRICE_SELECTORS.CHECKOUT_CART_SUMMARY).should('exist')
    cy.get(CART_SELECTORS.ARTICLE_IN_CART_SECTION).should('exist')
    cy.get(CART_SELECTORS.EDIT_ITEMS_BUTTON).should('exist')
    cy.get(CART_SELECTORS.SHIPMENT_SECTION).should('exist')
    cy.get(CART_SELECTORS.SHIPMENT_SECTION).each(($option) => {
      cy.wrap($option)
        .find(
          `${PRICE_SELECTORS.DELIVERY_PRICE}, ${PRICE_SELECTORS.DELIVERY_PRICE_FREE}`
        )
        .should('have.length.greaterThan', 0)
    })

    cy.get(CART_SELECTORS.SHIPMENT_SECTION)
      .find(`[data-testid*="${GLS_DELIVERY_ID}"]`)
      .click()
    cy.wait('@shipmentUpdate').its('response.statusCode').should('eq', 200)

    cy.get(CART_SELECTORS.BUTTON_TO_PAYMENT_PAGE).should('exist')

    cy.get(PRICE_SELECTORS.CHECKOUT_CART_SUMMARY).within(() => {
      cy.get(
        `${PRICE_SELECTORS.SHIPPING_PRICE_SUMMARY_II}, ${PRICE_SELECTORS.SHIPPING_FREE_PRICE_SUMMARY_II}`
      ).should('have.length.greaterThan', 0)
    })

    cy.get(CART_SELECTORS.BUTTON_TO_PAYMENT_PAGE).click()
    cy.wait('@cartPayment').its('response.statusCode').should('eq', 200)

    // cart section - with payment

    cy.verifyUrlContains(Cypress.env('url').cart.paymentStep)

    cy.getByTestId(CART_SELECTORS.CART_LOGIN_BUTTON).should('exist')
    cy.getByTestId(CART_SELECTORS.CART_REGISTRATION_BUTTON).should('exist')
    cy.get(CART_SELECTORS.CONTACT_INFORMATION).should('exist')
    cy.get(FORM_SELECTORS.FORM_DISCOUNT).should('exist')
    cy.get(PRICE_SELECTORS.CHECKOUT_CART_SUMMARY).should('exist')
    cy.get(CART_SELECTORS.ARTICLE_IN_CART_SECTION).should('exist')
    cy.get(CART_SELECTORS.EDIT_ITEMS_BUTTON).should('exist')
    cy.get(CART_SELECTORS.PAYMENT_SECTION).should('exist')

    cy.get(CART_SELECTORS.PAYMENT_SECTION).each(($option) => {
      cy.wrap($option)
        .find(
          `${PRICE_SELECTORS.PAYMENT_PRICE}, ${PRICE_SELECTORS.PAYMENT_PRICE_FREE}`
        )
        .should('have.length.greaterThan', 0)
    })

    cy.get(CART_SELECTORS.PAYMENT_SECTION).then(($paymentOptions) => {
      const paymentOptionsCount = $paymentOptions.length
      const randomIndex = Math.floor(Math.random() * paymentOptionsCount)
      cy.wrap($paymentOptions[randomIndex]).click()
    })

    cy.wait('@paymentUpdate').its('response.statusCode').should('eq', 200)

    cy.get(PRICE_SELECTORS.CHECKOUT_CART_SUMMARY).within(() => {
      cy.get(
        `${PRICE_SELECTORS.PAYMENT_PRICE_SUMMARY_II}, ${PRICE_SELECTORS.PAYMENT_FREE_PRICE_SUMMARY_II}`
      ).should('have.length.greaterThan', 0)
    })

    cy.wait(2000)
    cy.get(CART_SELECTORS.BUTTON_DELIVERY_PAYMENT_CHANGE).click()
    cy.wait('@cartDelivery').its('response.statusCode').should('eq', 200)

    // cart section - with delivery

    cy.verifyUrlContains(Cypress.env('url').cart.deliveryStep)

    cy.get(CART_SELECTORS.BUTTON_DELIVERY_PAYMENT_CHANGE).click()
    cy.wait('@cartPayment').its('response.statusCode').should('eq', 200)

    // cart section - with payment

    cy.verifyUrlContains(Cypress.env('url').cart.paymentStep)

    cy.get(CART_SELECTORS.BUTTON_CREATE_ORDER).should('exist')

    // check go back button in cart

    cy.wait(5000)
    cy.get(CART_SELECTORS.GO_BACK_BUTTON).should('be.visible').dblclick()
    cy.wait(5000)

    cy.get(CART_SELECTORS.GO_BACK_BUTTON).should('be.visible').dblclick()
    cy.wait(5000)
    cy.verifyUrlContains(Cypress.env('url').cart.contactStep)


    cy.get(CART_SELECTORS.GO_BACK_BUTTON).should('be.visible').dblclick()
    cy.wait(5000)
    cy.verifyUrlContains(Cypress.env('url').cart.contactStep)

    cy.get(CART_SELECTORS.GO_BACK_BUTTON).should('be.visible').dblclick()
    cy.wait(5000)
    cy.verifyUrlContains(Cypress.env('url').cart.cartContent)

    cy.wait(5000)
    cy.get(CART_SELECTORS.GO_BACK_BUTTON).should('be.visible').dblclick()
  })
})
