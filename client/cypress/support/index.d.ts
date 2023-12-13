export {};
declare global {
  namespace Cypress {
    interface Chainable {
      loginViaUser(userData: any): Chainable<void>;
      registerViaUser(userData: any): Chainable<void>;
    }
  }
}
