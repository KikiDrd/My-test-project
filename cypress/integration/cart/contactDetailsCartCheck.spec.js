import { CART_SELECTORS } from '../../support/selectors/selectors'
import { FORM_NAMES } from '../../support/selectors/formInputSelectors'

const FIRSTNAME_INPUT_CART_CONTACT =
  '#form-contacts[name="checkoutContactsForm"] input[name="firstname"]'
const LASTNAME_INPUT_CART_CONTACT =
  '#form-contacts[name="checkoutContactsForm"] input[name="lastname"]'
const EMAIL_INPUT_CART_CONTACT =
  '#form-contacts[name="checkoutContactsForm"] input[name="email"]'
const PHONE_INPUT_CART_CONTACT =
  '#form-contacts[name="checkoutContactsForm"] .PhoneInput'
const STREET_INPUT_CART_CONTACT =
  '#form-contacts[name="checkoutContactsForm"] input[name="streetAddress"]'
const CITY_INPUT_CART_CONTACT =
  '#form-contacts[name="checkoutContactsForm"] input[name="city"]'
const POSTAL_CODE_INPUT_CART_CONTACT =
  '#form-contacts[name="checkoutContactsForm"] input[name="postalCode"]'

const COMPANY_CHECKBOX = 'input[type="checkbox"][name="isCompany"]'
const FIND_COMPANY_BUTTON =
  '#form-contacts button[type="button"].leading-5.c-button'
const COMPANY_IC = 'input[type="text"][name="companyId"]'
const COMPANY_NAME = 'input[type="text"][name="companyName"]'
const COMPANY_DIC = 'input[type="text"][name="companyVatId"]'

describe('Contact details cart check', () => {
  it('Empty data - contact details', () => {
    cy.setUpCartAndGoToContactInCart()

    cy.get(CART_SELECTORS.BUTTON_TO_CART_SHIPMENT_PAGE).click()

    cy.get(CART_SELECTORS.CONTACT_FORM_CART).should('be.visible')

    cy.checkInvalidInput(FIRSTNAME_INPUT_CART_CONTACT)
    cy.checkInvalidInput(LASTNAME_INPUT_CART_CONTACT)
    cy.checkInvalidInput(EMAIL_INPUT_CART_CONTACT)
    cy.checkInvalidInput(PHONE_INPUT_CART_CONTACT)
    cy.checkInvalidInput(STREET_INPUT_CART_CONTACT)
    cy.checkInvalidInput(CITY_INPUT_CART_CONTACT)
    cy.checkInvalidInput(POSTAL_CODE_INPUT_CART_CONTACT)

    cy.get(CART_SELECTORS.GDPR_CHECKBOX).should('not.be.checked')
  })

  it('Wrong data - contact details', () => {
    cy.setUpCartAndGoToContactInCart()

    const formDataWrong1 = {
      emailText: 'testerztesterovagmail.com',
      phoneNumber: '+42011122233344',
      streetAddress: 'Testerovska',
      postalCode: '12',
    }
    const formDataWrong2 = {
      emailText: 'testerztesterova@gmailcom',
      phoneNumber: '+420abcd',
      streetAddress: '666',
      postalCode: '12345678',
    }

    cy.fillForm(FORM_NAMES.CONTACT, formDataWrong1)
    cy.get(CART_SELECTORS.BUTTON_TO_CART_SHIPMENT_PAGE).click()

    cy.get(EMAIL_INPUT_CART_CONTACT)
      .should('have.class', 'border-danger-500')
      .should('have.value', 'testerztesterovagmail.com')
    cy.get(PHONE_INPUT_CART_CONTACT).should('have.class', 'border-danger-500').should('have.value', '+42011122233344')
    cy.get(STREET_INPUT_CART_CONTACT)
      .should('have.class', 'border-danger-500')
      .should('have.value', 'Testerovska')
    cy.get(POSTAL_CODE_INPUT_CART_CONTACT)
      .should('have.class', 'border-danger-500')
      .should('have.value', '12')

    cy.fillForm(FORM_NAMES.CONTACT, formDataWrong2)
    cy.get(CART_SELECTORS.BUTTON_TO_CART_SHIPMENT_PAGE).click()

    cy.get(EMAIL_INPUT_CART_CONTACT)
      .should('have.class', 'border-danger-500')
      .should('have.value', 'testerztesterova@gmailcom')
    cy.get(PHONE_INPUT_CART_CONTACT).should('have.class', 'border-danger-500').should('have.value', '+420')
    cy.get(STREET_INPUT_CART_CONTACT)
      .should('have.class', 'border-danger-500')
      .should('have.value', '666')
    cy.get(POSTAL_CODE_INPUT_CART_CONTACT)
      .should('have.class', 'border-danger-500')
      .should('have.value', '12345678')
  })

  it('Correct data - contact details', () => {
    cy.goCartAndFillContactForm()

    cy.checkFillContactData()

    cy.get(STREET_INPUT_CART_CONTACT).should(
      'have.value',
      Cypress.env('streetAddress')
    )
    cy.get(CITY_INPUT_CART_CONTACT).should(
      'have.value',
      Cypress.env('cart').address.city
    )
    cy.get(POSTAL_CODE_INPUT_CART_CONTACT).should(
      'have.value',
      Cypress.env('cart').address.postalCode
    )
    cy.get(CART_SELECTORS.GDPR_CHECKBOX).should('be.checked')

    cy.goToCartDelivery()
  })

  it('Correct data - order for the company', () => {
    if (Cypress.config('baseUrl').includes('.cz')) {
      cy.setUpCartAndGoToContactInCart()

      const formDataAll = {
        firstname: Cypress.env('firstname'),
        lastname: Cypress.env('lastname'),
        emailText: Cypress.env('login'),
        phoneNumber: Cypress.env('cart').address.phoneNumber,
      }
      const formDataCompany = {
        companyId: '05522820',
      }
      const formDataPhone = {
        phoneNumber: Cypress.env('cart').address.phoneNumber,
      }

      cy.fillForm(FORM_NAMES.CONTACT, formDataAll)

      cy.checkFillContactData()

      cy.checkCheckbox(COMPANY_CHECKBOX)

      cy.fillForm(FORM_NAMES.CONTACT, formDataCompany)

      cy.get(COMPANY_IC).should('have.value', '05522820')
      cy.get(COMPANY_NAME).should('have.value', '')
      cy.get(COMPANY_DIC).should('have.value', '')
      cy.get(STREET_INPUT_CART_CONTACT).should('have.value', '')
      cy.get(CITY_INPUT_CART_CONTACT).should('have.value', '')
      cy.get(POSTAL_CODE_INPUT_CART_CONTACT).should('have.value', '')

      cy.get(FIND_COMPANY_BUTTON).click()

      cy.get(COMPANY_NAME).should('have.value', 'Brilo Team s.r.o.')
      cy.get(COMPANY_DIC).should('have.value', 'CZ05522820')
      cy.get(STREET_INPUT_CART_CONTACT).should(
        'have.value',
        'Pražská tř. 1247/24'
      )
      cy.get(CITY_INPUT_CART_CONTACT).should(
        'have.value',
        'České Budějovice - České Budějovice 3'
      )
      cy.get(POSTAL_CODE_INPUT_CART_CONTACT).should('have.value', '37004')

      cy.fillForm(FORM_NAMES.CONTACT, formDataPhone)

      cy.checkCheckbox(CART_SELECTORS.GDPR_CHECKBOX)

      cy.goToCartDelivery()
    } else {
      cy.print({
        title: 'LOG',
        message: `Environment doesn´t have the possibility of purchasing for the company. Skip the test.`,
        type: 'warning',
      })
    }
  })
})

Cypress.Commands.add('checkFillContactData', () => {
  cy.get(FIRSTNAME_INPUT_CART_CONTACT).should(
    'have.value',
    Cypress.env('firstname')
  )
  cy.get(LASTNAME_INPUT_CART_CONTACT).should(
    'have.value',
    Cypress.env('lastname')
  )
  cy.get(EMAIL_INPUT_CART_CONTACT).should('have.value', Cypress.env('login'))
})
