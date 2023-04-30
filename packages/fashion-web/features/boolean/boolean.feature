@BooleanPage
Feature: Boolean Page

Background:
  Given I have navigated to the boolean demo page

@BooleanPage-Checkbox
Scenario: The checkbox should toggle on when clicked while off
  When I click on the "checkbox" while it is "off" on the boolean page
  Then all demo components are checked "on" on the boolean page

@BooleanPage-Checkbox
Scenario: The checkbox should toggle off when clicked while on
  When I click on the "checkbox" while it is "on" on the boolean page
  Then all demo components are checked "off" on the boolean page

@BooleanPage-Checkbox
Scenario: The checkbox should toggle on when clicked while indeterminate
  When I click on the "checkbox" while it is "indeterminate" on the boolean page
  Then all demo components are checked "on" on the boolean page

@BooleanPage-Switch
Scenario: The switch should toggle on when clicked while off
  When I click on the "switch" while it is "off" on the boolean page
  Then all demo components are checked "on" on the boolean page

@BooleanPage-Switch
Scenario: The switch should toggle off when clicked while on
  When I click on the "switch" while it is "on" on the boolean page
  Then all demo components are checked "off" on the boolean page

@BooleanPage-Disabled
Scenario: The disabled option should disable all components when on
  When I toggle the switch for the "disabled" option to "on" on the boolean page
  Then all demo components are "disabled" "on" on the boolean page

@BooleanPage-Disabled
Scenario: The disabled option should enable all components when off
  When I toggle the switch for the "disabled" option to "off" on the boolean page
  Then all demo components are "disabled" "off" on the boolean page

@BooleanPage-Required
Scenario: The required option should mark all components required when on
  When I toggle the switch for the "required" option to "on" on the boolean page
  Then all demo components are "required" "on" on the boolean page

@BooleanPage-Required
Scenario: The disabled option should enable all components when off
  When I toggle the switch for the "required" option to "off" on the boolean page
  Then all demo components are "required" "off" on the boolean page

@BooleanPage-Fashion
Scenario: Should select the correct fashion
  When I select the "<fashion>" fashion option on the boolean page
  Then the fashion on the "checkbox" should be "<fashion>" on the boolean page
  And the fashion on the "switch" should be "<fashion>" on the boolean page
  Examples:
    |fashion|
    |Primary|
    |Secondary|
    |Success|
    |Warning|
    |Error|
    |Info|
    |Light|
    |Dark|

@BooleanPage-ValueToggle
Scenario: The demo components should toggle to true when the true button is clicked.
  When I click the "on" button on the boolean page
  Then all demo components are checked "on" on the boolean page

@BooleanPage-ValueToggle
Scenario: The demo components should toggle to false when the false button is clicked
  When I click the "off" button on the boolean page
  Then all demo components are checked "off" on the boolean page

@BooleanPage-ValueToggle
Scenario: The demo components should toggle to an indeterminate state or unchecked if the indeterminate state is not supported
  When I click the "indeterminate" button on the boolean page
  Then all demo components that support the indeterminate state on the page are indeterminate
  And all demo components that do not support the indeterminate state on the page are off
