class registerfeature{
    elements = {
        emailInput: () => cy.get('#email'),
        usernameInput: () => cy.get('#username'),
        passwordInput: () => cy.get('#password'),
        confirmpasswordInput: () => cy.get('#confirmPassword'),
        toastifymsg: () => cy.get('.Toastify__toast-body > :nth-child(2)'),
        submitbtn:() => cy.get('body > section > div > div > div > form > button'),
    };
  
    enteremail(email: string) {
        this.elements.emailInput().clear();
        this.elements.emailInput().type(email);
    }

    enterUsername(username: string) {
        this.elements.usernameInput().clear();
        this.elements.usernameInput().type(username);
    }

    enterPassword(password: string) {
        this.elements.passwordInput().clear();
        this.elements.passwordInput().type(password);
    }
    
    enterconfirmpassword(password: string) {
        this.elements.confirmpasswordInput().clear();
        this.elements.confirmpasswordInput().type(password);
    }
    
    clickSubmit() {
        this.elements.submitbtn().click();
    }
}

export default registerfeature;