export function othersIntercepts() {

    const PATH_FORM_CONTACT = Cypress.env('url').contactForm
    cy.intercept({
        method: 'HEAD',
        path: PATH_FORM_CONTACT,
    }).as('waitContactForm')

    const CONTACT_FORM_SEND = '/web-api/v1/*/contact'
    cy.intercept({
        method: 'POST',
        path: CONTACT_FORM_SEND,
    }).as('contactFormSend')
}
