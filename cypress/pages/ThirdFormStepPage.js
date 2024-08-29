import BasePage from './BasePage';

export default class DynamicDropdownPage extends BasePage {
    constructor() {
        super();
        this.elements = {
            dropdownIframe: '#customFieldFrame_21',
            reviewPage: "#input_2"
        };
    }

    clickReview() {
        return cy.get(this.elements.reviewPage).then($button => {
            if ($button.is(':visible')) {
                cy.wrap($button).click();
            } else {
                // If the review button is not visible, try to navigate to it
                this.navigateToReviewPage();
            }
        });
    }

    navigateToReviewPage() {
        // After navigating, try to click the review button again
        cy.get(this.elements.reviewPage).click({timeout: 10000});
    }
}