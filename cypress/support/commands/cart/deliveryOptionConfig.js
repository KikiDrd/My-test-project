import {availablePayments as payment} from '../../../constants/availablePayments'
import {availableShipments as shipment} from '../../../constants/availableShipments'

// nejsou nastavené žádné shipment emailem a payment voucherem

const deliveryConfig = {
    orsay_cz_dev: {
        validCombinations: [
            {
                shipment: shipment.PPL_PICKUP,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.PPL,
                payments: payment.BANK_TRANSFER_GO_PAY,
            },
            {
                shipment: shipment.PACKETA,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.PACKETA,
                payments: payment.APPLE_PAY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.PAYMENT_ON_PICKUP_PLACE,
            },
        ],
    },
    orsay_cz_prod: {
        validCombinations: [
            {
                shipment: shipment.PPL_PICKUP,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.PPL,
                payments: payment.BANK_TRANSFER_GO_PAY,
            },
            {
                shipment: shipment.PACKETA,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.PACKETA,
                payments: payment.APPLE_PAY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.PAYMENT_ON_PICKUP_PLACE,
            },
        ],
    },
    orsay_sk_prod: {
        validCombinations: [
            {
                shipment: shipment.PACKETA,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.GLS,
                payments: payment.BANK_TRANSFER_GO_PAY,
            },
            {
                shipment: shipment.POST,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.POST,
                payments: payment.APPLE_PAY,
            },
            {
                shipment: shipment.POST,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
        ],
    },
    orsay_at_prod: {
        validCombinations: [
            {
                shipment: shipment.GLS,
                payments: payment.KLARNA,
            },
            {
                shipment: shipment.DPD,
                payments: payment.PAYPAL,
            },
            {
                shipment: shipment.POST,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.POST,
                payments: payment.APPLE_PAY,
            },
            {
                shipment: shipment.POST,
                payments: payment.GOOGLE_PAY,
            },
        ],
    },
    orsay_de_prod: {
        validCombinations: [
            {
                shipment: shipment.GLS,
                payments: payment.KLARNA,
            },
            {
                shipment: shipment.HERMES,
                payments: payment.PAYPAL,
            },
            {
                shipment: shipment.DHL,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.DHL,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.DHL,
                payments: payment.APPLE_PAY,
            },
        ],
    },
    orsay_hr_prod: {
        validCombinations: [
            {
                shipment: shipment.GLS,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.OVERSEAS,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
            {
                shipment: shipment.OVERSEAS,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.OVERSEAS,
                payments: payment.APPLE_PAY,
            },
        ],
    },
    orsay_hu_prod: {
        validCombinations: [
            {
                shipment: shipment.GLS,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.PACKETA,
                payments: payment.KLARNA,
            },
            {
                shipment: shipment.DPD,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.DPD,
                payments: payment.APPLE_PAY,
            },
            {
                shipment: shipment.POST,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
        ],
    },
    orsay_pl_prod: {
        validCombinations: [
            {
                shipment: shipment.PACKETA_BOX,
                payments: payment.BLIK,
            },
            {
                shipment: shipment.INPOST,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.POST,
                payments: payment.BANK_TRANSFER_PAY_U,
            },
            {
                shipment: shipment.POST,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.POST,
                payments: payment.KLARNA,
            },
        ],
    },
    orsay_ro_prod: {
        validCombinations: [
            {
                shipment: shipment.GLS,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
            {
                shipment: shipment.PACKETA,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.FANCOURIER,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.PACKETA_BOX,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
        ],
    },
    orsay_si_prod: {
        validCombinations: [
            {
                shipment: shipment.GLS,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
            {
                shipment: shipment.POST,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.PACKETA,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.PACKETA_BOX,
                payments: payment.APPLE_PAY,
            },
        ],
    },
    gap_cz_dev: {
        validCombinations: [
            {
                shipment: shipment.PPL,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
            {
                shipment: shipment.PPL_PICKUP,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.PACKETA,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.APPLE_PAY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.BANK_TRANSFER_GO_PAY,
            },
            {
                shipment: shipment.STORE_PICKUP,
                payments: payment.PAYMENT_ON_PICKUP_PLACE,
            },
        ],
    },
    gap_cz_prod: {
        validCombinations: [
            {
                shipment: shipment.PPL,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
            {
                shipment: shipment.PPL_PICKUP,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.PACKETA,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.APPLE_PAY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.BANK_TRANSFER_GO_PAY,
            },
            {
                shipment: shipment.STORE_PICKUP,
                payments: payment.PAYMENT_ON_PICKUP_PLACE,
            },
        ],
    },
    gap_sk_prod: {
        validCombinations: [
            {
                shipment: shipment.PACKETA,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
            {
                shipment: shipment.POST,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.GLS,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.STORE_PICKUP,
                payments: payment.APPLE_PAY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.BANK_TRANSFER_GO_PAY,
            },
            {
                shipment: shipment.STORE_PICKUP,
                payments: payment.PAYMENT_ON_PICKUP_PLACE,
            },
        ],
    },
    gap_at_prod: {
        validCombinations: [
            {
                shipment: shipment.GLS,
                payments: payment.PAYPAL,
            },
            {
                shipment: shipment.POST,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.DPD,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.STORE_PICKUP,
                payments: payment.APPLE_PAY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
        ],
    },
    gap_pl_prod: {
        validCombinations: [
            {
                shipment: shipment.GLS,
                payments: payment.BANK_TRANSFER_PAY_U,
            },
            {
                shipment: shipment.PACKETA_BOX,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.POST,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.INPOST,
                payments: payment.APPLE_PAY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.BLIK,
            },
        ],
    },
    ua_cz_dev: {
        validCombinations: [
            {
                shipment: shipment.PPL,
                payments: payment.BANK_TRANSFER_GO_PAY,
            },
            {
                shipment: shipment.PPL_PICKUP,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.PACKETA,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.APPLE_PAY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
            {
                shipment: shipment.STORE_PICKUP,
                payments: payment.PAYMENT_ON_PICKUP_PLACE,
            },
        ],
    },
    ua_cz_prod: {
        validCombinations: [
            {
                shipment: shipment.PPL,
                payments: payment.BANK_TRANSFER_GO_PAY,
            },
            {
                shipment: shipment.PPL_PICKUP,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.PACKETA,
                payments: payment.GOOGLE_PAY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.APPLE_PAY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
            {
                shipment: shipment.STORE_PICKUP,
                payments: payment.PAYMENT_ON_PICKUP_PLACE,
            },
        ],
    },
    ua_sk_prod: {
        validCombinations: [
            {
                shipment: shipment.PACKETA,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
            {
                shipment: shipment.STATE_POST,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.STORE_PICKUP,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.GLS,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
        ],
    },
    ua_hu_prod: {
        validCombinations: [
            {
                shipment: shipment.PACKETA,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.DPD,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
        ],
    },
    ua_si_prod: {
        validCombinations: [
            {
                shipment: shipment.POST,
                payments: payment.PAYMENT_ON_DELIVERY,
            },
            {
                shipment: shipment.GLS,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.PACKETA_PICKUP,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
            {
                shipment: shipment.PACKETA_BOX,
                payments: payment.CARD_ONLINE_PAYMENT,
            },
        ],
    },
}

export default deliveryConfig
