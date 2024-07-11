import {
  SELECTORS,
  ACCOUNT_SELECTORS,
} from '../../../support/selectors/selectors'
import { FORM_SELECTORS } from '../../../support/selectors/formInputSelectors'
import { FORM_NAMES } from '../../../support/selectors/formInputSelectors'

const formDataNew = {
  oldPassword: Cypress.env('password'),
  newPassword: Cypress.env('passwordChange'),
  newPasswordRepeat: Cypress.env('passwordChange'),
}

const formDataOld = {
  oldPassword: Cypress.env('passwordChange'),
  newPassword: Cypress.env('password'),
  newPasswordRepeat: Cypress.env('password'),
}

const formDataSignInNewPassword = {
  email: Cypress.env('login'),
  password: Cypress.env('passwordChange'),
}

describe('Change password in user account', () => {
  it('Failed change password - empty form', () => {
    cy.goToChangePassword()

    cy.get(ACCOUNT_SELECTORS.OLD_PASSWORD).invoke('val', '').should('be.empty')
    cy.get(ACCOUNT_SELECTORS.NEW_PASSWORD).invoke('val', '').should('be.empty')
    cy.get(ACCOUNT_SELECTORS.NEW_REPEAT_PASSWORD)
      .invoke('val', '')
      .should('be.empty')

    cy.get(SELECTORS.BUTTON_SUBMIT_CHANGE_PASSWORD).click()

    cy.get(ACCOUNT_SELECTORS.OLD_PASSWORD).should(
      'have.class',
      'border-danger-500'
    )
    cy.get(ACCOUNT_SELECTORS.NEW_PASSWORD).should(
      'have.class',
      'border-danger-500'
    )
    cy.get(ACCOUNT_SELECTORS.NEW_REPEAT_PASSWORD).should(
      'have.class',
      'border-danger-500'
    )
  })

  it('Change old password for new password', () => {
    cy.goToChangePassword()

    cy.get(FORM_SELECTORS.FORM_CHANGE_PASSWORD).should('be.visible')
    cy.fillForm(FORM_NAMES.CHANGE_PASSWORD, formDataNew)

    cy.get(SELECTORS.BUTTON_SUBMIT_CHANGE_PASSWORD).click()
    cy.wait('@waitChangePasswordDone')
      .its('response.statusCode')
      .should('eq', 200)

    cy.get(SELECTORS.DIALOG_POPUP).eq(0).should('be.visible')

    cy.print({
      title: 'LOG',
      message: `Change password was success`,
      type: 'warning',
    })

    cy.getByTestId(SELECTORS.DIALOG_CLOSE_BUTTON).click()

    cy.getByTestId(ACCOUNT_SELECTORS.LOG_OUT).click()
    cy.wait('@waitLogOut').its('response.statusCode').should('eq', 200)
  })

  it('Login with new password', () => {
    cy.loginWithNewPassword()

    cy.print({
      title: 'LOG',
      message: `Login with new password was success`,
      type: 'warning',
    })

    cy.getByTestId(ACCOUNT_SELECTORS.LOG_OUT).click()
    cy.wait('@waitLogOut').its('response.statusCode').should('eq', 200)
  })

  it('Change new password for old password', () => {
    cy.loginWithNewPassword()

    cy.getByTestId(ACCOUNT_SELECTORS.USER_MENU_CHANGE_PASSWORD).click()
    cy.wait('@waitChangePasswordPage')
      .its('response.statusCode')
      .should('eq', 200)

    cy.get(FORM_SELECTORS.FORM_CHANGE_PASSWORD).should('be.visible')
    cy.fillForm(FORM_NAMES.CHANGE_PASSWORD, formDataOld)

    cy.get(SELECTORS.BUTTON_SUBMIT_CHANGE_PASSWORD).click()
    cy.wait('@waitChangePasswordDone')
      .its('response.statusCode')
      .should('eq', 200)

    cy.get(SELECTORS.DIALOG_POPUP).eq(0).should('be.visible')

    cy.print({
      title: 'LOG',
      message: `Change password for old password was success`,
      type: 'warning',
    })

    cy.getByTestId(SELECTORS.DIALOG_CLOSE_BUTTON).click()

    cy.getByTestId(ACCOUNT_SELECTORS.LOG_OUT).click()
    cy.wait('@waitLogOut').its('response.statusCode').should('eq', 200)

    cy.getByTestId(SELECTORS.LINK_LOGIN_HEADER).first().click()
    cy.wait('@loginFormHead').its('response.statusCode').should('eq', 200)

    cy.logUserIn('testing1')

    cy.print({
      title: 'LOG',
      message: `Login with old password was success`,
      type: 'warning',
    })
  })
})

Cypress.Commands.add('loginWithNewPassword', () => {
  cy.getByTestId(SELECTORS.LINK_LOGIN_HEADER).first().click()
  cy.wait('@loginFormHead').its('response.statusCode').should('eq', 200)

  cy.get(FORM_SELECTORS.FORM_SIGN_IN).should('be.visible')
  cy.fillForm(FORM_NAMES.SIGN_IN, formDataSignInNewPassword)

  cy.get(SELECTORS.BUTTON_SUBMIT_LOGIN).click()
  cy.wait('@waitAfterLogin').its('response.statusCode').should('eq', 200)
})
