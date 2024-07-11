import {
  SELECTORS,
  ACCOUNT_SELECTORS,
  CART_SELECTORS,
} from '../../../support/selectors/selectors'

describe('Login success', () => {
  it('Verify login functionality from header link', () => {
    cy.goLoginHeader()

    cy.logInLogOut()
  })

  it('Verify login functionality from registration link', () => {
    cy.getEnvironment().then((env) => {
      switch (env) {
        case 'orsay':
          const LINK_LOGIN_FROM_REGISTRATION = 'sign-up-go-to-page-link'
          cy.getByTestId(SELECTORS.LINK_REGISTRATION_HEADER).click()
          cy.wait('@waitRegistrationHead')
            .its('response.statusCode')
            .should('eq', 200)
          cy.wait(1000)
          cy.getByTestId(LINK_LOGIN_FROM_REGISTRATION).first().click()
          cy.wait('@loginFormHead').its('response.statusCode').should('eq', 200)
          cy.logInLogOut()
          return

        case 'gap':
          cy.print({
            title: 'LOG',
            message: 'This test is not for this environment',
            type: 'warning',
          })
          return

        case 'underarmour':
          cy.print({
            title: 'LOG',
            message: 'This test is not for this environment',
            type: 'warning',
          })
          return
      }
    })
  })

  it('Verify login functionality from cart link', () => {
    const POPUP_LOGIN = '[id^=headlessui-dialog-panel]'
    const LOGO_BRAND = '[data-src*="/images/company-logo/logo.svg"]'

    cy.setUpCart()

    cy.getByTestId(CART_SELECTORS.CART_LOGIN_BUTTON).click()

    cy.get(POPUP_LOGIN).should('be.visible')

    cy.FillLoginDataWithoutSubmit('testing1')

    cy.get(SELECTORS.FORM_SUBMIT).last().click()

    cy.wait('@waitAfterLogin').its('response.statusCode').should('eq', 200)
    cy.wait('@cartContent').its('response.statusCode').should('eq', 200)

    cy.get(LOGO_BRAND).should('exist').click()

    cy.getByTestId(ACCOUNT_SELECTORS.LINK_MY_ACCOUNT)
      .should('be.visible')
      .click()

    cy.wait('@userAccountOverview').its('response.statusCode').should('eq', 200)

    cy.getByTestId(ACCOUNT_SELECTORS.LOG_OUT).click()
  })

  it('Verify login functionality from forget password link', () => {
    const LINK_LOGIN_FROM_FORGOTTEN_PASSWORD = '.underline.pl-1'

    cy.goLoginHeader()

    cy.getByTestId(SELECTORS.LINK_FORGOTTEN_PASSWORD_SIGN_IN).click()

    cy.wait('@forgottenPasswordPage')
      .its('response.statusCode')
      .should('eq', 200)
    cy.get(LINK_LOGIN_FROM_FORGOTTEN_PASSWORD).click()

    cy.logInLogOut()
  })
})
