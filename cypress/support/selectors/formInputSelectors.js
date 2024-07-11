export const FORM_SELECTORS = {
  FORM_CONTACT: '#form-contacts',
  FORM_DISCOUNT: 'form[name="checkoutSummaryBarVouchersDiscountForm"]',
  FORM_CHANGE_PASSWORD: 'form[name="changePassword"]',
  FORM_SIGN_IN: 'form[name="signInForm"]',
  FORM_SIGN_UP: 'form[name="signUpForm"]',
  FORM_CHECKOUT_CONTACT: 'form[name="checkoutContactsForm"]',
}

export const FORM_NAMES = {
  CONTACT: 'FORM_CONTACT',
  DISCOUNT: 'FORM_DISCOUNT',
  CHANGE_PASSWORD: 'FORM_CHANGE_PASSWORD',
  SIGN_IN: 'FORM_SIGN_IN',
  SIGN_UP: 'FORM_SIGN_UP',
  CHECKOUT_CONTACT: 'FORM_CHECKOUT_CONTACT',
}

export const FORM_FIELDS = {
  firstname: {
    selector: 'input[type="text"][name="firstname"]',
    action: 'type',
  },
  lastname: {
    selector: 'input[type="text"][name="lastname"]',
    action: 'type',
  },
  emailText: {
    selector: 'input[type="text"][name="email"]',
    action: 'type',
  },
  email: {
    selector: 'input[type="email"][name="email"]',
    action: 'type',
  },
  phoneNumber: {
    selector: 'input[type="tel"][name="phoneNumber"]',
    action: 'type',
  },
  judet: {
    selector:
      '[data-testid="checkout-contacts-select-district-dropdown"] select',
    action: 'select',
  },
  streetAddress: {
    selector: 'input[type="text"][name="streetAddress"]',
    action: 'type',
  },
  city: {
    selector: 'input[type="text"][name="city"]',
    action: 'type',
  },
  postalCode: {
    selector: 'input[type="text"][name="postalCode"]',
    action: 'type',
  },
  agreeWithTerms: {
    selector: 'input[type="checkbox"][name="agreeWithTerms"]',
    action: 'check',
  },
  saleCode: {
    selector: 'input[type="text"][name="code"]',
    action: 'type',
  },
  message: {
    selector: 'textarea[name="message"]',
    action: 'type',
  },
  password: {
    selector: 'input[type="password"][name="password"]',
    action: 'type',
  },
  oldPassword: {
    selector: 'input[type="password"][name="oldPassword"]',
    action: 'type',
  },
  newPassword: {
    selector: 'input[type="password"][name="newPassword"]',
    action: 'type',
  },
  newPasswordRepeat: {
    selector: 'input[type="password"][name="newPasswordRepeat"]',
    action: 'type',
  },
  companyId: {
    selector: 'input[type="text"][name="companyId"]',
    action: 'type',
  },
}
