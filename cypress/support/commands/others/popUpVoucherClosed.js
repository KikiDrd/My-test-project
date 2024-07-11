Cypress.Commands.add('popUpVoucherClosed', () => {
    // Do not execute in develop
    if (Cypress.env('develop')) {
        return
    }
    // Close Pop-up in production
    cy.document().then((document) => {
        new MutationObserver(function () {
            var popUpSelector = 'div.mlctr-popup'
            if (document.querySelector(popUpSelector)) {
                cy.get(popUpSelector + ' > div.mlctr-close-button').click({
                    multiple: true,
                    force: true,
                })
            }
        }).observe(document.body, {childList: true, subtree: true})
    })
})
