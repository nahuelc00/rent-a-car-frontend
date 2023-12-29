/// <reference types="Cypress" />

describe('Welcome page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.viewport(1928, 768);
  });

  it('Should render page', () => {
    cy.get('#app').should('be.visible');
  });

  it('Should click in sign up button and redirect to /register', () => {
    cy.contains('Sign up').click();
    cy.url().should('include', '/register');
  });

  it('Should click in log in button and redirect to /login', () => {
    cy.contains('Log in').click();
    cy.url().should('include', '/login');
  });

  it("Should click in 'Create your account' and redirect to /register", () => {
    cy.contains('Create your account').click();
    cy.url().should('include', '/register');
  });

  context('When the user is logged in', () => {
    beforeEach(() => {
      cy.request('DELETE', 'http://localhost:3000/user');

      cy.register({
        email: 'cypressuser@mailtest.com',
        password: 'Password1234$',
        firstname: 'Firstname',
        lastname: 'Lastname',
        roles: 'user,admin',
      });

      cy.login({
        email: 'cypressuser@mailtest.com',
        password: 'Password1234$',
      });

      cy.visit('http://localhost:5173');
    });

    it('Should show the dashboard, the backoffice and the user panel', () => {
      cy.contains('Dashboard');
      cy.contains('Backoffice');
      cy.contains('F');
    });

    it('Should redirect to /dashboard when the user clicks on dashboard', () => {
      cy.contains('Dashboard').click({ force: true });
      cy.url().should('include', '/dashboard');
    });

    it('Should redirect to /backoffice when the user clicks on backoffice', () => {
      cy.contains('Backoffice').click({ force: true });
      cy.url().should('include', '/backoffice');
    });

    it('Should redirect to /profile when the user clicks on user panel', () => {
      cy.contains('F').click({ force: true });
      cy.url().should('include', '/profile');
    });

    after(() => {
      cy.clearCookie('access_token');
    });
  });
});
