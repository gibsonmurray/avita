export default function div(...options: Array<string | HTMLElement | Object>) {
    const div = document.createElement("div")
    options.forEach((op: any) => {
        addClass(div, op)
        addId(div, op)
        addStyles(div, op)
        addChild(div, op)
        addEvent(div, op)
    })
    return div
}

function addClass(div: HTMLDivElement, option: any) {
    if (typeof option === "string" && option.startsWith(".")) {
        const options = option.slice(1).split(".")
        options.forEach((className: string) => {
            div.classList.add(className)
        })
    }
}

function addId(div: HTMLDivElement, option: any) {
    if (typeof option === "string" && option.startsWith("#")) {
        div.id = option.slice(1)
    }
}

function addStyles(div: HTMLDivElement, option: any) {
    if (
        typeof option === "object" &&
        option !== null &&
        !Array.isArray(option)
    ) {
        const isStyleObject = Object.keys(option).some(
            (key) => key in document.createElement("div").style
        )
        if (isStyleObject) {
            Object.assign(div.style, option)
        }
    }
}

function addChild(div: HTMLDivElement, option: any) {
    if (typeof option === "object" && option instanceof HTMLElement) {
        div.appendChild(option)
    }
}

function addEvent(div: HTMLDivElement, option: any) {
    if (
        typeof option === "object" &&
        option !== null &&
        !Array.isArray(option)
    ) {
        const isEventObject = Object.keys(option).some(
            (key) => key.startsWith("on") && typeof option[key] === "function"
        )
        if (isEventObject) {
            Object.entries(option).forEach(([key, value]) => {
                const eventType = key.slice(2).toLowerCase()
                if (typeof (div as any)[`on${eventType}`] === "undefined") {
                    throw new Error(`Invalid event listener: ${key}`)
                }
                div.addEventListener(eventType, value as EventListener)
            })
        }
    }
}
