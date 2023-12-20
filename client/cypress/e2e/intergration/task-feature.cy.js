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
        cy.fixture('taskdata').then(function(taskdata){
           this.taskdata=taskdata
        })
    })

    it('Create a new task',function() {
        // Login to Task Mangement
        cy.visit('http://localhost:3000/sign-in')
        cy.get('#username').type(this.taskdata.username)// <Username>        
        cy.get('#password').type(this.taskdata.password)// <Password>
        //And User click on the "Sign" button
        cy.get('body > section > div > div > div > form > input')
            .click()
        //Then There is a message "Welcome!"
        cy.get('.Toastify__toast-body > :nth-child(2)')
            .should('be.visible')
            .should('have.text','Welcome!')
            .log('login successfully')
        // User is in Task List(Board)
        cy.url().should('include','/task-management')
        cy.wait(4000)
        cy.get('.w-full.justify-between > .flex')
            .should('have.text','Add new item')
            .click()
        
        //Given User opens the "Task Details"
        //cy.get('....')

        //When User input <taskname> and <description>
        cy.get('#title').type(this.taskdata.title)
        cy.get('#description').type(this.taskdata.desciption)
        //change duedate
        cy.get('#dueDate').focus().type(this.taskdata.duedate)
    
        //click save button
        cy.get('#popup-container > div > form > div.w-100.flex.justify-end.gap-4 > button.bg-blue-400.text-white.py-2.px-4.rounded-lg')
            .should('have.text','save')
            .click()
        cy.get('.Toastify__toast-body > :nth-child(2)')
            .should('be.visible')
            .should('have.text','New task has been created!')
    })

    it.only('Update date of a task', function() {
        // Precondition
            //Given User was signed in
        cy.visit('http://localhost:3000/sign-in')
        cy.get('#username').type(this.taskdata.username)//<Useranme>
        cy.get('#password').type(this.taskdata.password)//<Password>
           
        cy.get('body > section > div > div > div > form > input')
            .click()
        //Then There is a message "Welcome!"
        cy.get('.Toastify__toast-body > :nth-child(2)')
            .should('be.visible')
            .should('have.text','Welcome!')
            .log('login successfully')
        // User is in Task List(Board)
        cy.url().should('include','/task-management')
        
        //Given User opens the "Task Details"
        //cy.get('....')
        cy.get('[data-rfd-droppable-id="TODO"] > .h-\[80vh\]') 
            .find(cy.get('[data-rfd-draggable-id="10"] > .text-lg'))
        
    })
})