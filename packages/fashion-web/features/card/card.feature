@CardPage
Feature: Card Page

Background:
  Given I have navigated to the card demo page

@CardPage-Loading
Scenario: Should set the card as loading if the loading switch is on.
  Then the "<card>" card should have a loading state of "<loading>"
  Examples:
    |card|loading|
    |card|false|
    |image|false|
    |loading|true|


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
