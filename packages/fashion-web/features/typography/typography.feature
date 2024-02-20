@TypographyPage
Feature: Typography Page

Background: 
  Given I navigate to the typography demo page

@TypographyPage-Fashion
Scenario: Should select the correct fashion
  When I select the "<fashion>" fashion option on the typography page
  Then the typography fashion should be "<fashion>" on the typography page
  Examples:
    |fashion|
    |primary|
    |secondary|
    |success|
    |warning|
    |error|
    |info|
    |light|
    |dark|
