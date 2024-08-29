import BasePage from './BasePage';
import ReviewPage from './ReviewPage';

export default class ConfirmationPage extends BasePage {
  constructor() {
    super();
    this.url = '/';
    this.elements = {
      header: 'h1',
      message : 'div[style="text-align:center;"] > p'
    };
  }


  visit() {
    const reviewPage = new ReviewPage()
    reviewPage.visit()
    reviewPage.submitForm()
  }


  verifySubmissionMessage(title,message){
    cy.get(this.elements.header).should('contain.text',title);
    cy.get(this.elements.message).should('contain.text',message)
  }

}