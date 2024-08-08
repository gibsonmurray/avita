import { AvitaColor, button, span, li } from "avita"

export default function Todo(todo) {
    const todoDiv = li()
        .margin("10px")
        .padding("10px")
        .border("1px solid black")
        .borderRadius("5px")
        .cursor("pointer")
        .children(
            span()
                .text(todo),
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
