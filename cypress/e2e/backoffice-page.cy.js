/// <reference types="Cypress" />

describe('Backoffice page', () => {
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

    cy.visit('http://localhost:5173/backoffice');
    cy.viewport(1928, 768);
  });

  it('Should render page', () => {
    cy.get('#app').should('be.visible');
    cy.contains('Hi Firstname');
  });

  context('Manage cars', () => {
    beforeEach(() => {
      cy.contains('Manage dashboard cars').click();
    });

    it('Save a car', () => {
      cy.request('DELETE', 'http://localhost:3000/cars');

      cy.contains('Add car').click();

      cy.get('input[name="brand"]').type('Brand');
      cy.get('input[name="licensePlate"]').type('DVV466');
      cy.get('input[name="year"]').type('2020');
      cy.get('input[name="color"]').type('Red');
      cy.get('input[name="passengers"]').type('4');
      cy.get('input[name="passengers"]').type('4');
      cy.get('input[name="model"]').type('Model');
      cy.get('input[name="kilometers"]').type('125400');
      cy.get('input[name="unitPrice"]').type('5000');
      cy.get('input[name="totalPrice"]').type('500000');
      cy.get('input[name="airConditioning"]').first().check();
      cy.get('input[name="transmission"]').first().check();
      cy.get('input[type="file"]').selectFile('cypress/car-mock.png', { force: true });

      cy.contains('Save car').click();
      cy.get('button').contains('Save').click();
      cy.contains('Car saved successfully');
    });

    it('Edit a car', () => {
      cy.get('a').contains('Edit').click();
      cy.get('input[type="file"]').selectFile('cypress/car-mock.png', { force: true });
      cy.get('input[name="color"]').clear();
      cy.get('input[name="color"]').type('Blue');
      cy.contains('Save car').click();
      cy.get('button').contains('Save').click();
      cy.contains('Car saved successfully');
    });

    it('See car details', () => {
      cy.get('a').contains('Detail').click();
      cy.contains('Brand Model');
      cy.contains('2020');
      cy.contains('Blue');
    });

    it('Delete car', () => {
      cy.get('a').contains('Delete').click();
      cy.get('button').contains('Delete').click();
      cy.contains('Car deleted successfully');
    });
  });

  context('Register a client', () => {
    beforeEach(() => {
      cy.contains('Register a client').click();
    });

    it('Should register a client', () => {
      cy.request('DELETE', 'http://localhost:3000/client');

      cy.get('input[placeholder="Firstname"]').type('Firstname');
      cy.get('input[placeholder="Lastname"]').type('Lastname');
      cy.get('input[placeholder="Email"]').type('testemail@mail.com');
      cy.get('select[name="documentType"]').select('DNI');
      cy.get('input[placeholder="Document number"]').type('11222333');
      cy.get('input[placeholder="Nationality"]').type('Argentina');
      cy.get('input[placeholder="Phone"]').type('0011223344');
      cy.get('input[placeholder="Address"]').type('Calle falsa 123');
      cy.get('input[type="date"]').type('1999-12-31');

      cy.get('button').contains('Register').click();

      cy.contains('The client was registered successfuly');
    });

    after(() => {
      cy.request('DELETE', 'http://localhost:3000/client');
    });
  });

  context('Manage rents', () => {
    before(() => {
      cy.request('DELETE', 'http://localhost:3000/client');

      cy.request('POST', 'http://localhost:3000/client/register', {
        firstname: 'Firstname',
        lastname: 'Lastname',
        email: 'testemailcypress@mail.com',
        documentType: 'DNI',
        documentNumber: 1112334455,
        nationality: 'Argentina',
        phone: '1122334455',
        address: 'Calle 124',
        dateOfBirth: '01/01/05',
      });

      cy.fixture('../car-mock.png', 'binary').then((imageBin) => {
        const blob = Cypress.Blob.binaryStringToBlob(imageBin, 'png');

        const data = new FormData();

        data.set('brand', 'Brand');
        data.set('licensePlate', 'ABZ200');
        data.set('year', '1994');
        data.set('color', 'Red');
        data.set('passengers', 3);
        data.set('model', 'Model');
        data.set('kilometers', 1566060);
        data.set('airConditioning', 'yes');
        data.set('transmission', 'manual');
        data.set('file', blob);
        data.set('unitPrice', 5000);
        data.set('totalPrice', 256000);

        cy.request({
          method: 'POST',
          url: 'http://localhost:3000/cars',
          headers: {
            'content-type': 'multipart/form-data; boundary=----CypressFormDataBoundary',
          },
          body: data,
        });
      });
    });

    it('Should add a rent', () => {
      cy.contains('Manage rents').click();
      cy.contains('Add rent').click();

      cy.get('input[placeholder="License plate"]').type('ABZ200');
      cy.get('input[placeholder="DNI"]').type('1112334455');
      cy.get('input[placeholder="Unit price"]').type('5000');
      cy.get('input[placeholder="Total price"]').type('256000');
      cy.get('input[name="dateFrom"]').type('2024-01-01');
      cy.get('input[name="dateTo"]').type('2024-05-01');
      cy.get('select[name="paymentMethod"]').select('cash');
      cy.get('select[name="paidRent"]').select('yes');

      cy.contains('Save rent').click();
      cy.contains('Rent saved successfully');
    });

    it('Should see the saved rent', () => {
      cy.contains('Manage rents').click();
      cy.contains('1112334455');
      cy.contains('ABZ200');
    });

    it('Should edit the rent', () => {
      cy.contains('Manage rents').click();
      cy.contains('Edit').click();

      cy.get('input[placeholder="Unit price"]').clear();
      cy.get('input[placeholder="Unit price"]').type('5500');

      cy.contains('Save rent').click();
      cy.contains('Rent updated successfully');
    });

    it('Should delete the rent', () => {
      cy.contains('Manage rents').click();
      cy.contains('Delete').click();

      cy.get('button').contains('Delete').click();
      cy.contains('Rent deleted successfully');
    });
  });
});
