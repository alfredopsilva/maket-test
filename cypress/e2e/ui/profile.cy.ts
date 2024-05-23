describe('UI Profile Tests', function () {
    before(function () {
        cy.visit('/login');
        cy.get('[data-cy=email-input]').type('admin@admin.ai');
        cy.get('[data-cy=password-input]').type('admin');
        cy.get('[data-cy=submit-login-btn]').click();
        cy.url()
            .should('include', '/profile')
            .then(url => {
                const id = url.split('/profile/')[1];
                this.userId = id; // Set the userId on the context
            });
    });

    describe('Profile Page - UI Elements', function () {
        it('Should have NavBar elements', function () {
            cy.visit(`/profile/${this.userId}`);
            cy.get('[data-cy=navbar-header]').should('be.visible');
            cy.get('[data-cy=theme-switch]').should('be.visible');
            cy.get('[data-cy=theme-switch]').click();
            cy.get('[data-cy=light-mode]').should('exist');
            cy.get('[data-cy=dark-mode]').should('exist');
        });

        it('Should have and display these elements', function () {
            cy.visit(`/profile/${this.userId}`);
            cy.get('[data-cy=user-name]')
                .should('be.visible')
                .and('not.be.empty');
            cy.get('[data-cy=edit-profile-btn]').should('be.visible');
            cy.get('[data-cy=user-role]')
                .should('be.visible')
                .and('not.be.empty');
            cy.get('[data-cy=user-bio]').should('exist').and('not.be.empty');
        });

        it('Should have the correct image attributes', function () {
            cy.visit(`/profile/${this.userId}`);
            cy.get('[data-cy=user-avatar]')
                .should('have.attr', 'src')
                .and('not.be.empty');
            cy.get('[data-cy=avatar-container]')
                .should('exist')
                .and('have.class', 'rounded-full')
                .and('have.class', 'overflow-hidden');
        });

        it('Should have correct accessibility attributes', function () {
            cy.visit(`/profile/${this.userId}`);
            cy.get('[data-cy=user-avatar]')
                .should('have.attr', 'alt')
                .and('not.be.empty');
            cy.get('[data-cy=edit-profile-btn]').should(
                'have.attr',
                'aria-label',
                'Edit Profile'
            );
        });

        it("Should correctly display the user's role based on isAdmin status", function () {
            cy.visit(`/profile/${this.userId}`);
            cy.get('[data-cy=user-role]')
                .should('be.visible')
                .and($role => {
                    const roleText = $role.text();
                    expect(roleText).to.be.oneOf(['Admin', 'User']);
                });
        });
    });
});

describe('Test Logout - UI elements', function () {
    it('Should have logout button', function () {
        cy.visit('/login');
        cy.get('[data-cy=email-input]').type('admin@admin.ai');
        cy.get('[data-cy=password-input]').type('admin');
        cy.get('[data-cy=submit-login-btn]').click();
        cy.url()
            .should('include', '/profile')
            .then(url => {
                const id = url.split('/profile/')[1];
                this.userId = id; // Set the userId on the context
            });

        cy.visit(`/profile/${this.userId}`);
        cy.get('[data-cy=logout-btn]')
            .should('be.visible')
            .and('have.text', 'Logout');
    });
});
