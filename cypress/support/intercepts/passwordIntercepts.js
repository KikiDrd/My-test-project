export function passwordIntercepts() {

    const PATH_CHANGE_PASSWORD_PAGE = Cypress.env('url').changePassword
    cy.intercept({
        method: 'GET',
        path: PATH_CHANGE_PASSWORD_PAGE,
    }).as('waitChangePasswordPage')

    const PATH_PASSWORD_CHANGED = '/web-api/v1/*/profile/password'
    cy.intercept({
        method: 'PUT',
        path: PATH_PASSWORD_CHANGED,
    }).as('waitChangePasswordDone')

    const FORGOTTEN_PASSWORD = Cypress.env('url').forgottenPassword
    cy.intercept({
        method: 'HEAD',
        path: FORGOTTEN_PASSWORD,
    }).as('forgottenPasswordPage')

    const FORGOTTEN_PASSWORD_II = Cypress.env('url').forgottenPassword
    cy.intercept({
        method: 'GET',
        path: FORGOTTEN_PASSWORD_II,
    }).as('forgottenPassword')

    const FORGOTTEN_PASSWORD_EMAIL_SEND = '**/web-api/v1/*/profile/password/forgotten*'
    cy.intercept({
        method: 'POST',
        path: FORGOTTEN_PASSWORD_EMAIL_SEND,
    }).as('forgottenPasswordEmailSend')
}
