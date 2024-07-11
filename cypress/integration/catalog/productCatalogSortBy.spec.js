import { FILTRATION_SELECTORS } from '../../support/selectors/filtrationSelectors'
import { SELECTORS } from '../../support/selectors/selectors'
import { PRICE_SELECTORS } from '../../support/selectors/priceSelectors'

const SELECT_SORT_OPTIONS = '[data-testid="catalog-desktop-sort-button"] select'

const sortOptions = [
  { value: 'lowestPrice' },
  { value: 'highestPrice' },
  { value: 'oldest' },
  { value: 'latest' },
  { value: 'recommended' },
]

const selectSortOption = (value) => {
  cy.get(SELECT_SORT_OPTIONS).select(value)
  cy.get(
    `[data-testid="catalog-desktop-sort-button"] select option[value="${value}"]`
  ).should('have.attr', 'data-selected', 'true')
  cy.url().should('include', value)
}

describe('Product catalog - sort by', () => {
  beforeEach(() => {
    cy.goToCategory()
  })

  it('Sort by switch options', () => {
    cy.getByTestId(FILTRATION_SELECTORS.SORT_OPTIONS).click()

    sortOptions.forEach((option) => {
      selectSortOption(option.value)
    })
  })

  it('Check sort by option Lowest price', () => {
    let filterMinPrice

    cy.getByTestId(FILTRATION_SELECTORS.SORT_OPTIONS).click()
    selectSortOption('lowestPrice')

    cy.wait('@lowestPrice')

    cy.wait(3000)

    // minimum article price by price range filter should be
    cy.getByTestId(FILTRATION_SELECTORS.FILTER_PRICE)
      .find(FILTRATION_SELECTORS.MIN_PRICE_IN_FILTER)
      .invoke('val')
      .then((value) => {
        filterMinPrice = parseFloat(
          value
            .toString()
            .replace(',', '.')
            .match(/[\d,.]+/g)
            .join('')
        )

        cy.print({
          title: 'LOG',
          message: `Lowest price should be: ${value}`,
          type: 'warning',
        })
      })
    checkProductPriceSorting('asc')

    cy.print({
      title: 'LOG',
      message: `Products are ranked from lowest price to highest`,
      type: 'warning',
    })

    cy.getByTestId(SELECTORS.PRODUCT_FROM_CATALOG).first().click()
    cy.wait('@waitForPD').its('response.statusCode').should('eq', 200)

    cy.getAllAvailableProductPricesOnPD().then((detailPrices) => {
      window.history.back()

      cy.getByTestId(FILTRATION_SELECTORS.SORT_OPTIONS).click()
      selectSortOption('lowestPrice')

      if (detailPrices.COUPON_PRICE_WITHOUT_CODE_PD) {
        expect(filterMinPrice).to.equal(
          detailPrices.COUPON_PRICE_WITHOUT_CODE_PD
        )
      } else if (detailPrices.DISCOUNTED_SELLING_PRICE_PD) {
        expect(filterMinPrice).to.equal(
          detailPrices.DISCOUNTED_SELLING_PRICE_PD
        )
      } else if (detailPrices.RECOMMENDED_SELLING_PRICE_PD) {
        expect(filterMinPrice).to.equal(
          detailPrices.RECOMMENDED_SELLING_PRICE_PD
        )
      }
      cy.print({
        title: 'LOG',
        message: `Min filter price is equal the cheapest product: ${filterMinPrice}`,
        type: 'warning',
      })
    })
  })

  it('Check sort by option Highest price', () => {
    let filterMaxPrice

    cy.getByTestId(FILTRATION_SELECTORS.SORT_OPTIONS).click()
    selectSortOption('highestPrice')

    cy.wait('@highestPrice')

    // maximum article price by price range filter should be
    cy.getByTestId(FILTRATION_SELECTORS.FILTER_PRICE)
      .find(FILTRATION_SELECTORS.MAX_PRICE_IN_FILTER)
      .invoke('val')
      .then((value) => {
        filterMaxPrice = parseFloat(
          value
            .toString()
            .replace(',', '.')
            .match(/[\d,.]+/g)
            .join('')
        )

        cy.print({
          title: 'LOG',
          message: `Highest price should be: ${value}`,
          type: 'warning',
        })
      })

    checkProductPriceSorting('desc')

    cy.print({
      title: 'LOG',
      message: `Products are ranked from highest price to lowest`,
      type: 'warning',
    })
    cy.getByTestId(SELECTORS.PRODUCT_FROM_CATALOG).first().click()
    cy.wait('@waitForPD').its('response.statusCode').should('eq', 200)

    cy.wait(3000)

    cy.getAllAvailableProductPricesOnPD().then((detailPrices) => {
      window.history.back()

      cy.getByTestId(FILTRATION_SELECTORS.SORT_OPTIONS).click()
      selectSortOption('highestPrice')

      cy.wait(3000)

      if (detailPrices.COUPON_PRICE_WITHOUT_CODE_PD) {
        expect(filterMaxPrice).to.equal(
          detailPrices.COUPON_PRICE_WITHOUT_CODE_PD
        )
      } else if (detailPrices.DISCOUNTED_SELLING_PRICE_PD) {
        expect(filterMaxPrice).to.equal(
          detailPrices.DISCOUNTED_SELLING_PRICE_PD
        )
      } else if (detailPrices.RECOMMENDED_SELLING_PRICE_PD) {
        expect(filterMaxPrice).to.equal(
          detailPrices.RECOMMENDED_SELLING_PRICE_PD
        )
      }
      cy.print({
        title: 'LOG',
        message: `Min filter price is equal the cheapest product: ${filterMaxPrice}`,
        type: 'warning',
      })
    })
  })

  it('Compare price on catalog with product detail', () => {
    cy.wait(3000)

    cy.getByTestId(SELECTORS.PRODUCT_FROM_CATALOG).first().click()
    cy.wait('@waitForPD').its('response.statusCode').should('eq', 200)
    cy.wait(3000)

    cy.getAllAvailableProductPricesOnPD().then((detailPrices) => {
      cy.go('back')
      cy.getAllAvailableProductPricesOnCatalog().then((catalogPrices) => {
        expect(detailPrices.RECOMMENDED_SELLING_PRICE_PD).equal(
          catalogPrices.RECOMMENDED_SELLING_PRICE_CATALOG
        )
        expect(detailPrices.DISCOUNTED_SELLING_PRICE_PD).equal(
          catalogPrices.DISCOUNTED_SELLING_PRICE_CATALOG
        )
        expect(detailPrices.RECOMMENDED_PRICE_PD).equal(
          catalogPrices.RECOMMENDED_PRICE_CATALOG
        )
        expect(detailPrices.SELLING_PRICE_WITH_COUPON_PD).equal(
          catalogPrices.SELLING_PRICE_WITH_COUPON_CATALOG
        )
        expect(detailPrices.COUPON_PRICE_PD).equal(
          catalogPrices.COUPON_PRICE_CATALOG
        )
        expect(detailPrices.COUPON_PRICE_WITHOUT_CODE_RECOMMENDED_PD).equal(
          catalogPrices.RECOMMENDED_COUPON_PRICE_CATALOG
        )
        if (
          catalogPrices.SELLING_PRICE_WITH_COUPON_CATALOG ||
          catalogPrices.COUPON_PRICE_CATALOG
        ) {
          cy.get(PRICE_SELECTORS.POPUP_CODE_INFO_CATALOG).should('be.visible')
          cy.get(PRICE_SELECTORS.POPUP_CODE_INFO_TEXT_CATALOG).should(
            'be.visible'
          )

          cy.print({
            title: 'LOG',
            message:
              'Info and text of the code is visible on the product in the catalog',
            type: 'warning',
          })
        }

        cy.print({
          title: 'LOG',
          message: 'Product prices on catalog and PD are equal',
          type: 'warning',
        })
      })
    })
  })
})

function checkProductPriceSorting(order) {
  let previousProductPrice = order === 'asc' ? 0 : Number.MAX_SAFE_INTEGER
  cy.get(FILTRATION_SELECTORS.LOADED_PRODUCT_IN_CATALOG).each(($span) => {
    const productPrice = parseFloat(
      $span
        .text()
        .replace(',', '.')
        .match(/[\d,.]+/g)
        .join('')
    )
    if (order === 'asc') {
      expect(productPrice).to.be.at.least(previousProductPrice)
    } else {
      expect(productPrice).to.be.at.most(previousProductPrice)
    }
    if (order === 'desc') {
      expect(productPrice).to.be.at.most(previousProductPrice)
    } else {
      expect(productPrice).to.be.at.least(previousProductPrice)
    }
    previousProductPrice = productPrice
  })

  cy.log(
    `Products are ranked from ${
      order === 'asc' ? 'lowest' : 'highest'
    } price to ${order === 'asc' ? 'highest' : 'lowest'}`
  )

  cy.log(
    `Products are ranked from ${
      order === 'des' ? 'highest' : 'lowest'
    } price to ${order === 'des' ? 'lowest' : 'highest'}`
  )
}
