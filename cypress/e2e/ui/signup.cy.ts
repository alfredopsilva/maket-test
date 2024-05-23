import { warn } from 'console';

describe('Sign-Up Page - UI Elements', function () {
    it('Should have the correct title and description', function () {
        cy.visit('/signup');
        cy.get('[data-cy=sign-up-title]')
            .should('be.visible')
            .and('have.text', 'Sign Up')
            .and('have.css', 'font-size', '24px');
        cy.get('[data-cy=sign-up-description]')
            .should('be.visible')
            .and(
                'have.text',
                'Enter your your data below to create an Account.'
            );
    });

    it('Should display the form with all fields', function () {
        cy.visit('/signup');
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
        cy.get('[data-cy=submit-btn]')
            .should('be.visible')
            .and('have.attr', 'type', 'submit');
    });

    it('Should display the login link', function () {
        cy.visit('/signup');
        cy.get('[data-cy=login-link]')
            .should('be.visible')
            .and('have.text', 'Login');
    });

    it('Should display error message for empty first name', function () {
        cy.visit('/signup');
        cy.get('[data-cy=last-name-input]').type('Doe');
        cy.get('[data-cy=email-input]').type('johndoe@gmail.com');
        cy.get('[data-cy=password-input]').type('password123');
        cy.get('[data-cy=repeat-password-input]').type('password123');
        cy.get('[data-cy=bio-input]').type(
            'I am a software developer and I like to run'
        );
        cy.get('[data-cy=submit-btn]').click();
        cy.get('[data-cy=first-name-error]')
            .should('be.visible')
            .and('have.text', 'First Name must be at least 3 characters');
    });

    it('Should display error message for empty last name', function () {
        cy.visit('/signup');
        cy.get('[data-cy=first-name-input]').type('John');
        cy.get('[data-cy=email-input]').type('johndoe@gmail.com');
        cy.get('[data-cy=password-input]').type('password123');
        cy.get('[data-cy=repeat-password-input]').type('password123');
        cy.get('[data-cy=bio-input]').type(
            'I am a software developer and I like to run'
        );
        cy.get('[data-cy=submit-btn]').click();
        cy.get('[data-cy=last-name-error]')
            .should('be.visible')
            .and('have.text', 'Last Name must be at least 3 characters');
    });

    it('Should display error message for invalid email', function () {
        cy.visit('/signup');
        cy.get('[data-cy=first-name-input]').type('John');
        cy.get('[data-cy=last-name-input]').type('Doe');
        cy.get('[data-cy=password-input]').type('password123');
        cy.get('[data-cy=repeat-password-input]').type('password123');
        cy.get('[data-cy=email-input]').type('invalid-email');
        cy.get('[data-cy=submit-btn]').click();
        cy.get('[data-cy=email-input]').then($input => {
            const validationMessage = ($input[0] as HTMLInputElement)
                .validationMessage;
            expect(validationMessage).to.eq(
                "Please include an '@' in the email address. 'invalid-email' is missing an '@'."
            );
        });
    });

    it('Should display error message for empty password', function () {
        cy.visit('/signup');
        cy.get('[data-cy=first-name-input]').type('John');
        cy.get('[data-cy=last-name-input]').type('Doe');
        cy.get('[data-cy=email-input]').type('johndoe@gmail.com');
        cy.get('[data-cy=bio-input]').type('I am a software developer');
        cy.get('[data-cy=submit-btn]').click();
        cy.get('[data-cy=returned-message]')
            .should('be.visible')
            .and('have.text', 'Password must be at least 4 characters');
    });

    it('Should display error message for mismatched passwords', function () {
        cy.visit('/signup');
        cy.get('[data-cy=first-name-input]').type('John');
        cy.get('[data-cy=last-name-input]').type('Doe');
        cy.get('[data-cy=email-input]').type('johndoe@gmail.com');
        cy.get('[data-cy=bio-input]').type('I am a software developer');
        cy.get('[data-cy=password-input]').type('password123');
        cy.get('[data-cy=repeat-password-input]').type('password1234');
        cy.get('[data-cy=submit-btn]').click();
        cy.get('[data-cy=returned-message]')
            .should('be.visible')
            .and('have.text', 'Passwords do not match');
    });

    it('Should display error message for empty bio', function () {
        cy.visit('/signup');
        cy.get('[data-cy=first-name-input]').type('John');
        cy.get('[data-cy=last-name-input]').type('Doe');
        cy.get('[data-cy=email-input]').type('johndoe@gmail.com');
        cy.get('[data-cy=password-input]').type('password123');
        cy.get('[data-cy=repeat-password-input]').type('password123');
        cy.get('[data-cy=submit-btn]').click();
        cy.get('[data-cy=bio-error]')
            .should('be.visible')
            .and('have.text', 'Bio must be at least 10 characters');
    });
});
