type Option = string | HTMLElement | Object | Function

export default function createElement(
    tagName: string,
    ...options: Option[]
): HTMLElement | SVGElement {
    const element = document.createElement(tagName)
    options.forEach((op) => {
        addClass(element, op)
        addId(element, op)
        addStyles(element, op)
        addChild(element, op)
        addEvent(element, op)
        addSource(element, op, tagName)
        addAttributes(element, op)
        addAriaAttributes(element, op)
        addContent(element, op)
    })
    return element
}

function addClass(element: HTMLElement, option: Option) {
    if (typeof option === "string" && option.startsWith(".")) {
        const classes = option.slice(1).split(".")
        classes.forEach((className) => element.classList.add(className))
    }
}

function addId(element: HTMLElement, option: Option) {
    if (typeof option === "string" && option.startsWith("#")) {
        element.id = option.slice(1)
    }
}

function addStyles(element: HTMLElement, option: Option) {
    if (isStyleObject(option)) {
        Object.assign(element.style, option)
    }
}

function addChild(element: HTMLElement, option: Option) {
    if (option instanceof HTMLElement) {
        element.appendChild(option)
    }
}

function addEvent(element: HTMLElement, option: Option) {
    if (isEventObject(option)) {
        Object.entries(option).forEach(([key, value]) => {
            if (key.startsWith("on") && typeof value === "function") {
                const eventType = key.slice(2).toLowerCase()
                element.addEventListener(eventType, value as EventListener)
            }
        })
    }
}

function addAttributes(element: Element, option: Option) {
    if (isAttributeObject(option)) {
        Object.entries(option).forEach(([key, value]) => {
            if (key.startsWith("data-")) {
                element.setAttribute(key, value as string)
            } else if (element instanceof SVGElement) {
                element.setAttributeNS(null, key, value as string)
            } else if (key in element) {
                element.setAttribute(key, value as string)
            } else {
                ;(element as any)[key] = value
            }
        })
    }
}

function addAriaAttributes(element: HTMLElement, option: Option) {
    if (isAriaObject(option)) {
        Object.entries(option).forEach(([key, value]) => {
            if (key.startsWith("aria-")) {
                element.setAttribute(key, value as string)
            }
        })
    }
}

function addContent(element: HTMLElement, option: Option) {
    if (
        typeof option === "string" &&
        !option.startsWith(".") &&
        !option.startsWith("#")
    ) {
        element.textContent = option
    } else if (isContentObject(option)) {
        if ("innerHTML" in option && option.innerHTML !== undefined) {
            element.innerHTML = option.innerHTML
        } else if (
            "textContent" in option &&
            option.textContent !== undefined
        ) {
            element.textContent = option.textContent
        }
    }
}

function addSource(element: HTMLElement, option: Option, tagName: string) {
    if (
        typeof option === "string" &&
        (option.startsWith("https://") ||
            option.startsWith("http://") ||
            option.startsWith("/"))
    ) {
        if (
            tagName === "img" ||
            tagName === "iframe" ||
            tagName === "script" ||
            tagName === "source" ||
            tagName === "embed" ||
            tagName === "video" ||
            tagName === "audio"
        ) {
            ;(
                element as
                    | HTMLImageElement
                    | HTMLIFrameElement
                    | HTMLScriptElement
                    | HTMLSourceElement
                    | HTMLEmbedElement
                    | HTMLVideoElement
                    | HTMLAudioElement
            ).src = option
        } else if (tagName === "object") {
            ;(element as HTMLObjectElement).data = option
        } else if (tagName === "a" || tagName === "link") {
            ;(element as HTMLAnchorElement | HTMLLinkElement).href = option
        }
    }
}

/* TYPE GUARDS */

function isStyleObject(option: Option): option is CSSStyleDeclaration {
    return (
        typeof option === "object" &&
        option !== null &&
        !Array.isArray(option) &&
        Object.keys(option).some(
            (key) => key in document.createElement("div").style
        )
    )
}

function isEventObject(option: Option): option is { [key: string]: Function } {
    return (
        typeof option === "object" &&
        option !== null &&
        !Array.isArray(option) &&
        Object.keys(option).some(
            (key) =>
                key.startsWith("on") &&
                typeof (option as { [key: string]: any })[key] === "function"
        )
    )
}

function isAttributeObject(option: Option): option is { [key: string]: any } {
    return (
        typeof option === "object" && option !== null && !Array.isArray(option)
    )
}

function isAriaObject(option: Option): option is { [key: string]: any } {
    return (
        typeof option === "object" &&
        option !== null &&
        !Array.isArray(option) &&
        Object.keys(option).some((key) => key.startsWith("aria-"))
    )
}

function isContentObject(
    option: Option
): option is { innerHTML?: string; textContent?: string } {
    return (
        typeof option === "object" &&
        option !== null &&
        !Array.isArray(option) &&
        ("innerHTML" in option || "textContent" in option)
    )
}
