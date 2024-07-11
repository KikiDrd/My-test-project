import handleBankTransfer from '../support/commands/cart/payment/paymentHandlers/bankTransferHandler'

export const availablePayments = {
  CARD_ONLINE_PAYMENT: {
    value: 'cardPaymentOnline',
    handler: null,
  },
  BANK_TRANSFER_GO_PAY: {
    value: 'bankTransferGoPay',
    handler: null,
  },
  BANK_TRANSFER_PAY_U: {
    value: 'bankTransferPayu',
    handler: handleBankTransfer,
  },
  PAYMENT_ON_PICKUP_PLACE: {
    value: 'paymentOnPickupPlace',
    handler: null,
  },
  PAYMENT_ON_DELIVERY: {
    value: 'paymentOnDelivery',
    handler: null,
  },
  GOOGLE_PAY: {
    value: 'googlePay',
    handler: null,
  },
  APPLE_PAY: {
    value: 'applePay',
    handler: null,
  },
  PAYPAL: {
    value: 'paypal',
    handler: null,
  },
  BLIK: {
    value: 'blik',
    handler: null,
  },
  KLARNA: {
    value: 'klarna',
    handler: null,
  },
}
