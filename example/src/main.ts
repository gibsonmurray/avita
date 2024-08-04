import render, { div } from "../../index"

const newDiv = div(
    ".test.test2",
    {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "red",
    },
    {
        onclick: () => {
            console.log("clicked")
        },
        onmouseenter: () => {
            console.log("hovered")
        }
    }
)

render(newDiv)
