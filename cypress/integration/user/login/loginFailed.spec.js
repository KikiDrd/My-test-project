import { SELECTORS } from '../../../support/selectors/selectors'
import { FORM_SELECTORS } from '../../../support/selectors/formInputSelectors'
import { FORM_NAMES } from '../../../support/selectors/formInputSelectors'

const formDataSignInWrongPassword = {
  email: Cypress.env('login'),
  password: 'a1b2c3',
}

const formDataSignInWrongEmail = {
  email: 'testerztesterova.gmail.com',
  password: Cypress.env('password'),
}

const formDataSignInNotActiveAccount = {
  email: 'testerztesterova+220224@gmail.com',
  password: Cypress.env('password'),
}

const formSignInTooMuchLoginAttemp = {
  email: 'testing+0@gmail.cz',
  password: Cypress.env('password'),
}

describe('Login failed', () => {
  it('Login failed empty forms', () => {
    cy.goLoginHeader()

    cy.get(SELECTORS.INPUT_EMAIL).invoke('val', '').should('be.empty')
    cy.get(SELECTORS.INPUT_PASSWORD).invoke('val', '').should('be.empty')

    cy.get(SELECTORS.BUTTON_SUBMIT_LOGIN).click()

    cy.get(SELECTORS.INPUT_EMAIL).should('have.class', 'border-danger-500')
    cy.get(SELECTORS.INPUT_PASSWORD).should('have.class', 'border-danger-500')

    cy.wait('@loginFormGet').its('response.statusCode').should('eq', 200)
  })

  it('Login failed wrong password', () => {
    const DIALOG_WRONG_PASSWORD_OR_EMAIL = '[id^=headlessui-dialog-panel]'

    cy.goLoginHeader()

    cy.get(FORM_SELECTORS.FORM_SIGN_IN).should('be.visible')
    cy.fillForm(FORM_NAMES.SIGN_IN, formDataSignInWrongPassword)

    cy.get(SELECTORS.BUTTON_SUBMIT_LOGIN).click()

    cy.wait('@waitAfterLogin').its('response.statusCode').should('eq', 401)

    cy.get(DIALOG_WRONG_PASSWORD_OR_EMAIL).eq(0).should('be.visible')
    cy.getByTestId(SELECTORS.DIALOG_CLOSE_BUTTON).click()

    cy.wait('@loginFormGet').its('response.statusCode').should('eq', 200)
  })

  it('Login failed wrong email', () => {
    cy.goLoginHeader()

    cy.get(FORM_SELECTORS.FORM_SIGN_IN).should('be.visible')
    cy.fillForm(FORM_NAMES.SIGN_IN, formDataSignInWrongEmail)

    cy.get(SELECTORS.BUTTON_SUBMIT_LOGIN).click()

    cy.get(SELECTORS.INPUT_EMAIL).should('have.class', 'border-danger-500')

    cy.wait('@loginFormGet').its('response.statusCode').should('eq', 200)
  })

  it('Login failed registered but not activate', () => {
    //This test can only be run once per country/project for 10 minutes, because during multiple attempts show PopUp "too much login attemp".

    const BUTTON_RESEND_EMAIL =
      'button.leading-5.c-button.c-button--base.c-button--white.w-full.mb-4.text-base.md\\:text-sm'
    const BUTTON_CLOSE =
      'button.leading-5.c-button.c-button--base.c-button--primary.w-full.text-base.md\\:text-sm'

    cy.goLoginHeader()

    cy.get(FORM_SELECTORS.FORM_SIGN_IN).should('be.visible')
    cy.fillForm(FORM_NAMES.SIGN_IN, formDataSignInNotActiveAccount)

    cy.clickSubmitShowPopUp()

    cy.get(BUTTON_CLOSE).click()

    cy.clickSubmitShowPopUp()

    cy.getByTestId(SELECTORS.DIALOG_CLOSE_BUTTON).click()

    cy.clickSubmitShowPopUp()

    cy.wait(1000)

    cy.get(BUTTON_RESEND_EMAIL).eq(0).click({ force: true })

    cy.wait('@waitForResendEmail').its('response.statusCode').should('eq', 200)

    cy.get('h2[data-headlessui-state="open"]').should('be.visible')

    cy.getByTestId(SELECTORS.DIALOG_CLOSE_BUTTON).click({
      multiple: true,
      force: true,
    })

    cy.getByTestId(SELECTORS.DIALOG_POPUP).should('not.exist')

    cy.getEmailAfterAt().then((emailAfterAt) => {
      cy.task('gmail:check', {
        from: 'info@' + emailAfterAt,
        subject: Cypress.env('mail').subjectActivation,
        after: new Date(Date.now() - 0.5 * 60 * 1000),
      }).then((email) => {
        assert.isNotNull(email, 'Expected email was received')
      })
    })
  })

  it('Login failed Too much login attempt', () => {
    // possible attempts -> 5 web / 30 app
    //This test can only be run once per country/project for 10 minutes

    cy.goLoginHeader()

    cy.get(FORM_SELECTORS.FORM_SIGN_IN).should('be.visible')
    cy.fillForm(FORM_NAMES.SIGN_IN, formSignInTooMuchLoginAttemp)

    let i = 1
    for (i; i < 6; i++) {
      cy.get(SELECTORS.BUTTON_SUBMIT_LOGIN).click({ force: true })

      cy.get(SELECTORS.DIALOG_POPUP).should('be.visible')
      // cy.wait('@waitLoginAttempt').its('response.statusCode').should('eq', 401)
    }
    cy.get(SELECTORS.BUTTON_SUBMIT_LOGIN).click({ force: true })

    cy.get(SELECTORS.DIALOG_POPUP).should('be.visible')
    // cy.wait('@waitLoginAttempt').its('response.statusCode').should('eq', 429)

    cy.getByTestId(SELECTORS.DIALOG_CLOSE_BUTTON).click()

    expect(i - 1).equal(5)

    cy.print({
      title: 'LOG',
      message:
        'After 5 attempts show proper Dialog PopUp - Tom much login Attempts',
      type: 'warning',
    })
  })
})

Cypress.Commands.add('clickSubmitShowPopUp', () => {
  cy.get(SELECTORS.BUTTON_SUBMIT_LOGIN).click()
  cy.wait('@waitLoginNotActiveAccount')
    .its('response.statusCode')
    .should('eq', 401)
  cy.get(SELECTORS.DIALOG_POPUP).should('be.visible')
})
