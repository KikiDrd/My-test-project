// Select by data-testid
Cypress.Commands.add('getByTestId', (testId) => {
    return cy.get('[data-testid="' + testId + '"]')
})
