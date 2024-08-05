import "./eta-types"
import type EtaElement from "./eta-types"

export default function render(children: EtaElement<HTMLElement>) {
    const root = document.querySelector("#root")
    if (root) {
        defaultStyles(document.body)
        root.innerHTML = ""
        root.appendChild(children.element)
    } else {
        throw new Error(
            "Root element not found: please add a div with id='root' to your HTML file"
        )
    }
}

function defaultStyles(body: HTMLElement) {
    body.style.margin = "0"
    body.style.padding = "0"
    body.style.boxSizing = "border-box"
    body.style.fontFamily = "sans-serif"
}
