@ChoicePage
Feature: Choice Page

Background:
  Given I navigate to the choice demo page

@ChoicePage-Select
@ChoicePage-Select-Single
Scenario: Selecting an item updates the value
  When I clear the existing selection on the "<choice>" on the choice demo page
  And I select "<text>" on the "<choice>" on the choice demo page
  Then the values should be updated to "<values>" on the choice demo page
  Examples:
  |choice|text|values|
  |dropdown|green-lantern|green-lantern|
  |autocomplete|superman|superman|
  |toggle|batman|batman|

@ChoicePage-Select
@ChoicePage-Select-Multiple
Scenario: Selection multiple items updates the values
  When I clear the existing selection on the "<choice>" on the choice demo page
  And I check the "multiple" option on the choice demo page
  And I select "<first>" on the "<choice>" on the choice demo page
  And I select "<second>" on the "<choice>" on the choice demo page
  Then the values should be updated to "<values>" on the choice demo page
  Examples:
  |choice|first|second|values|
  |dropdown|superman|green-lantern|superman,green-lantern|
  |autocomplete|wonder-woman|batman|wonder-woman,batman|
  |toggle|superman|batman|superman,batman|

@ChoicePage-Option
@ChoicePage-Option-Disabled
Scenario: Checking the disabled option disables the choice demos
  When I check the "disabled" option on the choice demo page
  Then the "dropdown" should be disabled on the choice demo page
  And the "autocomplete" should be disabled on the choice demo page
  And the "toggle" should be disabled on the choice demo page

@ChoicePage-Option
@ChoicePage-Option-Indelible
Scenario: Checking the indelible option removes the clear button
  When I check the "indelible" option on the choice demo page
  Then the "dropdown" should be indelible on the choice demo page
  And the "autocomplete" should be indelible on the choice demo page
  And the "toggle" should be indelible on the choice demo page

@ChoicePage-Option
@ChoicePage-Option-Required
Scenario: Checking the required option flags the labels as required
  When I check the "required" option on the choice demo page
  Then the "dropdown" label should be required on the choice demo page
  And the "autocomplete" label should be required on the choice demo page
  And the "toggle" label should be required on the choice demo page
