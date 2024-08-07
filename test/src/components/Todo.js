import { AvitaColor, button, span, div } from "avita"

export default function Todo(todo) {
    const todoDiv = div()
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
