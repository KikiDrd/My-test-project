import {ACCOUNT_SELECTORS, SELECTORS} from '../../selectors/selectors'

Cypress.Commands.add('goToChangePassword', () => {
    cy.getByTestId(SELECTORS.LINK_LOGIN_HEADER).first().click()
    cy.wait('@loginFormHead').its('response.statusCode').should('eq', 200)

    cy.logUserIn('testing1')

    cy.wait(3000)
    cy.reload()
    cy.wait('@userAccountOverview').its('response.statusCode').should('eq', 200)

    cy.removeItemsFromCart()

    cy.getByTestId(ACCOUNT_SELECTORS.LINK_MY_ACCOUNT).click()
    cy.wait('@userAccountOverview').its('response.statusCode').should('eq', 200)

    cy.getByTestId(ACCOUNT_SELECTORS.USER_MENU_CHANGE_PASSWORD).click()
    cy.wait('@waitChangePasswordPage').its('response.statusCode').should('eq', 200)
})
