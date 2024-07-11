import { users } from '../../../fixtures/users'
import { SELECTORS, ACCOUNT_SELECTORS } from '../../selectors/selectors'
import { FORM_SELECTORS, FORM_NAMES } from '../../selectors/formInputSelectors'

Cypress.Commands.add('logUserIn', (userName) => {
  const user = users[userName]

  const formDataLoginSuccess = {
    email: user.email,
    password: user.password,
  }

  cy.get(FORM_SELECTORS.FORM_SIGN_IN).should('be.visible')

  cy.fillForm(FORM_NAMES.SIGN_IN, formDataLoginSuccess)

  cy.get(SELECTORS.BUTTON_SUBMIT_LOGIN).click()
  cy.wait('@waitAfterLogin').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('FillLoginDataWithoutSubmit', (userName) => {
  const user = users[userName]

  const formDataLoginSuccess = {
    email: user.email,
    password: user.password,
  }

  cy.get(FORM_SELECTORS.FORM_SIGN_IN).should('be.visible')

  cy.fillForm(FORM_NAMES.SIGN_IN, formDataLoginSuccess)
})

Cypress.Commands.add('goLoginHeader', () => {
  cy.getByTestId(SELECTORS.LINK_LOGIN_HEADER).click()
  cy.get(FORM_SELECTORS.FORM_SIGN_IN).should('be.visible')
  //cy.wait('@loginFormHead').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('logInFromHeader', () => {
  cy.goLoginHeader()
  cy.logUserIn('testing1')

  cy.wait('@userAccountOverview').its('response.statusCode').should('eq', 200)
  cy.wait(3500)
  cy.reload()
})

Cypress.Commands.add('logout', () => {
  cy.getByTestId(ACCOUNT_SELECTORS.LINK_MY_ACCOUNT).click({ force: true })
  cy.wait('@userAccountOverviewHead')
    .its('response.statusCode')
    .should('eq', 200)
  cy.getByTestId(ACCOUNT_SELECTORS.LOG_OUT).click()
  cy.wait('@waitLogOut').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('logInLogOut', () => {
  cy.logUserIn('testing1')

  cy.wait('@userAccountOverview').its('response.statusCode').should('eq', 200)
  cy.wait(1000)
  cy.reload()
  cy.wait('@userAccountOverview').its('response.statusCode').should('eq', 200)

  cy.getByTestId(ACCOUNT_SELECTORS.LOG_OUT).click()

  cy.wait('@waitLogOut').its('response.statusCode').should('eq', 200)
})
