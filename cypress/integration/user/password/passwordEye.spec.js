import {
    ACCOUNT_SELECTORS,
    SELECTORS,
} from '../../../support/selectors/selectors'

describe('Password Eye', () => {
    it('Verify functionality password eye - login', () => {
        cy.goLoginHeader()

        cy.passwordEye(SELECTORS.INPUT_PASSWORD)
    })

    it('Verify functionality password eye - registration', () => {
        cy.getByTestId(SELECTORS.LINK_REGISTRATION_HEADER).click()
        cy.wait('@waitRegistrationHead').its('response.statusCode').should('eq', 200)

        cy.passwordEye(SELECTORS.INPUT_PASSWORD)
    })

    it('Verify functionality password eye - change password - user account', () => {
        cy.goToChangePassword()

        cy.passwordEye(ACCOUNT_SELECTORS.OLD_PASSWORD)

        cy.passwordEye(ACCOUNT_SELECTORS.NEW_PASSWORD)

        cy.passwordEye(ACCOUNT_SELECTORS.NEW_REPEAT_PASSWORD)
    })
})
