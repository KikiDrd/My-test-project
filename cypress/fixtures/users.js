module.exports = {
  users: {
    registration: {
      email:
        'ttestingMail' + Cypress.env('actualTimeString') + '@gmail.com',
      firstname: 'Test',
      lastname: 'Tester',
      password: 'password',
    },
    testing1: {
      email: 'testingMail1',
      password: 'password',
      firstname: 'Test',
      lastname: 'Tester',
    },
    testing2: {
      email: 'testingMail2',
      password: 'password',
      firstname: 'Test',
      lastname: 'Tester',
      // example users for login / registration in different tests
    },
  },
}
