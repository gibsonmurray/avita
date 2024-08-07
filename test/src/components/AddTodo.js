import { div, input, button, AvitaColor } from "avita"

export function AddTodo({ onAddTodo }) {
    const inputElement = input()
        .setPlaceholder("Enter a new todo")
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
                inputElement.setValue("")
            }
        })

    return div()
        .display("flex")
        .marginBottom(20)
        .children(inputElement, addButton)
}
