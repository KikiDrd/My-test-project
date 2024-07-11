import { SELECTORS } from '../../../support/selectors/selectors'

describe('Login forget password', () => {

    it('Reset password', () => {
        cy.getByTestId(SELECTORS.LINK_LOGIN_HEADER).click()
        cy.wait('@loginFormHead').its('response.statusCode').should('eq', 200)

        cy.getByTestId(SELECTORS.LINK_FORGOTTEN_PASSWORD_SIGN_IN).click()
        cy.wait('@forgottenPasswordPage').its('response.statusCode').should('eq', 200)

        cy.get(SELECTORS.INPUT_EMAIL_FORGOTTEN_PASSWORD).type(Cypress.env('login'))

        cy.get(SELECTORS.BUTTON_SUBMIT_FORGOTTEN_PASSWORD).click()
        cy.wait('@forgottenPasswordEmailSend').its('response.statusCode').should('eq', 200)

        cy.getEmailAfterAt().then((emailAfterAt) => {
            // generate email part after @ depended on baseUrl
            cy.task('gmail:check', {
                from: 'info@' + emailAfterAt,
                subject: Cypress.env('mail').subjectForgottenPassword,
                after: new Date(Date.now() - 0.5 * 60 * 1000),
            }).then((email) => {
                assert.isNotNull(email, 'Expected email was received')
            })
        })
    })

    it('Reset password only Orsay link from text', () => {
        const LINK_RESET_PASSWORD_IN_TEXT = 'signing-pages-change-password-link'

        if (Cypress.config().baseUrl.match('orsay.cz')) {
            cy.getByTestId(SELECTORS.LINK_LOGIN_HEADER).click()
            cy.wait('@loginFormHead').its('response.statusCode').should('eq', 200)

            cy.getByTestId(LINK_RESET_PASSWORD_IN_TEXT).click()
            cy.wait('@forgottenPasswordPage').its('response.statusCode').should('eq', 200)

            //cy.get(SELECTORS.BUTTON_SUBMIT_FORGOTTEN_PASSWORD).click()
            //cy.get(SELECTORS.INPUT_EMAIL).should("have.class", "border-danger-500")

            cy.get(SELECTORS.INPUT_EMAIL_FORGOTTEN_PASSWORD).type(
                Cypress.env('login')
            )

            cy.get(SELECTORS.BUTTON_SUBMIT_FORGOTTEN_PASSWORD).click()
            cy.wait('@forgottenPasswordEmailSend').its('response.statusCode').should('eq', 200)

            cy.getEmailAfterAt().then((emailAfterAt) => {
                // generate email part after @ depended on baseUrl
                cy.task('gmail:check', {
                    from: 'info@' + emailAfterAt,
                    subject: Cypress.env('mail').subjectForgottenPassword,
                    after: new Date(Date.now() - 0.5 * 60 * 1000),
                }).then((email) => {
                    assert.isNotNull(email, 'Expected email was received')
                })
            })
        }
    })
})
