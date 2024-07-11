Cypress.Commands.add(
    'getEmailAfterAt',
    (baseUrl = Cypress.config('baseUrl')) => {
        let emailDomain
        if (baseUrl.includes('underarmour')) {
            emailDomain = Cypress.env('mail').atDomain
        } else {
            const startIndex = baseUrl.indexOf('www.') + 4
            const endIndex =
                baseUrl.lastIndexOf('/') === baseUrl.length - 1
                    ? baseUrl.length - 1
                    : baseUrl.length
            emailDomain = baseUrl.substring(startIndex, endIndex)
        }
        return emailDomain
    }
)
