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
            h1()
                .color(AvitaColor.black)
                .fontSize("2rem")
                .text("TODO"),
            AddTodo(),
            Todos()
        )

    return app
}
