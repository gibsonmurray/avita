import { ul } from "avita"

export default function Todos() {
    return ul()
        .id("todos")
        .display("flex")
        .flexDirection("column")
        .justifyContent("center")
        .alignItems("center")
}
