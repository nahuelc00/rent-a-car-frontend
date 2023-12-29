/// <reference types="Cypress" />

describe('Login page', () => {
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
    cy.visit('http://localhost:5173/login');
    cy.viewport(1928, 768);

    cy.get('input[placeholder=Email]').type('cypressuser@mailtest.com');
    cy.get('input[placeholder=Password]').type('Password1234$');
  });

  it('Should render page', () => {
    cy.get('#app').should('be.visible');
  });

  it.only('Should log in', () => {
    cy.contains('Sign in').click();
    cy.url().should('include', '/');
  });

  it('Should get an error when try to log in with a invalid email', () => {
    cy.get('input[placeholder=Email]').clear();
    cy.get('input[placeholder=Email]').type('cypress@mailtest.com');

    cy.contains('Sign in').click();

    cy.contains('Check your email and password');
  });

  it('Should get an error when try to log in with a invalid password', () => {
    cy.get('input[placeholder=Password]').clear();
    cy.get('input[placeholder=Password]').type('passwordincorrect');

    cy.contains('Sign in').click();

    cy.contains('Check your email and password');
  });
});
