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

## Latest Updates
_Crossed out means deprecated._

-   **v1.2.2** - Added CDN support for router, Aug 15, 2024
-   ~~**v1.2.1**~~ - Added CDN support, Aug 15, 2024
-   ~~**v1.2.0**~~ - MASSIVE Changes to Avita, Aug 15, 2024
-   ~~**v1.1.2**~~ - First stable release of Avita, Aug 9, 2024
-   ~~**v1.1.x**~~ - Fixed some bugs from v1, Aug 7, 2024
-   ~~**v1.0.x**~~ - Initial release, Aug 6, 2024

## Quick Start

```javascript
import { render, div, h1, p, button, AvitaColor } from "avita"

const app = div().children(
    h1().text("Welcome to Avita"),
    p().text("A simpler JS framework for building user interfaces"),
    button()
        .text("Click me")
        .bg("blue")
        .color("white")
        .p(10)
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
        .m(10)
        .p(10)
        .border("1px solid black")
        .rounded(5)
        .pointer()
        .children(
            span().text(todo),
            button()
                .text("X")
                .m(10)
                .p(10)
                .border("1px solid black")
                .bg("red")
                .rounded(5)
                .pointer()
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
    return ul().id("todos").vstack()
}
```

5. In src/components/AddTodo.js:

```javascript
import { div, input, AvitaColor, button, $ } from "avita"
import Todo from "./Todo"

export default function AddTodo() {
    let todo = ""

    return div()
        .fullW()
        .center()
        .children(
            input()
                .fullW()
                .fullH()
                .border("none")
                .rounded(5)
                .p(10)
                .m(10)
                .backgroundColor("white")
                .color("black")
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
        .screen()
        .bg("white")
        .center()
        .flexCol()
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

-   [ ] animation integration with GSAP
-   [ ] Prettier plugin
-   [ ] Icon integration
-   [ ] Markdown support
-   [ ] Tailwind integration
-   [ ] Improve state management?
-   [x] Add more comprehensive documentation
-   [x] `vstack`, `hstack`, and `zstack` both elements and css properties
-   [x] Add routing
-   [x] generated `@media` queries
-   [x] generated pseudoselector classes
-   [x] revision of Avita methods

Copyright (c) 2024 Gibson Murray
