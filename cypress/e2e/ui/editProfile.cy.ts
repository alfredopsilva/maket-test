describe('Edit Profile Page - UI Element', function () {
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

    it('Should have NavBar Elements', function () {
        cy.visit(`/profile/edit/${this.userId}`);
        cy.get('[data-cy=navbar-header]').should('be.visible');
        cy.get('[data-cy=theme-switch]').should('be.visible');
        cy.get('[data-cy=theme-switch]').click();
        cy.get('[data-cy=light-mode]').should('exist');
        cy.get('[data-cy=dark-mode]').should('exist');
    });

    it('Should display Profile Edit Card', function () {
        cy.visit(`/profile/edit/${this.userId}`);
        cy.get('[data-cy=edit-title]')
            .should('be.visible')
            .and('have.text', 'Edit Your Profile')
            .and('have.css', 'font-size', '24px')
            .and('have.css', 'font-weight', '600')
            .and('have.class', 'tracking-tight');
        cy.get('[data-cy=edit-description]')
            .should('be.visible')
            .and('have.text', 'Now you can edit your profile.')
            .and('have.css', 'font-size', '14px');
        cy.get('[data-cy=profile-form]').should('be.visible');
        cy.get('[data-cy=first-name-label]')
            .should('be.visible')
            .and('have.text', 'First Name');
        cy.get('[data-cy=first-name-input]')
            .should('be.visible')
            .and('have.attr', 'type', 'text');
        cy.get('[data-cy=last-name-label]')
            .should('be.visible')
            .and('have.text', 'Last Name');
        cy.get('[data-cy=last-name-input]')
            .should('be.visible')
            .and('have.attr', 'type', 'text');
        cy.get('[data-cy=email-label]')
            .should('be.visible')
            .and('have.text', 'Email');
        cy.get('[data-cy=email-input]')
            .should('be.visible')
            .and('have.attr', 'type', 'email');
        cy.get('[data-cy=password-label]')
            .should('be.visible')
            .and('have.text', 'Password');
        cy.get('[data-cy=password-input]')
            .should('be.visible')
            .and('have.attr', 'type', 'password');
        cy.get('[data-cy=repeat-password-label]')
            .should('be.visible')
            .and('have.text', 'Repeat Password');
        cy.get('[data-cy=repeat-password-input]')
            .should('be.visible')
            .and('have.attr', 'type', 'password');
        cy.get('[data-cy=profile-avatar-label]')
            .should('be.visible')
            .and('have.text', 'Profile Image URL');
        cy.get('[data-cy=profile-avatar-input]')
            .should('be.visible')
            .and('have.attr', 'type', 'text');
        cy.get('[data-cy=bio-label]')
            .should('be.visible')
            .and('have.text', 'Bio');
        cy.get('[data-cy=bio-input]').should('be.visible');
        cy.get('[data-cy=submit-btn]')
            .should('be.visible')
            .and('have.attr', 'type', 'submit');
    });

    it('Should display return to profile option', function () {
        cy.visit(`/profile/edit/${this.userId}`);
        cy.get('[data-cy=return-to-profile]')
            .should('exist')
            .and('have.text', 'Change of Plans? Return to yourProfile');
        cy.get('[data-cy=return-to-profile-btn]')
            .should('exist')
            .and('have.text', 'Profile');
    });

    it('Should display error messages for incorrect First name and Last name', function () {
        cy.visit(`/profile/edit/${this.userId}`);
        cy.get('[data-cy=first-name-input]').clear();
        cy.get('[data-cy=last-name-input]').clear();
        cy.get('[data-cy=first-name-input]').type('a');
        cy.get('[data-cy=last-name-input]').type('a');
        cy.get('[data-cy=submit-btn]').click();
        cy.get('[data-cy=first-name-error]')
            .should('exist')
            .and('have.text', 'First Name must be at least 3 characters');
        cy.get('[data-cy=last-name-error]')
            .should('exist')
            .and('have.text', 'Last Name must be at least 3 characters');
    });

    it('Should display error messages for incorrect email', function () {
        cy.visit(`/profile/edit/${this.userId}`);
        cy.get('[data-cy=email-input]').clear();
        cy.get('[data-cy=email-input]').type('a');
        cy.get('[data-cy=submit-btn]').click();
        cy.get('[data-cy=email-input]').then($input => {
            const validationMessage = ($input[0] as HTMLInputElement)
                .validationMessage;
            expect(validationMessage).to.eq(
                "Please include an '@' in the email address. 'a' is missing an '@'."
            );
        });
    });
});
