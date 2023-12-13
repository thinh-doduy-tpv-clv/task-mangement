/// <reference types="cypress" />

describe("first test suite", () => {
  it("first test ", () => {
    cy.visit("http://localhost:3000/sign-in");
    cy.get("#username").type("nkmanh");
    cy.get("#password").type("Manh@123");
    cy.get('[type="submit"]').click();
  });
});
