### To add new shipment provider, extend following:

- if its new type of shipment, extend object in constants/availableShipments
- extend object shipmentOptions in desired .env files
- add shipment into desired combination array in deliveryOptionConfig.js

Depending on provider complexity you might want to add handler, extend in commands/cart/shipment/newHandler.js

### To add new payment provider, extend following:

- if its new type of payment, extend object in constants/availablePayments
- extend object paymentOptions in desired .env files
- add payment into desired combination array in deliveryOptionConfig.js

Depending on provider complexity you might want to add handler,
extend in commands/cart/payment/newHandler.js

### To add new form type & .spec.js file

- extend object FORM_NAMES in support/selectors/formInputSelectors.js
- if needed, extend also object FORM_SELECTORS & FORM_FIELDS
- if needed, extend action type in cypress/support/commands/fillForm.js

In test file, define data in object formData with fixtures, as following:

const formData = {
firstname: users.testing1.firstname,
lastname: users.testing1.lastname,
...
}

Finally use command cy.fillForm(formName, formData)

### To add new saleCodeType & .spec.js file

- extend object availableSaleCodes.js in constants/availableSaleCodes.js
- extend saleCode object in .env file(s)

### To add new user

- extend object users in users.js
- usage in test for login: cy.logUserIn('testing1')
- data usage in any test: users.testing1.firstname, users.registration.email, etc.

### To add commands

- when add a new command in cypress/support/commands/*,
it is necessary to add an export to index.js in the commands folder

### To add intercepts

- when add a new intercept in cypress/support/intercept/*,
it is necessary to add an export to index.js in the intercepts folder
