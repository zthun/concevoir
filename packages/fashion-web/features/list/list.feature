@ListPage
Feature: List Page

Background:
  Given I navigate to the list demo page

Scenario: An alert is opened when the supported list items are clicked
  When I click the "<item>" item on the list demo page
  Then the count should increment on the list demo page
  Examples:
  |item|
  |everything|
  |text-only|
