import { availableSaleCodes as saleCode } from '../../../constants/availableSalecodes'

describe('Sale code application', () => {
  it('should apply voucher sale code correctly', () => {
    cy.setUpCart()

    cy.applySaleCode(saleCode.VOUCHER)

    cy.wait('@applyVoucher').its('response.statusCode').should('eq', 200)
  })
})
