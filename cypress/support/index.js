import './commands'
import * as interceptors from './intercepts'

beforeEach(() => {
  const COOKIE_CONSENT =
    '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'

  cy.visit('/')

  interceptors.intercepts()

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  if (Cypress.env().develop === false) {
    cy.get(COOKIE_CONSENT).click()
  }
})
