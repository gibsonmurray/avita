# Avita - A simpler JS framework for building user interfaces

Avita is a lightweight and intuitive JavaScript framework designed to simplify the process of building user interfaces. It provides a clean and expressive API for creating and manipulating DOM elements, handling events, and applying styles.

## Features

- Simple and chainable API for creating and manipulating DOM elements
- Comprehensive set of HTML elements supported out of the box
- Built-in color palette for easy styling
- Extensive CSS properties support with intuitive method names
- Event handling for a wide range of DOM events
- Flexible rendering system

## Installation

Avita is available as an npm package. To install it, run the following command:
```bash
npm install avita
```

## Quick Start

```javascript
import { render, div, h1, p, button, AvitaColor } from 'avita';

const app = div()
  .children(
    h1().text('Welcome to Avita'),
    p().text('A simpler JS framework for building user interfaces'),
    button()
      .text('Click me')
      .backgroundColor(AvitaColor.blue)
      .color(AvitaColor.white)
      .padding(10)
      .onClick(() => alert('Button clicked!'))
  );

render(app);
```
