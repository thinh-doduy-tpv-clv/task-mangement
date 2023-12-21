/// <reference types="cypress" />

import '@4tw/cypress-drag-drop'

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

    it.only('Create a new task',function() {
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
        cy.get('#add-new-task-btn')
            .click()
        
        //Given User opens the "Task Details"
        //cy.get('....')

        //When User input <taskname> and <description>
        cy.get('#title').type(this.taskdata.title)
        cy.get('#description').type(this.taskdata.description)
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

    it('Update data of a task', function() {
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
        //Open task detail that     
        cy.get('div[data-rfd-droppable-id="TODO"] > :nth-child(2)')
            .find('div[data-rfd-draggable-id]').each(($task) => {
                if($task.children().text().includes(this.taskdata.title)){
                    $task.find('[alt="Edit Task"]').click()
                }
            })
        //When User input <taskname> and <description>
        cy.get('#title').type('{del}{selectall}').type(this.taskdata.ntitle)
        cy.get('#description').type(this.taskdata.ndescription)
        //change duedate
        cy.get('#dueDate').focus().type(this.taskdata.nduedate)
        //And user click on the "Save" button
        cy.get('#popup-container > div > form > div.w-100.flex.justify-end.gap-4 > button.bg-blue-400.text-white.py-2.px-4.rounded-lg')
            .should('have.text','save')
            .click()
        //Then There is a <message>
        cy.get('.Toastify__toast-body > :nth-child(2)')
            .should('be.visible')
            .should('have.text','Update task successfully')
    })  

    it('Delete a task', function() {
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

        cy.get('#add-new-task-btn')
            .click()//click add button

        //Given User created a <taskname> with <status     
        cy.get('#title').type(this.taskdata.title)
        cy.get('#description').type(this.taskdata.description)
        //change duedate
        cy.get('#dueDate').focus().type(this.taskdata.duedate)
        //click save button
        cy.get('#popup-container > div > form > div.w-100.flex.justify-end.gap-4 > button.bg-blue-400.text-white.py-2.px-4.rounded-lg')
            .should('have.text','save')
            .click()
        cy.get('.Toastify__toast-body > :nth-child(2)')
            .should('be.visible')
            .should('have.text','New task has been created!')

        //When User click on the "Trash" icon
        cy.get('div[data-rfd-droppable-id="TODO"] > :nth-child(2)')
            .find('div[data-rfd-draggable-id]').each(($task) => {
                if($task.children().text().includes(this.taskdata.title)){
                    $task.find('[alt="Remove Task"]').click()
                }  
            })
    })

    it('Update status of task by drag and drop', function(){
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
        
        cy.get('div[data-rfd-droppable-id="TODO"] > :nth-child(2)')
            .find('div[data-rfd-draggable-id]').each(($task) => {
                if($task.children().text().includes(this.taskdata.ntitle)){
                    $task
                }  
            }).drag('div[data-rfd-droppable-id="IN PROGRESS"]')
    })
})