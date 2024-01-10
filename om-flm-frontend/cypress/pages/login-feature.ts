class loginfeature {
  elements = {
    usernameInput: () => cy.get('#username'),
    passwordInput: () => cy.get('#password'),
    loginBtn: () => cy.get('body > section > div > div > div > form > input'),
    successTxt: () => cy.get('.Toastify__toast-body > :nth-child(2)'),
    signupbtn: () => cy.get('body > section > div > div > div > form > p > a'),
    forgotpwdbtn: () => cy.get('body > section > div > div > div > form > div.flex.items-center.justify-between.my-2 > a')
  //   errorTxt: () => cy.get("span"),
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

  clickRegister()  {
    this.elements.signupbtn().click();
  }

  clickForgot()  {
    this.elements.forgotpwdbtn().click();
  }
}

export default loginfeature;