/// <reference types="cypress" />
// import LoginPage from "pages/LoginPage";
import LoginPage from "pages/login-feature";
import RegisterPage from "pages/RegisterPage";
import { faker } from "@faker-js/faker";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (username, password) => {
  const loginPage = new LoginPage();
  loginPage.enterUsername(username);
  loginPage.enterPassword(password);
  loginPage.clickSubmit();
});

Cypress.Commands.add("register", (email, username, password) => {
  // const loginPage = new LoginPage();
  const registerpage = new RegisterPage();
  const loginPage = new LoginPage();
  
  registerpage.enteremail(email);
  registerpage.enterUsername(username);
  registerpage.enterPassword(password);
  registerpage.enterconfirmpassword(password);
  registerpage.clickSubmit();
});

Cypress.Commands.add("findShipment", (ID) => { 
  cy.get("body > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)")
    .children().each(($shipmentID) => {
      cy.wrap($shipmentID).invoke('text').then(SID => {
          // cy.log(ID)
          if (SID === ID){
              return cy.wrap($shipmentID)
          }
          cy.wrap($shipmentID).scrollIntoView()
      })
    })
})



Cypress.Commands.add("generateFixture", () => {
  cy.writeFile("cypress/fixtures/random-data.json", {
    testData: Cypress._.times(10, () => {
      return {
        title: `${faker.lorem.words(3)}`,
        url: `${faker.internet.url()}`,
        author: `${faker.person.firstName()} ${faker.person.lastName()}`,
        num_comments: `${faker.number.int({ min: 1, max: 100 })}`,
        points: `${faker.number.float()}`,
        objectID: `${faker.string.uuid()}`,
      };
    }),
  });
});

Cypress.Commands.add("loginByApi", (username, password) => {
  return cy.request("POST", `http://localhost:3000/login`, {
    username,
    password,
  });
});
