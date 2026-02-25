# Project Blueprint

## Overview

This project is a modern lottery number generator built using Web Components. It provides a user-friendly interface to generate multiple sets of lotto numbers (6/45 format) including a bonus number for each set.

## Implemented Features

*   **Multi-Set Generation:** Generates 5 sets of lotto numbers simultaneously with a single click.
*   **Lotto Number Logic:** Each set consists of 6 unique main numbers (1-45) and 1 bonus number (1-45), ensuring the bonus is not among the main numbers.
*   **Web Components:** The entire generator is encapsulated in a `<lotto-generator>` custom element using Shadow DOM for style encapsulation.
*   **Modern UI:** Responsive design with gradient-styled balls, intuitive layout, and interactive buttons.
*   **Visual Color Coding:** Balls are color-coded based on their number range (Standard Korean Lotto style):
    *   1-10: Yellow
    *   11-20: Blue
    *   21-30: Red
    *   31-40: Gray
    *   41-45: Green

## Development History

1.  **Initial Setup:** Basic HTML/JS to generate 6 numbers.
2.  **Web Component Refactor:** Encapsulated logic into `<lotto-generator>`.
3.  **Advanced Features:** 
    *   Added support for 5 simultaneous sets.
    *   Added bonus number generation.
    *   Enhanced UI with animations and modern CSS.

## Current State

The application is fully functional, generating 5 sets of numbers with bonus balls, and uses modern CSS for a premium feel.
