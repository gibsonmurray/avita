import Color from "../../../Color"
import { div, h1, p, button } from "../../../elements"

const Home = () => {
    let count = 0

    const btn = button()
        .text(`Clicked ${count} times`)
        .padding("10px 20px")
        .backgroundColor(Color.magentaPink)
        .color(Color.white)
        .border("none")
        .borderRadius("5px")
        .cursor("pointer")
        .bindState("count", "textContent")

    btn.onClick(() => {
        count++
        btn.updateState("count", `Clicked ${count} times`)
    })

    return div()
        .class("home")
        .display("flex")
        .flexDirection("column")
        .alignItems("center")
        .justifyContent("center")
        .height("100vh")
        .width("100vw")
        .backgroundColor(Color.white)
        .children(
            h1()
                .fontSize("3rem")
                .color(Color.black)
                .text("Welcome to Shway.js"),
            p()
                .text("A simpler JS framework for building user interfaces")
                .fontSize("1.2rem")
                .color(Color.gray)
                .maxWidth("600px")
                .textAlign("center")
                .margin("2rem 0"),
            btn
        )
}

export default Home
