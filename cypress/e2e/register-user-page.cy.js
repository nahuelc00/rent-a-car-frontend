/// <reference types="Cypress" />

describe('Register page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/register');
    cy.viewport(1928, 768);

    cy.get('input[placeholder=Firstname]').type('Firstname');
    cy.get('input[placeholder=Lastname]').type('Lastname');
    cy.get('input[placeholder=Email]').type('testemail@email.com');
    cy.get('input[placeholder=Password]').type('Password1234$');
  });

  it('Should render page', () => {
    cy.get('#app').should('be.visible');
  });

  it('Should register a user and redirect to /login', () => {
    cy.request('DELETE', 'http://localhost:3000/user');
    cy.contains('Sign up').click();
    cy.url().should('include', '/login');
  });

  it('Should get an error when try to register a user that already exists', () => {
    cy.contains('Sign up').click();
    cy.contains('This email already exists');
  });

  it('Should get an error when try to register a user with a invalid password', () => {
    cy.get('input[placeholder=Password]').clear();
    cy.get('input[placeholder=Password]').type('password');
    cy.contains('This password is invalid');
  });

  it('Should get an error when try to register a user with a invalid email', () => {
    cy.get('input[placeholder=Email]').clear();
    cy.get('input[placeholder=Email]').type('email');
    cy.contains('This email is invalid');
  });
});
