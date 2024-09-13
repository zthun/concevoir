@SuspensePage
Feature: Suspense Page

Background:
  Given I navigate to the suspense demo page

@SuspensePage-Visibility
Scenario: Toggling the disabled option shows and hides the suspense
  When I set the disabled option to "<state>" on the suspense demo page
  Then the "<suspense>" suspense should be "<visibility>" on the suspense demo page
  Examples:
  |state|suspense|visibility|
  |checked|rotate|hidden|
  |unchecked|rotate|visible|
  |checked|progress|hidden|
  |unchecked|progress|visible|
