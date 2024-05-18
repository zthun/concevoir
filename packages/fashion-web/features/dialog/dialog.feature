@DialogPage
Feature: Dialog Page

Background:
  Given I navigate to the dialog demo page

@DialogPage-Open-Drawer
Scenario: The drawer is opened to an anchored position when the button is clicked
  When I anchor the drawer to the "<anchor>" on the dialog demo page
  And I click the drawer button on the dialog demo page
  Then the drawer is opened on the "<anchor>" on the dialog demo page
  Examples:
    |anchor|
    |left|
    |right|
    |top|
    |bottom|

@DialogPage-Close-Drawer
Scenario: The drawer is closed when the button inside the drawer is clicked
  When I click the drawer button on the dialog demo page
  And I click the close button on the drawer on the dialog demo page
  Then the drawer is closed on the dialog demo page
