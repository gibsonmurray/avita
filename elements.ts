import createElement from "./createElement"
import type { Option } from "./eta-types"

export function div(...options: Option[]): HTMLDivElement {
    return createElement("div", ...options) as HTMLDivElement
}

export function span(...options: Option[]): HTMLSpanElement {
    return createElement("span", ...options) as HTMLSpanElement
}

export function button(...options: Option[]): HTMLButtonElement {
    return createElement("button", ...options) as HTMLButtonElement
}

export function input(...options: Option[]): HTMLInputElement {
    return createElement("input", ...options) as HTMLInputElement
}

export function h1(
    ...options: Array<string | HTMLElement | Object>
): HTMLHeadingElement {
    return createElement("h1", ...options) as HTMLHeadingElement
}

export function h2(
    ...options: Array<string | HTMLElement | Object>
): HTMLHeadingElement {
    return createElement("h2", ...options) as HTMLHeadingElement
}

export function h3(
    ...options: Array<string | HTMLElement | Object>
): HTMLHeadingElement {
    return createElement("h3", ...options) as HTMLHeadingElement
}

export function h4(
    ...options: Array<string | HTMLElement | Object>
): HTMLHeadingElement {
    return createElement("h4", ...options) as HTMLHeadingElement
}

export function h5(
    ...options: Array<string | HTMLElement | Object>
): HTMLHeadingElement {
    return createElement("h5", ...options) as HTMLHeadingElement
}

export function h6(
    ...options: Array<string | HTMLElement | Object>
): HTMLHeadingElement {
    return createElement("h6", ...options) as HTMLHeadingElement
}

export function p(
    ...options: Array<string | HTMLElement | Object>
): HTMLParagraphElement {
    return createElement("p", ...options) as HTMLParagraphElement
}

export function ul(
    ...options: Array<string | HTMLElement | Object>
): HTMLUListElement {
    return createElement("ul", ...options) as HTMLUListElement
}

export function ol(
    ...options: Array<string | HTMLElement | Object>
): HTMLOListElement {
    return createElement("ol", ...options) as HTMLOListElement
}

export function li(
    ...options: Array<string | HTMLElement | Object>
): HTMLLIElement {
    return createElement("li", ...options) as HTMLLIElement
}

export function img(...options: Option[]): HTMLImageElement {
    return createElement("img", ...options) as HTMLImageElement
}

export function iframe(...options: Option[]): HTMLIFrameElement {
    return createElement("iframe", ...options) as HTMLIFrameElement
}

export function a(...options: Option[]): HTMLAnchorElement {
    return createElement("a", ...options) as HTMLAnchorElement
}

export function form(
    ...options: Array<string | HTMLElement | Object>
): HTMLFormElement {
    return createElement("form", ...options) as HTMLFormElement
}

export function label(
    ...options: Array<string | HTMLElement | Object>
): HTMLLabelElement {
    return createElement("label", ...options) as HTMLLabelElement
}

export function textarea(
    ...options: Array<string | HTMLElement | Object>
): HTMLTextAreaElement {
    return createElement("textarea", ...options) as HTMLTextAreaElement
}

export function select(
    ...options: Array<string | HTMLElement | Object>
): HTMLSelectElement {
    return createElement("select", ...options) as HTMLSelectElement
}

export function option(
    ...options: Array<string | HTMLElement | Object>
): HTMLOptionElement {
    return createElement("option", ...options) as HTMLOptionElement
}

export function table(
    ...options: Array<string | HTMLElement | Object>
): HTMLTableElement {
    return createElement("table", ...options) as HTMLTableElement
}

export function thead(
    ...options: Array<string | HTMLElement | Object>
): HTMLTableSectionElement {
    return createElement("thead", ...options) as HTMLTableSectionElement
}

export function tbody(
    ...options: Array<string | HTMLElement | Object>
): HTMLTableSectionElement {
    return createElement("tbody", ...options) as HTMLTableSectionElement
}

export function tr(
    ...options: Array<string | HTMLElement | Object>
): HTMLTableRowElement {
    return createElement("tr", ...options) as HTMLTableRowElement
}

export function th(
    ...options: Array<string | HTMLElement | Object>
): HTMLTableCellElement {
    return createElement("th", ...options) as HTMLTableCellElement
}

export function td(
    ...options: Array<string | HTMLElement | Object>
): HTMLTableCellElement {
    return createElement("td", ...options) as HTMLTableCellElement
}

export function nav(...options: Option[]): HTMLElement {
    return createElement("nav", ...options) as HTMLElement
}

export function header(...options: Option[]): HTMLElement {
    return createElement("header", ...options) as HTMLElement
}

export function footer(...options: Option[]): HTMLElement {
    return createElement("footer", ...options) as HTMLElement
}

export function section(...options: Option[]): HTMLElement {
    return createElement("section", ...options) as HTMLElement
}

export function article(...options: Option[]): HTMLElement {
    return createElement("article", ...options) as HTMLElement
}

export function aside(...options: Option[]): HTMLElement {
    return createElement("aside", ...options) as HTMLElement
}

export function main(...options: Option[]): HTMLElement {
    return createElement("main", ...options) as HTMLElement
}

export function figure(...options: Option[]): HTMLElement {
    return createElement("figure", ...options) as HTMLElement
}

export function figcaption(...options: Option[]): HTMLElement {
    return createElement("figcaption", ...options) as HTMLElement
}

export function video(...options: Option[]): HTMLVideoElement {
    return createElement("video", ...options) as HTMLVideoElement
}

export function audio(...options: Option[]): HTMLAudioElement {
    return createElement("audio", ...options) as HTMLAudioElement
}

export function source(...options: Option[]): HTMLSourceElement {
    return createElement("source", ...options) as HTMLSourceElement
}

export function embed(...options: Option[]): HTMLEmbedElement {
    return createElement("embed", ...options) as HTMLEmbedElement
}

export function object(...options: Option[]): HTMLObjectElement {
    return createElement("object", ...options) as HTMLObjectElement
}

export function svg(...options: Option[]): SVGSVGElement {
    return createElement("svg", ...options) as SVGSVGElement
}

export function path(...options: Option[]): SVGPathElement {
    return createElement("path", ...options) as SVGPathElement
}

export function circle(...options: Option[]): SVGCircleElement {
    return createElement("circle", ...options) as SVGCircleElement
}

export function rect(...options: Option[]): SVGRectElement {
    return createElement("rect", ...options) as SVGRectElement
}

export function line(...options: Option[]): SVGLineElement {
    return createElement("line", ...options) as SVGLineElement
}

export function polygon(...options: Option[]): SVGPolygonElement {
    return createElement("polygon", ...options) as SVGPolygonElement
}

export function polyline(...options: Option[]): SVGPolylineElement {
    return createElement("polyline", ...options) as SVGPolylineElement
}

export function ellipse(...options: Option[]): SVGEllipseElement {
    return createElement("ellipse", ...options) as SVGEllipseElement
}
