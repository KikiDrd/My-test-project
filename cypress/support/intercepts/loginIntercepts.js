export function loginIntercepts() {

    const PATH_USER_LOGIN = Cypress.env('url').userLogin
    cy.intercept({
        method: 'GET',
        path: PATH_USER_LOGIN,
    }).as('loginFormGet')

    const USER_ACCOUNT_OVERVIEW = Cypress.env('url').userAccountOverview
    cy.intercept({
        method: 'GET',
        path: USER_ACCOUNT_OVERVIEW,
    }).as('userAccountOverview')

    const USER_ACCOUNT_OVERVIEW_II = Cypress.env('url').userAccountOverview
    cy.intercept({
        method: 'HEAD',
        path: USER_ACCOUNT_OVERVIEW_II,
    }).as('userAccountOverviewHead')

    const AFTER_LOGIN = '/web-api/*/*/login'
    cy.intercept({
        method: 'POST',
        path: AFTER_LOGIN,
    }).as('waitAfterLogin')

    const PATH_USER_LOGIN_II = Cypress.env('url').userLogin
    cy.intercept({
        method: 'HEAD',
        path: PATH_USER_LOGIN_II,
    }).as('loginFormHead')

    const PATH_RESEND_EMAIL = '**/web-api/v1/*/registration/email-resend/*'
    cy.intercept({
        method: 'POST',
        path: PATH_RESEND_EMAIL,
    }).as('waitForResendEmail')

    const PATH_LOGIN_ATTEMPT = '**/web-api/v1/*/login*'
    cy.intercept({
        method: 'POST',
        path: PATH_LOGIN_ATTEMPT,
    }).as('waitLoginAttempt')

    const PATH_LOGIN_NOT_ACTIVE_ACCOUNT = '**/web-api/v1/*/login*'
    cy.intercept({
        method: 'POST',
        path: PATH_LOGIN_NOT_ACTIVE_ACCOUNT,
    }).as('waitLoginNotActiveAccount')

    const PATH_LOG_OUT = '**/web-api/v1/*/logout*'
    cy.intercept({
        method: 'POST',
        path: PATH_LOG_OUT,
    }).as('waitLogOut')
}
