import { SELECTORS } from '../../support/selectors/selectors'
import linkStatus from '../../utilities/linkStatus'

describe('Header link status', () => {
  it('Top bar link status', () => {
    linkStatus(SELECTORS.HEADER_TOP_BAR_HREF)

    cy.get('body').then((body) => {
      let belowHeaderBanner = body.find(SELECTORS.BELOW_HEADER_BANNER)
      if (belowHeaderBanner.length > 0) {
        belowHeaderBanner.each((index, banner) => {
          cy.wrap(banner)
            .should('be.visible')
            .then(() => {
              linkStatus(SELECTORS.BELOW_HEADER_BANNER_HREF)
            })
        })
      } else {
        cy.print({
          title: 'LOG',
          message: `Below header banner doesn´t exist.`,
          type: 'warning',
        })
        return
      }
    })
  })

  it('Menu main category and subcategory link status', () => {
    linkStatus(SELECTORS.MENU_MAIN_HEADER_HREF)
  })

  const subCategory = Cypress.env('url').menu.withSubCategory

  for (const [categoryName, categoryUrl] of Object.entries(subCategory)) {
    it(`menu subcategory link status for ${categoryName}`, () => {
      cy.hoverOverMenuCategory(categoryUrl)

      linkStatus(SELECTORS.MAIN_MENU_SUBCATEGORY_LINK_HREF)
    })
  }
})
