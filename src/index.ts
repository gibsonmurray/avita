import {
    div,
    span,
    button,
    input,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ul,
    ol,
    li,
    img,
    iframe,
    a,
    form,
    label,
    textarea,
    select,
    option,
    table,
    thead,
    tbody,
    tr,
    th,
    td,
    nav,
    header,
    footer,
    section,
    article,
    aside,
    main,
    figure,
    figcaption,
    video,
    audio,
    source,
    embed,
    object,
} from "./elements"
import AvitaColor from "./avita-color"
import type AvitaElement from "avita"

function render<T extends HTMLElement>(children: AvitaElement<T>) {
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

export {
    render,
    div,
    span,
    button,
    input,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ul,
    ol,
    li,
    img,
    iframe,
    a,
    form,
    label,
    textarea,
    select,
    option,
    table,
    thead,
    tbody,
    tr,
    th,
    td,
    nav,
    header,
    footer,
    section,
    article,
    aside,
    main,
    figure,
    figcaption,
    video,
    audio,
    source,
    embed,
    object,
    AvitaColor
}
