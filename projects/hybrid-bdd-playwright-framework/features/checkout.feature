@checkout @e2e @regression
Feature: E-Commerce Product Purchase & Order Completion

  Scenario: Complete end-to-end checkout flow
    Given user logs in as "standard_user" with password "secret_sauce"
    When user adds "Sauce Labs Backpack" to the shopping cart
    And user opens the shopping cart
    And user proceeds to the checkout step
    And user enters shipping information:
      | firstName | lastName | postalCode |
      | Hariom    | Singh    | 110001     |
    And user confirms the order
    Then success message "Thank you for your order!" should be displayed
