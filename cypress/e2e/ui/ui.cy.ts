describe("UI Profile Tests", function () {
  before(function () {
    cy.visit("/login");
    cy.get("[data-cy=email-input]").type("admin@admin.ai");
    cy.get("[data-cy=password-input]").type("admin");
    cy.get("[data-cy=submit-login-btn]").click();
    cy.url()
      .should("include", "/profile")
      .then((url) => {
        const id = url.split("/profile/")[1];
        this.userId = id; // Set the userId on the context
      });
  });

  describe("Profile Page - UI Elements", function () {
    it("Should have NavBar elements", function () {
      cy.visit(`/profile/${this.userId}`);
      cy.get("[data-cy=navbar-header]").should("be.visible");
      cy.get("[data-cy=theme-switch]").should("be.visible");
      cy.get("[data-cy=theme-switch]").click();
      cy.get("[data-cy=light-mode]").should("exist");
      cy.get("[data-cy=dark-mode]").should("exist");
    });

    it("Should have and display these elements", function () {
      cy.visit(`/profile/${this.userId}`);
      cy.get("[data-cy=user-name]").should("be.visible").and("not.be.empty");
      cy.get("[data-cy=edit-profile-btn]").should("be.visible");
      cy.get("[data-cy=user-role]").should("be.visible").and("not.be.empty");
      cy.get("[data-cy=user-bio]").should("exist").and("not.be.empty");
    });

    it("Should have the correct image attributes", function () {
      cy.visit(`/profile/${this.userId}`);
      cy.get("[data-cy=user-avatar]")
        .should("have.attr", "src")
        .and("not.be.empty");
      cy.get("[data-cy=avatar-container]")
        .should("exist")
        .and("have.class", "rounded-full")
        .and("have.class", "overflow-hidden");
    });

    it("Should display the correct fallback avatar when no profile image is available", function () {
      cy.visit(`/profile/${this.userId}`);
      cy.get("[data-cy=user-avatar]")
        .should("have.attr", "src")
        .and("not.be.empty");
      cy.get("[data-cy=user-avatar]").invoke("attr", "src", "").trigger("load");
      cy.get("[data-cy=user-avatar]").should("not.have.attr", "src", "");
      cy.get("[data-cy=avatar-fallback]")
        .should("be.visible")
        .and("not.be.empty");
    });

    it("Should have correct accessibility attributes", function () {
      cy.visit(`/profile/${this.userId}`);
      cy.get("[data-cy=user-avatar]")
        .should("have.attr", "alt")
        .and("not.be.empty");
      cy.get("[data-cy=edit-profile-btn]").should(
        "have.attr",
        "aria-label",
        "Edit Profile",
      );
    });

    it("Should correctly display the user's role based on isAdmin status", function () {
      cy.visit(`/profile/${this.userId}`);
      cy.get("[data-cy=user-role]")
        .should("be.visible")
        .and(($role) => {
          const roleText = $role.text();
          expect(roleText).to.be.oneOf(["Admin", "User"]);
        });
    });

    it("Should have logout button", function () {
      cy.visit(`/profile/${this.userId}`);
      cy.get("[data-cy=logout-btn]")
        .should("be.visible")
        .and("have.text", "Logout");
    });
  });

  describe("Edit Profile Page - UI Element", function () {
    it("Should have NavBar Elements", function () {
      cy.visit(`/profile/edit/${this.userId}`);
      cy.get("[data-cy=navbar-header]").should("be.visible");
      cy.get("[data-cy=theme-switch]").should("be.visible");
      cy.get("[data-cy=theme-switch]").click();
      cy.get("[data-cy=light-mode]").should("exist");
      cy.get("[data-cy=dark-mode]").should("exist");
    });

    it("Should display Profile Edit Card", function () {
      cy.visit(`/profile/edit/${this.userId}`);
      cy.get("[data-cy=edit-title]")
        .should("be.visible")
        .and("have.text", "Edit Your Profile")
        .and("have.css", "font-size", "24px")
        .and("have.css", "font-weight", "600")
        .and("have.class", "tracking-tight");
      cy.get("[data-cy=edit-description]")
        .should("be.visible")
        .and("have.text", "Now you can edit your profile.")
        .and("have.css", "font-size", "14px");
      cy.get("[data-cy=edit-form]").should("be.visible");
      cy.get("[data-cy=first-name-label]")
        .should("be.visible")
        .and("have.text", "First Name");
      cy.get("[data-cy=first-name-input]")
        .should("be.visible")
        .and("have.attr", "type", "text");
      cy.get("[data-cy=last-name-label]")
        .should("be.visible")
        .and("have.text", "Last Name");
      cy.get("[data-cy=last-name-input]")
        .should("be.visible")
        .and("have.attr", "type", "text");
      cy.get("[data-cy=email-label]")
        .should("be.visible")
        .and("have.text", "Email");
      cy.get("[data-cy=email-input]")
        .should("be.visible")
        .and("have.attr", "type", "email");
      cy.get("[data-cy=password-label]")
        .should("be.visible")
        .and("have.text", "Password");
      cy.get("[data-cy=password-input]")
        .should("be.visible")
        .and("have.attr", "type", "password");
      cy.get("[data-cy=repeat-password-label]")
        .should("be.visible")
        .and("have.text", "Repeat Password");
      cy.get("[data-cy=repeat-password-input]")
        .should("be.visible")
        .and("have.attr", "type", "password");
      cy.get("[data-cy=profile-avatar-label]")
        .should("be.visible")
        .and("have.text", "Profile Image");
      cy.get("[data-cy=profile-avatar-input]")
        .should("be.visible")
        .and("have.attr", "type", "file");
      cy.get("[data-cy=bio-label]")
        .should("be.visible")
        .and("have.text", "Bio");
      cy.get("[data-cy=bio-input]").should("be.visible");
      cy.get("[data-cy=submit-edit-btn]")
        .should("be.visible")
        .and("have.attr", "type", "submit");
    });

    it("Should display return to profile option", function () {
      cy.visit(`/profile/edit/${this.userId}`);
      cy.get("[data-cy=return-to-profile]")
        .should("exist")
        .and("have.text", "Change of Plans? Return to yourProfile");
      cy.get("[data-cy=return-to-profile-btn]")
        .should("exist")
        .and("have.text", "Profile");
    });

    it("Should display error messages for incorrect First name and Last name", function () {
      cy.visit(`/profile/edit/${this.userId}`);
      cy.get("[data-cy=first-name-input]").clear();
      cy.get("[data-cy=last-name-input]").clear();
      cy.get("[data-cy=first-name-input]").type("a");
      cy.get("[data-cy=last-name-input]").type("a");
      cy.get("[data-cy=submit-edit-btn]").click();
      cy.get("[data-cy=first-name-error]")
        .should("exist")
        .and("have.text", "First Name must be at least 3 characters");
      cy.get("[data-cy=last-name-error]")
        .should("exist")
        .and("have.text", "Last Name must be at least 3 characters");
    });

    it("Should display error messages for incorrect email", function () {
      cy.visit(`/profile/edit/${this.userId}`);
      cy.get("[data-cy=email-input]").clear();
      cy.get("[data-cy=email-input]").type("a");
      cy.get("[data-cy=submit-edit-btn]").click();
      cy.get("[data-cy=email-input]").then(($input) => {
        const validationMessage = ($input[0] as HTMLInputElement)
          .validationMessage;
        expect(validationMessage).to.eq(
          "Please include an '@' in the email address. 'a' is missing an '@'.",
        );
      });
    });
  });

  describe("Sign-Up Page - UI Elements", function () {
    it("Should have the correct title and description", function () {
      cy.visit("/signup");
      cy.get("[data-cy=sign-up-title]")
        .should("be.visible")
        .and("have.text", "Sign Up")
        .and("have.css", "font-size", "24px");
      cy.get("[data-cy=sign-up-description]")
        .should("be.visible")
        .and("have.text", "Enter your your data below to create an Account.");
    });

    it("Should display the form with all fields", function () {
      cy.visit("/signup");
      cy.get("[data-cy=sign-up-form]").should("be.visible");
      cy.get("[data-cy=first-name-label]")
        .should("be.visible")
        .and("have.text", "First Name");
      cy.get("[data-cy=first-name-input]")
        .should("be.visible")
        .and("have.attr", "type", "text");
      cy.get("[data-cy=last-name-label]")
        .should("be.visible")
        .and("have.text", "Last Name");
      cy.get("[data-cy=last-name-input]")
        .should("be.visible")
        .and("have.attr", "type", "text");
      cy.get("[data-cy=email-label]")
        .should("be.visible")
        .and("have.text", "Email");
      cy.get("[data-cy=email-input]")
        .should("be.visible")
        .and("have.attr", "type", "email");
      cy.get("[data-cy=password-label]")
        .should("be.visible")
        .and("have.text", "Password");
      cy.get("[data-cy=password-input]")
        .should("be.visible")
        .and("have.attr", "type", "password");
      cy.get("[data-cy=repeat-password-label]")
        .should("be.visible")
        .and("have.text", "Repeat Password");
      cy.get("[data-cy=repeat-password-input]")
        .should("be.visible")
        .and("have.attr", "type", "password");
      cy.get("[data-cy=profile-avatar-label]")
        .should("be.visible")
        .and("have.text", "Profile Photo");
      cy.get("[data-cy=profile-avatar-input]")
        .should("be.visible")
        .and("have.attr", "type", "file");
      cy.get("[data-cy=submit-sign-up-btn]")
        .should("be.visible")
        .and("have.attr", "type", "submit");
    });

    it("Should display the login link", function () {
      cy.visit("/signup");
      cy.get("[data-cy=login-link]")
        .should("be.visible")
        .and("have.text", "Login");
    });

    it("Should display error message for empty first name", function () {
      cy.get("[data-cy=submit-sign-up-btn]").click();
      cy.get("[data-cy=first-name-input]").then(($input) => {
        const validationMessage = ($input[0] as HTMLInputElement)
          .validationMessage;
        expect(validationMessage).to.eq("Please fill out this field.");
      });
    });

    it("Should display error message for empty last name", function () {
      cy.get("[data-cy=submit-sign-up-btn]").click();
      cy.get("[data-cy=last-name-input]").then(($input) => {
        const validationMessage = ($input[0] as HTMLInputElement)
          .validationMessage;
        expect(validationMessage).to.eq("Please fill out this field.");
      });
    });

    it("Should display error message for invalid email", function () {
      cy.get("[data-cy=email-input]").type("invalid-email");
      cy.get("[data-cy=submit-sign-up-btn]").click();
      cy.get("[data-cy=email-input]").then(($input) => {
        const validationMessage = ($input[0] as HTMLInputElement)
          .validationMessage;
        expect(validationMessage).to.eq(
          "Please include an '@' in the email address. 'invalid-email' is missing an '@'.",
        );
      });
    });

    it("Should display error message for empty password", function () {
      cy.get("[data-cy=submit-sign-up-btn]").click();
      cy.get("[data-cy=password-input]").then(($input) => {
        const validationMessage = ($input[0] as HTMLInputElement)
          .validationMessage;
        expect(validationMessage).to.eq("Please fill out this field.");
      });
    });

    it("Should display error message for mismatched passwords", function () {
      cy.get("[data-cy=password-input]").type("password123");
      cy.get("[data-cy=repeat-password-input]").type("differentpassword");
      cy.get("[data-cy=submit-sign-up-btn]").click();
      cy.get("[data-cy=repeat-password-input]").then(($input) => {
        const validationMessage = ($input[0] as HTMLInputElement)
          .validationMessage;
        expect(validationMessage).to.eq("Passwords do not match.");
      });
    });

    it("Should display error message for empty profile photo if required", function () {
      // Assuming the profile photo is required
      cy.get("[data-cy=submit-sign-up-btn]").click();
      cy.get("[data-cy=profile-avatar-input]").then(($input) => {
        const validationMessage = ($input[0] as HTMLInputElement)
          .validationMessage;
        expect(validationMessage).to.eq("Please select a file.");
      });
    });
  });
});
