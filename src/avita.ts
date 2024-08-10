import type * as AvitaTypes from "./types"
import { span, style } from "./elements"
import {
    camelToKebab,
    defaultStyles,
    generateClass,
    numberToSeconds,
} from "./utils"

export default class Avita<T extends HTMLElement | SVGElement> {
    private element: T
    private elements: T[]
    private avitaChildren: Avita<T>[]

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
            this.elements = [this.element] // Initialize elements with the single created element
        } else if (Array.isArray(tagOrElement)) {
            if (tagOrElement.length === 0) {
                throw new Error("The elements array should not be empty.")
            }
            this.elements = tagOrElement
            this.element = tagOrElement[0] // Use the first element as the primary element
        } else {
            this.element = tagOrElement
            this.elements = [tagOrElement] // Wrap the single element in an array
        }
        this.avitaChildren = []
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

    // Element Properties
    /**
     * Sets the id property of the element.
     * @param id - The id to set on the element.
     * @returns The current AvitaElement instance for chaining.
     */
    id(id: string) {
        this.element.id = id
        return this
    }

    /**
     * Sets the CSS class(es) of the element(s).
     * @param value - The CSS class(es) to add to the element(s).
     * @returns The current AvitaElement instance for chaining.
     */
    class(value: string) {
        const classNames = value.split(" ")
        this.element.classList.add(...classNames)
        this.elements.forEach((element) => {
            element.classList.add(...classNames)
        })
        return this
    }

    /**
     * Gets the value of the specified css property of the element(s).
     * @note Use this method to get/set the value of multiple elements.
     * @param property - The CSS property to get the value of.
     * @returns The value of the specified CSS property.
     */
    css(property: string): string | undefined

    /**
     * Sets the inline styles of the element(s).
     * @note Use this method to get/set the value of multiple elements.
     * @param property - The CSS property to set.
     * @param value - The value to set for the CSS property.
     * @returns The current AvitaElement instance for chaining.
     */
    css(property: string, value: string): this

    /**
     * Sets the inline styles of the element(s).
     * @note Use this method to get/set the value of multiple elements.
     * @param value - An object containing the CSS styles to apply to the element(s).
     * @returns The current AvitaElement instance for chaining.
     */
    css(props: Partial<CSSStyleDeclaration>): this

    css(
        propertyOrProps: string | Partial<CSSStyleDeclaration>,
        value?: string
    ): string | this | undefined {
        if (typeof propertyOrProps === "string") {
            if (value === undefined) {
                // Get the value of a single property
                const computedStyle = getComputedStyle(this.element)
                return (
                    computedStyle.getPropertyValue(propertyOrProps) || undefined
                )
            } else {
                // Set a single property
                this.element.style[propertyOrProps as any] = value
                this.elements.forEach((element) => {
                    element.style[propertyOrProps as any] = value
                })
                return this
            }
        } else {
            // Set multiple properties
            for (const [prop, val] of Object.entries(propertyOrProps)) {
                if (val !== undefined) {
                    this.element.style[prop as any] = String(val)
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
        if (nameOrAttributes === undefined) {
            // Get all attributes
            const attributes: Record<string, string> = {}
            for (let i = 0; i < this.element.attributes.length; i++) {
                const attr = this.element.attributes[i]
                attributes[attr.name] = attr.value
            }
            return attributes
        } else if (typeof nameOrAttributes === "string") {
            if (value === undefined) {
                // Get the value of the specified attribute
                return this.element.getAttribute(nameOrAttributes) || undefined
            } else {
                // Set the value of the specified attribute
                this.element.setAttribute(nameOrAttributes, value)
                this.elements.forEach((element) => {
                    element.setAttribute(nameOrAttributes, value)
                })
                return this
            }
        } else {
            // Set multiple attributes
            for (const [key, val] of Object.entries(nameOrAttributes)) {
                this.element.setAttribute(key, val)
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
        if (keyOrDataAttributes === undefined) {
            // Get all data attributes
            const dataAttributes: Record<string, string> = {}
            for (const key in this.element.dataset) {
                dataAttributes[key] = this.element.dataset[key]!
            }
            return dataAttributes
        } else if (typeof keyOrDataAttributes === "string") {
            if (value === undefined) {
                // Get the value of the specified data attribute
                return this.element.dataset[keyOrDataAttributes] || undefined
            } else {
                // Set the value of the specified data attribute
                this.element.dataset[keyOrDataAttributes] = value
                return this
            }
        } else {
            // Set multiple data attributes
            for (const [key, val] of Object.entries(keyOrDataAttributes)) {
                this.element.dataset[key] = val
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
            if (value === undefined) {
                // Getter: Return the current title attribute value
                return this.element.title
            } else {
                // Setter: Set the title attribute value
                this.element.title = value
                return this
            }
        }
        return this // In case the element is not an HTMLElement, return this for chaining
    }

    /**
     * Sets the text content of the element.
     * @param value - The text to set as the content of the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    text(value: string) {
        this.element.textContent = value
        return this
    }

    /**
     * Sets the HTML content of the element.
     * @param value - The HTML content to set for the element.
     * @returns The current `AvitaElement` instance for chaining.
     */
    html(value: string) {
        this.element.innerHTML = value
        return this
    }

    /**
     * Appends the current `AvitaElement` instance to the provided `AvitaElement` instance.
     * @param element - The `AvitaElement` instance to append the current instance to.
     * @returns The current `AvitaElement` instance for chaining.
     */
    append(element: Avita<T>) {
        this.element.appendChild(element.element)
        return this
    }

    /**
     * Prepends the current `AvitaElement` instance to the provided `AvitaElement` instance.
     * @param element - The `AvitaElement` instance to prepend the current instance to.
     * @returns The current `AvitaElement` instance for chaining.
     */
    prepend(element: Avita<T>) {
        this.element.prepend(element.element)
        return this
    }

    /**
     * Removes the current `AvitaElement` instance from the DOM.
     * @returns The current `AvitaElement` instance for chaining.
     */
    remove() {
        this.element.remove()
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
        if (value === undefined) {
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
        if (value === undefined) {
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
        if (this.elements.length > 1) {
            this.elements.forEach((element) => {
                element.addEventListener(event, callback)
            })
        }
        return this
    }

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
            body = `${camelToKebab(propsOrProperty)}: ${value};`
        }

        if (typeof propsOrProperty === "object") {
            Object.entries(propsOrProperty).forEach(([prop, val]) => {
                body += `${camelToKebab(prop)}: ${val};`
            })
        }

        const pseudoCSS = `.${uniqueClass}:${pseudoClass} { ${body} }`
        $("head").append(style().text(pseudoCSS))

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
            this.element.addEventListener("mouseout", (event) => {
                if (onMouseLeave) {
                    onMouseLeave(event)
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
        return this
    }

    /**
     * Attaches a change event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's value changes.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onChange(callback: (event: Event) => void) {
        this.element.addEventListener("change", callback)
        return this
    }

    /**
     * Attaches an input event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's value is input.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onInput(callback: (event: Event) => void) {
        this.element.addEventListener("input", callback)
        return this
    }

    /**
     * Attaches a submit event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is submitted.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onSubmit(callback: (event: Event) => void) {
        this.element.addEventListener("submit", callback)
        return this
    }

    /**
     * Attaches an invalid event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is invalid.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onInvalid(callback: (event: Event) => void) {
        this.element.addEventListener("invalid", callback)
        return this
    }

    /**
     * Attaches a reset event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is reset.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onReset(callback: (event: Event) => void) {
        this.element.addEventListener("reset", callback)
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
        return this
    }

    /**
     * Attaches a scroll event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is scrolled.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onScroll(callback: (event: Event) => void) {
        window.addEventListener("scroll", callback)
        return this
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
        return this
    }

    /**
     * Attaches a abort event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is aborted.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onAbort(callback: (event: Event) => void) {
        this.element.addEventListener("abort", callback)
        return this
    }

    /**
     * Attaches a canplay event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is able to start playing.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onCanPlay(callback: (event: Event) => void) {
        this.element.addEventListener("canplay", callback)
        return this
    }

    /**
     * Attaches a canplaythrough event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is able to play through without interruption.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onCanPlayThrough(callback: (event: Event) => void) {
        this.element.addEventListener("canplaythrough", callback)
        return this
    }

    /**
     * Attaches a durationchange event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the duration of the element changes.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onDurationChange(callback: (event: Event) => void) {
        this.element.addEventListener("durationchange", callback)
        return this
    }

    /**
     * Attaches an emptied event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is emptied.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onEmptied(callback: (event: Event) => void) {
        this.element.addEventListener("emptied", callback)
        return this
    }

    /**
     * Attaches an encrypted event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is encrypted.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onEncrypted(callback: (event: Event) => void) {
        this.element.addEventListener("encrypted", callback)
        return this
    }

    /**
     * Attaches an ended event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element has finished playing.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onEnded(callback: (event: Event) => void) {
        this.element.addEventListener("ended", callback)
        return this
    }

    /**
     * Attaches a loadeddata event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's media data has finished loading.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onLoadedData(callback: (event: Event) => void) {
        this.element.addEventListener("loadeddata", callback)
        return this
    }

    /**
     * Attaches a loadedmetadata event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's media metadata has finished loading.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onLoadedMetadata(callback: (event: Event) => void) {
        this.element.addEventListener("loadedmetadata", callback)
        return this
    }

    /**
     * Attaches a loadstart event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element starts loading.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onLoadStart(callback: (event: Event) => void) {
        this.element.addEventListener("loadstart", callback)
        return this
    }

    /**
     * Attaches a pause event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is paused.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPause(callback: (event: Event) => void) {
        this.element.addEventListener("pause", callback)
        return this
    }

    /**
     * Attaches a play event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element starts playing.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPlay(callback: (event: Event) => void) {
        this.element.addEventListener("play", callback)
        return this
    }

    /**
     * Attaches a playing event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element starts playing.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onPlaying(callback: (event: Event) => void) {
        this.element.addEventListener("playing", callback)
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
        return this
    }

    /**
     * Attaches a ratechange event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's playback rate changes.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onRateChange(callback: (event: Event) => void) {
        this.element.addEventListener("ratechange", callback)
        return this
    }

    /**
     * Attaches a seeked event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element has finished seeking.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onSeeked(callback: (event: Event) => void) {
        this.element.addEventListener("seeked", callback)
        return this
    }

    /**
     * Attaches a seeking event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element starts seeking.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onSeeking(callback: (event: Event) => void) {
        this.element.addEventListener("seeking", callback)
        return this
    }

    /**
     * Attaches a stalled event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's media data loading has been interrupted.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onStalled(callback: (event: Event) => void) {
        this.element.addEventListener("stalled", callback)
        return this
    }

    /**
     * Attaches a suspend event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's media data loading has been suspended.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onSuspend(callback: (event: Event) => void) {
        this.element.addEventListener("suspend", callback)
        return this
    }

    /**
     * Attaches a timeupdate event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's playback position changes.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onTimeUpdate(callback: (event: Event) => void) {
        this.element.addEventListener("timeupdate", callback)
        return this
    }

    /**
     * Attaches a volumechange event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element's volume has changed.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onVolumeChange(callback: (event: Event) => void) {
        this.element.addEventListener("volumechange", callback)
        return this
    }

    /**
     * Attaches a waiting event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element is waiting for media data to be available.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onWaiting(callback: (event: Event) => void) {
        this.element.addEventListener("waiting", callback)
        return this
    }

    /**
     * Attaches a load event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when the element has finished loading.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onLoad(callback: (event: Event) => void) {
        this.element.addEventListener("load", callback)
        return this
    }

    /**
     * Attaches an error event listener to the current `AvitaElement` instance.
     * @param callback - The callback function to be executed when an error occurs.
     * @returns The current `AvitaElement` instance for chaining.
     */
    onError(callback: (event: Event) => void) {
        this.element.addEventListener("error", callback)
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
        return this
    }

    /**
     * Sets the 'accent-color' CSS property on the current `AvitaElement` instance.
     * @param color - The color value to set for the 'accent-color' property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    accentColor(color: AvitaTypes.AvitaColorType | string) {
        this.element.style.accentColor = String(color)
        return this
    }

    /**
     * Sets the 'appearance' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'appearance' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    appearance(value: AvitaTypes.Appearance) {
        this.element.style.appearance = value
        return this
    }

    /**
     * Sets the 'align-content' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'align-content' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    alignContent(value: AvitaTypes.AlignContent) {
        this.element.style.alignContent = value
        return this
    }

    /**
     * Sets the 'align-items' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'align-items' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    alignItems(value: AvitaTypes.AlignItems) {
        this.element.style.alignItems = value
        return this
    }

    /**
     * Sets the 'align-self' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'align-self' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    alignSelf(value: AvitaTypes.AlignSelf) {
        this.element.style.alignSelf = value
        return this
    }

    /**
     * Sets the 'animation' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'animation' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    animation(value: string) {
        this.element.style.animation = value
        return this
    }

    /**
     * Sets the 'animationDelay' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'animationDelay' CSS property. Can be a string or number representing the delay in seconds.
     * @returns The current `AvitaElement` instance for chaining.
     */
    animationDelay(value: string | number) {
        this.element.style.animationDelay = numberToSeconds(value)
        return this
    }

    /**
     * Sets the 'animationDirection' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'animationDirection' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    animationDirection(value: AvitaTypes.AnimationDirection) {
        this.element.style.animationDirection = value
        return this
    }

    /**
     * Sets the 'animationDuration' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'animationDuration' CSS property. Can be a string or number representing the duration in seconds.
     * @returns The current `AvitaElement` instance for chaining.
     */
    animationDuration(value: string | number) {
        this.element.style.animationDuration = numberToSeconds(value)
        return this
    }

    /**
     * Sets the 'animationFillMode' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'animationFillMode' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    animationFillMode(value: AvitaTypes.AnimationFillMode) {
        this.element.style.animationFillMode = value
        return this
    }

    /**
     * Sets the 'animationIterationCount' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'animationIterationCount' CSS property. Can be a number or the string 'infinite'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    animationIterationCount(value: AvitaTypes.AnimationIterationCount) {
        this.element.style.animationIterationCount = value
        return this
    }

    /**
     * Sets the 'animationName' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'animationName' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    animationName(value: string) {
        this.element.style.animationName = value
        return this
    }

    /**
     * Sets the 'animationPlayState' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'animationPlayState' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    animationPlayState(value: AvitaTypes.AnimationPlayState) {
        this.element.style.animationPlayState = value
        return this
    }

    /**
     * Sets the 'animationTimingFunction' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'animationTimingFunction' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    animationTimingFunction(value: AvitaTypes.AnimationTimingFunction) {
        this.element.style.animationTimingFunction = value
        return this
    }

    /**
     * Sets the 'aspectRatio' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'aspectRatio' CSS property. Can be a number or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    aspectRatio(value: string | number) {
        this.element.style.aspectRatio = String(value)
        return this
    }

    /**
     * Sets the 'backdropFilter' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backdropFilter' CSS property. Can be a string or an array with the filter name and value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backdropFilter(value: AvitaTypes.BackdropFilter) {
        if (typeof value === "string") {
            this.element.style.backdropFilter = value
            return this
        }
        const [filter, val] = value
        this.element.style.backdropFilter = `${filter}(${val})`
        return this
    }

    /**
     * Sets the 'backfaceVisibility' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backfaceVisibility' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backfaceVisibility(value: AvitaTypes.BackfaceVisibility) {
        this.element.style.backfaceVisibility = value
        return this
    }

    /**
     * Sets the 'background' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'background' CSS property. Can be a string representing a valid CSS background value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    background(value: string) {
        this.element.style.background = value
        return this
    }

    /**
     * Shorthand for background() method.
     * Sets the 'background' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'background' CSS property. Can be a string representing a valid CSS background value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bg = this.background

    /**
     * Sets the 'backgroundAttachment' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backgroundAttachment' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backgroundAttachment(value: AvitaTypes.BackgroundAttachment) {
        this.element.style.backgroundAttachment = value
        return this
    }

    /**
     * Sets the 'backgroundBlendMode' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backgroundBlendMode' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backgroundBlendMode(value: AvitaTypes.BackgroundBlendMode) {
        this.element.style.backgroundBlendMode = value
        return this
    }

    /**
     * Sets the 'backgroundClip' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backgroundClip' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backgroundClip(value: AvitaTypes.BackgroundClip) {
        this.element.style.backgroundClip = value
        return this
    }

    /**
     * Sets the 'backgroundColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backgroundColor' CSS property. Can be a string representing a valid CSS color value or an `AvitaTypes.AvitaColorType` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backgroundColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.backgroundColor = String(value)
        return this
    }

    /**
     * Shorthand for backgroundColor() method.
     * Sets the 'backgroundColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backgroundColor' CSS property. Can be a string representing a valid CSS color value or an `AvitaTypes.AvitaColorType` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bgColor = this.backgroundColor

    /**
     * Sets the 'backgroundImage' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backgroundImage' CSS property. Can be a string representing a valid CSS background image value or an `AvitaTypes.AvitaColorType` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backgroundImage(value: string | AvitaTypes.AvitaColorType) {
        this.element.style.backgroundImage = String(value)
        return this
    }

    /**
     * Sets the 'backgroundOrigin' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backgroundOrigin' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backgroundOrigin(value: AvitaTypes.BackgroundOrigin) {
        this.element.style.backgroundOrigin = value
        return this
    }

    /**
     * Sets the 'backgroundPosition' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backgroundPosition' CSS property. Can be a string representing a valid CSS background position value or an `AvitaTypes.BackgroundPosition` tuple.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backgroundPosition(value: AvitaTypes.BackgroundPosition) {
        if (typeof value === "string") {
            this.element.style.backgroundPosition = value
            return this
        }
        const [pos, val] = value
        this.element.style.backgroundPosition = `${pos} ${val}`
        return this
    }

    /**
     * Sets the 'backgroundPositionX' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backgroundPositionX' CSS property. Can be a string representing a valid CSS background position value or an `AvitaTypes.BackgroundPosition` tuple.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backgroundPositionX(value: AvitaTypes.BackgroundPosition) {
        if (typeof value === "string") {
            this.element.style.backgroundPositionX = value
            return this
        }
        const [pos, val] = value
        this.element.style.backgroundPositionX = `${pos} ${val}`
        return this
    }

    /**
     * Sets the 'backgroundPositionY' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backgroundPositionY' CSS property. Can be a string representing a valid CSS background position value or an `AvitaTypes.BackgroundPosition` tuple.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backgroundPositionY(value: AvitaTypes.BackgroundPosition) {
        if (typeof value === "string") {
            this.element.style.backgroundPositionX = value
            return this
        }
        const [pos, val] = value
        this.element.style.backgroundPositionX = `${pos} ${val}`
        return this
    }

    /**
     * Sets the 'backgroundRepeat' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backgroundRepeat' CSS property. Can be a valid CSS background repeat value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backgroundRepeat(value: AvitaTypes.BackgroundRepeat) {
        this.element.style.backgroundRepeat = value
        return this
    }

    /**
     * Sets the 'backgroundSize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'backgroundSize' CSS property. Can be a string representing a valid CSS background size value or an `AvitaTypes.BackgroundSize` tuple.
     * @returns The current `AvitaElement` instance for chaining.
     */
    backgroundSize(value: AvitaTypes.BackgroundSize) {
        if (typeof value === "string") {
            this.element.style.backgroundSize = value
            return this
        }
        const [size, val] = value
        this.element.style.backgroundSize = `${size} ${val}`
        return this
    }

    /**
     * Sets the 'blockSize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'blockSize' CSS property. Can be a string or number representing a valid CSS block size value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    blockSize(value: string | number) {
        this.element.style.blockSize = String(value)
        return this
    }

    /**
     * Sets the 'border' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'border' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    border(value: string) {
        this.element.style.border = value
        return this
    }

    /**
     * Sets the 'borderBlock' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBlock' CSS property. Can be a string representing a valid CSS border block value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBlock(value: string) {
        this.element.style.borderBlock = value
        return this
    }

    /**
     * Sets the 'borderBlockColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBlockColor' CSS property. Can be a string representing a valid CSS color value or an `AvitaTypes.AvitaColorType`.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBlockColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.borderBlockColor = String(value)
        return this
    }

    /**
     * Sets the 'borderBlockEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBlockEnd' CSS property. Can be a string representing a valid CSS border block end value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBlockEnd(value: string) {
        this.element.style.borderBlockEnd = value
        return this
    }

    /**
     * Sets the 'borderBlockEndColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBlockEndColor' CSS property. Can be a string representing a valid CSS color value or an `AvitaTypes.AvitaColorType`.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBlockEndColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.borderBlockEndColor = String(value)
        return this
    }

    /**
     * Sets the 'borderBlockEndStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBlockEndStyle' CSS property. Can be a value from the `AvitaTypes.BorderStyle` enum.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBlockEndStyle(value: AvitaTypes.BorderStyle) {
        this.element.style.borderBlockEndStyle = value
        return this
    }

    /**
     * Sets the 'borderBlockEndWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBlockEndWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBlockEndWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderBlockEndWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderBlockStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBlockStart' CSS property. Can be a string representing a valid CSS border block start value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBlockStart(value: string) {
        this.element.style.borderBlockStart = value
        return this
    }

    /**
     * Sets the 'borderBlockStartColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBlockStartColor' CSS property. Can be a string representing a valid CSS color value or an `AvitaTypes.AvitaColorType`.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBlockStartColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.borderBlockStartColor = String(value)
        return this
    }

    /**
     * Sets the 'borderBlockStartStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBlockStartStyle' CSS property. Can be a value from the `AvitaTypes.BorderStyle` enum.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBlockStartStyle(value: AvitaTypes.BorderStyle) {
        this.element.style.borderBlockStartStyle = value
        return this
    }

    /**
     * Sets the 'borderBlockStartWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBlockStartWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBlockStartWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderBlockStartWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderBlockStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBlockStyle' CSS property. Can be a value from the `AvitaTypes.BorderStyle` enum.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBlockStyle(value: AvitaTypes.BorderStyle) {
        this.element.style.borderBlockStyle = value
        return this
    }

    /**
     * Sets the 'borderBlockWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBlockWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBlockWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderBlockWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderBottom' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBottom' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBottom(value: string) {
        this.element.style.borderBottom = value
        return this
    }

    /**
     * Sets the 'borderBottomColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBottomColor' CSS property. Can be a value from the `AvitaTypes.AvitaColorType` enum or a string representing a valid CSS color value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBottomColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.borderBottomColor = String(value)
        return this
    }

    /**
     * Sets the 'borderBottomLeftRadius' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBottomLeftRadius' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBottomLeftRadius(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderBottomLeftRadius = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderBottomRightRadius' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBottomRightRadius' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBottomRightRadius(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderBottomRightRadius = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderTopLeftRadius' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderTopLeftRadius' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderTopLeftRadius(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderTopLeftRadius = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderTopRightRadius' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderTopRightRadius' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderTopRightRadius(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderTopRightRadius = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderBottomStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBottomStyle' CSS property. Can be one of the valid CSS border style values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBottomStyle(value: AvitaTypes.BorderStyle) {
        this.element.style.borderBottomStyle = value
        return this
    }

    /**
     * Sets the 'borderBottomWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderBottomWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderBottomWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderBottomWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderCollapse' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderCollapse' CSS property. Can be one of the valid CSS border collapse values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderCollapse(value: AvitaTypes.BorderCollapse) {
        this.element.style.borderCollapse = value
        return this
    }

    /**
     * Sets the 'borderColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderColor' CSS property. Can be an `AvitaTypes.AvitaColorType` or a string representing a valid CSS color value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.borderColor = String(value)
        return this
    }

    /**
     * Sets the 'borderImage' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderImage' CSS property. Can be a string representing a valid CSS border image value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderImage(value: string) {
        this.element.style.borderImage = value
        return this
    }

    /**
     * Sets the 'borderImageOutset' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderImageOutset' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderImageOutset(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderImageOutset = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderImageRepeat' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderImageRepeat' CSS property. Can be one of the valid CSS border image repeat values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderImageRepeat(value: AvitaTypes.BorderImageRepeat) {
        this.element.style.borderImageRepeat = value
        return this
    }

    /**
     * Sets the 'borderImageSlice' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderImageSlice' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderImageSlice(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderImageSlice = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderImageSource' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderImageSource' CSS property. Can be a string representing a valid CSS border image source value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderImageSource(value: string) {
        this.element.style.borderImageSource = value
        return this
    }

    /**
     * Sets the 'borderImageWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderImageWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderImageWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderImageWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderInline' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderInline' CSS property. Can be a string representing a valid CSS border inline value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderInline(value: string) {
        this.element.style.borderInline = value
        return this
    }

    /**
     * Sets the 'borderInlineColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderInlineColor' CSS property. Can be a string representing a valid CSS color value or an `AvitaTypes.AvitaColorType` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderInlineColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.borderInlineColor = String(value)
        return this
    }

    /**
     * Sets the 'borderInlineEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderInlineEnd' CSS property. Can be a string representing a valid CSS border inline end value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderInlineEnd(value: string) {
        this.element.style.borderInlineEnd = value
        return this
    }

    /**
     * Sets the 'borderInlineEndColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderInlineEndColor' CSS property. Can be a string representing a valid CSS color value or an `AvitaTypes.AvitaColorType` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderInlineEndColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.borderInlineEndColor = String(value)
        return this
    }

    /**
     * Sets the 'borderInlineEndStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderInlineEndStyle' CSS property. Can be a value from the `AvitaTypes.BorderStyle` enum.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderInlineEndStyle(value: AvitaTypes.BorderStyle) {
        this.element.style.borderInlineEndStyle = value
        return this
    }

    /**
     * Sets the 'borderInlineEndWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderInlineEndWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderInlineEndWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderInlineEndWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderInlineStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderInlineStart' CSS property. Can be a string representing a valid CSS border inline start value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderInlineStart(value: string) {
        this.element.style.borderInlineStart = value
        return this
    }

    /**
     * Sets the 'borderInlineStartColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderInlineStartColor' CSS property. Can be a string representing a valid CSS color value or an `AvitaTypes.AvitaColorType` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderInlineStartColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.borderInlineStartColor = String(value)
        return this
    }

    /**
     * Sets the 'borderInlineStartStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderInlineStartStyle' CSS property. Can be a value from the `AvitaTypes.BorderStyle` enum.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderInlineStartStyle(value: AvitaTypes.BorderStyle) {
        this.element.style.borderInlineStartStyle = value
        return this
    }

    /**
     * Sets the 'borderInlineStartWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderInlineStartWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderInlineStartWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderInlineStartWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderInlineStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderInlineStyle' CSS property. Can be a value from the `AvitaTypes.BorderStyle` enum.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderInlineStyle(value: AvitaTypes.BorderStyle) {
        this.element.style.borderInlineStyle = value
        return this
    }

    /**
     * Sets the 'borderInlineWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderInlineWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderInlineWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderInlineWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderLeft' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderLeft' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderLeft(value: string) {
        this.element.style.borderLeft = value
        return this
    }

    /**
     * Sets the 'borderLeftColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderLeftColor' CSS property. Can be a value from the `AvitaTypes.AvitaColorType` enum or a string representing a valid CSS color value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderLeftColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.borderLeftColor = String(value)
        return this
    }

    /**
     * Sets the 'borderLeftStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderLeftStyle' CSS property. Can be a value from the `AvitaTypes.BorderStyle` enum.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderLeftStyle(value: AvitaTypes.BorderStyle) {
        this.element.style.borderLeftStyle = value
        return this
    }

    /**
     * Sets the 'borderLeftWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderLeftWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderLeftWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderLeftWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderRadius' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderRadius' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     * @deprecated Use `rounded()` instead.
     */
    borderRadius(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderRadius = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderRight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderRight' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderRight(value: string) {
        this.element.style.borderRight = value
        return this
    }

    /**
     * Sets the 'borderRightColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderRightColor' CSS property. Can be a value from the `AvitaTypes.AvitaColorType` enum or a string representing a valid CSS color value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderRightColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.borderRightColor = String(value)
        return this
    }

    /**
     * Sets the 'borderRightStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderRightStyle' CSS property. Can be a value from the `AvitaTypes.BorderStyle` enum.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderRightStyle(value: AvitaTypes.BorderStyle) {
        this.element.style.borderRightStyle = value
        return this
    }

    /**
     * Sets the 'borderRightWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderRightWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderRightWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderRightWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderSpacing' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderSpacing' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderSpacing(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderSpacing = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderStyle' CSS property. Can be a value from the `AvitaTypes.BorderStyle` enum.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderStyle(value: AvitaTypes.BorderStyle) {
        this.element.style.borderStyle = value
        return this
    }

    /**
     * Sets the 'borderTop' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderTop' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderTop(value: string) {
        this.element.style.borderTop = value
        return this
    }

    /**
     * Sets the 'borderTopColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderTopColor' CSS property. Can be a value from the `AvitaTypes.AvitaColorType` enum or a string representing a valid CSS color value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderTopColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.borderTopColor = String(value)
        return this
    }

    /**
     * Sets the 'borderTopStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderTopStyle' CSS property. Can be a value from the `AvitaTypes.BorderStyle` enum.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderTopStyle(value: AvitaTypes.BorderStyle) {
        this.element.style.borderTopStyle = value
        return this
    }

    /**
     * Sets the 'borderTopWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderTopWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderTopWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderTopWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'borderWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'borderWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    borderWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.borderWidth = String(value) + unit
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
        return this
    }

    /**
     * Sets the 'boxShadow' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'boxShadow' CSS property. Can be a string representing a valid CSS box-shadow value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    shadow(value: string) {
        this.element.style.boxShadow = value
        return this
    }

    /**
     * Sets the 'boxSizing' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'boxSizing' CSS property. Can be one of the valid 'box-sizing' CSS property values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    boxSizing(value: AvitaTypes.BoxSizing) {
        this.element.style.boxSizing = value
        return this
    }

    /**
     * Sets the 'breakAfter' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'breakAfter' CSS property. Can be one of the valid 'break-after' CSS property values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    breakAfter(value: AvitaTypes.BreakAfter) {
        this.element.style.breakAfter = value
        return this
    }

    /**
     * Sets the 'breakBefore' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'breakBefore' CSS property. Can be one of the valid 'break-before' CSS property values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    breakBefore(value: AvitaTypes.BreakBefore) {
        this.element.style.breakBefore = value
        return this
    }

    /**
     * Sets the 'breakInside' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'breakInside' CSS property. Can be one of the valid 'break-inside' CSS property values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    breakInside(value: AvitaTypes.BreakInside) {
        this.element.style.breakInside = value
        return this
    }

    /**
     * Sets the 'captionSide' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'captionSide' CSS property. Can be one of the valid 'caption-side' CSS property values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    captionSide(value: AvitaTypes.CaptionSide) {
        this.element.style.captionSide = value
        return this
    }

    /**
     * Sets the 'caretColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'caretColor' CSS property. Can be one of the valid CSS color values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    caretColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.caretColor = String(value)
        return this
    }

    /**
     * Clears the CSS styles applied to the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    clear() {
        this.element.style.cssText = ""
        return this
    }

    /**
     * Sets the 'clear' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'clear' CSS property. Can be one of the valid 'clear' CSS property values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    clearCSS(value: AvitaTypes.Clear) {
        this.element.style.clear = value
        return this
    }

    /**
     * Sets the 'clipPath' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'clipPath' CSS property. Can be a valid CSS clip-path value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    clipPath(value: string) {
        // todo add features
        this.element.style.clipPath = value
        return this
    }

    /**
     * Sets the 'color' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'color' CSS property. Can be one of the valid CSS color values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    color(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.color = String(value)
        return this
    }

    /**
     * Sets the 'columnCount' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'columnCount' CSS property. Can be a number or one of the valid 'column-count' CSS property values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    columnCount(value: AvitaTypes.ColumnCount | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.columnCount = String(value) + unit
        return this
    }

    /**
     * Sets the 'columnFill' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'columnFill' CSS property. Can be one of the valid 'column-fill' CSS property values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    columnFill(value: AvitaTypes.ColumnFill) {
        this.element.style.columnFill = value
        return this
    }

    /**
     * Sets the 'columnGap' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'columnGap' CSS property. Can be a valid CSS length value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    columnGap(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.columnGap = String(value) + unit
        return this
    }

    /**
     * Sets the 'columnRule' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'columnRule' CSS property. Can be a valid CSS 'column-rule' property value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    columnRule(value: string) {
        this.element.style.columnRule = value
        return this
    }

    /**
     * Sets the 'columnRuleColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'columnRuleColor' CSS property. Can be one of the valid CSS color values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    columnRuleColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.columnRuleColor = String(value)
        return this
    }

    /**
     * Sets the 'columnRuleStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'columnRuleStyle' CSS property. Can be one of the valid 'border-style' CSS property values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    columnRuleStyle(value: AvitaTypes.BorderStyle) {
        this.element.style.columnRuleStyle = value
        return this
    }

    /**
     * Sets the 'columnRuleWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'columnRuleWidth' CSS property. Can be a valid CSS length value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    columnRuleWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.columnRuleWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'columnSpan' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'columnSpan' CSS property. Can be one of the valid 'column-span' CSS property values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    columnSpan(value: AvitaTypes.ColumnSpan) {
        this.element.style.columnSpan = value
        return this
    }

    /**
     * Sets the 'columnWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'columnWidth' CSS property. Can be a valid CSS length value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    columnWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.columnWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'columns' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'columns' CSS property. Can be a valid CSS length value or a number representing the number of columns.
     * @returns The current `AvitaElement` instance for chaining.
     */
    columns(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.columns = String(value) + unit
        return this
    }

    /**
     * Sets the 'content' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'content' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    content(value: string) {
        this.element.style.content = value
        return this
    }

    /**
     * Sets the 'counterIncrement' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'counterIncrement' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    counterIncrement(value: string) {
        this.element.style.counterIncrement = value
        return this
    }

    /**
     * Sets the 'counterReset' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'counterReset' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    counterReset(value: string) {
        this.element.style.counterReset = value
        return this
    }

    /**
     * Sets the 'cursor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'cursor' CSS property. Can be a valid CSS cursor value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    cursor(value: AvitaTypes.Cursor) {
        this.element.style.cursor = value
        return this
    }

    /**
     * Sets the 'direction' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'direction' CSS property. Can be a valid CSS direction value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    direction(value: AvitaTypes.Direction) {
        this.element.style.direction = value
        return this
    }

    /**
     * Sets the 'display' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'display' CSS property. Can be a valid CSS display value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    display(value: AvitaTypes.Display) {
        this.element.style.display = value
        return this
    }

    /**
     * Sets the 'emptyCells' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'emptyCells' CSS property. Can be a valid CSS emptyCells value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    emptyCells(value: AvitaTypes.EmptyCells) {
        this.element.style.emptyCells = value
        return this
    }

    /**
     * Sets the 'filter' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'filter' CSS property. Can be a valid CSS filter value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    filter(value: string) {
        // todo add features
        this.element.style.filter = value
        return this
    }

    /**
     * Sets the 'flex' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'flex' CSS property. Can be a valid CSS flex value, or an array of flex-grow, flex-shrink, and flex-basis values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexCSS(value: AvitaTypes.Flex) {
        if (Array.isArray(value)) {
            this.element.style.flex = value.join(" ")
            return this
        }
        this.element.style.flex = value
        return this
    }

    /**
     * Sets the 'flexBasis' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'flexBasis' CSS property. Can be a valid CSS flex-basis value, either a number or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexBasis(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.flexBasis = String(value) + unit
        return this
    }

    /**
     * Sets the 'flexDirection' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'flexDirection' CSS property. Can be a valid CSS flex-direction value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexDirection(value: AvitaTypes.FlexDirection) {
        this.element.style.flexDirection = value
        return this
    }

    /**
     * Sets the 'flexDirection' CSS property on the current `AvitaElement` instance to 'column'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexCol() {
        this.element.style.flexDirection = "column"
        return this
    }

    /**
     * Sets the 'flexDirection' CSS property on the current `AvitaElement` instance to 'row'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexRow() {
        this.element.style.flexDirection = "row"
        return this
    }

    /**
     * Sets the 'flexFlow' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'flexFlow' CSS property. Can be a valid CSS flex-flow value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexFlow(value: string) {
        this.element.style.flexFlow = value
        return this
    }

    /**
     * Sets the 'flexGrow' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'flexGrow' CSS property. Can be a valid CSS flex-grow value, either a number or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexGrow(value: string | number) {
        this.element.style.flexGrow = String(value)
        return this
    }

    /**
     * Sets the 'flexShrink' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'flexShrink' CSS property. Can be a valid CSS flex-shrink value, either a number or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexShrink(value: string | number) {
        this.element.style.flexShrink = String(value)
        return this
    }

    /**
     * Sets the 'flexWrap' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'flexWrap' CSS property. Can be a valid CSS flex-wrap value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flexWrap(value: AvitaTypes.FlexWrap) {
        this.element.style.flexWrap = value
        return this
    }

    /**
     * Sets the 'float' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'float' CSS property. Can be a valid CSS float value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    float(value: AvitaTypes.Float) {
        this.element.style.float = value
        return this
    }

    /**
     * Sets the 'font' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'font' CSS property. Can be a valid CSS font value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    font(value: string) {
        this.element.style.font = value
        return this
    }

    /**
     * Sets the 'fontSizeAdjust' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontSizeAdjust' CSS property. Can be a valid CSS font-size-adjust value, either a number or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontSizeAdjust(value: string | number) {
        this.element.style.fontSizeAdjust = String(Number(value))
        return this
    }

    /**
     * Sets the 'fontFeatureSettings' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontFeatureSettings' CSS property. Can be a valid CSS font-feature-settings value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontFeatureSettings(value: string) {
        this.element.style.fontFeatureSettings = value
        return this
    }

    /**
     * Sets the 'fontKerning' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontKerning' CSS property. Can be a valid CSS font-kerning value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontKerning(value: AvitaTypes.FontKerning) {
        this.element.style.fontKerning = value
        return this
    }

    /**
     * Sets the 'fontFamily' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontFamily' CSS property. Can be a valid CSS font-family value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontFamily(value: string) {
        this.element.style.fontFamily = value
        return this
    }

    /**
     * Sets the 'fontSize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontSize' CSS property. Can be a valid CSS font-size value, either a number or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontSize(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.fontSize = String(value) + unit
        return this
    }

    /**
     * Sets the 'fontStretch' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontStretch' CSS property. Can be a valid CSS font-stretch value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontStretch(value: string) {
        this.element.style.fontStretch = value
        return this
    }

    /**
     * Sets the 'fontStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontStyle' CSS property. Can be a valid CSS font-style value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontStyle(value: AvitaTypes.FontStyle) {
        this.element.style.fontStyle = value
        return this
    }

    /**
     * Sets the 'fontVariant' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontVariant' CSS property. Can be a valid CSS font-variant value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontVariant(value: string) {
        this.element.style.fontVariant = value
        return this
    }

    /**
     * Sets the 'fontVariantCaps' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontVariantCaps' CSS property. Can be a valid CSS font-variant-caps value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontVariantCaps(value: string) {
        this.element.style.fontVariantCaps = value
        return this
    }

    /**
     * Sets the 'fontVariantEastAsian' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontVariantEastAsian' CSS property. Can be a valid CSS font-variant-east-asian value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontVariantEastAsian(value: string) {
        this.element.style.fontVariantEastAsian = value
        return this
    }

    /**
     * Sets the 'fontVariantLigatures' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontVariantLigatures' CSS property. Can be a valid CSS font-variant-ligatures value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontVariantLigatures(value: string) {
        this.element.style.fontVariantLigatures = value
        return this
    }

    /**
     * Sets the 'fontVariantNumeric' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontVariantNumeric' CSS property. Can be a valid CSS font-variant-numeric value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontVariantNumeric(value: string) {
        this.element.style.fontVariantNumeric = value
        return this
    }

    /**
     * Sets the 'fontVariantPosition' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontVariantPosition' CSS property. Can be a valid CSS font-variant-position value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontVariantPosition(value: string) {
        this.element.style.fontVariantPosition = value
        return this
    }

    /**
     * Sets the 'fontWeight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'fontWeight' CSS property. Can be a valid CSS font-weight value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fontWeight(value: string | number) {
        this.element.style.fontWeight = String(value)
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
        return this
    }

    /**
     * Sets the 'grid' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'grid' CSS property. Can be a valid CSS grid value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridLayout(value: string) {
        this.element.style.grid = value
        return this
    }

    /**
     * Sets the 'gridArea' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridArea' CSS property. Can be a valid CSS grid-area value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridArea(value: string) {
        this.element.style.gridArea = value
        return this
    }

    /**
     * Sets the 'gridAutoColumns' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridAutoColumns' CSS property. Can be a valid CSS grid-auto-columns value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridAutoColumns(value: string) {
        this.element.style.gridAutoColumns = value
        return this
    }

    /**
     * Sets the 'gridAutoFlow' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridAutoFlow' CSS property. Can be a valid CSS grid-auto-flow value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridAutoFlow(value: AvitaTypes.GridAutoFlow) {
        this.element.style.gridAutoFlow = value
        return this
    }

    /**
     * Sets the 'gridAutoRows' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridAutoRows' CSS property. Can be a valid CSS grid-auto-rows value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridAutoRows(value: string) {
        this.element.style.gridAutoRows = value
        return this
    }

    /**
     * Sets the 'gridColumn' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridColumn' CSS property. Can be a valid CSS grid-column value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridColumn(value: string) {
        this.element.style.gridColumn = value
        return this
    }

    /**
     * Sets the 'gridColumnEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridColumnEnd' CSS property. Can be a valid CSS grid-column-end value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridColumnEnd(value: string) {
        this.element.style.gridColumnEnd = value
        return this
    }

    /**
     * Sets the 'gridColumnStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridColumnStart' CSS property. Can be a valid CSS grid-column-start value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridColumnStart(value: string) {
        this.element.style.gridColumnStart = value
        return this
    }

    /**
     * Sets the 'gridRow' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridRow' CSS property. Can be a valid CSS grid-row value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridRow(value: string) {
        this.element.style.gridRow = value
        return this
    }

    /**
     * Sets the 'gridRowEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridRowEnd' CSS property. Can be a valid CSS grid-row-end value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridRowEnd(value: string) {
        this.element.style.gridRowEnd = value
        return this
    }

    /**
     * Sets the 'gridRowStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridRowStart' CSS property. Can be a valid CSS grid-row-start value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridRowStart(value: string) {
        this.element.style.gridRowStart = value
        return this
    }

    /**
     * Sets the 'gridTemplate' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridTemplate' CSS property. Can be a valid CSS grid-template value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridTemplate(value: string) {
        this.element.style.gridTemplate = value
        return this
    }

    /**
     * Sets the 'gridTemplateAreas' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridTemplateAreas' CSS property. Can be a valid CSS grid-template-areas value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridTemplateAreas(value: string) {
        this.element.style.gridTemplateAreas = value
        return this
    }

    /**
     * Sets the 'gridTemplateColumns' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridTemplateColumns' CSS property. Can be a valid CSS grid-template-columns value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridTemplateColumns(value: string) {
        this.element.style.gridTemplateColumns = value
        return this
    }

    /**
     * Sets the 'gridTemplateRows' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'gridTemplateRows' CSS property. Can be a valid CSS grid-template-rows value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    gridTemplateRows(value: string) {
        this.element.style.gridTemplateRows = value
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
        return this
    }

    /**
     * Sets the 'hyphens' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'hyphens' CSS property. Can be a valid CSS hyphens value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    hyphens(value: AvitaTypes.Hyphens) {
        this.element.style.hyphens = value
        return this
    }

    /**
     * Sets the 'imageRendering' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'imageRendering' CSS property. Can be a valid CSS image-rendering value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    imageRendering(value: AvitaTypes.ImageRendering) {
        this.element.style.imageRendering = value
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
        return this
    }

    /**
     * Sets the 'insetBlock' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'insetBlock' CSS property. Can be a valid CSS inset-block value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    insetBlock(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.insetBlock = String(value) + unit
        return this
    }

    /**
     * Sets the 'insetBlockEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'insetBlockEnd' CSS property. Can be a valid CSS inset-block-end value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    insetBlockEnd(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.insetBlockEnd = String(value) + unit
        return this
    }

    /**
     * Sets the 'insetBlockStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'insetBlockStart' CSS property. Can be a valid CSS inset-block-start value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    insetBlockStart(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.insetBlockStart = String(value) + unit
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
        return this
    }

    /**
     * Sets the 'insetInlineEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'insetInlineEnd' CSS property. Can be a valid CSS inset-inline-end value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    insetInlineEnd(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.insetInlineEnd = String(value) + unit
        return this
    }

    /**
     * Sets the 'insetInlineStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'insetInlineStart' CSS property. Can be a valid CSS inset-inline-start value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    insetInlineStart(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.insetInlineStart = String(value) + unit
        return this
    }

    /**
     * Sets the 'isolation' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'isolation' CSS property. Can be a valid CSS isolation value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    isolation(value: AvitaTypes.Isolation) {
        this.element.style.isolation = value
        return this
    }

    /**
     * Sets the 'justifyContent' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'justifyContent' CSS property. Can be a valid CSS justify-content value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    justifyContent(value: AvitaTypes.JustifyContent) {
        this.element.style.justifyContent = value
        return this
    }

    /**
     * Sets the 'justifyItems' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'justifyItems' CSS property. Can be a valid CSS justify-items value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    justifyItems(value: AvitaTypes.JustifyItems) {
        this.element.style.justifyItems = value
        return this
    }

    /**
     * Sets the 'justifySelf' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'justifySelf' CSS property. Can be a valid CSS justify-self value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    justifySelf(value: AvitaTypes.JustifySelf) {
        this.element.style.justifySelf = value
        return this
    }

    /**
     * Sets the 'left' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'left' CSS property. Can be a valid CSS left value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    left(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.left = String(value) + unit
        return this
    }

    /**
     * Sets the 'letterSpacing' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'letterSpacing' CSS property. Can be a valid CSS letter-spacing value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    letterSpacing(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.letterSpacing = String(value) + unit
        return this
    }

    /**
     * Sets the 'lineHeight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'lineHeight' CSS property. Can be a valid CSS line-height value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    lineHeight(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.lineHeight = String(value) + unit
        return this
    }

    /**
     * Sets the 'lineBreak' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'lineBreak' CSS property. Can be a valid CSS line-break value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    lineBreak(value: AvitaTypes.LineBreak) {
        this.element.style.lineBreak = value
        return this
    }

    /**
     * Sets the 'listStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'listStyle' CSS property. Can be a valid CSS list-style value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    listStyle(value: string) {
        this.element.style.listStyle = value
        return this
    }

    /**
     * Sets the 'listStyleImage' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'listStyleImage' CSS property. Can be a valid CSS list-style-image value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    listStyleImage(value: string) {
        this.element.style.listStyleImage = value
        return this
    }

    /**
     * Sets the 'listStylePosition' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'listStylePosition' CSS property. Can be a valid CSS list-style-position value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    listStylePosition(value: AvitaTypes.ListStylePosition) {
        this.element.style.listStylePosition = value
        return this
    }

    /**
     * Sets the 'listStyleType' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'listStyleType' CSS property. Can be a valid CSS list-style-type value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    listStyleType(value: AvitaTypes.ListStyleType) {
        this.element.style.listStyleType = value
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
                break
            case 2:
                this.element.style.margin = `${processValue(
                    values[0]
                )} ${processValue(values[1])}`
                break
            case 3:
                this.element.style.margin = `${processValue(
                    values[0]
                )} ${processValue(values[1])} ${processValue(values[2])}`
                break
            case 4:
                this.element.style.margin = `${processValue(
                    values[0]
                )} ${processValue(values[1])} ${processValue(
                    values[2]
                )} ${processValue(values[3])}`
                break
            default:
                throw new Error(
                    "Invalid number of arguments provided to margin(). Must be 1, 2, 3, or 4."
                )
        }

        return this
    }

    /**
     * Sets the 'marginLeft' and 'marginRight' CSS properties on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginLeft' and 'marginRight' CSS properties. Can be a valid CSS margin value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginX(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginLeft = String(value) + unit
        this.element.style.marginRight = String(value) + unit
        return this
    }

    /**
     * Sets the 'marginTop' and 'marginBottom' CSS properties on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginTop' and 'marginBottom' CSS properties. Can be a valid CSS margin value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginY(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginTop = String(value) + unit
        this.element.style.marginBottom = String(value) + unit
        return this
    }

    /**
     * Sets the 'marginBlock' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginBlock' CSS property. Can be a valid CSS margin-block value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginBlock(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginBlock = String(value) + unit
        return this
    }

    /**
     * Sets the 'marginBlockEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginBlockEnd' CSS property. Can be a valid CSS margin-block-end value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginBlockEnd(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginBlockEnd = String(value) + unit
        return this
    }

    /**
     * Sets the 'marginBlockStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginBlockStart' CSS property. Can be a valid CSS margin-block-start value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginBlockStart(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginBlockStart = String(value) + unit
        return this
    }

    /**
     * Sets the 'marginBottom' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginBottom' CSS property. Can be a valid CSS margin-bottom value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginBottom(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginBottom = String(value) + unit
        return this
    }

    /**
     * Sets the 'marginInline' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginInline' CSS property. Can be a valid CSS margin-inline value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginInline(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginInline = String(value) + unit
        return this
    }

    /**
     * Sets the 'marginInlineEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginInlineEnd' CSS property. Can be a valid CSS margin-inline-end value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginInlineEnd(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginInlineEnd = String(value) + unit
        return this
    }

    /**
     * Sets the 'marginInlineStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginInlineStart' CSS property. Can be a valid CSS margin-inline-start value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginInlineStart(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginInlineStart = String(value) + unit
        return this
    }

    /**
     * Sets the 'marginLeft' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginLeft' CSS property. Can be a valid CSS margin-left value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginLeft(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginLeft = String(value) + unit
        return this
    }

    /**
     * Sets the 'marginRight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginRight' CSS property. Can be a valid CSS margin-right value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginRight(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginRight = String(value) + unit
        return this
    }

    /**
     * Sets the 'marginTop' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'marginTop' CSS property. Can be a valid CSS margin-top value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `AvitaElement` instance for chaining.
     */
    marginTop(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.marginTop = String(value) + unit
        return this
    }

    /**
     * Sets the 'mask' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'mask' CSS property. Can be a valid CSS mask value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    mask(value: string) {
        this.element.style.mask = value
        return this
    }

    /**
     * Sets the 'maskImage' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maskImage' CSS property. Can be a valid CSS mask-image value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    maskImage(value: string) {
        this.element.style.maskImage = value
        return this
    }

    /**
     * Sets the 'maskMode' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maskMode' CSS property. Can be a valid CSS mask-mode value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    maskMode(value: AvitaTypes.MaskMode) {
        this.element.style.maskMode = value
        return this
    }

    /**
     * Sets the 'maskOrigin' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maskOrigin' CSS property. Can be a valid CSS mask-origin value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    maskOrigin(value: AvitaTypes.MaskOrigin) {
        this.element.style.maskOrigin = value
        return this
    }

    /**
     * Sets the 'maskPosition' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maskPosition' CSS property. Can be a valid CSS mask-position value, either a single value or an array of two values.
     * @returns The current `AvitaElement` instance for chaining.
     */
    maskPosition(value: AvitaTypes.MaskPosition) {
        if (Array.isArray(value)) {
            this.element.style.maskPosition = value.join(" ")
            return this
        }
        this.element.style.maskPosition = value
        return this
    }

    /**
     * Sets the 'maskRepeat' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maskRepeat' CSS property. Can be a valid CSS mask-repeat value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    maskRepeat(value: AvitaTypes.MaskRepeat) {
        this.element.style.maskRepeat = value
        return this
    }

    /**
     * Sets the 'maskSize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maskSize' CSS property. Can be a valid CSS mask-size value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    maskSize(value: AvitaTypes.MaskSize) {
        this.element.style.maskSize = value
        return this
    }

    /**
     * Sets the 'maxBlockSize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maxBlockSize' CSS property. Can be a valid CSS length value, either a string or a number.
     * @returns The current `AvitaElement` instance for chaining.
     */
    maxBlockSize(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.maxBlockSize = String(value) + unit
        return this
    }

    /**
     * Sets the 'maxHeight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maxHeight' CSS property. Can be a valid CSS length value, either a string or a number.
     * @returns The current `AvitaElement` instance for chaining.
     */
    maxHeight(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.maxHeight = String(value) + unit
        return this
    }

    /**
     * Sets the 'maxInlineSize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maxInlineSize' CSS property. Can be a valid CSS length value, either a string or a number.
     * @returns The current `AvitaElement` instance for chaining.
     */
    maxInlineSize(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.maxInlineSize = String(value) + unit
        return this
    }

    /**
     * Sets the 'maxWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'maxWidth' CSS property. Can be a valid CSS length value, either a string or a number.
     * @returns The current `AvitaElement` instance for chaining.
     */
    maxWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.maxWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'minBlockSize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'minBlockSize' CSS property. Can be a valid CSS length value, either a string or a number.
     * @returns The current `AvitaElement` instance for chaining.
     */
    minBlockSize(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.minBlockSize = String(value) + unit
        return this
    }

    /**
     * Sets the 'minHeight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'minHeight' CSS property. Can be a valid CSS length value, either a string or a number.
     * @returns The current `AvitaElement` instance for chaining.
     */
    minHeight(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.minHeight = String(value) + unit
        return this
    }

    /**
     * Sets the 'minInlineSize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'minInlineSize' CSS property. Can be a valid CSS length value, either a string or a number.
     * @returns The current `AvitaElement` instance for chaining.
     */
    minInlineSize(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.minInlineSize = String(value) + unit
        return this
    }

    /**
     * Sets the 'minWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'minWidth' CSS property. Can be a valid CSS length value, either a string or a number.
     * @returns The current `AvitaElement` instance for chaining.
     */
    minWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.minWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'mixBlendMode' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'mixBlendMode' CSS property. Must be a valid CSS `mix-blend-mode` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    mixBlendMode(value: AvitaTypes.MixBlendMode) {
        this.element.style.mixBlendMode = value
        return this
    }

    /**
     * Sets the 'objectFit' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'objectFit' CSS property. Must be a valid CSS `object-fit` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    objectFit(value: AvitaTypes.ObjectFit) {
        this.element.style.objectFit = value
        return this
    }

    /**
     * Sets the 'objectPosition' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'objectPosition' CSS property. Must be a valid CSS `object-position` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    objectPosition(value: string) {
        this.element.style.objectPosition = value
        return this
    }

    /**
     * Sets the 'offset' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'offset' CSS property. Must be a valid CSS `offset` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    offset(value: string) {
        this.element.style.offset = value
        return this
    }

    /**
     * Sets the 'offsetAnchor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'offsetAnchor' CSS property. Must be a valid CSS `offset-anchor` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    offsetAnchor(value: string) {
        this.element.style.offsetAnchor = value
        return this
    }

    /**
     * Sets the 'offsetDistance' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'offsetDistance' CSS property. Must be a valid CSS `offset-distance` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    offsetDistance(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.offsetDistance = String(value) + unit
        return this
    }

    /**
     * Sets the 'offsetPath' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'offsetPath' CSS property. Must be a valid CSS `offset-path` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    offsetPath(value: string) {
        this.element.style.offsetPath = value
        return this
    }

    /**
     * Sets the 'offsetRotate' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'offsetRotate' CSS property. Must be a valid CSS `offset-rotate` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    offsetRotate(value: string) {
        this.element.style.offsetRotate = value
        return this
    }

    /**
     * Sets the 'opacity' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'opacity' CSS property. Must be a valid CSS `opacity` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    opacity(value: number | string) {
        this.element.style.opacity = String(value)
        return this
    }

    /**
     * Sets the 'order' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'order' CSS property. Must be a valid CSS `order` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    order(value: number | string) {
        this.element.style.order = String(value)
        return this
    }

    /**
     * Sets the 'orphans' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'orphans' CSS property. Must be a valid CSS `orphans` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    orphans(value: number | string) {
        this.element.style.orphans = String(value)
        return this
    }

    /**
     * Sets the 'outline' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'outline' CSS property. Must be a valid CSS `outline` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    outline(value: string) {
        this.element.style.outline = value
        return this
    }

    /**
     * Sets the 'outlineColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'outlineColor' CSS property. Must be a valid CSS `outline-color` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    outlineColor(value: AvitaTypes.AvitaColorType | string) {
        this.element.style.outlineColor = String(value)
        return this
    }

    /**
     * Sets the 'outlineOffset' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'outlineOffset' CSS property. Must be a valid CSS `outline-offset` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    outlineOffset(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.outlineOffset = String(value) + unit
        return this
    }

    /**
     * Sets the 'outlineStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'outlineStyle' CSS property. Must be a valid CSS `outline-style` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    /**
     * Sets the 'outlineStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'outlineStyle' CSS property. Must be a valid CSS `outline-style` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    outlineStyle(value: AvitaTypes.OutlineStyle) {
        this.element.style.outlineStyle = value
        return this
    }

    /**
     * Sets the 'outlineWidth' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'outlineWidth' CSS property. Must be a valid CSS `outline-width` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    outlineWidth(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.outlineWidth = String(value) + unit
        return this
    }

    /**
     * Sets the 'overflow' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overflow' CSS property. Must be a valid CSS `overflow` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overflow(value: AvitaTypes.Overflow): this

    /**
     * Sets the 'overflow-x' and 'overflow-y' CSS properties on the current `AvitaElement` instance.
     * @param overflowX - The value to set for the 'overflow-x' CSS property. Must be a valid CSS `overflow` value.
     * @param overflowY - The value to set for the 'overflow-y' CSS property. Must be a valid CSS `overflow` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overflow(
        overflowX: AvitaTypes.Overflow,
        overflowY: AvitaTypes.Overflow
    ): this

    overflow(
        valueOrX: AvitaTypes.Overflow,
        overflowY?: AvitaTypes.Overflow
    ): this {
        if (overflowY === undefined) {
            // Single value: set overflow for both x and y
            this.element.style.overflow = valueOrX
        } else {
            // Two values: set overflow-x and overflow-y separately
            this.element.style.overflowX = valueOrX
            this.element.style.overflowY = overflowY
        }
        return this
    }

    /**
     * Sets the 'overflowAnchor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overflowAnchor' CSS property. Must be a valid CSS `overflow-anchor` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overflowAnchor(value: AvitaTypes.OverflowAnchor) {
        this.element.style.overflowAnchor = value
        return this
    }

    /**
     * Sets the 'overflowWrap' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overflowWrap' CSS property. Must be a valid CSS `overflow-wrap` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overflowWrap(value: AvitaTypes.OverflowWrap) {
        this.element.style.overflowWrap = value
        return this
    }

    /**
     * Sets the 'overflowX' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overflowX' CSS property. Must be a valid CSS `overflow` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overflowX(value: AvitaTypes.Overflow) {
        this.element.style.overflowX = value
        return this
    }

    /**
     * Sets the 'overflowY' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overflowY' CSS property. Must be a valid CSS `overflow-y` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overflowY(value: AvitaTypes.Overflow) {
        this.element.style.overflowY = value
        return this
    }

    /**
     * Sets the 'overscrollBehavior' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overscrollBehavior' CSS property. Must be a valid CSS `overscroll-behavior` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overscrollBehavior(value: AvitaTypes.OverscrollBehavior) {
        this.element.style.overscrollBehavior = value
        return this
    }

    /**
     * Sets the 'overscrollBehaviorBlock' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overscrollBehaviorBlock' CSS property. Must be a valid CSS `overscroll-behavior-block` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overscrollBehaviorBlock(value: AvitaTypes.OverscrollBehavior) {
        this.element.style.overscrollBehaviorBlock = value
        return this
    }

    /**
     * Sets the 'overscrollBehaviorInline' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overscrollBehaviorInline' CSS property. Must be a valid CSS `overscroll-behavior-inline` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overscrollBehaviorInline(value: AvitaTypes.OverscrollBehavior) {
        this.element.style.overscrollBehaviorInline = value
        return this
    }

    /**
     * Sets the 'overscrollBehaviorX' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overscrollBehaviorX' CSS property. Must be a valid CSS `overscroll-behavior-x` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overscrollBehaviorX(value: AvitaTypes.OverscrollBehavior) {
        this.element.style.overscrollBehaviorX = value
        return this
    }

    /**
     * Sets the 'overscrollBehaviorY' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'overscrollBehaviorY' CSS property. Must be a valid CSS `overscroll-behavior-y` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    overscrollBehaviorY(value: AvitaTypes.OverscrollBehavior) {
        this.element.style.overscrollBehaviorY = value
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
                break
            case 2:
                this.element.style.padding = `${processValue(
                    values[0]
                )} ${processValue(values[1])}`
                break
            case 3:
                this.element.style.padding = `${processValue(
                    values[0]
                )} ${processValue(values[1])} ${processValue(values[2])}`
                break
            case 4:
                this.element.style.padding = `${processValue(
                    values[0]
                )} ${processValue(values[1])} ${processValue(
                    values[2]
                )} ${processValue(values[3])}`
                break
            default:
                throw new Error(
                    "Invalid number of arguments provided to padding(). Must be 1, 2, 3, or 4."
                )
        }

        return this
    }

    /**
     * Sets the 'paddingLeft' and 'paddingRight' CSS properties on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingLeft' and 'paddingRight' CSS properties. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingX(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingLeft = String(value) + unit
        this.element.style.paddingRight = String(value) + unit
        return this
    }

    /**
     * Sets the 'paddingTop' and 'paddingBottom' CSS properties on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingTop' and 'paddingBottom' CSS properties. Can be a string or number, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingY(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingTop = String(value) + unit
        this.element.style.paddingBottom = String(value) + unit
        return this
    }

    /**
     * Sets the 'paddingBlock' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingBlock' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingBlock(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingBlock = String(value) + unit
        return this
    }

    /**
     * Sets the 'paddingBlockEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingBlockEnd' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingBlockEnd(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingBlockEnd = String(value) + unit
        return this
    }

    /**
     * Sets the 'paddingBlockStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingBlockStart' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingBlockStart(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingBlockStart = String(value) + unit
        return this
    }

    /**
     * Sets the 'paddingBottom' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingBottom' CSS property. Can be a string or number, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingBottom(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingBottom = String(value) + unit
        return this
    }

    /**
     * Sets the 'paddingInline' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingInline' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingInline(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingInline = String(value) + unit
        return this
    }

    /**
     * Sets the 'paddingInlineEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingInlineEnd' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingInlineEnd(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingInlineEnd = String(value) + unit
        return this
    }

    /**
     * Sets the 'paddingInlineStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingInlineStart' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingInlineStart(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingInlineStart = String(value) + unit
        return this
    }

    /**
     * Sets the 'paddingLeft' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingLeft' CSS property. Can be a string or number, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingLeft(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingLeft = String(value) + unit
        return this
    }

    /**
     * Sets the 'paddingRight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingRight' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingRight(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingRight = String(value) + unit
        return this
    }

    /**
     * Sets the 'paddingTop' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paddingTop' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paddingTop(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.paddingTop = String(value) + unit
        return this
    }

    /**
     * Sets the 'pageBreakAfter' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'pageBreakAfter' CSS property. Can be a value from the `AvitaTypes.PageBreak` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    pageBreakAfter(value: AvitaTypes.PageBreak) {
        this.element.style.pageBreakAfter = value
        return this
    }

    /**
     * Sets the 'pageBreakBefore' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'pageBreakBefore' CSS property. Can be a value from the `AvitaTypes.PageBreak` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    pageBreakBefore(value: AvitaTypes.PageBreak) {
        this.element.style.pageBreakBefore = value
        return this
    }

    /**
     * Sets the 'pageBreakInside' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'pageBreakInside' CSS property. Can be a value from the `AvitaTypes.PageBreak` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    pageBreakInside(value: AvitaTypes.PageBreak) {
        this.element.style.pageBreakInside = value
        return this
    }

    /**
     * Sets the 'paintOrder' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'paintOrder' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    paintOrder(value: string) {
        this.element.style.paintOrder = value
        return this
    }

    /**
     * Sets the 'perspective' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'perspective' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `AvitaElement` instance for chaining.
     */
    perspective(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.perspective = String(value) + unit
        return this
    }

    /**
     * Sets the 'perspectiveOrigin' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'perspectiveOrigin' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    perspectiveOrigin(value: string) {
        this.element.style.perspectiveOrigin = value
        return this
    }

    /**
     * Sets the 'placeContent' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'placeContent' CSS property. Can be a value from the `AvitaTypes.PlaceContent` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    placeContent(value: AvitaTypes.PlaceContent) {
        this.element.style.placeContent = value
        return this
    }

    /**
     * Sets the 'placeItems' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'placeItems' CSS property. Can be a value from the `AvitaTypes.PlaceItems` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    placeItems(value: AvitaTypes.PlaceItems) {
        this.element.style.placeItems = value
        return this
    }

    /**
     * Sets the 'placeSelf' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'placeSelf' CSS property. Can be a value from the `AvitaTypes.PlaceSelf` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    placeSelf(value: AvitaTypes.PlaceSelf) {
        this.element.style.placeSelf = value
        return this
    }

    /**
     * Sets the 'pointerEvents' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'pointerEvents' CSS property. Can be a value from the `AvitaTypes.PointerEvents` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    pointerEvents(value: AvitaTypes.PointerEvents) {
        this.element.style.pointerEvents = value
        return this
    }

    /**
     * Sets the 'position' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'position' CSS property. Can be a value from the `AvitaTypes.Position` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    position(value: AvitaTypes.Position) {
        this.element.style.position = value
        return this
    }

    /**
     * Sets the 'quotes' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'quotes' CSS property.
     * @returns The current `AvitaElement` instance for chaining.
     */
    quotes(value: string) {
        this.element.style.quotes = value
        return this
    }

    /**
     * Sets the 'resize' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'resize' CSS property. Can be a value from the `AvitaTypes.Resize` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    resize(value: AvitaTypes.Resize) {
        this.element.style.resize = value
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
        return this
    }

    /**
     * Sets the 'rotate' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'rotate' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    rotate(value: string | number): this {
        const unit = typeof value === "string" ? "" : "deg"
        this.element.style.rotate = String(value) + unit
        return this
    }

    /**
     * Sets the 'scale' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scale' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scale(value: string | number) {
        this.element.style.scale = String(value)
        return this
    }

    /**
     * Sets the 'scrollBehavior' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollBehavior' CSS property. Can be a value from the `AvitaTypes.ScrollBehavior` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollBehavior(value: AvitaTypes.ScrollBehavior) {
        this.element.style.scrollBehavior = value
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
        return this
    }

    /**
     * Sets the 'scrollMarginBlock' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollMarginBlock' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollMarginBlock(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollMarginBlock = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollMarginBlockEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollMarginBlockEnd' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollMarginBlockEnd(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollMarginBlockEnd = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollMarginBlockStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollMarginBlockStart' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollMarginBlockStart(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollMarginBlockStart = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollMarginBottom' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollMarginBottom' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollMarginBottom(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollMarginBottom = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollMarginInline' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollMarginInline' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollMarginInline(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollMarginInline = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollMarginInlineEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollMarginInlineEnd' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollMarginInlineEnd(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollMarginInlineEnd = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollMarginInlineStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollMarginInlineStart' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollMarginInlineStart(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollMarginInlineStart = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollMarginLeft' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollMarginLeft' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollMarginLeft(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollMarginLeft = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollMarginRight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollMarginRight' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollMarginRight(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollMarginRight = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollMarginTop' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollMarginTop' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollMarginTop(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollMarginTop = String(value) + unit
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
        return this
    }

    /**
     * Sets the 'scrollPaddingBlock' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollPaddingBlock' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollPaddingBlock(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollPaddingBlock = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollPaddingBlockEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollPaddingBlockEnd' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollPaddingBlockEnd(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollPaddingBlockEnd = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollPaddingBlockStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollPaddingBlockStart' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollPaddingBlockStart(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollPaddingBlockStart = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollPaddingBottom' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollPaddingBottom' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollPaddingBottom(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollPaddingBottom = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollPaddingBottom' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollPaddingBottom' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollPaddingInline(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollPaddingInline = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollPaddingInlineEnd' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollPaddingInlineEnd' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollPaddingInlineEnd(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollPaddingInlineEnd = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollPaddingInlineStart' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollPaddingInlineStart' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollPaddingInlineStart(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollPaddingInlineStart = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollPaddingLeft' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollPaddingLeft' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollPaddingLeft(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollPaddingLeft = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollPaddingRight' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollPaddingRight' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollPaddingRight(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollPaddingRight = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollPaddingTop' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollPaddingTop' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollPaddingTop(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.scrollPaddingTop = String(value) + unit
        return this
    }

    /**
     * Sets the 'scrollSnapAlign' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollSnapAlign' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollSnapAlign(value: string) {
        this.element.style.scrollSnapAlign = value
        return this
    }

    /**
     * Sets the 'scrollSnapStop' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollSnapStop' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollSnapStop(value: string) {
        this.element.style.scrollSnapStop = value
        return this
    }

    /**
     * Sets the 'scrollSnapType' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'scrollSnapType' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    scrollSnapType(value: string) {
        this.element.style.scrollSnapType = value
        return this
    }

    /**
     * Sets the 'shapeImageThreshold' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'shapeImageThreshold' CSS property. Must be a number.
     * @returns The current `AvitaElement` instance for chaining.
     */
    shapeImageThreshold(value: number) {
        this.element.style.shapeImageThreshold = String(value)
        return this
    }

    /**
     * Sets the 'shapeMargin' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'shapeMargin' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    shapeMargin(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.shapeMargin = String(value) + unit
        return this
    }

    /**
     * Sets the 'shapeOutside' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'shapeOutside' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    shapeOutside(value: string) {
        this.element.style.shapeOutside = value
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
        return this
    }

    /**
     * Sets the 'tableLayout' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'tableLayout' CSS property. Can be a string value from the `AvitaTypes.TableLayout` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    tableLayout(value: AvitaTypes.TableLayout) {
        this.element.style.tableLayout = value
        return this
    }

    /**
     * Sets the 'textAlign' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textAlign' CSS property. Must be a valid `AvitaTypes.TextAlign` value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textAlign(value: AvitaTypes.TextAlign) {
        this.element.style.textAlign = value
        return this
    }

    /**
     * Sets the 'textAlignLast' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textAlignLast' CSS property. Can be a value from the `AvitaTypes.TextAlignLast` type.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textAlignLast(value: AvitaTypes.TextAlignLast) {
        this.element.style.textAlignLast = value
        return this
    }

    /**
     * Sets the 'textCombineUpright' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textCombineUpright' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textCombineUpright(value: string) {
        this.element.style.textCombineUpright = value
        return this
    }

    /**
     * Sets the 'textDecoration' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textDecoration' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textDecoration(value: string) {
        this.element.style.textDecoration = value
        return this
    }

    /**
     * Sets the 'textDecorationColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textDecorationColor' CSS property. Can be a string value or an `AvitaTypes.AvitaColorType`.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textDecorationColor(value: string | AvitaTypes.AvitaColorType) {
        this.element.style.textDecorationColor = value.toString()
        return this
    }

    /**
     * Sets the 'textDecorationLine' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textDecorationLine' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textDecorationLine(value: string) {
        this.element.style.textDecorationLine = value
        return this
    }

    /**
     * Sets the 'textDecorationStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textDecorationStyle' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textDecorationStyle(value: string) {
        this.element.style.textDecorationStyle = value
        return this
    }

    /**
     * Sets the 'textDecorationThickness' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textDecorationThickness' CSS property. Can be a string value or a number representing a pixel value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textDecorationThickness(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.textDecorationThickness = String(value) + unit
        return this
    }

    /**
     * Sets the 'textEmphasis' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textEmphasis' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textEmphasis(value: string) {
        this.element.style.textEmphasis = value
        return this
    }

    /**
     * Sets the 'textEmphasisColor' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textEmphasisColor' CSS property. Can be a string value or an `AvitaTypes.AvitaColorType`.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textEmphasisColor(value: string | AvitaTypes.AvitaColorType) {
        this.element.style.textEmphasisColor = value.toString()
        return this
    }

    /**
     * Sets the 'textEmphasisPosition' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textEmphasisPosition' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textEmphasisPosition(value: string) {
        this.element.style.textEmphasisPosition = value
        return this
    }

    /**
     * Sets the 'textEmphasisStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textEmphasisStyle' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textEmphasisStyle(value: string) {
        this.element.style.textEmphasisStyle = value
        return this
    }

    /**
     * Sets the 'textIndent' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textIndent' CSS property. Can be a string value or a number representing a pixel value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textIndent(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.textIndent = String(value) + unit
        return this
    }

    /**
     * Sets the 'textOrientation' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textOrientation' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textOrientation(value: string) {
        this.element.style.textOrientation = value
        return this
    }

    /**
     * Sets the 'textOverflow' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textOverflow' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textOverflow(value: string) {
        this.element.style.textOverflow = value
        return this
    }

    /**
     * Sets the 'textRendering' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textRendering' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textRendering(value: string) {
        this.element.style.textRendering = value
        return this
    }

    /**
     * Sets the 'textShadow' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textShadow' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textShadow(value: string) {
        this.element.style.textShadow = value
        return this
    }

    /**
     * Sets the 'textTransform' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textTransform' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textTransform(value: string) {
        this.element.style.textTransform = value
        return this
    }

    /**
     * Sets the 'textUnderlineOffset' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textUnderlineOffset' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textUnderlineOffset(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.textUnderlineOffset = String(value) + unit
        return this
    }

    /**
     * Sets the 'textUnderlinePosition' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'textUnderlinePosition' CSS property. Can be a string value from the `AvitaTypes.TextUnderlinePosition` enum.
     * @returns The current `AvitaElement` instance for chaining.
     */
    textUnderlinePosition(value: AvitaTypes.TextUnderlinePosition) {
        this.element.style.textUnderlinePosition = value
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
        return this
    }

    /**
     * Sets the 'touchAction' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'touchAction' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    touchAction(value: string) {
        this.element.style.touchAction = value
        return this
    }

    /**
     * Sets the 'transform' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transform' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transform(value: string) {
        this.element.style.transform = value
        return this
    }

    /**
     * Sets the 'transformBox' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transformBox' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transformBox(value: string) {
        this.element.style.transformBox = value
        return this
    }

    /**
     * Sets the 'transformOrigin' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transformOrigin' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transformOrigin(value: string) {
        this.element.style.transformOrigin = value
        return this
    }

    /**
     * Sets the 'transformStyle' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transformStyle' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transformStyle(value: string) {
        this.element.style.transformStyle = value
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

    transition(value?: string): this {
        if (value === undefined) {
            // Set default transition
            this.element.style.transition = "all 0.1s ease-in-out"
        } else {
            // Set custom transition
            this.element.style.transition = value
        }
        return this
    }

    /**
     * Sets the 'transitionDelay' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transitionDelay' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transitionDelay(value: string | number) {
        const unit = typeof value === "string" ? "" : "s"
        this.element.style.transitionDelay = numberToSeconds(value) + unit
        return this
    }

    /**
     * Sets the 'transitionDuration' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transitionDuration' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transitionDuration(value: string | number) {
        const unit = typeof value === "string" ? "" : "s"
        this.element.style.transitionDuration = numberToSeconds(value) + unit
        return this
    }

    /**
     * Sets the 'transitionProperty' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transitionProperty' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transitionProperty(value: string) {
        this.element.style.transitionProperty = value
        return this
    }

    /**
     * Sets the 'transitionTimingFunction' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'transitionTimingFunction' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transitionTimingFunction(value: string) {
        this.element.style.transitionTimingFunction = value
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

        if (
            typeof xOrValue === "string" &&
            y === undefined &&
            z === undefined
        ) {
            // If only one string argument is provided, treat it as the full translate value.
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
        return this
    }

    /**
     * Sets the 'translateY' CSS translate property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'translateY' transform. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    translateY(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.transform = `0 ${value}${unit} 0`
        return this
    }

    /**
     * Sets the 'translateZ' CSS translate property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'translateZ' transform. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    translateZ(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.transform = `0 0 ${value}${unit}`
        return this
    }

    /**
     * Sets the 'unicodeBidi' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'unicodeBidi' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    unicodeBidi(value: string) {
        this.element.style.unicodeBidi = value
        return this
    }

    /**
     * Sets the 'userSelect' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'userSelect' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    userSelect(value: string) {
        this.element.style.userSelect = value
        return this
    }

    /**
     * Sets the 'verticalAlign' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'verticalAlign' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    verticalAlign(value: string) {
        this.element.style.verticalAlign = value
        return this
    }

    /**
     * Sets the 'visibility' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'visibility' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    visibility(value: string) {
        this.element.style.visibility = value
        return this
    }

    /**
     * Sets the 'whiteSpace' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'whiteSpace' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    whiteSpace(value: string) {
        this.element.style.whiteSpace = value
        return this
    }

    /**
     * Sets the 'wordBreak' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'wordBreak' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    wordBreak(value: string) {
        this.element.style.wordBreak = value
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
        return this
    }

    /**
     * Sets the 'widows' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'widows' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    widows(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.widows = String(value) + unit
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
        return this
    }

    /**
     * Sets the 'willChange' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'willChange' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    willChange(value: string) {
        this.element.style.willChange = value
        return this
    }

    /**
     * Sets the 'wordWrap' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'wordWrap' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    wordWrap(value: AvitaTypes.WordWrap) {
        this.element.style.wordWrap = value
        return this
    }

    /**
     * Sets the 'writingMode' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'writingMode' CSS property. Can be a string value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    writingMode(value: string) {
        this.element.style.writingMode = value
        return this
    }

    /**
     * Sets the 'zIndex' CSS property on the current `AvitaElement` instance.
     * @param value - The value to set for the 'zIndex' CSS property. Can be a string or number value.
     * @returns The current `AvitaElement` instance for chaining.
     */
    zIndex(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.zIndex = String(value) + unit
        return this
    }

    /**
     * Sets the 'opacity' CSS property on the current `AvitaElement` instance to 0.
     * @returns The current `AvitaElement` instance for chaining.
     */
    transparent() {
        this.element.style.opacity = "0"
        return this
    }

    /**
     * Sets the 'opacity' CSS property on the current `AvitaElement` instance to 0.5.
     * @returns The current `AvitaElement` instance for chaining.
     */
    translucent() {
        this.element.style.opacity = "0.5"
        return this
    }

    /**
     * Sets the 'opacity' CSS property on the current `AvitaElement` instance to 1.
     * @returns The current `AvitaElement` instance for chaining.
     */
    opaque() {
        this.element.style.opacity = "1"
        return this
    }

    /**
     * Shows the element by setting the 'display' CSS property to 'flex'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    show() {
        this.element.style.display = "flex"
        return this
    }

    /**
     * Hides the element by setting the 'display' CSS property to 'none'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    hide() {
        this.element.style.display = "none"
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
     * Centers the child elements vertically by setting the 'display' CSS property to 'flex' and setting the 'alignItems' CSS property to 'center'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    center(type: "vertical"): this

    /**
     * Centers the child elements horizontally by setting the 'display' CSS property to 'flex' and setting the 'justifyContent' CSS property to 'center'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    center(type: "horizontal"): this

    /**
     * Centers the element itself by setting its position to absolute and transforming its position.
     * @param type - Type of centering.
     * @returns The current `AvitaElement` instance for chaining.
     */
    center(type: "absolute"): this

    center(type?: "self" | "vertical" | "horizontal" | "absolute"): this {
        if (type === undefined) {
            // Center child elements both vertically and horizontally
            this.element.style.display = "flex"
            this.element.style.justifyContent = "center"
            this.element.style.alignItems = "center"
        } else if (type === "self") {
            // Center the element itself using margin auto
            this.element.style.margin = "auto"
        } else if (type === "vertical") {
            // Center child elements vertically
            this.element.style.display = "flex"
            this.element.style.alignItems = "center"
        } else if (type === "horizontal") {
            // Center child elements horizontally
            this.element.style.display = "flex"
            this.element.style.justifyContent = "center"
        } else if (type === "absolute") {
            // Center the element itself absolutely
            this.element.style.position = "absolute"
            this.element.style.top = "50%"
            this.element.style.left = "50%"
            this.element.style.transform = "translate(-50%, -50%)"
        }
        return this
    }

    /**
     * Sets the 'position' CSS property to 'absolute' on the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    absolute() {
        this.element.style.position = "absolute"
        return this
    }

    /**
     * Sets the 'position' CSS property to 'relative' on the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    relative() {
        this.element.style.position = "relative"
        return this
    }

    /**
     * Sets the 'position' CSS property to 'fixed' on the current `AvitaElement` instance.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fixed() {
        this.element.style.position = "fixed"
        return this
    }

    /**
     * Sets the display property of the current `AvitaElement` instance to 'flex'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    flex() {
        this.element.style.display = "flex"
        return this
    }

    /**
     * Sets the display property of the current `AvitaElement` instance to 'grid'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    grid() {
        this.element.style.display = "grid"
        return this
    }

    /**
     * Sets the font weight to 'bold'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bold(): this {
        this.element.style.fontWeight = "bold"
        return this
    }

    /**
     * Sets the font weight to 'normal'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    normal(): this {
        this.element.style.fontWeight = "normal"
        return this
    }

    /**
     * Sets the font weight to 'lighter'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    lighter(): this {
        this.element.style.fontWeight = "lighter"
        return this
    }

    /**
     * Sets the font weight to 'bolder'.
     * @returns The current `AvitaElement` instance for chaining.
     */
    bolder(): this {
        this.element.style.fontWeight = "bolder"
        return this
    }

    /**
     * Sets the stroke color of the element.
     * @param value - The CSS color value to set as the stroke.
     * @returns The current `AvitaElement` instance for chaining.
     */
    stroke(value: string) {
        this.element.style.stroke = value
        return this
    }

    /**
     * Sets the stroke width of the element.
     * @param value - The CSS length value to set as the stroke width. Can be a number (in pixels) or a string.
     * @returns The current `AvitaElement` instance for chaining.
     */
    strokeWidth(value: string | number): this {
        const unit = typeof value === "string" ? "" : "px"
        this.element.style.strokeWidth = String(value) + unit
        return this
    }

    /**
     * Sets the stroke opacity of the element.
     * @param value - The stroke opacity value to set (between 0 and 1).
     * @returns The current `AvitaElement` instance for chaining.
     */
    strokeOpacity(value: number): this {
        this.element.style.strokeOpacity = value.toString()
        return this
    }

    /**
     * Sets the stroke linecap of the element.
     * @param value - The CSS value to set as the stroke linecap (e.g., "butt", "round", "square").
     * @returns The current `AvitaElement` instance for chaining.
     */
    linecap(value: "butt" | "round" | "square"): this {
        this.element.style.strokeLinecap = value
        return this
    }

    /**
     * Sets the stroke linejoin of the element.
     * @param value - The CSS value to set as the stroke linejoin (e.g., "miter", "round", "bevel").
     * @returns The current `AvitaElement` instance for chaining.
     */
    linejoin(value: "miter" | "round" | "bevel"): this {
        this.element.style.strokeLinejoin = value
        return this
    }

    /**
     * Sets the stroke dash array of the element.
     * @param value - The CSS value to set as the stroke dash array.
     * @returns The current `AvitaElement` instance for chaining.
     */
    dasharray(value: string): this {
        this.element.style.strokeDasharray = value
        return this
    }

    /**
     * Sets the skew transformation angle of the element along the X-axis.
     * @param value - The skew angle in degrees.
     * @returns The current `AvitaElement` instance for chaining.
     */
    skewX(value: number): this {
        this.element.style.transform = `skewX(${value}deg)`
        return this
    }

    /**
     * Sets the skew transformation angle of the element along the Y-axis.
     * @param value - The skew angle in degrees.
     * @returns The current `AvitaElement` instance for chaining.
     */
    skewY(value: number): this {
        this.element.style.transform = `skewY(${value}deg)`
        return this
    }

    /**
     * Sets the transformation matrix of the element.
     * @param value - The CSS transform matrix value to set.
     * @returns The current `AvitaElement` instance for chaining.
     */
    matrix(value: string): this {
        this.element.style.transform = value
        return this
    }

    /**
     * Sets the fill color of the element.
     * @param value - The CSS color value to set as the fill.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fill(value: string) {
        this.element.style.fill = value
        return this
    }

    /**
     * Sets the fill opacity of the element.
     * @param value - The fill opacity value to set (between 0 and 1).
     * @returns The current `AvitaElement` instance for chaining.
     */
    fillOpacity(value: number): this {
        this.element.style.fillOpacity = value.toString()
        return this
    }

    /**
     * Sets the element to be full-width and full-height.
     * @returns The current `AvitaElement` instance for chaining.
     */
    full() {
        this.element.style.width = "100%"
        this.element.style.height = "100%"
        return this
    }

    /**
     * Sets the element to be full-width.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fullX() {
        this.element.style.width = "100%"
        return this
    }

    /**
     * Sets the element to be full-height.
     * @returns The current `AvitaElement` instance for chaining.
     */
    fullY() {
        this.element.style.height = "100%"
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

        if (radius === undefined) {
            borderRadiusValue = "9999px"
        } else if (typeof radius === "number") {
            borderRadiusValue = `${radius}px`
        } else {
            borderRadiusValue = radius
        }

        this.element.style.borderRadius = borderRadiusValue
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
        let borderRadiusValue =
            radius === undefined
                ? "9999px"
                : typeof radius === "number"
                ? `${radius}px`
                : radius

        this.element.style.borderTopLeftRadius = borderRadiusValue
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
        let borderRadiusValue =
            radius === undefined
                ? "9999px"
                : typeof radius === "number"
                ? `${radius}px`
                : radius

        this.element.style.borderTopRightRadius = borderRadiusValue
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
        let borderRadiusValue =
            radius === undefined
                ? "9999px"
                : typeof radius === "number"
                ? `${radius}px`
                : radius

        this.element.style.borderBottomLeftRadius = borderRadiusValue
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
        let borderRadiusValue =
            radius === undefined
                ? "9999px"
                : typeof radius === "number"
                ? `${radius}px`
                : radius

        this.element.style.borderBottomRightRadius = borderRadiusValue
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
        let borderRadiusValue =
            radius === undefined
                ? "9999px"
                : typeof radius === "number"
                ? `${radius}px`
                : radius

        this.element.style.borderTopLeftRadius = borderRadiusValue
        this.element.style.borderTopRightRadius = borderRadiusValue
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
        let borderRadiusValue =
            radius === undefined
                ? "9999px"
                : typeof radius === "number"
                ? `${radius}px`
                : radius

        this.element.style.borderBottomLeftRadius = borderRadiusValue
        this.element.style.borderBottomRightRadius = borderRadiusValue
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
        let borderRadiusValue =
            radius === undefined
                ? "9999px"
                : typeof radius === "number"
                ? `${radius}px`
                : radius

        this.element.style.borderTopLeftRadius = borderRadiusValue
        this.element.style.borderBottomLeftRadius = borderRadiusValue
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
        let borderRadiusValue =
            radius === undefined
                ? "9999px"
                : typeof radius === "number"
                ? `${radius}px`
                : radius

        this.element.style.borderTopRightRadius = borderRadiusValue
        this.element.style.borderBottomRightRadius = borderRadiusValue
        return this
    }

    viewBox(x: number, y: number, width: number, height: number): this {
        if (this.element instanceof SVGElement) {
            this.element.setAttribute("viewBox", `${x} ${y} ${width} ${height}`)
        }
        return this
    }

    preserveAspectRatio(align: string, meetOrSlice: string): this {
        if (this.element instanceof SVGElement) {
            this.element.setAttribute(
                "preserveAspectRatio",
                `${align} ${meetOrSlice}`
            )
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
 * Like jQuery, this function finds all elements in the DOM based on the provided selector. Then
 * it wraps the element as an `Avita` element and returns it (or an array of `Avita` elements if multiple elements are found).
 * @param selector - The selector to use to find the element in the DOM.
 * @returns `Avita` element (list) wrapping the found element(s).
 */
export const $ = Avita.find
