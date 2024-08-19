import type { Children } from "./avita"
import Avita from "./avita"

/**
 * Creates a new HTML element of the specified tag with optional ID and class names.
 * 
 * @param tag - The HTML tag name for the new element.
 * @param idAndClass - An optional string containing one or more space-separated ID and class names to apply to the new element.
 * @returns A function that takes an array of child elements and returns a new Avita instance representing the created element.
 */
export function element<T extends HTMLElement>(
    tag: string,
    idAndClass?: string
) {
    return (...children: Children<T>) => {
        const avita = new Avita(tag, children)
        if (idAndClass !== undefined) {
            const lst = idAndClass.split(" ")
            lst.forEach((idOrClass) => {
                if (idOrClass.startsWith("#")) {
                    avita.id(idOrClass.slice(1))
                } else if (idOrClass.startsWith(".")) {
                    avita.addClass(idOrClass.slice(1))
                } else {
                    avita.addClass(idOrClass)
                }
            })
        }
        return avita
    }
}

export function div(idAndClass?: string) {
    return element("div", idAndClass)
}

export function span(idAndClass?: string) {
    return element("span", idAndClass)
}

export function button(idAndClass?: string) {
    return element("button", idAndClass)
}

export function input(idAndClass?: string) {
    return element("input", idAndClass)
}

export function h1(idAndClass?: string) {
    return element("h1", idAndClass)
}

export function h2(idAndClass?: string) {
    return element("h2", idAndClass)
}

export function h3(idAndClass?: string) {
    return element("h3", idAndClass)
}

export function h4(idAndClass?: string) {
    return element("h4", idAndClass)
}

export function h5(idAndClass?: string) {
    return element("h5", idAndClass)
}

export function h6(idAndClass?: string) {
    return element("h6", idAndClass)
}

export function p(idAndClass?: string) {
    return element("p", idAndClass)
}

export function ul(idAndClass?: string) {
    return element("ul", idAndClass)
}

export function ol(idAndClass?: string) {
    return element("ol", idAndClass)
}

export function li(idAndClass?: string) {
    return element("li", idAndClass)
}

export function img(idAndClass?: string) {
    return element("img", idAndClass)()
}

export function iframe(idAndClass?: string) {
    return element("iframe", idAndClass)
}

export function a(idAndClass?: string) {
    return element("a", idAndClass)
}

export function form(idAndClass?: string) {
    return element("form", idAndClass)
}

export function label(idAndClass?: string) {
    return element("label", idAndClass)
}

export function textarea(idAndClass?: string) {
    return element("textarea", idAndClass)()
}

export function select(idAndClass?: string) {
    return element("select", idAndClass)
}

export function option(idAndClass?: string) {
    return element("option", idAndClass)
}

export function table(idAndClass?: string) {
    return element("table", idAndClass)
}

export function thead(idAndClass?: string) {
    return element("thead", idAndClass)
}

export function tbody(idAndClass?: string) {
    return element("tbody", idAndClass)
}

export function tr(idAndClass?: string) {
    return element("tr", idAndClass)
}

export function th(idAndClass?: string) {
    return element("th", idAndClass)
}

export function td(idAndClass?: string) {
    return element("td", idAndClass)
}

export function nav(idAndClass?: string) {
    return element("nav", idAndClass)
}

export function header(idAndClass?: string) {
    return element("header", idAndClass)
}

export function footer(idAndClass?: string) {
    return element("footer", idAndClass)
}

export function section(idAndClass?: string) {
    return element("section", idAndClass)
}

export function article(idAndClass?: string) {
    return element("article", idAndClass)
}

export function aside(idAndClass?: string) {
    return element("aside", idAndClass)
}

export function main(idAndClass?: string) {
    return element("main", idAndClass)
}

export function figure(idAndClass?: string) {
    return element("figure", idAndClass)
}

export function figcaption(idAndClass?: string) {
    return element("figcaption", idAndClass)
}

export function video(idAndClass?: string) {
    return element("video", idAndClass)
}

export function audio(idAndClass?: string) {
    return element("audio", idAndClass)
}

export function source(idAndClass?: string) {
    return element("source", idAndClass)()
}

export function embed(idAndClass?: string) {
    return element("embed", idAndClass)()
}

export function track(idAndClass?: string) {
    return element("track", idAndClass)()
}

export function object(idAndClass?: string) {
    return element("object", idAndClass)
}

export function style(idAndClass?: string) {
    return element("style", idAndClass)
}

export function head(idAndClass?: string) {
    return element("head", idAndClass)
}

export function link(idAndClass?: string) {
    return element("link", idAndClass)()
}

export function meta(idAndClass?: string) {
    return element("meta", idAndClass)()
}

export function title(idAndClass?: string) {
    return element("title", idAndClass)
}

export function base(idAndClass?: string) {
    return element("base", idAndClass)()
}

export function script(idAndClass?: string) {
    return element("script", idAndClass)
}

export function noscript(idAndClass?: string) {
    return element("noscript", idAndClass)
}

export function template(idAndClass?: string) {
    return element("template", idAndClass)
}

export function html(idAndClass?: string) {
    return element("html", idAndClass)
}

export function body(idAndClass?: string) {
    return element("body", idAndClass)
}

export function i(idAndClass?: string) {
    return element("i", idAndClass)
}

export function b(idAndClass?: string) {
    return element("b", idAndClass)
}

export function br(idAndClass?: string) {
    return element("br", idAndClass)()
}

export function hr(idAndClass?: string) {
    return element("hr", idAndClass)()
}

export function sup(idAndClass?: string) {
    return element("sup", idAndClass)
}

export function sub(idAndClass?: string) {
    return element("sub", idAndClass)
}

export function em(idAndClass?: string) {
    return element("em", idAndClass)
}

export function strong(idAndClass?: string) {
    return element("strong", idAndClass)
}

export function kbd(idAndClass?: string) {
    return element("kbd", idAndClass)
}

export function code(idAndClass?: string) {
    return element("code", idAndClass)
}

export function col(idAndClass?: string) {
    return element("col", idAndClass)()
}

export function samp(idAndClass?: string) {
    return element("samp", idAndClass)
}

export function cite(idAndClass?: string) {
    return element("cite", idAndClass)
}

export function varElement(idAndClass?: string) {
    return element("var", idAndClass)
}

export function big(idAndClass?: string) {
    return element("big", idAndClass)
}

export function small(idAndClass?: string) {
    return element("small", idAndClass)
}

export function dfn(idAndClass?: string) {
    return element("dfn", idAndClass)
}

export function abbr(idAndClass?: string) {
    return element("abbr", idAndClass)
}

export function blockquote(idAndClass?: string) {
    return element("blockquote", idAndClass)
}

export function q(idAndClass?: string) {
    return element("q", idAndClass)
}

export function time(idAndClass?: string) {
    return element("time", idAndClass)
}

export function pre(idAndClass?: string) {
    return element("pre", idAndClass)
}

export function map(idAndClass?: string) {
    return element("map", idAndClass)
}

export function area(idAndClass?: string) {
    return element("area", idAndClass)
}

export function wbr(idAndClass?: string) {
    return element("wbr", idAndClass)()
}

export function canvas(idAndClass?: string) {
    return element("canvas", idAndClass)
}
