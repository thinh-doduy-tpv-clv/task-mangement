export {};
declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      register(email: string, username: string , password: string): Chainable<void>;
      generateFixture(): Chainable<void>;
      loginByApi(username: string, password: string): Chainable<Response<any>>;
    }
  }
}
