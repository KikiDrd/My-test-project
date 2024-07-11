import randomElement from '../../../utilities/randomElement'

Cypress.Commands.add('goToProductDetailFromCatalog', () => {
  const PRODUCT_DETAIL = '.relative > a.w-full'
  const PRODUCT_DETAIL_CONTENT = '#add-to-cart'

  cy.goToSubcategory()

  randomElement(PRODUCT_DETAIL)

  cy.wait('@productDetail').its('response.statusCode').should('eq', 200)

  cy.get(PRODUCT_DETAIL_CONTENT, { timeout: 10000 }).should('be.visible') // page render timeout
})

Cypress.Commands.add('goToProductDetailFromCategory', () => {
  const MENU_CATEGORY = Object.values(Cypress.env('url').menu.withSubCategory)
  const RANDOM_MENU_CATEGORY =
    MENU_CATEGORY[Math.floor(Math.random() * MENU_CATEGORY.length)]

  cy.visit(RANDOM_MENU_CATEGORY)
  cy.goToProductDetailFromCatalog()
})

Cypress.Commands.add('randomDataArticle', () => {
  return cy
    .getByTestId('product-list-product-card-vertical-article')
    .then((elements) => {
      const randomIndex = elements.eq(
        Math.floor(Math.random() * elements.length)
      )

      return {
        dataCode: randomIndex.attr('data-code'), // article code
        href: randomIndex.find('a').attr('href'), // article href
        name: randomIndex.find('h2').text(), // article name
      }
    })
})

Cypress.Commands.add('dataArticleFromPD', () => {
  return cy.location('href').then((url) => {
    return cy.get('[data-label="product details"]').then((elements) => {
      const randomIndex = elements.eq(
        Math.floor(Math.random() * elements.length)
      )

      return {
        name: randomIndex.find('h1').first().text(), // article name
        url: url,
      }
    })
  })
})

Cypress.Commands.add('dataArticle', (FIRST_PRODUCT) => {
  //catalog, banners
  return {
    dataCode: FIRST_PRODUCT.attr('data-code'), // article code
    href: FIRST_PRODUCT.find('a').attr('href'), // article href
    name: FIRST_PRODUCT.find('h2').text(), // article name
  }
})

Cypress.Commands.add('getProductName', () => {
  // from PD
  const PRODUCT_NAME = '.mt-1 h1'
  const PRODUCT_NAME_FLY_CART =
    '[data-testid="product-card-go-to-product-link"] h2'

  cy.get(PRODUCT_NAME)
    .invoke('text')
    .then((productName) => {
      const productNameText = productName

      cy.print({
        title: 'LOG',
        message: `Product name is: ${productName}`,
        type: 'warning',
      })

      cy.wrap(productNameText).as('productName')

      cy.get('@productName').then((productName) => {
        cy.get(PRODUCT_NAME_FLY_CART)
          .invoke('text')
          .should('contain', productName)
      })
    })
})
