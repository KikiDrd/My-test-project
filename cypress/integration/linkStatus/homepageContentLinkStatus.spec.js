describe('Homepage link status', () => {
  it('Link status - homepage - banners', () => {
    const HOMEPAGE_CONTENT = 'main a'

    cy.checkLinks(HOMEPAGE_CONTENT)
  })
})
