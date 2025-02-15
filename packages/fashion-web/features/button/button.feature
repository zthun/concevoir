@ButtonPage
Feature: Button Page

Background:
  Given I navigate to the button demo page

@ButtonPage-Click
Scenario: Show increment the count when the buttons are clicked
  When I click the "<name>" button on the button page
  Then the click count should be incremented on the button page
  Examples:
    |name|
    |button|
    |iconButton|

@ButtonPage-Option
@ButtonPage-Option-Disable
Scenario: Should disable the buttons when the disabled option is checked
  When I check the "disabled" option on the button page
  Then the "button" button should be disabled on the button page
  And the "iconButton" button should be disabled on the button page

@ButtonPage-Option
@ButtonPage-Option-Borderless
Scenario: Should mark the buttons as borderless when the borderless option is checked
  When I check the "borderless" option on the button page
  Then the "button" button should be borderless on the button page
  And the "iconButton" button should be borderless on the button page

@ButtonPage-Option
@ButtonPage-Option-Outline
Scenario: Should mark the buttons as outlined when the outline option is checked
  When I check the "outline" option on the button page
  Then the "button" button should be outlined on the button page
  And the "iconButton" button should be outlined on the button page

@ButtonPage-Option
@ButtonPage-Option-Fashion
Scenario: Should select the correct fashion
  When I select the "<fashion>" fashion option on the button page
  Then the fashion on the "button" button should be "<fashion>"
  And the fashion on the "iconButton" button should be "<fashion>"
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
