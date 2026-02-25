# Project Blueprint

## Overview

This project is a simple lottery number generator. It allows users to generate a set of unique random numbers for lottery drawings.

## Implemented Features

*   **Lotto Number Generation:** Generates 6 unique random numbers between 1 and 45.
*   **Simple UI:** A button to trigger the number generation and a display area for the results.

## Current Plan

The current plan is to refactor the existing application to use Web Components. This will improve code organization, reusability, and maintainability.

### Steps:

1.  **Create a `<lotto-generator>` Web Component:** This component will encapsulate the button and the number display.
2.  **Update `index.html`:** Use the new `<lotto-generator>` custom element.
3.  **Update `main.js`:** Define the custom element and its behavior.
4.  **Update `style.css`:** Move component-specific styles to the component's shadow DOM.
