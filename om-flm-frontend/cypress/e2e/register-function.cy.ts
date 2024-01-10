import LoginPage from "pages/login-feature";
import RegisterPage from "pages/RegisterPage";

describe("Register function", () => {
  beforeEach(function () {
    // cy.generateFixture();
    cy.fixture("RegisterFixture").as("user");
    // cy.fixture("random-data").as("randomData");
    cy.visit("/");
  });

  it("Verify Register successful", function () {
    const { ValidAccount } = this.user;
    const loginPage = new LoginPage();
    const registerPage = new RegisterPage();

    loginPage.clickRegister();

    cy.register(ValidAccount.email, ValidAccount.username, ValidAccount.password);
    
    registerPage.elements.toastifymsg()
      .should('have.text', ValidAccount.successmsg);
  });
});
