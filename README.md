# Avita.js

###### A simpler JS framework for building user interfaces

Avita is a lightweight and intuitive JavaScript framework designed to simplify the process of building user interfaces. It provides a clean and expressive API for creating and manipulating DOM elements, handling events, and applying styles.

---

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Quick Start](#quick-start)
-   [Tutorial](#tutorial)
-   [TODO](#todo)

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
    Todos.js
    Todo.js
    AddTodos.js
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

3. In `src/components/Todo.js`:

```javascript
import { AvitaColor, button, span, li } from "avita"

export default function Todo(todo) {
    const todoDiv = li()
        .margin("10px")
        .padding("10px")
        .border("1px solid black")
        .borderRadius("5px")
        .cursor("pointer")
        .children(
            span().text(todo),
            button()
                .text("X")
                .margin("10px")
                .padding("10px")
                .border("1px solid black")
                .backgroundColor(AvitaColor.red)
                .borderRadius("5px")
                .cursor("pointer")
                .onClick(() => {
                    todoDiv.remove()
                })
        )

    return todoDiv
}
```

4. In `src/components/Todos.js`:

```javascript
import { ul } from "avita"

export default function Todos() {
    return ul()
        .id("todos")
        .display("flex")
        .flexDirection("column")
        .justifyContent("center")
        .alignItems("center")
}
```

5. In src/components/AddTodo.js:

```javascript
import { div, input, AvitaColor, button, $ } from "avita"
import Todo from "./Todo"

export default function AddTodo() {
    let todo = ""

    return div()
        .width("100%")
        .display("flex")
        .justifyContent("center")
        .alignItems("center")
        .children(
            input()
                .width("100%")
                .height("100%")
                .border("none")
                .borderRadius("5px")
                .padding("10px")
                .margin("10px")
                .backgroundColor(AvitaColor.white)
                .color(AvitaColor.black)
                .fontSize("1.2rem")
                .placeholder("Add a todo...")
                .onChange((e) => {
                    todo = e.target.value
                }),
            button()
                .text("Add")
                .onClick(() => {
                    $("input").value("")
                    $("#todos").append(Todo(todo))
                })
        )
}
```

6. In `src/App.js`:

```javascript
import { div, h1, AvitaColor } from "avita"
import AddTodo from "./components/AddTodo"
import Todos from "./components/Todos"

export default function App() {
    const app = div()
        .width("100vw")
        .height("100vh")
        .backgroundColor(AvitaColor.white)
        .display("flex")
        .justifyContent("center")
        .alignItems("center")
        .flexDirection("column")
        .children(
            h1().color(AvitaColor.black).fontSize("2rem").text("TODO"),
            AddTodo(),
            Todos()
        )

    return app
}
```

6. Finally, in `src/index.js`:

```javascript
import Avita from "avita"
import App from "./App"

const app = App()

Avita.render(app)
```

Congrats! You've built a simple todo app using Avita.

---

## TODO

-   [ ] Add more comprehensive documentation
-   [ ] animation integration?
-   [ ] Prettier plugin
-   [ ] Icon integration?
-   [ ] Add tailwind integration
-   [ ] Improve state management?
-   [x] `vstack`, `hstack`, and `zstack` both elements and css properties
-   [x] Add routing
-   [x] generates `@media` queries
-   [x] `.onHover()` - toggles on hover
-   [x] `.full()` - 100% height and width
-   [x] `.fullY()` - 100% height
-   [x] `.fullX()` - 100% width
-   [x] `.stroke()` - stroke css
-   [x] `.fill()` - fill css
-   [x] `.rounded()`
-   [x] `.marginX()`
-   [x] `.marginY()`
-   [x] `.paddingX()`
-   [x] `.paddingY()`
-   [x] `.rounded()`
-   [x] `.fixed()` - fixed position
-   [x] `.rotate3D()`
-   [x] `<i>`
-   [x] `<b>`
-   [x] `<br>`
-   [x] `<sup>`
-   [x] `<sub>`
-   [x] `<em>`
-   [x] `<strong>`
-   [x] `<kbd>`
-   [x] `<code>`
-   [x] `<samp>`
-   [x] `<cite>`
-   [x] `<var>`
-   [x] `<big>`
-   [x] `<small>`
-   [x] `<dfn>`
-   [x] `<q>`
-   [x] `<time>`
-   [x] `<pre>`
-   [x] `<svg>`
-   [x] `<path>`
-   [x] `<map>`
-   [x] `<area>`

Copyright (c) 2024 Gibson Murray
