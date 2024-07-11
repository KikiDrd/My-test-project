import { SELECTORS } from '../../support/selectors/selectors'

describe('Help page link status', () => {
  it('Link status - Help menu', () => {
    const FAQ_MENU_LINKS = '[data-testid="static-pages-sidebar-ul"]'

    cy.getByTestId(SELECTORS.LINK_FAQ_HEADER).click()

    cy.checkLinks(FAQ_MENU_LINKS)
  })

  it('Link status - FAQ', () => {
    const FAQ = '[data-testid="static-pages-static-page-div"]'
    const FAQ_GROUP_BUTTON = '[data-testid="faq-group-button"]'

    cy.visit(Cypress.env('url').help.faq)

    cy.get(FAQ_GROUP_BUTTON)
      .each(($button) => {
        cy.wrap($button).click()
        cy.wrap($button).closest('details').should('have.attr', 'open')
      })
      .then(() => {
        cy.checkLinks(FAQ)
      })
  })

  it('Link status - Terms and conditions', () => {
    const PAR_TERMS_AND_CONDITIONS =
      '[data-testid="static-pages-static-page-div"]'

    cy.visit(Cypress.env('url').help.termsAndConditions)

    cy.checkLinks(PAR_TERMS_AND_CONDITIONS)
  })

  it('Link status - Terms and conditions - store', () => {
    if (
      Cypress.env('url') &&
      Cypress.env('url').help &&
      Cypress.env('url').help.termsAndConditionsStore
    ) {
      const PAR_TERMS_AND_CONDITIONS_STORE =
        '[data-testid="static-pages-static-page-div"]'

      cy.visit(Cypress.env('url').help.termsAndConditionsStore)

      cy.checkLinks(PAR_TERMS_AND_CONDITIONS_STORE)
    } else {
      cy.print({
        title: 'LOG',
        message: `Link Terms and conditions - store is not defined.`,
        type: 'warning',
      })
    }
  })

  it('Link status - Protection of personal data', () => {
    const PAR_PERSONAL_DATA = '[data-testid="static-pages-static-page-div"]'

    cy.visit(Cypress.env('url').help.protectionOfPersonalData)

    cy.checkLinks(PAR_PERSONAL_DATA)
  })

  it('Link status - Reclamation', () => {
    const PAR_RECLAMATION = '[data-testid="static-pages-static-page-div"]'

    cy.visit(Cypress.env('url').help.reclamation)

    cy.checkLinks(PAR_RECLAMATION)
  })

  it('Link status - Returning goods', () => {
    const PAR_RETURNING_GOODS = '[data-testid="static-pages-static-page-div"]'

    cy.visit(Cypress.env('url').help.returningGoods)

    cy.checkLinks(PAR_RETURNING_GOODS)
  })

  it('Link status - Set cookies', () => {
    if (
      Cypress.env('url') &&
      Cypress.env('url').help &&
      Cypress.env('url').help.setCookies
    ) {
      const PAR_SET_COOKIES = '[data-testid="static-pages-static-page-div"]'

      cy.visit(Cypress.env('url').help.setCookies)

      cy.checkLinks(PAR_SET_COOKIES)
    } else {
      cy.print({
        title: 'LOG',
        message: `Link Set cookies is not defined.`,
        type: 'warning',
      })
    }
  })

  it('Link status - Installment payments', () => {
    if (
      Cypress.env('url') &&
      Cypress.env('url').help &&
      Cypress.env('url').help.installmentPayments
    ) {
      const INSTALLMENT_PAYMENTS =
        '[data-testid="static-pages-static-page-div"]'

      cy.visit(Cypress.env('url').help.installmentPayments)

      cy.checkLinks(INSTALLMENT_PAYMENTS)
    } else {
      cy.print({
        title: 'LOG',
        message: `Link Installment payments is not defined.`,
        type: 'warning',
      })
    }
  })

  it('Link status - Shipping and payment', () => {
    const PAR_SHIPPING_PAYMENT = '[data-testid="static-pages-static-page-div"]'

    cy.visit(Cypress.env('url').help.shippingAndPayment)

    cy.checkLinks(PAR_SHIPPING_PAYMENT)
  })
})
