import { PRICE_SELECTORS } from '../../support/selectors/priceSelectors'
import { CART_SELECTORS } from '../../support/selectors/selectors'

describe('Fly cart interaction', () => {
  it('Add and remove product from fly cart', () => {
    cy.goToProductDetailFromCategory()
    cy.wait(1000)

    cy.addProductToCart()

    cy.get(CART_SELECTORS.FLY_CART).should('be.visible')

    cy.getProductName()

    cy.getAllAvailableProductPricesOnPD().then((detailPrices) => {
      cy.getAllAvailableProductPricesOnFlyCart().then((flyCartPrices) => {
        if (detailPrices.RECOMMENDED_SELLING_PRICE_PD) {
          expect(detailPrices.RECOMMENDED_SELLING_PRICE_PD).equal(
            flyCartPrices.RECOMMENDED_SELLING_PRICE_FLY_CART
          )
        }
        expect(detailPrices.DISCOUNTED_SELLING_PRICE_PD).equal(
          flyCartPrices.DISCOUNTED_SELLING_PRICE_FLY_CART
        )
        expect(detailPrices.RECOMMENDED_PRICE_PD).equal(
          flyCartPrices.RECOMMENDED_PRICE_FLY_CART
        )
        if (detailPrices.COUPON_PRICE_WITHOUT_CODE_PD) {
          expect(detailPrices.COUPON_PRICE_WITHOUT_CODE_PD).equal(
            flyCartPrices.DISCOUNTED_SELLING_PRICE_FLY_CART
          )
        }
        cy.print({
          title: 'LOG',
          message: 'Product prices on Fly cart and PD are equal',
          type: 'warning',
        })
      })
    })

    cy.get(PRICE_SELECTORS.TOTAL_PRICE_FLY_CART).should('be.visible')

    cy.getByTestId(CART_SELECTORS.FLY_CART_CLOSE_BUTTON).click()
    cy.get(CART_SELECTORS.FLY_CART).should('not.exist')

    cy.goToProductDetailFromCategory()
    cy.wait(1000)

    cy.addProductToCart()
    cy.get(CART_SELECTORS.FLY_CART).should('be.visible')

    cy.getByTestId(CART_SELECTORS.PRODUCT_IN_FLY_CART)
      .should('exist')
      .then(($productsBefore) => {
        cy.getByTestId(CART_SELECTORS.REMOVE_PRODUCT_FROM_CART_BUTTON)
          .first()
          .click()
        cy.wait('@waitAfterDeleteProduct')
          .its('response.statusCode')
          .should('eq', 200)
          .then(() => {
            cy.getByTestId(CART_SELECTORS.PRODUCT_IN_FLY_CART)
              .should('exist')
              .then(($productsAfter) => {
                expect($productsAfter.length).to.eq($productsBefore.length - 1)
              })
          })

        cy.getProductName()

        cy.getAllAvailableProductPricesOnPD().then((detailPrices) => {
          cy.getAllAvailableProductPricesOnFlyCart().then((flyCartPrices) => {
            if (detailPrices.RECOMMENDED_SELLING_PRICE_PD) {
              expect(detailPrices.RECOMMENDED_SELLING_PRICE_PD).equal(
                flyCartPrices.RECOMMENDED_SELLING_PRICE_FLY_CART
              )
            }
            expect(detailPrices.DISCOUNTED_SELLING_PRICE_PD).equal(
              flyCartPrices.DISCOUNTED_SELLING_PRICE_FLY_CART
            )
            expect(detailPrices.RECOMMENDED_PRICE_PD).equal(
              flyCartPrices.RECOMMENDED_PRICE_FLY_CART
            )
            if (detailPrices.COUPON_PRICE_WITHOUT_CODE_PD) {
              expect(detailPrices.COUPON_PRICE_WITHOUT_CODE_PD).equal(
                flyCartPrices.RECOMMENDED_SELLING_PRICE_FLY_CART
              )
            }
            cy.print({
              title: 'LOG',
              message: 'Product prices on Fly cart and PD are equal',
              type: 'warning',
            })
          })
        })

        cy.get(PRICE_SELECTORS.TOTAL_PRICE_FLY_CART).should('be.visible')

        cy.getByTestId(CART_SELECTORS.FLY_CART_GO_TO_CART_BUTTON).click()

        cy.wait('@cartContent').its('response.statusCode').should('eq', 200)

        cy.getByTestId(CART_SELECTORS.REMOVE_PRODUCT_FROM_CART_BUTTON).click()

        cy.wait('@waitAfterDeleteProduct')
          .its('response.statusCode')
          .should('eq', 200)

        cy.url().should('include', '/checkout/empty-cart')

        cy.wait('@cartContent').its('response.statusCode').should('eq', 200)
      })
  })
})
