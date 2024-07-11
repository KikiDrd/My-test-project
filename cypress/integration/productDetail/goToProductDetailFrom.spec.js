import { CART_SELECTORS, SELECTORS } from '../../support/selectors/selectors'

const SEARCH_STRING = Cypress.env('searchString')

describe('Go to product detail from', () => {
  it('Go to PD from wishlist', () => {
    const WISHLIST_BUTTON_PRODUCT_DETAIL =
      'wish-list-add-to-wish-list-as-box-button'
    const WISHLIST_ICON_HEADER =
      'header [data-testid="header-wishlist-counter-link"]'
    const ARTICLE_WISHLIST_HREF =
      '[data-testid="product-list-product-card-vertical-article"] a'

    cy.goToProductDetailFromCatalog()

    cy.getByTestId(WISHLIST_BUTTON_PRODUCT_DETAIL)
      .first()
      .click({ force: true })
    cy.wait('@addToWishlist').its('response.statusCode').should('eq', 200)

    cy.get(WISHLIST_ICON_HEADER).first().click()
    cy.wait('@goToWishlist').its('response.statusCode').should('eq', 200)

    cy.randomDataArticle().then((wishlistArticle) => {
      cy.print({
        title: 'LOG',
        message: `Href is: ${wishlistArticle.href}`,
        type: 'warning',
      })

      cy.print({
        title: 'LOG',
        message: `Product name: ${wishlistArticle.name}`,
        type: 'warning',
      })

      cy.get(ARTICLE_WISHLIST_HREF).first().click()
      cy.wait('@productDetail').its('response.statusCode').should('eq', 200)

      cy.dataArticleFromPD().then((detailArticle) => {
        cy.print({
          title: 'LOG',
          message: `Product name is: ${detailArticle.name}`,
          type: 'warning',
        })

        expect(wishlistArticle.name).equal(detailArticle.name)
        cy.verifyUrlContains(wishlistArticle.href)
      })
    })
  })

  it('Go to PD from PD banner complete your outfit', () => {
    cy.goToProductDetailFromCatalog()

    cy.get('body').then((body) => {
      let completeYourOutfit = body.find(SELECTORS.PRODUCT_COMPLETE_OUTFIT)
      if (completeYourOutfit.length > 0) {
        const FIRST_PRODUCT = completeYourOutfit.first()

        cy.dataArticle(FIRST_PRODUCT).then((completeOutfitArticle) => {
          cy.print({
            title: 'LOG',
            message: `Href is: ${completeOutfitArticle.href}`,
            type: 'warning',
          })

          cy.print({
            title: 'LOG',
            message: `Product name: ${completeOutfitArticle.name}`,
            type: 'warning',
          })

          cy.wrap(FIRST_PRODUCT).click().wait('@waitForPD')
          cy.wait(3000)

          cy.dataArticleFromPD().then((detailArticle) => {
            cy.print({
              title: 'LOG',
              message: `Href is: ${detailArticle.url}`,
              type: 'warning',
            })

            cy.print({
              title: 'LOG',
              message: `Product name: ${detailArticle.name}`,
              type: 'warning',
            })

            expect(completeOutfitArticle.name).equal(detailArticle.name)
            cy.verifyUrlContains(completeOutfitArticle.href)
          })
        })
      } else {
        cy.print({
          title: 'LOG',
          message: `Banner complete your outfit doesn´t exist.`,
          type: 'warning',
        })
      }
    })
  })

  it('Go to PD from PD banner similar products', () => {
    cy.goToProductDetailFromCatalog()
    cy.wait(2000)

    cy.get('body').then((body) => {
      let similarProducts = body.find(SELECTORS.PRODUCT_SIMILAR_PRODUCTS)
      if (similarProducts.length > 0) {
        const FIRST_PRODUCT = similarProducts.first()

        cy.dataArticle(FIRST_PRODUCT).then((similarProducts) => {
          cy.print({
            title: 'LOG',
            message: `Href is: ${similarProducts.href}`,
            type: 'warning',
          })

          cy.print({
            title: 'LOG',
            message: `Product name: ${similarProducts.name}`,
            type: 'warning',
          })

          cy.wrap(FIRST_PRODUCT).click().wait('@waitForPD')
          cy.wait(3000)

          cy.dataArticleFromPD().then((detailArticle) => {
            cy.print({
              title: 'LOG',
              message: `Href is: ${detailArticle.url}`,
              type: 'warning',
            })

            cy.print({
              title: 'LOG',
              message: `Product name: ${detailArticle.name}`,
              type: 'warning',
            })

            expect(similarProducts.name).equal(detailArticle.name)
            cy.verifyUrlContains(similarProducts.href)
          })
        })
      } else {
        cy.print({
          title: 'LOG',
          message: `Banner similar products doesn´t exist.`,
          type: 'warning',
        })
      }
    })
  })

  it('Go to PD from top bar above header banner', () => {
    const ABOVE_HEADER_BANNER =
      '[data-testid="top-bar-above-header-banner-div"]'
    const ABOVE_HEADER_BANNER_HREF =
      '[data-testid="top-bar-above-header-banner-div"] a'

    cy.get('body').then((body) => {
      let aboveHeaderBanner = body.find(ABOVE_HEADER_BANNER)
      if (aboveHeaderBanner.length > 0) {
        cy.get(ABOVE_HEADER_BANNER_HREF).click()

        cy.get('body').then((body2) => {
          let catalogList = body2.find(SELECTORS.CATALOG_LIST)
          if (catalogList.length > 0) {
            cy.productCheckCatalogWithPD()
          } else {
            cy.print({
              title: 'LOG',
              message: `Top bar above header banner doesn´t link to products.`,
              type: 'warning',
            })
          }
        })
      } else {
        cy.print({
          title: 'LOG',
          message: `Top bar above header banner doesn´t exist.`,
          type: 'warning',
        })
      }
    })
  })

  it('Go to PD from below header banner', () => {
    cy.get('body').then((body) => {
      let belowHeaderBanner = body.find(SELECTORS.BELOW_HEADER_BANNER)
      if (belowHeaderBanner.length > 0) {
        cy.get(SELECTORS.BELOW_HEADER_BANNER_HREF).click()

        cy.get('body').then((body2) => {
          let catalogList = body2.find(SELECTORS.CATALOG_LIST)
          if (catalogList.length > 0) {
            cy.productCheckCatalogWithPD()
          } else {
            cy.print({
              title: 'LOG',
              message: `Below header banner doesn´t link to products.`,
              type: 'warning',
            })
          }
        })
      } else {
        cy.print({
          title: 'LOG',
          message: `Below header banner doesn´t exist.`,
          type: 'warning',
        })
      }
    })
  })

  it('Go to PD from catalog', () => {
    cy.goToCategory()

    cy.productCheckCatalogWithPD()
  })

  it('Go to PD from search catalog', () => {
    cy.get(SELECTORS.INPUT_SEARCH).type(SEARCH_STRING)
    cy.get(SELECTORS.INPUT_SEARCH).first().type('{enter}')

    cy.wait('@waitAfterSearch').its('response.statusCode').should('eq', 200)

    cy.get(SELECTORS.INPUT_SEARCH).clear()

    cy.productCheckCatalogWithPD()
  })

  it('Go to PD from search whisperbox', () => {
    const WHISPER_PRODUCT =
      '[data-testid="autocomplete-desktop-div"] article[data-testid="autocomplete-desktop-product-card-vertical"]'

    cy.get(SELECTORS.INPUT_SEARCH).type(SEARCH_STRING)
    cy.wait(2000)

    cy.get('body').then((body) => {
      let whisperProducts = body.find(WHISPER_PRODUCT)
      if (whisperProducts.length > 0) {
        const FIRST_PRODUCT = whisperProducts.first()

        cy.dataArticle(FIRST_PRODUCT).then((whisperProducts) => {
          cy.print({
            title: 'LOG',
            message: `Href is: ${whisperProducts.href}`,
            type: 'warning',
          })

          cy.print({
            title: 'LOG',
            message: `Product name: ${whisperProducts.name}`,
            type: 'warning',
          })

          cy.wrap(FIRST_PRODUCT).click().wait('@waitForPD')
          cy.wait(3000)

          cy.dataArticleFromPD().then((detailArticle) => {
            cy.print({
              title: 'LOG',
              message: `Href is: ${detailArticle.url}`,
              type: 'warning',
            })

            cy.print({
              title: 'LOG',
              message: `Product name: ${detailArticle.name}`,
              type: 'warning',
            })

            expect(whisperProducts.name).equal(detailArticle.name)
            cy.verifyUrlContains(whisperProducts.href)
          })
        })
      }
    })
  })

  it('Go to PD from flycart', () => {
    const FLY_CART_ARTICLE = '[data-testid="fly-cart-aside"] article'
    const FLY_CART_ARTICLE_HREF =
      '[data-testid="fly-cart-aside"] article [data-testid="product-card-go-to-product-link"]'

    cy.goToProductDetailFromCatalog()

    cy.addProductToCart()

    cy.get('body').then((body) => {
      let flyCartArticle = body.find(FLY_CART_ARTICLE)
      const FIRST_PRODUCT = flyCartArticle.first()

      cy.get(CART_SELECTORS.FLY_CART).should('be.visible')

      cy.dataArticle(FIRST_PRODUCT).then((flyCartArticle) => {
        cy.print({
          title: 'LOG',
          message: `Href is: ${flyCartArticle.href}`,
          type: 'warning',
        })

        cy.print({
          title: 'LOG',
          message: `Product name: ${flyCartArticle.name}`,
          type: 'warning',
        })

        cy.get(FLY_CART_ARTICLE_HREF).click().wait('@waitForPD')
        cy.wait(3000)

        cy.dataArticleFromPD().then((detailArticle) => {
          cy.print({
            title: 'LOG',
            message: `Href is: ${detailArticle.url}`,
            type: 'warning',
          })

          cy.print({
            title: 'LOG',
            message: `Product name: ${detailArticle.name}`,
            type: 'warning',
          })

          expect(flyCartArticle.name).equal(detailArticle.name)
          cy.verifyUrlContains(flyCartArticle.href)
        })
      })
    })
  })

  it('Go to PD from cart', () => {
    const PRODUCT_IN_CART = '[data-testid="checkout-cart-section"] article'
    const GO_TO_PRODUCT_LINK_NAME =
      '[data-testid="checkout-cart-section"] article a'

    cy.setUpCart()
    cy.wait(2000)

    cy.get('body').then((body) => {
      let cartProducts = body.find(PRODUCT_IN_CART)
      if (cartProducts.length > 0) {
        const FIRST_PRODUCT = cartProducts.first()

        cy.dataArticle(FIRST_PRODUCT).then((cartProducts) => {
          cy.print({
            title: 'LOG',
            message: `Href is: ${cartProducts.href}`,
            type: 'warning',
          })

          cy.print({
            title: 'LOG',
            message: `Product name: ${cartProducts.name}`,
            type: 'warning',
          })

          cy.get(GO_TO_PRODUCT_LINK_NAME).click().wait('@waitForPD')

          cy.dataArticleFromPD().then((detailArticle) => {
            cy.print({
              title: 'LOG',
              message: `Href is: ${detailArticle.url}`,
              type: 'warning',
            })

            cy.print({
              title: 'LOG',
              message: `Product name: ${detailArticle.name}`,
              type: 'warning',
            })

            expect(cartProducts.name).equal(detailArticle.name)
            cy.verifyUrlContains(cartProducts.href)
          })
        })
      }
    })
  })

  it('Go to PD from my order in user account', () => {
    const USER_ACCOUNT_MY_ORDER = '[data-testid="user-profile-my-orders-link"]'
    const MY_ORDER_CREATED_ORDER = '[data-testid="account-order-link"]'
    const MY_ORDER_ARTICLE_SECTION = 'section [data-testid="order-summary-div"]'
    const MY_ORDER_ARTICLE_HREF = '[data-testid="order-summary-div"] a'

    cy.logInFromHeader()
    cy.wait(2000)

    cy.get(USER_ACCOUNT_MY_ORDER).click()
    cy.wait('@waitMyOrder').its('response.statusCode').should('eq', 200)
    cy.wait(2000)

    cy.get('body').then((body) => {
      let myOrder = body.find(MY_ORDER_CREATED_ORDER)
      if (myOrder.length > 0) {
        cy.get(MY_ORDER_CREATED_ORDER).first().click()
        cy.wait('@waitOrderDetail').its('response.statusCode').should('eq', 200)
        cy.wait(2000)

        cy.get(MY_ORDER_ARTICLE_SECTION).then((myOrderProducts) => {
          if (myOrderProducts.length > 0) {
            const FIRST_PRODUCT = myOrderProducts.first()

            cy.dataArticle(FIRST_PRODUCT).then((myOrderProducts) => {
              cy.print({
                title: 'LOG',
                message: `Href is: ${myOrderProducts.href}`,
                type: 'warning',
              })

              cy.get(MY_ORDER_ARTICLE_HREF)
                .first()
                .click({ force: true })
                .wait('@waitForPD')

              cy.dataArticleFromPD().then((detailArticle) => {
                cy.print({
                  title: 'LOG',
                  message: `Href is: ${detailArticle.url}`,
                  type: 'warning',
                })

                cy.verifyUrlContains(myOrderProducts.href)
              })
            })
          }
        })
      } else {
        cy.print({
          title: 'LOG',
          message: `User doesn´t have any historical order.`,
          type: 'warning',
        })
      }
    })
  })
})

Cypress.Commands.add('productCheckCatalogWithPD', () => {
  cy.get(SELECTORS.ARTICLE_CATALOG)
    .first()
    .then((FIRST_PRODUCT) => {
      cy.dataArticle(FIRST_PRODUCT).then((catalogArticle) => {
        cy.print({
          title: 'LOG',
          message: `Href is: ${catalogArticle.href}`,
          type: 'warning',
        })

        cy.print({
          title: 'LOG',
          message: `Product name: ${catalogArticle.name}`,
          type: 'warning',
        })

        cy.wrap(FIRST_PRODUCT).click()
        cy.wait('@productDetail').its('response.statusCode').should('eq', 200)

        cy.dataArticleFromPD().then((detailArticle) => {
          cy.print({
            title: 'LOG',
            message: `Product name is: ${detailArticle.name}`,
            type: 'warning',
          })

          expect(catalogArticle.name).equal(detailArticle.name)
          cy.verifyUrlContains(catalogArticle.href)
        })
      })
    })
})
