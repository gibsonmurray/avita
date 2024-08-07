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
            input(),
            button()
                .text("Add")
                .onClick(() => {
                    $("input").setValue("")
                    $("#todos").append(Todo(todo))
                })
        )
}
