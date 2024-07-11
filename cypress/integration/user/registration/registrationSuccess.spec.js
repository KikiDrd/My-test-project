import { SELECTORS } from '../../../support/selectors/selectors'
import { users } from '../../../fixtures/users'

describe('Registration success', () => {
    it('Registration success', () => {
        cy.getByTestId(SELECTORS.LINK_REGISTRATION_HEADER).click()
        cy.wait('@waitRegistrationHead').its('response.statusCode').should('eq', 200)


        cy.userDetailsRegistration()

        cy.get(SELECTORS.GDPR_CHECKBOX)
            .click({force: true})
            .should('be.visible')
            .should('be.checked')

        cy.get(SELECTORS.INPUT_FIRSTNAME).should(
            'have.value',
            users.registration.firstname
        )
        cy.get(SELECTORS.INPUT_LASTNAME).should(
            'have.value',
            users.registration.lastname
        )
        cy.get(SELECTORS.INPUT_PASSWORD).should(
            'have.value',
            users.registration.password
        )

        cy.get(SELECTORS.BUTTON_SUBMIT_REGISTRATION).click()
        cy.wait('@waitVerifyAfterSubmitRegistration')
            .its('response.statusCode')
            .should('eq', 200)

        cy.getEmailAfterAt().then((emailAfterAt) => {
            // generate email part after @ depended on baseUrl
            cy.task('gmail:check', {
                from: 'info@' + emailAfterAt, // email from info@partOfBaseUrl
                subject: Cypress.env('mail').subjectActivation,
                after: new Date(Date.now() - 0.5 * 60 * 1000), // finding 30 seconds old email
            }).then((email) => {
                assert.isNotNull(email, 'Expected email was received')
                const emailHtml = new DOMParser().parseFromString(
                    email[0].body.html,
                    'text/html'
                ) // from html string to dom tree
                const emailButtons = Array.from(
                    emailHtml.querySelectorAll("a[target='_blank']")
                ).filter((item) => item.innerText !== '') // find buttons with text in email
                cy.visit(emailButtons[0].href) // activate account and continue to page from email button
            })
        })

        cy.wait('@userRegistrationSend')
            .its('response.statusCode')
            .should('eq', 200)

        // continue after activation account from email

        cy.wait('@userRegistrationPreferencesPage')
            .its('response.statusCode')
            .should('eq', 200)

        cy.selectRandomGenderId()

        // // check inputs with day / month / year
        // // date of birth - day
        //  for (let value = 1; value < 32; value = value + 1) {
        //    cy.get('input[name="day"]')
        //        .clear()
        //        .type(value.toString())
        //        .blur()
        //        .should('not.have.class', 'border-danger-500');
        //  }
        //
        // const notValidDayInput = [-1, 32]; // now passing -> i ,e-+ decimals
        //   notValidDayInput.forEach((value, index, array) => {
        //       cy.get('input[name="day"]')
        //         .clear()
        //         .type(value.toString())
        //         .blur()
        //         .should('have.class', 'border-danger-500');
        //   });
        //
        // const notShowDayInput = ['a', '$', '?', '!'];
        //   notShowDayInput.forEach((value, index, array) => {
        //       cy.get('input[name="day"]')
        //         .clear()
        //         .type(value.toString())
        //         .blur()
        //         .should('not.have.value', value.toString());
        //   });
        //
        // //date of birth - month
        // for (let value = 1; value < 13; value = value + 1) {
        //       cy.get('input[name="month"]')
        //         .clear()
        //         .type(value.toString())
        //         .blur()
        //         .should('not.have.class', 'border-danger-500');
        // }
        //
        // const notValidMonthInput = [-1, 13]; // now passing -> i ,e-+ decimals
        //     notValidMonthInput.forEach((value, index, array) => {
        //       cy.get('input[name="month"]')
        //         .clear()
        //         .type(value.toString())
        //         .blur()
        //         .should('have.class', 'border-danger-500');
        //     });
        //
        // const notShowMonthInput = ['a', '$', '?', '!'];
        //     notShowMonthInput.forEach((value, index, array) => {
        //       cy.get('input[name="month"]')
        //         .clear()
        //         .type(value.toString())
        //         .blur()
        //         .should('not.have.value', value.toString());
        //     });
        //
        // //date of birth - year
        // for (let value = 1900; value < 2024; value = value + 1) {
        //   cy.get('input[name="year"]')
        //       .clear()
        //       .type(value.toString())
        //       .blur()
        //       .should('not.have.class', 'border-danger-500');
        // }
        //
        // const notValidYearInput = [1899, 2024]; // now passing i ,e-+decimals
        //   notValidYearInput.forEach((value, index, array) => {
        //     cy.get('input[name="year"]')
        //       .clear()
        //       .type(value.toString())
        //       .blur()
        //       .should('have.class', 'border-danger-500');
        //   });
        //
        // const notShowYearInput = ['a', '$', '?', '!'];
        //   notShowYearInput.forEach((value, index, array) => {
        //     cy.get('input[name="year"]')
        //       .clear()
        //       .type(value.toString())
        //       .blur().should('not.have.value', value.toString());
        //   });

        cy.generateRandomDate().then((randomDate) => {
            cy.get(SELECTORS.INPUT_DAY)
                .clear()
                .type(randomDate.day.toString())
                .should('have.value', randomDate.day.toString())

            cy.get(SELECTORS.INPUT_MONTH)
                .clear()
                .type(randomDate.month.toString())
                .should('have.value', randomDate.month.toString())

            cy.get(SELECTORS.INPUT_YEAR)
                .clear()
                .type(randomDate.year.toString())
                .should('have.value', randomDate.year.toString())
        })

        function handleCheckboxSelection($checkboxes) {
            if ($checkboxes && $checkboxes.length > 0) {
                const randomIndex = Cypress._.random(0, $checkboxes.length - 1)
                const randomCheckboxName =
                    $checkboxes[randomIndex].getAttribute('label')
                cy.wrap($checkboxes[randomIndex])
                    .check({force: true})
                    .should('be.checked')
                cy.print({
                    title: 'LOG',
                    message: `Randomly selected checkbox: ${randomCheckboxName}`,
                    type: 'warning',
                })
            } else {
                cy.print({
                    title: 'LOG',
                    message: 'No checkboxes to select.',
                    type: 'warning',
                })
            }
        }

        cy.url().then((url) => {
            if (url.includes('underarmour')) {
                // Select checkboxes in the first fieldset
                cy.get('fieldset:first-of-type input[type="checkbox"]').then(
                    ($checkboxes) => {
                        handleCheckboxSelection($checkboxes)
                    }
                )
                // Select checkboxes in the second fieldset
                cy.get('fieldset:nth-of-type(2) input[type="checkbox"]').then(
                    ($checkboxes) => {
                        handleCheckboxSelection($checkboxes)
                    }
                )
            } else {
                // Select checkboxes in the first fieldset
                cy.get('fieldset:first-of-type input[type="checkbox"]').then(
                    ($checkboxes) => {
                        handleCheckboxSelection($checkboxes)
                    }
                )
            }
        })

        cy.get(SELECTORS.BUTTON_SUBMIT_REGISTRATION_DONE)
            .should('be.visible')
            .click()
        cy.wait('@userRegistrationSend')
            .its('response.statusCode')
            .should('eq', 200)

        cy.url('contain', Cypress.env('url').registrationDone)

        cy.print({ title: 'LOG', message: 'Registration was successfully completed', type: 'warning' })
    })
})
