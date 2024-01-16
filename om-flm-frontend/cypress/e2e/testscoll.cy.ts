import { recurse } from 'cypress-recurse'
import { RecurseDefaults } from 'cypress-recurse'

describe('get the element in page that has lazyload', () =>{
    before(() => {
        Cypress.on("uncaught:exception", (err, runnable) => {
            // Your custom handling logic here
            console.error("Uncaught exception:", err.message)
            // You can also choose to return false to prevent the error from failing the test
            return false
        })
    })
    it('scroll down', ()=>{
        cy.visit('https://docs.cypress.io/api/commands/invoke'); 

        cy.get('#__docusaurus_skipToContent_fallback > div > aside > div > div > nav > ul > li:nth-child(2) > ul').children().each($item =>{
            cy.wrap($item).invoke('text').then((name) =>{
                if (name === 'eq'){
                    cy.log(name)
                    cy.wrap($item).click()
                    return
                }
            })
        })
    })
})