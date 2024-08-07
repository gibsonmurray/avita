import { div, h1, AvitaColor } from "avita"

export function App() {
    const myDiv = div().setChildren(
        h1().text("Hello World").color(AvitaColor.RED)
    )

    myDiv.onClick(() => {
        myDiv.children[0].text("Hello World 2")
    })

    return myDiv
}
