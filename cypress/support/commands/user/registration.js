import { users } from '../../../fixtures/users'
import { FORM_NAMES } from '../../selectors/formInputSelectors'

Cypress.Commands.add('userDetailsRegistration', () => {
  const formRegisterData = {
    email: users.registration.email,
    firstname: users.registration.firstname,
    lastname: users.registration.lastname,
    password: users.registration.password,
  }

  cy.fillForm(FORM_NAMES.SIGN_UP, formRegisterData)

  cy.print({
    title: 'LOG',
    message: 'Registration e-mail is: ' + formRegisterData.email,
    type: 'warning',
  })
})

Cypress.Commands.add('selectRandomGenderId', () => {
  const genderType = [
    { value: '1', label: Cypress.env('genderLabel1') }, // gender man
    { value: '2', label: Cypress.env('genderLabel2') }, // gender woman
  ]
  const randomIndex = Math.floor(Math.random() * genderType.length) // Pick random index from the array
  const randomGender = genderType[randomIndex].value // Get random gender id base on index
  const genderLabel = genderType[randomIndex].label // Get label for the random gender

  cy.get("input[name='genderId'][value='" + randomGender + "']")
    .click()
    .should('be.checked') // click on random gender

  cy.print({
    title: 'LOG',
    message: `Pick random gender is: value ${randomGender} is ${genderLabel}`,
    type: 'warning',
  })
})
