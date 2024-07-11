import { SELECTORS } from '../../support/selectors/selectors'
import { FILTRATION_SELECTORS } from '../../support/selectors/filtrationSelectors'

describe('Search box and whisper box', () => {
  it('Search box interaction', () => {
    const SEARCH_STRING = Cypress.env('searchString')
    cy.get(SELECTORS.INPUT_SEARCH)
      .should('be.visible')
      .should('have.attr', 'placeholder')
    cy.get(SELECTORS.INPUT_SEARCH)
      .type(SEARCH_STRING)
      .should('have.value', SEARCH_STRING)
    cy.getByTestId(SELECTORS.WHISPER_BOX).should('be.visible')
    cy.get(SELECTORS.INPUT_SEARCH).first().type('{enter}')

    cy.wait('@waitAfterSearch').its('response.statusCode').should('eq', 200)

    cy.url().should('match', /\/\w+\?q=/) // url contain expression for search

    cy.get(SELECTORS.INPUT_SEARCH).clear({ force: true })
    cy.getByTestId(SELECTORS.SEARCH_ICON_MAGNIFIER).should('be.visible').click()
    cy.url().should('match', /\/\w+\?q=/)

    cy.print({ title: 'LOG', message: 'TEST: SUCCESS', type: 'warning' })
  })

  it('Searching by article code', () => {
    cy.goToCategory()

    cy.randomDataArticle().then((randomArticle) => {
      cy.print({
        title: 'LOG',
        message: `Product code is: ${randomArticle.dataCode}`,
        type: 'warning',
      })
      cy.print({
        title: 'LOG',
        message: `href is: ${randomArticle.href}`,
        type: 'warning',
      })
      cy.print({
        title: 'LOG',
        message: `Product name: ${randomArticle.name}`,
        type: 'warning',
      })

      cy.get(SELECTORS.INPUT_SEARCH).type(randomArticle.dataCode)

      cy.getByTestId(SELECTORS.WHISPER_BOX)
        .should('be.visible')
        .find(`article[data-code="${randomArticle.dataCode}"]`)
        .find(`a[href="${randomArticle.href}"]`)
        .first()
        .click()

      cy.url().should('include', `${randomArticle.href}`)

      cy.print({
        title: 'LOG',
        message: `Test success - current url contain: ${randomArticle.href}`,
        type: 'warning',
      })
    })
  })

  it('Searching by article name', () => {
    const PRODUCT_PARAMETERS = 'product-detail-info-as-tabs-parameters-tab'
    const PRODUCT_NAME = '.mt-1 h1' //on product detail

    cy.goToCategory()

    // select random product item from catalog and get data about code, name, href
    cy.randomDataArticle().then((randomArticle) => {
      cy.print({
        title: 'LOG',
        message: `Product code is: ${randomArticle.dataCode}`,
        type: 'warning',
      })
      cy.print({
        title: 'LOG',
        message: `href is: ${randomArticle.href}`,
        type: 'warning',
      })
      cy.print({
        title: 'LOG',
        message: `Product name: ${randomArticle.name}`,
        type: 'warning',
      })

      cy.get(SELECTORS.INPUT_SEARCH).type(randomArticle.name)

      cy.getByTestId(SELECTORS.SEARCH_ICON_MAGNIFIER).click()

      cy.wait('@waitAfterSearch').its('response.statusCode').should('eq', 200)
      cy.wait(2000)

      cy.get(`article[data-code="${randomArticle.dataCode}"]`).click()

      cy.wait('@waitForPD').its('response.statusCode').should('eq', 200)

      cy.url().should('include', `${randomArticle.href}`)

      cy.getByTestId(PRODUCT_PARAMETERS).click({ force: true })

      cy.get(PRODUCT_NAME).first().contains(`${randomArticle.name}`)

      cy.print({
        title: 'LOG',
        message: `Test success - name are equal: ${randomArticle.name}`,
        type: 'warning',
      })
      cy.print({
        title: 'LOG',
        message: `Test success - current url contain: ${randomArticle.href}`,
        type: 'warning',
      })
    })
  })

  it('Product not found', () => {
    cy.get(SELECTORS.INPUT_SEARCH)
      .type('blabla')
      .should('have.value', 'blabla')
      .first()
      .type('{enter}')

    cy.wait('@waitAfterSearch').its('response.statusCode').should('eq', 200)

    cy.url().should('match', /\/\w+\?q=/)

    cy.scrollTo('bottom')

    cy.getByTestId(FILTRATION_SELECTORS.TOTAL_SEARCH_ITEM)
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text).to.contain('0')
      })

    cy.print({
      title: 'LOG',
      message: `Test success: Article not found`,
      type: 'warning',
    })
  })

  it('Search no result', () => {
    const BUTTON_ERASE_FILTER = cy.get('button[type="button"]').eq(4)

    cy.get(SELECTORS.INPUT_SEARCH).type('{enter}')

    cy.wait('@waitAfterSearch').its('response.statusCode').should('eq', 200)

    cy.url().should('match', /\/\w+\?q=/)

    cy.get(SELECTORS.SEARCH_NO_RESULT).should('be.visible')

    BUTTON_ERASE_FILTER.should('be.visible')

    cy.getByTestId(FILTRATION_SELECTORS.TOTAL_SEARCH_ITEM)
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        expect(text).to.contain('0')
      })

    cy.print({
      title: 'LOG',
      message: `Test success: Find no result`,
      type: 'warning',
    })
  })
})
