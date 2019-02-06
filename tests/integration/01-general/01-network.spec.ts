/// <reference types="Cypress" />

const config = require("../../../src/local");

// DEFINE: Working variables
const domain = config.portfolio.domain;
const url = config.portfolio.url;

describe("Network", () => {
  // 1. DEFINE: HTTP Routes
  describe("HTTP", () => {
    // A. TEST: Non WWW domain
    it("Redirect: http://", () => {
      cy.request({ url: `http://${domain}`, followRedirect: false }).then(
        res => {
          // I. VALIDATE: Status code
          expect(res.status).to.eq(301);

          // II. VALIDATE: Redirect url
          expect(res.redirectedToUrl).to.eq(`${url}/`);
        }
      );
    });

    // B. TEST: WWW Sub domain
    it("Redirect: http://www", () => {
      cy.request({ url: `http://www.${domain}`, followRedirect: false }).then(
        res => {
          // I. VALIDATE: Status code
          expect(res.status).to.eq(301);

          // II. VALIDATE: Redirect url
          expect(res.redirectedToUrl).to.eq(`${url}/`);
        }
      );
    });
  });

  // 1. DEFINE: HTTPS Routes
  describe("HTTPS", () => {
    // A. TEST: Non WWW domains
    it("NON-WWW", () => {
      cy.request({ url: `https://${domain}`, followRedirect: false }).then(
        res => {
          // I. VALIDATE: Status code
          expect(res.status).to.eq(301);

          // II VALIDATE: Redirect url
          expect(res.redirectedToUrl).to.eq(`${url}/`);
        }
      );
    });

    // B. TEST: WWW Sub domain
    it("WWW", () => {
      cy.request({ url: url, followRedirect: false }).then(res => {
        // I. VALIDATE: Status code
        expect(res.status).to.eq(200);
      });
    });
  });
});
