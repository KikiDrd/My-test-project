import { CART_SELECTORS } from '../../support/selectors/selectors'
import { PRICE_SELECTORS } from '../../support/selectors/priceSelectors'

describe('Interaction of the product in the cart', () => {
  it('Verify that product has been added to cart', () => {
    // control and compare data from PD vs cart

    cy.goToProductDetailFromCatalog()

    cy.dataArticleFromPD().then((randomArticle) => {
      cy.print({
        title: 'LOG',
        message: `Product name is: ${randomArticle.name}`,
        type: 'warning',
      })
      cy.print({
        title: 'LOG',
        message: `Product url is: ${randomArticle.url}`,
        type: 'warning',
      })

      cy.getAllAvailableProductPricesOnPD().then((detailPrices) => {
        cy.addProductToCart().then(() => {
          cy.goToCart()

          cy.getByTestId(CART_SELECTORS.CHECKOUT_CART_SECTION).should(
            'be.visible'
          )

          cy.getAllAvailableProductPricesInCart().then((cartPrices) => {
            expect(detailPrices.RECOMMENDED_PRICE_PD).equal(
              cartPrices.RECOMMENDED_SELLING_PRICE_CART
            )
            expect(cartPrices.DISCOUNTED_SELLING_PRICE_CART).to.be.oneOf([
              detailPrices.DISCOUNTED_SELLING_PRICE_PD,
              detailPrices.SELLING_PRICE_WITH_COUPON_PD,
              detailPrices.COUPON_PRICE_PD, // only after apply sale code
              detailPrices.COUPON_PRICE_WITHOUT_CODE_RECOMMENDED_PD, // if exist sale code, but without apply code in cart - product without discount
              detailPrices.COUPON_PRICE_WITHOUT_CODE_PD, // if exist sale code, but without apply code in cart - discounted product
            ])
            expect(cartPrices.SELLING_PRICE_CART).to.be.oneOf([
              detailPrices.RECOMMENDED_SELLING_PRICE_PD,
              detailPrices.COUPON_PRICE_WITHOUT_CODE_RECOMMENDED_PD,
            ])

            cy.print({
              title: 'LOG',
              message: 'Product prices on PD and cart are equal',
              type: 'warning',
            })

            cy.getByTestId(CART_SELECTORS.CHECKOUT_CART_SECTION).then(
              ($cartSection) => {
                const DISCOUNTED_SELLING_PRICE_CART = $cartSection.find(
                  PRICE_SELECTORS.DISCOUNTED_SELLING_PRICE_CART
                )
                if (DISCOUNTED_SELLING_PRICE_CART.length > 0) {
                  cy.get(PRICE_SELECTORS.DISCOUNT_BADGE_CART).should(
                    'be.visible'
                  )
                  cy.get(PRICE_SELECTORS.DISCOUNT_SUM_PRICE_CART).should(
                    'be.visible'
                  )
                  cy.print({
                    title: 'LOG',
                    message: `This article has discount badge and discount sum price.`,
                    type: 'warning',
                  })
                } else {
                  cy.print({
                    title: 'LOG',
                    message: `Discount badge and discount sum price is not visible.`,
                    type: 'warning',
                  })
                }
              }
            )

            cy.getByTestId(CART_SELECTORS.GO_TO_PRODUCT_LINK)
              .should('have.attr', 'href')
              .then((href) => {
                expect(randomArticle.url).to.include(href)
                cy.print({
                  title: 'LOG',
                  message: `The correct product has been added to the cart: ${randomArticle.name}`,
                  type: 'warning',
                })
              })

            cy.get('@selectedSize').then((selectedSize) => {
              cy.get(CART_SELECTORS.SIZES_DROPDOWN)
                .find('option:checked')
                .invoke('text')
                .should('contain', selectedSize)

              cy.print({
                title: 'LOG',
                message: `The size of the product corresponds to the added size: ${selectedSize}`,
                type: 'warning',
              })
            })

            cy.get(CART_SELECTORS.QUANTITY_DROPDOWN)
              .find('option:checked')
              .should('contain.text', 1)

            cy.print({
              title: 'LOG',
              message: `One product has been added`,
              type: 'warning',
            })
          })
        })
      })
    })
  })

  it('Product details in cart', () => {
    const GO_TO_PRODUCT_LINK_NAME =
      '[data-testid="product-card-go-to-product-link"]'
    const PRODUCT_CODE_SECTION = '[data-testid="product-card-product-code-div"]'
    const PRODUCT_PRICE_SECTION = '.mt-2.mb-2'

    cy.setUpCart()

    cy.getByTestId(CART_SELECTORS.CHECKOUT_CART_SECTION)
      .should('exist')
      .find('h1')
      .should('be.visible')

    cy.get(CART_SELECTORS.ARTICLE_IN_CART).each(($article) => {
      cy.wrap($article).within(() => {
        cy.get('img').should('exist')
        cy.get(GO_TO_PRODUCT_LINK_NAME).should('exist')
        cy.get(PRODUCT_CODE_SECTION).should('exist')
        cy.get(PRODUCT_PRICE_SECTION).should('exist')
        cy.get(CART_SELECTORS.SIZES_DROPDOWN).should('exist')
        cy.get(CART_SELECTORS.QUANTITY_DROPDOWN).should('exist')
        cy.get(CART_SELECTORS.REMOVE_PRODUCT_FROM_CART).should('exist')
      })
    })
  })

  it('Change product size in cart', () => {
    cy.setUpCart()

    cy.get(CART_SELECTORS.SIZES_DROPDOWN)
      .find('option:checked')
      .invoke('text')
      .then((SIZE_BEFORE) => {
        cy.print({
          title: 'LOG',
          message: `The size of add product is: ${SIZE_BEFORE}`,
          type: 'warning',
        })

        cy.get(CART_SELECTORS.SIZES_DROPDOWN)
          .find('option[data-selected="false"]:not([disabled])')
          .then(($sizeOptions) => {
            if ($sizeOptions.length > 0) {
              const randomIndex = Math.floor(
                Math.random() * $sizeOptions.length
              )
              const changeSize = $sizeOptions.eq(randomIndex)

              cy.wrap(changeSize)
                .invoke('val')
                .then((value) => {
                  cy.get(CART_SELECTORS.SIZES_DROPDOWN)
                    .select(value)
                    .then(() => {
                      const SIZE_AFTER_CHANGE = changeSize.text()

                      cy.wait('@changeSizeQuantityProduct')
                        .its('response.statusCode')
                        .should('eq', 200)

                      cy.print({
                        title: 'LOG',
                        message: `Chosen a different size: ${SIZE_AFTER_CHANGE}`,
                        type: 'warning',
                      })

                      cy.get(CART_SELECTORS.SIZES_DROPDOWN)
                        .find('option:checked')
                        .invoke('text')
                        .then((newSelectedSize) => {
                          cy.print({
                            title: 'LOG',
                            message: `Product size was changed from ${SIZE_BEFORE} to ${newSelectedSize}`,
                            type: 'warning',
                          })
                        })
                    })
                })
            } else {
              cy.print({
                title: 'LOG',
                message: 'No other enabled sizes available to select.',
                type: 'warning',
              })
            }
          })
      })
  })

  it('Change quantity of product in cart', () => {
    cy.setUpCart()

    cy.get(CART_SELECTORS.QUANTITY_DROPDOWN)
      .find('option:checked')
      .invoke('text')
      .then((QUANTITY_BEFORE) => {
        cy.print({
          title: 'LOG',
          message: `The quantity is: ${QUANTITY_BEFORE}`,
          type: 'warning',
        })

        cy.get(CART_SELECTORS.QUANTITY_DROPDOWN)
          .find('option[data-selected="false"]:not([disabled])')
          .then(($quantityOptions) => {
            if ($quantityOptions.length > 0) {
              const randomIndex = Math.floor(
                Math.random() * $quantityOptions.length
              )
              const changeQuantity = $quantityOptions.eq(randomIndex)

              cy.wrap(changeQuantity)
                .invoke('val')
                .then((value) => {
                  cy.get(CART_SELECTORS.QUANTITY_DROPDOWN)
                    .select(value)
                    .then(() => {
                      const QUANTITY_AFTER_CHANGE = changeQuantity.text()

                      cy.wait('@changeSizeQuantityProduct')
                        .its('response.statusCode')
                        .should('eq', 200)

                      cy.print({
                        title: 'LOG',
                        message: `Chosen a different quantity: ${QUANTITY_AFTER_CHANGE}`,
                        type: 'warning',
                      })

                      cy.get(CART_SELECTORS.QUANTITY_DROPDOWN)
                        .find('option:checked')
                        .invoke('text')
                        .then((newSelectedQuantity) => {
                          cy.print({
                            title: 'LOG',
                            message: `Product size was changed from ${QUANTITY_BEFORE} to ${newSelectedQuantity}`,
                            type: 'warning',
                          })
                        })
                    })
                })
            } else {
              cy.print({
                title: 'LOG',
                message: 'No other enabled quantity available to select.',
                type: 'warning',
              })
            }
          })
      })
  })

  it('Verify that product has been removed from cart - check empty cart', () => {
    const EMPTY_CART_IMG_ORSAY = '[src="/images/pages/checkout/empty-cart.png"]'
    const EMPTY_CART_IMG_GAP = '[src="/images/pages/checkout/empty-cart.svg"]'
    const EMPTY_CART_IMG_UA = '[data-src="/images/icons/shopping-bag.svg"]'

    cy.setUpCart()

    cy.getByTestId(CART_SELECTORS.CHECKOUT_CART_SECTION).should('exist')

    cy.get(CART_SELECTORS.ARTICLE_IN_CART).should('exist')

    cy.getByTestId(CART_SELECTORS.REMOVE_PRODUCT_FROM_CART_BUTTON).click()

    cy.wait('@waitAfterDeleteProduct')
      .its('response.statusCode')
      .should('eq', 200)

    cy.get(CART_SELECTORS.ARTICLE_IN_CART).should('not.exist')

    cy.getEnvironment().then((env) => {
      let emptyCartImgSelector
      switch (env) {
        case 'orsay':
          emptyCartImgSelector = EMPTY_CART_IMG_ORSAY
          break
        case 'gap':
          emptyCartImgSelector = EMPTY_CART_IMG_GAP
          break
        case 'underarmour':
          emptyCartImgSelector = EMPTY_CART_IMG_UA
          break
      }
      cy.get(emptyCartImgSelector).should('be.visible')
    })

    cy.url().should('include', '/checkout/empty-cart')
  })

  it('Add gift box from cart to cart', () => {
    //only on UA

    const GIFT_BOX_OFFER =
      'article[class="grid grid-cols-3 md:grid-cols-[228px_1fr] auto-rows-min relative text-sm border-b border-gray-500  bg-gray-300 pt-6 px-2 sm:py-4 sm:px-4"]'

    if (Cypress.config().baseUrl.includes('underarmour')) {
      cy.setUpCart()

      cy.getByTestId(CART_SELECTORS.CHECKOUT_CART_SECTION)
        .find(GIFT_BOX_OFFER)
        .find('button')
        .click()

      cy.getByTestId(CART_SELECTORS.CHECKOUT_CART_SECTION)
        .find('article')
        .should('have.length', 2)

      cy.print({
        title: 'LOG',
        message: `Gift box was add to cart`,
        type: 'warning',
      })
    } else {
      cy.print({
        title: 'LOG',
        message: `No boxes are available, it´s not UA url.`,
        type: 'warning',
      })
    }
  })
})
