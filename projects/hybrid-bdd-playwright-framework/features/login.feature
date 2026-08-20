@auth @regression
Feature: User Authentication & Security

  Background:
    Given user navigates to the login portal

  @smoke @critical
  Scenario: Successful login with valid credentials
    When user inputs username "standard_user" and password "secret_sauce"
    And user clicks the login button
    Then user should be redirected to the inventory catalog page

  @negative
  Scenario Outline: Failed login with invalid credentials
    When user inputs username "<username>" and password "<password>"
    And user clicks the login button
    Then error banner should display "<error_message>"

    Examples:
      | username        | password       | error_message                                               |
      | locked_out_user | secret_sauce   | Epic sadface: Sorry, this user has been locked out.         |
      | standard_user   | wrong_password | Epic sadface: Username and password do not match            |
