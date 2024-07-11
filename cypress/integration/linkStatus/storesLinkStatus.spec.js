describe('Stores link status', () => {

    it('Status link stores', () => {
        if (Cypress.env('url') && Cypress.env('url').ourStores) {
            const STORES_LIST = '.overflow-auto a'

            cy.visit(Cypress.env('url').ourStores)

            cy.checkLinks(STORES_LIST)
        } else {
            cy.print({
                title: 'LOG', message: `This country doesn´t have brick-and-mortar stores.`, type: 'warning',
            })
        }

    })
})
