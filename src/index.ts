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
import type { AvitaElement } from "avita"

/**
 * Renders the provided Avita element to the root element in the DOM.
 *
 * @param children - The Avita element to be rendered.
 * @throws {Error} If the root element with the ID 'root' is not found in the HTML.
 */
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

/**
 * Applies a set of default styles to the provided HTML body element.
 *
 * This function sets the following styles on the body element:
 * - `margin: 0`
 * - `padding: 0`
 * - `box-sizing: border-box`
 * - `font-family: sans-serif`
 *
 * These styles are commonly used as a starting point for web applications to ensure consistent layout and appearance across different browsers.
 *
 * @param body - The HTML body element to apply the default styles to.
 */
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
    AvitaColor,
}
