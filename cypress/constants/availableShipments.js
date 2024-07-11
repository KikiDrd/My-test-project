import handlePPLShipment from '../support/commands/cart/shipment/shipmentHandlers/pplShipmentHandler'
import handlePacketaShipment from '../support/commands/cart/shipment/shipmentHandlers/packetaShipmentHandler'
import handleStorePickupShipment from '../support/commands/cart/shipment/shipmentHandlers/storePickupHandler'

export const availableShipments = {
  // pickup & box OR box
  PPL_PICKUP: {
    value: 'pplPickup',
    handler: handlePPLShipment,
  },
  PPL: {
    value: 'ppl',
    handler: null,
  },
  // pickup & box OR pickup
  PACKETA: {
    value: 'packeta',
    handler: handlePacketaShipment,
  },
  PACKETA_BOX: {
    value: 'packetaBox',
    handler: handlePacketaShipment,
  },
  PACKETA_PICKUP: {
    value: 'packetaPickup',
    handler: handlePacketaShipment,
  },
  GLS: {
    value: 'gls',
    handler: null,
  },
  STORE_PICKUP: {
    value: 'storePickup',
    handler: handleStorePickupShipment,
  },
  POST: {
    value: 'post',
    handler: null,
  },
  STATE_POST: {
    value: 'statePost',
    handler: null,
  },
  DPD: {
    value: 'dpd',
    handler: null,
  },
  HERMES: {
    value: 'hermes',
    handler: null,
  },
  DHL: {
    value: 'dhl',
    handler: null,
  },
  OVERSEAS: {
    value: 'overseasHr',
    handler: null,
  },
  INPOST: {
    value: 'inpost',
    handler: null,
  },
  FANCOURIER: {
    value: 'fancourier',
    handler: null,
  },
  EMAIL: {
    value: 'email',
    handler: null,
  },
}
