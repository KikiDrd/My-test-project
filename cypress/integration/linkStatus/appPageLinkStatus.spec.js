describe('App page link status', () => {
    // if UA.hu will have its LP for app, edit

    it('Link status - app page', () => {
        const APP_PAGE_HREF = 'main a';
        const LP_APP_PAGE = Cypress.env('url').appPage

        if (Cypress.config().baseUrl.match('underarmour.hu')) {
            cy.print({
                title: 'LOG',
                message: `Test skipped because the URL is underarmour.hu`,
                type: 'warning',
            });
        } else {
            cy.visit(LP_APP_PAGE);
            cy.checkLinks(APP_PAGE_HREF);
        }
    });
});
