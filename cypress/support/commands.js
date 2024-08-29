// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';


// Add this to your commands.js file or in a support file
Cypress.Commands.add('getFileSize', (fileName) => {
    return cy.fixture(fileName, 'binary')
      .then(contents => {
        const size = new Blob([contents]).size;
        return Promise.resolve(size);
      });
});



Cypress.Commands.add('getRequest',  (endpoint) => {
    return new Cypress.Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', endpoint, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    resolve(response);
                } else {
                    reject(new Error(`Request failed with status ${xhr.status}`));
                }
            }
        };
        xhr.send();
    });
});
