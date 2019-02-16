// EXPORT
module.exports = () => {
  // Working variables
  const url = Cypress.env("URL");

  // SKills
  describe("Skills", () => {
    // A. RUN: Once before all tests in this wrapper
    before(() => {
      // I. GOTO: Frontpage, give data some time to load
      cy.visit(url).wait(2000);

      // II. GOTO: Scroll down to section
      cy.get("#toolset").scrollIntoView();
    });
  });
};
