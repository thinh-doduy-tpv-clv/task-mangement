describe('Tutorialspoint Test', function () {
    // test case
    it('Test Case1', function (){
       // test step to launch a URL
       cy.visit("https://www.tutorialspoint.com/index.htm")
       // enter test in the edit box
       // assertion to validate the number of child elements
       cy.get('#gs_50d > tbody > tr > td').should('have.length',2)
       // locate element with get and find method
       cy.get('#gs_50d > tbody > tr > td').find('input').type('Cypress');
       //enter test in the edit box
    })
 })