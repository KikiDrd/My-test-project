/**
 * Verifies the status of each link found within a specified element.
 * For every link, it checks if the href attribute exists and then performs
 * a request to ensure the link responds with a status of 200 (OK).
 *
 * @param {string} element - The CSS selector for the parent element containing the links.
 */

const linkStatus = (element) => {
  cy.get(element).each(($link) => {
    const message = $link
    const link = $link.prop('href')

    expect($link, message).to.have.attr('href')

    cy.request(link).should((response) => {
      expect(response.status).to.eq(200)
    })
  })
}

export default linkStatus
