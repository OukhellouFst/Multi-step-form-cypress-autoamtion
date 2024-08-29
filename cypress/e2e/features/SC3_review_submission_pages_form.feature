Feature: Review and Submission pages 

    @Regression @ReviewPage @Submission 
    Scenario: Review submission and confirm
        Given I have completed all previous form steps
        When I view the review page
        Then I should see the correct information on the review page

        When I submit the review page
        Then I should see the confirmation page 
  

  Scenario: Network failure during form submission
    When I enter the following metadata:
      | Title          | Description                | Category   |
      | Test Document  | This is a test description | Category A |
    And a network failure occurs
    Then the form retain all entered form data