// switch sa môže použiť aj mimo command, jedná sa o klasickú js funkcionalitu
// nejedná sa o cypress exclusive

Cypress.Commands.add('chooseShipment', (shipment) => {
  // do tejto sekcie sa píše spoločný čitateľ (napr. cy.get('selector').should(be.visible) a zároveň spoločné const

  const SHIPMENT_SELECTOR = '[data-testid="checkout-select-option"] .mt-1'

  cy.intercept({
    method: 'GET',
    url: URL_SHIPMENT_UPDATE,
  }).as('shipmentUpdate')

  // v rámci každého "case" je možné definovať akúkoľvek sadu príkazov ako v klasickom teste/commande/funkcii
  // switch sa hodí pri testovaní komponent ktoré zdieľajú nejaký spoločný základ
  // v našom prípade je využitie v testoch pri shipmente a paymente
  // po tento riadok je klasický zápis ako každého commandu/funkcie

  // ZAČIATOK SWITCH ZÁPISU //

  switch (shipment) {
    case 'shipment_name.PPL':
      cy.get(SHIPMENT_SELECTOR).click()
      break
    // každý case je oddelený breakom, to znamená že sada príkazov už neplatí pre ďalší case
    // ak tento break nie je definovaný, dá sa definovať spoločná sada príkazov pre viacero case (viz nižšie)
    case 'shipment_name.PACKETA':
      cy.get(SHIPMENT_SELECTOR)
        .filter((index, element) => {
          return Cypress.$(element).text().trim() === 'Zásilkovna'
        })
        .click()

    case 'GLS_CZ':

    case 'GLS_SK':
      cy.request({
        method: 'PATCH',
        url: env,
      })
      break

    // tu je znázornená časť kedy sa medzi jednotlivými case nepoužije break -> tzn. cy.request() sa vykoná pre každý definovaný case
    // v tomto prípade GLS_CZ & GLSK_SK
  }
  // KONIEC SWITCH ZÁPISU //

  // v tejto časi, oddelenj mimo switch case sa vykonávajú príkazy pre všetky case po skončení iterácie
  // v praxi to znamená že po každom výbere shipmentu chcem príkaz .wait() na update shipmentu
  cy.wait('@shipmentUpdate')
})

// použitie tohto commandu záleží na názve case
// v tomto prípade to bude cy.chooseShipment('PPL') -> všimnite si že sa jedná o string zápis
