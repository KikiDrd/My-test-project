Cypress.Commands.add('generateRandomDate', () => {
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
  }

  const randomMonth = getRandomNumber(1, 12)
  const randomYear = getRandomNumber(1920, 2024)
  const maxDay = getDaysInMonth(randomMonth, randomYear)
  const randomDay = getRandomNumber(1, maxDay)

  return {
    day: randomDay,
    month: randomMonth,
    year: randomYear,
  }
})

Cypress.Commands.add('checkInvalidInput', (selector) => {
  cy.get(selector).click()
  cy.get(selector).blur()
  cy.get(selector).should('have.class', 'border-danger-500')
})

Cypress.Commands.add('checkLinks', (containerSelector) => {
  // except mail and phone number
  cy.get(containerSelector).then(($container) => {
    const $links = $container.find('a')
    if ($links.length === 0) {
      cy.log('No links found within the container:', containerSelector)
      return
    }

    cy.wrap($links).each(($link) => {
      const href = $link.prop('href')
      if (
        href &&
        href.length > 0 &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:')
      ) {
        cy.request(href).then((response) => {
          expect(response.status).to.eq(200)
        })
      } else if (!href || href.length === 0) {
        cy.log('Empty HREF was found:', $link)
      }
    })
  })
})

Cypress.Commands.add('checkCheckbox', (selector) => {
  cy.get(`label:has(${selector})`).click()
  cy.get(selector).should('be.checked')
})

Cypress.Commands.add('verifyUrlContains', (expectedUrlPart) => {
  cy.wait(1500)
  cy.url().then((currentUrl) => {
    const decodedCurrentUrl = decodeURIComponent(currentUrl)
    const decodedExpectedUrlPart = decodeURIComponent(expectedUrlPart)
    console.log('Current URL:', decodedCurrentUrl)
    console.log('Expected URL Part:', decodedExpectedUrlPart)
    expect(decodedCurrentUrl).to.include(decodedExpectedUrlPart)
  })
})

Cypress.Commands.add('getTodayFormatted', () => {
  // generates today's date without leading zeros
  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  return `${day}. ${month}. ${year}`
})

Cypress.Commands.add('extractDate', (selector) => {
  // invoke all text from selector but pick date without leading zeros
  cy.get(selector)
    .invoke('text')
    .then((text) => {
      const dateMatch = text.match(/\d{1,2}\.\s\d{1,2}\.\s\d{4}/)
      if (dateMatch) {
        return dateMatch[0]
      } else {
        throw new Error('Date format not found in the text')
      }
    })
})
