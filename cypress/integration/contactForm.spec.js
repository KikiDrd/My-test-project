import { users } from '../fixtures/users'
import {
  FORM_SELECTORS,
  FORM_NAMES,
} from '../support/selectors/formInputSelectors'
import { SELECTORS } from '../support/selectors/selectors'

const formContactData = {
  firstname: users.testing1.firstname,
  lastname: users.testing1.lastname,
  email: users.testing1.email,
  message: 'Testing sending form',
}

describe('Contact form - customer support', () => {
  const LINK_CONTACT_FORM = 'top-bar-contact-link'

  it('Contact form empty', () => {
    const CONTACT_FIRSTNAME_INPUT = '#form-contacts input[name="firstname"]'
    const CONTACT_LASTNAME_INPUT = '#form-contacts input[name="lastname"]'
    const CONTACT_EMAIL_INPUT = '#form-contacts input[name="email"]'
    const CONTACT_MESSAGE_AREA = '#form-contacts textarea[name="message"]'

    cy.getByTestId(LINK_CONTACT_FORM).click()

    cy.get(FORM_SELECTORS.FORM_CONTACT).should('be.visible')

    cy.checkInvalidInput(CONTACT_FIRSTNAME_INPUT)
    cy.checkInvalidInput(CONTACT_LASTNAME_INPUT)
    cy.checkInvalidInput(CONTACT_EMAIL_INPUT)
    cy.checkInvalidInput(CONTACT_MESSAGE_AREA)

    cy.get(SELECTORS.BUTTON_SUBMIT_CONTACT).click()

    cy.verifyUrlContains(Cypress.env('url').contactForm)
  })

  it('Contact form send', () => {
    const DIALOG_SUCCESS = '[id^=headlessui-dialog-panel]'

    cy.getByTestId(LINK_CONTACT_FORM).click()

    cy.get(FORM_SELECTORS.FORM_CONTACT).should('be.visible')

    cy.wait(1000)

    cy.fillForm(FORM_NAMES.CONTACT, formContactData)

    cy.get(SELECTORS.BUTTON_SUBMIT_CONTACT).click()

    cy.wait('@contactFormSend').its('response.statusCode').should('eq', 200)

    cy.get(DIALOG_SUCCESS).should('be.visible')
  })
})
