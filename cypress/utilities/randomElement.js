/**
 * Selects and clicks a random element from a set of elements matched by the provided selector.
 * This function first counts the number of elements matched by the selector,
 * then generates a random index and clicks on the element at that index.
 *
 * @param {string} element - The CSS selector used to identify the group of elements.
 *                           A random element from this set will be clicked.
 */

const randomElement = (element) => {
  cy.get(element)
    .its('length')
    .then((numLinks) => {
      const num = Math.floor(Math.random() * numLinks)
      cy.get(element).eq(num).click({ force: true })
    })
}

export default randomElement
