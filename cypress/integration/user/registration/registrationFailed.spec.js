import { SELECTORS } from '../../../support/selectors/selectors'
import { users } from '../../../fixtures/users'
import { FORM_NAMES } from '../../../support/selectors/formInputSelectors'

const formRegisterDataWrongEmail = {
  firstname: users.registration.firstname,
  lastname: users.registration.lastname,
  email: 'testerztesterova.gmail.com',
  password: users.registration.password,
}

const formRegisterDataAlreadyExistingUser = {
  firstname: users.testing1.firstname,
  lastname: users.testing1.lastname,
  email: users.testing1.email,
  password: users.testing1.password,
}

const INPUT_EMAIL_REGISTRATION_FORM =
  'form[name="signUpForm"] input[name="email"]'

describe('Registration failed', () => {
  it('Registration failed empty form', () => {
    cy.getByTestId(SELECTORS.LINK_REGISTRATION_HEADER).click()
    cy.wait('@waitRegistrationHead')
      .its('response.statusCode')
      .should('eq', 200)

    cy.get(SELECTORS.INPUT_FIRSTNAME).should('be.empty')
    cy.get(SELECTORS.INPUT_LASTNAME).should('be.empty')
    cy.get(INPUT_EMAIL_REGISTRATION_FORM).should('be.empty')
    cy.get(SELECTORS.INPUT_PASSWORD).should('be.empty')

    cy.get(SELECTORS.GDPR_CHECKBOX)
      .should('be.visible')
      .should('not.be.checked')

    cy.get(SELECTORS.BUTTON_SUBMIT_REGISTRATION).click()

    cy.get(SELECTORS.INPUT_FIRSTNAME).should('have.class', 'border-danger-500')
    cy.get(SELECTORS.INPUT_LASTNAME).should('have.class', 'border-danger-500')
    cy.checkInvalidInput(INPUT_EMAIL_REGISTRATION_FORM)

    cy.get(SELECTORS.INPUT_PASSWORD).should('have.class', 'border-danger-500')

    cy.get(SELECTORS.GDPR_CHECKBOX).should('not.be.checked')
  })

  it('Registration failed wrong format email', () => {
    cy.getByTestId(SELECTORS.LINK_REGISTRATION_HEADER).click()
    cy.wait('@waitRegistrationHead')
      .its('response.statusCode')
      .should('eq', 200)

    cy.fillForm(FORM_NAMES.SIGN_UP, formRegisterDataWrongEmail)

    cy.checkCheckbox(SELECTORS.GDPR_CHECKBOX)

    cy.get(SELECTORS.BUTTON_SUBMIT_REGISTRATION).click()

    cy.checkInvalidInput(INPUT_EMAIL_REGISTRATION_FORM)
  })

  it('Registration not checked terms', () => {
    cy.getByTestId(SELECTORS.LINK_REGISTRATION_HEADER).click()
    cy.wait('@waitRegistrationHead')
      .its('response.statusCode')
      .should('eq', 200)

    cy.userDetailsRegistration()

    cy.get(SELECTORS.GDPR_CHECKBOX)
      .should('be.visible')
      .should('not.be.checked')

    cy.get(SELECTORS.BUTTON_SUBMIT_REGISTRATION).click()
  })

  it('Registration on already registered email', () => {
    cy.getByTestId(SELECTORS.LINK_REGISTRATION_HEADER).click()
    cy.wait('@waitRegistrationHead')
      .its('response.statusCode')
      .should('eq', 200)
    cy.wait(1500)

    cy.fillForm(FORM_NAMES.SIGN_UP, formRegisterDataAlreadyExistingUser)

    cy.checkCheckbox(SELECTORS.GDPR_CHECKBOX)

    cy.get(SELECTORS.BUTTON_SUBMIT_REGISTRATION).click()

    cy.wait('@waitVerifyAfterSubmitRegistration')
      .its('response.statusCode')
      .should('eq', 200)

    // find and check mail with subject invalid registration
    cy.getEmailAfterAt().then((emailAfterAt) => {
      // generate email part after @ depended on baseUrl
      cy.task('gmail:check', {
        from: 'info@' + emailAfterAt, // email from info@partOfBaseUrl
        subject: Cypress.env('mail').userRegitrationAlreadyExistsAndVerified,
        after: new Date(Date.now() - 0.5 * 60 * 1000),
      }).then((email) => {
        assert.isNotNull(email, 'Expected email was received')
      })
    })
  })
})
