export default class BasePage {
    constructor() {
      this.url = '';
    }
  
    visit() {
      cy.visit(this.url);
    }
  
    getElement(selector) {
      return cy.get(selector);
    }
  
    clickElement(selector) {
      this.getElement(selector).click();
    }
  
    typeText(selector, text) {
      this.getElement(selector).clear().type(text);
    }
  
    selectOption(selector, option) {
      this.getElement(selector).select(option);
    }
  
    uploadFile(selector, filePath) {
      this.getElement(selector).attachFile(filePath);
    }
  
    clickButton(buttonText) {
      cy.contains('button', buttonText).click();
    }

    takeScreenshot(name) {
      cy.screenshot(name);
    }

    fillAllFieldsExcept(fieldToSkip = '') {
      const data = cy.fixture('defaultTestData').then((testData) => {
        Object.keys(this.elements).forEach((field) => {
          if (field !== fieldToSkip) {
            cy.get(this.elements[field]).type(testData[field]);
          }
        });
      })
    }

    verifyRequiredFieldMessage() {
      cy.get('span.error-navigation-message').should('contain.text', "This field is required.")
      cy.get('.error-navigation-inner > .error-navigation-message').should('contain.text', "There is 1 error on this page. Please correct it before moving on.")
    }
  }