import { span, style } from "./elements"
import {
    camelToKebab,
    defaultStyles,
    generateClass,
    numberToSeconds,
} from "./utils"

export default class Avita<T extends HTMLElement | SVGElement> {
    private element: T
    private elements: T[] = [] // mostly used when querying for multiple elements, otherwise empty
    private avitaChildren: Avita<T>[] = []

    /**
     * Creates a new instance of the AvitaElement class.
     * @param tag - The tag name of the HTML element to create.
     */
    constructor(tag: string)

    /**
     * Creates a new instance of the AvitaElement class.
     * @param element - The HTML element to wrap.
     */
    constructor(element: T)

    /**
     * Creates a new instance of the AvitaElement class.
     * @param elements - The HTML elements to wrap.
     */
    constructor(elements: T[])

    constructor(tagOrElement: string | T | T[]) {
        if (typeof tagOrElement === "string") {
            this.element = document.createElementNS(
                tagOrElement.startsWith("svg")
                    ? "http://www.w3.org/2000/svg"
                    : "http://www.w3.org/1999/xhtml",
                tagOrElement
            ) as T
        } else if (Array.isArray(tagOrElement)) {
            if (tagOrElement.length === 0) {
                throw new Error("The elements array should not be empty.")
            }
            this.element = tagOrElement[0]
            this.elements = tagOrElement
        } else {
            this.element = tagOrElement
        }
    }

    /**
     * Renders the provided Avita element to the root element in the DOM.
     *
     * @param children - The Avita element to be rendered.
     * @param selector - (optional) The CSS selector for the root element in the DOM. Default is '#root'.
     * @throws {Error} If the root element with the ID 'root' is not found in the HTML.
     */
    static render<T extends HTMLElement>(
        children: Avita<T>,
        selector: string = "#root",
        options: {
            defaultStyles?: boolean
        } = {
            defaultStyles: true,
        }
    ) {
        const root = document.querySelector(selector)
        if (root) {
            if (options?.defaultStyles) {
                defaultStyles()
            }
            root.innerHTML = ""
            root.appendChild(children.element)
        } else {
            throw new Error(
                "Root element not found: please add a div with id='root' to your HTML file"
            )
        }
    }

    /**
     * Finds the element(s) with the given selector in the DOM tree.
     * @param selector - The CSS selector to match against.
     * @returns An Avita instance matching the selector.
     * @throws {Error} If no element is found with the given selector.
     */
    static find<T extends HTMLElement>(selector: string): Avita<T>

    /**
     * Finds the element(s) with the given selector in the DOM tree.
     * @param selector - The CSS selector to match against.
     * @param raw - A boolean indicating whether to return the raw HTML element(s).
     * @returns The raw HTML element(s) matching the selector.
     * @throws {Error} If no element is found with the given selector.
     */
    static find<T extends HTMLElement>(selector: string, raw: true): T | T[]

    static find<T extends HTMLElement>(
        selector: string,
        raw?: boolean
    ): Avita<T> | T | T[] {
        const elements = document.querySelectorAll(selector) as NodeListOf<T>

        if (raw) {
            // If the raw argument is provided and true
            if (elements.length > 1) {
                return Array.from(elements) // Return an array of raw elements
            }
            if (elements.length === 1) {
                return elements[0] // Return the single raw element
            }
        } else {
            if (elements.length > 1) {
                return new Avita<T>(Array.from(elements)) // Return an Avita instance with multiple elements
            }
            if (elements.length === 1) {
                return new Avita<T>(elements[0]) // Return an Avita instance with a single element
            }
        }

        throw new Error(
            `Element(s) with selector: '${selector}' not found in DOM tree`
        )
    }

    /**
     * Waits for the DOM to be fully loaded and then executes the provided callback function.
     * @param callback - The function to be executed when the DOM is ready.
     */
    static ready(callback: () => void) {
        if (document.readyState === "complete") {
            callback()
        } else {
            document.addEventListener("DOMContentLoaded", callback)
        }
    }

    /**
     * Finds the element(s) with the given selector in the local DOM subtree.
     * @param selector - The CSS selector to match against.
     * @returns An Avita instance matching the selector.
     * @throws {Error} If no element is found with the given selector.
     */
    find<T extends HTMLElement>(selector: string): Avita<T>

    /**
     * Finds the element(s) with the given selector in the local DOM subtree.
     * @param selector - The CSS selector to match against.
     * @param raw - A boolean indicating whether to return the raw HTML element(s).
     * @returns The raw HTML element(s) matching the selector.
     * @throws {Error} If no element is found with the given selector.
     */
    find<T extends HTMLElement>(selector: string, raw: true): T | T[]

    find<T extends HTMLElement>(
        selector: string,
        raw?: boolean
    ): Avita<T> | T | T[] {
        const elements = this.element.querySelectorAll(
            selector
        ) as NodeListOf<T>

        if (raw) {
            // If the raw argument is provided and true
            if (elements.length > 1) {
                return Array.from(elements) // Return an array of raw elements
            }
            if (elements.length === 1) {
                return elements[0] // Return the single raw element
            }
        } else {
            if (elements.length > 1) {
                return new Avita<T>(Array.from(elements)) // Return an Avita instance with multiple elements
            }
            if (elements.length === 1) {
                return new Avita<T>(elements[0]) // Return an Avita instance with a single element
            }
        }

        throw new Error(
            `Element(s) with selector: '${selector}' not found in local DOM subtree`
        )
    }

    /**
     * Gets the ID of the current Avita element.
     * @returns The ID of the current Avita element as a string.
     */
    id(): string

    /**
     * Sets the ID of the current Avita element.
     * @param value - The new ID to set for the Avita element.
     * @returns The current Avita instance for chaining.
     */
    id(value: string): this

    id(id?: string) {
        if (!id) {
            return this.element.id
        }
        this.element.id = id
        return this
    }

    /**
     * Gets the CSS class(es) of the first element.
     * @returns The current CSS classes as a string.
     */
    class(): string

    /**
     * Sets the CSS class(es) of the element(s), concatenating them with the existing classes.
     * @param value - The CSS class(es) to add to the element(s).
     * @returns The current Avita instance for chaining.
     */
    class(value: string): this

    // Implementation
    class(value?: string): string | this {
        if (!value) {
            // Getter: Return the class names as a string
            return this.element.className
        } else {
            // Setter: Add the new classes
            const classNames = value.split(" ")
            this.element.classList.add(...classNames)
            if (this.elements.length > 0)
                this.elements.forEach((element) => {
                    element.classList.add(...classNames)
                })
            return this
        }
    }

    /**
     * Gets the CSS class(es) of the current Avita element.
     * @returns The current CSS classes as a CSSStyleDeclaration object.
     */
    css(): CSSStyleDeclaration

    /**
     * Gets the value of the specified CSS property of the element(s).
     * @note Use this method to get the value of multiple elements.
     * @param property - The CSS property to get the value of.
     * @returns The value of the specified CSS property.
     */
    css(property: string): string | undefined

    /**
     * Sets the inline styles of the element(s).
     * @note Use this method to set the value of a single property.
     * @param property - The CSS property to set.
     * @param value - The value to set for the CSS property.
     * @returns The current AvitaElement instance for chaining.
     */
    css(property: string, value: string): this

    /**
     * Sets the inline styles of the element(s).
     * @note Use this method to set multiple properties at once.
     * @param props - An object containing the CSS styles to apply to the element(s).
     * @returns The current AvitaElement instance for chaining.
     */
    css(props: Partial<CSSStyleDeclaration>): this

    css(
        propertyOrProps?: string | Partial<CSSStyleDeclaration>,
        value?: string
    ): string | this | CSSStyleDeclaration | undefined {
        const computedStyle = getComputedStyle(this.element)

        if (!propertyOrProps && !value) {
            // Return all computed styles when no arguments are provided
            return computedStyle
        }

        if (typeof propertyOrProps === "string") {
            if (!value) {
                // Get the value of a single CSS property
                return (
                    computedStyle.getPropertyValue(propertyOrProps) || undefined
                )
            } else {
                // Set a single CSS property
                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        element.style[propertyOrProps as any] = value
                    })
                return this
            }
        }

        if (typeof propertyOrProps === "object") {
            // Set multiple CSS properties
            for (const [prop, val] of Object.entries(propertyOrProps)) {
                if (val !== undefined) {
                    if (this.elements.length > 0)
                        this.elements.forEach((element) => {
                            element.style[prop as any] = String(val)
                        })
                }
            }
            return this
        }
    }

    /**
     * Gets all attributes of the element(s).
     * @returns {Object} The values of the specified attributes.
     */
    attr(): Record<string, string>

    /**
     * Gets the specified attribute of the element(s).
     * @param name - The name of the attribute to set.
     * @returns The value of the specified attribute.
     */
    attr(name: string): string | undefined

    /**
     * Sets the specified attribute of the element(s).
     * @param name - The name of the attribute to set.
     * @param value - The value to set for the attribute.
     * @returns The current AvitaElement instance for chaining.
     */
    attr(name: string, value: string): this

    /**
     * Sets the specified attributes of the element(s).
     * @param attributes - An object containing the attributes to set on the element(s).
     * @returns The current AvitaElement instance for chaining.
     */
    attr(attributes: Record<string, string>): this

    attr(
        nameOrAttributes?: string | Record<string, string>,
        value?: string
    ): string | this | Record<string, string> | undefined {
        if (!nameOrAttributes) {
            // Get all attributes
            const attributes: Record<string, string> = {}
            for (let i = 0; i < this.element.attributes.length; i++) {
                const attr = this.element.attributes[i]
                attributes[attr.name] = attr.value
            }
            return attributes
        } else if (typeof nameOrAttributes === "string") {
            if (!value) {
                // Get the value of the specified attribute
                return this.element.getAttribute(nameOrAttributes) || undefined
            } else {
                // Set the value of the specified attribute
                this.element.setAttribute(nameOrAttributes, value)
                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        element.setAttribute(nameOrAttributes, value)
                    })
                return this
            }
        } else {
            // Set multiple attributes
            for (const [key, val] of Object.entries(nameOrAttributes)) {
                this.element.setAttribute(key, val)
                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        element.setAttribute(key, val)
                    })
            }
            return this
        }
    }

    /**
     * Sets the `src` attribute of the element if it is an `HTMLImageElement`, `HTMLIFrameElement`, or `HTMLScriptElement`.
     * @param value - The URL to set as the `src` attribute of the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    src(value: string) {
        if (
            this.element instanceof HTMLImageElement ||
            this.element instanceof HTMLIFrameElement ||
            this.element instanceof HTMLScriptElement
        ) {
            this.element.src = value
        }
        return this
    }

    /**
     * Sets the `href` attribute of the element if it is an `HTMLAnchorElement` or `HTMLLinkElement`.
     * @param value - The URL to set as the `href` attribute of the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    href(value: string) {
        if (
            this.element instanceof HTMLAnchorElement ||
            this.element instanceof HTMLLinkElement
        ) {
            this.element.href = value
        }
        return this
    }
    /**
     * Gets all data attributes of the element.
     * @returns An object containing all data attributes of the element.
     */
    data(): Record<string, string>

    /**
     * Gets the value of a data attribute on the element.
     * @param key - The name of the data attribute to get.
     * @returns The value of the specified data attribute, or `undefined` if the attribute does not exist.
     */
    data(key: string): string | undefined

    /**
     * Sets a data attribute on the element.
     * @param key - The name of the data attribute to set.
     * @param value - The value to set for the data attribute.
     * @returns The current AvitaElement instance for chaining.
     */
    data(key: string, value: string): this

    /**
     * Sets multiple data attributes on the element.
     * @param dataAttributes - An object containing the data attributes to set on the element.
     * @returns The current AvitaElement instance for chaining.
     */
    data(dataAttributes: Record<string, string>): this

    data(
        keyOrDataAttributes?: string | Record<string, string>,
        value?: string
    ): string | this | Record<string, string> | undefined {
        if (!keyOrDataAttributes) {
            // Get all data attributes
            const dataAttributes: Record<string, string> = {}
            for (const key in this.element.dataset) {
                dataAttributes[key] = this.element.dataset[key]!
            }
            return dataAttributes
        } else if (typeof keyOrDataAttributes === "string") {
            if (!value) {
                // Get the value of the specified data attribute
                return this.element.dataset[keyOrDataAttributes] || undefined
            } else {
                // Set the value of the specified data attribute
                this.element.dataset[keyOrDataAttributes] = value
                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        //todo double check
                        element.dataset[keyOrDataAttributes] = value
                    })
                return this
            }
        } else {
            // Set multiple data attributes
            for (const [key, val] of Object.entries(keyOrDataAttributes)) {
                this.element.dataset[key] = val
                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        //todo double check
                        element.dataset[key] = val
                    })
            }
            return this
        }
    }

    /**
     * Sets the `alt` attribute of the element if it is an `HTMLImageElement`.
     * @param value - The alternative text to set for the image.
     * @returns The current `AvitaElement` instance for chaining.
     */
    alt(value: string) {
        if (this.element instanceof HTMLImageElement) {
            this.element.alt = value
        }
        return this
    }

    /**
     * Gets the `title` attribute of the element.
     * @returns The current `title` attribute value of the element.
     */
    title(): string

    /**
     * Sets the `title` attribute of the element.
     * @param value - The text to set as the `title` attribute of the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    title(value: string): this

    title(value?: string): string | this {
        if (this.element instanceof HTMLElement) {
            if (!value) {
                // Getter: Return the current title attribute value
                return this.element.title
            } else {
                // Setter: Set the title attribute value
                this.element.title = value
                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        //todo double check
                        if (element instanceof HTMLElement) {
                            element.title = value
                        }
                    })
                return this
            }
        }
        return this // In case the element is not an HTMLElement, return this for chaining
    }

    /**
     * Sets the text content of the element.
     * @param value - The text content to set for the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    text(value: string) {
        this.element.textContent = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.textContent = value
            })
        return this
    }

    /**
     * Sets the HTML content of the element.
     * @param value - The HTML content to set for the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    html(value: string) {
        this.element.innerHTML = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.innerHTML = value
            })
        return this
    }

    /**
     * Appends the current `AvitaElement` instance to the provided `AvitaElement` instance.
     * @param element - The `AvitaElement` instance to append the current instance to.
     * @returns The current `AvitaElement` instance for chaining.
     */
    append(element: Avita<T>) {
        this.element.appendChild(element.element)
        this.elements.forEach((el) => {
            el.appendChild(element.element)
        })
        return this
    }

    /**
     * Prepends the current `AvitaElement` instance to the provided `AvitaElement` instance.
     * @param element - The `AvitaElement` instance to prepend the current instance to.
     * @returns The current `AvitaElement` instance for chaining.
     */
    prepend(element: Avita<T>) {
        this.element.prepend(element.element)
        this.elements.forEach((el) => {
            el.prepend(element.element)
        })
        return this
    }

    /**
     * Removes the current `AvitaElement` instance from the DOM.
     * @returns The current `AvitaElement` instance for chaining.
     */
    remove() {
        this.element.remove()
        this.elements.forEach((el) => {
            // todo double check
            el.remove()
        })
        return this
    }

    /**
     * Empties the child elements of the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    empty() {
        this.avitaChildren = []
        this.updateDOMChildren()
        return this
    }

    /**
     * Gets the child elements of the current `AvitaElement` instance.
     * @returns An array of `AvitaElement` instances representing the child elements.
     */
    children(): Avita<T>[]

    /**
     * Sets the child elements of the current `AvitaElement` instance. This will remove any existing child elements.
     * @param elements - An array of `AvitaElement` instances or strings to set as the child elements.
     * @returns The current `AvitaElement` instance for chaining.
     */
    children(...elements: (Avita<T> | string)[]): this

    children(...elements: (Avita<T> | string)[]): Avita<T>[] | this {
        if (elements.length === 0) {
            // Getter logic
            return this.avitaChildren
        } else {
            // Setter logic
            this.avitaChildren = []
            elements.forEach((element) => {
                if (typeof element === "string") {
                    this.avitaChildren.push(span().text(element) as Avita<T>)
                } else {
                    this.avitaChildren.push(element)
                }
            })
            this.updateDOMChildren()
            return this
        }
    }

    /**
     * Removes the child element at the specified index from the current `AvitaElement` instance.
     * @param index - The index of the child element to remove.
     * @returns The current `AvitaElement` instance for chaining.
     */
    removeChild(index: number) {
        this.avitaChildren.splice(index, 1)
        this.updateDOMChildren()
        return this
    }

    /**
     * Updates the DOM children of the current `AvitaElement` instance to match the `avitaChildren` array.
     * This removes any existing child nodes and appends the new child elements.
     */
    private updateDOMChildren() {
        this.element.childNodes.forEach((child) => {
            child.remove()
        })
        this.avitaChildren.forEach((child) => {
            this.element.appendChild(child.element)
        })
    }

    /**
     * Replaces the current `AvitaElement` instance with the provided `AvitaElement` instance.
     * @param element - The `AvitaElement` instance to replace the current instance with.
     * @returns The current `AvitaElement` instance for chaining.
     */
    replace(element: Avita<T>) {
        this.element.replaceWith(element.element)
        return this
    }

    /**
     * Gets the value of the current `AvitaElement` instance if it is an `HTMLInputElement`.
     * @returns The value of the current `AvitaElement` instance if it is an `HTMLInputElement`. Otherwise, returns an empty string.
     */
    value(): string

    /**
     * Sets the value of the current `AvitaElement` instance if it is an `HTMLInputElement`.
     * @param value - The value to set for the `HTMLInputElement`.
     * @returns The current `AvitaElement` instance for chaining.
     */
    value(value: string): this

    value(value?: string): string | this {
        if (!value) {
            if (this.element instanceof HTMLInputElement) {
                return this.element.value
            }
            return ""
        } else {
            if (this.element instanceof HTMLInputElement) {
                this.element.value = value
            }
            return this
        }
    }

    /**
     * Gets the placeholder text of the current `AvitaElement` instance if it is an `HTMLInputElement`.
     * @returns The placeholder text of the input element, or `undefined` if it is not set.
     */
    placeholder(): string | undefined

    /**
     * Sets the placeholder text of the current `AvitaElement` instance if it is an `HTMLInputElement`.
     * @param value - The placeholder text to set for the input element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    placeholder(value: string): this

    placeholder(value?: string): string | this | undefined {
        if (!value) {
            // Get the placeholder text
            if (this.element instanceof HTMLInputElement) {
                return this.element.placeholder || undefined
            }
            return undefined
        } else {
            // Set the placeholder text
            if (this.element instanceof HTMLInputElement) {
                this.element.placeholder = value
            }
            return this
        }
    }

    /**
     * Attaches an event listener to the current `AvitaElement` instance. Works with both single and multiple elements.
     * @param event - The name of the event to listen for.
     * @param callback - The callback function to be executed when the event is triggered.
     * @returns The current `AvitaElement` instance for chaining.
     */
    on(event: string, callback: (event: Event) => void) {
        this.element.addEventListener(event, callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener(event, callback)
            })
        return this
    }

    /**
     * Attaches hover event listeners to the current `AvitaElement` instance.
     * Restores the original state when the mouse leaves the element.
     * @param onMouseEnter - The callback function to be executed when the mouse enters the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onHover(onMouseEnter: (event: MouseEvent) => void): this

    /**
     * Attaches hover event listeners to the current `AvitaElement` instance.
     * Executes the provided callbacks when the mouse enters and exits the element.
     * @param onMouseEnter - The callback function to be executed when the mouse enters the element.
     * @param onMouseLeave - The callback function to be executed when the mouse leaves the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onHover(
        onMouseEnter: (event: MouseEvent) => void,
        onMouseLeave: (event: MouseEvent) => void
    ): this

    onHover(
        onMouseEnter: (event: MouseEvent) => void,
        onMouseLeave?: (event: MouseEvent) => void
    ): this {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("mouseover", onMouseEnter)

            if (this.elements.length > 0)
                this.elements.forEach((element) => {
                    if (element instanceof HTMLElement) {
                        element.addEventListener("mouseover", onMouseEnter)
                    }
                })

            this.element.addEventListener("mouseout", (event) => {
                if (onMouseLeave) {
                    onMouseLeave(event)
                }
            })

            if (this.elements.length > 0)
                this.elements.forEach((element) => {
                    if (element instanceof HTMLElement) {
                        element.addEventListener("mouseout", (event) => {
                            if (onMouseLeave) {
                                onMouseLeave(event)
                            }
                        })
                    }
                })
        }
        return this
    }

    /**
     * Attaches a click event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is clicked.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onClick(callback: (event: MouseEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("click", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("click", callback)
                }
            })
        return this
    }

    /**
     * Attaches a double click event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is double clicked.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onDoubleClick(callback: (event: MouseEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("dblclick", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("dblclick", callback)
                }
            })
        return this
    }

    /**
     * Attaches a copy event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is copied.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onCopy(callback: (event: ClipboardEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("copy", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("copy", callback)
                }
            })
        return this
    }

    /**
     * Attaches a cut event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is cut.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onCut(callback: (event: ClipboardEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("cut", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("cut", callback)
                }
            })
        return this
    }

    /**
     * Attaches a paste event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is pasted to.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPaste(callback: (event: ClipboardEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("paste", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("paste", callback)
                }
            })
        return this
    }

    /**
     * Attaches a composition start event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the composition starts on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onCompositionStart(callback: (event: CompositionEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("compositionstart", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("compositionstart", callback)
                }
            })
        return this
    }

    /**
     * Attaches a composition update event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the composition is updated on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onCompositionUpdate(callback: (event: CompositionEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("compositionupdate", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("compositionupdate", callback)
                }
            })
        return this
    }

    /**
     * Attaches a composition end event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the composition ends on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onCompositionEnd(callback: (event: CompositionEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("compositionend", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("compositionend", callback)
                }
            })
        return this
    }

    /**
     * Attaches a change event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's value changes.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onChange(callback: (event: Event) => void) {
        this.element.addEventListener("change", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("change", callback)
                }
            })
        return this
    }

    /**
     * Attaches an input event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's value is input.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onInput(callback: (event: Event) => void) {
        this.element.addEventListener("input", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("input", callback)
                }
            })
        return this
    }

    /**
     * Attaches a submit event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is submitted.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onSubmit(callback: (event: Event) => void) {
        this.element.addEventListener("submit", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("submit", callback)
            })
        return this
    }

    /**
     * Attaches an invalid event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is invalid.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onInvalid(callback: (event: Event) => void) {
        this.element.addEventListener("invalid", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("invalid", callback)
            })
        return this
    }

    /**
     * Attaches a reset event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is reset.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onReset(callback: (event: Event) => void) {
        this.element.addEventListener("reset", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("reset", callback)
            })
        return this
    }

    /**
     * Attaches a keydown event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when a key is pressed down on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onKeyDown(callback: (event: KeyboardEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("keydown", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("keydown", callback)
                }
            })
        return this
    }

    /**
     * Attaches a keypress event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when a key is pressed on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onKeyPress(callback: (event: KeyboardEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("keypress", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("keypress", callback)
                }
            })
        return this
    }

    /**
     * Attaches a keyup event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when a key is released on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onKeyUp(callback: (event: KeyboardEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("keyup", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("keyup", callback)
                }
            })
        return this
    }

    /**
     * Attaches a focus event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element receives focus.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onFocus(callback: (event: FocusEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("focus", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("focus", callback)
                }
            })
        return this
    }

    /**
     * Attaches a blur event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element loses focus.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onBlur(callback: (event: FocusEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("blur", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("blur", callback)
                }
            })
        return this
    }

    /**
     * Attaches a focusin event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element receives focus.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onFocusIn(callback: (event: FocusEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("focusin", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("focusin", callback)
                }
            })
        return this
    }

    /**
     * Attaches a focusout event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element loses focus.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onFocusOut(callback: (event: FocusEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("focusout", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("focusout", callback)
                }
            })
        return this
    }

    /**
     * Attaches a mousedown event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the mouse button is pressed down on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onMouseDown(callback: (event: MouseEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("mousedown", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("mousedown", callback)
                }
            })
        return this
    }

    /**
     * Attaches a mouseup event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the mouse button is released on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onMouseUp(callback: (event: MouseEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("mouseup", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("mouseup", callback)
                }
            })
        return this
    }

    /**
     * Attaches a mouseenter event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the mouse pointer enters the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onMouseEnter(callback: (event: MouseEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("mouseenter", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("mouseenter", callback)
                }
            })
        return this
    }

    /**
     * Attaches a mouseleave event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the mouse pointer leaves the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onMouseLeave(callback: (event: MouseEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("mouseleave", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("mouseleave", callback)
                }
            })
        return this
    }

    /**
     * Attaches a mousemove event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the mouse pointer is moved over the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onMouseMove(callback: (event: MouseEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("mousemove", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("mousemove", callback)
                }
            })
        return this
    }

    /**
     * Attaches a mouseover event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the mouse pointer moves over the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onMouseOver(callback: (event: MouseEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("mouseover", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("mouseover", callback)
                }
            })
        return this
    }

    /**
     * Attaches a mouseout event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the mouse pointer leaves the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onMouseOut(callback: (event: MouseEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("mouseout", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("mouseout", callback)
                }
            })
        return this
    }

    /**
     * Attaches a contextmenu event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the user right-clicks or otherwise triggers the contextmenu event on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onContextMenu(callback: (event: MouseEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("contextmenu", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("contextmenu", callback)
                }
            })
        return this
    }

    /**
     * Attaches a pointerover event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the pointer moves over the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPointerOver(callback: (event: PointerEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("pointerover", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("pointerover", callback)
                }
            })
        return this
    }

    /**
     * Attaches a pointerenter event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the pointer enters the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPointerEnter(callback: (event: PointerEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("pointerenter", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("pointerenter", callback)
                }
            })
        return this
    }

    /**
     * Attaches a pointerleave event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the pointer leaves the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPointerLeave(callback: (event: PointerEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("pointerleave", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("pointerleave", callback)
                }
            })
        return this
    }

    /**
     * Attaches a pointermove event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the pointer moves over the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPointerMove(callback: (event: PointerEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("pointermove", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("pointermove", callback)
                }
            })
        return this
    }

    /**
     * Attaches a pointerdown event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the pointer is pressed down on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPointerDown(callback: (event: PointerEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("pointerdown", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("pointerdown", callback)
                }
            })
        return this
    }

    /**
     * Attaches a pointerup event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the pointer is released on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPointerUp(callback: (event: PointerEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("pointerup", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("pointerup", callback)
                }
            })
        return this
    }

    /**
     * Attaches a pointercancel event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the pointer interaction is canceled on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPointerCancel(callback: (event: PointerEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("pointercancel", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("pointercancel", callback)
                }
            })
        return this
    }

    /**
     * Attaches a pointerout event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the pointer leaves the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPointerOut(callback: (event: PointerEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("pointerout", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("pointerout", callback)
                }
            })
        return this
    }

    /**
     * Attaches a gotpointercapture event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the pointer capture is gained on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onGotPointerCapture(callback: (event: PointerEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("gotpointercapture", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("gotpointercapture", callback)
                }
            })
        return this
    }

    /**
     * Attaches a lostpointercapture event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the pointer capture is lost on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onLostPointerCapture(callback: (event: PointerEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("lostpointercapture", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("lostpointercapture", callback)
                }
            })
        return this
    }

    /**
     * Attaches a touchstart event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the touch starts on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onTouchStart(callback: (event: TouchEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("touchstart", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("touchstart", callback)
                }
            })
        return this
    }

    /**
     * Attaches a touchmove event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the touch moves on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onTouchMove(callback: (event: TouchEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("touchmove", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("touchmove", callback)
                }
            })
        return this
    }

    /**
     * Attaches a touchend event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the touch ends on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onTouchEnd(callback: (event: TouchEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("touchend", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("touchend", callback)
                }
            })
        return this
    }

    /**
     * Attaches a touchcancel event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the touch is canceled on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onTouchCancel(callback: (event: TouchEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("touchcancel", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("touchcancel", callback)
                }
            })
        return this
    }

    /**
     * Attaches a scroll event listener to the window.
     * @param callback - The callback function to be executed when the element is scrolled.
     * @returns The current `AvitaElement` instance for chaining.
     */
    static onScroll(callback: (event: Event) => void) {
        window.addEventListener("scroll", callback)
    }

    /**
     * Attaches a scroll event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is scrolled.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onScroll(callback: (event: Event) => void) {
        this.element.addEventListener("scroll", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("scroll", callback)
            })
        return this
    }

    /**
     * Attaches a resize event listener to the window.
     * @param callback - The callback function to be executed when the window is resized.
     * @returns The current `AvitaElement` instance for chaining.
     */
    static onResize(callback: (event: Event) => void) {
        window.addEventListener("resize", callback)
    }

    /**
     * Attaches a resize event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is resized.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onResize(callback: (event: UIEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("resize", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("resize", callback)
                }
            })
        return this
    }

    /**
     * Attaches a wheel event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the wheel is scrolled on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onWheel(callback: (event: WheelEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("wheel", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("wheel", callback)
                }
            })
        return this
    }

    /**
     * Attaches a drag event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is dragged.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onDrag(callback: (event: DragEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("drag", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("drag", callback)
                }
            })
        return this
    }

    /**
     * Attaches a dragend event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the drag operation is completed on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onDragEnd(callback: (event: DragEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("dragend", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("dragend", callback)
                }
            })
        return this
    }

    /**
     * Attaches a dragenter event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is entered during a drag operation.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onDragEnter(callback: (event: DragEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("dragenter", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("dragenter", callback)
                }
            })
        return this
    }

    /**
     * Attaches a dragleave event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is left during a drag operation.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onDragLeave(callback: (event: DragEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("dragleave", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("dragleave", callback)
                }
            })
        return this
    }

    /**
     * Attaches a dragover event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is dragged over.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onDragOver(callback: (event: DragEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("dragover", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("dragover", callback)
                }
            })
        return this
    }

    /**
     * Attaches a dragstart event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the drag operation starts on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onDragStart(callback: (event: DragEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("dragstart", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("dragstart", callback)
                }
            })
        return this
    }

    /**
     * Attaches a drop event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is dropped.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onDrop(callback: (event: DragEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("drop", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("drop", callback)
                }
            })
        return this
    }

    /**
     * Attaches a abort event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is aborted.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onAbort(callback: (event: Event) => void) {
        this.element.addEventListener("abort", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("abort", callback)
            })
        return this
    }

    /**
     * Attaches a canplay event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is able to start playing.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onCanPlay(callback: (event: Event) => void) {
        this.element.addEventListener("canplay", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("canplay", callback)
            })
        return this
    }

    /**
     * Attaches a canplaythrough event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is able to play through without interruption.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onCanPlayThrough(callback: (event: Event) => void) {
        this.element.addEventListener("canplaythrough", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("canplaythrough", callback)
            })
        return this
    }

    /**
     * Attaches a durationchange event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the duration of the element changes.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onDurationChange(callback: (event: Event) => void) {
        this.element.addEventListener("durationchange", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("durationchange", callback)
            })
        return this
    }

    /**
     * Attaches an emptied event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is emptied.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onEmptied(callback: (event: Event) => void) {
        this.element.addEventListener("emptied", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("emptied", callback)
            })
        return this
    }

    /**
     * Attaches an encrypted event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is encrypted.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onEncrypted(callback: (event: Event) => void) {
        this.element.addEventListener("encrypted", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("encrypted", callback)
            })
        return this
    }

    /**
     * Attaches an ended event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element has finished playing.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onEnded(callback: (event: Event) => void) {
        this.element.addEventListener("ended", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("ended", callback)
            })
        return this
    }

    /**
     * Attaches a loadeddata event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's media data has finished loading.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onLoadedData(callback: (event: Event) => void) {
        this.element.addEventListener("loadeddata", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("loadeddata", callback)
            })
        return this
    }

    /**
     * Attaches a loadedmetadata event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's media metadata has finished loading.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onLoadedMetadata(callback: (event: Event) => void) {
        this.element.addEventListener("loadedmetadata", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("loadedmetadata", callback)
            })
        return this
    }

    /**
     * Attaches a loadstart event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element starts loading.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onLoadStart(callback: (event: Event) => void) {
        this.element.addEventListener("loadstart", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("loadstart", callback)
            })
        return this
    }

    /**
     * Attaches a pause event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is paused.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPause(callback: (event: Event) => void) {
        this.element.addEventListener("pause", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("pause", callback)
            })
        return this
    }

    /**
     * Attaches a play event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element starts playing.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPlay(callback: (event: Event) => void) {
        this.element.addEventListener("play", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("play", callback)
            })
        return this
    }

    /**
     * Attaches a playing event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element starts playing.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPlaying(callback: (event: Event) => void) {
        this.element.addEventListener("playing", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("playing", callback)
            })
        return this
    }

    /**
     * Attaches a progress event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's media data is being loaded.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onProgress(callback: (event: ProgressEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("progress", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("progress", callback)
                }
            })
        return this
    }

    /**
     * Attaches a ratechange event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's playback rate changes.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onRateChange(callback: (event: Event) => void) {
        this.element.addEventListener("ratechange", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("ratechange", callback)
            })
        return this
    }

    /**
     * Attaches a seeked event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element has finished seeking.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onSeeked(callback: (event: Event) => void) {
        this.element.addEventListener("seeked", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("seeked", callback)
            })
        return this
    }

    /**
     * Attaches a seeking event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element starts seeking.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onSeeking(callback: (event: Event) => void) {
        this.element.addEventListener("seeking", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("seeking", callback)
            })
        return this
    }

    /**
     * Attaches a stalled event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's media data loading has been interrupted.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onStalled(callback: (event: Event) => void) {
        this.element.addEventListener("stalled", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("stalled", callback)
            })
        return this
    }

    /**
     * Attaches a suspend event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's media data loading has been suspended.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onSuspend(callback: (event: Event) => void) {
        this.element.addEventListener("suspend", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("suspend", callback)
            })
        return this
    }

    /**
     * Attaches a timeupdate event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's playback position changes.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onTimeUpdate(callback: (event: Event) => void) {
        this.element.addEventListener("timeupdate", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("timeupdate", callback)
            })
        return this
    }

    /**
     * Attaches a volumechange event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's volume has changed.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onVolumeChange(callback: (event: Event) => void) {
        this.element.addEventListener("volumechange", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("volumechange", callback)
            })
        return this
    }

    /**
     * Attaches a waiting event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is waiting for media data to be available.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onWaiting(callback: (event: Event) => void) {
        this.element.addEventListener("waiting", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("waiting", callback)
            })
        return this
    }

    /**
     * Attaches a load event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element has finished loading.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onLoad(callback: (event: Event) => void) {
        this.element.addEventListener("load", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("load", callback)
            })
        return this
    }

    /**
     * Attaches a global error event listener.
     * @param callback - The callback function to be executed when a global error occurs.
     * @returns The current `AvitaElement` instance for chaining.
     */
    static onError(callback: (event: Event) => void) {
        window.addEventListener("error", callback)
    }

    /**
     * Attaches an error event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when an error occurs.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onError(callback: (event: Event) => void) {
        this.element.addEventListener("error", callback)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.addEventListener("error", callback)
            })
        return this
    }

    /**
     * Attaches an animationstart event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when an animation starts on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onAnimationStart(callback: (event: AnimationEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("animationstart", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("animationstart", callback)
                }
            })
        return this
    }

    /**
     * Attaches an animationend event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when an animation ends on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onAnimationEnd(callback: (event: AnimationEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("animationend", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("animationend", callback)
                }
            })
        return this
    }

    /**
     * Attaches an animationiteration event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when an animation iteration occurs on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onAnimationIteration(callback: (event: AnimationEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("animationiteration", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("animationiteration", callback)
                }
            })
        return this
    }

    /**
     * Attaches a transitionstart event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when a transition starts on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onTransitionStart(callback: (event: TransitionEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("transitionstart", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("transitionstart", callback)
                }
            })
        return this
    }

    /**
     * Attaches a transitionend event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when a transition ends on the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onTransitionEnd(callback: (event: TransitionEvent) => void) {
        if (this.element instanceof HTMLElement) {
            this.element.addEventListener("transitionend", callback)
        }
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.addEventListener("transitionend", callback)
                }
            })
        return this
    }

    // Pseudoclasses onEventCSS methods

    /**
     * Attaches a CSS hover effect to the current `AvitaElement` instance.
     * The hover effect is defined by the provided CSS properties or a single property-value pair.
     * A unique CSS class is generated and applied to the element to scope the hover effect.
     * @param props - The CSS properties to apply to the element when hovered over.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onHoverCSS(props: Partial<CSSStyleDeclaration>): this

    /**
     * Attaches a CSS hover effect to the current `AvitaElement` instance.
     * The hover effect is defined by the provided CSS property and value.
     * A unique CSS class is generated and applied to the element to scope the hover effect.
     * @param property - The CSS property to apply to the element when hovered over.
     * @param value - The value to set for the CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onHoverCSS(property: string, value: string): this

    onHoverCSS(
        propsOrProperty: Partial<CSSStyleDeclaration> | string,
        value?: string
    ): this {
        return this.applyPseudoClassCSS("hover", propsOrProperty, value)
    }

    /**
     * Attaches a CSS active effect to the current `AvitaElement` instance.
     * The active effect is defined by the provided CSS properties or a single property-value pair.
     * A unique CSS class is generated and applied to the element to scope the active effect.
     * @param props - The CSS properties to apply to the element when it is active.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onActiveCSS(props: Partial<CSSStyleDeclaration>): this

    /**
     * Attaches a CSS active effect to the current `AvitaElement` instance.
     * The active effect is defined by the provided CSS property and value.
     * A unique CSS class is generated and applied to the element to scope the active effect.
     * @param property - The CSS property to apply to the element when it is active.
     * @param value - The value to set for the CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onActiveCSS(property: string, value: string): this

    onActiveCSS(
        propsOrProperty: Partial<CSSStyleDeclaration> | string,
        value?: string
    ): this {
        return this.applyPseudoClassCSS("active", propsOrProperty, value)
    }

    /**
     * Attaches a CSS focus effect to the current `AvitaElement` instance.
     * The focus effect is defined by the provided CSS properties or a single property-value pair.
     * A unique CSS class is generated and applied to the element to scope the focus effect.
     * @param props - The CSS properties to apply to the element when it is focused.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onFocusCSS(props: Partial<CSSStyleDeclaration>): this

    /**
     * Attaches a CSS focus effect to the current `AvitaElement` instance.
     * The focus effect is defined by the provided CSS property and value.
     * A unique CSS class is generated and applied to the element to scope the focus effect.
     * @param property - The CSS property to apply to the element when it is focused.
     * @param value - The value to set for the CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onFocusCSS(property: string, value: string): this

    onFocusCSS(
        propsOrProperty: Partial<CSSStyleDeclaration> | string,
        value?: string
    ): this {
        return this.applyPseudoClassCSS("focus", propsOrProperty, value)
    }

    /**
     * Attaches a CSS focus-within effect to the current `AvitaElement` instance.
     * The focus-within effect is defined by the provided CSS properties or a single property-value pair.
     * A unique CSS class is generated and applied to the element to scope the focus-within effect.
     * @param props - The CSS properties to apply to the element when it or one of its descendants is focused.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onFocusWithinCSS(props: Partial<CSSStyleDeclaration>): this

    /**
     * Attaches a CSS focus-within effect to the current `AvitaElement` instance.
     * The focus-within effect is defined by the provided CSS property and value.
     * A unique CSS class is generated and applied to the element to scope the focus-within effect.
     * @param property - The CSS property to apply to the element when it or one of its descendants is focused.
     * @param value - The value to set for the CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onFocusWithinCSS(property: string, value: string): this

    onFocusWithinCSS(
        propsOrProperty: Partial<CSSStyleDeclaration> | string,
        value?: string
    ): this {
        return this.applyPseudoClassCSS("focus-within", propsOrProperty, value)
    }

    /**
     * Helper method to apply CSS for a given pseudoclass.
     * @param pseudoClass - The pseudoclass to apply (e.g., "hover", "active").
     * @param propsOrProperty - The CSS properties or property to apply.
     * @param value - The value to set for the CSS property (if a single property is provided).
     * @returns The current `AvitaElement` instance for chaining.
     */
    private applyPseudoClassCSS(
        pseudoClass: string,
        propsOrProperty: Partial<CSSStyleDeclaration> | string,
        value?: string
    ): this {
        const uniqueClass = generateClass()
        this.class(uniqueClass)

        let body = ""

        if (typeof propsOrProperty === "string" && value) {
            body = `${camelToKebab(propsOrProperty)}: ${value}!important;\n`
        }

        if (typeof propsOrProperty === "object") {
            Object.entries(propsOrProperty).forEach(([prop, val]) => {
                body += `${camelToKebab(prop)}: ${val}!important;\n`
            })
        }

        const pseudoCSS = `.${uniqueClass}:${pseudoClass} {\n${body}\n}`
        $("head").append(style().text(pseudoCSS))

        return this
    }

    // CSS Properties

    /**
     * Sets the 'all' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'all' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    all(value: string) {
        this.element.style.all = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.all = value
            })
        return this
    }

    /**
     * Sets the 'accent-color' CSS property on the current `AvitaElement` instance.
     * @param color - The color value to set for the 'accent-color' property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    accent(color: string) {
        this.element.style.accentColor = String(color)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.accentColor = String(color)
            })
        return this
    }

    /**
     * Sets the 'appearance' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'appearance' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    appearance(value: string) {
        this.element.style.appearance = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.appearance = value
            })
        return this
    }

    /**
     * Sets the 'align-content' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'align-content' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    alignContent(value: string) {
        this.element.style.alignContent = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.alignContent = value
            })
        return this
    }

    /**
     * Shorthand for setting the 'align-content' CSS property on the current `AvitaElement` instance.
     * @returns The current value of the 'align-content' CSS property.
     */
    aContent = this.alignContent

    /**
     * Sets the 'align-items' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'align-items' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    alignItems(value: string) {
        this.element.style.alignItems = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.alignItems = value
            })
        return this
    }

    /**
     * Shorthand for setting the 'align-items' CSS property on the current `AvitaElement` instance.
     * @returns The current value of the 'align-items' CSS property.
     */
    aItems = this.alignItems

    /**
     * Sets the 'align-self' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'align-self' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    alignSelf(value: string) {
        this.element.style.alignSelf = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.alignSelf = value
            })
        return this
    }

    /**
     * Shorthand for setting the 'align-self' CSS property on the current `AvitaElement` instance.
     * @returns The current value of the 'align-self' CSS property.
     */
    aSelf = this.alignSelf

    /**
     * Todo: Big things coming soon...
     * Sets the 'animation' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'animation' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    animationCSS(value: string) {
        this.element.style.animation = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.animation = value
            })
        return this
    }

    /**
     * Sets the 'aspectRatio' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'aspectRatio' CSS property. Can be a number or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    aspectRatio(value: string | number) {
        this.element.style.aspectRatio = String(value)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.aspectRatio = String(value)
            })
        return this
    }

    /**
     * Shorthand for setting the 'background' CSS property on the current `AvitaElement` instance.
     * @returns The current value of the 'aspectRatio' CSS property.
     */
    ratio = this.aspectRatio

    /**
     * Sets the 'backdropFilter' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backdropFilter' CSS property. Can be a string representing a valid CSS backdrop-filter value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backFilter(value: string) {
        this.element.style.backdropFilter = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.backdropFilter = value
            })
        return this
    }

    /**
     * Sets the 'backfaceVisibility' CSS property on the current `AvitaElement` instance to 'hidden', making the element single-sided.
     * @returns The current `AvitaElement` instance for chaining.
     */
    singleSided() {
        this.element.style.backfaceVisibility = "hidden"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.backfaceVisibility = "hidden"
            })
        return this
    }

    /**
     * Sets the 'backfaceVisibility' CSS property on the current `AvitaElement` instance to 'visible', making the element double-sided.
     * @returns The current `AvitaElement` instance for chaining.
     */
    doubleSided() {
        this.element.style.backfaceVisibility = "visible"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.backfaceVisibility = "visible"
            })
        return this
    }

    /**
     * Sets the 'background' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'background' CSS property. Can be a string representing a valid CSS background value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    background(value: string) {
        this.element.style.background = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.background = value
            })
        return this
    }

    /**
     * Gets the 'background' CSS property value of the current `AvitaElement` instance.
     * @returns The current value of the 'background' CSS property.
     */
    bg = this.background

    /**
     * Sets the 'backgroundColor' CSS property on the current `AvitaElement` instance and all its child elements to the specified value.
     * @param value - The value to set for the 'backgroundColor' CSS property. Can be a string representing a valid CSS color value.
     * @returns The current `AvitaElement` instance for chaining.
     * @deprecated Use the `bg()` method instead.
     */
    bgColor(value: string) {
        this.element.style.backgroundColor = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.backgroundColor = value
            })
        return this
    }

    /**
     * Sets the 'backgroundClip' CSS property on the current `AvitaElement` instance and all its child elements to the specified value.
     * @param value - The value to set for the 'backgroundClip' CSS property. Can be a string representing a valid CSS background-clip value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bgClip(value: string) {
        this.element.style.backgroundClip = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.backgroundClip = value
            })
        return this
    }

    /**
     * Sets the 'backgroundSize' CSS property on the current `AvitaElement` instance and all its child elements to 'contain', scaling the background image to fit within the element while maintaining its aspect ratio.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bgContain() {
        this.element.style.backgroundSize = "contain"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.backgroundSize = "contain"
            })
        return this
    }

    /**
     * Sets the 'backgroundSize' CSS property on the current `AvitaElement` instance and all its child elements to 'cover', scaling the background image to fill the entire element while maintaining its aspect ratio.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bgCover() {
        this.element.style.backgroundSize = "cover"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.backgroundSize = "cover"
            })
        return this
    }

    /**
     * Sets the 'backgroundRepeat' CSS property on the current `AvitaElement` instance to 'no-repeat', preventing the background image from repeating.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bgNoRepeat() {
        this.element.style.backgroundRepeat = "no-repeat"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.backgroundRepeat = "no-repeat"
            })
        return this
    }

    /**
     * Sets the 'backgroundRepeat' CSS property on the current `AvitaElement` instance to 'repeat', repeating the background image in both the x and y directions.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bgRepeat() {
        this.element.style.backgroundRepeat = "repeat"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.backgroundRepeat = "repeat"
            })
        return this
    }

    /**
     * Sets the 'backgroundRepeat' CSS property on the current `AvitaElement` instance to 'repeat-x', repeating the background image horizontally.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bgRepeatX() {
        this.element.style.backgroundRepeat = "repeat-x"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.backgroundRepeat = "repeat-x"
            })
        return this
    }

    /**
     * Sets the 'backgroundRepeat' CSS property on the current `AvitaElement` instance to 'repeat-y', repeating the background image vertically.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bgRepeatY() {
        this.element.style.backgroundRepeat = "repeat-y"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.backgroundRepeat = "repeat-y"
            })
        return this
    }

    /**
     * Sets the 'backgroundImage' CSS property on the current `AvitaElement` instance using one or more image URLs.
     * @param urls - A list of image URLs to use as the background image.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bgImg(...urls: string[]) {
        const val = urls.map((url) => `url(${url})`).join(", ")
        this.element.style.backgroundImage = val
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.backgroundImage = val
            })
        return this
    }

    /**
     * Applies a linear gradient as the background of the current `AvitaElement` instance and its child elements.
     * @param angle - The angle of the gradient in degrees. Defaults to 0 (horizontal).
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bgLinearGradient(angle: number = 0, ...colors: string[]) {
        const gradient = `linear-gradient(${angle}deg, ${colors.join(", ")})`
        this.bg(gradient)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.background = gradient
            })
        return this
    }

    /**
     * Applies a radial gradient as the background of the current `AvitaElement` instance and its child elements.
     * @param shape - The shape of the gradient, can be 'circle', 'ellipse', 'closest-side' or a shape with location.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bgRadialGradient(shape: string, ...colors: string[]) {
        const gradient = `radial-gradient(${shape}, ${colors.join(", ")})`
        this.bg(gradient)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.background = gradient
            })
        return this
    }

    /**
     * Provides a shorthand for calling the `bgLinearGradient` method on the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bgLinGrad = this.bgLinearGradient

    /**
     * Applies a horizontal text-masked linear gradient effect to the current `AvitaElement` instance and its child elements.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textGradientX(...colors: string[]) {
        this.bgLinGrad(90, ...colors)
        this.textMask()
        this.color("transparent")
        return this
    }

    /**
     * Applies a vertical text-masked linear gradient effect to the current `AvitaElement` instance and its child elements.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textGradientY(...colors: string[]) {
        this.bgLinGrad(0, ...colors)
        this.textMask()
        this.color("transparent")
        return this
    }

    /**
     * Applies a 45-degree text-masked linear gradient effect to the current `AvitaElement` instance and its child elements.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textGradient45(...colors: string[]) {
        this.bgLinGrad(45, ...colors)
        this.textMask()
        this.color("transparent")
        return this
    }

    /**
     * Applies a 135-degree text-masked linear gradient effect to the current `AvitaElement` instance and its child elements.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textGradient135(...colors: string[]) {
        this.bgLinGrad(135, ...colors)
        this.textMask()
        this.color("transparent")
        return this
    }

    /**
     * Applies a 225-degree text-masked linear gradient effect to the current `AvitaElement` instance and its child elements.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textGradient225(...colors: string[]) {
        this.bgLinGrad(225, ...colors)
        this.textMask()
        this.color("transparent")
        return this
    }

    /**
     * Applies a 315-degree text-masked linear gradient effect to the current `AvitaElement` instance and its child elements.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textGradient315(...colors: string[]) {
        this.bgLinGrad(315, ...colors)
        this.textMask()
        this.color("transparent")
        return this
    }

    /**
     * Shorthands the text-masked linear gradient effect to be horizontal on the current `AvitaElement` instance.
     * See `textGradientX` for more details.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textGradient = this.textGradientX

    /**
     * Sets the 'backgroundClip' CSS property on the current `AvitaElement` instance and all its child elements to 'text', clipping the background to the text content.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textMask() {
        this.bgClip("text")
        return this
    }

    /**
     * Sets the 'border' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'border' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    border(value: string) {
        this.element.style.border = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.border = value
            })
        return this
    }

    /**
     * Sets the 'borderLeft' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderLeft' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderL(value: string) {
        this.element.style.borderLeft = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderLeft = value
            })
        return this
    }

    /**
     * Sets the 'borderRight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderRight' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderR(value: string) {
        this.element.style.borderRight = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderRight = value
            })
        return this
    }

    /**
     * Sets the 'borderTop' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderTop' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderT(value: string) {
        this.element.style.borderTop = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderTop = value
            })
        return this
    }

    /**
     * Sets the 'borderBottom' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBottom' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderB(value: string) {
        this.element.style.borderBottom = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderBottom = value
            })
        return this
    }

    /**
     * Sets the 'borderColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderColor' CSS property. Can be a string representing a valid CSS color value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderColor(value: string) {
        this.element.style.borderColor = String(value)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderColor = String(value)
            })
        return this
    }

    /**
     * Sets the 'borderImage' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderImage' CSS property. Can be a string representing a valid CSS border image value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderImg(value: string) {
        this.element.style.borderImage = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderImage = value
            })
        return this
    }

    /**
     * Sets the 'borderInline' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderInline' CSS property. Can be a string representing a valid CSS border inline value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderInline(value: string) {
        this.element.style.borderInline = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderInline = value
            })
        return this
    }

    /**
     * Sets the 'borderStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderStyle' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderStyle(value: string) {
        this.element.style.borderStyle = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderStyle = value
            })
        return this
    }

    /**
     * Sets the 'borderWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderW(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderWidth = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderWidth = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'bottom' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'bottom' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bottom(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.bottom = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.bottom = String(value) + unit
            })
        return this
    }

    /**
     * Shorhand for setting the 'bottom' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'bottom' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    b = this.bottom

    /**
     * Sets the 'boxShadow' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'boxShadow' CSS property. Can be a string representing a valid CSS box-shadow value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    shadow(value: string) {
        this.element.style.boxShadow = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.boxShadow = value
            })
        return this
    }

    /**
     * Sets the 'boxSizing' CSS property on the current `AvitaElement` instance to 'border-box'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBox() {
        this.element.style.boxSizing = "border-box"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.boxSizing = "border-box"
            })
        return this
    }

    /**
     * Why would you use this?? Just use `borderBox()` instead. Yes this still works but whyyy?
     * Sets the 'boxSizing' CSS property on the current `AvitaElement` instance to 'content-box'.
     * @returns The current `AvitaElement` instance for chaining.
     * @deprecated Use `borderBox()` instead bozo.
     */
    contentBox() {
        this.element.style.boxSizing = "coontent-box"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.boxSizing = "coontent-box"
            })
        return this
    }

    /**
     * Mostly for printing a page.
     * Sets the 'breakBefore', 'breakInside', and 'breakAfter' CSS properties on the current `AvitaElement` instance.
     * @param before - The value to set for the 'breakBefore' CSS property. Can be a valid CSS 'break-before' value.
     * @param inside - The value to set for the 'breakInside' CSS property. Can be a valid CSS 'break-inside' value.
     * @param after - The value to set for the 'breakAfter' CSS property. Can be a valid CSS 'break-after' value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    break(before?: string, inside?: string, after?: string) {
        if (before) {
            this.element.style.breakBefore = before
            if (this.elements.length > 0)
                this.elements.forEach((element) => {
                    element.style.breakBefore = before
                })
        }
        if (inside) {
            this.element.style.breakInside = inside
            if (this.elements.length > 0)
                this.elements.forEach((element) => {
                    element.style.breakInside = inside
                })
        }
        if (after) {
            this.element.style.breakAfter = after
            if (this.elements.length > 0)
                this.elements.forEach((element) => {
                    element.style.breakAfter = after
                })
        }
        return this
    }

    /**
     * Sets the 'caretColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'caretColor' CSS property. Can be one of the valid CSS color values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    caretColor(value: string) {
        this.element.style.caretColor = String(value)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.caretColor = String(value)
            })
        return this
    }

    /**
     * Shorthands the 'caretColor' CSS property on the current `AvitaElement` instance until css can actually change carets.
     * Sets the 'caretColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'caretColor' CSS property. Can be one of the valid CSS color values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    caret = this.caretColor

    /**
     * Clears the CSS styles applied to the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    clear() {
        this.element.style.cssText = ""
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cssText = ""
            })
        return this
    }

    /**
     * Sets the 'clipPath' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'clipPath' CSS property. Can be a valid CSS clip-path value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    clipPath(value: string) {
        this.element.style.clipPath = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.clipPath = value
            })
        return this
    }

    /**
     * Sets the 'color' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'color' CSS property. Can be one of the valid CSS color values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    color(value: string) {
        this.element.style.color = String(value)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.color = String(value)
            })
        return this
    }

    /**
     * For those who like semantic precision (and who doesn't).
     * Sets the (text) 'color' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'color' CSS property. Can be one of the valid CSS color values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textColor = this.color

    /**
     * Sets the 'content' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'content' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    content(value: string) {
        this.element.style.content = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.content = value
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance.
     * See shorthands; List here: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
     * @param value - The value to set for the 'cursor' CSS property. Can be a valid CSS cursor value.
     * @returns The current `AvitaElement` instance for chaining.
     * @deprecated Use shorthands like `pointer()` or `grab()` instead.
     */
    cursor(value: string) {
        this.element.style.cursor = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = value
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'pointer'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    pointer() {
        this.element.style.cursor = "pointer"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "pointer"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'default'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    default() {
        this.element.style.cursor = "default"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "default"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'context-menu'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    contextMenu() {
        this.element.style.cursor = "context-menu"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "context-menu"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'help'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    help() {
        this.element.style.cursor = "help"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "help"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'progress'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    progress() {
        this.element.style.cursor = "progress"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "progress"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'wait'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    wait() {
        this.element.style.cursor = "wait"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "wait"
            })
        return this
    }

    cell() {
        this.element.style.cursor = "cell"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "cell"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'crosshair'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    crosshair() {
        this.element.style.cursor = "crosshair"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "crosshair"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'text'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    txt() {
        this.element.style.cursor = "text"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "text"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'vertical-text'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    txtY() {
        this.element.style.cursor = "vertical-text"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "vertical-text"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'alias'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    alias() {
        this.element.style.cursor = "alias"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "alias"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'copy'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    copy() {
        this.element.style.cursor = "copy"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "copy"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'move'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    move() {
        this.element.style.cursor = "move"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "move"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'no-drop'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    noDrop() {
        this.element.style.cursor = "no-drop"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "no-drop"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'not-allowed'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    notAllowed() {
        this.element.style.cursor = "not-allowed"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "not-allowed"
            })
        return this
    }

    grab() {
        this.element.style.cursor = "grab"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "grab"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'grabbing'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    grabbing() {
        this.element.style.cursor = "grabbing"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "grabbing"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'all-scroll'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    allScroll() {
        this.element.style.cursor = "all-scroll"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "all-scroll"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'col-resize'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeCol() {
        this.element.style.cursor = "col-resize"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "col-resize"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'row-resize'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeRow() {
        this.element.style.cursor = "row-resize"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "row-resize"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'n-resize'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeT() {
        this.element.style.cursor = "n-resize"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "n-resize"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'e-resize'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeR() {
        this.element.style.cursor = "e-resize"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "e-resize"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 's-resize'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeB() {
        this.element.style.cursor = "s-resize"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "s-resize"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'w-resize'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeL() {
        this.element.style.cursor = "w-resize"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "w-resize"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'nw-resize'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeTL() {
        this.element.style.cursor = "nw-resize"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "nw-resize"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'ne-resize'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeTR() {
        this.element.style.cursor = "ne-resize"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "ne-resize"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'sw-resize'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeBL() {
        this.element.style.cursor = "sw-resize"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "sw-resize"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'se-resize'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeBR() {
        this.element.style.cursor = "se-resize"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "se-resize"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'ew-resize'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeLR() {
        this.element.style.cursor = "ew-resize"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "ew-resize"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'ns-resize'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeTB() {
        this.element.style.cursor = "ns-resize"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "ns-resize"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'zoom-in'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    zoomIn() {
        this.element.style.cursor = "zoom-in"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "zoom-in"
            })
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance to 'zoom-out'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    zoomOut() {
        this.element.style.cursor = "zoom-out"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.cursor = "zoom-out"
            })
        return this
    }

    /**
     * Sets the 'display' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'display' CSS property. Can be a valid CSS display value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    display(value: string) {
        this.element.style.display = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.display = value
            })
        return this
    }

    /**
     * Sets the 'filter' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'filter' CSS property. Can be a valid CSS filter value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    filter(value: string) {
        this.element.style.filter = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.filter = value
            })
        return this
    }

    blur(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.filter = `blur(${value}${unit})`
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.filter = `blur(${value}${unit})`
            })
        return this
    }

    /**
     * Sets the 'flex' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'flex' CSS property. Can be a valid CSS flex value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexLayout(value: string) {
        this.element.style.flex = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.flex = value
            })
        return this
    }

    /**
     * Sets the 'flexDirection' CSS property on the current `AvitaElement` instance to 'column'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexCol() {
        this.element.style.flexDirection = "column"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.flexDirection = "column"
            })
        return this
    }

    /**
     * Sets the 'flexDirection' CSS property on the current `AvitaElement` instance to 'row'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexRow() {
        this.element.style.flexDirection = "row"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.flexDirection = "row"
            })
        return this
    }

    /**
     * Sets the 'flexDirection' CSS property on the current `AvitaElement` instance to 'row-reverse'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexRowRev() {
        this.element.style.flexDirection = "row-reverse"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.flexDirection = "row-reverse"
            })
        return this
    }

    /**
     * Sets the 'flexDirection' CSS property on the current `AvitaElement` instance to 'column-reverse'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexColRev() {
        this.element.style.flexDirection = "column-reverse"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.flexDirection = "column-reverse"
            })
        return this
    }

    /**
     * Sets the 'flexWrap' CSS property on the current `AvitaElement` instance to 'wrap'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexWrap() {
        this.element.style.flexWrap = "wrap"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.flexWrap = "wrap"
            })
        return this
    }

    /**
     * Sets the 'flexWrap' CSS property on the current `AvitaElement` instance to 'nowrap'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexNoWrap() {
        this.element.style.flexWrap = "nowrap"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.flexWrap = "nowrap"
            })
        return this
    }

    /**
     * Sets the 'flexWrap' CSS property on the current `AvitaElement` instance to 'wrap-reverse'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexWrapRev() {
        this.element.style.flexWrap = "wrap-reverse"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.flexWrap = "wrap-reverse"
            })
        return this
    }

    /**
     * Sets the 'float' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'float' CSS property. Can be a valid CSS float value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    float(value: string) {
        this.element.style.float = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.float = value
            })
        return this
    }

    /**
     * Sets the 'font' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'font' CSS property. Can be a valid CSS font value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    font(value: string) {
        this.element.style.font = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.font = value
            })
        return this
    }

    /**
     * Sets the 'fontFamily' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontFamily' CSS property. Can be a valid CSS font-family value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    family(value: string) {
        this.element.style.fontFamily = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.fontFamily = value
            })
        return this
    }

    /**
     * Shorthand for setting the 'fontFamily' CSS property on the current `AvitaElement` instance.
     * @returns The current 'fontFamily' CSS property value.
     */
    fam = this.family

    /**
     * Sets the 'fontSize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontSize' CSS property. Can be a valid CSS font-size value, either a string or a number representing pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontSize(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.fontSize = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.fontSize = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'fontWeight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontWeight' CSS property. Can be a valid CSS font-weight value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontWeight(value: string | number) {
        this.element.style.fontWeight = String(value)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.fontWeight = String(value)
            })
        return this
    }

    /**
     * Sets the 'fontStyle' CSS property on the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    base() {
        this.element.style.fontStyle = "normal"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.fontStyle = "normal"
            })
        return this
    }

    /**
     * Sets the 'fontStyle' CSS property on the current `AvitaElement` instance to 'italic'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    italic() {
        this.element.style.fontStyle = "italic"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.fontStyle = "italic"
            })
        return this
    }

    /**
     * Sets the 'fontStyle' CSS property on the current `AvitaElement` instance to 'oblique'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    oblique() {
        this.element.style.fontStyle = "oblique"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.fontStyle = "oblique"
            })
        return this
    }

    /**
     * Sets the 'fontVariant' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontVariant' CSS property. Can be a valid CSS font-variant value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontVariant(value: string) {
        this.element.style.fontVariant = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.fontVariant = value
            })
        return this
    }

    /**
     * Sets the 'fontWeight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontWeight' CSS property. Can be a valid CSS font-weight value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    weight(value: string | number) {
        this.element.style.fontWeight = String(value)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.fontWeight = String(value)
            })
        return this
    }

    /**
     * Sets the 'gap' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gap' CSS property. Can be a valid CSS gap value, either a string or a number representing pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gap(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.gap = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gap = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'grid' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'grid' CSS property. Can be a valid CSS grid value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridLayout(value: string) {
        this.element.style.grid = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.grid = value
            })
        return this
    }

    /**
     * Sets the 'gridArea' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridArea' CSS property. Can be a valid CSS grid-area value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridArea(value: string) {
        this.element.style.gridArea = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridArea = value
            })
        return this
    }

    /**
     * Sets the 'gridAutoColumns' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridAutoColumns' CSS property. Can be a valid CSS grid-auto-columns value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridAutoCols(value: string) {
        this.element.style.gridAutoColumns = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridAutoColumns = value
            })
        return this
    }

    /**
     * Sets the 'gridAutoFlow' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridAutoFlow' CSS property. Can be a valid CSS grid-auto-flow value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridAutoFlow(value: string) {
        this.element.style.gridAutoFlow = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridAutoFlow = value
            })
        return this
    }

    /**
     * Sets the 'gridAutoRows' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridAutoRows' CSS property. Can be a valid CSS grid-auto-rows value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridAutoRows(value: string) {
        this.element.style.gridAutoRows = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridAutoRows = value
            })
        return this
    }

    /**
     * Sets the 'gridColumn' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridColumn' CSS property. Can be a valid CSS grid-column value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridCol(value: string) {
        this.element.style.gridColumn = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridColumn = value
            })
        return this
    }

    /**
     * Sets the 'gridColumnEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridColumnEnd' CSS property. Can be a valid CSS grid-column-end value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridColEnd(value: string) {
        this.element.style.gridColumnEnd = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridColumnEnd = value
            })
        return this
    }

    /**
     * Sets the 'gridColumnStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridColumnStart' CSS property. Can be a valid CSS grid-column-start value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridColStart(value: string) {
        this.element.style.gridColumnStart = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridColumnStart = value
            })
        return this
    }

    /**
     * Sets the 'gridRow' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridRow' CSS property. Can be a valid CSS grid-row value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridRow(value: string) {
        this.element.style.gridRow = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridRow = value
            })
        return this
    }

    /**
     * Sets the 'gridRowEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridRowEnd' CSS property. Can be a valid CSS grid-row-end value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridRowEnd(value: string) {
        this.element.style.gridRowEnd = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridRowEnd = value
            })
        return this
    }

    /**
     * Sets the 'gridRowStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridRowStart' CSS property. Can be a valid CSS grid-row-start value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridRowStart(value: string) {
        this.element.style.gridRowStart = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridRowStart = value
            })
        return this
    }

    /**
     * Sets the 'gridTemplate' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridTemplate' CSS property. Can be a valid CSS grid-template value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridTemplate(value: string) {
        this.element.style.gridTemplate = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridTemplate = value
            })
        return this
    }

    /**
     * Sets the 'gridTemplateAreas' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridTemplateAreas' CSS property. Can be a valid CSS grid-template-areas value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridAreas(value: string) {
        this.element.style.gridTemplateAreas = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridTemplateAreas = value
            })
        return this
    }

    /**
     * Sets the 'gridTemplateColumns' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridTemplateColumns' CSS property. Can be a valid CSS grid-template-columns value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridCols(value: string) {
        this.element.style.gridTemplateColumns = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridTemplateColumns = value
            })
        return this
    }

    /**
     * Sets the 'gridTemplateRows' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridTemplateRows' CSS property. Can be a valid CSS grid-template-rows value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridRows(value: string) {
        this.element.style.gridTemplateRows = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.gridTemplateRows = value
            })
        return this
    }

    /**
     * Sets the 'height' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'height' CSS property. Can be a valid CSS height value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    height(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.height = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.height = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'height' CSS property on the current `AvitaElement` instance. See `height()` for more details.
     * @param value - The value to set for the 'height' CSS property. Can be a valid CSS height value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    h = this.height

    /**
     * Sets the 'hyphens' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'hyphens' CSS property. Can be a valid CSS hyphens value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    hyphens(value: string) {
        this.element.style.hyphens = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.hyphens = value
            })
        return this
    }

    /**
     * Sets the 'imageRendering' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'imageRendering' CSS property. Can be a valid CSS image-rendering value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    imgRender(value: string) {
        this.element.style.imageRendering = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.imageRendering = value
            })
        return this
    }

    /**
     * Sets the 'inlineSize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'inlineSize' CSS property. Can be a valid CSS inline-size value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    inlineSize(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.inlineSize = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.inlineSize = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'inset' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'inset' CSS property. Can be a valid CSS inset value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    inset(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.inset = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.inset = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'insetInline' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'insetInline' CSS property. Can be a valid CSS inset-inline value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    insetInline(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.insetInline = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.insetInline = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'isolation' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'isolation' CSS property. Can be a valid CSS isolation value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    isolation(value: string) {
        this.element.style.isolation = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.isolation = value
            })
        return this
    }

    /**
     * Sets the 'justifyContent' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'justifyContent' CSS property. Can be a valid CSS justify-content value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    justifyContent(value: string) {
        this.element.style.justifyContent = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.justifyContent = value
            })
        return this
    }

    /**
     * Shorthand for setting the 'justifyContent' CSS property on the current `AvitaElement` instance. See `justifyContent()` for more details.
     * @param value - The value to set for the 'justifyContent' CSS property. Can be a valid CSS justify-content value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    jContent = this.justifyContent

    /**
     * Sets the 'justifyItems' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'justifyItems' CSS property. Can be a valid CSS justify-items value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    justifyItems(value: string) {
        this.element.style.justifyItems = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.justifyItems = value
            })
        return this
    }

    /**
     * Shorthand for setting the 'justifyItems' CSS property on the current `AvitaElement` instance. See `justifyItems()` for more details.
     * @param value - The value to set for the 'justifyItems' CSS property. Can be a valid CSS justify-items value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    jItems = this.justifyItems

    /**
     * Sets the 'justifySelf' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'justifySelf' CSS property. Can be a valid CSS justify-self value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    justifySelf(value: string) {
        this.element.style.justifySelf = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.justifySelf = value
            })
        return this
    }

    /**
     * Shorthand for setting the 'justifySelf' CSS property on the current `AvitaElement` instance. See `justifySelf()` for more details.
     * @param value - The value to set for the 'justifySelf' CSS property. Can be a valid CSS justify-self value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    jSelf = this.justifySelf

    /**
     * Sets the 'left' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'left' CSS property. Can be a valid CSS left value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    left(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.left = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.left = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'left' CSS property on the current `AvitaElement` instance. See `left()` for more details.
     * @param value - The value to set for the 'left' CSS property. Can be a valid CSS left value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    l = this.left

    /**
     * Sets the 'letterSpacing' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'letterSpacing' CSS property. Can be a valid CSS letter-spacing value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    letterSpacing(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.letterSpacing = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.letterSpacing = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'lineHeight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'lineHeight' CSS property. Can be a valid CSS line-height value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    lineH(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.lineHeight = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.lineHeight = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'lineBreak' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'lineBreak' CSS property. Can be a valid CSS line-break value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    lineBr(value: string) {
        this.element.style.lineBreak = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.lineBreak = value
            })
        return this
    }

    /**
     * Sets the 'listStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'listStyle' CSS property. Can be a valid CSS list-style value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bullet(value: string) {
        this.element.style.listStyle = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.listStyle = value
            })
        return this
    }

    /**
     * Sets the 'margin' CSS property with one value applied to all sides.
     * @param value - The value to set for the 'margin' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    margin(value: string | number): this

    /**
     * Sets the 'margin' CSS property with two values: vertical and horizontal.
     * @param vertical - The value to set for the top and bottom margin.
     * @param horizontal - The value to set for the left and right margin.
     * @returns The current `AvitaElement` instance for chaining.
     */
    margin(vertical: string | number, horizontal: string | number): this

    /**
     * Sets the 'margin' CSS property with three values: top, horizontal, and bottom.
     * @param top - The value to set for the top margin.
     * @param horizontal - The value to set for the left and right margin.
     * @param bottom - The value to set for the bottom margin.
     * @returns The current `AvitaElement` instance for chaining.
     */
    margin(
        top: string | number,
        horizontal: string | number,
        bottom: string | number
    ): this

    /**
     * Sets the 'margin' CSS property with four values: top, right, bottom, and left.
     * @param top - The value to set for the top margin.
     * @param right - The value to set for the right margin.
     * @param bottom - The value to set for the bottom margin.
     * @param left - The value to set for the left margin.
     * @returns The current `AvitaElement` instance for chaining.
     */
    margin(
        top: string | number,
        right: string | number,
        bottom: string | number,
        left: string | number
    ): this

    margin(...values: (string | number)[]): this {
        const processValue = (value: string | number) =>
            typeof value === "number" ? `${value}px` : value

        switch (values.length) {
            case 1:
                this.element.style.margin = processValue(values[0])
                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        element.style.margin = processValue(values[0])
                    })
                break
            case 2:
                this.element.style.margin = `${processValue(
                    values[0]
                )} ${processValue(values[1])}`
                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        element.style.margin = `${processValue(
                            values[0]
                        )} ${processValue(values[1])}`
                    })
                break
            case 3:
                this.element.style.margin = `${processValue(
                    values[0]
                )} ${processValue(values[1])} ${processValue(values[2])}`
                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        element.style.margin = `${processValue(
                            values[0]
                        )} ${processValue(values[1])} ${processValue(
                            values[2]
                        )}`
                    })
                break
            case 4:
                this.element.style.margin = `${processValue(
                    values[0]
                )} ${processValue(values[1])} ${processValue(
                    values[2]
                )} ${processValue(values[3])}`
                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        element.style.margin = `${processValue(
                            values[0]
                        )} ${processValue(values[1])} ${processValue(
                            values[2]
                        )} ${processValue(values[3])}`
                    })
                break
            default:
                throw new Error(
                    "Invalid number of arguments provided to margin(). Must be 1, 2, 3, or 4."
                )
        }

        return this
    }

    /**
     * Shorthand for setting the 'margin' CSS property on the current `AvitaElement` instance. See `margin()` for more details.
     * @param values - The value(s) to set for the 'margin' CSS property. Can be a valid CSS margin value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    m = this.margin

    /**
     * Sets the 'marginLeft' and 'marginRight' CSS properties on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginLeft' and 'marginRight' CSS properties. Can be a valid CSS margin value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginX(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginLeft = String(value) + unit
        this.element.style.marginRight = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.marginLeft = String(value) + unit
                element.style.marginRight = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'margin-left' and 'margin-right' CSS properties on the current `AvitaElement` instance.
     * @param value - The value to set for the 'margin-left' and 'margin-right' CSS properties. Can be a valid CSS margin value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    mx = this.marginX

    /**
     * Sets the 'marginTop' and 'marginBottom' CSS properties on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginTop' and 'marginBottom' CSS properties. Can be a valid CSS margin value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginY(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginTop = String(value) + unit
        this.element.style.marginBottom = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.marginTop = String(value) + unit
                element.style.marginBottom = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'margin-left' and 'margin-right' CSS properties on the current `AvitaElement` instance.
     * @param value - The value to set for the 'margin-left' and 'margin-right' CSS properties. Can be a valid CSS margin value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    my = this.marginY

    /**
     * Sets the 'marginInline' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginInline' CSS property. Can be a valid CSS margin-inline value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginInline(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginInline = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.marginInline = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'marginBottom' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginBottom' CSS property. Can be a valid CSS margin-bottom value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginB(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginBottom = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.marginBottom = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'margin-bottom' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'margin-bottom' CSS property. Can be a valid CSS margin-bottom value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    mb = this.marginB

    /**
     * Sets the 'marginLeft' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginLeft' CSS property. Can be a valid CSS margin-left value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginL(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginLeft = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.marginLeft = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'margin-left' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'margin-left' CSS property. Can be a valid CSS margin-left value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    ml = this.marginL

    /**
     * Sets the 'marginRight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginRight' CSS property. Can be a valid CSS margin-right value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginR(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginRight = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.marginRight = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'margin-right' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'margin-right' CSS property. Can be a valid CSS margin-right value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    mr = this.marginR

    /**
     * Sets the 'marginTop' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginTop' CSS property. Can be a valid CSS margin-top value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginT(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginTop = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.marginTop = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'margin-top' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'margin-top' CSS property. Can be a valid CSS margin-top value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    mt = this.marginT

    /**
     * Sets the 'mask' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'mask' CSS property. Can be a valid CSS mask value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    mask(value: string) {
        this.element.style.mask = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.mask = value
            })
        return this
    }

    /**
     * Sets the 'maxHeight' and 'maxWidth' CSS properties on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maxHeight' and 'maxWidth' CSS properties. Must be a valid CSS length value e.g. '100px 200px'.
     */
    maxSize(value: string): this

    /**
     * Sets the 'maxHeight' and 'maxWidth' CSS properties on the current `AvitaElement` instance.
     * @param width - The value to set for the 'maxWidth' CSS property. If number, it will be interpreted as pixels.
     * @param height - The value to set for the 'maxHeight' CSS property. If number, it will be interpreted as pixels.
     */
    maxSize(width: string | number, height: string | number): this

    maxSize(valueOrW: string | number, height?: string | number): this {
        if (typeof valueOrW === "string" && !height) {
            const valueArr = valueOrW.split(" ")
            if (valueArr.length === 2) {
                this.element.style.maxWidth = valueArr[0]
                this.element.style.maxHeight = valueArr[1]
                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        element.style.maxWidth = valueArr[0]
                        element.style.maxHeight = valueArr[1]
                    })
            } else {
                throw new Error(
                    "Invalid value for maxSize(). Must be a valid CSS length value e.g. '100px 200px'."
                )
            }
        }
        if (valueOrW && height) {
            if (typeof valueOrW === "number") valueOrW = `${valueOrW}px`
            if (typeof height === "number") height = `${height}px`
            this.element.style.maxWidth = String(valueOrW)
            this.element.style.maxHeight = String(height)
            if (this.elements.length > 0)
                this.elements.forEach((element) => {
                    element.style.maxWidth = String(valueOrW)
                    element.style.maxHeight = String(height)
                })
        }
        return this
    }

    /**
     * Sets the 'maxHeight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maxHeight' CSS property. Can be a valid CSS length value, either a string or a number. If number, it will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    maxH(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.maxHeight = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.maxHeight = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'maxInlineSize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maxInlineSize' CSS property. Can be a valid CSS length value, either a string or a number. If number, it will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    maxInline(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.maxInlineSize = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.maxInlineSize = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'maxWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maxWidth' CSS property. Can be a valid CSS length value, either a string or a number. If number, it will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    maxW(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.maxWidth = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.maxWidth = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'minHeight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'minHeight' CSS property. Can be a valid CSS length value, either a string or a number. If number, it will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    minH(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.minHeight = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.minHeight = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'minInlineSize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'minInlineSize' CSS property. Can be a valid CSS length value, either a string or a number. If number, it will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    minInline(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.minInlineSize = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.minInlineSize = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'minWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'minWidth' CSS property. Can be a valid CSS length value, either a string or a number. If number, it will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    minW(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.minWidth = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.minWidth = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'mixBlendMode' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'mixBlendMode' CSS property. Must be a valid CSS `mix-blend-mode` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    blendMode(value: string) {
        this.element.style.mixBlendMode = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.mixBlendMode = value
            })
        return this
    }

    /**
     * Sets the 'objectFit' CSS property on the current `AvitaElement` instance to the specified value.
     * @param value - The value to set for the 'objectFit' CSS property. Must be a valid CSS `object-fit` value.
     * @returns The current `AvitaElement` instance for chaining.
     * @deprecated Use shorthand methods like `cover()` or `contain()` instead.
     */
    objFit(value: string) {
        this.element.style.objectFit = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.objectFit = value
            })
        return this
    }

    /**
     * Sets the 'objectFit' CSS property on the current `AvitaElement` instance and all its child elements to 'none'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    none() {
        this.element.style.objectFit = "none"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.objectFit = "none"
            })
        return this
    }

    /**
     * Sets the 'objectFit' CSS property on the current `AvitaElement` instance to 'scale-down'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scaleDown() {
        this.element.style.objectFit = "scale-down"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.objectFit = "scale-down"
            })
        return this
    }

    /**
     * Sets the 'objectFit' CSS property on the current `AvitaElement` instance to 'cover'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    cover() {
        this.element.style.objectFit = "cover"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.objectFit = "cover"
            })
        return this
    }

    /**
     * Sets the 'objectFit' CSS property on the current `AvitaElement` instance to 'contain'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    contain() {
        this.element.style.objectFit = "contain"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.objectFit = "contain"
            })
        return this
    }
    /**
     * Sets the 'objectPosition' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'objectPosition' CSS property. Must be a valid CSS `object-position` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    objXY(value: string) {
        this.element.style.objectPosition = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.objectPosition = value
            })
        return this
    }

    /**
     * Sets the 'offset' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'offset' CSS property. Must be a valid CSS `offset` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    offset(value: string) {
        this.element.style.offset = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.offset = value
            })
        return this
    }

    /**
     * Sets the 'opacity' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'opacity' CSS property. Must be a valid CSS `opacity` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    opacity(value: number | string) {
        this.element.style.opacity = String(value)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.opacity = String(value)
            })
        return this
    }

    /**
     * Sets the 'order' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'order' CSS property. Must be a valid CSS `order` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    order(value: number | string) {
        this.element.style.order = String(value)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.order = String(value)
            })
        return this
    }

    /**
     * Sets the 'outline' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'outline' CSS property. Must be a valid CSS `outline` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    outline(value: string) {
        this.element.style.outline = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.outline = value
            })
        return this
    }

    /**
     * Sets the 'outlineWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'outlineWidth' CSS property. Must be a valid CSS `outline-width` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    outlineW(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.outlineWidth = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.outlineWidth = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'overflow' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overflow' CSS property. Must be a valid CSS `overflow` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overflow(value: string): this

    /**
     * Sets the 'overflow-x' and 'overflow-y' CSS properties on the current `AvitaElement` instance.
     * @param overflowX - The value to set for the 'overflow-x' CSS property. Must be a valid CSS `overflow` value.
     * @param overflowY - The value to set for the 'overflow-y' CSS property. Must be a valid CSS `overflow` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overflow(overflowX: string, overflowY: string): this

    overflow(valueOrX: string, overflowY?: string): this {
        if (!overflowY) {
            // Single value: set overflow for both x and y
            this.element.style.overflow = valueOrX
            if (this.elements.length > 0)
                this.elements.forEach((element) => {
                    element.style.overflow = valueOrX
                })
        } else {
            // Two values: set overflow-x and overflow-y separately
            this.element.style.overflowX = valueOrX
            this.element.style.overflowY = overflowY
            if (this.elements.length > 0)
                this.elements.forEach((element) => {
                    element.style.overflowX = valueOrX
                    element.style.overflowY = overflowY
                })
        }
        return this
    }

    /**
     * Sets the 'overflowWrap' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overflowWrap' CSS property. Must be a valid CSS `overflow-wrap` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overflowWrap(value: string) {
        this.element.style.overflowWrap = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.overflowWrap = value
            })
        return this
    }

    /**
     * Sets the 'overflowX' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overflowX' CSS property. Must be a valid CSS `overflow` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overflowX(value: string) {
        this.element.style.overflowX = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.overflowX = value
            })
        return this
    }

    /**
     * Sets the 'overflowY' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overflowY' CSS property. Must be a valid CSS `overflow-y` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overflowY(value: string) {
        this.element.style.overflowY = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.overflowY = value
            })
        return this
    }

    /**
     * Sets the 'padding' CSS property with one value applied to all sides.
     * @param value - The value to set for the 'padding' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    padding(value: string | number): this

    /**
     * Sets the 'padding' CSS property with two values: vertical and horizontal.
     * @param vertical - The value to set for the top and bottom padding.
     * @param horizontal - The value to set for the left and right padding.
     * @returns The current `AvitaElement` instance for chaining.
     */
    padding(vertical: string | number, horizontal: string | number): this

    /**
     * Sets the 'padding' CSS property with three values: top, horizontal, and bottom.
     * @param top - The value to set for the top padding.
     * @param horizontal - The value to set for the left and right padding.
     * @param bottom - The value to set for the bottom padding.
     * @returns The current `AvitaElement` instance for chaining.
     */
    padding(
        top: string | number,
        horizontal: string | number,
        bottom: string | number
    ): this

    /**
     * Sets the 'padding' CSS property with four values: top, right, bottom, and left.
     * @param top - The value to set for the top padding.
     * @param right - The value to set for the right padding.
     * @param bottom - The value to set for the bottom padding.
     * @param left - The value to set for the left padding.
     * @returns The current `AvitaElement` instance for chaining.
     */
    padding(
        top: string | number,
        right: string | number,
        bottom: string | number,
        left: string | number
    ): this

    padding(...values: (string | number)[]): this {
        const processValue = (value: string | number) =>
            typeof value === "number" ? `${value}px` : value

        switch (values.length) {
            case 1:
                this.element.style.padding = processValue(values[0])

                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        element.style.padding = processValue(values[0])
                    })
                break
            case 2:
                this.element.style.padding = `${processValue(
                    values[0]
                )} ${processValue(values[1])}`

                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        element.style.padding = `${processValue(
                            values[0]
                        )} ${processValue(values[1])}`
                    })
                break
            case 3:
                this.element.style.padding = `${processValue(
                    values[0]
                )} ${processValue(values[1])} ${processValue(values[2])}`

                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        element.style.padding = `${processValue(
                            values[0]
                        )} ${processValue(values[1])} ${processValue(
                            values[2]
                        )}`
                    })
                break
            case 4:
                this.element.style.padding = `${processValue(
                    values[0]
                )} ${processValue(values[1])} ${processValue(
                    values[2]
                )} ${processValue(values[3])}`

                if (this.elements.length > 0)
                    this.elements.forEach((element) => {
                        element.style.padding = `${processValue(
                            values[0]
                        )} ${processValue(values[1])} ${processValue(
                            values[2]
                        )} ${processValue(values[3])}`
                    })
                break
            default:
                throw new Error(
                    "Invalid number of arguments provided to padding(). Must be 1, 2, 3, or 4."
                )
        }

        return this
    }

    /**
     * Shorthand for setting the 'padding' CSS property on the current `AvitaElement` instance. See `padding()` for variations.
     * @param value - The value to set for the 'padding' CSS property. Can be a valid CSS padding value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    p = this.padding

    /**
     * Sets the 'padding-top' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'padding-top' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingT(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingTop = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.paddingTop = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'padding-top' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'padding-top' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    pt = this.paddingT

    /**
     * Sets the 'padding-right' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'padding-right' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingR(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingRight = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.paddingRight = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'padding-right' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'padding-right' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    pr = this.paddingR

    /**
     * Sets the 'padding-bottom' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'padding-bottom' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingB(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingBottom = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.paddingBottom = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'padding-bottom' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'padding-bottom' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    pb = this.paddingB

    /**
     * Sets the 'padding-left' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'padding-left' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingL(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingLeft = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.paddingLeft = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'padding-left' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'padding-left' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    pl = this.paddingL

    /**
     * Sets the 'paddingLeft' and 'paddingRight' CSS properties on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingLeft' and 'paddingRight' CSS properties. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingX(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingLeft = String(value) + unit
        this.element.style.paddingRight = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.paddingLeft = String(value) + unit
                element.style.paddingRight = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'padding-left' and 'padding-right' CSS properties on the current `AvitaElement` instance.
     * @param value - The value to set for the 'padding-left' and 'padding-right' CSS properties. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    px = this.paddingX

    /**
     * Sets the 'paddingTop' and 'paddingBottom' CSS properties on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingTop' and 'paddingBottom' CSS properties. Can be a string or number, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingY(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingTop = String(value) + unit
        this.element.style.paddingBottom = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.paddingTop = String(value) + unit
                element.style.paddingBottom = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for setting the 'padding-top' and 'padding-bottom' CSS properties on the current `AvitaElement` instance.
     * @param value - The value to set for the 'padding-top' and 'padding-bottom' CSS properties. Can be a string or number, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    py = this.paddingY

    /**
     * Sets the 'paddingInline' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingInline' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textPadding(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingInline = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.paddingInline = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'perspective' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'perspective' CSS property. Can be a string or number value, where a number will be interpreted in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    perspective(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.perspective = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.perspective = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'perspective' CSS property on the current `AvitaElement` instance to a value of "100px".
     * @returns The current `AvitaElement` instance for chaining.
     */
    uncumfy() {
        this.element.style.perspective = "100px"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.perspective = "100px"
            })
        return this
    }

    /**
     * Sets the 'perspective' CSS property on the current `AvitaElement` instance to a value of "200px".
     * @returns The current `AvitaElement` instance for chaining.
     */
    close() {
        this.element.style.perspective = "250px"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.perspective = "250px"
            })
        return this
    }

    /**
     * Sets the 'perspective' CSS property on the current `AvitaElement` instance to a value of "500px".
     * @returns The current `AvitaElement` instance for chaining.
     */
    near() {
        this.element.style.perspective = "500px"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.perspective = "500px"
            })
        return this
    }

    /**
     * Sets the 'perspective' CSS property on the current `AvitaElement` instance to a value of "800px".
     * @returns The current `AvitaElement` instance for chaining.
     */
    away() {
        this.element.style.perspective = "800px"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.perspective = "800px"
            })
        return this
    }

    /**
     * Sets the 'perspective' CSS property on the current `AvitaElement` instance to a value of "1000px".
     * @returns The current `AvitaElement` instance for chaining.
     */
    far() {
        this.element.style.perspective = "1000px"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.perspective = "1000px"
            })
        return this
    }

    /**
     * Sets the 'perspective' CSS property on the current `AvitaElement` instance to a value of "2000px".
     * @returns The current `AvitaElement` instance for chaining.
     */
    further() {
        this.element.style.perspective = "2000px"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.perspective = "2000px"
            })
        return this
    }

    /**
     * Sets the 'perspectiveOrigin' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'perspectiveOrigin' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    perspectiveOrigin(value: string) {
        this.element.style.perspectiveOrigin = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.perspectiveOrigin = value
            })
        return this
    }

    /**
     * Sets the 'placeContent' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'placeContent' CSS property. Can be a value from the `string` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    placeContent(value: string) {
        this.element.style.placeContent = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.placeContent = value
            })
        return this
    }

    /**
     * Shorthand for setting the 'placeContent' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'placeContent' CSS property. Can be a value from the `string` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    pContent = this.placeContent

    /**
     * Sets the 'placeItems' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'placeItems' CSS property. Can be a value from the `string` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    placeItems(value: string) {
        this.element.style.placeItems = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.placeItems = value
            })
        return this
    }

    /**
     * Shorthand for setting the 'placeItems' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'placeItems' CSS property. Can be a value from the `string` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    pItems = this.placeItems

    /**
     * Sets the 'placeSelf' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'placeSelf' CSS property. Can be a value from the `string` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    placeSelf(value: string) {
        this.element.style.placeSelf = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.placeSelf = value
            })
        return this
    }

    /**
     * Shorthand for setting the 'placeSelf' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'placeSelf' CSS property. Can be a value from the `string` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    pSelf = this.placeSelf

    /**
     * Sets the 'pointerEvents' CSS property on the current `AvitaElement` instance to 'auto', allowing the element to be clicked.
     * @returns The current `AvitaElement` instance for chaining.
     */
    clickable() {
        this.element.style.pointerEvents = "auto"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.pointerEvents = "auto"
            })
        return this
    }

    /**
     * Sets the 'pointerEvents' CSS property on the current `AvitaElement` instance to 'none', disabling the element from being clicked.
     * @returns The current `AvitaElement` instance for chaining.
     */
    unclickable() {
        this.element.style.pointerEvents = "none"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.pointerEvents = "none"
            })
        return this
    }

    /**
     * Sets the 'quotes' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'quotes' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    quotes(value: string) {
        this.element.style.quotes = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.quotes = value
            })
        return this
    }

    /**
     * Sets the 'resize' CSS property on the current `AvitaElement` instance to 'both', allowing the element to be resized in both horizontal and vertical directions.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resize() {
        this.element.style.resize = "both"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.resize = "both"
            })
        return this
    }

    /**
     * Sets the 'resize' CSS property on the current `AvitaElement` instance to 'horizontal', allowing the element to be resized horizontally.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeX() {
        this.element.style.resize = "horizontal"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.resize = "horizontal"
            })
        return this
    }

    /**
     * Sets the 'resize' CSS property on the current `AvitaElement` instance to 'vertical', allowing the element to be resized vertically.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resizeY() {
        this.element.style.resize = "vertical"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.resize = "vertical"
            })
        return this
    }

    /**
     * Sets the 'right' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'right' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    right(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.right = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.right = String(value) + unit
            })
        return this
    }

    /**
     * Gets the 'right' CSS property value of the current `AvitaElement` instance.
     * @returns The value of the 'right' CSS property.
     */
    r = this.right

    /**
     * Sets the 'rotate' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'rotate' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    rotate(value: string | number) {
        const unit = typeof value === "string" ? "" : "deg"
        this.element.style.rotate = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.rotate = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'rotateX' CSS transform property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'rotateX' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    rotateX(value: string | number) {
        const unit = typeof value === "string" ? "" : "deg"
        const val = `rotateX(${value}${unit}) `
        this.element.style.transform += val
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transform += val
            })
        return this
    }

    /**
     * A shorthand property for calling the `rotateX()` method on the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    rx = this.rotateX

    /**
     * Sets the 'rotateY' CSS transform property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'rotateY' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    rotateY(value: string | number) {
        const unit = typeof value === "string" ? "" : "deg"
        const val = `rotateY(${value}${unit}) `
        this.element.style.transform += val
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transform += val
            })
        return this
    }

    /**
     * A shorthand property for calling the `rotateY()` method on the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    ry = this.rotateY

    /**
     * Sets the 'rotateZ' CSS transform property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'rotateZ' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    rotateZ(value: string | number) {
        const unit = typeof value === "string" ? "" : "deg"
        const val = `rotateZ(${value}${unit}) `
        this.element.style.transform += val
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transform += val
            })
        return this
    }

    /**
     * A shorthand property for calling the `rotateZ()` method on the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    rz = this.rotateZ

    /**
     * Sets the 'scale' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scale' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scale(value: string | number) {
        this.element.style.scale = String(value)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.scale = String(value)
            })
        return this
    }

    /**
     * Sets the 'scrollBehavior' CSS property on the current `AvitaElement` instance to 'auto', disabling smooth scrolling behavior.
     * @returns The current `AvitaElement` instance for chaining.
     */
    instantScroll() {
        this.element.style.scrollBehavior = "auto"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.scrollBehavior = "auto"
            })
        return this
    }

    /**
     * Sets the 'scrollBehavior' CSS property on the current `AvitaElement` instance to 'smooth', enabling smooth scrolling behavior.
     * @returns The current `AvitaElement` instance for chaining.
     */
    smoothScroll() {
        this.element.style.scrollBehavior = "smooth"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.scrollBehavior = "smooth"
            })
        return this
    }

    /**
     * Sets the 'scrollMargin' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollMargin' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollMargin(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollMargin = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.scrollMargin = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'scrollPadding' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollPadding' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollPadding(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollPadding = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.scrollPadding = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'scrollSnapAlign' CSS property on the current `AvitaElement` instance to 'start', aligning the element to the start of the scroll container.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollSnap() {
        this.element.style.scrollSnapAlign = "start"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.scrollSnapAlign = "start"
            })
        return this
    }

    /**
     * Sets the 'tabSize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'tabSize' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    tabSize(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.tabSize = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.tabSize = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'textAlign' CSS property on the current `AvitaElement` instance to 'left', aligning the text to the left.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textL() {
        this.element.style.textAlign = "left"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textAlign = "left"
            })
        return this
    }

    /**
     * Sets the 'textAlign' CSS property on the current `AvitaElement` instance to 'right', aligning the text to the right.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textR() {
        this.element.style.textAlign = "right"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textAlign = "right"
            })
        return this
    }

    /**
     * Sets the 'textAlign' CSS property on the current `AvitaElement` instance to 'center', aligning the text to the center.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textC() {
        this.element.style.textAlign = "center"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textAlign = "center"
            })
        return this
    }

    /**
     * Sets the 'textAlign' CSS property on the current `AvitaElement` instance to 'justify', aligning the text to be justified.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textJ() {
        this.element.style.textAlign = "justify"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textAlign = "justify"
            })
        return this
    }

    /**
     * Sets the 'textDecoration' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textDecoration' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    decoration(value: string) {
        this.element.style.textDecoration = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textDecoration = value
            })
        return this
    }

    /**
     * Sets the 'textDecorationLine' CSS property on the current `AvitaElement` instance to 'overline', creating a halo effect.
     * @returns The current `AvitaElement` instance for chaining.
     */
    halo() {
        this.element.style.textDecorationLine = "overline"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textDecorationLine = "overline"
            })
        return this
    }

    /**
     * Sets the 'textDecorationLine' CSS property on the current `AvitaElement` instance to "line-through", creating a strikethrough effect.
     * @returns The current `AvitaElement` instance for chaining.
     */
    crossout() {
        this.element.style.textDecorationLine = "line-through"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textDecorationLine = "line-through"
            })
        return this
    }

    /**
     * Sets the 'textDecorationLine' CSS property on the current `AvitaElement` instance to 'underline'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    underline() {
        this.element.style.textDecorationLine = "underline"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textDecorationLine = "underline"
            })
        return this
    }

    /**
     * Sets the 'textEmphasis' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textEmphasis' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    emphasis(value: string) {
        this.element.style.textEmphasis = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textEmphasis = value
            })
        return this
    }

    /**
     * Sets the 'textIndent' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textIndent' CSS property. Can be a string value or a number representing a pixel value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    indent(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.textIndent = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textIndent = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'textOrientation' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textOrientation' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textOrient(value: string) {
        this.element.style.textOrientation = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textOrientation = value
            })
        return this
    }

    /**
     * Rotates the text of the current `AvitaElement` instance by 90 degrees, displaying it vertically.
     * Sets the 'textOrientation' CSS property on the current `AvitaElement` instance to 'upright'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    verticalText() {
        this.element.style.textOrientation = "upright"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textOrientation = "upright"
            })
        return this
    }

    /**
     * Rotates the text of the current `AvitaElement` instance by 90 degrees, displaying it vertically.
     * Sets the 'textOrientation' CSS property on the current `AvitaElement` instance to 'sideways'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    sideways() {
        this.element.style.textOrientation = "sideways"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textOrientation = "sideways"
            })
        return this
    }

    /**
     * This will cause any overflowing text to be truncated and display an ellipsis ('...') at the end.
     * Sets the 'textOverflow' CSS property on the current `AvitaElement` instance to 'ellipsis'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    ellipses() {
        this.element.style.textOverflow = "ellipsis"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textOverflow = "ellipsis"
            })
        return this
    }

    clipText() {
        this.element.style.textOverflow = "clip"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textOverflow = "clip"
            })
        return this
    }

    /**
     * Sets the 'textShadow' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textShadow' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textShadow(value: string) {
        this.element.style.textShadow = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textShadow = value
            })
        return this
    }

    /**
     * Sets the 'textTransform' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textTransform' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textTrans(value: string) {
        this.element.style.textTransform = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textTransform = value
            })
        return this
    }

    /**
     * UPPERCASE TEXT!!!
     * Sets the 'textTransform' CSS property on the current `AvitaElement` instance to 'uppercase'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    caps() {
        this.element.style.textTransform = "uppercase"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textTransform = "uppercase"
            })
        return this
    }

    /**
     * Capitalizes the first letter of each word
     * Sets the 'textTransform' CSS property on the current `AvitaElement` instance to "capitalize".
     * @returns The current `AvitaElement` instance for chaining.
     */
    capEach() {
        this.element.style.textTransform = "capitalize"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textTransform = "capitalize"
            })
        return this
    }

    /**
     * lowercase text...
     * Sets the 'textTransform' CSS property on the current `AvitaElement` instance to 'lowercase'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    lowercase() {
        this.element.style.textTransform = "lowercase"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textTransform = "lowercase"
            })
        return this
    }

    /**
     * Sets the 'textUnderlineOffset' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textUnderlineOffset' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    underlineY(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.textUnderlineOffset = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.textUnderlineOffset = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'top' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'top' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    top(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.top = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.top = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for `top()` method.
     * Gets the 'top' CSS property value of the current `AvitaElement` instance.
     * @returns The current value of the 'top' CSS property.
     */
    t = this.top

    /**
     * Sets the 'touchAction' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'touchAction' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    touch(value: string) {
        this.element.style.touchAction = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.touchAction = value
            })
        return this
    }

    /**
     * Sets the 'transform' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transform' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transform(value: string) {
        this.element.style.transform += `${value} `
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transform += `${value} `
            })
        return this
    }

    /**
     * Sets the 'transformOrigin' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transformOrigin' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    origin(value: string) {
        this.element.style.transformOrigin = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transformOrigin = value
            })
        return this
    }

    /**
     * Sets the 'transformStyle' CSS property on the current `AvitaElement` instance to 'flat'.
     * This flattens the 3D transform of the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flat(): this {
        this.element.style.transformStyle = "flat"
        this.element.style.perspective = "none"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transformStyle = "flat"
                element.style.perspective = "none"
            })
        return this
    }

    /**
     * Sets the 'transformStyle' CSS property on the current `AvitaElement` instance to 'preserve-3d'.
     * This preserves the 3D transform of the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    preserve3d(): this {
        this.element.style.transformStyle = "preserve-3d"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transformStyle = "preserve-3d"
            })
        return this
    }

    /**
     * Adds the 'transition' CSS property on the current `AvitaElement` instance.
     * Defaults to 'all 0.1s ease-in-out'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transition(): this

    /**
     * Sets the 'transition' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transition' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transition(value: string): this

    transition(value: string = "all 0.1s ease-in-out"): this {
        this.element.style.transition = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transition = value
            })
        return this
    }

    /**
     * Sets the 'transitionDelay' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transitionDelay' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    delay(value: string | number) {
        const unit = typeof value === "string" ? "" : "s"
        this.element.style.transitionDelay = numberToSeconds(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transitionDelay = numberToSeconds(value) + unit
            })
        return this
    }

    /**
     * Sets the 'transitionDuration' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transitionDuration' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    duration(value: string | number) {
        const unit = typeof value === "string" ? "" : "s"
        this.element.style.transitionDuration = numberToSeconds(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transitionDuration = numberToSeconds(value) + unit
            })
        return this
    }

    /**
     * Sets the 'transitionProperty' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transitionProperty' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transProp(value: string) {
        this.element.style.transitionProperty = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transitionProperty = value
            })
        return this
    }

    /**
     * Sets the 'transitionTimingFunction' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transitionTimingFunction' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    timingFunc(value: string) {
        this.element.style.transitionTimingFunction = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transitionTimingFunction = value
            })
        return this
    }

    /**
     * Sets the 'translate' CSS property on the current `AvitaElement` instance.
     * Applies a translation along the X-axis, Y-axis, and optionally the Z-axis using a single string.
     * @param value - The full `translate` value as a string (e.g., "10px, 20px, 30px").
     * @returns The current `AvitaElement` instance for chaining.
     */
    translate(value: string): this

    /**
     * Sets the 'translate' CSS property on the current `AvitaElement` instance.
     * Applies a 2D translation along the X-axis.
     * @param x - The value to set for the 'translate' CSS property along the X-axis. Can be a string or number.
     * @returns The current `AvitaElement` instance for chaining.
     */
    translate(x: string | number): this

    /**
     * Sets the 'translate' CSS property on the current `AvitaElement` instance.
     * Applies a 2D translation along the X and Y axes.
     * @param x - The value to set for the 'translate' CSS property along the X-axis. Can be a string or number.
     * @param y - The value to set for the 'translate' CSS property along the Y-axis. Can be a string or number.
     * @returns The current `AvitaElement` instance for chaining.
     */
    translate(x: string | number, y: string | number): this

    /**
     * Sets the 'translate' CSS property on the current `AvitaElement` instance.
     * Applies a 3D translation along the X, Y, and Z axes.
     * @param x - The value to set for the 'translate' CSS property along the X-axis. Can be a string or number.
     * @param y - The value to set for the 'translate' CSS property along the Y-axis. Can be a string or number.
     * @param z - The value to set for the 'translate' CSS property along the Z-axis. Can be a string or number. This parameter is optional.
     * @returns The current `AvitaElement` instance for chaining.
     */
    translate(x: string | number, y: string | number, z: string | number): this

    translate(
        xOrValue: string | number,
        y?: string | number,
        z?: string | number
    ): this {
        let translateValue: string

        if (typeof xOrValue === "string" && !y && !z) {
            translateValue = xOrValue
        } else {
            // Otherwise, process as individual axis values.
            const unitX = typeof xOrValue === "string" ? "" : "px"
            const unitY = typeof y === "string" ? "" : "px"
            const unitZ = typeof z === "string" ? "" : "px"

            translateValue =
                z !== undefined
                    ? `${xOrValue}${unitX} ${y}${unitY} ${z}${unitZ}`
                    : y !== undefined
                    ? `${xOrValue}${unitX} ${y}${unitY}`
                    : `${xOrValue}${unitX}`
        }

        this.element.style.translate = translateValue
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.translate = translateValue
            })
        return this
    }

    /**
     * Sets the 'translateX' CSS translate property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'translateX' transform. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    translateX(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.translate = `${value}${unit} 0 0`
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.translate = `${value}${unit} 0 0`
            })
        return this
    }

    /**
     * Shorthand for `translateX()` method.
     * Sets the 'translateX' CSS translate property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'translateX' transform. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transX = this.translateX

    /**
     * Sets the 'translateY' CSS translate property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'translateY' transform. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    translateY(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.translate = `0 ${value}${unit} 0`
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.translate = `0 ${value}${unit} 0`
            })
        return this
    }

    /**
     * Shorthand for `translateY()` method.
     * Sets the 'translateY' CSS translate property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'translateY' transform. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transY = this.translateY

    /**
     * Sets the 'translateZ' CSS translate property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'translateZ' transform. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    translateZ(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.translate = `0 0 ${value}${unit}`
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.translate = `0 0 ${value}${unit}`
            })
        return this
    }

    /**
     * Shorthand for `translateZ()` method.
     * Sets the 'translateZ' CSS translate property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'translateZ' transform. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transZ = this.translateZ

    /**
     * Sets the 'userSelect' CSS property on the current `AvitaElement` instance to 'auto', allowing the element to be selectable.
     * @returns The current `AvitaElement` instance for chaining.
     */
    selectable() {
        this.element.style.userSelect = "auto"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.userSelect = "auto"
            })
        return this
    }

    /**
     * Sets the 'userSelect' CSS property on the current `AvitaElement` instance to 'none', making the element unselectable.
     * @returns The current `AvitaElement` instance for chaining.
     */
    unselectable() {
        this.element.style.userSelect = "none"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.userSelect = "none"
            })
        return this
    }

    /**
     * Sets the 'verticalAlign' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'verticalAlign' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    verticalAlign(value: string) {
        this.element.style.verticalAlign = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.verticalAlign = value
            })
        return this
    }

    /**
     * Sets the 'visibility' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'visibility' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    visibility(value: string) {
        this.element.style.visibility = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.visibility = value
            })
        return this
    }

    /**
     * Sets the 'whiteSpace' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'whiteSpace' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    whiteSpace(value: string) {
        this.element.style.whiteSpace = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.whiteSpace = value
            })
        return this
    }

    /**
     * Sets the 'wordBreak' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'wordBreak' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    wordBreak(value: string) {
        this.element.style.wordBreak = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.wordBreak = value
            })
        return this
    }

    /**
     * Sets the 'wordSpacing' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'wordSpacing' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    wordSpacing(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.wordSpacing = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.wordSpacing = String(value) + unit
            })
        return this
    }

    /**
     * Sets the 'width' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'width' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    width(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.width = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.width = String(value) + unit
            })
        return this
    }

    /**
     * Shorthand for `width()`
     * Sets the 'width' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'width' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    w = this.width

    /**
     * Sets the 'zIndex' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'zIndex' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    zIndex(value: string | number) {
        this.element.style.zIndex = String(value)
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.zIndex = String(value)
            })
        return this
    }

    /**
     * Shorthand for `zIndex()`
     * Sets the 'zIndex' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'zIndex' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    z = this.zIndex

    /**
     * Shows the element by setting the 'visibility' CSS property to 'visible'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    visible() {
        this.element.style.visibility = "visible"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.visibility = "visible"
            })
        return this
    }

    /**
     * Hides the element by setting the 'visibility' CSS property to 'hidden'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    invisible() {
        this.element.style.visibility = "hidden"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.visibility = "hidden"
            })
        return this
    }

    /**
     * Sets the 'opacity' CSS property on the current `AvitaElement` instance to 0.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transparent() {
        this.element.style.opacity = "0"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.opacity = "0"
            })
        return this
    }

    /**
     * Sets the 'opacity' CSS property on the current `AvitaElement` instance to 0.5.
     * @returns The current `AvitaElement` instance for chaining.
     */
    translucent() {
        this.element.style.opacity = "0.5"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.opacity = "0.5"
            })
        return this
    }

    /**
     * Sets the 'opacity' CSS property on the current `AvitaElement` instance to 1.
     * @returns The current `AvitaElement` instance for chaining.
     */
    opaque() {
        this.element.style.opacity = "1"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.opacity = "1"
            })
        return this
    }

    /**
     * Shows the element by setting the 'display' CSS property to the specified value.
     * @param display - The value to set for the 'display' CSS property. Defaults to 'flex'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    show(display: string = "flex") {
        this.element.style.display = display
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.display = display
            })
        return this
    }

    /**
     * Hides the element by setting the 'display' CSS property to 'none'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    hide() {
        this.element.style.display = "none"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.display = "none"
            })
        return this
    }

    /**
     * Centers the child elements by setting the 'display' CSS property to 'flex' and setting the 'justifyContent' and 'alignItems' CSS properties to 'center'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    center(): this

    /**
     * Centers the element itself by setting the 'margin' CSS property to 'auto'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    center(type: "self"): this

    /**
     * Centers the child elements by setting the 'display' CSS property to 'flex' and setting the 'justifyContent' and 'alignItems' CSS properties to 'center'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    center(type: "flex"): this

    /**
     * Centers the element itself by setting its position to absolute and transforming its position.
     * @param type - Type of centering.
     * @returns The current `AvitaElement` instance for chaining.
     */
    center(type: "absolute"): this

    center(type: "self" | "flex" | "absolute" = "flex"): this {
        if (type === "self") {
            // Center the element itself using margin auto
            this.margin("auto")
        } else if (type === "flex") {
            // Center child elements using flexbox
            this.flex()
            this.jContent("center")
            this.aItems("center")
        } else if (type === "absolute") {
            // Center the element itself using absolute positioning
            this.absolute()
            this.top("50%")
            this.left("50%")
            this.translate("-50%", "-50%")
        }
        return this
    }

    /**
     * Stacks the current `AvitaElement` and its children vertically, with the ability to align the children along the vertical axis.
     * Fills 100% of the parent's width and height by default.
     * @param align - The alignment of the children along the vertical axis. Defaults to 'center'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    vstack(align: string = "center") {
        this.full()
        this.center()
        this.flexCol()
        switch (align) {
            case "top":
                this.justifyContent("flex-start")
                break
            case "center":
                this.justifyContent("center")
                break
            case "bottom":
                this.justifyContent("flex-end")
                break
            case "left":
                this.alignItems("flex-start")
                break
            case "right":
                this.alignItems("flex-end")
                break
            case "between":
                this.justifyContent("space-between")
                break
            case "around":
                this.justifyContent("space-around")
                break
            case "evenly":
                this.justifyContent("space-evenly")
                break
        }
        return this
    }

    /**
     * Stacks the current `AvitaElement` and its children horizontally, with the ability to align the children along the horizontal axis.
     * Fills 100% of the parent's width and height by default.
     * @param align - The alignment of the children along the horizontal axis. Defaults to 'center'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    hstack(align: string = "center") {
        this.full()
        this.center()
        switch (align) {
            case "top":
                this.alignItems("flex-start")
                break
            case "center":
                this.alignItems("center")
                break
            case "bottom":
                this.alignItems("flex-end")
                break
            case "left":
                this.justifyContent("flex-start")
                break
            case "right":
                this.justifyContent("flex-end")
                break
            case "between":
                this.justifyContent("space-between")
                break
            case "around":
                this.justifyContent("space-around")
                break
            case "evenly":
                this.justifyContent("space-evenly")
                break
        }
        return this
    }

    /**
     * Stacks the current `AvitaElement` and its children vertically, with the ability to align the children along the vertical axis.
     * Fills 100% of the parent's width and height by default.
     * @param align - The alignment of the children along the vertical axis. Defaults to 'center'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    zstack(align: string = "center") {
        this.relative()
        this.hstack(align)
        $(() => this.avitaChildren.forEach((child) => child.absolute()))
        return this
    }

    /**
     * Sets the 'position' CSS property to 'absolute' on the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    absolute() {
        this.element.style.position = "absolute"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.position = "absolute"
            })
        return this
    }

    /**
     * Sets the 'position' CSS property to 'relative' on the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    relative() {
        this.element.style.position = "relative"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.position = "relative"
            })
        return this
    }

    /**
     * Sets the 'position' CSS property to 'fixed' on the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fixed() {
        this.element.style.position = "fixed"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.position = "fixed"
            })
        return this
    }

    /**
     * Sets the 'position' CSS property to 'sticky' on the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    sticky() {
        this.element.style.position = "sticky"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.position = "sticky"
            })
        return this
    }

    /**
     * Sets the 'position' CSS property to 'static' on the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    static() {
        this.element.style.position = "static"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.position = "static"
            })
        return this
    }

    block() {
        this.element.style.display = "block"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.display = "block"
            })
        return this
    }

    /**
     * Sets the display property of the current `AvitaElement` instance to 'flex'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flex() {
        this.element.style.display = "flex"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.display = "flex"
            })
        return this
    }

    /**
     * Sets the display property of the current `AvitaElement` instance to 'grid'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    grid() {
        this.element.style.display = "grid"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.display = "grid"
            })
        return this
    }

    /**
     * Sets the font weight to 'bold'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bold(): this {
        this.element.style.fontWeight = "bold"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.fontWeight = "bold"
            })
        return this
    }

    /**
     * Sets the font weight to 'normal'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    normal(): this {
        this.element.style.fontWeight = "normal"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.fontWeight = "normal"
            })
        return this
    }

    /**
     * Sets the font weight to 'lighter'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    lighter(): this {
        this.element.style.fontWeight = "lighter"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.fontWeight = "lighter"
            })
        return this
    }

    /**
     * Sets the font weight to 'bolder'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bolder(): this {
        this.element.style.fontWeight = "bolder"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.fontWeight = "bolder"
            })
        return this
    }

    /**
     * Sets the stroke color of the element.
     * @param value - The CSS color value to set as the stroke.
     * @returns The current `AvitaElement` instance for chaining.
     */
    stroke(value: string) {
        this.element.style.stroke = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.stroke = value
            })
        return this
    }

    /**
     * Sets the stroke width of the element.
     * @param value - The CSS length value to set as the stroke width. Can be a number (in pixels) or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    strokeW(value: string | number): this {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.strokeWidth = String(value) + unit
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.strokeWidth = String(value) + unit
            })
        return this
    }

    /**
     * Sets the stroke opacity of the element.
     * @param value - The stroke opacity value to set (between 0 and 1).
     * @returns The current `AvitaElement` instance for chaining.
     */
    strokeOpacity(value: number): this {
        this.element.style.strokeOpacity = value.toString()
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.strokeOpacity = value.toString()
            })
        return this
    }

    /**
     * Sets the stroke linecap of the element.
     * @param value - The CSS value to set as the stroke linecap (e.g., "butt", "round", "square").
     * @returns The current `AvitaElement` instance for chaining.
     */
    linecap(value: string): this {
        this.element.style.strokeLinecap = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.strokeLinecap = value
            })
        return this
    }

    /**
     * Sets the stroke linejoin of the element.
     * @param value - The CSS value to set as the stroke linejoin (e.g., "miter", "round", "bevel").
     * @returns The current `AvitaElement` instance for chaining.
     */
    linejoin(value: string): this {
        this.element.style.strokeLinejoin = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.strokeLinejoin = value
            })
        return this
    }

    /**
     * Sets the stroke dash array of the element.
     * @param value - The CSS value to set as the stroke dash array.
     * @returns The current `AvitaElement` instance for chaining.
     */
    dasharray(value: string): this {
        this.element.style.strokeDasharray = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.strokeDasharray = value
            })
        return this
    }

    /**
     * Sets the skew transformation angle of the element along the X-axis.
     * @param value - The skew angle in degrees.
     * @returns The current `AvitaElement` instance for chaining.
     */
    skewX(value: number): this {
        this.element.style.transform += `skewX(${value}deg) `
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transform += `skewX(${value}deg) `
            })
        return this
    }

    /**
     * Sets the skew transformation angle of the element along the Y-axis.
     * @param value - The skew angle in degrees.
     * @returns The current `AvitaElement` instance for chaining.
     */
    skewY(value: number): this {
        this.element.style.transform += `skewY(${value}deg) `
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transform += `skewY(${value}deg) `
            })
        return this
    }

    /**
     * Sets the transformation matrix of the element.
     * @warning This resets the transform property to an empty string before applying the matrix.
     * @param value - The CSS transform matrix value to set.
     * @returns The current `AvitaElement` instance for chaining.
     */
    matrix(value: string): this {
        this.element.style.transform = value
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.transform = value
            })
        return this
    }

    /**
     * Sets the object fit property of the element to fill.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fill(): this

    /**
     * Sets the fill of the element.
     * @param value - The fill value to set. If not provided, the element's object-fit will be set to "fill".
     * @returns The current `AvitaElement` instance for chaining.
     */
    fill(value: string): this

    fill(value?: string) {
        if (!value) {
            this.element.style.objectFit = "fill"
            if (this.elements.length > 0)
                this.elements.forEach((element) => {
                    element.style.objectFit = "fill"
                })
        } else {
            this.element.style.fill = value
            if (this.elements.length > 0)
                this.elements.forEach((element) => {
                    element.style.fill = value
                })
        }
        return this
    }

    /**
     * Sets the fill opacity of the element.
     * @param value - The fill opacity value to set (between 0 and 1).
     * @returns The current `AvitaElement` instance for chaining.
     */
    fillOpacity(value: number): this {
        this.element.style.fillOpacity = value.toString()
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.fillOpacity = value.toString()
            })
        return this
    }

    /**
     * Sets the element to be a specific size relative to the screen.
     * @param value - The size value to set, in viewport width (vw) and viewport height (vh) units.
     * @returns The current `AvitaElement` instance for chaining.
     */
    screen(value: number): this {
        this.element.style.width = `${value}vw`
        this.element.style.height = `${value}vh`
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.width = `${value}vw`
                element.style.height = `${value}vh`
            })
        return this
    }

    /**
     * Sets the element to be a specific width relative to the screen.
     * @param value - The width value to set, in viewport width (vw) units.
     * @returns The current `AvitaElement` instance for chaining.
     */
    screenX(value: number): this {
        this.element.style.width = `${value}vw`
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.width = `${value}vw`
            })
        return this
    }

    /**
     * Sets the element to be full-height.
     * @param value - The height value to set, in viewport height (vh) units.
     * @returns The current `AvitaElement` instance for chaining.
     */
    screenY(value: number): this {
        this.element.style.height = `${value}vh`
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.height = `${value}vh`
            })
        return this
    }

    /**
     * Sets the element to be full-width and full-height.
     * @returns The current `AvitaElement` instance for chaining.
     */
    full() {
        this.element.style.width = "100%"
        this.element.style.height = "100%"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.width = "100%"
                element.style.height = "100%"
            })
        return this
    }

    /**
     * Sets the element to be full-width.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fullX() {
        this.element.style.width = "100%"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.width = "100%"
            })
        return this
    }

    /**
     * Sets the element to be full-height.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fullY() {
        this.element.style.height = "100%"
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.height = "100%"
            })
        return this
    }

    /**
     * Sets the border radius of the element to 9999px.
     * @returns The current `AvitaElement` instance for chaining.
     */
    rounded(): this

    /**
     * Sets the border radius of the element.
     * @param radius - The border radius value to set. Can be a number (in pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    rounded(radius: string): this

    /**
     * Sets the border radius of the element.
     * @param radius - The border radius value to set. Can be a number (in pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    rounded(radius: number): this

    rounded(radius?: number | string): this {
        let borderRadiusValue: string

        if (!radius) {
            borderRadiusValue = "9999px"
        } else if (typeof radius === "number") {
            borderRadiusValue = `${radius}px`
        } else {
            borderRadiusValue = radius
        }

        this.element.style.borderRadius = borderRadiusValue
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderRadius = borderRadiusValue
            })
        return this
    }

    // roundedTL
    /**
     * Sets the border radius of the top-left corner to 9999px.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedTL(): this

    /**
     * Sets the border radius of the top-left corner.
     * @param radius - The border radius value to set. Can be a number (in pixels) or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedTL(radius: string): this

    /**
     * Sets the border radius of the top-left corner.
     * @param radius - The border radius value to set. Can be a number (in pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedTL(radius: number): this

    roundedTL(radius?: number | string): this {
        let borderRadiusValue = !radius
            ? "9999px"
            : typeof radius === "number"
            ? `${radius}px`
            : radius

        this.element.style.borderTopLeftRadius = borderRadiusValue
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderTopLeftRadius = borderRadiusValue
            })
        return this
    }

    // roundedTR
    /**
     * Sets the border radius of the top-right corner to 9999px.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedTR(): this

    /**
     * Sets the border radius of the top-right corner.
     * @param radius - The border radius value to set. Can be a number (in pixels) or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedTR(radius: string): this

    /**
     * Sets the border radius of the top-right corner.
     * @param radius - The border radius value to set. Can be a number (in pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedTR(radius: number): this

    roundedTR(radius?: number | string): this {
        let borderRadiusValue = !radius
            ? "9999px"
            : typeof radius === "number"
            ? `${radius}px`
            : radius

        this.element.style.borderTopRightRadius = borderRadiusValue
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderTopRightRadius = borderRadiusValue
            })
        return this
    }

    // roundedBL
    /**
     * Sets the border radius of the bottom-left corner to 9999px.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedBL(): this

    /**
     * Sets the border radius of the bottom-left corner.
     * @param radius - The border radius value to set. Can be a number (in pixels) or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedBL(radius: string): this

    /**
     * Sets the border radius of the bottom-left corner.
     * @param radius - The border radius value to set. Can be a number (in pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedBL(radius: number): this

    roundedBL(radius?: number | string): this {
        let borderRadiusValue = !radius
            ? "9999px"
            : typeof radius === "number"
            ? `${radius}px`
            : radius

        this.element.style.borderBottomLeftRadius = borderRadiusValue
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderBottomLeftRadius = borderRadiusValue
            })
        return this
    }

    // roundedBR
    /**
     * Sets the border radius of the bottom-right corner to 9999px.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedBR(): this

    /**
     * Sets the border radius of the bottom-right corner.
     * @param radius - The border radius value to set. Can be a number (in pixels) or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedBR(radius: string): this

    /**
     * Sets the border radius of the bottom-right corner.
     * @param radius - The border radius value to set. Can be a number (in pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedBR(radius: number): this

    roundedBR(radius?: number | string): this {
        let borderRadiusValue = !radius
            ? "9999px"
            : typeof radius === "number"
            ? `${radius}px`
            : radius

        this.element.style.borderBottomRightRadius = borderRadiusValue
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderBottomRightRadius = borderRadiusValue
            })
        return this
    }

    // roundedTop
    /**
     * Sets the border radius of the top corners to 9999px.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedT(): this

    /**
     * Sets the border radius of the top corners.
     * @param radius - The border radius value to set. Can be a number (in pixels) or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedT(radius: string): this

    /**
     * Sets the border radius of the top corners.
     * @param radius - The border radius value to set. Can be a number (in pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedT(radius: number): this

    roundedT(radius?: number | string): this {
        let borderRadiusValue = !radius
            ? "9999px"
            : typeof radius === "number"
            ? `${radius}px`
            : radius

        this.element.style.borderTopLeftRadius = borderRadiusValue
        this.element.style.borderTopRightRadius = borderRadiusValue
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderTopLeftRadius = borderRadiusValue
                element.style.borderTopRightRadius = borderRadiusValue
            })
        return this
    }

    // roundedBottom
    /**
     * Sets the border radius of the bottom corners to 9999px.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedB(): this

    /**
     * Sets the border radius of the bottom corners.
     * @param radius - The border radius value to set. Can be a number (in pixels) or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedB(radius: string): this

    /**
     * Sets the border radius of the bottom corners.
     * @param radius - The border radius value to set. Can be a number (in pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedB(radius: number): this

    roundedB(radius?: number | string): this {
        let borderRadiusValue = !radius
            ? "9999px"
            : typeof radius === "number"
            ? `${radius}px`
            : radius

        this.element.style.borderBottomLeftRadius = borderRadiusValue
        this.element.style.borderBottomRightRadius = borderRadiusValue
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderBottomLeftRadius = borderRadiusValue
                element.style.borderBottomRightRadius = borderRadiusValue
            })
        return this
    }

    // roundedLeft
    /**
     * Sets the border radius of the left corners to 9999px.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedL(): this

    /**
     * Sets the border radius of the left corners.
     * @param radius - The border radius value to set. Can be a number (in pixels) or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedL(radius: string): this

    /**
     * Sets the border radius of the left corners.
     * @param radius - The border radius value to set. Can be a number (in pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedL(radius: number): this

    roundedL(radius?: number | string): this {
        let borderRadiusValue = !radius
            ? "9999px"
            : typeof radius === "number"
            ? `${radius}px`
            : radius

        this.element.style.borderTopLeftRadius = borderRadiusValue
        this.element.style.borderBottomLeftRadius = borderRadiusValue
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderTopLeftRadius = borderRadiusValue
                element.style.borderBottomLeftRadius = borderRadiusValue
            })
        return this
    }

    // roundedRight
    /**
     * Sets the border radius of the right corners to 9999px.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedR(): this

    /**
     * Sets the border radius of the right corners.
     * @param radius - The border radius value to set. Can be a number (in pixels) or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedR(radius: string): this

    /**
     * Sets the border radius of the right corners.
     * @param radius - The border radius value to set. Can be a number (in pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    roundedR(radius: number): this

    roundedR(radius?: number | string): this {
        let borderRadiusValue = !radius
            ? "9999px"
            : typeof radius === "number"
            ? `${radius}px`
            : radius

        this.element.style.borderTopRightRadius = borderRadiusValue
        this.element.style.borderBottomRightRadius = borderRadiusValue
        if (this.elements.length > 0)
            this.elements.forEach((element) => {
                element.style.borderTopRightRadius = borderRadiusValue
                element.style.borderBottomRightRadius = borderRadiusValue
            })
        return this
    }

    viewBox(x: number, y: number, width: number, height: number): this {
        if (this.element instanceof SVGElement) {
            this.element.setAttribute("viewBox", `${x} ${y} ${width} ${height}`)
            if (this.elements.length > 0)
                this.elements.forEach((element) => {
                    if (element instanceof SVGElement) {
                        element.setAttribute(
                            "viewBox",
                            `${x} ${y} ${width} ${height}`
                        )
                    }
                })
        }
        return this
    }

    preserveRatio(align: string, meetOrSlice: string): this {
        if (this.element instanceof SVGElement) {
            this.element.setAttribute(
                "preserveAspectRatio",
                `${align} ${meetOrSlice}`
            )
            if (this.elements.length > 0)
                this.elements.forEach((element) => {
                    if (element instanceof SVGElement) {
                        element.setAttribute(
                            "preserveAspectRatio",
                            `${align} ${meetOrSlice}`
                        )
                    }
                })
        }
        return this
    }

    /**
     * Manually generates the CSS for a particular media query on the current `Avita` element.
     * @param query - The media query to generate the CSS for
     * @param props - The applied CSS properties to the media query
     */
    media(query: string, props: Partial<CSSStyleDeclaration>): this

    /**
     * Manually generates the CSS rules for a particular media query on the current `Avita` element.
     * @param query - The media query to generate the CSS for
     * @param property - The CSS property to apply to the media query
     * @param value - The value to set for the CSS property
     */
    media(query: string, property: string, value: string): this

    media(
        query: string,
        propsOrProperty: Partial<CSSStyleDeclaration> | string,
        value?: string
    ) {
        const uniqueClass = generateClass()
        this.class(uniqueClass)

        let body = ""

        if (typeof propsOrProperty === "string" && value) {
            body = `${camelToKebab(propsOrProperty)}: ${value};`
        }

        if (typeof propsOrProperty === "object") {
            Object.entries(propsOrProperty).forEach(([prop, val]) => {
                body += `${camelToKebab(prop)}: ${val};`
            })
        }

        let mediaQuery = `.${uniqueClass} { ${body} }`

        $("head").append(style().text(`@media ${query} { ${mediaQuery} }`))

        return this
    }

    /**
     * Executes the provided callback function when the current viewport width is at least 640px.
     * @param props - The CSS properties to apply to the element when the viewport width is at least 640px.
     * @param value - The value to set for the CSS property
     * @returns The current `Avita` instance for chaining.
     */
    sm(props: Partial<CSSStyleDeclaration>): this

    /**
     * Executes the provided callback function when the current viewport width is at least 640px.
     * @param property - The CSS property to apply to the element when the viewport width is at least 640px.
     * @param value - The value to set for the CSS property
     * @returns The current `Avita` instance for chaining.
     */
    sm(property: string, value: string): this

    sm(propertyOrProps: string | Partial<CSSStyleDeclaration>, value?: string) {
        if (typeof propertyOrProps === "string" && value) {
            this.media("(min-width: 640px)", propertyOrProps, value)
        }
        if (typeof propertyOrProps === "object") {
            this.media("(min-width: 640px)", propertyOrProps)
        }
        return this
    }

    /**
     * Applies the provided CSS properties when the current viewport width is at least 768px.
     * @param props - The CSS properties to apply to the element when the viewport width is at least 768px.
     * @returns The current `Avita` instance for chaining.
     */
    md(props: Partial<CSSStyleDeclaration>): this

    /**
     * Applies the provided CSS property and value when the current viewport width is at least 768px.
     * @param property - The CSS property to apply to the element when the viewport width is at least 768px.
     * @param value - The value to set for the CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    md(property: string, value: string): this

    md(
        propertyOrProps: string | Partial<CSSStyleDeclaration>,
        value?: string
    ): this {
        if (typeof propertyOrProps === "string" && value) {
            this.media("(min-width: 768px)", propertyOrProps, value)
        } else if (typeof propertyOrProps === "object") {
            this.media("(min-width: 768px)", propertyOrProps)
        }
        return this
    }

    /**
     * Applies the provided CSS properties when the current viewport width is at least 1024px.
     * @param props - The CSS properties to apply to the element when the viewport width is at least 1024px.
     * @returns The current `Avita` instance for chaining.
     */
    lg(props: Partial<CSSStyleDeclaration>): this

    /**
     * Applies the provided CSS property and value when the current viewport width is at least 1024px.
     * @param property - The CSS property to apply to the element when the viewport width is at least 1024px.
     * @param value - The value to set for the CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    lg(property: string, value: string): this

    lg(
        propertyOrProps: string | Partial<CSSStyleDeclaration>,
        value?: string
    ): this {
        if (typeof propertyOrProps === "string" && value) {
            this.media("(min-width: 1024px)", propertyOrProps, value)
        } else if (typeof propertyOrProps === "object") {
            this.media("(min-width: 1024px)", propertyOrProps)
        }
        return this
    }

    /**
     * Applies the provided CSS properties when the current viewport width is at least 1280px.
     * @param props - The CSS properties to apply to the element when the viewport width is at least 1280px.
     * @returns The current `Avita` instance for chaining.
     */
    xl(props: Partial<CSSStyleDeclaration>): this

    /**
     * Applies the provided CSS property and value when the current viewport width is at least 1280px.
     * @param property - The CSS property to apply to the element when the viewport width is at least 1280px.
     * @param value - The value to set for the CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    xl(property: string, value: string): this

    xl(
        propertyOrProps: string | Partial<CSSStyleDeclaration>,
        value?: string
    ): this {
        if (typeof propertyOrProps === "string" && value) {
            this.media("(min-width: 1280px)", propertyOrProps, value)
        } else if (typeof propertyOrProps === "object") {
            this.media("(min-width: 1280px)", propertyOrProps)
        }
        return this
    }

    /**
     * Applies the provided CSS properties when the current viewport width is at least 1536px.
     * @param props - The CSS properties to apply to the element when the viewport width is at least 1536px.
     * @returns The current `Avita` instance for chaining.
     */
    xxl(props: Partial<CSSStyleDeclaration>): this

    /**
     * Applies the provided CSS property and value when the current viewport width is at least 1536px.
     * @param property - The CSS property to apply to the element when the viewport width is at least 1536px.
     * @param value - The value to set for the CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    xxl(property: string, value: string): this

    xxl(
        propertyOrProps: string | Partial<CSSStyleDeclaration>,
        value?: string
    ): this {
        if (typeof propertyOrProps === "string" && value) {
            this.media("(min-width: 1536px)", propertyOrProps, value)
        } else if (typeof propertyOrProps === "object") {
            this.media("(min-width: 1536px)", propertyOrProps)
        }
        return this
    }
}

/**
 * Selects an HTML element or a collection of HTML elements matching the provided CSS selector.
 * @param selector - The CSS selector to use for selecting the element(s).
 * @param raw - If set to `true`, the function will return the raw HTMLElement or HTMLElement[] instead of an Avita instance.
 * @returns The raw HTMLElement or HTMLElement[] if `raw` is `true` or an Avita instance if `raw` is `false`/`undefined`.
 */
export function $<T extends HTMLElement>(selector: string, raw: true): T | T[]

/**
 * Selects an HTML element or a collection of HTML elements matching the provided CSS selector.
 * @param selector - The CSS selector to use for selecting the element(s).
 * @param raw - If set to `true`, the function will return the raw HTMLElement or HTMLElement[] instead of an Avita instance.
 * @returns An `Avita` instance wrapping the selected element(s), or the raw HTMLElement or HTMLElement[] if `raw` is `true`.
 */
export function $<T extends HTMLElement>(
    selector: string,
    raw?: false
): Avita<T>

/**
 * Selects an HTML element or a collection of HTML elements matching the provided CSS selector.
 * @param selector - The CSS selector to use for selecting the element(s).
 * @returns An `Avita` instance wrapping the selected element(s).
 */
export function $<T extends HTMLElement>(selector: string): Avita<T>

/**
 * Executes the provided callback function when the DOM is ready.
 * @param callback - The function to execute when the DOM is ready.
 */
export function $(callback: () => void): void

export function $<T extends HTMLElement>(
    selectorOrCallback: string | (() => void),
    raw?: boolean
): Avita<T> | T | T[] | void {
    if (typeof selectorOrCallback === "string") {
        // Handle element selection
        if (raw === true) {
            return Avita.find<T>(selectorOrCallback, true)
        } else {
            return Avita.find<T>(selectorOrCallback)
        }
    } else if (typeof selectorOrCallback === "function") {
        // Handle DOM ready event
        Avita.ready(selectorOrCallback)
    }
}
