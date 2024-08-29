import BasePage from './BasePage';
import FirstFormStepPage from './FirstFormStepPage';

export default class SecondFormStepPage extends BasePage {
  constructor() {
    super();
    this.url = '/';
    this.elements = {
      nextButton : '#form-pagebreak-next_14',
      backButton : '#form-pagebreak-back_14'
    }
    this.fields = {
      title:'#input_11',
      categorySelect : '#input_13',
      documentDescriptionTextarea : '#input_7',
    }

  }
  
  visit(){
    super.visit(this.url)
    // fill the first form step with deafult data 
    const firstStepForm = new FirstFormStepPage();
    firstStepForm.fillAllFieldsExcept();
    firstStepForm.clickNext()
  }

  fillMetadata(title, description,category) {
    this.typeText(this.fields.title, title);
    this.typeText(this.fields.documentDescriptionTextarea,description);
    this.selectOption(this.fields.categorySelect, category);
  }

  fillAllFieldsExcept(fieldToSkip = '') {
    const data = cy.fixture('defaultTestData').then((testData) => {
      Object.keys(this.fields).forEach((field) => {
        if(field == "categorySelect"){
          this.selectOption(this.fields.categorySelect, testData[field]);
        }
        else if (field !== fieldToSkip) {
          cy.get(this.fields[field]).type(testData[field]);
        } 
      });
    })
  }

  clickNext() {
    cy.get(this.elements.nextButton).click()
  }

  goToNextPage() {
    this.clickButton('Next');
  }

  goToPreviousPage() {
    this.clickButton('Back');
  }
}