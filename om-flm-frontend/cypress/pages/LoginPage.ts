class LoginPage {
  elements = {
    usernameInput: () => cy.get('input[name="userName"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginBtn: () => cy.get('input[name="submit"]'),
    successTxt: () => cy.get("h3"),
    errorTxt: () => cy.get("span"),
  };

  enterUsername(username: string) {
    this.elements.usernameInput().clear();
    this.elements.usernameInput().type(username);
  }

  enterPassword(password: string) {
    this.elements.passwordInput().clear();
    this.elements.passwordInput().type(password);
  }

  clickSubmit() {
    this.elements.loginBtn().click();
  }
}

export default LoginPage;
