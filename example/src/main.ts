import Color from "../../Color"
import { div } from "../../elements"
import render from "../../index"

const myDiv = div()
    .text("Hello World!")
    .color(Color.red)
    .width("100px")
    .height("100px")

render(myDiv)
