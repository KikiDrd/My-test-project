import { CART_SELECTORS } from '../../../support/selectors/selectors'
import randomElement from '../../../utilities/randomElement'
import { FORM_NAMES } from '../../selectors/formInputSelectors'

Cypress.Commands.add('goToCart', () => {
  cy.getByTestId(CART_SELECTORS.FLY_CART_GO_TO_CART_BUTTON).click()

  cy.wait('@cartContent').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('goToCartContact', () => {
  cy.get(CART_SELECTORS.BUTTON_TO_CART_CONTACT_PAGE).click()

  cy.wait('@cartContact').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('goToCartDelivery', () => {
  cy.get(CART_SELECTORS.BUTTON_TO_CART_SHIPMENT_PAGE).click()

  cy.wait('@cartDelivery').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('goToCartPayment', () => {
  cy.get(CART_SELECTORS.BUTTON_TO_PAYMENT_PAGE).click()

  cy.wait('@cartPayment')
})

Cypress.Commands.add('setUpCart', () => {
  cy.goToProductDetailFromCatalog()

  cy.addProductToCart()

  cy.goToCart()
})

Cypress.Commands.add('createOrder', () => {
  cy.wait('@cartPayment')

  cy.get(CART_SELECTORS.BUTTON_CREATE_ORDER).click()
})

Cypress.Commands.add('removeItemsFromCart', () => {
  cy.get('body').then((body) => {
    let cartCounter = body.find(CART_SELECTORS.CART_COUNTER)

    if (cartCounter.length === 1) {
      cy.get(CART_SELECTORS.CART_COUNTER)
        .should('be.visible')
        .then(() => {
          cy.getByTestId(CART_SELECTORS.CART_ICON_HEADER).eq(0).click()
          cy.wait('@cartContent').its('response.statusCode').should('eq', 200)

          cy.get('body').then((body) => {
            let countOfDeleteButtons = body.find(
              CART_SELECTORS.REMOVE_PRODUCT_FROM_CART
            ).length
            for (; countOfDeleteButtons > 0; countOfDeleteButtons--) {
              cy.get(CART_SELECTORS.REMOVE_PRODUCT_FROM_CART).eq(0).click()
              cy.wait('@waitAfterDeleteProduct')
                .its('response.statusCode')
                .should('eq', 200)
            }
          })
        })
    }
  })
})

Cypress.Commands.add('addProductToCart', () => {
  const PRODUCT_SIZE =
    '[data-testid="product-detail-sizes-wrapper-select-sizes-div"] input[name="productSize"]'
  const PRODUCT_SIZE_FLY_CART = '[data-testid="product-card-tiny-size-span"]'

  cy.wait(1000)
  randomElement(PRODUCT_SIZE)

  cy.get(PRODUCT_SIZE).then(($elements) => {
    const selectedSize = $elements
      .filter(':checked')
      .siblings('button')
      .first()
      .text()

    cy.print({
      title: 'LOG',
      message: `Selected size is: ${selectedSize}`,
      type: 'warning',
    })

    cy.wrap(selectedSize).as('selectedSize')
  })

  cy.wait(1000)
  cy.get(CART_SELECTORS.CART_SUBMIT_BUTTON).click()

  cy.wait('@addProductToCart').its('response.statusCode').should('eq', 200)

  // check size in flyCart
  cy.get('@selectedSize').then((selectedSize) => {
    cy.get(PRODUCT_SIZE_FLY_CART).invoke('text').should('contain', selectedSize)
  })
})

Cypress.Commands.add('setUpCartAndGoToContactInCart', () => {
  cy.setUpCart()

  cy.goToCartContact()
})

Cypress.Commands.add('goCartAndFillContactForm', () => {
  cy.setUpCartAndGoToContactInCart()
  cy.formContactData()
})

Cypress.Commands.add('goContactAndFillForm', () => {
  cy.goToCartContact()
  cy.formContactData()
})

Cypress.Commands.add('formContactData', () => {
  const formDataAll = {
    firstname: Cypress.env('firstname'),
    lastname: Cypress.env('lastname'),
    emailText: Cypress.env('login'),
    phoneNumber: Cypress.env('cart').address.phoneNumber,
    streetAddress: Cypress.env('streetAddress'),
    city: Cypress.env('cart').address.city,
    postalCode: Cypress.env('cart').address.postalCode,
    agreeWithTerms: true,
  }

  const formDataRo = {
    judet: Cypress.env('cart').address.judet,
  }

  cy.fillForm(FORM_NAMES.CONTACT, formDataAll)

  if (Cypress.config().baseUrl.match('orsay.ro')) {
    cy.fillForm(FORM_NAMES.CONTACT, formDataRo)

    cy.get(CART_SELECTORS.JUDET_DROPDOWN)
      .find('option:checked')
      .should('contain.text', Cypress.env('cart').address.judet)

    cy.print({
      title: 'LOG',
      message: `Judet is available (env is orsay.ro)`,
      type: 'warning',
    })
  }
})

Cypress.Commands.add('verifyCartIsEmpty', () => {
  cy.get(CART_SELECTORS.CART_COUNTER).should('not.exist')
})

Cypress.Commands.add('clearCart', () => {
  function removeItems() {
    cy.get(CART_SELECTORS.REMOVE_PRODUCT_FROM_CART).then(($els) => {
      if ($els.length > 0) {
        cy.wrap($els[0])
          .click()
          .then(() => {
            cy.wait('@waitAfterDeleteProduct')
              .its('response.statusCode')
              .should('eq', 200)
              .then(() => {
                cy.wait(1000)
                cy.get('body').then(($body) => {
                  if (
                    $body.find(CART_SELECTORS.REMOVE_PRODUCT_FROM_CART).length >
                    0
                  ) {
                    cy.wait(500)
                    removeItems()
                  } else {
                    cy.verifyCartIsEmpty()
                  }
                })
              })
          })
      } else {
        cy.verifyCartIsEmpty()
      }
    })
  }
  removeItems()
})

Cypress.Commands.add('setUpCartEmpty', () => {
  cy.get('body').then((body) => {
    let CartCounter = body.find(CART_SELECTORS.CART_COUNTER)
    if (CartCounter.length >= 1) {
      cy.visit(Cypress.env('url').cart.contentStep)
      cy.wait('@cartContent')
        .its('response.statusCode')
        .should('eq', 200)
        .then(() => {
          cy.clearCart()
        })
    } else {
      cy.print({
        title: 'LOG',
        message: `Cart counter does not exist. Skipping cart cleanup.`,
        type: 'warning',
      })
    }
  })
})
