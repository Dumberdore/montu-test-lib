# Montu BE Maps Challenge

<p>This project is a take-home challenge designed to evaluate backend developers who are interested in
working with us.

## Scenario
<p>A new logistics startup, “QuickRoute” is rapidly scaling its delivery operations across Australia. As part of
optimising their services, they need a robust and efficient solution for parsing partial address inputs. This
integration will improve delivery precision by minimising address errors and speeding up address entry
during order placement.

## Task
<p>QuickRouteʼs backend needs an extensible, shareable library written in TypeScript that leverages the
TomTom API to return full address suggestions from partial address inputs. This package should provide
responses that are typed, maintainable, and easily consumable in any LTS Node.js environment.

<p>In the future we will want to explore alternate API providers to TomTom. Your design should accommodate
this possibility.

## Requirements
- All tests should pass and ensure good coverage
- We only allow Australian addresses to be returned
- Code should be maintainable and consistent
- The result elements should contain important information about the place (country, municipality,
etc)
- The returned result should be typed and easily consumable via users of the library
- No front-end requirements are necessary, this is purely a backend NodeJS library

## Getting started
Place Search Documentation: https://developer.tomtom.com/search-api/documentation/search-service/search-service

API Key: <Stored in gh Secrets `TEST_AP_KEY`>
