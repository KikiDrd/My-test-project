import linkStatus from "../../utilities/linkStatus";

describe('Loyalty program link status', () => {
    it('Link status - loyalty program', () => {
        const LOYALTY_PAGE = 'main a'

        cy.getEnvironment().then((env) => {
            switch (env) {
                case 'orsay':
                    cy.visit(Cypress.env('url').loyaltyProgram);
                    linkStatus(LOYALTY_PAGE)
                    return;

                case 'gap':
                    cy.visit('/gap-plus');
                    linkStatus(LOYALTY_PAGE)
                    return;

                case 'underarmour':
                    return;
            }
        })
    })
})
