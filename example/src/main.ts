import render from "../../index"
import { div } from "../../elements"

const newDiv = div(
    {
        width: "100px",
        height: "100px",
        backgroundColor: "red",
    },
    {
        onclick: () => {
            newDiv.moveTo(500, 500)
        },
    }
)

render(newDiv)
