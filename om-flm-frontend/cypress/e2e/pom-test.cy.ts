import LoginPage from "pages/LoginPage";

describe("POM Test", () => {
  beforeEach(function () {
    // cy.generateFixture();
    // cy.fixture("random-data").as("randomData");
    cy.visit("/login.php");
  });

  it("Verify Login successful", () => {
    const loginPage = new LoginPage();
    cy.login("selenium@qa", "qa@12345");
    loginPage.elements.successTxt().should("have.text", "Login Successfully");
  });

  it("Verify Login unsuccessful for invalid username/password", () => {
    const loginPage = new LoginPage();
    cy.login("selenium", "qa@123");
    loginPage.elements
      .errorTxt()
      .should("contain", "Enter your userName and password correct");
  });
});
