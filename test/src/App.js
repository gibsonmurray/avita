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
