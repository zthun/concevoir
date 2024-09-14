@CardPage
Feature: Card Page

Background:
  Given I have navigated to the card demo page


@CardPage-Fashion
Scenario: Should select the correct fashion
  When I select the "<fashion>" fashion option on the card page
  Then the fashion on the cards should be "<fashion>" on the card page
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
