describe("User Flow - Login to Edit Profile", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
    cy.url().should("eq", "http://localhost:3000/login");
    cy.visit("http://localhost:3000/login");
    cy.get("[data-cy=email-input]").type("admin@admin.ai");
    cy.get("[data-cy=password-input]").type("admin");
    cy.get("[data-cy=submit-login-btn]").click();
    cy.url()
      .should("include", "/profile")
      .then((url) => {
        const id = url.split("/profile/")[1];
        cy.wrap(id).as("userId");
      });
  });

  it("should be able to login and see the profile", function () {
    cy.get("@userId").then((userId) => {
      cy.url().should("eq", `http://localhost:3000/profile/${userId}`);
    });
  });

  it("should be able to edit the profile", function () {
    cy.get("@userId").then((userId) => {
      cy.url().should("eq", `http://localhost:3000/profile/${userId}`);
      cy.get("[data-cy=edit-profile-btn]").click();
      cy.get("[data-cy=first-name-input]").clear();
      cy.get("[data-cy=first-name-input]").type("John");
      cy.get("[data-cy=last-name-input]").clear();
      cy.get("[data-cy=last-name-input]").type("Doe");
      cy.get("[data-cy=bio-input]").clear();
      cy.get("[data-cy=bio-input]").type(
        "I'm a software developer who enjoys solving problems through code and drinking coffee.",
      );
      cy.get("[data-cy=submit-edit-btn]").click();
      cy.url().should("eq", `http://localhost:3000/profile/${userId}`);
    });
  });

  it("should be able to logout", function () {
    cy.get("@userId").then((userId) => {
      cy.url().should("eq", `http://localhost:3000/profile/${userId}`);
      cy.get("[data-cy=logout-btn]").click();
      cy.url().should("eq", "http://localhost:3000/login");
    });
  });
});
