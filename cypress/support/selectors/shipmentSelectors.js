// selectory pre typy dopravy
export const SHIPMENT_SELECTORS = {
    PPL: {
        SEARCH_CONTAINER: '.control-panel__search-form-group',
        DROPDOWN_MAP_RESULT: '.smap-suggest > .item',
        PICKUP_LINK: '.result__link',
        PICKUP_SUBMIT: '.control-panel__scroll-panel-controls',
    },
    PACKETA: {
        WIDGET: 'iframe#packeta-widget',
        COOKIES_CONSENT:
            'div[data-cookiefirst-widget="box"] button[data-cookiefirst-action="accept"]',
        BRANCH_SEARCH_CONTAINER: '.branchSearchContainer-0-2-71',
        BRANCH_LIST_ITEM:
            '.branch-list-wrapper .branch-list .branch-list-item', // .branch-list-item:not(.non-selectable)
        BRANCH_SELECT: 'button#btn_select_branch',
    },
}
