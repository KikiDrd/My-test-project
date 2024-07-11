describe('Footer link status', () => {
  it('Footer link status', () => {
    const FOOTER_ABOUT_SHOPPING_AND_US =
      '[data-testid="footer"] div.footer-column__list a:not([href^="javascript:"]'
    // status link except cookies link

    cy.checkLinks(FOOTER_ABOUT_SHOPPING_AND_US)
  })

  it('Link status - social media icons', () => {
    const SOCIAL_MEDIA_HREF = '[data-testid="footer-social-icons-div"] a'
    cy.checkLinks(SOCIAL_MEDIA_HREF)
  })

  it('Link status - app store icons ', () => {
    const APP_STORE_HREF = '[data-testid="footer-app-stores-div"] a'

    cy.checkLinks(APP_STORE_HREF)
  })
})
