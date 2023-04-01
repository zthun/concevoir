@CardPage
Feature: Card Page

Background:
  Given I have navigated to the card demo page

@CardPage-Loading
Scenario: Should set the card as loading if the loading switch is on.
  When I switch "on" the loading option on the card demo page
  Then the card loading should be "on" on the card page

@CardPage-Fashion
Scenario: Should select the correct fashion
  When I select the "<fashion>" fashion option on the card page
  Then the fashion on the card should be "<fashion>" on the card page
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
