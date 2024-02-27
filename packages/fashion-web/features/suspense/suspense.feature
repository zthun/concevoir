@SuspensePage
Feature: Suspense Page

Background:
  Given I navigate to the suspense demo page

@SuspensePage-Visibility
Scenario: Toggling the loading option shows and hides the suspense
  When I set the loading option to "<state>" on the suspense demo page
  Then the "<suspense>" suspense should be "<visibility>" on the suspense demo page
  Examples:
  |state|suspense|visibility|
  |checked|rotate|visible|
  |unchecked|rotate|hidden|
