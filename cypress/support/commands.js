import homePage from '../pageObjects/homePage';

Cypress.Commands.add('checkAllBrokenLinks', () => {
    cy.get(homePage.listAllLinkshomePage).each($link => {
        cy.request($link.prop('href')).its('status').should('be.oneOf', [200, 301, 302]);
    });
});