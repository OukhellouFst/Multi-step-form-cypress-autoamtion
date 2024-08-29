Feature: Rquired Field 

  Background: 
    Given I am on the document upload page

  @Regression @RequiredFields 
  Scenario Outline: Verify required fields in the form
    When I submit the form without filling the "<field>" field for "<form step>"
    Then I should see an error message for the "<field>" field for "<form step>"

    Examples:
        | form step     | field           |
        | first         | firstName       |
        | first         | lastName        |
        | first         | email           |
        | first         | fileUploadInput |
        | second        | title           |
