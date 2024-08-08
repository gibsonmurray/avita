# Avita.js

###### A simpler JS framework for building user interfaces

Avita is a lightweight and intuitive JavaScript framework designed to simplify the process of building user interfaces. It provides a clean and expressive API for creating and manipulating DOM elements, handling events, and applying styles.

---

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Quick Start](#quick-start)
-   [Tutorial](#tutorial)

## Features

-   Simple and chainable API for creating and manipulating DOM elements
-   Comprehensive set of HTML elements supported out of the box
-   Built-in color palette for easy styling
-   Extensive CSS properties support with intuitive method names
-   Event handling for a wide range of DOM events
-   Flexible rendering system

---

## Installation

Avita is available as an npm package. To install it, run the following command:

```bash
npm install avita
```

---

## Quick Start

```javascript
import { render, div, h1, p, button, AvitaColor } from "avita"

const app = div().children(
    h1().text("Welcome to Avita"),
    p().text("A simpler JS framework for building user interfaces"),
    button()
        .text("Click me")
        .backgroundColor(AvitaColor.blue)
        .color(AvitaColor.white)
        .padding(10)
        .onClick(() => alert("Button clicked!"))
)

render(app)
```

---

## Tutorial

Let's build a simple todo app using Avita.

1. Create a new file structure:

```
src/
  components/
    TodoList.js
    TodoItem.js
    AddTodo.js
  App.js
  index.js
index.html
```

2. In `index.html` make sure you have a `<div>` with `id="root"`:

```html
<body>
    <div id="root"></div>
    <script type="module" src="/src/index.js"></script>
</body>
```

3. In `src/components/TodoItem.js`:

```javascript
import { li, div, button, AvitaColor } from "avita"

export function TodoItem({ todo, onDelete }) {
    return li()
        .display("flex")
        .justifyContent("space-between")
        .alignItems("center")
        .padding(10)
        .marginBottom(5)
        .backgroundColor(AvitaColor.white)
        .borderRadius(5)
        .children(
            div().text(todo),
            button()
                .text("Delete")
                .backgroundColor(AvitaColor.red)
                .color(AvitaColor.white)
                .padding(5)
                .cursor("pointer")
                .onClick(onDelete)
        )
}
```

4. In `src/components/TodoList.js`:

```javascript
import { ul } from "avita"
import { TodoItem } from "./TodoItem"

export function TodoList({ todos, onDeleteTodo }) {
    return ul()
        .listStyleType("none")
        .padding(0)
        .children(
            ...todos.map((todo, index) =>
                TodoItem({ todo, onDelete: () => onDeleteTodo(index) })
            )
        )
}
```

5. In src/components/AddTodo.js:

```javascript
import { div, input, button, AvitaColor } from "avita"

export function AddTodo({ onAddTodo }) {
    const inputElement = input()
        .placeholder("Enter a new todo")
        .width("70%")
        .padding(10)
        .marginRight(10)

    const addButton = button()
        .text("Add Todo")
        .backgroundColor(AvitaColor.green)
        .color(AvitaColor.white)
        .padding(10)
        .cursor("pointer")
        .onClick(() => {
            const todoText = inputElement.value()
            if (todoText) {
                onAddTodo(todoText)
                inputElement.value("")
            }
        })

    return div()
        .display("flex")
        .marginBottom(20)
        .children(inputElement, addButton)
}
```

6. In `src/App.js`:

```javascript
import { div, h1, AvitaColor } from "avita"
import { TodoList } from "./components/TodoList"
import { AddTodo } from "./components/AddTodo"

export function App() {
    let todos = []

    function addTodo(todoText) {
        todos.push(todoText)
        renderApp()
    }

    function deleteTodo(index) {
        todos.splice(index, 1)
        renderApp()
    }

    function renderApp() {
        return div()
            .backgroundColor(AvitaColor.lightGray)
            .padding(20)
            .width("100%")
            .height("100vh")
            .children(
                h1()
                    .text("Avita Todo List")
                    .color(AvitaColor.darkBlue)
                    .fontSize(24)
                    .marginBottom(20),
                AddTodo({ onAddTodo: addTodo }),
                TodoList({ todos, onDeleteTodo: deleteTodo })
            )
    }

    return renderApp()
}
```

6. Finally, in `src/index.js`:

```javascript
import { render } from "avita"
import { App } from "./App"

render(App())
```

Congrats! You've built a simple todo app using Avita.
