describe("Edit Profile Page Tests", function () {
  before(function () {
    cy.visit("http://localhost:3000/login");
    cy.get("[data-cy=email-input]").type("admin@admin.ai");
    cy.get("[data-cy=password-input]").type("admin");
    cy.get("[data-cy=submit-login-btn]").click();
    cy.url()
      .should("include", "/profile")
      .then((url) => {
        const id = url.split("/profile/")[1];
        this.userId = id;
      });
  });

  describe("Edit Profile Page - Return to Profile", function () {
    it("Should return to profile", function () {
      cy.visit(`http://localhost:3000/profile/edit/${this.userId}`);
      cy.get("[data-cy=return-to-profile-btn]").click();
      cy.url().should("eq", `http://localhost:3000/profile/${this.userId}`);
    });
  });

  describe("Edit Profile Page - successfully changes", function () {
    it("Should change only user's name", function () {
      cy.visit(`http://localhost:3000/profile/edit/${this.userId}`);
      cy.get("[data-cy=first-name-input]").clear();
      cy.get("[data-cy=last-name-input]").clear();
      cy.get("[data-cy=first-name-input]").type("John");
      cy.get("[data-cy=last-name-input]").type("Doe");
      cy.get("[data-cy=submit-edit-btn]").click();
      cy.get("[data-cy=returned-message]")
        .should("exist")
        .and(
          "have.text",
          "Profile updated successfully. You will be redirected to your profile in 3 seconds.",
        );
      cy.url().should("eq", `http://localhost:3000/profile/${this.userId}`);
      cy.get("[data-cy=user-name]").should("have.text", "John Doe");
    });

    it("Should change only user's bio", function () {
      cy.visit(`http://localhost:3000/profile/edit/${this.userId}`);
      cy.get("[data-cy=bio-input]").clear();
      cy.get("[data-cy=bio-input]").type(
        "I am a software engineer who loves to solve problems and drink coffee.",
      );
      cy.get("[data-cy=submit-edit-btn]").click();
      cy.get("[data-cy=returned-message]")
        .should("exist")
        .and(
          "have.text",
          "Profile updated successfully. You will be redirected to your profile in 3 seconds.",
        );
      cy.url().should("include", "/profile");
    });

    it("Should change only user's email", function () {
      cy.visit(`http://localhost:3000/profile/edit/${this.userId}`);
      cy.get("[data-cy=email-input]").clear();
      cy.get("[data-cy=email-input]").type("a.alfredops@gmail.com");
      cy.get("[data-cy=submit-edit-btn]").click();
      cy.get("[data-cy=returned-message]")
        .should("exist")
        .and(
          "have.text",
          "Profile updated successfully. You will be redirected to your profile in 3 seconds.",
        );
      cy.url().should("eq", `http://localhost:3000/profile/${this.userId}`);
      cy.get("[data-cy=edit-profile-btn]").click();
      cy.url().should(
        "eq",
        `http://localhost:3000/profile/edit/${this.userId}`,
      );
      cy.get("[data-cy=email-input]").clear();
      cy.get("[data-cy=email-input]").type("admin@admin.ai");
      cy.get("[data-cy=submit-edit-btn]").click();
      cy.get("[data-cy=returned-message]")
        .should("exist")
        .and(
          "have.text",
          "Profile updated successfully. You will be redirected to your profile in 3 seconds.",
        );
      cy.url().should("eq", `http://localhost:3000/profile/${this.userId}`);
    });

    it("Change only the password", function () {
      cy.visit(`http://localhost:3000/profile/edit/${this.userId}`);
      cy.get("[data-cy=password-input]").type("19229094");
      cy.get("[data-cy=repeat-password-input]").type("19229094");
      cy.get("[data-cy=submit-edit-btn]").click();
      cy.get("[data-cy=returned-message]")
        .should("exist")
        .and(
          "have.text",
          "Profile updated successfully. You will be redirected to your profile in 3 seconds.",
        );
      cy.url().should(
        "eq",
        `http://localhost:3000/profile/edit/${this.userId}`,
      );
      cy.get("[data-cy=edit-profile-btn]").click();
      cy.get("[data-cy=password-input]").clear();
      cy.get("[data-cy=password-input]").type("admin");
      cy.get("[data-cy=repeat-password-input]").clear();
      cy.get("[data-cy=repeat-password-input]").type("admin");
      cy.get("[data-cy=submit-edit-btn]").click();
      cy.get("[data-cy=returned-message]")
        .should("exist")
        .and(
          "have.text",
          "Profile updated successfully. You will be redirected to your profile in 3 seconds.",
        );
      cy.url().should("eq", `http://localhost:3000/profile/${this.userId}`);
    });

    it("Should change only user's avatar", function () {
      cy.visit(`http://localhost:3000/profile/edit/${this.userId}`);
      cy.get("[data-cy=profile-avatar-input]").attachFile("photo.jpeg");
      cy.get("[data-cy=submit-edit-btn]").click();
      cy.get("[data-cy=returned-message]")
        .should("exist")
        .and(
          "have.text",
          "Profile updated successfully. You will be redirected to your profile in 3 seconds.",
        );
      cy.wait(3000);
      cy.url().should("eq", `http://localhost:3000/profile/${this.userId}`);
      cy.get("[data-cy=user-avatar]")
        .should("exist")
        .and("have.attr", "src")
        .and("not.be.empty");
    });
  });

  describe("Edit Profile Page - Check if Passwords are the same", function () {
    it("Should not edit the profile", function () {
      cy.visit(`http://localhost:3000/profile/edit/${this.userId}`);
      cy.get("[data-cy=password-input]").type("19229094");
      cy.get("[data-cy=repeat-password-input]").type("192290");
      cy.get("[data-cy=submit-edit-btn]").click();
      cy.get("[data-cy=returned-message]")
        .should("exist")
        .and("have.text", "Passwords do not match");
    });
  });
});
