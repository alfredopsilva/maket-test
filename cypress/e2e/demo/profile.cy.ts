describe('Profile Page Tests', function () {
    before(function () {
        cy.visit('http://localhost:3000/login');
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

    describe('Profile Page - Redirect to Edit Profile', function () {
        it('Should edit the profile', function () {
            cy.visit(`http://localhost:3000/profile/${this.userId}`);
            cy.get('[data-cy=edit-profile-btn]').click();
            cy.url().should('include', `/profile/edit/${this.userId}`);
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
        cy.get('[data-cy=logout-btn]').click();
        cy.url().should('eq', 'http://localhost:3000/login');
    });
});
