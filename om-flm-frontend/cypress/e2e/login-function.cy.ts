import LoginPage from "pages/login-feature";

describe("Login feature", () => {
  beforeEach(function () {
    // cy.generateFixture();
    cy.fixture("LoginFixture").as("user");
    // cy.fixture("random-data").as("randomData");
    cy.visit("/");
  });

  it("Verify Login successful", function () {
    const { validUser } = this.user;
    const loginPage = new LoginPage();
    cy.login(this.account.username, this.account.password);
    // cy.login("selenium@qa", "qa@12345");
    loginPage.elements.successTxt().should("have.text", "Welcome!");
  });

});
