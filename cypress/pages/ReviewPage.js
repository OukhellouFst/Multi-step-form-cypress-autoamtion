import BasePage from './BasePage';
import SecondFormStepPage from './SecondFormStepPage';

export default class ReviewPage extends BasePage {
  constructor() {
    super();
    this.url = "/"
    this.reviewButton = '#input_2';
    this.reviewSubmitButton = '#input_2';
    this.backButton = '#form-pagebreak-back_9';
    this.dynamicDropDown = "#customFieldFrame_21";

    this.fields = { 
      fullName : ".combined > .value",
      email : ".email > .value",
      documentName : ".file > .value",
      titleDocument : ".text > .value",
      documentDescription : ".textarea > .value",
      category : ".select > .value"
    }
  }

  visit() {
    const secondFormStep = new SecondFormStepPage()
    secondFormStep.visit()
    secondFormStep.fillAllFieldsExcept()
    secondFormStep.clickNext()
    cy.get(this.reviewButton).click()
  }

  clickReviewButton() {
    cy.get(this.reviewButton).click()
  }

  verifyReviewPage(fullName,email,documentName,titleDocument,documentDescription,category){
    const fieldValues = {
      fullName,
      email,
      documentName,
      titleDocument,
      documentDescription,
      category
    };

    Object.entries(this.fields).forEach(([field, selector]) => {
      cy.get(selector)
        .should('be.visible')
        .and('contain.text', fieldValues[field])
        .then($element => {
          const actualText = $element.text().trim();
          const expectedText = fieldValues[field];
          expect(actualText).to.include(expectedText, `Expected ${field} to contain "${expectedText}", but got "${actualText}"`);
        });
    });
  }

  submitForm() {
    cy.get(this.reviewSubmitButton).click()
  }

  goToPreviousPage() {
    this.clickButton('Back');
  }
}