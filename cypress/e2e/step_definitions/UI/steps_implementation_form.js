// Import Gherkin step definitions and Page Object Models (POM)
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import FirstFormStepPage from '../../../pages/FirstFormStepPage';
import SecondFormStepPage from '../../../pages/SecondFormStepPage';
import ReviewPage from '../../../pages/ReviewPage';
import ConfirmationPage from "../../../pages/ConfirmationPage";

// Instantiate POMs
const firstFormStepPage = new FirstFormStepPage();
const secondFormStepPage = new SecondFormStepPage();
const reviewPage = new ReviewPage();
const confirmationPage = new ConfirmationPage();

// Helper function for screenshots
const takeTimestampedScreenshot = (prefix) => {
  const timestamp = Math.floor(Date.now() / 100);
  cy.screenshot(`${prefix}_${timestamp}`);
};

// Navigate to the document upload page
Given("I am on the document upload page", function () {
  firstFormStepPage.visit();
});

// Fill in the form with user information
When("I enter the following information:", function (dataTable) {
  const userInfo = dataTable.hashes()[0];
  firstFormStepPage.fillForm(userInfo['first name'], userInfo['last name'], userInfo['email']);
});

// Attempt to upload a document with a specific size
When("I attempt to upload document of {float} Ko", function (size) {
  firstFormStepPage.uploadFile(`document_size/doc_${size}.pdf`);
});

// Validate document upload result and take screenshot
Then("the system should {string} and display {string}", function (action, message) {
  if (action === "accept") {
    firstFormStepPage.verifyFileAccepted(message);
  } else if (action === "reject") {
    firstFormStepPage.verifyFileRejected(message);
  }
  takeTimestampedScreenshot(`Document_upload_${action}`);
});

// Attempt to upload a document with a specific format
When("I attempt to upload the document with format {string}", function (format) {
  const filePath = format ? `document_format/doc.${format}` : 'document_format/doc';
  firstFormStepPage.uploadFile(filePath);
});

// Submit the form without filling a required field
When("I submit the form without filling the {string} field for {string}", function (fieldName, formStep) {
  if (formStep === 'first') {
    firstFormStepPage.fillAllFieldsExcept(fieldName);
    firstFormStepPage.clickNext();
  } else if (formStep === 'second') {
    secondFormStepPage.visit();
    secondFormStepPage.fillAllFieldsExcept(fieldName);
    secondFormStepPage.clickNext();
  }
  takeTimestampedScreenshot(`Required_Fields_${fieldName}`);
});

// Verify the error message for the missing field
Then("I should see an error message for the {string} field for {string}", function (fieldName, formStep) {
  if (formStep === 'first') {
    firstFormStepPage.verifyRequiredFieldMessage(fieldName);
  } else if (formStep === 'second') {
    secondFormStepPage.verifyRequiredFieldMessage(fieldName);
  }
});

// Complete all form steps up to the review page
Given("I have completed all previous form steps", function () {
  secondFormStepPage.visit();
  secondFormStepPage.fillAllFieldsExcept();
  secondFormStepPage.clickNext();
});

// Navigate to the review page
When("I view the review page", function () {
  reviewPage.clickReviewButton();
});

// Verify that the review page displays correct information
Then("I should see the correct information on the review page", function () {
  cy.fixture('defaultTestData').then((reviewData) => {
    reviewPage.verifyReviewPage(
      reviewData.fullName,
      reviewData.email,
      reviewData.fileNameWithSize,
      reviewData.title,
      reviewData.documentDescriptionTextarea,
      reviewData.categorySelect
    );
  });
  takeTimestampedScreenshot('Review_Page_content');
});

// Submit the review page and proceed to confirmation
When("I submit the review page", function () {
  reviewPage.submitForm();
});

// Verify the confirmation page is displayed
Then("I should see the confirmation page", function () {
  confirmationPage.verifySubmissionMessage("Thank You!", "Your submission has been received.");
  takeTimestampedScreenshot('Confirmation_page');
});

// Placeholder steps for network failure simulation

When("I enter the following metadata:", function (dataTable) {
});

When('a network failure occurs', () => {
  // Simulate network failure by - using intercept of the request 
});

Then('the form retain all entered form data', () => {
  // Verify that form data is retained after network failure
});
