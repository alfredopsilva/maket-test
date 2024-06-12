describe.skip("login page - Password doesn't match the validations parameters.", () => {
    it("Should show validation errors when the password doesn't match the constraints", () => {
        cy.visit('http://localhost:3000/login');
        cy.get('[data-cy=email-input]').type('m@gmail.com');
        cy.get('[data-cy=password-input]').type('m20');
        cy.get('[data-cy=submit-login-btn]').click();
        cy.get('[data-cy=password-error]').should('exist');
    });
});

describe.skip('Login Page - Successful Login', () => {
    it('Should login successfully', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('[data-cy=email-input]').type('admin@admin.ai');
        cy.get('[data-cy=password-input]').type('admin');
        cy.get('[data-cy=submit-login-btn]').click();
        cy.url().should('include', '/profile');
    });
});

describe.skip('Login Page - Unsuccessful Login when password is wrong.', () => {
    it('Should not login successfully', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('[data-cy=email-input]').type('admin@admin.ai');
        cy.get('[data-cy=password-input]').type('admin1');
        cy.get('[data-cy=submit-login-btn]').click();
        cy.get('[data-cy=password-error]')
            .should('exist')
            .and('have.text', 'Please check your email and password');
    });
});

describe.skip('Login Page - Unsuccessful Login when email is wrong.', () => {
    it('Should not login successfully', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('[data-cy=email-input]').type('admin1@adsmin.ai');
        cy.get('[data-cy=password-input]').type('admin');
        cy.get('[data-cy=submit-login-btn]').click();
        cy.get('[data-cy=email-error]')
            .should('exist')
            .and('have.text', 'Please check your email and password');
    });
});

describe.skip('Login Page - Unsuccessful Login when both data is wrong.', () => {
    it('Should not login successfully', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('[data-cy=email-input]').type('admin1@adsmin.ai');
        cy.get('[data-cy=password-input]').type('admin');
        cy.get('[data-cy=submit-login-btn]').click();
        cy.get('[data-cy=email-error]')
            .should('exist')
            .and('have.text', 'Please check your email and password');
    });
});

describe.skip('Login Page - Correct form attributes', () => {
    it('Should have the following attributes', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('[data-cy=email-input]').should('have.attr', 'type', 'email');
        cy.get('[data-cy=email-input]').should('have.attr', 'required');
        cy.get('[data-cy=password-input]').should(
            'have.attr',
            'type',
            'password'
        );
        cy.get('[data-cy=password-input]').should('have.attr', 'required');
        cy.get('[data-cy=submit-login-btn]').should(
            'have.attr',
            'type',
            'submit'
        );
    });
});

describe.skip('Login Page - Theme Switch', () => {
    it('Should switch the theme', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('[data-cy=navbar-header]').should('exist');
        cy.get('[data-cy=theme-switch]').should('exist');
        cy.get('[data-cy=theme-switch]').click();
        cy.get('[data-cy=dark-mode]').click();
        cy.get('html').should('have.class', 'dark');
        cy.get('[data-cy=light-mode]').click();
        cy.get('html').should('not.have.class', 'dark');
    });
});

describe.skip('Login Page - When email is not typed.', () => {
    it('Should not login successfully', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('[data-cy=submit-login-btn]').click();
        cy.get('[data-cy=email-input]').then($input => {
            const validationMessage = ($input[0] as HTMLInputElement)
                .validationMessage;
            expect(validationMessage).to.eq('Please fill out this field.');
        });
        cy.get('[data-cy=password-input]').then($input => {
            const validationMessage = ($input[0] as HTMLInputElement)
                .validationMessage;
            expect(validationMessage).to.eq('Please fill out this field.');
        });
    });
});

describe.skip('Login Page - When password is not typed.', () => {
    it('Should not login successfully', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('[data-cy=email-input]').type('admin@admin.ai');
        cy.get('[data-cy=submit-login-btn]').click();
        cy.get('[data-cy=password-input]').then($input => {
            const validationMessage = ($input[0] as HTMLInputElement)
                .validationMessage;
            expect(validationMessage).to.eq('Please fill out this field.');
        });
    });
});

describe.skip('Login Page - Redirects to SignUp Page', () => {
    it('Should redirect to the SignUp page', () => {
        cy.visit('http://localhost:3000/login');
        cy.get('[data-cy=sign-up-link]').click();
        cy.url().should('include', '/signup');
    });
});
