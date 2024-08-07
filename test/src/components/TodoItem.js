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
