Feature: Document Upload

  Background: 
    Given I am on the document upload page

  @Regression @Documents @DocumentSize 
  Scenario Outline: Upload documents with various sizes
    When I enter the following information: 
      | first name          | last name      | email                                                            |
      | John                | Doe            | john.doe@example.com                                             |
    And I attempt to upload document of <size>
    Then the system should "<action>" and display "<message>"

    Examples:
        | size              |action          | message                                                           |
        | 8 Ko              |accept          | doc_8.pdf                                                         |
        | 10 Ko             |accept          | doc_10.pdf                                                        |
        | 20 Ko             |reject          | doc_20.pdf is too large, maximum file size is 10.0KB              |
        | 0 Ko              |reject          | doc_0.pdf is empty, please select files again without it          |

  @Regression @Documents @DocumentFormat 
  Scenario Outline: Upload documents with various formats
    When I enter the following information: 
        | first name        | last name      | email                                                             |
        | John              | Doe            | john.doe@example.com                                              |
    And I attempt to upload the document with format "<format>"
    Then the system should "<action>" and display "<message>"

    Examples:
        | format            | action         | message                                                           |
        | pdf               | accept         | doc.pdf                                                           |
        | docx              | accept         | doc.docx                                                          |
        | zip               | reject         | doc.zip has invalid extension. Only pdf, docx are allowed.        |
        | jpg               | reject         | You have uploaded an invalid image file type.                     |
        |                   | reject         | doc has invalid extension. Only pdf, docx are allowed.            |
