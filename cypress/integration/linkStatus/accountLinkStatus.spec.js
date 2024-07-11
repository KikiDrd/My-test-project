import linkStatus from "../../utilities/linkStatus";

describe('User Account status link', () => {

    it('Status link user account menu', () => {
        const USER_MENU = '[data-testid="user-profile-menu-desktop-aside"] a'

        cy.logInFromHeader()

        linkStatus(USER_MENU)
    })
})


