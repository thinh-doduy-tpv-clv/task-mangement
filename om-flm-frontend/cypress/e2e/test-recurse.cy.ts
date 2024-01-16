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

    it('login to the caris', function() {
        // cy.visit('https://caris-test.cyberlogitec.us/')
        cy.visit('https://newfwd-dev.cyberlogitec.com.vn/login')
        cy.get("[view_id='username']").type('chauvu')
        cy.get("[view_id='$text1']").type('11111')
        cy.get("[view_id='companyId']").type('CVTDM')
        cy.contains('Login').click()
        cy.wait(5000)

        // cy.visit('https://caris-test.cyberlogitec.us/BKG_SHP_0001')
        cy.visit('https://newfwd-dev.cyberlogitec.com.vn/BKG_SHP_0001')
        cy.wait(5000)

        cy.get('#searchAreaContainer_saveCtnBtn').click()

        // recurse(
        //     () => cy.findShipment('SHP240100000016')
        // ).log('A')
        // cy.get('[view_id="shipmentListGrid"] > div[class="webix_ss_vscroll webix_vscroll_y"]').children().scrollTo('')
        // cy.get('[view_id="shipmentListGrid"] > div[class="webix_ss_body"] > div[class="webix_ss_center"] > div[class="webix_ss_center_scroll"]').scrollTo('top',"30px")

        // cy.get('[view_id="shipmentListGrid"]').invoke('show').click()
        // cy.wait(1000)
        // cy.get('.webix_c_scroll_y').trigger('mousedown', {top: 6})
        // cy.get('[view_id="shipmentListGrid"] > div[class="webix_c_scroll_y"]').children().scrollTo('bottom')
        cy.get('[view_id="shipmentListGrid"] > div[class="webix_ss_body"] > div[class="webix_ss_center"] > div[class="webix_ss_center_scroll"] > div:nth-child(2)').children()
            .each($shipmentId => {
                cy.wrap($shipmentId).invoke('text').then(text =>{
                    cy.log(text)
                    if (text === 'SHP231200000132'){
                        cy.wrap($shipmentId).dblclick()
                    } else{
                        cy.get('[view_id="shipmentListGrid"]').click()
                        cy.get('.webix_c_scroll_y').trigger('mosueover').scrollTo('bottom')
                    }
                })
            })
    })
    // it.only('gets 7', () => {
    //     recurse(
    //       () => cy.wrap(7),
    //       (n) => n === 7,
    //     ).should('equal', 7)
    //   })
})

