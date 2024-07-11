import { FORM_FIELDS } from '../../../selectors/formInputSelectors'

Cypress.Commands.add('applySaleCode', (type) => {
  const FORM_SALE_CODE_EXPAND =
    'button.flex.justify-between.items-center.text-base'
  const BUTTON_SALE_CODE_APPLY = 'button[type="submit"].c-button--primary'

  if (Cypress.env('cart').saleCode[type]) {
    const saleCodeType = Cypress.env('cart').saleCode[type]

    cy.get(FORM_SALE_CODE_EXPAND).click()

    cy.get(FORM_FIELDS.saleCode.selector).click().type(saleCodeType)

    cy.get(BUTTON_SALE_CODE_APPLY).click()
  } else {
    throw new Error(
      `Sale code for type '${type}' not found in the environment configuration`
    )
  }
})
