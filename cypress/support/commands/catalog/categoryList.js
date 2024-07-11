import { SELECTORS } from '../../selectors/selectors'
import randomElement from '../../../utilities/randomElement'

Cypress.Commands.add('goToCategory', (category) => {
  const menuUrls = Cypress.env('url').menu.withSubCategory

  let categorySelector
  if (category && menuUrls[category]) {
    // Directly access the specific category URL if specified and exists
    categorySelector = menuUrls[category]
  } else {
    // Dynamically select a random category if none specified
    const categoryKeys = Object.keys(menuUrls) // Gets all category keys
    const randomCategoryKey =
      categoryKeys[Math.floor(Math.random() * categoryKeys.length)]
    categorySelector = menuUrls[randomCategoryKey]
  }

  cy.get(
    `${SELECTORS.MENU_MAIN_HEADER_HREF}[href="${categorySelector}"]`
  ).click({
    force: true,
  })
  cy.wait(1000) // Page render timeout
  cy.get('input[name="search"]').click() // this step is temporary for disappear menu
})

Cypress.Commands.add('hoverOverMenuCategory', (categoryUrl) => {
  cy.get(`${SELECTORS.MENU_MAIN_HEADER_HREF}[href="${categoryUrl}"]`)
    .trigger('mouseover')
    .should('be.visible')
})

Cypress.Commands.add('goToSubcategory', () => {
  const CATEGORY_SELECTOR = '[data-testid="navigation-desktop-nav-bar-ul"]'

  // Dynamically retrieve all category URLs from the current environment
  const menuCategories = Cypress.env('url').menu.withSubCategory
  const categoryUrls = Object.values(menuCategories) // Convert object values to an array

  // Select a random category URL
  const randomCategoryUrl =
    categoryUrls[Math.floor(Math.random() * categoryUrls.length)]

  cy.hoverOverMenuCategory(randomCategoryUrl)

  cy.getEnvironment().then((env) => {
    switch (env) {
      case 'orsay':
        randomElement(CATEGORY_SELECTOR)
        return

      case 'gap':
        randomElement(CATEGORY_SELECTOR)
        return

      case 'underarmour':
        randomElement(CATEGORY_SELECTOR)
        return
    }
  })
})
