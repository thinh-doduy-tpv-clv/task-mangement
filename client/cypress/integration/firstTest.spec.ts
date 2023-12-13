/// <reference types="cypress" />

describe("first test suite", () => {
  it("first test ", () => {
    cy.visit("/sign-in");
    cy.get("#email").type("nkmanh");
    cy.get("#password").type("123456789");
    cy.get('[type="submit"]').click();
  });
});
