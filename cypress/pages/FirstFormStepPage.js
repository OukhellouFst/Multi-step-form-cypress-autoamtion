import BasePage from './BasePage';

export default class FirstFormStepPage extends BasePage {
  constructor() {
    super();
    this.url = '/';
    this.elements = {
      header: 'h1#header_1',
      firstName: '#first_4',
      lastName: '#last_4',
      email: '#input_5',
      fileUploadInput: "input[type=file]",
      nextButton: '#form-pagebreak-next_9'
    };
    this.defaultData = {};
  }

  visit() {
    super.visit(this.url);
  }

  fillForm(firstName, lastName, email, filePath) {
    cy.get(this.elements.firstName).type(firstName);
    cy.get(this.elements.lastName).type(lastName);
    cy.get(this.elements.email).type(email);
  }

  uploadFile(fileName){
    cy.readFile(`cypress/fixtures/${fileName}`, 'binary').then((fileContent) => {
      cy.log(`File size (bytes): ${fileContent.length}`);
      cy.log(`File size (KB): ${fileContent.length / 1024}`);
    });
    cy.get(this.elements.fileUploadInput).selectFile("cypress/fixtures/"+fileName)
  }

  fillFormAndUploadDocument(firstName, lastName, email) {
    this.fillForm(firstName, lastName, email);
  }

  clickNext() {
    cy.get(this.elements.nextButton).click();
  }

  fillAllFieldsExcept(fieldToSkip = '') {
    const data = cy.fixture('defaultTestData').then((testData) => {
      Object.keys(this.elements).forEach((field) => {
        if (field !== fieldToSkip && field !== 'header' && field !== 'fileUploadInput' && field !== 'nextButton') {
          cy.get(this.elements[field]).type(testData[field]);
        }
      });
      if (fieldToSkip !== 'fileUploadInput') {
        this.uploadFile(testData.fileName);
      }
    });
  }

  verifyFileRejected(message){
    cy.get('span.error-navigation-message').should('contain.text', message)
  }

  verifyFileAccepted(message) {
    cy.get('span.qq-upload-file').should('contain.text', message)
  }

}