/// <reference types="Cypress" />

describe('Dashboard page', () => {
  before(() => {
    cy.request('DELETE', 'http://localhost:3000/user');

    cy.register({
      email: 'cypressuser@mailtest.com',
      password: 'Password1234$',
      firstname: 'Firstname',
      lastname: 'Lastname',
      roles: 'user,admin',
    });
  });

  beforeEach(() => {
    cy.login({
      email: 'cypressuser@mailtest.com',
      password: 'Password1234$',
    });

    cy.visit('http://localhost:5173/dashboard');
    cy.viewport(1928, 768);
  });

  it('Should render page', () => {
    cy.get('#app').should('be.visible');
    cy.contains('Dashboard');
    cy.url().should('include', '/dashboard');
  });
});
