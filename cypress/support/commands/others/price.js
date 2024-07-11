import { PRICE_SELECTORS } from '../../selectors/priceSelectors'

Cypress.Commands.add('getAllAvailableProductPricesOnCatalog', () => {
  // price on catalog for the first product
  cy.wait(1000)

  return cy
    .getSpecificPrice(PRICE_SELECTORS.RECOMMENDED_SELLING_PRICE_CATALOG)
    .then((RECOMMENDED_SELLING_PRICE_CATALOG) => {
      cy.print({
        title: 'LOG',
        message: `RECOMMENDED_SELLING_PRICE_CATALOG is: ${RECOMMENDED_SELLING_PRICE_CATALOG}`,
        type: 'warning',
      })
      cy.getSpecificPrice(
        PRICE_SELECTORS.SELLING_PRICE_WITH_COUPON_CATALOG
      ).then((SELLING_PRICE_WITH_COUPON_CATALOG) => {
        cy.print({
          title: 'LOG',
          message: `SELLING_PRICE_WITH_COUPON_CATALOG is: ${SELLING_PRICE_WITH_COUPON_CATALOG}`,
          type: 'warning',
        })
        cy.getSpecificPrice(
          PRICE_SELECTORS.DISCOUNTED_SELLING_PRICE_CATALOG
        ).then((DISCOUNTED_SELLING_PRICE_CATALOG) => {
          cy.print({
            title: 'LOG',
            message: `DISCOUNTED_SELLING_PRICE_CATALOG is: ${DISCOUNTED_SELLING_PRICE_CATALOG}`,
            type: 'warning',
          })
          cy.getSpecificPrice(PRICE_SELECTORS.RECOMMENDED_PRICE_CATALOG).then(
            (RECOMMENDED_PRICE_CATALOG) => {
              cy.print({
                title: 'LOG',
                message: `RECOMMENDED_PRICE_CATALOG is: ${RECOMMENDED_PRICE_CATALOG}`,
                type: 'warning',
              })
              cy.getSpecificPrice(PRICE_SELECTORS.COUPON_PRICE_CATALOG).then(
                (COUPON_PRICE_CATALOG) => {
                  cy.print({
                    title: 'LOG',
                    message: `COUPON_PRICE_CATALOG is: ${COUPON_PRICE_CATALOG}`,
                    type: 'warning',
                  })
                  cy.getSpecificPrice(
                    PRICE_SELECTORS.PRICE_RECOMMENDED_PRICE_CATALOG
                  ).then((PRICE_RECOMMENDED_PRICE_CATALOG) => {
                    cy.print({
                      title: 'LOG',
                      message: `PRICE_RECOMMENDED_PRICE_CATALOG is: ${PRICE_RECOMMENDED_PRICE_CATALOG}`,
                      type: 'warning',
                    })
                    cy.getSpecificPrice(
                      PRICE_SELECTORS.RECOMMENDED_COUPON_PRICE_CATALOG
                    ).then((RECOMMENDED_COUPON_PRICE_CATALOG) => {
                      cy.print({
                        title: 'LOG',
                        message: `RECOMMENDED_COUPON_PRICE_CATALOG is: ${RECOMMENDED_COUPON_PRICE_CATALOG}`,
                        type: 'warning',
                      }).then(() => {
                        const prices = [
                          RECOMMENDED_SELLING_PRICE_CATALOG,
                          SELLING_PRICE_WITH_COUPON_CATALOG,
                          DISCOUNTED_SELLING_PRICE_CATALOG,
                          RECOMMENDED_PRICE_CATALOG,
                          COUPON_PRICE_CATALOG,
                          PRICE_RECOMMENDED_PRICE_CATALOG,
                          RECOMMENDED_COUPON_PRICE_CATALOG,
                        ]

                        const definedPrices = prices.filter(
                          (price) => price !== undefined
                        )

                        if (definedPrices.length === 0) {
                          cy.print({
                            title: 'LOG',
                            message: `No price is defined`,
                            type: 'error',
                          })
                        }
                        return {
                          RECOMMENDED_SELLING_PRICE_CATALOG:
                            RECOMMENDED_SELLING_PRICE_CATALOG,
                          SELLING_PRICE_WITH_COUPON_CATALOG:
                            SELLING_PRICE_WITH_COUPON_CATALOG,
                          DISCOUNTED_SELLING_PRICE_CATALOG:
                            DISCOUNTED_SELLING_PRICE_CATALOG,
                          RECOMMENDED_PRICE_CATALOG: RECOMMENDED_PRICE_CATALOG,
                          COUPON_PRICE_CATALOG: COUPON_PRICE_CATALOG,
                          PRICE_RECOMMENDED_PRICE_CATALOG:
                            PRICE_RECOMMENDED_PRICE_CATALOG,
                          RECOMMENDED_COUPON_PRICE_CATALOG:
                            RECOMMENDED_COUPON_PRICE_CATALOG,
                        }
                      })
                    })
                  })
                }
              )
            }
          )
        })
      })
    })
})

Cypress.Commands.add('getAllAvailableProductPricesOnPD', () => {
  cy.wait(1000)

  return cy
    .getSpecificPrice(PRICE_SELECTORS.RECOMMENDED_PRICE_PD)
    .then((RECOMMENDED_PRICE_PD) => {
      cy.print({
        title: 'LOG',
        message: `RECOMMENDED_PRICE_PD is: ${RECOMMENDED_PRICE_PD}`,
        type: 'warning',
      })
      cy.getSpecificPrice(PRICE_SELECTORS.DISCOUNTED_SELLING_PRICE_PD).then(
        (DISCOUNTED_SELLING_PRICE_PD) => {
          cy.print({
            title: 'LOG',
            message: `DISCOUNTED_SELLING_PRICE_PD is: ${DISCOUNTED_SELLING_PRICE_PD}`,
            type: 'warning',
          })
          cy.getSpecificPrice(
            PRICE_SELECTORS.RECOMMENDED_SELLING_PRICE_PD
          ).then((RECOMMENDED_SELLING_PRICE_PD) => {
            cy.print({
              title: 'LOG',
              message: `RECOMMENDED_SELLING_PRICE_PD is: ${RECOMMENDED_SELLING_PRICE_PD}`,
              type: 'warning',
            })
            cy.getSpecificPrice(
              PRICE_SELECTORS.COUPON_PRICE_WITHOUT_CODE_PD
            ).then((COUPON_PRICE_WITHOUT_CODE_PD) => {
              cy.print({
                title: 'LOG',
                message: `COUPON_PRICE_WITHOUT_CODE_PD: ${COUPON_PRICE_WITHOUT_CODE_PD}`,
                type: 'warning',
              })
              cy.getSpecificPrice(
                PRICE_SELECTORS.SELLING_PRICE_WITH_COUPON_PD
              ).then((SELLING_PRICE_WITH_COUPON_PD) => {
                cy.print({
                  title: 'LOG',
                  message: `SELLING_PRICE_WITH_COUPON_PD is: ${SELLING_PRICE_WITH_COUPON_PD}`,
                  type: 'warning',
                })
                cy.getSpecificPrice(PRICE_SELECTORS.COUPON_PRICE_PD).then(
                  (COUPON_PRICE_PD) => {
                    cy.print({
                      title: 'LOG',
                      message: `COUPON_PRICE_PD is: ${COUPON_PRICE_PD}`,
                      type: 'warning',
                    })
                    cy.getSpecificPrice(
                      PRICE_SELECTORS.COUPON_PRICE_WITHOUT_CODE_RECOMMENDED_PD
                    ).then((COUPON_PRICE_WITHOUT_CODE_RECOMMENDED_PD) => {
                      cy.print({
                        title: 'LOG',
                        message: `COUPON_PRICE_WITHOUT_CODE_RECOMMENDED_PD is: ${COUPON_PRICE_WITHOUT_CODE_RECOMMENDED_PD}`,
                        type: 'warning',
                      }).then(() => {
                        const prices = [
                          RECOMMENDED_PRICE_PD,
                          DISCOUNTED_SELLING_PRICE_PD,
                          RECOMMENDED_SELLING_PRICE_PD,
                          COUPON_PRICE_WITHOUT_CODE_PD,
                          SELLING_PRICE_WITH_COUPON_PD,
                          COUPON_PRICE_PD,
                          COUPON_PRICE_WITHOUT_CODE_RECOMMENDED_PD,
                        ]

                        const definedPrices = prices.filter(
                          (price) => price !== undefined
                        )

                        if (definedPrices.length === 0) {
                          cy.print({
                            title: 'LOG',
                            message: `No price is defined`,
                            type: 'error',
                          })
                        }
                        return {
                          RECOMMENDED_PRICE_PD: RECOMMENDED_PRICE_PD,
                          DISCOUNTED_SELLING_PRICE_PD:
                            DISCOUNTED_SELLING_PRICE_PD,
                          RECOMMENDED_SELLING_PRICE_PD:
                            RECOMMENDED_SELLING_PRICE_PD,
                          COUPON_PRICE_WITHOUT_CODE_PD:
                            COUPON_PRICE_WITHOUT_CODE_PD,
                          SELLING_PRICE_WITH_COUPON_PD:
                            SELLING_PRICE_WITH_COUPON_PD,
                          COUPON_PRICE_PD: COUPON_PRICE_PD,
                          COUPON_PRICE_WITHOUT_CODE_RECOMMENDED_PD:
                            COUPON_PRICE_WITHOUT_CODE_RECOMMENDED_PD,
                        }
                      })
                    })
                  }
                )
              })
            })
          })
        }
      )
    })
})

Cypress.Commands.add('getAllAvailableProductPricesOnFlyCart', () => {
  cy.wait(1000)

  return cy
    .getSpecificPrice(PRICE_SELECTORS.RECOMMENDED_SELLING_PRICE_FLY_CART)
    .then((RECOMMENDED_SELLING_PRICE_FLY_CART) => {
      cy.print({
        title: 'LOG',
        message: `RECOMMENDED_SELLING_PRICE_FLY_CART is: ${RECOMMENDED_SELLING_PRICE_FLY_CART}`,
        type: 'warning',
      })
      cy.getSpecificPrice(PRICE_SELECTORS.RECOMMENDED_PRICE_FLY_CART).then(
        (RECOMMENDED_PRICE_FLY_CART) => {
          cy.print({
            title: 'LOG',
            message: `RECOMMENDED_PRICE_FLY_CART is: ${RECOMMENDED_PRICE_FLY_CART}`,
            type: 'warning',
          })
          cy.getSpecificPrice(
            PRICE_SELECTORS.DISCOUNTED_SELLING_PRICE_FLY_CART
          ).then((DISCOUNTED_SELLING_PRICE_FLY_CART) => {
            cy.print({
              title: 'LOG',
              message: `DISCOUNTED_SELLING_PRICE_FLY_CART is: ${DISCOUNTED_SELLING_PRICE_FLY_CART}`,
              type: 'warning',
            })
            cy.getSpecificPrice(
              PRICE_SELECTORS.DISCOUNT_SUM_PRICE_FLY_CART
            ).then((DISCOUNT_SUM_PRICE_FLY_CART) => {
              cy.print({
                title: 'LOG',
                message: `DISCOUNT_SUM_PRICE_FLY_CART is: ${DISCOUNT_SUM_PRICE_FLY_CART}`,
                type: 'warning',
              })
              cy.getSpecificPrice(PRICE_SELECTORS.TOTAL_PRICE_FLY_CART).then(
                (TOTAL_PRICE_FLY_CART) => {
                  cy.print({
                    title: 'LOG',
                    message: `TOTAL_PRICE_FLY_CART is: ${TOTAL_PRICE_FLY_CART}`,
                    type: 'warning',
                  }).then(() => {
                    const prices = [
                      RECOMMENDED_SELLING_PRICE_FLY_CART,
                      RECOMMENDED_PRICE_FLY_CART,
                      DISCOUNTED_SELLING_PRICE_FLY_CART,
                      DISCOUNT_SUM_PRICE_FLY_CART,
                      TOTAL_PRICE_FLY_CART,
                    ]

                    const definedPrices = prices.filter(
                      (price) => price !== undefined
                    )

                    if (definedPrices.length === 0) {
                      cy.print({
                        title: 'LOG',
                        message: `No price is defined`,
                        type: 'error',
                      })
                    }
                    return {
                      RECOMMENDED_SELLING_PRICE_FLY_CART:
                        RECOMMENDED_SELLING_PRICE_FLY_CART,
                      RECOMMENDED_PRICE_FLY_CART: RECOMMENDED_PRICE_FLY_CART,
                      DISCOUNTED_SELLING_PRICE_FLY_CART:
                        DISCOUNTED_SELLING_PRICE_FLY_CART,
                      DISCOUNT_SUM_PRICE_FLY_CART: DISCOUNT_SUM_PRICE_FLY_CART,
                      TOTAL_PRICE_FLY_CART: TOTAL_PRICE_FLY_CART,
                    }
                  })
                }
              )
            })
          })
        }
      )
    })
})

Cypress.Commands.add('getAllAvailableProductPricesInCart', () => {
  cy.wait(1000)
  return cy
    .getSpecificPrice(PRICE_SELECTORS.RECOMMENDED_SELLING_PRICE_CART)
    .then((RECOMMENDED_SELLING_PRICE_CART) => {
      cy.print({
        title: 'LOG',
        message: `RECOMMENDED_SELLING_PRICE_CART is: ${RECOMMENDED_SELLING_PRICE_CART}`,
        type: 'warning',
      })
      cy.getSpecificPrice(PRICE_SELECTORS.SELLING_PRICE_CART).then(
        (SELLING_PRICE_CART) => {
          cy.print({
            title: 'LOG',
            message: `SELLING_PRICE_CART is: ${SELLING_PRICE_CART}`,
            type: 'warning',
          })
          cy.getSpecificPrice(
            PRICE_SELECTORS.DISCOUNTED_SELLING_PRICE_CART
          ).then((DISCOUNTED_SELLING_PRICE_CART) => {
            cy.print({
              title: 'LOG',
              message: `DISCOUNTED_SELLING_PRICE_CART is: ${DISCOUNTED_SELLING_PRICE_CART}`,
              type: 'warning',
            })
            cy.getSpecificPrice(PRICE_SELECTORS.DISCOUNT_SUM_PRICE_CART).then(
              (DISCOUNT_SUM_PRICE_CART) => {
                cy.print({
                  title: 'LOG',
                  message: `DISCOUNT_SUM_PRICE_CART is: ${DISCOUNT_SUM_PRICE_CART}`,
                  type: 'warning',
                })
                cy.getSpecificPrice(
                  PRICE_SELECTORS.DISCOUNT_PRICE_VOUCHER_CART
                ).then((DISCOUNT_PRICE_VOUCHER_CART) => {
                  cy.print({
                    title: 'LOG',
                    message: `DISCOUNT_PRICE_VOUCHER_CART is: ${DISCOUNT_PRICE_VOUCHER_CART}`,
                    type: 'warning',
                  }).then(() => {
                    const prices = [
                      RECOMMENDED_SELLING_PRICE_CART,
                      SELLING_PRICE_CART,
                      DISCOUNTED_SELLING_PRICE_CART,
                      DISCOUNT_SUM_PRICE_CART,
                      DISCOUNT_PRICE_VOUCHER_CART,
                    ]
                    const definedPrices = prices.filter(
                      (price) => price !== undefined
                    )

                    if (definedPrices.length === 0) {
                      cy.print({
                        title: 'LOG',
                        message: `No price is defined`,
                        type: 'error',
                      })
                    }
                    return {
                      RECOMMENDED_SELLING_PRICE_CART:
                        RECOMMENDED_SELLING_PRICE_CART,
                      SELLING_PRICE_CART: SELLING_PRICE_CART,
                      DISCOUNTED_SELLING_PRICE_CART:
                        DISCOUNTED_SELLING_PRICE_CART,
                      DISCOUNT_SUM_PRICE_CART: DISCOUNT_SUM_PRICE_CART,
                      DISCOUNT_PRICE_VOUCHER_CART: DISCOUNT_PRICE_VOUCHER_CART,
                    }
                  })
                })
              }
            )
          })
        }
      )
    })
})

Cypress.Commands.add('getAllAvailablePricesInSummary', () => {
  cy.wait(4000)
  return cy
    .getSpecificSummaryPrice(PRICE_SELECTORS.TOTAL_RECOMMENDED_PRICE_SUMMARY)
    .then((TOTAL_RECOMMENDED_PRICE_SUMMARY) => {
      cy.print({
        title: 'LOG',
        message: `TOTAL_RECOMMENDED_PRICE_SUMMARY is: ${TOTAL_RECOMMENDED_PRICE_SUMMARY}`,
        type: 'warning',
      })
      return cy
        .getSpecificSummaryPrice(PRICE_SELECTORS.DISCOUNT_TOTAL_PRICE_SUMMARY)
        .then((DISCOUNT_TOTAL_PRICE_SUMMARY) => {
          cy.print({
            title: 'LOG',
            message: `DISCOUNT_TOTAL_PRICE_SUMMARY is: ${DISCOUNT_TOTAL_PRICE_SUMMARY}`,
            type: 'warning',
          })
          return cy
            .getSpecificSummaryPrice(PRICE_SELECTORS.SHIPPING_PRICE_SUMMARY)
            .then((SHIPPING_PRICE_SUMMARY) => {
              cy.print({
                title: 'LOG',
                message: `SHIPPING_PRICE_SUMMARY is: ${SHIPPING_PRICE_SUMMARY}`,
                type: 'warning',
              })
              return cy
                .getSpecificSummaryPrice(
                  PRICE_SELECTORS.SHIPPING_FREE_PRICE_SUMMARY
                )
                .then((SHIPPING_FREE_PRICE_SUMMARY) => {
                  cy.print({
                    title: 'LOG',
                    message: `SHIPPING_FREE_PRICE_SUMMARY is: ${SHIPPING_FREE_PRICE_SUMMARY}`,
                    type: 'warning',
                  })
                  return cy
                    .getSpecificSummaryPrice(
                      PRICE_SELECTORS.PAYMENT_PRICE_SUMMARY
                    )
                    .then((PAYMENT_PRICE_SUMMARY) => {
                      cy.print({
                        title: 'LOG',
                        message: `PAYMENT_PRICE_SUMMARY is: ${PAYMENT_PRICE_SUMMARY}`,
                        type: 'warning',
                      })
                      return cy
                        .getSpecificSummaryPrice(
                          PRICE_SELECTORS.PAYMENT_FREE_PRICE_SUMMARY
                        )
                        .then((PAYMENT_FREE_PRICE_SUMMARY) => {
                          cy.print({
                            title: 'LOG',
                            message: `PAYMENT_FREE_PRICE_SUMMARY is: ${PAYMENT_FREE_PRICE_SUMMARY}`,
                            type: 'warning',
                          })
                          return cy
                            .getSpecificSummaryPrice(
                              PRICE_SELECTORS.COUPON_PRICE_TOTAL_SUMMARY
                            )
                            .then((COUPON_PRICE_TOTAL_SUMMARY) => {
                              cy.print({
                                title: 'LOG',
                                message: `COUPON_PRICE_TOTAL_SUMMARY is: ${COUPON_PRICE_TOTAL_SUMMARY}`,
                                type: 'warning',
                              })
                              return cy
                                .getSpecificSummaryPrice(
                                  PRICE_SELECTORS.TOTAL_PRICE_SUMMARY
                                )
                                .then((TOTAL_PRICE_SUMMARY) => {
                                  cy.print({
                                    title: 'LOG',
                                    message: `TOTAL_PRICE_SUMMARY is: ${TOTAL_PRICE_SUMMARY}`,
                                    type: 'warning',
                                  }).then(() => {
                                    const prices = [
                                      TOTAL_RECOMMENDED_PRICE_SUMMARY,
                                      DISCOUNT_TOTAL_PRICE_SUMMARY,
                                      SHIPPING_PRICE_SUMMARY,
                                      SHIPPING_FREE_PRICE_SUMMARY,
                                      PAYMENT_PRICE_SUMMARY,
                                      PAYMENT_FREE_PRICE_SUMMARY,
                                      COUPON_PRICE_TOTAL_SUMMARY,
                                      TOTAL_PRICE_SUMMARY,
                                    ]

                                    const definedPrices = prices.filter(
                                      (price) => price !== undefined
                                    )

                                    if (definedPrices.length === 0) {
                                      cy.print({
                                        title: 'LOG',
                                        message: `No price is defined`,
                                        type: 'error',
                                      })
                                    }
                                    return {
                                      TOTAL_RECOMMENDED_PRICE_SUMMARY:
                                        TOTAL_RECOMMENDED_PRICE_SUMMARY,
                                      DISCOUNT_TOTAL_PRICE_SUMMARY:
                                        DISCOUNT_TOTAL_PRICE_SUMMARY,
                                      SHIPPING_PRICE_SUMMARY:
                                        SHIPPING_PRICE_SUMMARY,
                                      SHIPPING_FREE_PRICE_SUMMARY:
                                        SHIPPING_FREE_PRICE_SUMMARY,
                                      PAYMENT_PRICE_SUMMARY:
                                        PAYMENT_PRICE_SUMMARY,
                                      PAYMENT_FREE_PRICE_SUMMARY:
                                        PAYMENT_FREE_PRICE_SUMMARY,
                                      COUPON_PRICE_TOTAL_SUMMARY:
                                        COUPON_PRICE_TOTAL_SUMMARY,
                                      TOTAL_PRICE_SUMMARY: TOTAL_PRICE_SUMMARY,
                                    }
                                  })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})

Cypress.Commands.add('getSpecificSummaryPrice', (selector) => {
  if (Cypress.$(selector).length > 0) {
    return cy
      .get(selector)
      .first()
      .then((element) => {
        const text = element.text()
        if (!isNaN(text.replace(',', '.'))) {
          return parseFloat(
            text
              .replace(',', '.')
              .match(/[\d,.]+/g)
              .join('')
          )
        } else {
          return text
        }
      })
  }
  return cy.wrap(undefined)
})

Cypress.Commands.add('getSpecificPrice', (selector) => {
  if (Cypress.$(selector).length > 0) {
    return cy
      .get(selector)
      .first()
      .then((element) => {
        return parseFloat(
          element
            .text()
            .replace(',', '.')
            .match(/[\d,.]+/g)
            .join('')
        )
      })
  }
  return undefined
})
