import { FORM_SELECTORS, FORM_FIELDS } from '../../selectors/formInputSelectors'

Cypress.Commands.add('fillForm', (formName, formData) => {
  const formSelector = FORM_SELECTORS[formName]

  if (!formSelector) {
    throw new Error(`Form selector for '${formName}' is not defined.`)
  }

  cy.get(formSelector).within(() => {
    Object.entries(formData).forEach(([key, value]) => {
      const field = FORM_FIELDS[key]

      if (!field) {
        throw new Error(`Field '${key}' is not defined in form fields.`)
      }

      const { selector, action } = field

      switch (action) {
        case 'type':
          cy.get(selector).click().clear().type(value)
          break
        case 'check':
          cy.get(selector).check({ force: true })
          break
        case 'select':
          cy.get(selector).select(Cypress.env('cart').address.judet)
          break
      }
    })
  })
})
