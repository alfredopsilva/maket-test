describe('Login Page - Have correct Elements', () => {
    it('Should have the following elements', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('[data-cy=app-container]')
            .should('exist')
            .and('have.class', 'flex-1');
        cy.get('[data-cy=login-container]')
            .should('exist')
            .and('have.class', 'rounded-xl')
            .and('have.class', 'border');
        cy.get('[data-cy=card-title]')
            .should('exist')
            .and('have.text', 'Login Page');
        cy.get('[data-cy=card-description]')
            .should('exist')
            .and('have.text', 'Enter your email below to login to your account')
            .and('have.css', 'font-size', '14px');
        cy.get('[data-cy=login-form]').should('exist');
        cy.get('[data-cy=email-label]')
            .should('exist')
            .and('have.text', 'Email');
        cy.get('[data-cy=email-input]').should('exist');
        cy.get('[data-cy=password-container]')
            .should('exist')
            .and('have.class', 'flex');
        cy.get('[data-cy=password-label]')
            .should('exist')
            .and('have.text', 'Password');
        cy.get('[data-cy=forgot-password-link]')
            .should('exist')
            .and('have.text', 'Forgot your password?')
            .and('have.css', 'text-decoration-line', 'underline');
        cy.get('[data-cy=password-input]').should('exist');
        cy.get('[data-cy=submit-login-btn]')
            .should('be.visible')
            .and('have.text', 'Login')
            .and('have.attr', 'type', 'submit')
            .and('have.css', 'padding-left', '16px')
            .and('have.css', 'padding-right', '16px')
            .and('have.css', 'padding-top', '8px')
            .and('have.css', 'padding-bottom', '8px')
            .and('have.css', 'align-items', 'center')
            .and('have.css', 'justify-content', 'center')
            .and('have.css', 'font-size', '14px')
            .and('have.css', 'font-weight', '500');
        cy.get('[data-cy=create-account]')
            .should('exist')
            .and('have.text', "Don't have an account? Sign up");
        cy.get('[data-cy=sign-up-link]')
            .should('exist')
            .and('have.text', 'Sign up')
            .and('have.css', 'text-decoration-line', 'underline');
    });
});
