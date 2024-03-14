@TypographyPage
Feature: Typography Page

Background: 
  Given I navigate to the typography demo page

@TypographyPage-Fashion
Scenario: Should select the correct fashion
  When I select the "<fashion>" fashion option on the typography page
  Then the typography fashion should be "<fashion>" on the typography page for "<part>"
  Examples:
    |fashion|part|
    |primary|h1|
    |secondary|h2|
    |success|h3|
    |warning|h4|
    |error|h5|
    |info|h6|
    |body|body|
    |dark|caption|
    |light|subtitle|
    |surface|overline|
