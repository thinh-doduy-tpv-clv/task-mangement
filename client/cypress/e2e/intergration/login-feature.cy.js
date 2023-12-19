/// <reference types="cypress" />

let account

describe('Login Home Page', function() {
    before(() => {
        Cypress.on("uncaught:exception", (err, runnable) => {
            // Your custom handling logic here
            console.error("Uncaught exception:", err.message);
            // You can also choose to return false to prevent the error from failing the test
            return false
        })
    })

    beforeEach(function(){
        //access fixture data
        cy.fixture('example').then(function(account){
           this.account=account
        })
    })

    it('Access the Register Page', function() {
        //Given user is in the login page
        cy.visit('http://localhost:3000/sign-in')
        cy.get('body > section > div > div > div > h1')
            .should('have.text','Sign in to your account')
        // When user click on 'Sign up"
        cy.get('body > section > div > div > div > form > p > a')
            .should('have.text', 'Sign up')
            .click()
        // Then user go to the "Register Page"
        cy.get('body > section > div > div > div > h1')
            .should('have.text', 'Create Your Account') //Pass
    })

    it('Create a new account', function() {
        //Given User is in the "Register Page" 
        cy.visit('http://localhost:3000/sign-in')
        cy.get('body > section > div > a')
        cy.get('body > section > div > div > div > form > p > a')
            .should('have.text', 'Sign up')
            .click()
        cy.get('body > section > div > div > div > h1')
            .should('have.text', 'Create Your Account')

        //When User input <Email>
        cy.get('#email').type(this.account.email)
        // Username
        cy.get('#username').type(this.account.username)
        // <Password>
        cy.get('#password').type(this.account.password)
        // confirm password
        cy.get('#confirmPassword').type(this.account.password)
        // check into checkbox
        cy.get('#terms').check()
        // And And User click on the "Sign up" button
        cy.get('body > section > div > div > div > form > button')
            .click()

        //Then There is a msg "Register new account success!"
        cy.get('.Toastify__toast-body > :nth-child(2)')
            .should('have.text', 'Register new account success!') 
        //And User go to the "Login Page"
        cy.get('body > section > div > div > div > h1').should('have.text','Sign in to your account')//Pass
    })

    it('Login in',function() {
        //Given User is in the "Login Page"
        cy.visit('http://localhost:3000/sign-in')
        cy.get('body > section > div > div > div > h1')
            .should('have.text','Sign in to your account')
        //When User input <userID>
        cy.get('#username').type(this.account.username)
        // <Password>s
        cy.get('#password').type(this.account.password)
        //And User click on the "Sign" button
        cy.get('body > section > div > div > div > form > input')
            .click()
        //Then There is a message "Welcome!"
        cy.get('.Toastify__toast-body > :nth-child(2)')
            .should('be.visible')
            .should('have.text','Wellcome!')
        // //And User go to the "Task List"
        cy.url()
            .should('include','/task-management')
    })

    it('Login out',function() {
        //Given User is in "Task List"
        cy.visit('http://localhost:3000/sign-in')
        cy.get('#username').type(this.account.username)
        cy.get('#password').type(this.account.password)
        cy.get('body > section > div > div > div > form > input')
            .click()
        cy.get('.Toastify__toast-body > :nth-child(2)')
            .should('be.visible')
            .should('have.text','Wellcome!')
        cy.url()
            .should('include','/task-management')
            .log('User is in "Task List"')
        //When User click on the "Sign out" button
        cy.get('.justify-between > :nth-child(1)').click()
        //Then User go to the "Login Page"
        cy.get('body > section > div > div > div > h1')
            .should('have.text','Sign in to your account')
    })

    it.skip('Reset Password', function(){
        //Given User is at the "Forgot Password Page"
        cy.visit('http://localhost:3000/sign-in')
        cy.get('body > section > div > div > div > form > div.flex.items-center.justify-between.my-2 > a')
            .should('have.text','Forgot password?')
            .click()
        cy.get('body > section > div > div > h2')
            .should('have.text','Change Password')
        //When User input <Email>
        cy.get('#email').type(this.account.email)
        //<new_password.
        cy.get('#password').type(this.account.newpassword)
        //And User confirm <confirm_password>
        cy.get('#confirm-password').type(this.account.newpassword)
        
        cy.get('#newsletter').click()

        //And User click on the "Reset password" button
        cy.get('body > section > div > div > form > button')
            .should('have.text','Reset passwod')
            .click()
        //Then There is a <message>
        //And User back to "Login page"
    })
})