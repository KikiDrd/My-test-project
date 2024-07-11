import { SELECTORS } from '../support/selectors/selectors'
import randomElement from '../utilities/randomElement'

const WISHLIST_BUTTON_PRODUCT_DETAIL =
  'wish-list-add-to-wish-list-as-box-button'
const WISHLIST_BUTTON_CATALOG = 'product-image-area-add-to-wish-list-icon'
const MENU_CATEGORY = Object.values(Cypress.env('url').menu.withSubCategory)
const RANDOM_MENU_CATEGORY =
  MENU_CATEGORY[Math.floor(Math.random() * MENU_CATEGORY.length)]
const SEARCH_STRING = Cypress.env('searchString')
const PRODUCT_VARIANTS = '[data-testid="product-detail-choose-color-div"] a'
const RANDOM_OTHER_VARIANT =
  '[data-testid="product-detail-choose-color-div"] a[data-active="false"]'
const WISHLIST_BUTTON_PRODUCT =
  '[data-testid="product-image-area-add-to-wish-list-icon"]'
const HOME_PAGE_BANNERS =
  '.relative [data-testid="banners-simple-products-section"] .my-6'

describe('Wishlist', () => {
  beforeEach(() => {
    cy.setUpWishlistEmpty()
  })

  it('Add and Remove Product from Wishlist via Product Detail', () => {
    cy.goToProductDetailFromCategory()
    cy.getByTestId(WISHLIST_BUTTON_PRODUCT_DETAIL)
      .first()
      .click({ force: true })
    cy.wait('@addToWishlist').its('response.statusCode').should('eq', 200)
    cy.get(SELECTORS.WISHLIST_COUNTER).should('have.text', '1')
    cy.getByTestId(WISHLIST_BUTTON_PRODUCT_DETAIL)
      .first()
      .click({ force: true })
    cy.wait('@removeFromWishlist').its('response.statusCode').should('eq', 200)
    cy.verifyWishlistIsEmpty(SELECTORS.WISHLIST_COUNTER)
  })

  it('Add and Remove Product from Wishlist via Product Catalog', () => {
    cy.visit(RANDOM_MENU_CATEGORY)
    cy.getByTestId(WISHLIST_BUTTON_CATALOG).first().click({ force: true })
    cy.wait('@addToWishlist').its('response.statusCode').should('eq', 200)
    cy.get(SELECTORS.WISHLIST_COUNTER).should('have.text', '1')
    cy.getByTestId(WISHLIST_BUTTON_CATALOG).first().click({ force: true })
    cy.wait('@removeFromWishlist').its('response.statusCode').should('eq', 200)
    cy.verifyWishlistIsEmpty(SELECTORS.WISHLIST_COUNTER)
  })

  it('Add and Remove Product from Wishlist via Whisper Box', () => {
    cy.get(SELECTORS.INPUT_SEARCH).type(SEARCH_STRING)

    cy.getByTestId(SELECTORS.WHISPER_BOX).within(() => {
      cy.getByTestId(WISHLIST_BUTTON_CATALOG).first().click()
      cy.wait('@addToWishlist').its('response.statusCode').should('eq', 200)

      cy.getByTestId(WISHLIST_BUTTON_CATALOG).first().click()
      cy.wait('@removeFromWishlist')
        .its('response.statusCode')
        .should('eq', 200)
      cy.verifyWishlistIsEmpty(SELECTORS.WISHLIST_COUNTER)
    })
  })

  it('Add and Remove Product from Wishlist via Search Box', () => {
    cy.get(SELECTORS.INPUT_SEARCH).type(SEARCH_STRING)
    cy.get(SELECTORS.INPUT_SEARCH).first().type('{enter}')

    cy.wait('@waitAfterSearch').its('response.statusCode').should('eq', 200)

    cy.get(SELECTORS.INPUT_SEARCH).clear()
    cy.get(SELECTORS.PRODUCT_LIST_SECTION)
      .find(WISHLIST_BUTTON_PRODUCT)
      .first()
      .click()
    cy.wait('@addToWishlist').its('response.statusCode').should('eq', 200)
    cy.get(SELECTORS.WISHLIST_COUNTER).should('have.text', '1')
    cy.get(SELECTORS.PRODUCT_LIST_SECTION)
      .find(WISHLIST_BUTTON_PRODUCT)
      .first()
      .click()
    cy.wait('@removeFromWishlist').its('response.statusCode').should('eq', 200)
    cy.verifyWishlistIsEmpty(SELECTORS.WISHLIST_COUNTER)
  })

  it('Add and Remove Product from Wishlist via Banners on homepage', () => {
    cy.get(HOME_PAGE_BANNERS).then(($homePageBanners) => {
      if ($homePageBanners.length > 0) {
        $homePageBanners.each((index, banner) => {
          cy.wrap(banner).find(WISHLIST_BUTTON_PRODUCT).first().click()
          cy.wait('@addToWishlist').its('response.statusCode').should('eq', 200)
          cy.get(SELECTORS.WISHLIST_COUNTER).should(
            'have.text',
            (index + 1).toString()
          )
        })
        $homePageBanners.each((index, banner) => {
          cy.wrap(banner).find(WISHLIST_BUTTON_PRODUCT).first().click()
          cy.wait('@removeFromWishlist')
            .its('response.statusCode')
            .should('eq', 200)
        })
        cy.verifyWishlistIsEmpty(SELECTORS.WISHLIST_COUNTER)
      } else {
        cy.print({
          title: 'LOG',
          message: `Banners don't exist.`,
          type: 'warning',
        })
      }
    })
  })

  it('Add and Remove Product from Wishlist via Similar products', () => {
    cy.goToProductDetailFromCatalog()
    cy.wait(8000)

    cy.get('body').then((body) => {
      let similarProducts = body.find(SELECTORS.PRODUCT_SIMILAR_PRODUCTS)
      if (similarProducts.length > 0) {
        const FIRST_PRODUCT = similarProducts.first()
        cy.wrap(FIRST_PRODUCT).find(WISHLIST_BUTTON_PRODUCT).first().click()
        cy.wait('@addToWishlist').its('response.statusCode').should('eq', 200)
        cy.get(SELECTORS.WISHLIST_COUNTER).should('have.text', '1')
        cy.wrap(FIRST_PRODUCT).find(WISHLIST_BUTTON_PRODUCT).first().click()
        cy.wait('@removeFromWishlist')
          .its('response.statusCode')
          .should('eq', 200)
        cy.verifyWishlistIsEmpty(SELECTORS.WISHLIST_COUNTER)
      } else {
        cy.print({
          title: 'LOG',
          message: `Banner similar products doesn't exist.`,
          type: 'warning',
        })
      }
    })
  })

  it('Add and Remove Product from Wishlist via Complete your outfit', () => {
    cy.goToProductDetailFromCatalog()
    cy.wait(8000)

    cy.get('body').then((body) => {
      let completeYourOutfit = body.find(SELECTORS.PRODUCT_COMPLETE_OUTFIT)
      if (completeYourOutfit.length > 0) {
        const FIRST_PRODUCT = completeYourOutfit.first()

        cy.wrap(FIRST_PRODUCT).find(WISHLIST_BUTTON_PRODUCT).first().click()
        cy.wait('@addToWishlist').its('response.statusCode').should('eq', 200)
        cy.get(SELECTORS.WISHLIST_COUNTER).should('have.text', '1')
        cy.wrap(FIRST_PRODUCT).find(WISHLIST_BUTTON_PRODUCT).first().click()
        cy.wait('@removeFromWishlist')
          .its('response.statusCode')
          .should('eq', 200)
        cy.verifyWishlistIsEmpty(SELECTORS.WISHLIST_COUNTER)
      } else {
        cy.print({
          title: 'LOG',
          message: `Banner complete your outfit doesn't exist.`,
          type: 'warning',
        })
      }
    })
  })

  it('Remove product from Wishlist', () => {
    cy.visit(RANDOM_MENU_CATEGORY)
    cy.getByTestId(WISHLIST_BUTTON_CATALOG).first().click({ force: true })
    cy.wait('@addToWishlist').its('response.statusCode').should('eq', 200)
    cy.visit('/wishlist')
    cy.get(SELECTORS.WISHLIST_COUNTER).should('have.text', '1')
    cy.clearWishlist()
  })

  it('Add and Remove Product variants from Wishlist via Product Detail', () => {
    cy.goToProductDetailFromCategory()

    cy.get(PRODUCT_VARIANTS)
      .its('length')
      .then((numColors) => {
        if (numColors > 1) {
          cy.getByTestId(WISHLIST_BUTTON_PRODUCT_DETAIL)
            .first()
            .click({ force: true })
          cy.wait('@addToWishlist').its('response.statusCode').should('eq', 200)
          cy.get(SELECTORS.WISHLIST_COUNTER).should('have.text', '1')

          randomElement(RANDOM_OTHER_VARIANT)
          cy.wait(1000)
          cy.getByTestId(WISHLIST_BUTTON_PRODUCT_DETAIL)
            .first()
            .click({ force: true })
          cy.wait('@addToWishlist').its('response.statusCode').should('eq', 200)
          cy.get(SELECTORS.WISHLIST_COUNTER).should('have.text', '2')
          cy.visit('/wishlist')
          cy.clearWishlist()
        }
      })
  })

  it('Wishlist merge', () => {
    cy.logInFromHeader()
    cy.setUpWishlistEmpty()
    cy.logout()
    cy.goToProductDetailFromCategory()
    cy.getByTestId(WISHLIST_BUTTON_PRODUCT_DETAIL)
      .first()
      .click({ force: true })
    cy.wait('@addToWishlist').its('response.statusCode').should('eq', 200)
    cy.get(SELECTORS.WISHLIST_COUNTER).should('have.text', '1')
    cy.visit('/wishlist')
    cy.getProductId().then((productId) => {
      cy.logInFromHeader()
      cy.goToProductDetailFromCategory()
      cy.getByTestId(WISHLIST_BUTTON_PRODUCT_DETAIL)
        .first()
        .click({ force: true })
      cy.wait('@addToWishlist').its('response.statusCode').should('eq', 200)
      cy.get(SELECTORS.WISHLIST_COUNTER).should('have.text', '2')
      cy.visit('/wishlist')
      cy.get('main').find('[data-lb-id="' + productId + '"]')
    })
    cy.clearWishlist()
    cy.verifyWishlistIsEmpty(SELECTORS.WISHLIST_COUNTER)
    cy.logout()
  })
})

Cypress.Commands.add('getProductId', () => {
  const PRODUCT_IN_WISHLIST = 'product-list-product-card-vertical-article'

  return cy.getByTestId(PRODUCT_IN_WISHLIST).then(($element) => {
    const productIdValue = $element.attr('data-lb-id')
    const productId = productIdValue
    cy.print({
      title: 'LOG',
      message: `Product id 'data-lb-id' is: ${productId}`,
      type: 'warning',
    })
    return new Cypress.Promise((resolve) => {
      resolve(productId)
    })
  })
})
