import homePage from "../../pageObjects/homePage";

describe('Find all broken links on heycater webpage', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  /*Checks if cy.request() for each link returns status code as 200. If not, the link is broken.
    Test fails saying Linked In URL is broken : Unknown Status code 999 returned.
    Execution halted and cannot move ahead with other links on the webpage.
  */
  it('should find all broken links on a homepage - solution_1', () => {
    cy.get(homePage.listAllLinkshomePage).each((link) => {
      const href = link.attr('href');

      if (href && href.includes('http'))
        cy.request(href).its('status').should('eq', 200);

    });
  });

  /*In solution 1, the execution stopped and hence we could not find if there are more than one broken links
    on the webpage.
    To overcome this and find all broken links in one go, below solution can be used.
    It doesn't fail if Status !== 200/300.
    In cypress execution logs, we can see the linkes returning 404 and 999 and fix those broken links.
   */
  it('should find all broken links on a homepage - solution_2', () => {
    cy.get(homePage.listAllLinkshomePage).each((link) => {

      if (link.prop('href'))
        cy.request({
          url: link.prop('href'),
          failOnStatusCode: false
        });
      // logs complete URL
      cy.log(link.prop('href'));

    });
  });

  /* Using Cypress commands to check the status code is not 200/300/301
     Same as Solution 1, but just a verification for multiple status codes.
     The drawback here is, it also checks for the href attributes without having http in it
     which in turn fails on "en/tel:+4903056837200"
   */
  it('should find all broken links on a homepage - solution_3', () => {
    cy.checkAllBrokenLinks();
  });
});