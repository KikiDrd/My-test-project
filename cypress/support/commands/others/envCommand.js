Cypress.Commands.add('getEnvironment', () => {
    return Cypress.config().baseUrl.match(/\.([^.]+)\./)[1]
})
