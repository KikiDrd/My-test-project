import { SELECTORS, CART_SELECTORS } from '../../support/selectors/selectors'
import { PRICE_SELECTORS } from '../../support/selectors/priceSelectors'

describe('Product details check functionality', () => {
  it('checks breadcrumbs visibility', () => {
    const BREADCRUMBS = '.breadcrumbs_item__C_e77 a'

    cy.goToProductDetailFromCatalog()

    cy.get(BREADCRUMBS).should('be.visible')

    cy.get(BREADCRUMBS).each(($el) => {
      const href = $el.attr('href')

      cy.request(href).then((response) => {
        expect(href).not.to.be.empty
        expect(response.status).to.eq(200)
      })

      cy.request({
        url: href,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          cy.print(
            `Request to ${href} returned a non-200 status code: ${response.status}`
          )
        } else {
          expect(response.status).to.eq(200)
        }
      })
    })
  })

  it('Checks variants visibility', () => {
    const VARIANTS = '[data-testid="product-detail-choose-color-div"]'

    cy.goToProductDetailFromCatalog()

    cy.get(VARIANTS)
      .should('exist')
      .children()
      .each(($el) => {
        cy.wrap($el).find('a[href]').should('have.length.at.least', 1)
      })
  })

  it('Sizes chart visibility', () => {
    cy.goToProductDetailFromCatalog()

    cy.get(SELECTORS.SIZE_CHART_LINK).then(($sizeChartLink) => {
      if ($sizeChartLink.is(':visible')) {
        cy.print({
          title: 'LOG',
          message: `The product has size chart`,
          type: 'warning',
        })

        cy.get(SELECTORS.SIZE_CHART_LINK).click()

        cy.get(SELECTORS.DIALOG_POPUP)
          .should('be.visible')
          .find('tbody')
          .should('have.length.gt', 0)

        cy.getByTestId(SELECTORS.DIALOG_CLOSE_BUTTON).click()

        cy.get(SELECTORS.SIZE_CHART_LINK).should('be.visible')
      } else {
        cy.print({
          title: 'LOG',
          message: `The product has no size chart`,
          type: 'error',
        })
      }
    })
  })

  it('Pick each available sizes on PD functionality', () => {
    cy.goToProductDetailFromCatalog()

    cy.wait(1500)

    cy.get(SELECTORS.SIZES_WRAPPER).should('be.visible')

    cy.get(SELECTORS.PRODUCT_SIZE).should('be.visible')

    pickEachSize(SELECTORS.PRODUCT_SIZE)
  })

  it('Pick each available sizes after add cart on PD functionality', () => {
    const PRODUCT_SIZE_MODAL =
      '[data-testid="product-detail-sizes-wrapper-select-sizes-div"] input[name="productSize_modal"]'

    addProductToCartWithoutPickSize()

    cy.wait(1500)

    cy.get(SELECTORS.DIALOG_POPUP).should('be.visible')

    cy.get(SELECTORS.SIZE_CHART_LINK).should('be.visible')
    cy.get(SELECTORS.SIZES_WRAPPER).should('be.visible')
    cy.get(PRODUCT_SIZE_MODAL).should('be.visible')

    pickEachSize(PRODUCT_SIZE_MODAL)

    cy.get(SELECTORS.SELECT_SIZE_ALERT).should('not.exist')

    cy.getByTestId(SELECTORS.DIALOG_CLOSE_BUTTON).click()
  })

  it('Check size alert visibility', () => {
    addProductToCartWithoutPickSize()

    cy.get(SELECTORS.DIALOG_POPUP).should('be.visible')

    cy.get(SELECTORS.SELECT_SIZE_ALERT).should('be.visible')

    cy.getByTestId(SELECTORS.DIALOG_CLOSE_BUTTON).click()

    cy.get(SELECTORS.SELECT_SIZE_ALERT).should('be.visible')
  })

  it('Check product price and popup code', () => {
    cy.goToProductDetailFromCatalog()

    cy.getAllAvailableProductPricesOnPD().then((prices) => {
      if (prices.COUPON_PRICE_PD || prices.SELLING_PRICE_WITH_COUPON_PD) {
        cy.get(PRICE_SELECTORS.POPUP_CODE_INFO_PD).should('be.visible')
        cy.get(PRICE_SELECTORS.POPUP_CODE_INFO_TEXT_PD).should('be.visible')

        cy.print({
          title: 'LOG',
          message: `Info popup and text of the code is visible on the product on PD`,
          type: 'warning',
        })
      }
    })
  })
})

function addProductToCartWithoutPickSize() {
  cy.goToProductDetailFromCatalog()
  cy.get(CART_SELECTORS.CART_SUBMIT_BUTTON).click()
}

function pickEachSize(selector) {
  cy.get(selector).each(($radioButton) => {
    cy.wrap($radioButton).as('radioButton').click()
    cy.get('@radioButton').then(($radioButton) => {
      expect($radioButton.prop('checked')).to.be.true
    })
  })
}
