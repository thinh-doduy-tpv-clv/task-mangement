import LoginPage from "pages/LoginPage";

describe("POM 2 Test", () => {
  beforeEach(function () {
    // cy.generateFixture();
    cy.fixture("login").as("loginData");
    cy.fixture("random-data").as("randomData");
    cy.visit("/login.php");
  });

  it("Verify Login successful", function () {
    const { validUser } = this.loginData;
    const loginPage = new LoginPage();
    cy.login(validUser.email, validUser.password);
    // cy.login("selenium@qa", "qa@12345");
    loginPage.elements.successTxt().should("have.text", "Login Successfully");
  });

  it("Verify Login unsuccessful for invalid username/password", function () {
    const { invalidUser } = this.loginData;
    const loginPage = new LoginPage();
    cy.login(invalidUser.email, invalidUser.password);
    // cy.login("selenium", "qa@123");
    loginPage.elements
      .errorTxt()
      .should("contain", "Enter your userName and password correct");
  });
});
