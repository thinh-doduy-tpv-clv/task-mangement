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
        cy.fixture('account').then(function(account){
           this.account=account
        })
    })

    it.skip('Access the Register Page', function() {
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

    it('Create a new account unsuccessfully', function() {
        //Given User is in the "Register Page"  
        cy.visit('http://localhost:3000/sign-in')
        cy.get('body > section > div > div > div > form > p > a')
            .click()
        cy.get('body > section > div > div > div > h1')
            .should('have.text', 'Create Your Account')
            .log('User is in the "Register Page"')
        //When User input <userID>, <Password>, <Email>
            // email is empty
        cy.get('#email').focus().blur()
        cy.get('body > section > div > div > div > form > div:nth-child(1) > p')
            .should('have.text', 'Email is required.')
            .log('Email is empty')
        cy.get('#email').type('abcgmail.com')
            // check invalid email  
        cy.get('body > section > div > div > div > form > div:nth-child(1) > p')
            .should('have.text', 'Entered value is not a valid email address')
            .log('Email is invalid')
            // input email
        cy.get('#email').clear().type('abc@gmail.com')
            .log('Email is correct')

            // username is empty
        cy.get('#username').focus().blur()
        cy.get('body > section > div > div > div > form > div:nth-child(2) > p')
            .should('have.text', 'Username is required.')
            .log('Username is empty')
            // check invalid username 
        cy.get('#username').type('chau.vu#$')
        cy.get('body > section > div > div > div > form > div:nth-child(2) > p')
            .should('have.text', 'Username can only contain letters, numbers, underscores, or hyphens.')
            .log('Username is invalid')
            // input username 
        cy.get('#username').clear().type('chau-vu_01')
            .log('Username is correct')

            // password is empty
        cy.get('#password').focus().blur()
        cy.get('body > section > div > div > div > form > div:nth-child(3) > p')
            .should('have.text', 'Password is required.')
            .log('Password is empty')
            // password is invalid
        cy.get('#password').type('abc')
        cy.get('body > section > div > div > div > form > div:nth-child(3) > p')
            .should('have.text', 'faile')
            .log('Password is invalid')

        cy.get('#confirmPassword').focus().blur()
        cy.get('body > section > div > div > div > form > div:nth-child(4) > p')
            .should('have.text', 'Password is required.')
            .log('ConfirmPassword is empty') 
    })

    it('Create a new account successfully', function() {
        //Given User is in the "Register Page" 
        cy.visit('http://localhost:3000/sign-in')
        cy.get('body > section > div > a')
        cy.get('body > section > div > div > div > form > p > a')
            .should('have.text', 'Sign up')
            .click()
        cy.get('body > section > div > div > div > h1')
            .should('have.text', 'Create Your Account')  //Pass

        //When User input <Email>
        cy.get('#email').type(this.account.email)
        // Username
        cy.get('#username').type(this.account.username)
        // <Password>
        cy.get('#password').type(this.account.password)
        // confirm password
        cy.get('#confirmPassword').type(this.account.password)
        // And And User click on the "Sign up" button
        cy.get('body > section > div > div > div > form > button')
            .should('have.text','Sign up')
            .click()

        //Then There is a msg "Register new account success!"
        cy.get('.Toastify__toast-body > :nth-child(2)')
            .should('have.text', 'Register new account success!') //Pass

        cy.wait(5000)

        //And User go to the "Login Page"
        cy.get('body > section > div > div > div > h1')
            .should('have.text','Sign in to your account')//Pass
        //And User can login with new account
        cy.get('body > section > div > div > div > h1')
            .should('have.text','Sign in to your account')// User is in login page
        cy.get('#username').type(this.account.username)  // <Username>
        cy.get('#password').type(this.account.password)  // <Password>
        cy.get('body > section > div > div > div > form > input')
            .click()  //And User click on the "Sign" button
        cy.get('.Toastify__toast-body > :nth-child(2)')
            .should('be.visible')
            .should('have.text','Welcome!') //Pass
        cy.url()
            .should('include','/task-management')
    })

    it.skip('Login in',function() {
        //Given User is in the "Login Page"
        cy.visit('http://localhost:3000/sign-in')
        cy.get('body > section > div > div > div > h1')
            .should('have.text','Sign in to your account')
        //When User input <userID>
        cy.get('#username').type(this.account.username)
        // <Password>s
        cy.get('#password').type(this.account.newpassword)
        //And User click on the "Sign" button
        cy.get('body > section > div > div > div > form > input')
            .click()
        //Then There is a message "Welcome!"
        cy.get('.Toastify__toast-body > :nth-child(2)')
            .should('be.visible')
            .should('have.text','Welcome!')
        // //And User go to the "Task List"
        cy.url()
            .should('include','/task-management')
    })

    it('Login and Logout',function() {
        //Given User is in "Task List"
        cy.visit('http://localhost:3000/sign-in')
        cy.get('#username').type(this.account.username)
        cy.get('#password').type(this.account.password)
        cy.get('body > section > div > div > div > form > input')
            .click()
        cy.get('.Toastify__toast-body > :nth-child(2)')
            .should('be.visible')
            .should('have.text','Welcome!')
        cy.url()
            .should('include','/task-management')
            .log('User is in "Task List"')
        //When User click on the "Sign out" button
        cy.get('#sign-out-btn').click()
        //Then User go to the "Login Page"
        cy.get('body > section > div > div > div > h1')
            .should('have.text','Sign in to your account')
    })

    it('Reset Password', function(){
        //Given User is in the "Forgot Password Page"
        cy.visit('http://localhost:3000/sign-in')
        cy.get('body > section > div > div > div > form > div.flex.items-center.justify-between.my-2 > a')
            .should('have.text','Forgot password?')
            .click()
        cy.get('body > section > div > div > h2')
            .should('have.text','Change Password')
        cy.get('#username').type(this.account.username) //Input <Username>
        cy.get('#email').type(this.account.email) //Input <Email>
        cy.get('body > section > div > div > form > button')
            .should('have.text','Reset password')
            .click()  //Confirm reset password
        cy.get('.Toastify__toast-body > div:nth-child(2)') //message verified correctly user
            .should('have.text', 'Redirecting to reset password page...')
        //And User go to the "Reset Password Page"
        cy.get('body > section > div > div > h2')
            .should('have.text','Reset Password')

        //When User update new <Password> at "Reset Password Page"
        cy.get('#password').type(this.account.newpassword)
        //And User verify it one more times
        cy.get('#passwordConfirm').type(this.account.newpassword)
        cy.get('body > section > div > div > form > button')
            .should('have.text', 'Confirm')
            .click() //click on the Re button
        cy.wait(3000)
        cy.get('.Toastify__toast-body > div:nth-child(2)') //message inform reset password successfully
            .should('have.text', 'Reset password successfully')
        //And User back to the "Login Page"
        cy.get('body > section > div > div > div > h1')
            .should('have.text','Sign in to your account') //User is in Login page
        cy.get('#username').type(this.account.username) // Input <Username>
        cy.get('#password').type(this.account.newpassword) // Input <Password>
        cy.get('body > section > div > div > div > form > input')
            .click()//click on the Submit button
        cy.get('.Toastify__toast-body > :nth-child(2)')
            .should('be.visible')
            .should('have.text','Welcome!') //message login successfully
        cy.url()
            .should('include','/task-management')
            .log('User is in "Task List"') // user is in task list
    })
})