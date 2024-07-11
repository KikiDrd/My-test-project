export function registrationIntercepts() {

    const VERIFY_AFTER_SUBMIT_REGISTRATION = '/api/recaptcha/verify'
    cy.intercept({
        method: 'POST',
        path: VERIFY_AFTER_SUBMIT_REGISTRATION,
    }).as('waitVerifyAfterSubmitRegistration')

    const PATH_USER_REGISTRATION_HEAD = Cypress.env('url').userRegistration
    cy.intercept({
        method: 'HEAD',
        path: PATH_USER_REGISTRATION_HEAD,
    }).as('waitRegistrationHead')

    const PATH_USER_REGISTRATION_SEND = Cypress.env('url').userRegistration
    cy.intercept({
        method: 'GET',
        path: PATH_USER_REGISTRATION_SEND,
    }).as('userRegistrationSend')

    const PATH_USER_REGISTRATION_STEP_TWO =
        Cypress.env('url').userRegistrationStepTwo
    cy.intercept({
        method: 'GET',
        path: PATH_USER_REGISTRATION_STEP_TWO,
    }).as('userRegistrationPreferencesPage')
}
