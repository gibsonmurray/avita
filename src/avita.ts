import { span, style } from "./elements"
import { camelToKebab, defaultStyles, generateClass } from "./utils"

type EL = EventListenerOrEventListenerObject

export default class Avita<T extends HTMLElement | SVGElement> {
    private element: T
    private elements: T[] = [] // mostly used when querying for multiple elements, otherwise empty
    private avitaChildren: Avita<T>[] = []

    /**
     * Creates a new instance of the Avita class.
     * @param tag - The tag name of the HTML element to create.
     */
    constructor(tag: string)

    /**
     * Creates a new instance of the Avita class.
     * @param element - The HTML element to wrap.
     */
    constructor(element: T)

    /**
     * Creates a new instance of the Avita class.
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
    static render<T extends HTMLElement | SVGElement>(
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
    static find<T extends HTMLElement | SVGElement>(selector: string): Avita<T>

    /**
     * Finds the element(s) with the given selector in the DOM tree.
     * @param selector - The CSS selector to match against.
     * @param raw - A boolean indicating whether to return the raw HTML element(s).
     * @returns The raw HTML element(s) matching the selector.
     * @throws {Error} If no element is found with the given selector.
     */
    static find<T extends HTMLElement | SVGElement>(
        selector: string,
        raw?: boolean
    ): T | T[]

    static find<T extends HTMLElement | SVGElement>(
        selector: string,
        raw?: boolean
    ): Avita<T> | T | T[] | null {
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

        return null
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
     * Sets the ID of the current `Avita` element.
     * @param id - The new ID to set for the `Avita` element.
     * @returns The current `Avita` instance for chaining.
     */
    id(id: string): this

    id(id?: string) {
        if (id === undefined) {
            return this.element.id
        }
        this.element.id = id
        return this
    }
    /**
     * Gets the CSS class(es) of the `Avita` instance.
     * @returns The current CSS classes as a string.
     */
    class(): string

    /**
     * Sets the CSS class(es) of the `Avita` instance, concatenating them with the existing classes.
     * @param className - The CSS class(es) to add to the element(s).
     * @returns The current Avita instance for chaining.
     */
    class(...classNames: string[]): this

    class(...classNames: string[]) {
        if (classNames.length === 0) {
            // Getter: Return the class names as a string
            return this.element.className
        } else {
            // Setter: Add the new classes
            this.addClass(...classNames)
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
    css(property: keyof CSSStyleDeclaration): string | undefined

    /**
     * Sets the inline styles of the element(s).
     * @note Use this method to set the value of a single property.
     * @param property - The CSS property to set.
     * @param value - The value to set for the CSS property.
     * @returns The current Avita instance for chaining.
     */
    css(property: keyof CSSStyleDeclaration, value: string): this

    /**
     * Sets the inline styles of the element(s).
     * @note Use this method to set multiple properties at once.
     * @param props - An object containing the CSS styles to apply to the element(s).
     * @returns The current Avita instance for chaining.
     */
    css(props: Partial<CSSStyleDeclaration>): this

    css(
        propertyOrProps?:
            | keyof CSSStyleDeclaration
            | Partial<CSSStyleDeclaration>,
        value?: string
    ): string | this | CSSStyleDeclaration | undefined {
        const computedStyle = getComputedStyle(this.element)

        if (propertyOrProps === undefined && value === undefined) {
            // Return all computed styles when no arguments are provided
            return computedStyle
        }

        if (typeof propertyOrProps === "string") {
            if (value === undefined) {
                // Get the value of a single CSS property
                return (
                    computedStyle.getPropertyValue(propertyOrProps) || undefined
                )
            } else {
                // Set a single CSS property
                this.applyStyle(
                    propertyOrProps as keyof CSSStyleDeclaration,
                    value
                )
                return this
            }
        }

        if (typeof propertyOrProps === "object") {
            // Set multiple CSS properties
            for (const [prop, val] of Object.entries(propertyOrProps)) {
                if (val !== undefined) {
                    this.applyStyle(
                        prop as keyof CSSStyleDeclaration,
                        String(val)
                    )
                }
            }
            return this
        }
    }

    /**
     * Applies the specified CSS style property and value to the current element and all elements in the Avita instance.
     * @param prop - The CSS property to apply.
     * @param val - The value to set for the CSS property.
     */
    private applyStyle(prop: keyof CSSStyleDeclaration, val: string) {
        if (this.element.style[prop] === undefined) return
        this.element.style[prop as any] = val
        this.elements.forEach((element) => {
            element.style[prop as any] = val
        })
    }

    /**
     * Gets all attributes of the element(s).
     * @returns The values of the specified attributes.
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
     * @returns The current Avita instance for chaining.
     */
    attr(name: string, value: string): this

    /**
     * Sets the specified attributes of the element(s).
     * @param attributes - An object containing the attributes to set on the element(s).
     * @returns The current Avita instance for chaining.
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
                // Set a single attribute
                this.setAttr(nameOrAttributes, value)
                return this
            }
        } else {
            // Set multiple attributes
            for (const [key, val] of Object.entries(nameOrAttributes)) {
                this.setAttr(key, val)
            }
            return this
        }
    }

    /**
     * Sets an attribute on the main element and all other elements in the collection.
     * @param name - The name of the attribute to set.
     * @param value - The value to set for the attribute.
     */
    private setAttr(name: string, value: string): void {
        this.element.setAttribute(name, value)
        if (this.elements.length > 0) {
            this.elements.forEach((element) => {
                element.setAttribute(name, value)
            })
        }
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
     * @returns The current Avita instance for chaining.
     */
    data(key: string, value: string): this

    /**
     * Sets multiple data attributes on the element.
     * @param dataAttributes - An object containing the data attributes to set on the element.
     * @returns The current Avita instance for chaining.
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
                // Set the value of the specified data attribute using the modularized method
                this.setData(keyOrDataAttributes, value)
                return this
            }
        } else {
            // Set multiple data attributes using the modularized method
            for (const [key, val] of Object.entries(keyOrDataAttributes)) {
                this.setData(key, val)
            }
            return this
        }
    }

    /**
     * Sets a data attribute on the main element and all other elements in the collection.
     * @param key - The name of the data attribute to set.
     * @param value - The value to set for the data attribute.
     */
    private setData(key: string, value: string): void {
        this.element.dataset[key] = value
        if (this.elements.length > 0) {
            this.elements.forEach((element) => {
                element.dataset[key] = value
            })
        }
    }

    /**
     * Sets the `src` attribute of the element.
     * @param value - The URL to set as the `src` attribute of the element.
     * @returns The current `Avita` instance for chaining.
     */
    src(value: string) {
        return this.attr("src", value)
    }

    /**
     * Sets the `href` attribute of the element.
     * @param value - The URL to set as the `href` attribute of the element.
     * @returns The current `Avita` instance for chaining.
     */
    href(value: string) {
        return this.attr("href", value)
    }

    /**
     * Sets the `alt` attribute of the element if it is an `HTMLImageElement`.
     * @param value - The alternative text to set for the image.
     * @returns The current `Avita` instance for chaining.
     */
    alt(value: string) {
        return this.attr("alt", value)
    }

    /**
     * Gets the `title` attribute of the element.
     * @returns The current `title` attribute value of the element or `undefined`.
     */
    title(): string | undefined

    /**
     * Sets the `title` attribute of the element.
     * @param value - The text to set as the `title` attribute of the element.
     * @returns The current `Avita` instance for chaining.
     */
    title(value: string): this

    title(value?: string): string | this | undefined {
        if (value !== undefined) {
            // Set the title attribute
            return this.attr("title", value)
        }
        // Get the title attribute
        if (this.element instanceof HTMLElement) {
            return this.element.title || undefined
        }
        return undefined
    }

    /**
     * Sets the text content of the element.
     * @param value - The text content to set for the element.
     * @returns The current `Avita` instance for chaining.
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
     * @returns The current `Avita` instance for chaining.
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
     * Appends the provided `Avita` instance to the current `Avita` instance.
     * @param child - The `Avita` instance to append to the current instance.
     * @returns The current `Avita` instance for chaining.
     */
    append(child: Avita<T>): this

    /**
     * Appends one or more `Avita` instances to the current `Avita` instance.
     * @param children - The `Avita` instances to append to the current instance.
     * @returns The current `Avita` instance for chaining.
     */
    append(...children: Avita<T>[]): this

    append(...children: Avita<T>[]): this {
        children.forEach((child) => {
            this.element.append(child.element)
            this.elements.forEach((el) => {
                // no clue why u would want to do this but here it is
                el.append(child.element.cloneNode(true))
            })
        })
        return this
    }

    /**
     * Prepends the provided `Avita` instance to the current `Avita` instance.
     * @param child - The `Avita` instance to prepend to the current instance.
     * @returns The current `Avita` instance for chaining.
     */
    prepend(child: Avita<T>): this

    /**
     * Prepends one or more `Avita` instances to the current `Avita` instance.
     * @param children - The `Avita` instances to prepend to the current instance.
     * @returns The current `Avita` instance for chaining.
     */
    prepend(...children: Avita<T>[]): this

    prepend(...children: Avita<T>[]): this {
        children.forEach((child) => {
            this.element.prepend(child.element)
            this.elements.forEach((el) => {
                // once again why? because we can...
                el.prepend(child.element.cloneNode(true))
            })
        })
        return this
    }

    /**
     * Removes the current `Avita` instance from the DOM.
     * @returns The current `Avita` instance for chaining.
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
     * Empties the child elements of the current `Avita` instance.
     * @returns The current `Avita` instance for chaining.
     */
    empty() {
        this.avitaChildren = []
        this.updateDOMChildren()
        return this
    }

    /**
     * Gets the child elements of the current `Avita` instance.
     * @returns An array of `Avita` instances representing the child elements.
     */
    children(): Avita<T>[]

    /**
     * Sets the child elements of the current `Avita` instance. This will remove any existing child elements.
     * @param elements - An array of `Avita` instances or strings to set as the child elements.
     * @returns The current `Avita` instance for chaining.
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
     * Removes the child element at the specified index from the current `Avita` instance.
     * @param index - The index of the child element to remove.
     * @returns The current `Avita` instance for chaining.
     */
    removeChild(index: number) {
        this.avitaChildren.splice(index, 1)
        this.updateDOMChildren()
        return this
    }

    /**
     * Updates the DOM children of the current `Avita` instance to match the `avitaChildren` array.
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
     * Replaces the current `Avita` instance's element with the provided `Avita` instance's element.
     * @param element - The `Avita` instance to replace the current instance with.
     * @returns The current `Avita` instance for chaining.
     */
    replace(element: Avita<T>): this {
        // Replace the main element
        this.element.replaceWith(element.element)

        // who knows why u would want this bruh BUT ITS HERE
        this.elements.forEach((el) => {
            el.replaceWith(element.element.cloneNode(true))
        })

        return this
    }

    /**
     * Gets the value of the current `Avita` instance if it is an `HTMLInputElement`.
     * @returns The value of the current `Avita` instance if it is an `HTMLInputElement`. Otherwise, returns an empty string.
     */
    value(): string

    /**
     * Sets the value of the current `Avita` instance if it is an `HTMLInputElement`.
     * @param value - The value to set for the `HTMLInputElement`.
     * @returns The current `Avita` instance for chaining.
     */
    value(value: string): this

    value(value?: string): string | this {
        if (!(this.element instanceof HTMLInputElement)) {
            // Return an empty string if the element is not an HTMLInputElement when getting
            return value === undefined ? "" : this
        }

        if (value === undefined) {
            // Getter: return the current value of the HTMLInputElement
            return this.element.value
        }

        // Setter: set the value and return `this` for chaining
        this.element.value = value
        return this
    }

    /**
     * Gets the placeholder text of the current `Avita` instance if it is an `HTMLInputElement`.
     * @returns The placeholder text of the input element, or `undefined` if it is not set.
     */
    placeholder(): string | undefined

    /**
     * Sets the placeholder text of the current `Avita` instance if it is an `HTMLInputElement`.
     * @param value - The placeholder text to set for the input element.
     * @returns The current `Avita` instance for chaining.
     */
    placeholder(value: string): this

    placeholder(value?: string): string | this | undefined {
        if (!(this.element instanceof HTMLInputElement)) {
            // Return undefined if the element is not an HTMLInputElement when getting
            return value === undefined ? undefined : this
        }
        if (value === undefined) {
            // Getter: return the current placeholder text of the HTMLInputElement
            return this.element.placeholder || undefined
        }
        // Setter: set the placeholder text and return `this` for chaining
        this.element.placeholder = value
        return this
    }

    /**
     * Returns a new `Avita` instance with the first element from the current `Avita` instance.
     * Typically only used with `find()`.
     * @returns A new `Avita` instance with the first element.
     */
    first() {
        return new Avita(this.elements[0])
    }

    /**
     * Returns a new `Avita` instance with the last element from the current `Avita` instance.
     * Typically only used with `find()`.
     * @returns A new `Avita` instance with the last element.
     */
    last() {
        return new Avita(this.elements[this.elements.length - 1])
    }

    // Event Listeners

    /**
     * Attaches an event listener to the current `Avita` instance. Works with both single and multiple elements.
     * @param event - The name of the event to listen for.
     * @param callback - The callback function to be executed when the event is triggered.
     * @returns The current `Avita` instance for chaining.
     */
    on(event: string, callback: EL): this {
        this.element.addEventListener(event, callback)
        if (this.elements && this.elements.length > 0) {
            this.elements.forEach((element) => {
                element.addEventListener(event, callback)
            })
        }
        return this
    }

    /**
     * Attaches hover event listeners to the current `Avita` instance.
     * Restores the original state when the mouse leaves the element.
     * @param onMouseEnter - The callback function to be executed when the mouse enters the element.
     * @returns The current `Avita` instance for chaining.
     */
    onHover(onMouseEnter: EL): this

    /**
     * Attaches hover event listeners to the current `Avita` instance.
     * Executes the provided callbacks when the mouse enters and exits the element.
     * @param onMouseEnter - The callback function to be executed when the mouse enters the element.
     * @param onMouseLeave - The callback function to be executed when the mouse leaves the element.
     * @returns The current `Avita` instance for chaining.
     */
    onHover(onMouseEnter: EL, onMouseLeave: EL): this

    onHover(onMouseEnter: EL, onMouseLeave?: EL): this {
        this.on("mouseover", onMouseEnter)
        if (onMouseLeave) {
            this.on("mouseout", onMouseLeave)
        }
        return this
    }

    /**
     * Attaches a click event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is clicked.
     * @returns The current `Avita` instance for chaining.
     */
    onClick(callback: EL) {
        return this.on("click", callback)
    }

    /**
     * Attaches a double click event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is double clicked.
     * @returns The current `Avita` instance for chaining.
     */
    onDblClick(callback: EL) {
        return this.on("dblclick", callback)
    }

    /**
     * Attaches a copy event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is copied.
     * @returns The current `Avita` instance for chaining.
     */
    onCopy(callback: EL) {
        return this.on("copy", callback)
    }

    /**
     * Attaches a cut event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is cut.
     * @returns The current `Avita` instance for chaining.
     */
    onCut(callback: EL) {
        return this.on("cut", callback)
    }

    /**
     * Attaches a paste event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is pasted to.
     * @returns The current `Avita` instance for chaining.
     */
    onPaste(callback: EL) {
        return this.on("paste", callback)
    }

    /**
     * Attaches a composition start event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the composition starts on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onCompositionStart(callback: EL) {
        return this.on("compositionstart", callback)
    }

    /**
     * Attaches a composition update event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the composition is updated on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onCompositionUpdate(callback: EL) {
        return this.on("compositionupdate", callback)
    }

    /**
     * Attaches a composition end event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the composition ends on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onCompositionEnd(callback: EL) {
        return this.on("compositionend", callback)
    }

    /**
     * Attaches a change event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element's value changes.
     * @returns The current `Avita` instance for chaining.
     */
    onChange(callback: EL) {
        return this.on("change", callback)
    }

    /**
     * Attaches an input event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element's value is input.
     * @returns The current `Avita` instance for chaining.
     */
    onInput(callback: EL) {
        return this.on("input", callback)
    }

    /**
     * Attaches a submit event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is submitted.
     * @returns The current `Avita` instance for chaining.
     */
    onSubmit(callback: EL) {
        return this.on("submit", callback)
    }

    /**
     * Attaches an invalid event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is invalid.
     * @returns The current `Avita` instance for chaining.
     */
    onInvalid(callback: EL) {
        return this.on("invalid", callback)
    }

    /**
     * Attaches a reset event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is reset.
     * @returns The current `Avita` instance for chaining.
     */
    onReset(callback: EL) {
        return this.on("reset", callback)
    }

    /**
     * Attaches a keydown event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when a key is pressed down on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onKeyDown(callback: EL) {
        return this.on("keydown", callback)
    }

    /**
     * Attaches a keypress event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when a key is pressed on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onKeyPress(callback: EL) {
        return this.on("keypress", callback)
    }

    /**
     * Attaches a keyup event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when a key is released on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onKeyUp(callback: EL) {
        return this.on("keyup", callback)
    }

    /**
     * Attaches a focus event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element receives focus.
     * @returns The current `Avita` instance for chaining.
     */
    onFocus(callback: EL) {
        return this.on("focus", callback)
    }

    /**
     * Attaches a blur event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element loses focus.
     * @returns The current `Avita` instance for chaining.
     */
    onBlur(callback: EL) {
        return this.on("blur", callback)
    }

    /**
     * Attaches a focusin event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element receives focus.
     * @returns The current `Avita` instance for chaining.
     */
    onFocusIn(callback: EL) {
        return this.on("focusin", callback)
    }

    /**
     * Attaches a focusout event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element loses focus.
     * @returns The current `Avita` instance for chaining.
     */
    onFocusOut(callback: EL) {
        return this.on("focusout", callback)
    }

    /**
     * Attaches a mousedown event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the mouse button is pressed down on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onMouseDown(callback: EL) {
        return this.on("mousedown", callback)
    }

    /**
     * Attaches a mouseup event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the mouse button is released on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onMouseUp(callback: EL) {
        return this.on("mouseup", callback)
    }

    /**
     * Attaches a mouseenter event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the mouse pointer enters the element.
     * @returns The current `Avita` instance for chaining.
     */
    onMouseEnter(callback: EL) {
        return this.on("mouseenter", callback)
    }

    /**
     * Attaches a mouseleave event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the mouse pointer leaves the element.
     * @returns The current `Avita` instance for chaining.
     */
    onMouseLeave(callback: EL) {
        return this.on("mouseleave", callback)
    }

    /**
     * Attaches a mousemove event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the mouse pointer is moved over the element.
     * @returns The current `Avita` instance for chaining.
     */
    onMouseMove(callback: EL) {
        return this.on("mousemove", callback)
    }

    /**
     * Attaches a mouseover event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the mouse pointer moves over the element.
     * @returns The current `Avita` instance for chaining.
     */
    onMouseOver(callback: EL) {
        return this.on("mouseover", callback)
    }

    /**
     * Attaches a mouseout event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the mouse pointer leaves the element.
     * @returns The current `Avita` instance for chaining.
     */
    onMouseOut(callback: EL) {
        return this.on("mouseout", callback)
    }

    /**
     * Attaches a contextmenu event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the user right-clicks or otherwise triggers the contextmenu event on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onContextMenu(callback: EL) {
        return this.on("contextmenu", callback)
    }

    /**
     * Attaches a pointerover event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the pointer moves over the element.
     * @returns The current `Avita` instance for chaining.
     */
    onPointerOver(callback: EL) {
        return this.on("pointerover", callback)
    }

    /**
     * Attaches a pointerenter event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the pointer enters the element.
     * @returns The current `Avita` instance for chaining.
     */
    onPointerEnter(callback: EL) {
        return this.on("pointerenter", callback)
    }

    /**
     * Attaches a pointerleave event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the pointer leaves the element.
     * @returns The current `Avita` instance for chaining.
     */
    onPointerLeave(callback: EL) {
        return this.on("pointerleave", callback)
    }

    /**
     * Attaches a pointermove event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the pointer moves over the element.
     * @returns The current `Avita` instance for chaining.
     */
    onPointerMove(callback: EL) {
        return this.on("pointermove", callback)
    }

    /**
     * Attaches a pointerdown event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the pointer is pressed down on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onPointerDown(callback: EL) {
        return this.on("pointerdown", callback)
    }

    /**
     * Attaches a pointerup event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the pointer is released on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onPointerUp(callback: EL) {
        return this.on("pointerup", callback)
    }

    /**
     * Attaches a pointercancel event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the pointer interaction is canceled on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onPointerCancel(callback: EL) {
        return this.on("pointercancel", callback)
    }

    /**
     * Attaches a pointerout event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the pointer leaves the element.
     * @returns The current `Avita` instance for chaining.
     */
    onPointerOut(callback: EL) {
        return this.on("pointerout", callback)
    }

    /**
     * Attaches a gotpointercapture event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the pointer capture is gained on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onGotPointerCapture(callback: EL) {
        return this.on("gotpointercapture", callback)
    }

    /**
     * Attaches a lostpointercapture event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the pointer capture is lost on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onLostPointerCapture(callback: EL) {
        return this.on("lostpointercapture", callback)
    }

    /**
     * Attaches a touchstart event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the touch starts on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onTouchStart(callback: EL) {
        return this.on("touchstart", callback)
    }

    /**
     * Attaches a touchmove event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the touch moves on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onTouchMove(callback: EL) {
        return this.on("touchmove", callback)
    }

    /**
     * Attaches a touchend event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the touch ends on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onTouchEnd(callback: EL) {
        return this.on("touchend", callback)
    }

    /**
     * Attaches a touchcancel event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the touch is canceled on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onTouchCancel(callback: EL) {
        return this.on("touchcancel", callback)
    }

    /**
     * Attaches a scroll event listener to the window.
     * @param callback - The callback function to be executed when the element is scrolled.
     * @returns The current `Avita` instance for chaining.
     */
    static onScroll(callback: EL) {
        window.addEventListener("scroll", callback)
    }

    /**
     * Attaches a scroll event listener to the window for the current `Avita` instance unless `thisElement` is provided.
     * @param callback - The callback function to be executed when the element is scrolled.
     * @param thisElement - If true, the listener will be attached to the element itself.
     * @returns The current `Avita` instance for chaining.
     */
    onScroll(callback: EL, thisElement?: boolean) {
        if (thisElement) {
            return this.on("scroll", callback)
        }
        window.addEventListener("scroll", callback)
        return this
    }

    /**
     * Attaches a resize event listener to the window.
     * @param callback - The callback function to be executed when the window is resized.
     * @returns The current `Avita` instance for chaining.
     */
    static onResize(callback: EL) {
        window.addEventListener("resize", callback)
    }

    /**
     * Attaches a resize event listener to the current `Avita` instance if `thisElement` is true, otherwise attaches it to the window.
     * @param callback - The callback function to be executed when the element or window is resized.
     * @param thisElement - If true, the listener will be attached to the element itself. If false or not provided, the listener will be attached to the window.
     * @returns The current `Avita` instance for chaining.
     */
    onResize(callback: EL, thisElement?: boolean) {
        if (thisElement) {
            return this.on("resize", callback)
        }
        window.addEventListener("resize", callback)
        return this
    }

    /**
     * Attaches a wheel event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the wheel is scrolled on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onWheel(callback: EL) {
        return this.on("wheel", callback)
    }

    /**
     * Attaches a drag event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is dragged.
     * @returns The current `Avita` instance for chaining.
     */
    onDrag(callback: EL) {
        return this.on("drag", callback)
    }

    /**
     * Attaches a dragend event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the drag operation is completed on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onDragEnd(callback: EL) {
        return this.on("dragend", callback)
    }

    /**
     * Attaches a dragenter event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is entered during a drag operation.
     * @returns The current `Avita` instance for chaining.
     */
    onDragEnter(callback: EL) {
        return this.on("dragenter", callback)
    }

    /**
     * Attaches a dragleave event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is left during a drag operation.
     * @returns The current `Avita` instance for chaining.
     */
    onDragLeave(callback: EL) {
        return this.on("dragleave", callback)
    }

    /**
     * Attaches a dragover event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is dragged over.
     * @returns The current `Avita` instance for chaining.
     */
    onDragOver(callback: EL) {
        return this.on("dragover", callback)
    }

    /**
     * Attaches a dragstart event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the drag operation starts on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onDragStart(callback: EL) {
        return this.on("dragstart", callback)
    }

    /**
     * Attaches a drop event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is dropped.
     * @returns The current `Avita` instance for chaining.
     */
    onDrop(callback: EL) {
        return this.on("drop", callback)
    }

    /**
     * Attaches a abort event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is aborted.
     * @returns The current `Avita` instance for chaining.
     */
    onAbort(callback: EL) {
        return this.on("abort", callback)
    }

    /**
     * Attaches a canplay event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is able to start playing.
     * @returns The current `Avita` instance for chaining.
     */
    onCanPlay(callback: EL) {
        return this.on("canplay", callback)
    }

    /**
     * Attaches a canplaythrough event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is able to play through without interruption.
     * @returns The current `Avita` instance for chaining.
     */
    onCanPlayThrough(callback: EL) {
        return this.on("canplaythrough", callback)
    }

    /**
     * Attaches a durationchange event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the duration of the element changes.
     * @returns The current `Avita` instance for chaining.
     */
    onDurationChange(callback: EL) {
        return this.on("durationchange", callback)
    }

    /**
     * Attaches an emptied event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is emptied.
     * @returns The current `Avita` instance for chaining.
     */
    onEmptied(callback: EL) {
        return this.on("emptied", callback)
    }

    /**
     * Attaches an encrypted event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is encrypted.
     * @returns The current `Avita` instance for chaining.
     */
    onEncrypted(callback: EL) {
        return this.on("encrypted", callback)
    }

    /**
     * Attaches an ended event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element has finished playing.
     * @returns The current `Avita` instance for chaining.
     */
    onEnded(callback: EL) {
        return this.on("ended", callback)
    }

    /**
     * Attaches a loadeddata event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element's media data has finished loading.
     * @returns The current `Avita` instance for chaining.
     */
    onLoadedData(callback: EL) {
        return this.on("loadeddata", callback)
    }

    /**
     * Attaches a loadedmetadata event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element's media metadata has finished loading.
     * @returns The current `Avita` instance for chaining.
     */
    onLoadedMetadata(callback: EL) {
        return this.on("loadedmetadata", callback)
    }

    /**
     * Attaches a loadstart event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element starts loading.
     * @returns The current `Avita` instance for chaining.
     */
    onLoadStart(callback: EL) {
        return this.on("loadstart", callback)
    }

    /**
     * Attaches a pause event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is paused.
     * @returns The current `Avita` instance for chaining.
     */
    onPause(callback: EL) {
        return this.on("pause", callback)
    }

    /**
     * Attaches a play event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element starts playing.
     * @returns The current `Avita` instance for chaining.
     */
    onPlay(callback: EL) {
        return this.on("play", callback)
    }

    /**
     * Attaches a playing event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element starts playing.
     * @returns The current `Avita` instance for chaining.
     */
    onPlaying(callback: EL) {
        return this.on("playing", callback)
    }

    /**
     * Attaches a progress event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element's media data is being loaded.
     * @returns The current `Avita` instance for chaining.
     */
    onProgress(callback: EL) {
        return this.on("progress", callback)
    }

    /**
     * Attaches a ratechange event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element's playback rate changes.
     * @returns The current `Avita` instance for chaining.
     */
    onRateChange(callback: EL) {
        return this.on("ratechange", callback)
    }

    /**
     * Attaches a seeked event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element has finished seeking.
     * @returns The current `Avita` instance for chaining.
     */
    onSeeked(callback: EL) {
        return this.on("seeked", callback)
    }

    /**
     * Attaches a seeking event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element starts seeking.
     * @returns The current `Avita` instance for chaining.
     */
    onSeeking(callback: EL) {
        return this.on("seeking", callback)
    }

    /**
     * Attaches a stalled event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element's media data loading has been interrupted.
     * @returns The current `Avita` instance for chaining.
     */
    onStalled(callback: EL) {
        return this.on("stalled", callback)
    }

    /**
     * Attaches a suspend event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element's media data loading has been suspended.
     * @returns The current `Avita` instance for chaining.
     */
    onSuspend(callback: EL) {
        return this.on("suspend", callback)
    }

    /**
     * Attaches a timeupdate event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element's playback position changes.
     * @returns The current `Avita` instance for chaining.
     */
    onTimeUpdate(callback: EL) {
        return this.on("timeupdate", callback)
    }

    /**
     * Attaches a volumechange event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element's volume has changed.
     * @returns The current `Avita` instance for chaining.
     */
    onVolumeChange(callback: EL) {
        return this.on("volumechange", callback)
    }

    /**
     * Attaches a waiting event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element is waiting for media data to be available.
     * @returns The current `Avita` instance for chaining.
     */
    onWaiting(callback: EL) {
        return this.on("waiting", callback)
    }

    /**
     * Attaches a load event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when the element has finished loading.
     * @returns The current `Avita` instance for chaining.
     */
    onLoad(callback: EL) {
        return this.on("load", callback)
    }

    /**
     * Attaches a global error event listener.
     * @param callback - The callback function to be executed when a global error occurs.
     * @returns The current `Avita` instance for chaining.
     */
    static onError(callback: EL) {
        window.addEventListener("error", callback)
    }

    /**
     * Attaches an error event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when an error occurs.
     * @returns The current `Avita` instance for chaining.
     */
    onError(callback: EL, thisElement?: boolean) {
        if (thisElement) {
            return this.on("error", callback)
        }
        window.addEventListener("error", callback)
        return this
    }

    /**
     * Attaches an animationstart event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when an animation starts on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onAnimationStart(callback: EL) {
        return this.on("animationstart", callback)
    }

    /**
     * Attaches an animationend event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when an animation ends on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onAnimationEnd(callback: EL) {
        return this.on("animationend", callback)
    }

    /**
     * Attaches an animationiteration event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when an animation iteration occurs on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onAnimationIteration(callback: EL) {
        return this.on("animationiteration", callback)
    }

    /**
     * Attaches a transitionstart event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when a transition starts on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onTransitionStart(callback: EL) {
        return this.on("transitionstart", callback)
    }

    /**
     * Attaches a transitionend event listener to the current `Avita` instance.
     * @param callback - The callback function to be executed when a transition ends on the element.
     * @returns The current `Avita` instance for chaining.
     */
    onTransitionEnd(callback: EL) {
        return this.on("transitionend", callback)
    }

    // Pseudoclasses onEventCSS methods

    /**
     * Attaches a CSS hover effect to the current `Avita` instance.
     * The hover effect is defined by the provided CSS properties or a single property-value pair.
     * A unique CSS class is generated and applied to the element to scope the hover effect.
     * @param props - The CSS properties to apply to the element when hovered over.
     * @returns The current `Avita` instance for chaining.
     */
    hover(props: Partial<CSSStyleDeclaration>): this

    /**
     * Attaches a CSS hover effect to the current `Avita` instance.
     * The hover effect is defined by the provided CSS property and value.
     * A unique CSS class is generated and applied to the element to scope the hover effect.
     * @param property - The CSS property to apply to the element when hovered over.
     * @param value - The value to set for the CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    hover(property: string, value: string): this

    hover(
        propsOrProperty: Partial<CSSStyleDeclaration> | string,
        value?: string
    ): this {
        return this.applyPseudoClassCSS("hover", propsOrProperty, value)
    }

    /**
     * Attaches a CSS active effect to the current `Avita` instance.
     * The active effect is defined by the provided CSS properties or a single property-value pair.
     * A unique CSS class is generated and applied to the element to scope the active effect.
     * @param props - The CSS properties to apply to the element when it is active.
     * @returns The current `Avita` instance for chaining.
     */
    active(props: Partial<CSSStyleDeclaration>): this

    /**
     * Attaches a CSS active effect to the current `Avita` instance.
     * The active effect is defined by the provided CSS property and value.
     * A unique CSS class is generated and applied to the element to scope the active effect.
     * @param property - The CSS property to apply to the element when it is active.
     * @param value - The value to set for the CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    active(property: string, value: string): this

    active(
        propsOrProperty: Partial<CSSStyleDeclaration> | string,
        value?: string
    ): this {
        return this.applyPseudoClassCSS("active", propsOrProperty, value)
    }

    /**
     * Attaches a CSS focus effect to the current `Avita` instance.
     * The focus effect is defined by the provided CSS properties or a single property-value pair.
     * A unique CSS class is generated and applied to the element to scope the focus effect.
     * @param props - The CSS properties to apply to the element when it is focused.
     * @returns The current `Avita` instance for chaining.
     */
    focus(props: Partial<CSSStyleDeclaration>): this

    /**
     * Attaches a CSS focus effect to the current `Avita` instance.
     * The focus effect is defined by the provided CSS property and value.
     * A unique CSS class is generated and applied to the element to scope the focus effect.
     * @param property - The CSS property to apply to the element when it is focused.
     * @param value - The value to set for the CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    focus(property: string, value: string): this

    focus(
        propsOrProperty: Partial<CSSStyleDeclaration> | string,
        value?: string
    ): this {
        return this.applyPseudoClassCSS("focus", propsOrProperty, value)
    }

    /**
     * Helper method to apply CSS for a given pseudoclass.
     * @param pseudoClass - The pseudoclass to apply (e.g., "hover", "active").
     * @param propsOrProperty - The CSS properties or property to apply.
     * @param value - The value to set for the CSS property (if a single property is provided).
     * @returns The current `Avita` instance for chaining.
     */
    private applyPseudoClassCSS(
        pseudoClass: string,
        propsOrProperty: Partial<CSSStyleDeclaration> | string,
        value?: string
    ): this {
        const uniqueClass = generateClass()
        this.addClass(uniqueClass)

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
     * Sets the 'all' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'all' CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    all(value: string) {
        return this.css("all", value)
    }

    /**
     * Sets the 'accent-color' CSS property on the current `Avita` instance.
     * @param color - The color value to set for the 'accent-color' property.
     * @returns The current `Avita` instance for chaining.
     */
    accent(color: string) {
        return this.css("accentColor", color)
    }

    /**
     * Sets the 'appearance' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'appearance' CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    appearance(value: string) {
        return this.css("appearance", value)
    }

    /**
     * Sets the 'align-content' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'align-content' CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    alignContent(value: string) {
        return this.css("alignContent", value)
    }

    /**
     * Shorthand for setting the 'align-content' CSS property on the current `Avita` instance.
     * @returns The current value of the 'align-content' CSS property.
     */
    aContent = this.alignContent

    /**
     * Sets the 'align-items' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'align-items' CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    alignItems(value: string) {
        return this.css("alignItems", value)
    }

    /**
     * Shorthand for setting the 'align-items' CSS property on the current `Avita` instance.
     * @returns The current value of the 'align-items' CSS property.
     */
    aItems = this.alignItems

    /**
     * Sets the 'align-self' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'align-self' CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    alignSelf(value: string) {
        return this.css("alignSelf", value)
    }

    /**
     * Shorthand for setting the 'align-self' CSS property on the current `Avita` instance.
     * @returns The current value of the 'align-self' CSS property.
     */
    aSelf = this.alignSelf

    /**
     * Todo: Big things coming soon...
     * Sets the 'animation' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'animation' CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    animationCSS(value: string) {
        return this.css("animation", value)
    }

    /**
     * Sets the 'aspectRatio' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'aspectRatio' CSS property. Can be a number or a string.
     * @returns The current `Avita` instance for chaining.
     */
    aspectRatio(value: string | number) {
        return this.css("aspectRatio", String(value))
    }

    /**
     * Shorthand for setting the 'background' CSS property on the current `Avita` instance.
     * @returns The current value of the 'aspectRatio' CSS property.
     */
    ratio = this.aspectRatio

    /**
     * Sets the 'backdropFilter' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'backdropFilter' CSS property. Can be a string representing a valid CSS backdrop-filter value.
     * @returns The current `Avita` instance for chaining.
     */
    backFilter(value: string) {
        return this.css("backdropFilter", value)
    }

    /**
     * Sets the 'backfaceVisibility' CSS property on the current `Avita` instance to 'visible', making the element single-sided.
     * @returns The current `Avita` instance for chaining.
     */
    singleSided() {
        //todo double check
        return this.css("backfaceVisibility", "visible")
    }

    /**
     * Sets the 'backfaceVisibility' CSS property on the current `Avita` instance to 'hidden', making the element double-sided.
     * @returns The current `Avita` instance for chaining.
     */
    doubleSided() {
        //todo double check
        return this.css("backfaceVisibility", "hidden")
    }

    /**
     * Sets the 'background' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'background' CSS property. Can be a string representing a valid CSS background value.
     * @returns The current `Avita` instance for chaining.
     */
    background(value: string) {
        return this.css("background", value)
    }

    /**
     * Gets the 'background' CSS property value of the current `Avita` instance.
     * @returns The current value of the 'background' CSS property.
     */
    bg = this.background

    /**
     * Sets the 'backgroundColor' CSS property on the current `Avita` instance and all its child elements to the specified value.
     * @param value - The value to set for the 'backgroundColor' CSS property. Can be a string representing a valid CSS color value.
     * @returns The current `Avita` instance for chaining.
     * @deprecated Use the `bg()` method instead.
     */
    bgColor(value: string) {
        return this.css("backgroundColor", value)
    }

    /**
     * Sets the 'backgroundClip' CSS property on the current `Avita` instance and all its child elements to the specified value.
     * @param value - The value to set for the 'backgroundClip' CSS property. Can be a string representing a valid CSS background-clip value.
     * @returns The current `Avita` instance for chaining.
     */
    bgClip(value: string) {
        return this.css("backgroundClip", value)
    }

    /**
     * Sets the 'backgroundSize' CSS property on the current `Avita` instance and all its child elements to 'contain', scaling the background image to fit within the element while maintaining its aspect ratio.
     * @returns The current `Avita` instance for chaining.
     */
    bgContain() {
        return this.css("backgroundSize", "contain")
    }

    /**
     * Sets the 'backgroundSize' CSS property on the current `Avita` instance and all its child elements to 'cover', scaling the background image to fill the entire element while maintaining its aspect ratio.
     * @returns The current `Avita` instance for chaining.
     */
    bgCover() {
        return this.css("backgroundSize", "cover")
    }

    /**
     * Sets the 'backgroundRepeat' CSS property on the current `Avita` instance to 'no-repeat', preventing the background image from repeating.
     * @returns The current `Avita` instance for chaining.
     */
    bgNoRepeat() {
        return this.css("backgroundRepeat", "no-repeat")
    }

    /**
     * Sets the 'backgroundRepeat' CSS property on the current `Avita` instance to 'repeat', repeating the background image in both the x and y directions.
     * @returns The current `Avita` instance for chaining.
     */
    bgRepeat() {
        return this.css("backgroundRepeat", "repeat")
    }

    /**
     * Sets the 'backgroundRepeat' CSS property on the current `Avita` instance to 'repeat-x', repeating the background image horizontally.
     * @returns The current `Avita` instance for chaining.
     */
    bgRepeatX() {
        return this.css("backgroundRepeat", "repeat-x")
    }

    /**
     * Sets the 'backgroundRepeat' CSS property on the current `Avita` instance to 'repeat-y', repeating the background image vertically.
     * @returns The current `Avita` instance for chaining.
     */
    bgRepeatY() {
        return this.css("backgroundRepeat", "repeat-y")
    }

    /**
     * Sets the 'backgroundImage' CSS property on the current `Avita` instance using one or more image URLs.
     * @param urls - A list of image URLs to use as the background image.
     * @returns The current `Avita` instance for chaining.
     */
    bgImg(...urls: string[]) {
        const urlsString = urls.join(", ")
        return this.css("backgroundImage", `url(${urlsString})`)
    }

    /**
     * Applies a linear gradient as the background of the current `Avita` instance and its child elements.
     * @param angle - The angle of the gradient in degrees. Defaults to 0 (horizontal).
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `Avita` instance for chaining.
     */
    bgLinearGradient(angle: number = 0, ...colors: string[]) {
        const gradient = `linear-gradient(${angle}deg, ${colors.join(", ")})`
        return this.bg(gradient)
    }

    /**
     * Applies a radial gradient as the background of the current `Avita` instance and its child elements.
     * @param shape - The shape of the gradient, can be 'circle', 'ellipse', 'closest-side' or a shape with location.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `Avita` instance for chaining.
     */
    bgRadialGradient(shape: string, ...colors: string[]) {
        const gradient = `radial-gradient(${shape}, ${colors.join(", ")})`
        return this.bg(gradient)
    }

    /**
     * Provides a shorthand for calling the `bgLinearGradient` method on the current `Avita` instance.
     * @returns The current `Avita` instance for chaining.
     */
    bgLinGrad = this.bgLinearGradient

    /**
     * Applies a text-masked linear gradient effect to the current `Avita` instance and its child elements.
     * @param angle - The angle of the gradient in degrees or a string value. Defaults to 90 (horizontal).
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `Avita` instance for chaining.
     */
    textGradient(angle: number | string = 90, ...colors: string[]) {
        const unit = typeof angle === "string" ? "" : "deg"
        const gradient = `linear-gradient(${angle}${unit}, ${colors.join(
            ", "
        )})`
        return this.bg(gradient).textMask().color("transparent")
    }

    /**
     * Applies a horizontal text-masked linear gradient effect to the current `Avita` instance and its child elements.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `Avita` instance for chaining.
     */
    textGradientX(...colors: string[]) {
        return this.textGradient(90, ...colors)
    }

    /**
     * Applies a vertical text-masked linear gradient effect to the current `Avita` instance and its child elements.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `Avita` instance for chaining.
     */
    textGradientY(...colors: string[]) {
        return this.textGradient(0, ...colors)
    }

    /**
     * Applies a 45-degree text-masked linear gradient effect to the current `Avita` instance and its child elements.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `Avita` instance for chaining.
     */
    textGradient45(...colors: string[]) {
        return this.textGradient(45, ...colors)
    }

    /**
     * Applies a 135-degree text-masked linear gradient effect to the current `Avita` instance and its child elements.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `Avita` instance for chaining.
     */
    textGradient135(...colors: string[]) {
        return this.textGradient(135, ...colors)
    }

    /**
     * Applies a 225-degree text-masked linear gradient effect to the current `Avita` instance and its child elements.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `Avita` instance for chaining.
     */
    textGradient225(...colors: string[]) {
        return this.textGradient(225, ...colors)
    }

    /**
     * Applies a 315-degree text-masked linear gradient effect to the current `Avita` instance and its child elements.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `Avita` instance for chaining.
     */
    textGradient315(...colors: string[]) {
        return this.textGradient(315, ...colors)
    }

    /**
     * Shorthands the text-masked linear gradient effect to be horizontal on the current `Avita` instance.
     * See `textGradientX` for more details.
     * @param colors - An array of CSS color values to use in the gradient.
     * @returns The current `Avita` instance for chaining.
     */
    textGrad = this.textGradientX

    /**
     * Sets the 'backgroundClip' CSS property on the current `Avita` instance and all its child elements to 'text', clipping the background to the text content.
     * @returns The current `Avita` instance for chaining.
     */
    textMask() {
        this.bgClip("text")
        return this
    }

    /**
     * Sets the 'border' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'border' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `Avita` instance for chaining.
     */
    border(value: string) {
        return this.css("border", value)
    }

    /**
     * Sets the 'borderLeft' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'borderLeft' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `Avita` instance for chaining.
     */
    borderL(value: string) {
        return this.css("borderLeft", value)
    }

    /**
     * Sets the 'borderRight' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'borderRight' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `Avita` instance for chaining.
     */
    borderR(value: string) {
        return this.css("borderRight", value)
    }

    /**
     * Sets the 'borderTop' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'borderTop' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `Avita` instance for chaining.
     */
    borderT(value: string) {
        return this.css("borderTop", value)
    }

    /**
     * Sets the 'borderBottom' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'borderBottom' CSS property. Can be a string representing a valid CSS border value.
     * @returns The current `Avita` instance for chaining.
     */
    borderB(value: string) {
        return this.css("borderBottom", value)
    }

    /**
     * Sets the 'borderColor' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'borderColor' CSS property. Can be a string representing a valid CSS color value.
     * @returns The current `Avita` instance for chaining.
     */
    borderColor(value: string) {
        return this.css("borderColor", value)
    }

    /**
     * Sets the 'borderImage' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'borderImage' CSS property. Can be a string representing a valid CSS border image value.
     * @returns The current `Avita` instance for chaining.
     */
    borderImg(value: string) {
        return this.css("borderImage", value)
    }

    /**
     * Sets the 'borderInline' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'borderInline' CSS property. Can be a string representing a valid CSS border inline value.
     * @returns The current `Avita` instance for chaining.
     */
    borderInline(value: string) {
        return this.css("borderInline", value)
    }

    /**
     * Sets the 'borderStyle' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'borderStyle' CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    borderStyle(value: string) {
        return this.css("borderStyle", value)
    }

    /**
     * Sets the 'borderWidth' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'borderWidth' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `Avita` instance for chaining.
     */
    borderW(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("borderWidth", `${value}${unit}`)
    }

    /**
     * Sets the 'bottom' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'bottom' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `Avita` instance for chaining.
     */
    bottom(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("bottom", `${value}${unit}`)
    }

    /**
     * Shorhand for setting the 'bottom' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'bottom' CSS property. Can be a string representing a valid CSS length value or a number representing a value in pixels.
     * @returns The current `Avita` instance for chaining.
     */
    b = this.bottom

    /**
     * Sets the 'boxShadow' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'boxShadow' CSS property. Can be a string representing a valid CSS box-shadow value.
     * @returns The current `Avita` instance for chaining.
     */
    shadow(value: string) {
        return this.css("boxShadow", value)
    }

    /**
     * Sets the 'boxSizing' CSS property on the current `Avita` instance to 'border-box'.
     * @returns The current `Avita` instance for chaining.
     */
    borderBox() {
        return this.css("boxSizing", "border-box")
    }

    /**
     * Why would you use this?? Just use `borderBox()` instead. Yes this still works but whyyy?
     * Sets the 'boxSizing' CSS property on the current `Avita` instance to 'content-box'.
     * @returns The current `Avita` instance for chaining.
     * @deprecated Use `borderBox()` instead bozo.
     */
    contentBox() {
        return this.css("boxSizing", "content-box")
    }

    /**
     * Mostly for printing a page.
     * Sets the 'breakBefore', 'breakInside', and 'breakAfter' CSS properties on the current `Avita` instance.
     * @param before - The value to set for the 'breakBefore' CSS property. Can be a valid CSS 'break-before' value.
     * @param inside - The value to set for the 'breakInside' CSS property. Can be a valid CSS 'break-inside' value.
     * @param after - The value to set for the 'breakAfter' CSS property. Can be a valid CSS 'break-after' value.
     * @returns The current `Avita` instance for chaining.
     */
    break(before?: string, inside?: string, after?: string) {
        if (before) {
            this.css("breakBefore", before)
        }
        if (inside) {
            this.css("breakInside", inside)
        }
        if (after) {
            this.css("breakAfter", after)
        }
        return this
    }

    /**
     * Sets the 'caretColor' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'caretColor' CSS property. Can be one of the valid CSS color values.
     * @returns The current `Avita` instance for chaining.
     */
    caretColor(value: string) {
        return this.css("caretColor", value)
    }

    /**
     * Shorthands the 'caretColor' CSS property on the current `Avita` instance until css can actually change carets.
     * Sets the 'caretColor' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'caretColor' CSS property. Can be one of the valid CSS color values.
     * @returns The current `Avita` instance for chaining.
     */
    caret = this.caretColor

    /**
     * Clears the CSS styles applied to the current `Avita` instance.
     * @returns The current `Avita` instance for chaining.
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
     * Sets the 'clipPath' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'clipPath' CSS property. Can be a valid CSS clip-path value.
     * @returns The current `Avita` instance for chaining.
     */
    clipPath(value: string) {
        return this.css("clipPath", value)
    }

    /**
     * Sets the 'color' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'color' CSS property. Can be one of the valid CSS color values.
     * @returns The current `Avita` instance for chaining.
     */
    color(value: string) {
        return this.css("color", value)
    }

    /**
     * For those who like semantic precision (and who doesn't).
     * Sets the (text) 'color' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'color' CSS property. Can be one of the valid CSS color values.
     * @returns The current `Avita` instance for chaining.
     */
    textColor = this.color

    /**
     * Sets the 'content' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'content' CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    content(value: string) {
        return this.css("content", value)
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance.
     * See shorthands; List here: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
     * @param value - The value to set for the 'cursor' CSS property. Can be a valid CSS cursor value.
     * @returns The current `Avita` instance for chaining.
     * @deprecated Use shorthands like `pointer()` or `grab()` instead.
     */
    cursor(value: string) {
        return this.css("cursor", value)
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'pointer'.
     * @returns The current `Avita` instance for chaining.
     */
    pointer() {
        return this.css("cursor", "pointer")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'default'.
     * @returns The current `Avita` instance for chaining.
     */
    default() {
        return this.css("cursor", "default")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'context-menu'.
     * @returns The current `Avita` instance for chaining.
     */
    contextMenu() {
        return this.css("cursor", "context-menu")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'help'.
     * @returns The current `Avita` instance for chaining.
     */
    help() {
        return this.css("cursor", "help")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'progress'.
     * @returns The current `Avita` instance for chaining.
     */
    progress() {
        return this.css("cursor", "progress")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'wait'.
     * @returns The current `Avita` instance for chaining.
     */
    wait() {
        return this.css("cursor", "wait")
    }

    cell() {
        return this.css("cursor", "cell")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'crosshair'.
     * @returns The current `Avita` instance for chaining.
     */
    crosshair() {
        return this.css("cursor", "crosshair")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'text'.
     * @returns The current `Avita` instance for chaining.
     */
    txt() {
        return this.css("cursor", "text")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'vertical-text'.
     * @returns The current `Avita` instance for chaining.
     */
    txtY() {
        return this.css("cursor", "vertical-text")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'alias'.
     * @returns The current `Avita` instance for chaining.
     */
    alias() {
        return this.css("cursor", "alias")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'copy'.
     * @returns The current `Avita` instance for chaining.
     */
    copy() {
        return this.css("cursor", "copy")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'move'.
     * @returns The current `Avita` instance for chaining.
     */
    move() {
        return this.css("cursor", "move")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'no-drop'.
     * @returns The current `Avita` instance for chaining.
     */
    noDrop() {
        return this.css("cursor", "no-drop")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'not-allowed'.
     * @returns The current `Avita` instance for chaining.
     */
    notAllowed() {
        return this.css("cursor", "not-allowed")
    }

    grab() {
        return this.css("cursor", "grab")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'grabbing'.
     * @returns The current `Avita` instance for chaining.
     */
    grabbing() {
        return this.css("cursor", "grabbing")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'all-scroll'.
     * @returns The current `Avita` instance for chaining.
     */
    allScroll() {
        return this.css("cursor", "all-scroll")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'col-resize'.
     * @returns The current `Avita` instance for chaining.
     */
    resizeCol() {
        return this.css("cursor", "col-resize")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'row-resize'.
     * @returns The current `Avita` instance for chaining.
     */
    resizeRow() {
        return this.css("cursor", "row-resize")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'n-resize'.
     * @returns The current `Avita` instance for chaining.
     */
    resizeT() {
        return this.css("cursor", "n-resize")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'e-resize'.
     * @returns The current `Avita` instance for chaining.
     */
    resizeR() {
        return this.css("cursor", "e-resize")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 's-resize'.
     * @returns The current `Avita` instance for chaining.
     */
    resizeB() {
        return this.css("cursor", "s-resize")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'w-resize'.
     * @returns The current `Avita` instance for chaining.
     */
    resizeL() {
        return this.css("cursor", "w-resize")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'nw-resize'.
     * @returns The current `Avita` instance for chaining.
     */
    resizeTL() {
        return this.css("cursor", "nw-resize")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'ne-resize'.
     * @returns The current `Avita` instance for chaining.
     */
    resizeTR() {
        return this.css("cursor", "ne-resize")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'sw-resize'.
     * @returns The current `Avita` instance for chaining.
     */
    resizeBL() {
        return this.css("cursor", "sw-resize")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'se-resize'.
     * @returns The current `Avita` instance for chaining.
     */
    resizeBR() {
        return this.css("cursor", "se-resize")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'ew-resize'.
     * @returns The current `Avita` instance for chaining.
     */
    resizeLR() {
        return this.css("cursor", "ew-resize")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'ns-resize'.
     * @returns The current `Avita` instance for chaining.
     */
    resizeTB() {
        return this.css("cursor", "ns-resize")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'zoom-in'.
     * @returns The current `Avita` instance for chaining.
     */
    zoomIn() {
        return this.css("cursor", "zoom-in")
    }

    /**
     * Sets the 'cursor' CSS property on the current `Avita` instance to 'zoom-out'.
     * @returns The current `Avita` instance for chaining.
     */
    zoomOut() {
        return this.css("cursor", "zoom-out")
    }

    /**
     * Sets the 'display' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'display' CSS property. Can be a valid CSS display value.
     * @returns The current `Avita` instance for chaining.
     */
    display(value: string) {
        return this.css("display", value)
    }

    /**
     * Sets the 'filter' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'filter' CSS property. Can be a valid CSS filter value.
     * @returns The current `Avita` instance for chaining.
     */
    filter(value: string) {
        return this.css("filter", value)
    }

    blur(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("filter", `blur(${value}${unit})`)
    }

    /**
     * Sets the 'flex' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'flex' CSS property. Can be a valid CSS flex value.
     * @returns The current `Avita` instance for chaining.
     */
    flexLayout(value: string) {
        return this.css("flex", value)
    }

    /**
     * Sets the 'flexDirection' CSS property on the current `Avita` instance to 'column'.
     * @returns The current `Avita` instance for chaining.
     */
    flexCol() {
        return this.css("flexDirection", "column")
    }

    /**
     * Sets the 'flexDirection' CSS property on the current `Avita` instance to 'row'.
     * @returns The current `Avita` instance for chaining.
     */
    flexRow() {
        return this.css("flexDirection", "row")
    }

    /**
     * Sets the 'flexDirection' CSS property on the current `Avita` instance to 'row-reverse'.
     * @returns The current `Avita` instance for chaining.
     */
    flexRowRev() {
        return this.css("flexDirection", "row-reverse")
    }

    /**
     * Sets the 'flexDirection' CSS property on the current `Avita` instance to 'column-reverse'.
     * @returns The current `Avita` instance for chaining.
     */
    flexColRev() {
        return this.css("flexDirection", "column-reverse")
    }

    /**
     * Sets the 'flexWrap' CSS property on the current `Avita` instance to 'wrap'.
     * @returns The current `Avita` instance for chaining.
     */
    flexWrap() {
        return this.css("flexWrap", "wrap")
    }

    /**
     * Sets the 'flexWrap' CSS property on the current `Avita` instance to 'nowrap'.
     * @returns The current `Avita` instance for chaining.
     */
    flexNoWrap() {
        return this.css("flexWrap", "nowrap")
    }

    /**
     * Sets the 'flexWrap' CSS property on the current `Avita` instance to 'wrap-reverse'.
     * @returns The current `Avita` instance for chaining.
     */
    flexWrapRev() {
        return this.css("flexWrap", "wrap-reverse")
    }

    /**
     * Sets the 'float' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'float' CSS property. Can be a valid CSS float value.
     * @returns The current `Avita` instance for chaining.
     */
    float(value: string) {
        return this.css("float", value)
    }

    /**
     * Sets the 'font' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'font' CSS property. Can be a valid CSS font value.
     * @returns The current `Avita` instance for chaining.
     */
    font(value: string) {
        return this.css("font", value)
    }

    /**
     * Sets the 'fontFamily' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'fontFamily' CSS property. Can be a valid CSS font-family value.
     * @returns The current `Avita` instance for chaining.
     */
    family(value: string) {
        return this.css("fontFamily", value)
    }

    /**
     * Shorthand for setting the 'fontFamily' CSS property on the current `Avita` instance.
     * @returns The current 'fontFamily' CSS property value.
     */
    fam = this.family

    /**
     * Sets the 'fontSize' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'fontSize' CSS property. Can be a valid CSS font-size value, either a string or a number representing pixels.
     * @returns The current `Avita` instance for chaining.
     */
    fontSize(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("fontSize", `${value}${unit}`)
    }

    /**
     * Sets the 'fontWeight' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'fontWeight' CSS property. Can be a valid CSS font-weight value.
     * @returns The current `Avita` instance for chaining.
     */
    fontWeight(value: string | number) {
        return this.css("fontWeight", String(value))
    }

    /**
     * Shorthand for setting the 'fontWeight' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'fontWeight' CSS property. Can be a valid CSS font-weight value.
     * @returns The current `Avita` instance for chaining.
     */
    weight = this.fontWeight

    /**
     * Sets the 'fontStyle' CSS property on the current `Avita` instance.
     * @returns The current `Avita` instance for chaining.
     */
    base() {
        return this.css("fontStyle", "normal")
    }

    /**
     * Sets the 'fontStyle' CSS property on the current `Avita` instance to 'italic'.
     * @returns The current `Avita` instance for chaining.
     */
    italic() {
        return this.css("fontStyle", "italic")
    }

    /**
     * Sets the 'fontStyle' CSS property on the current `Avita` instance to 'oblique'.
     * @returns The current `Avita` instance for chaining.
     */
    oblique() {
        return this.css("fontStyle", "oblique")
    }

    /**
     * Sets the 'fontVariant' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'fontVariant' CSS property. Can be a valid CSS font-variant value.
     * @returns The current `Avita` instance for chaining.
     */
    fontVariant(value: string) {
        return this.css("fontVariant", value)
    }

    /**
     * Shorthand for setting the 'fontVariant' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'fontVariant' CSS property. Can be a valid CSS font-variant value.
     * @returns The current `Avita` instance for chaining.
     */
    fontVar = this.fontVariant

    /**
     * Sets the 'gap' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gap' CSS property. Can be a valid CSS gap value, either a string or a number representing pixels.
     * @returns The current `Avita` instance for chaining.
     */
    gap(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("gap", `${value}${unit}`)
    }

    /**
     * Sets the 'grid' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'grid' CSS property. Can be a valid CSS grid value.
     * @returns The current `Avita` instance for chaining.
     */
    gridLayout(value: string) {
        return this.css("grid", value)
    }

    /**
     * Sets the 'gridArea' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridArea' CSS property. Can be a valid CSS grid-area value.
     * @returns The current `Avita` instance for chaining.
     */
    gridArea(value: string) {
        return this.css("gridArea", value)
    }

    /**
     * Sets the 'gridAutoColumns' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridAutoColumns' CSS property. Can be a valid CSS grid-auto-columns value.
     * @returns The current `Avita` instance for chaining.
     */
    gridAutoCols(value: string) {
        return this.css("gridAutoColumns", value)
    }

    /**
     * Sets the 'gridAutoFlow' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridAutoFlow' CSS property. Can be a valid CSS grid-auto-flow value.
     * @returns The current `Avita` instance for chaining.
     */
    gridAutoFlow(value: string) {
        return this.css("gridAutoFlow", value)
    }

    /**
     * Sets the 'gridAutoRows' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridAutoRows' CSS property. Can be a valid CSS grid-auto-rows value.
     * @returns The current `Avita` instance for chaining.
     */
    gridAutoRows(value: string) {
        return this.css("gridAutoRows", value)
    }

    /**
     * Sets the 'gridColumn' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridColumn' CSS property. Can be a valid CSS grid-column value.
     * @returns The current `Avita` instance for chaining.
     */
    gridCol(value: string) {
        return this.css("gridColumn", value)
    }

    /**
     * Sets the 'gridColumnEnd' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridColumnEnd' CSS property. Can be a valid CSS grid-column-end value.
     * @returns The current `Avita` instance for chaining.
     */
    gridColEnd(value: string) {
        return this.css("gridColumnEnd", value)
    }

    /**
     * Sets the 'gridColumnStart' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridColumnStart' CSS property. Can be a valid CSS grid-column-start value.
     * @returns The current `Avita` instance for chaining.
     */
    gridColStart(value: string) {
        return this.css("gridColumnStart", value)
    }

    /**
     * Sets the 'gridRow' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridRow' CSS property. Can be a valid CSS grid-row value.
     * @returns The current `Avita` instance for chaining.
     */
    gridRow(value: string) {
        return this.css("gridRow", value)
    }

    /**
     * Sets the 'gridRowEnd' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridRowEnd' CSS property. Can be a valid CSS grid-row-end value.
     * @returns The current `Avita` instance for chaining.
     */
    gridRowEnd(value: string) {
        return this.css("gridRowEnd", value)
    }

    /**
     * Sets the 'gridRowStart' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridRowStart' CSS property. Can be a valid CSS grid-row-start value.
     * @returns The current `Avita` instance for chaining.
     */
    gridRowStart(value: string) {
        return this.css("gridRowStart", value)
    }

    /**
     * Sets the 'gridTemplate' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridTemplate' CSS property. Can be a valid CSS grid-template value.
     * @returns The current `Avita` instance for chaining.
     */
    gridTemplate(value: string) {
        return this.css("gridTemplate", value)
    }

    /**
     * Sets the 'gridTemplateAreas' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridTemplateAreas' CSS property. Can be a valid CSS grid-template-areas value.
     * @returns The current `Avita` instance for chaining.
     */
    gridAreas(value: string) {
        return this.css("gridTemplateAreas", value)
    }

    /**
     * Sets the 'gridTemplateColumns' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridTemplateColumns' CSS property. Can be a valid CSS grid-template-columns value.
     * @returns The current `Avita` instance for chaining.
     */
    gridCols(value: string) {
        return this.css("gridTemplateColumns", value)
    }

    /**
     * Sets the 'gridTemplateRows' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'gridTemplateRows' CSS property. Can be a valid CSS grid-template-rows value.
     * @returns The current `Avita` instance for chaining.
     */
    gridRows(value: string) {
        return this.css("gridTemplateRows", value)
    }

    /**
     * Sets the 'height' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'height' CSS property. Can be a valid CSS height value.
     * @returns The current `Avita` instance for chaining.
     */
    height(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("height", `${value}${unit}`)
    }

    /**
     * Shorthand for setting the 'height' CSS property on the current `Avita` instance. See `height()` for more details.
     * @param value - The value to set for the 'height' CSS property. Can be a valid CSS height value.
     * @returns The current `Avita` instance for chaining.
     */
    h = this.height

    /**
     * Sets the 'hyphens' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'hyphens' CSS property. Can be a valid CSS hyphens value.
     * @returns The current `Avita` instance for chaining.
     */
    hyphens(value: string) {
        return this.css("hyphens", value)
    }

    /**
     * Sets the 'imageRendering' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'imageRendering' CSS property. Can be a valid CSS image-rendering value.
     * @returns The current `Avita` instance for chaining.
     */
    imgRender(value: string) {
        return this.css("imageRendering", value)
    }

    /**
     * Sets the 'inlineSize' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'inlineSize' CSS property. Can be a valid CSS inline-size value.
     * @returns The current `Avita` instance for chaining.
     */
    inlineSize(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("inlineSize", `${value}${unit}`)
    }

    /**
     * Sets the 'inset' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'inset' CSS property. Can be a valid CSS inset value.
     * @returns The current `Avita` instance for chaining.
     */
    inset(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("inset", `${value}${unit}`)
    }

    /**
     * Sets the 'insetInline' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'insetInline' CSS property. Can be a valid CSS inset-inline value.
     * @returns The current `Avita` instance for chaining.
     */
    insetInline(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("insetInline", `${value}${unit}`)
    }

    /**
     * Sets the 'isolation' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'isolation' CSS property. Can be a valid CSS isolation value.
     * @returns The current `Avita` instance for chaining.
     */
    isolation(value: string) {
        return this.css("isolation", value)
    }

    /**
     * Sets the 'justifyContent' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'justifyContent' CSS property. Can be a valid CSS justify-content value.
     * @returns The current `Avita` instance for chaining.
     */
    justifyContent(value: string) {
        return this.css("justifyContent", value)
    }

    /**
     * Shorthand for setting the 'justifyContent' CSS property on the current `Avita` instance. See `justifyContent()` for more details.
     * @param value - The value to set for the 'justifyContent' CSS property. Can be a valid CSS justify-content value.
     * @returns The current `Avita` instance for chaining.
     */
    jContent = this.justifyContent

    /**
     * Sets the 'justifyItems' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'justifyItems' CSS property. Can be a valid CSS justify-items value.
     * @returns The current `Avita` instance for chaining.
     */
    justifyItems(value: string) {
        return this.css("justifyItems", value)
    }

    /**
     * Shorthand for setting the 'justifyItems' CSS property on the current `Avita` instance. See `justifyItems()` for more details.
     * @param value - The value to set for the 'justifyItems' CSS property. Can be a valid CSS justify-items value.
     * @returns The current `Avita` instance for chaining.
     */
    jItems = this.justifyItems

    /**
     * Sets the 'justifySelf' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'justifySelf' CSS property. Can be a valid CSS justify-self value.
     * @returns The current `Avita` instance for chaining.
     */
    justifySelf(value: string) {
        return this.css("justifySelf", value)
    }

    /**
     * Shorthand for setting the 'justifySelf' CSS property on the current `Avita` instance. See `justifySelf()` for more details.
     * @param value - The value to set for the 'justifySelf' CSS property. Can be a valid CSS justify-self value.
     * @returns The current `Avita` instance for chaining.
     */
    jSelf = this.justifySelf

    /**
     * Sets the 'left' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'left' CSS property. Can be a valid CSS left value.
     * @returns The current `Avita` instance for chaining.
     */
    left(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("left", `${value}${unit}`)
    }

    /**
     * Shorthand for setting the 'left' CSS property on the current `Avita` instance. See `left()` for more details.
     * @param value - The value to set for the 'left' CSS property. Can be a valid CSS left value.
     * @returns The current `Avita` instance for chaining.
     */
    l = this.left

    /**
     * Sets the 'letterSpacing' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'letterSpacing' CSS property. Can be a valid CSS letter-spacing value.
     * @returns The current `Avita` instance for chaining.
     */
    letterSpacing(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("letterSpacing", `${value}${unit}`)
    }

    /**
     * Sets the 'lineHeight' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'lineHeight' CSS property. Can be a valid CSS line-height value.
     * @returns The current `Avita` instance for chaining.
     */
    lineH(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("lineHeight", `${value}${unit}`)
    }

    /**
     * Sets the 'lineBreak' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'lineBreak' CSS property. Can be a valid CSS line-break value.
     * @returns The current `Avita` instance for chaining.
     */
    lineBr(value: string) {
        return this.css("lineBreak", value)
    }

    /**
     * Sets the 'listStyle' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'listStyle' CSS property. Can be a valid CSS list-style value.
     * @returns The current `Avita` instance for chaining.
     */
    bullet(value: string) {
        return this.css("listStyle", value)
    }

    /**
     * Sets the 'margin' CSS property with one value applied to all sides.
     * @param value - The value to set for the 'margin' CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    margin(value: string | number): this

    /**
     * Sets the 'margin' CSS property with two values: vertical and horizontal.
     * @param vertical - The value to set for the top and bottom margin.
     * @param horizontal - The value to set for the left and right margin.
     * @returns The current `Avita` instance for chaining.
     */
    margin(vertical: string | number, horizontal: string | number): this

    /**
     * Sets the 'margin' CSS property with three values: top, horizontal, and bottom.
     * @param top - The value to set for the top margin.
     * @param horizontal - The value to set for the left and right margin.
     * @param bottom - The value to set for the bottom margin.
     * @returns The current `Avita` instance for chaining.
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
     * @returns The current `Avita` instance for chaining.
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
                return this.css("margin", processValue(values[0]))
            case 2:
                return this.css(
                    "margin",
                    `${processValue(values[0])} ${processValue(values[1])}`
                )
            case 3:
                return this.css(
                    "margin",
                    `${processValue(values[0])} ${processValue(
                        values[1]
                    )} ${processValue(values[2])}`
                )
            case 4:
                return this.css(
                    "margin",
                    `${processValue(values[0])} ${processValue(
                        values[1]
                    )} ${processValue(values[2])} ${processValue(values[3])}`
                )
            default:
                throw new Error(
                    "Invalid number of arguments provided to margin(). Must be 1, 2, 3, or 4."
                )
        }
    }

    /**
     * Shorthand for setting the 'margin' CSS property on the current `Avita` instance. See `margin()` for more details.
     * @param values - The value(s) to set for the 'margin' CSS property. Can be a valid CSS margin value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    m = this.margin

    /**
     * Sets the 'marginLeft' and 'marginRight' CSS properties on the current `Avita` instance.
     * @param value - The value to set for the 'marginLeft' and 'marginRight' CSS properties. Can be a valid CSS margin value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    marginX(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("marginLeft", `${value}${unit}`).css(
            "marginRight",
            `${value}${unit}`
        )
    }

    /**
     * Shorthand for setting the 'margin-left' and 'margin-right' CSS properties on the current `Avita` instance.
     * @param value - The value to set for the 'margin-left' and 'margin-right' CSS properties. Can be a valid CSS margin value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    mx = this.marginX

    /**
     * Sets the 'marginTop' and 'marginBottom' CSS properties on the current `Avita` instance.
     * @param value - The value to set for the 'marginTop' and 'marginBottom' CSS properties. Can be a valid CSS margin value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    marginY(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("marginTop", `${value}${unit}`).css(
            "marginBottom",
            `${value}${unit}`
        )
    }

    /**
     * Shorthand for setting the 'margin-top' and 'margin-bottom' CSS properties on the current `Avita` instance.
     * @param value - The value to set for the 'margin-top' and 'margin-bottom' CSS properties. Can be a valid CSS margin value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    my = this.marginY

    /**
     * Sets the 'marginInline' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'marginInline' CSS property. Can be a valid CSS margin-inline value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    marginInline(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("marginInline", `${value}${unit}`)
    }

    /**
     * Sets the 'marginBottom' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'marginBottom' CSS property. Can be a valid CSS margin-bottom value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    marginB(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("marginBottom", `${value}${unit}`)
    }

    /**
     * Shorthand for setting the 'margin-bottom' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'margin-bottom' CSS property. Can be a valid CSS margin-bottom value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    mb = this.marginB

    /**
     * Sets the 'marginLeft' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'marginLeft' CSS property. Can be a valid CSS margin-left value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    marginL(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("marginLeft", `${value}${unit}`)
    }

    /**
     * Shorthand for setting the 'margin-left' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'margin-left' CSS property. Can be a valid CSS margin-left value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    ml = this.marginL

    /**
     * Sets the 'marginRight' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'marginRight' CSS property. Can be a valid CSS margin-right value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    marginR(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("marginRight", `${value}${unit}`)
    }

    /**
     * Shorthand for setting the 'margin-right' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'margin-right' CSS property. Can be a valid CSS margin-right value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    mr = this.marginR

    /**
     * Sets the 'marginTop' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'marginTop' CSS property. Can be a valid CSS margin-top value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    marginT(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("marginTop", `${value}${unit}`)
    }

    /**
     * Shorthand for setting the 'margin-top' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'margin-top' CSS property. Can be a valid CSS margin-top value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    mt = this.marginT

    /**
     * Sets the 'mask' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'mask' CSS property. Can be a valid CSS mask value.
     * @returns The current `Avita` instance for chaining.
     */
    mask(value: string) {
        return this.css("mask", value)
    }

    /**
     * Sets the 'maxHeight' and 'maxWidth' CSS properties on the current `Avita` instance.
     * @param value - The value to set for the 'maxHeight' and 'maxWidth' CSS properties. Must be a valid CSS length value e.g. '100px 200px'.
     */
    maxSize(value: string): this

    /**
     * Sets the 'maxHeight' and 'maxWidth' CSS properties on the current `Avita` instance.
     * @param width - The value to set for the 'maxWidth' CSS property. If number, it will be interpreted as pixels.
     * @param height - The value to set for the 'maxHeight' CSS property. If number, it will be interpreted as pixels.
     */
    maxSize(width: string | number, height: string | number): this

    maxSize(valueOrW: string | number, height?: string | number): this {
        if (typeof valueOrW === "string" && height === undefined) {
            const valueArr = valueOrW.split(" ")
            if (valueArr.length === 2) {
                return this.css("maxWidth", valueArr[0]).css(
                    "maxHeight",
                    valueArr[1]
                )
            } else {
                throw new Error(
                    "Invalid value for maxSize(). Must be a valid CSS length value e.g. '100px 200px' or a number for both width and height."
                )
            }
        }
        if (valueOrW && height) {
            if (typeof valueOrW === "number") valueOrW = `${valueOrW}px`
            if (typeof height === "number") height = `${height}px`
            return this.css("maxWidth", valueOrW).css("maxHeight", height)
        } else {
            throw new Error(
                "Invalid value for maxSize(). Must be a valid CSS length value e.g. '100px 200px' or a number for both width and height."
            )
        }
    }

    /**
     * Sets the 'maxHeight' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'maxHeight' CSS property. Can be a valid CSS length value, either a string or a number. If number, it will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    maxH(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("maxHeight", `${value}${unit}`)
    }

    /**
     * Sets the 'maxInlineSize' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'maxInlineSize' CSS property. Can be a valid CSS length value, either a string or a number. If number, it will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    maxInline(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("maxInlineSize", `${value}${unit}`)
    }

    /**
     * Sets the 'maxWidth' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'maxWidth' CSS property. Can be a valid CSS length value, either a string or a number. If number, it will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    maxW(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("maxWidth", `${value}${unit}`)
    }

    /**
     * Sets the 'minHeight' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'minHeight' CSS property. Can be a valid CSS length value, either a string or a number. If number, it will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    minH(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("minHeight", `${value}${unit}`)
    }

    /**
     * Sets the 'minInlineSize' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'minInlineSize' CSS property. Can be a valid CSS length value, either a string or a number. If number, it will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    minInline(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("minInlineSize", `${value}${unit}`)
    }

    /**
     * Sets the 'minWidth' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'minWidth' CSS property. Can be a valid CSS length value, either a string or a number. If number, it will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    minW(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("minWidth", `${value}${unit}`)
    }

    /**
     * Sets the 'mixBlendMode' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'mixBlendMode' CSS property. Must be a valid CSS `mix-blend-mode` value.
     * @returns The current `Avita` instance for chaining.
     */
    blendMode(value: string) {
        return this.css("mixBlendMode", value)
    }

    /**
     * Sets the 'objectFit' CSS property on the current `Avita` instance to the specified value.
     * @param value - The value to set for the 'objectFit' CSS property. Must be a valid CSS `object-fit` value.
     * @returns The current `Avita` instance for chaining.
     * @deprecated Use shorthand methods like `cover()` or `contain()` instead.
     */
    objFit(value: string) {
        return this.css("objectFit", value)
    }

    /**
     * Sets the 'objectFit' CSS property on the current `Avita` instance and all its child elements to 'none'.
     * @returns The current `Avita` instance for chaining.
     */
    none() {
        return this.css("objectFit", "none")
    }

    /**
     * Sets the 'objectFit' CSS property on the current `Avita` instance to 'scale-down'.
     * @returns The current `Avita` instance for chaining.
     */
    scaleDown() {
        return this.css("objectFit", "scale-down")
    }

    /**
     * Sets the 'objectFit' CSS property on the current `Avita` instance to 'cover'.
     * @returns The current `Avita` instance for chaining.
     */
    cover() {
        return this.css("objectFit", "cover")
    }

    /**
     * Sets the 'objectFit' CSS property on the current `Avita` instance to 'contain'.
     * @returns The current `Avita` instance for chaining.
     */
    contain() {
        return this.css("objectFit", "contain")
    }
    /**
     * Sets the 'objectPosition' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'objectPosition' CSS property. Must be a valid CSS `object-position` value.
     * @returns The current `Avita` instance for chaining.
     */
    objXY(value: string) {
        return this.css("objectPosition", value)
    }

    /**
     * Sets the 'offset' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'offset' CSS property. Must be a valid CSS `offset` value.
     * @returns The current `Avita` instance for chaining.
     */
    offset(value: string) {
        return this.css("offset", value)
    }

    /**
     * Sets the 'opacity' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'opacity' CSS property. Must be a valid CSS `opacity` value.
     * @returns The current `Avita` instance for chaining.
     */
    opacity(value: number | string) {
        return this.css("opacity", String(Number(value)))
    }

    /**
     * Sets the 'order' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'order' CSS property. Must be a valid CSS `order` value.
     * @returns The current `Avita` instance for chaining.
     */
    order(value: number | string) {
        return this.css("order", String(Number(value)))
    }

    /**
     * Sets the 'outline' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'outline' CSS property. Must be a valid CSS `outline` value.
     * @returns The current `Avita` instance for chaining.
     */
    outline(value: string) {
        return this.css("outline", value)
    }

    /**
     * Sets the 'outlineWidth' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'outlineWidth' CSS property. Must be a valid CSS `outline-width` value.
     * @returns The current `Avita` instance for chaining.
     */
    outlineW(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("outlineWidth", `${value}${unit}`)
    }

    /**
     * Sets the 'overflow' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'overflow' CSS property. Must be a valid CSS `overflow` value.
     * @returns The current `Avita` instance for chaining.
     */
    overflow(value: string): this

    /**
     * Sets the 'overflow-x' and 'overflow-y' CSS properties on the current `Avita` instance.
     * @param overflowX - The value to set for the 'overflow-x' CSS property. Must be a valid CSS `overflow` value.
     * @param overflowY - The value to set for the 'overflow-y' CSS property. Must be a valid CSS `overflow` value.
     * @returns The current `Avita` instance for chaining.
     */
    overflow(overflowX: string, overflowY: string): this

    overflow(valueOrX: string, overflowY?: string): this {
        if (overflowY === undefined) {
            // Single value: set overflow for both x and y
            return this.css("overflow", valueOrX)
        }
        // Two values: set overflow for x and y separately
        return this.css("overflowX", valueOrX).css("overflowY", overflowY)
    }

    /**
     * Sets the 'overflowWrap' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'overflowWrap' CSS property. Must be a valid CSS `overflow-wrap` value.
     * @returns The current `Avita` instance for chaining.
     */
    overflowWrap(value: string) {
        return this.css("overflowWrap", value)
    }

    /**
     * Sets the 'overflowX' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'overflowX' CSS property. Must be a valid CSS `overflow` value.
     * @returns The current `Avita` instance for chaining.
     */
    overflowX(value: string) {
        return this.css("overflowX", value)
    }

    /**
     * Sets the 'overflowY' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'overflowY' CSS property. Must be a valid CSS `overflow-y` value.
     * @returns The current `Avita` instance for chaining.
     */
    overflowY(value: string) {
        return this.css("overflowY", value)
    }

    /**
     * Sets the 'padding' CSS property with one value applied to all sides.
     * @param value - The value to set for the 'padding' CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    padding(value: string | number): this

    /**
     * Sets the 'padding' CSS property with two values: vertical and horizontal.
     * @param vertical - The value to set for the top and bottom padding.
     * @param horizontal - The value to set for the left and right padding.
     * @returns The current `Avita` instance for chaining.
     */
    padding(vertical: string | number, horizontal: string | number): this

    /**
     * Sets the 'padding' CSS property with three values: top, horizontal, and bottom.
     * @param top - The value to set for the top padding.
     * @param horizontal - The value to set for the left and right padding.
     * @param bottom - The value to set for the bottom padding.
     * @returns The current `Avita` instance for chaining.
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
     * @returns The current `Avita` instance for chaining.
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
                return this.css("padding", processValue(values[0]))
            case 2:
                return this.css(
                    "padding",
                    `${processValue(values[0])} ${processValue(values[1])}`
                )
            case 3:
                return this.css(
                    "padding",
                    `${processValue(values[0])} ${processValue(
                        values[1]
                    )} ${processValue(values[2])}`
                )
            case 4:
                return this.css(
                    "padding",
                    `${processValue(values[0])} ${processValue(
                        values[1]
                    )} ${processValue(values[2])} ${processValue(values[3])}`
                )
            default:
                throw new Error(
                    "Invalid number of arguments provided to padding(). Must be 1, 2, 3, or 4."
                )
        }
    }

    /**
     * Shorthand for setting the 'padding' CSS property on the current `Avita` instance. See `padding()` for variations.
     * @param value - The value to set for the 'padding' CSS property. Can be a valid CSS padding value, either a string or a number (which will be interpreted as pixels).
     * @returns The current `Avita` instance for chaining.
     */
    p = this.padding

    /**
     * Sets the 'padding-top' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'padding-top' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    paddingT(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("paddingTop", `${value}${unit}`)
    }

    /**
     * Shorthand for setting the 'padding-top' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'padding-top' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    pt = this.paddingT

    /**
     * Sets the 'padding-right' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'padding-right' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    paddingR(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("paddingRight", `${value}${unit}`)
    }

    /**
     * Shorthand for setting the 'padding-right' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'padding-right' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    pr = this.paddingR

    /**
     * Sets the 'padding-bottom' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'padding-bottom' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    paddingB(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("paddingBottom", `${value}${unit}`)
    }

    /**
     * Shorthand for setting the 'padding-bottom' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'padding-bottom' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    pb = this.paddingB

    /**
     * Sets the 'padding-left' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'padding-left' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    paddingL(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("paddingLeft", `${value}${unit}`)
    }

    /**
     * Shorthand for setting the 'padding-left' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'padding-left' CSS property. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    pl = this.paddingL

    /**
     * Sets the 'paddingLeft' and 'paddingRight' CSS properties on the current `Avita` instance.
     * @param value - The value to set for the 'paddingLeft' and 'paddingRight' CSS properties. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    paddingX(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("paddingLeft", `${value}${unit}`).css(
            "paddingRight",
            `${value}${unit}`
        )
    }

    /**
     * Shorthand for setting the 'padding-left' and 'padding-right' CSS properties on the current `Avita` instance.
     * @param value - The value to set for the 'padding-left' and 'padding-right' CSS properties. Can be a string or number value, where a number will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    px = this.paddingX

    /**
     * Sets the 'paddingTop' and 'paddingBottom' CSS properties on the current `Avita` instance.
     * @param value - The value to set for the 'paddingTop' and 'paddingBottom' CSS properties. Can be a string or number, where a number will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    paddingY(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("paddingTop", `${value}${unit}`).css(
            "paddingBottom",
            `${value}${unit}`
        )
    }

    /**
     * Shorthand for setting the 'padding-top' and 'padding-bottom' CSS properties on the current `Avita` instance.
     * @param value - The value to set for the 'padding-top' and 'padding-bottom' CSS properties. Can be a string or number, where a number will be interpreted as pixels.
     * @returns The current `Avita` instance for chaining.
     */
    py = this.paddingY

    /**
     * Sets the 'paddingInline' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'paddingInline' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    textPadding(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("paddingInline", `${value}${unit}`)
    }

    /**
     * Sets the 'perspective' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'perspective' CSS property. Can be a string or number value, where a number will be interpreted in pixels.
     * @returns The current `Avita` instance for chaining.
     */
    perspective(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("perspective", `${value}${unit}`)
    }

    /**
     * Sets the 'perspective' CSS property on the current `Avita` instance to a value of "100px".
     * @returns The current `Avita` instance for chaining.
     */
    uncumfy() {
        return this.perspective("100px")
    }

    /**
     * Sets the 'perspective' CSS property on the current `Avita` instance to a value of "250px".
     * @returns The current `Avita` instance for chaining.
     */
    close() {
        return this.perspective("250px")
    }

    /**
     * Sets the 'perspective' CSS property on the current `Avita` instance to a value of "500px".
     * @returns The current `Avita` instance for chaining.
     */
    near() {
        return this.perspective("500px")
    }

    /**
     * Sets the 'perspective' CSS property on the current `Avita` instance to a value of "750px".
     * @returns The current `Avita` instance for chaining.
     */
    away() {
        return this.perspective("750px")
    }

    /**
     * Sets the 'perspective' CSS property on the current `Avita` instance to a value of "1000px".
     * @returns The current `Avita` instance for chaining.
     */
    far() {
        return this.perspective("1000px")
    }

    /**
     * Sets the 'perspective' CSS property on the current `Avita` instance to a value of "2000px".
     * @returns The current `Avita` instance for chaining.
     */
    further() {
        return this.perspective("2000px")
    }

    /**
     * Sets the 'perspectiveOrigin' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'perspectiveOrigin' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
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
     * Sets the 'placeContent' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'placeContent' CSS property. Can be a value from the `string` type.
     * @returns The current `Avita` instance for chaining.
     */
    placeContent(value: string) {
        return this.css("placeContent", value)
    }

    /**
     * Shorthand for setting the 'placeContent' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'placeContent' CSS property. Can be a value from the `string` type.
     * @returns The current `Avita` instance for chaining.
     */
    pContent = this.placeContent

    /**
     * Sets the 'placeItems' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'placeItems' CSS property. Can be a value from the `string` type.
     * @returns The current `Avita` instance for chaining.
     */
    placeItems(value: string) {
        return this.css("placeItems", value)
    }

    /**
     * Shorthand for setting the 'placeItems' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'placeItems' CSS property. Can be a value from the `string` type.
     * @returns The current `Avita` instance for chaining.
     */
    pItems = this.placeItems

    /**
     * Sets the 'placeSelf' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'placeSelf' CSS property. Can be a value from the `string` type.
     * @returns The current `Avita` instance for chaining.
     */
    placeSelf(value: string) {
        return this.css("placeSelf", value)
    }

    /**
     * Shorthand for setting the 'placeSelf' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'placeSelf' CSS property. Can be a value from the `string` type.
     * @returns The current `Avita` instance for chaining.
     */
    pSelf = this.placeSelf

    /**
     * Sets the 'pointerEvents' CSS property on the current `Avita` instance to 'auto', allowing the element to be clicked.
     * @returns The current `Avita` instance for chaining.
     */
    clickable() {
        return this.css("pointerEvents", "auto")
    }

    /**
     * Sets the 'pointerEvents' CSS property on the current `Avita` instance to 'none', disabling the element from being clicked.
     * @returns The current `Avita` instance for chaining.
     */
    unclickable() {
        return this.css("pointerEvents", "none")
    }

    /**
     * Sets the 'quotes' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'quotes' CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    quotes(value: string) {
        return this.css("quotes", value)
    }

    /**
     * Sets the 'resize' CSS property on the current `Avita` instance to 'both', allowing the element to be resized in both horizontal and vertical directions.
     * @returns The current `Avita` instance for chaining.
     */
    resize() {
        return this.css("resize", "both")
    }

    /**
     * Sets the 'resize' CSS property on the current `Avita` instance to 'horizontal', allowing the element to be resized horizontally.
     * @returns The current `Avita` instance for chaining.
     */
    resizeX() {
        return this.css("resize", "horizontal")
    }

    /**
     * Sets the 'resize' CSS property on the current `Avita` instance to 'vertical', allowing the element to be resized vertically.
     * @returns The current `Avita` instance for chaining.
     */
    resizeY() {
        return this.css("resize", "vertical")
    }

    /**
     * Sets the 'right' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'right' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    right(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("right", `${value}${unit}`)
    }

    /**
     * Gets the 'right' CSS property value of the current `Avita` instance.
     * @returns The value of the 'right' CSS property.
     */
    r = this.right

    /**
     * Sets the 'rotate' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'rotate' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    rotate(value: string | number) {
        const unit = typeof value === "string" ? "" : "deg"
        return this.css("rotate", `${value}${unit}`)
    }

    /**
     * Sets the 'rotateX' CSS transform property on the current `Avita` instance.
     * @param value - The value to set for the 'rotateX' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
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
     * A shorthand property for calling the `rotateX()` method on the current `Avita` instance.
     * @returns The current `Avita` instance for chaining.
     */
    rx = this.rotateX

    /**
     * Sets the 'rotateY' CSS transform property on the current `Avita` instance.
     * @param value - The value to set for the 'rotateY' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
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
     * A shorthand property for calling the `rotateY()` method on the current `Avita` instance.
     * @returns The current `Avita` instance for chaining.
     */
    ry = this.rotateY

    /**
     * Sets the 'rotateZ' CSS transform property on the current `Avita` instance.
     * @param value - The value to set for the 'rotateZ' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
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
     * A shorthand property for calling the `rotateZ()` method on the current `Avita` instance.
     * @returns The current `Avita` instance for chaining.
     */
    rz = this.rotateZ

    /**
     * Sets the 'scale' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'scale' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scale(value: string | number) {
        return this.css("scale", String(Number(value)))
    }

    /**
     * Sets the 'scrollBehavior' CSS property on the current `Avita` instance to 'auto', disabling smooth scrolling behavior.
     * @returns The current `Avita` instance for chaining.
     */
    instantScroll() {
        return this.css("scrollBehavior", "auto")
    }

    /**
     * Sets the 'scrollBehavior' CSS property on the current `Avita` instance to 'smooth', enabling smooth scrolling behavior.
     * @returns The current `Avita` instance for chaining.
     */
    smoothScroll() {
        return this.css("scrollBehavior", "smooth")
    }

    /**
     * Sets the 'scrollMargin' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'scrollMargin' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollMargin(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("scrollMargin", `${value}${unit}`)
    }

    /**
     * Shorthands for setting the 'scrollMargin' CSS property on the current `Avita` instance. See `scrollMargin()` for details.
     * @param value - The value to set for the 'scrollMargin' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollM = this.scrollMargin

    /**
     * Sets the 'scrollMarginTop' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'scrollMarginTop' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollMarginTop(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("scrollMarginTop", `${value}${unit}`)
    }

    /**
     * Shorthands for setting the 'scrollMarginTop' CSS property on the current `Avita` instance. See `scrollMarginTop()` for details.
     * @param value - The value to set for the 'scrollMarginTop' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollMT = this.scrollMarginTop

    /**
     * Sets the 'scrollMarginBottom' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'scrollMarginBottom' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollMarginBottom(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("scrollMarginBottom", `${value}${unit}`)
    }

    /**
     * Shorthands for setting the 'scrollMarginBottom' CSS property on the current `Avita` instance. See `scrollMarginBottom()` for details.
     * @param value - The value to set for the 'scrollMarginBottom' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollMB = this.scrollMarginBottom

    /**
     * Sets the 'scrollMarginLeft' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'scrollMarginLeft' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollMarginLeft(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("scrollMarginLeft", `${value}${unit}`)
    }

    /**
     * Shorthands for setting the 'scrollMarginLeft' CSS property on the current `Avita` instance. See `scrollMarginLeft()` for details.
     * @param value - The value to set for the 'scrollMarginLeft' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollML = this.scrollMarginLeft

    /**
     * Sets the 'scrollMarginRight' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'scrollMarginRight' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollMarginRight(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("scrollMarginRight", `${value}${unit}`)
    }

    /**
     * Shorthands for setting the 'scrollMarginRight' CSS property on the current `Avita` instance. See `scrollMarginRight()` for details.
     * @param value - The value to set for the 'scrollMarginRight' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollMR = this.scrollMarginRight

    /**
     * Sets the 'scrollPadding' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'scrollPadding' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollPadding(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("scrollPadding", `${value}${unit}`)
    }

    /**
     * Shorthands for setting the 'scrollPadding' CSS property on the current `Avita` instance. See `scrollPadding()` for details.
     * @param value - The value to set for the 'scrollPadding' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollP = this.scrollPadding

    /**
     * Sets the 'scrollPaddingTop' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'scrollPaddingTop' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollPaddingTop(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("scrollPaddingTop", `${value}${unit}`)
    }

    /**
     * Shorthands for setting the 'scrollPaddingTop' CSS property on the current `Avita` instance. See `scrollPaddingTop()` for details.
     * @param value - The value to set for the 'scrollPaddingTop' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollPT = this.scrollPaddingTop

    /**
     * Sets the 'scrollPaddingBottom' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'scrollPaddingBottom' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollPaddingBottom(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("scrollPaddingBottom", `${value}${unit}`)
    }

    /**
     * Shorthands for setting the 'scrollPaddingBottom' CSS property on the current `Avita` instance. See `scrollPaddingBottom()` for details.
     * @param value - The value to set for the 'scrollPaddingBottom' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollPB = this.scrollPaddingBottom

    /**
     * Sets the 'scrollPaddingLeft' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'scrollPaddingLeft' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollPaddingLeft(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("scrollPaddingLeft", `${value}${unit}`)
    }

    /**
     * Shorthands for setting the 'scrollPaddingLeft' CSS property on the current `Avita` instance. See `scrollPaddingLeft()` for details.
     * @param value - The value to set for the 'scrollPaddingLeft' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollPL = this.scrollPaddingLeft

    /**
     * Sets the 'scrollPaddingRight' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'scrollPaddingRight' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollPaddingRight(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("scrollPaddingRight", `${value}${unit}`)
    }

    /**
     * Shorthands for setting the 'scrollPaddingRight' CSS property on the current `Avita` instance. See `scrollPaddingRight()` for details.
     * @param value - The value to set for the 'scrollPaddingRight' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    scrollPR = this.scrollPaddingRight

    /**
     * Sets the 'scrollSnapAlign' CSS property on the current `Avita` instance to 'start', aligning the element to the start of the scroll container.
     * @returns The current `Avita` instance for chaining.
     */
    scrollSnap() {
        return this.css("scrollSnapAlign", "start")
    }

    /**
     * Sets the 'tabSize' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'tabSize' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    tabSize(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("tabSize", `${value}${unit}`)
    }

    /**
     * Sets the 'textAlign' CSS property on the current `Avita` instance to 'left', aligning the text to the left.
     * @returns The current `Avita` instance for chaining.
     */
    textL() {
        return this.css("textAlign", "left")
    }

    /**
     * Sets the 'textAlign' CSS property on the current `Avita` instance to 'right', aligning the text to the right.
     * @returns The current `Avita` instance for chaining.
     */
    textR() {
        return this.css("textAlign", "right")
    }

    /**
     * Sets the 'textAlign' CSS property on the current `Avita` instance to 'center', aligning the text to the center.
     * @returns The current `Avita` instance for chaining.
     */
    textC() {
        return this.css("textAlign", "center")
    }

    /**
     * Sets the 'textAlign' CSS property on the current `Avita` instance to 'justify', aligning the text to be justified.
     * @returns The current `Avita` instance for chaining.
     */
    textJ() {
        return this.css("textAlign", "justify")
    }

    /**
     * Sets the 'textDecoration' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'textDecoration' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    decoration(value: string) {
        return this.css("textDecoration", value)
    }

    /**
     * Sets the 'textDecorationLine' CSS property on the current `Avita` instance to 'overline', creating a halo effect.
     * @returns The current `Avita` instance for chaining.
     */
    halo() {
        return this.css("textDecorationLine", "overline")
    }

    /**
     * Sets the 'textDecorationLine' CSS property on the current `Avita` instance to "line-through", creating a strikethrough effect.
     * @returns The current `Avita` instance for chaining.
     */
    crossout() {
        return this.css("textDecorationLine", "line-through")
    }

    /**
     * Sets the 'textDecorationLine' CSS property on the current `Avita` instance to 'underline'.
     * @returns The current `Avita` instance for chaining.
     */
    underline() {
        return this.css("textDecorationLine", "underline")
    }

    /**
     * Sets the 'textEmphasis' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'textEmphasis' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    emphasis(value: string) {
        return this.css("textEmphasis", value)
    }

    /**
     * Sets the 'textIndent' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'textIndent' CSS property. Can be a string value or a number representing a pixel value.
     * @returns The current `Avita` instance for chaining.
     */
    indent(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("textIndent", `${value}${unit}`)
    }

    /**
     * Sets the 'textOrientation' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'textOrientation' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    textOrient(value: string) {
        return this.css("textOrientation", value)
    }

    /**
     * Rotates the text of the current `Avita` instance by 90 degrees, displaying it vertically.
     * Sets the 'textOrientation' CSS property on the current `Avita` instance to 'upright'.
     * @returns The current `Avita` instance for chaining.
     */
    verticalText() {
        return this.css("textOrientation", "upright")
    }

    /**
     * Rotates the text of the current `Avita` instance by 90 degrees, displaying it vertically.
     * Sets the 'textOrientation' CSS property on the current `Avita` instance to 'sideways'.
     * @returns The current `Avita` instance for chaining.
     */
    sideways() {
        return this.css("textOrientation", "sideways")
    }

    /**
     * This will cause any overflowing text to be truncated and display an ellipsis ('...') at the end.
     * Sets the 'textOverflow' CSS property on the current `Avita` instance to 'ellipsis'.
     * @returns The current `Avita` instance for chaining.
     */
    ellipses() {
        return this.css("textOverflow", "ellipsis")
    }

    clipText() {
        return this.css("textOverflow", "clip")
    }

    /**
     * Sets the 'textShadow' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'textShadow' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    textShadow(value: string) {
        return this.css("textShadow", value)
    }

    /**
     * Sets the 'textTransform' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'textTransform' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    textTrans(value: string) {
        return this.css("textTransform", value)
    }

    /**
     * UPPERCASE TEXT!!!
     * Sets the 'textTransform' CSS property on the current `Avita` instance to 'uppercase'.
     * @returns The current `Avita` instance for chaining.
     */
    caps() {
        return this.css("textTransform", "uppercase")
    }

    /**
     * Capitalizes the first letter of each word
     * Sets the 'textTransform' CSS property on the current `Avita` instance to "capitalize".
     * @returns The current `Avita` instance for chaining.
     */
    capEach() {
        return this.css("textTransform", "capitalize")
    }

    /**
     * lowercase text...
     * Sets the 'textTransform' CSS property on the current `Avita` instance to 'lowercase'.
     * @returns The current `Avita` instance for chaining.
     */
    lowercase() {
        return this.css("textTransform", "lowercase")
    }

    /**
     * Sets the 'textUnderlineOffset' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'textUnderlineOffset' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    underlineY(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("textUnderlineOffset", `${value}${unit}`)
    }

    /**
     * Sets the 'top' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'top' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    top(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("top", `${value}${unit}`)
    }

    /**
     * Shorthand for `top()` method.
     * Gets the 'top' CSS property value of the current `Avita` instance.
     * @returns The current value of the 'top' CSS property.
     */
    t = this.top

    /**
     * Sets the 'touchAction' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'touchAction' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    touch(value: string) {
        return this.css("touchAction", value)
    }

    /**
     * Sets the 'transform' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'transform' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    transform(value: string) {
        return this.css("transform", value)
    }

    /**
     * Sets the 'transformOrigin' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'transformOrigin' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    origin(value: string) {
        return this.css("transformOrigin", value)
    }

    /**
     * Sets the 'transformStyle' CSS property on the current `Avita` instance to 'flat'.
     * This flattens the 3D transform of the element.
     * @returns The current `Avita` instance for chaining.
     */
    flat(): this {
        return this.css("transformStyle", "flat")
    }

    /**
     * Sets the 'transformStyle' CSS property on the current `Avita` instance to 'preserve-3d'.
     * This preserves the 3D transform of the element.
     * @returns The current `Avita` instance for chaining.
     */
    preserve3d(): this {
        return this.css("transformStyle", "preserve-3d")
    }

    /**
     * Adds the 'transition' CSS property on the current `Avita` instance.
     * Defaults to 'all 0.1s ease-in-out'.
     * @returns The current `Avita` instance for chaining.
     */
    transition(): this

    /**
     * Sets the 'transition' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'transition' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    transition(value: string): this

    transition(value: string = "all 0.1s ease-in-out"): this {
        return this.css("transition", value)
    }

    /**
     * Sets the 'transitionDelay' CSS property on the current `Avita` instance. Default number value is in seconds.
     * @param value - The value to set for the 'transitionDelay' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    delay(value: string | number) {
        const unit = typeof value === "string" ? "" : "s"
        return this.css("transitionDelay", `${value}${unit}`)
    }

    /**
     * Sets the 'transitionDuration' CSS property on the current `Avita` instance. Default number value is in seconds.
     * @param value - The value to set for the 'transitionDuration' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    duration(value: string | number) {
        const unit = typeof value === "string" ? "" : "s"
        return this.css("transitionDuration", `${value}${unit}`)
    }

    /**
     * Sets the 'transitionProperty' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'transitionProperty' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    transProp(value: string) {
        return this.css("transitionProperty", value)
    }

    /**
     * Sets the 'transitionTimingFunction' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'transitionTimingFunction' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    timingFunc(value: string) {
        return this.css("transitionTimingFunction", value)
    }

    /**
     * Sets the 'translate' CSS property on the current `Avita` instance.
     * Applies a translation along the X-axis, Y-axis, and optionally the Z-axis using a single string.
     * @param value - The full `translate` value as a string (e.g., "10px, 20px, 30px").
     * @returns The current `Avita` instance for chaining.
     */
    translate(value: string): this

    /**
     * Sets the 'translate' CSS property on the current `Avita` instance.
     * Applies a 2D translation along the X-axis.
     * @param x - The value to set for the 'translate' CSS property along the X-axis. Can be a string or number.
     * @returns The current `Avita` instance for chaining.
     */
    translate(x: string | number): this

    /**
     * Sets the 'translate' CSS property on the current `Avita` instance.
     * Applies a 2D translation along the X and Y axes.
     * @param x - The value to set for the 'translate' CSS property along the X-axis. Can be a string or number.
     * @param y - The value to set for the 'translate' CSS property along the Y-axis. Can be a string or number.
     * @returns The current `Avita` instance for chaining.
     */
    translate(x: string | number, y: string | number): this

    /**
     * Sets the 'translate' CSS property on the current `Avita` instance.
     * Applies a 3D translation along the X, Y, and Z axes.
     * @param x - The value to set for the 'translate' CSS property along the X-axis. Can be a string or number.
     * @param y - The value to set for the 'translate' CSS property along the Y-axis. Can be a string or number.
     * @param z - The value to set for the 'translate' CSS property along the Z-axis. Can be a string or number. This parameter is optional.
     * @returns The current `Avita` instance for chaining.
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

        return this.css("translate", translateValue)
    }

    /**
     * Sets the 'translateX' CSS translate property on the current `Avita` instance.
     * @param value - The value to set for the 'translateX' transform. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    translateX(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.translate(`${value}${unit} 0 0`)
    }

    /**
     * Shorthand for `translateX()` method.
     * Sets the 'translateX' CSS translate property on the current `Avita` instance.
     * @param value - The value to set for the 'translateX' transform. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    transX = this.translateX

    /**
     * Sets the 'translateY' CSS translate property on the current `Avita` instance.
     * @param value - The value to set for the 'translateY' transform. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    translateY(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.translate(`0 ${value}${unit} 0`)
    }

    /**
     * Shorthand for `translateY()` method.
     * Sets the 'translateY' CSS translate property on the current `Avita` instance.
     * @param value - The value to set for the 'translateY' transform. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    transY = this.translateY

    /**
     * Sets the 'translateZ' CSS translate property on the current `Avita` instance.
     * @param value - The value to set for the 'translateZ' transform. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    translateZ(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.translate(`0 0 ${value}${unit}`)
    }

    /**
     * Shorthand for `translateZ()` method.
     * Sets the 'translateZ' CSS translate property on the current `Avita` instance.
     * @param value - The value to set for the 'translateZ' transform. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    transZ = this.translateZ

    /**
     * Sets the 'userSelect' CSS property on the current `Avita` instance to 'auto', allowing the element to be selectable.
     * @returns The current `Avita` instance for chaining.
     */
    selectable() {
        return this.css("userSelect", "auto")
    }

    /**
     * Sets the 'userSelect' CSS property on the current `Avita` instance to 'none', making the element unselectable.
     * @returns The current `Avita` instance for chaining.
     */
    unselectable() {
        return this.css("userSelect", "none")
    }

    /**
     * Sets the 'verticalAlign' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'verticalAlign' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    verticalAlign(value: string) {
        return this.css("verticalAlign", value)
    }

    /**
     * Sets the 'visibility' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'visibility' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    visibility(value: string) {
        return this.css("visibility", value)
    }

    /**
     * Sets the 'whiteSpace' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'whiteSpace' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    whiteSpace(value: string) {
        return this.css("whiteSpace", value)
    }

    textWrap() {
        return this.whiteSpace("pre-wrap")
    }

    /**
     * Sets the 'wordBreak' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'wordBreak' CSS property. Can be a string value.
     * @returns The current `Avita` instance for chaining.
     */
    wordBreak(value: string) {
        return this.css("wordBreak", value)
    }

    /**
     * Sets the 'wordSpacing' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'wordSpacing' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    wordSpacing(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("wordSpacing", `${value}${unit}`)
    }

    /**
     * Sets the 'width' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'width' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    width(value: string | number) {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("width", `${value}${unit}`)
    }

    /**
     * Shorthand for `width()`
     * Sets the 'width' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'width' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    w = this.width

    /**
     * Sets the 'zIndex' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'zIndex' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    zIndex(value: string | number) {
        return this.css("zIndex", String(Number(value)))
    }

    /**
     * Shorthand for `zIndex()`
     * Sets the 'zIndex' CSS property on the current `Avita` instance.
     * @param value - The value to set for the 'zIndex' CSS property. Can be a string or number value.
     * @returns The current `Avita` instance for chaining.
     */
    z = this.zIndex

    /**
     * Shows the element by setting the 'visibility' CSS property to 'visible'.
     * @returns The current `Avita` instance for chaining.
     */
    visible() {
        return this.css("visibility", "visible")
    }

    /**
     * Hides the element by setting the 'visibility' CSS property to 'hidden'.
     * @returns The current `Avita` instance for chaining.
     */
    invisible() {
        return this.css("visibility", "hidden")
    }

    /**
     * Sets the 'opacity' CSS property on the current `Avita` instance to 0.
     * @returns The current `Avita` instance for chaining.
     */
    transparent() {
        return this.opacity(0)
    }

    /**
     * Sets the 'opacity' CSS property on the current `Avita` instance to 0.5.
     * @returns The current `Avita` instance for chaining.
     */
    translucent() {
        return this.opacity(0.5)
    }

    /**
     * Sets the 'opacity' CSS property on the current `Avita` instance to 1.
     * @returns The current `Avita` instance for chaining.
     */
    opaque() {
        return this.opacity(1)
    }

    /**
     * Shows the element by setting the 'display' CSS property to the specified value.
     * @param display - The value to set for the 'display' CSS property. Defaults to 'flex'.
     * @returns The current `Avita` instance for chaining.
     */
    show(display: string = "flex") {
        return this.css("display", display)
    }

    /**
     * Hides the element by setting the 'display' CSS property to 'none'.
     * @returns The current `Avita` instance for chaining.
     */
    hide() {
        return this.css("display", "none")
    }

    /**
     * Toggles the visibility of the element by setting the 'display' CSS property to either 'none' or the previously set value.
     * @returns The current `Avita` instance for chaining.
     */
    toggle() {
        return this.css("display") === "none" ? this.show() : this.hide()
    }

    /**
     * Centers the child elements by setting the 'display' CSS property to 'flex' and setting the 'justifyContent' and 'alignItems' CSS properties to 'center'.
     * @returns The current `Avita` instance for chaining.
     */
    center(): this

    /**
     * Centers the element itself by setting the 'margin' CSS property to 'auto'.
     * @returns The current `Avita` instance for chaining.
     */
    center(type: "self"): this

    /**
     * Centers the child elements by setting the 'display' CSS property to 'flex' and setting the 'justifyContent' and 'alignItems' CSS properties to 'center'.
     * @returns The current `Avita` instance for chaining.
     */
    center(type: "flex"): this

    /**
     * Centers the element itself by setting its position to absolute and transforming its position.
     * @param type - Type of centering.
     * @returns The current `Avita` instance for chaining.
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
     * Stacks the current `Avita` and its children vertically, with the ability to align the children along the vertical axis.
     * Fills 100% of the parent's width and height by default.
     * @param align - The alignment of the children along the vertical axis. Defaults to 'center'.
     * @returns The current `Avita` instance for chaining.
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
     * Stacks the current `Avita` and its children horizontally, with the ability to align the children along the horizontal axis.
     * Fills 100% of the parent's width and height by default.
     * @param align - The alignment of the children along the horizontal axis. Defaults to 'center'.
     * @returns The current `Avita` instance for chaining.
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
     * Stacks the current `Avita` and its children vertically, with the ability to align the children along the vertical axis.
     * Fills 100% of the parent's width and height by default.
     * @param align - The alignment of the children along the vertical axis. Defaults to 'center'.
     * @returns The current `Avita` instance for chaining.
     */
    zstack(align: string = "center") {
        this.relative()
        this.hstack(align)
        $(() => this.avitaChildren.forEach((child) => child.absolute()))
        return this
    }

    /**
     * Sets the 'position' CSS property to 'absolute' on the current `Avita` instance.
     * @returns The current `Avita` instance for chaining.
     */
    absolute() {
        return this.css("position", "absolute")
    }

    /**
     * Sets the 'position' CSS property to 'relative' on the current `Avita` instance.
     * @returns The current `Avita` instance for chaining.
     */
    relative() {
        return this.css("position", "relative")
    }

    /**
     * Sets the 'position' CSS property to 'fixed' on the current `Avita` instance.
     * @returns The current `Avita` instance for chaining.
     */
    fixed() {
        return this.css("position", "fixed")
    }

    /**
     * Sets the 'position' CSS property to 'sticky' on the current `Avita` instance.
     * @returns The current `Avita` instance for chaining.
     */
    sticky() {
        return this.css("position", "sticky")
    }

    /**
     * Sets the 'position' CSS property to 'static' on the current `Avita` instance.
     * @returns The current `Avita` instance for chaining.
     */
    static() {
        return this.css("position", "static")
    }

    block() {
        return this.css("display", "block")
    }

    /**
     * Sets the display property of the current `Avita` instance to 'flex'.
     * @returns The current `Avita` instance for chaining.
     */
    flex() {
        return this.css("display", "flex")
    }

    /**
     * Sets the display property of the current `Avita` instance to 'grid'.
     * @returns The current `Avita` instance for chaining.
     */
    grid() {
        return this.css("display", "grid")
    }

    /**
     * Sets the font weight to 'bold'.
     * @returns The current `Avita` instance for chaining.
     */
    bold() {
        return this.css("fontWeight", "bold")
    }

    /**
     * Sets the font weight to 'normal'.
     * @returns The current `Avita` instance for chaining.
     */
    normal() {
        return this.css("fontWeight", "normal")
    }

    /**
     * Sets the font weight to 'lighter'.
     * @returns The current `Avita` instance for chaining.
     */
    lighter() {
        return this.css("fontWeight", "lighter")
    }

    /**
     * Sets the font weight to 'bolder'.
     * @returns The current `Avita` instance for chaining.
     */
    bolder() {
        return this.css("fontWeight", "bolder")
    }

    /**
     * Sets the stroke color of the element.
     * @param value - The CSS color value to set as the stroke.
     * @returns The current `Avita` instance for chaining.
     */
    stroke(value: string) {
        return this.css("stroke", value)
    }

    /**
     * Sets the stroke width of the element.
     * @param value - The CSS length value to set as the stroke width. Can be a number (in pixels) or a string.
     * @returns The current `Avita` instance for chaining.
     */
    strokeW(value: string | number): this {
        const unit = typeof value === "string" ? "" : "px"
        return this.css("strokeWidth", `${value}${unit}`)
    }

    /**
     * Sets the stroke opacity of the element.
     * @param value - The stroke opacity value to set (between 0 and 1).
     * @returns The current `Avita` instance for chaining.
     */
    strokeOpacity(value: string | number) {
        return this.css("strokeOpacity", String(Number(value)))
    }

    /**
     * Sets the stroke linecap of the element.
     * @param value - The CSS value to set as the stroke linecap (e.g., "butt", "round", "square").
     * @returns The current `Avita` instance for chaining.
     */
    linecap(value: string) {
        return this.css("strokeLinecap", value)
    }

    /**
     * Sets the stroke linejoin of the element.
     * @param value - The CSS value to set as the stroke linejoin (e.g., "miter", "round", "bevel").
     * @returns The current `Avita` instance for chaining.
     */
    linejoin(value: string) {
        return this.css("strokeLinejoin", value)
    }

    /**
     * Sets the stroke dash array of the element.
     * @param value - The CSS value to set as the stroke dash array.
     * @returns The current `Avita` instance for chaining.
     */
    dasharray(value: string) {
        return this.css("strokeDasharray", value)
    }

    /**
     * Sets the skew transformation angle of the element along the X-axis.
     * @param value - The skew angle in degrees.
     * @returns The current `Avita` instance for chaining.
     */
    skewX(value: number) {
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
     * @returns The current `Avita` instance for chaining.
     */
    skewY(value: number) {
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
     * @returns The current `Avita` instance for chaining.
     */
    matrix(value: string): this {
        return this.css("transform", value)
    }

    /**
     * Sets the object fit property of the element to fill.
     * @returns The current `Avita` instance for chaining.
     */
    fill(): this

    /**
     * Sets the fill of the element.
     * @param value - The fill value to set. If not provided, the element's object-fit will be set to "fill".
     * @returns The current `Avita` instance for chaining.
     */
    fill(value: string): this

    fill(value?: string) {
        if (value === undefined) {
            // If no value is provided, set the object-fit property to "fill"
            this.css("objectFit", "fill")
        } else {
            // If a value is provided, set the fill property to the provided value
            this.css("fill", value)
        }
        return this
    }

    /**
     * Sets the fill opacity of the element.
     * @param value - The fill opacity value to set (between 0 and 1).
     * @returns The current `Avita` instance for chaining.
     */
    fillOpacity(value: number): this {
        return this.css("fillOpacity", String(Number(value)))
    }

    /**
     * Sets the element to be the full size of the viewport.
     * @returns The current `Avita` instance for chaining.
     */
    screen() {
        return this.screenW().screenH()
    }

    /**
     * Sets the element to be the width of the viewport.
     * @returns The current `Avita` instance for chaining.
     */
    screenW() {
        return this.w("100vw")
    }

    /**
     * Sets the element to be height of the viewport.
     * @returns The current `Avita` instance for chaining.
     */
    screenH() {
        return this.h("100vh")
    }

    /**
     * Sets the element to be full-width and full-height.
     * @returns The current `Avita` instance for chaining.
     */
    full() {
        return this.fullW().fullH()
    }

    /**
     * Sets the element to be full-width.
     * @returns The current `Avita` instance for chaining.
     */
    fullW() {
        return this.w("100%")
    }

    /**
     * Sets the element to be full-height.
     * @returns The current `Avita` instance for chaining.
     */
    fullH() {
        return this.h("100%")
    }

    /**
     * Converts the provided radius value to a valid CSS border-radius value.
     * If the radius is undefined, it returns "9999px" to create a circular border.
     * If the radius is a number, it converts it to a pixel value.
     * If the radius is a string, it returns the string as-is.
     * @param radius - The radius value to convert.
     * @returns The converted border-radius value.
     */
    private borderRadiusValue(radius: string | number | undefined) {
        return radius === undefined
            ? "9999px"
            : typeof radius === "number"
            ? `${radius}px`
            : radius
    }

    /**
     * Sets the border-radius of the current element.
     * @param radius - The border-radius value to set. Can be a number (in pixels) or a string (e.g. "10px").
     * @returns The current `Avita` instance for chaining.
     */
    rounded(radius?: number | string) {
        return this.css("borderRadius", this.borderRadiusValue(radius))
    }

    /**
     * Sets the border-top-left-radius of the current element.
     * @param radius - The border-radius value to set. Can be a number (in pixels) or a string (e.g. "10px").
     * @returns The current `Avita` instance for chaining.
     */
    roundedTL(radius?: number | string) {
        return this.css("borderTopLeftRadius", this.borderRadiusValue(radius))
    }

    /**
     * Sets the border-top-right-radius of the current element.
     * @param radius - The border-radius value to set. Can be a number (in pixels) or a string (e.g. "10px").
     * @returns The current `Avita` instance for chaining.
     */
    roundedTR(radius?: number | string) {
        return this.css("borderTopRightRadius", this.borderRadiusValue(radius))
    }

    /**
     * Sets the border-bottom-left-radius of the current element.
     * @param radius - The border-radius value to set. Can be a number (in pixels) or a string (e.g. "10px").
     * @returns The current `Avita` instance for chaining.
     */
    roundedBL(radius?: number | string) {
        return this.css(
            "borderBottomLeftRadius",
            this.borderRadiusValue(radius)
        )
    }

    /**
     * Sets the border-bottom-right-radius of the current element.
     * @param radius - The border-radius value to set. Can be a number (in pixels) or a string (e.g. "10px").
     * @returns The current `Avita` instance for chaining.
     */
    roundedBR(radius?: number | string) {
        return this.css(
            "borderBottomRightRadius",
            this.borderRadiusValue(radius)
        )
    }

    /**
     * Sets the border-top-left-radius and border-top-right-radius of the current element.
     * @param radius - The border-radius value to set. Can be a number (in pixels) or a string (e.g. "10px").
     * @returns The current `Avita` instance for chaining.
     */
    roundedT(radius?: number | string) {
        return this.roundedTL(radius).roundedTR(radius)
    }

    /**
     * Sets the border-bottom-left-radius and border-bottom-right-radius of the current element.
     * @param radius - The border-radius value to set. Can be a number (in pixels) or a string (e.g. "10px").
     * @returns The current `Avita` instance for chaining.
     */
    roundedB(radius?: number | string) {
        return this.roundedBL(radius).roundedBR(radius)
    }

    /**
     * Sets the border-top-left-radius and border-bottom-left-radius of the current element.
     * @param radius - The border-radius value to set. Can be a number (in pixels) or a string (e.g. "10px").
     * @returns The current `Avita` instance for chaining.
     */
    roundedL(radius?: number | string) {
        return this.roundedTL(radius).roundedBL(radius)
    }

    /**
     * Sets the border-top-right-radius and border-bottom-right-radius of the current element.
     * @param radius - The border-radius value to set. Can be a number (in pixels) or a string (e.g. "10px").
     * @returns The current `Avita` instance for chaining.
     */
    roundedR(radius?: number | string) {
        return this.roundedTR(radius).roundedBR(radius)
    }

    /**
     * Sets the viewBox attribute of the current `Avita` element.
     * @param x - The x-coordinate of the viewBox.
     * @param y - The y-coordinate of the viewBox.
     * @param width - The width of the viewBox.
     * @param height - The height of the viewBox.
     * @returns The current `Avita` instance for chaining.
     */
    viewBox(x: number, y: number, width: number, height: number): this {
        return this.attr("viewBox", `${x} ${y} ${width} ${height}`)
    }

    /**
     * Sets the preserveAspectRatio attribute of the current `Avita` element.
     * @param align - The alignment of the viewBox within the viewport. Can be one of the following values: 'none', 'xMinYMin', 'xMidYMin', 'xMaxYMin', 'xMinYMid', 'xMidYMid', 'xMaxYMid', 'xMinYMax', 'xMidYMax', 'xMaxYMax'.
     * @param meetOrSlice - The scaling behavior of the viewBox within the viewport. Can be either 'meet' or 'slice'.
     * @returns The current `Avita` instance for chaining.
     */
    preserveRatio(align: string, meetOrSlice: string) {
        return this.attr("preserveAspectRatio", `${align} ${meetOrSlice}`)
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
        this.addClass(uniqueClass)

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

    /**
     * Returns a new `Avita` instance wrapping the parent element of the current element.
     * @returns A new `Avita` instance wrapping the parent element of the current element.
     */
    parent(): Avita<T> {
        return new Avita(this.element.parentElement as T)
    }

    /**
     * Returns a new `Avita` instance wrapping the sibling elements of the current element.
     * @returns A new `Avita` instance wrapping the sibling elements of the current element, or `null` if the current element has no parent.
     */
    siblings(): Avita<T> | null {
        const elmt = this.element as HTMLElement
        const parent = elmt.parentElement

        if (!parent) return null

        const siblings = Array.from(parent.children).filter(
            (child) => child !== elmt
        )

        return new Avita<T>(siblings.map((sibling) => sibling as T))
    }

    /**
     * Toggles the specified CSS class on the current element/all elements in the collection.
     * @param className - The CSS class to toggle.
     * @returns The current `Avita` instance for chaining.
     */
    toggleClass(className: string): this {
        this.element.classList.toggle(className)
        if (this.elements.length > 0) {
            this.elements.forEach((element) => {
                element.classList.toggle(className)
            })
        }
        return this
    }

    /**
     * Adds the specified CSS class(es) to the current element/all elements in the collection.
     * @param classNames - The CSS class(es) to add.
     * @returns The current `Avita` instance for chaining.
     */
    addClass(...classNames: string[]): this {
        this.element.classList.add(...classNames)
        if (this.elements.length > 0) {
            this.elements.forEach((element) => {
                element.classList.add(...classNames)
            })
        }
        return this
    }

    /**
     * Removes the specified CSS class(es) from the current element/all elements in the collection.
     * @param classNames - The CSS class(es) to remove.
     * @returns The current `Avita` instance for chaining.
     */
    removeClass(...classNames: string[]): this {
        this.element.classList.remove(...classNames)
        if (this.elements.length > 0) {
            this.elements.forEach((element) => {
                element.classList.remove(...classNames)
            })
        }
        return this
    }

    /**
     * Scrolls the current element or elements in the collection into the visible area of the browser window.
     * @param behavior - The behavior for the scroll operation. Can be either "auto" (default) or "smooth".
     * @param block - The block to align the element to. Can be either "start", "center", "nearest", or "end".
     * @returns The current `Avita` instance for chaining.
     */
    scrollIntoView(
        behavior: "auto" | "smooth" = "auto",
        block: "start" | "center" | "nearest" | "end" = "start"
    ): this {
        this.element.scrollIntoView({ block, behavior })
        return this
    }
    /**
     * Scrolls the window to the x and y coordinates.
     * @param y - The y coordinate to scroll to.
     * @param x - (optional) The x coordinate to scroll to.
     */
    static scroll(y: number, x?: number): void

    /**
     * Scrolls the window using the specified options.
     * @param options - The y coordinate to scroll to, or an object containing options for the scroll operation.
     */
    static scroll(options: ScrollToOptions): void

    static scroll(yOrOptions: number | ScrollToOptions, x?: number): void {
        if (typeof yOrOptions === "number") {
            window.scroll(x || 0, yOrOptions)
        } else if (typeof yOrOptions === "object") {
            window.scroll(yOrOptions)
        }
    }

    /**
     * Scrolls the window to the specified x and y coordinates.
     * @param y - The y coordinate to scroll to.
     * @param x - (optional) The x coordinate to scroll to.
     * @returns The current `Avita` instance for chaining.
     */
    scroll(y: number, x?: number): void

    /**
     * Scrolls the window using the specified options
     * @param options - The options to use for the scroll operation.
     */
    scroll(options: ScrollToOptions): void

    scroll(yOrOptions: number | ScrollToOptions, x?: number) {
        if (x === undefined && typeof yOrOptions === "object") {
            Avita.scroll(yOrOptions as ScrollToOptions)
        } else if (typeof yOrOptions === "number") {
            Avita.scroll(yOrOptions, x)
        }
        return this
    }

    /**
     * Scrolls the window to the top of the page.
     * @param smooth - If set to `true`, the scroll will be animated smoothly. Otherwise, it will scroll instantly.
     */
    static scrollToTop(smooth: boolean = false): void {
        Avita.scroll({
            top: 0,
            behavior: smooth ? "smooth" : "instant",
        })
    }

    /**
     * Scrolls the window to the top of the page.
     * @param smooth - If set to `true`, the scroll will be animated smoothly. Otherwise, it will scroll instantly.
     * @returns The current `Avita` instance for chaining.
     */
    scrollToTop(smooth: boolean = false) {
        Avita.scrollToTop(smooth)
        return this
    }

    /**
     * Scrolls the window to the bottom of the page.
     * @param smooth - If set to `true`, the scroll will be animated smoothly. Otherwise, it will scroll instantly.
     */
    static scrollToBottom(smooth: boolean = true): void {
        Avita.scroll({
            top: document.body.scrollHeight,
            behavior: smooth ? "smooth" : "instant",
        })
    }

    /**
     * Scrolls the window to the bottom of the page.
     * @param smooth - If set to `true`, the scroll will be animated smoothly. Otherwise, it will scroll instantly.
     * @returns The current `Avita` instance, allowing for method chaining.
     */
    scrollToBottom(smooth: boolean = true) {
        Avita.scrollToBottom(smooth)
        return this
    }

    /**
     * Returns the bounding rectangle of the document element.
     * @returns The bounding rectangle of the document element.
     */
    static rect(): DOMRect {
        return document.documentElement.getBoundingClientRect()
    }

    /**
     * Returns the bounding rectangle of the current Avita instance's element.
     * @returns The bounding rectangle of the current Avita instance's element.
     */
    rect(): DOMRect {
        return this.element.getBoundingClientRect()
    }

    /**
     * Iterates over the elements in the current Avita instance and calls the provided callback function for each element.
     * @param callback - The function to call for each element. The function will receive the Avita instance for the current element and the index of the element.
     * @returns The current Avita instance, allowing for method chaining.
     */
    each(callback: (element: Avita<T>, index: number) => void): this {
        this.elements.forEach((element, index) => {
            callback(new Avita(element), index)
        })
        return this
    }

    /**
     * Returns the current height of the window.
     * @returns The current height of the window in pixels.
     */
    static height(): number {
        return window.innerHeight
    }

    /**
     * Shorthand that returns the current height of the window.
     * @returns The current height of the window in pixels.
     */
    static h = Avita.height

    /**
     * Returns the current width of the window.
     * @returns The current width of the window in pixels.
     */
    static width(): number {
        return window.innerWidth
    }

    /**
     * Shorthand that returns the current width of the window.
     * @returns The current width of the window in pixels.
     */
    static w = Avita.width
}

/**
 * Selects an HTML element or a collection of HTML elements matching the provided CSS selector.
 * @param selector - The CSS selector to use for selecting the element(s).
 * @param raw - If set to `true`, the function will return the raw HTMLElement or HTMLElement[] instead of an Avita instance.
 * @returns The raw HTMLElement or HTMLElement[] if `raw` is `true` or an Avita instance if `raw` is `false`/`undefined`.
 */
export function $<T extends HTMLElement | SVGElement>(
    selector: string,
    raw: true
): T | T[]

/**
 * Selects an HTML element or a collection of HTML elements matching the provided CSS selector.
 * @param selector - The CSS selector to use for selecting the element(s).
 * @param raw - If set to `true`, the function will return the raw HTMLElement or HTMLElement[] instead of an Avita instance.
 * @returns An `Avita` instance wrapping the selected element(s), or the raw HTMLElement or HTMLElement[] if `raw` is `true`.
 */
export function $<T extends HTMLElement | SVGElement>(
    selector: string,
    raw?: false
): Avita<T>

/**
 * Selects an HTML element or a collection of HTML elements matching the provided CSS selector.
 * @param selector - The CSS selector to use for selecting the element(s).
 * @returns An `Avita` instance wrapping the selected element(s).
 */
export function $<T extends HTMLElement | SVGElement>(
    selector: string
): Avita<T>

/**
 * Executes the provided callback function when the DOM is ready.
 * @param callback - The function to execute when the DOM is ready.
 */
export function $(callback: () => void): void

export function $<T extends HTMLElement | SVGElement>(
    selectorOrCallback: string | (() => void),
    raw?: boolean
): Avita<T> | T | T[] | null | void {
    if (typeof selectorOrCallback === "string") {
        return Avita.find<T>(selectorOrCallback, raw)
    } else if (typeof selectorOrCallback === "function") {
        // Handle DOM ready event
        Avita.ready(selectorOrCallback)
    }
}
