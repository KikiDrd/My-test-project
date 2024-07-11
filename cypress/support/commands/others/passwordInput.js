Cypress.Commands.add('passwordEye', (passwordInput) => {
    cy.get(passwordInput).invoke('attr', 'type').should('contain', 'password')
    cy.get(passwordInput).first().type(Cypress.env('password'), {force: true})
    const passwordEye = cy.get(passwordInput).siblings()
    passwordEye.trigger('mousedown')
    cy.get(passwordInput).invoke('attr', 'type').should('contain', 'text')
    passwordEye.trigger('mouseup')
    cy.get(passwordInput).invoke('attr', 'type').should('contain', 'password')
})
