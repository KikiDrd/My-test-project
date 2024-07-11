export function blockedIntercepts() {
  // validation of 3rd party requests
  cy.intercept('https://r.clarity.ms/*', {})
  cy.intercept('https://sgtm.orsay.cz/g/*', {})
  cy.intercept('https://region1.analytics.google.com/g/*', {})
  cy.intercept('https://googleads.g.doubleclick.net/*', {})
  cy.intercept('https://www.facebook.com/*', {})
  cy.intercept('https://null/*/*', {})
}
