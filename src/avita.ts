import { style } from "./elements"
import { camelToKebab, defaultStyles, generateClass } from "./utils"

export type EL = EventListenerOrEventListenerObject
export type HTMLTag = HTMLElement | SVGElement
export type Children<T extends HTMLTag> = (Avita<T> | string)[]

export default class Avita<T extends HTMLTag> {
    private element: T
    private elements: T[] = [] // mostly used when querying for multiple elements, otherwise empty
    private avitaChildren: Children<T> = []

    /**
     * Creates a new instance of the Avita class.
     * @param tag - The tag name of the HTML element to create.
     */
    constructor(tag: string, children?: Children<T>)

    /**
     * Creates a new instance of the Avita class.
     * @param element - The HTML element to wrap.
     */
    constructor(element: T, children?: Children<T>)

    /**
     * Creates a new instance of the Avita class.
     * @param elements - The HTML elements to wrap.
     */
    constructor(elements: T[], children?: Children<T>)

    constructor(tagOrElement: string | T | T[], children: Children<T> = []) {
        if (Array.isArray(tagOrElement)) {
            if (tagOrElement.length === 0) {
                throw new Error("The elements array should not be empty.")
            }
            this.element = tagOrElement[0]
            this.elements = tagOrElement
            return
        }
        if (typeof tagOrElement === "string") {
            this.element = document.createElement(tagOrElement) as T
        } else {
            this.element = tagOrElement
        }
        children.forEach((child) => {
            this.avitaChildren.push(child)
        })
        this.updateDOMChildren()
    }

    /**
     * Renders the provided Avita element to the root element in the DOM.
     *
     * @param child - The Avita element to be rendered.
     * @param selector - (optional) The CSS selector for the root element in the DOM. Default is '#root'.
     * @throws {Error} If the root element with the ID 'root' is not found in the HTML.
     */
    static render<T extends HTMLTag>(
        child: Avita<T>,
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
            root.append(child.element)
        } else {
            throw new Error(
                "Root element not found: please add a div with id='root' to your HTML file"
            )
        }
    }

    /**
     * Returns a new `Avita` instance wrapping the parent element of the current element or `null` if the parent element does not exist.
     * @returns A new `Avita` instance wrapping the parent element of the current element or `null` if the parent element does not exist.
     */
    parent(): Avita<T> | null {
        const parent = this.element.parentElement
        return parent ? new Avita(parent as T) : null
    }

    /**
     * Returns the child elements of the current `Avita` instance.
     * @returns An array of `Avita` instances representing the child elements, or `null` if the current element has no children.
     */
    children(): Children<T> | null {
        return this.avitaChildren.length > 0 ? this.avitaChildren : null
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
     * Updates the DOM children of the current `Avita` instance to match the `avitaChildren` array.
     * This removes any existing child nodes and appends the new child elements.
     */
    private updateDOMChildren() {
        if (this.element.localName !== "head") {
            this.element.childNodes.forEach((child) => {
                child.remove()
            })
        }
        this.avitaChildren.forEach((child) => {
            if (typeof child === "string") {
                this.element.append(child)
            } else {
                this.element.append(child.element)
            }
        })
    }

    /**
     * Finds the element(s) with the given selector in the DOM tree.
     * @param selector - The CSS selector to match against.
     * @returns An Avita instance matching the selector or `null` if not found.
     */
    static find<T extends HTMLTag>(selector: string): Avita<T>

    /**
     * Finds the element(s) with the given selector in the DOM tree.
     * @param selector - The CSS selector to match against.
     * @param raw - A boolean indicating whether to return the raw HTML element(s).
     * @returns The raw HTML element(s) matching the selector or `null` if not found.
     */
    static find<T extends HTMLTag>(
        selector: string,
        raw: boolean
    ): Avita<T> | T | T[]

    static find<T extends HTMLTag>(
        selector: string,
        raw: boolean = false
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
            window.addEventListener("popstate", callback)
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
    find<T extends HTMLElement>(
        selector: string,
        raw: boolean
    ): Avita<T> | T | T[]

    find<T extends HTMLElement>(
        selector: string,
        raw: boolean = false
    ): Avita<T> | T | T[] | null {
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

        return null
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
            classNames.forEach((className) => {
                const splitName = className.split(" ")
                splitName.forEach((name) => {
                    this.addClass(name)
                })
            })
            return this
        }
    }

    /**
     * Toggles the specified CSS class on the current element/all elements in the collection.
     * @param className - The CSS class to toggle.
     * @returns The current `Avita` instance for chaining.
     */
    toggleClass(className: string) {
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
    addClass(...classNames: string[]) {
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
    removeClass(...classNames: string[]) {
        this.element.classList.remove(...classNames)
        if (this.elements.length > 0) {
            this.elements.forEach((element) => {
                element.classList.remove(...classNames)
            })
        }
        return this
    }

    /**
     * Checks if the current element or any elements in the collection have the specified CSS class.
     * @param className - The CSS class to check for.
     * @returns `true` if the element or any elements in the collection have the specified class, `false` otherwise.
     */
    hasClass(className: string): boolean {
        return this.element.classList.contains(className)
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
    attr(name: string, value: string | number): this

    /**
     * Sets the specified attributes of the element(s).
     * @param attributes - An object containing the attributes to set on the element(s).
     * @returns The current Avita instance for chaining.
     */
    attr(attributes: Record<string, string | number>): this

    /**
     * Gets or sets attributes of the element(s).
     * @param keyOrAttributes - Attribute name or object of attributes to set.
     * @param value - Value to set for a single attribute.
     * @returns Attribute value(s), or the current Avita instance for chaining.
     */
    attr(
        keyOrAttributes?: string | Record<string, string | number>,
        value?: string | number
    ): string | this | Record<string, string> | undefined {
        switch (true) {
            case keyOrAttributes === undefined:
                return this.getAllAttributes()
            case typeof keyOrAttributes === "string":
                return value === undefined
                    ? this.getAttribute(keyOrAttributes)
                    : this.setAttribute(keyOrAttributes, value)
            case typeof keyOrAttributes === "object":
                return this.setMultipleAttributes(keyOrAttributes)
            default:
                return undefined
        }
    }

    private getAllAttributes(): Record<string, string> {
        const attributes: Record<string, string> = {}
        for (let i = 0; i < this.element.attributes.length; i++) {
            const attr = this.element.attributes[i]
            attributes[attr.name] = attr.value
        }
        return attributes
    }

    private getAttribute(name: string): string | undefined {
        return this.element.getAttribute(name) || undefined
    }

    private setAttribute(name: string, value: string | number) {
        const attrVal = typeof value === "number" ? value.toString() : value
        this.setAttr(name, attrVal)
        return this
    }

    private setMultipleAttributes(attributes: Record<string, string | number>) {
        for (const [key, val] of Object.entries(attributes)) {
            const attrVal = typeof val === "number" ? val.toString() : val
            this.setAttr(key, attrVal)
        }
        return this
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
    data(key: string, value: string | number): this

    /**
     * Sets multiple data attributes on the element.
     * @param dataAttributes - An object containing the data attributes to set on the element.
     * @returns The current Avita instance for chaining.
     */
    data(dataAttributes: Record<string, string | number>): this

    data(
        keyOrDataAttributes?: string | Record<string, string | number>,
        value?: string | number
    ): string | this | Record<string, string> | undefined {
        switch (true) {
            case keyOrDataAttributes === undefined:
                return this.getAllDataAttributes()
            case typeof keyOrDataAttributes === "string":
                return value === undefined
                    ? this.getDataAttribute(keyOrDataAttributes)
                    : this.setDataAttribute(keyOrDataAttributes, value)
            case typeof keyOrDataAttributes === "object":
                return this.setMultipleDataAttributes(keyOrDataAttributes)
            default:
                return undefined
        }
    }

    private getAllDataAttributes(): Record<string, string> {
        return Object.fromEntries(
            Object.entries(this.element.dataset).filter(
                ([_, value]) => value !== undefined
            )
        ) as Record<string, string>
    }

    private getDataAttribute(key: string): string | undefined {
        return this.element.dataset[key] ?? undefined
    }

    private setDataAttribute(key: string, val: string | number) {
        const dataVal = typeof val === "number" ? val.toString() : val
        this.setData(key, dataVal)
        return this
    }

    private setMultipleDataAttributes(data: Record<string, string | number>) {
        for (const [key, val] of Object.entries(data)) {
            const dataVal = typeof val === "number" ? val.toString() : val
            this.setData(key, dataVal)
        }
        return this
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
     * Sets the text content of the element.
     * @param value - The text content to set for the element.
     * @returns The current `Avita` instance for chaining.
     */
    text(value: string) {
        this.element.textContent = value
        if (this.elements.length > 0) {
            this.elements.forEach((element) => {
                element.textContent = value
            })
        }
        return this
    }

    /**
     * Getter and setter the HTML content of the element.
     * @param value - The HTML content to set for the element.
     * @returns The current `Avita` instance for chaining.
     */
    html(value?: string) {
        if (value === undefined) {
            return this.element.innerHTML
        }
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

    append(...children: Avita<T>[]) {
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

    prepend(...children: Avita<T>[]) {
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
     * Removes the child element at the specified index from the current `Avita` instance.
     * @param index - The index of the child element to remove.
     * @returns The current `Avita` instance for chaining.
     */
    removeChild(child: Avita<T>) {
        //todo: test
        this.avitaChildren.filter((c) => {
            if (c instanceof Avita) {
                c.element !== child.element
            }
        })
        this.updateDOMChildren()
        return this
    }

    /**
     * Replaces the current `Avita` instance's element with the provided `Avita` instance's element.
     * @param element - The `Avita` instance to replace the current instance with.
     * @returns The current `Avita` instance for chaining.
     */
    replace(element: Avita<T>) {
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
    value(): string | undefined

    /**
     * Sets the value of the current `Avita` instance if it is an `HTMLInputElement`.
     * @param value - The value to set for the `HTMLInputElement`.
     * @returns The current `Avita` instance for chaining.
     */
    value(value: string): this

    value(value?: string): string | this | undefined {
        if (value === undefined) {
            return this.attr("value")
        }
        this.attr("value", value)
    }

    /**
     * Gets the checked state of the current `Avita` instance if it is an `HTMLInputElement`.
     * @returns The checked state of the input element, or `undefined` if it is not an `HTMLInputElement`.
     */
    checked(): boolean | undefined

    /**
     * Sets the checked state of the current `Avita` instance if it is an `HTMLInputElement`.
     * @param value - The boolean value to set the checked state to.
     * @returns The current `Avita` instance for chaining.
     */
    checked(value: boolean): this

    checked(value?: boolean): boolean | this | undefined {
        if (value === undefined) {
            return this.attr("checked") === "checked"
        }
        this.attr("checked", String(value))
    }

    /**
     * Toggles the checked state of the current `Avita` instance if it is an `HTMLInputElement`.
     * @returns The current `Avita` instance for chaining.
     */
    toggleChecked() {
        this.checked(!this.checked())
        return this
    }

    /**
     * Gets the disabled state of the current `Avita` instance if it is an `HTMLInputElement`.
     * @returns The disabled state of the input element, or `undefined` if it is not an `HTMLInputElement`.
     */
    disabled(): boolean | undefined

    /**
     * Sets the disabled state of the current `Avita` instance if it is an `HTMLInputElement`.
     * @param value - The boolean value to set the disabled state to.
     * @returns The current `Avita` instance for chaining.
     */
    disabled(value: boolean): this

    disabled(value?: boolean): boolean | this | undefined {
        if (value === undefined) {
            return this.attr("disabled") === "disabled"
        }
        this.attr("disabled", String(value))
    }

    /**
     * Toggles the disabled state of the current `Avita` instance if it is an `HTMLInputElement`.
     * @returns The current `Avita` instance for chaining.
     */
    toggleDisabled() {
        this.disabled(!this.disabled())
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
        if (value === undefined) {
            return this.attr("placeholder")
        }
        this.attr("placeholder", value)
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
    on(event: string, callback: EL, thisElement?: true) {
        if (
            (event === "onscroll" || event === "onresize") &&
            thisElement !== undefined
        ) {
            window.addEventListener(event, callback)
            return this
        }
        this.element.addEventListener(event, callback)
        if (this.elements.length > 0) {
            this.elements.forEach((element) => {
                element.addEventListener(event, callback)
            })
        }
        return this
    }

    /**
     * Removes an event listener from the current `Avita` instance.
     * Works with both single and multiple elements.
     * @param event - The name of the event to remove the listener for.
     * @param callback - The callback function to be removed.
     * @returns The current `Avita` instance for chaining.
     */
    off(event: string, callback: EL, thisElement?: true) {
        if (
            (event === "onscroll" || event === "onresize") &&
            thisElement !== undefined
        ) {
            window.removeEventListener(event, callback)
            return this
        }
        this.element.removeEventListener(event, callback)
        if (this.elements.length > 0) {
            this.elements.forEach((element) => {
                element.removeEventListener(event, callback)
            })
        }
        return this
    }

    /**
     * Triggers the specified event on the current `Avita` instance and all its elements.
     * This allows programmatically dispatching events on the elements.
     * @param event - The name of the event to trigger.
     * @param options - Additional data to include in the event object.
     * @returns The current `Avita` instance for chaining.
     */
    trigger(event: string) {
        this.element.dispatchEvent(new Event(event))
        if (this.elements.length > 0) {
            this.elements.forEach((element) => {
                element.dispatchEvent(new Event(event))
            })
        }
        return this
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
     * Attaches a resize event listener to the window.
     * @param callback - The callback function to be executed when the window is resized.
     * @returns The current `Avita` instance for chaining.
     */
    static onResize(callback: EL) {
        window.addEventListener("resize", callback)
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
    hover(property: keyof CSSStyleDeclaration, value: string): this

    hover(
        propsOrProperty:
            | Partial<CSSStyleDeclaration>
            | keyof CSSStyleDeclaration,
        value?: string
    ) {
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
    active(property: keyof CSSStyleDeclaration, value: string): this

    active(
        propsOrProperty:
            | Partial<CSSStyleDeclaration>
            | keyof CSSStyleDeclaration,
        value?: string
    ) {
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
    focus(property: keyof CSSStyleDeclaration, value: string): this

    focus(
        propsOrProperty:
            | Partial<CSSStyleDeclaration>
            | keyof CSSStyleDeclaration,
        value?: string
    ) {
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
        propsOrProperty:
            | Partial<CSSStyleDeclaration>
            | keyof CSSStyleDeclaration,
        value?: string
    ) {
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
        $("head").append(style(pseudoCSS))

        return this
    }

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
        return this.css("opacity", "0")
    }

    /**
     * Sets the 'opacity' CSS property on the current `Avita` instance to 0.5.
     * @returns The current `Avita` instance for chaining.
     */
    translucent() {
        return this.css("opacity", "0.5")
    }

    /**
     * Sets the 'opacity' CSS property on the current `Avita` instance to 1.
     * @returns The current `Avita` instance for chaining.
     */
    opaque() {
        return this.css("opacity", "1")
    }

    /**
     * Shows the element by setting the 'display' CSS property to the specified value.
     * @param value - The value to set for the 'display' CSS property. Defaults to 'flex'.
     * @returns The current `Avita` instance for chaining.
     */
    show(value: string = "flex") {
        return this.css("display", value)
    }

    /**
     * Hides the element by setting the 'display' CSS property to 'none'.
     * @returns The current `Avita` instance for chaining.
     */
    hide() {
        return this.css("display", "none")
    }

    /**
     * Toggles the visibility of the element by setting the 'display' CSS property to either the specified value or 'none'.
     * @param value - The value to set for the 'display' CSS property if the element is currently hidden. Defaults to 'flex'.
     * @returns The current `Avita` instance for chaining.
     */
    toggle(value: string = "flex") {
        return this.css("display") === "none" ? this.show(value) : this.hide()
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
            body = `${camelToKebab(propsOrProperty)}: ${value} !important; `
        }

        if (typeof propsOrProperty === "object") {
            Object.entries(propsOrProperty).forEach(([prop, val]) => {
                body += `${camelToKebab(prop)}: ${val} !important; `
            })
        }

        let mediaQuery = `.${uniqueClass} { ${body} }`

        $("head").append(style().text(`@media ${query} { ${mediaQuery} }`))

        return this
    }

    /**
     * Applies the provided CSS properties when the current viewport width is at most 640px.
     * @param props - The CSS properties to apply to the element when the viewport width is at most 640px.
     * @returns The current `Avita` instance for chaining.
     */
    sm(props: Partial<CSSStyleDeclaration>): this

    /**
     * Applies the provided CSS property and value when the current viewport width is at most 640px.
     * @param property - The CSS property to apply to the element when the viewport width is at most 640px.
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
     * Applies the provided CSS properties when the current viewport width is at most 768px.
     * @param props - The CSS properties to apply to the element when the viewport width is at most 768px.
     * @returns The current `Avita` instance for chaining.
     */
    md(props: Partial<CSSStyleDeclaration>): this

    /**
     * Applies the provided CSS property and value when the current viewport width is at most 768px.
     * @param property - The CSS property to apply to the element when the viewport width is at most 768px.
     * @param value - The value to set for the CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    md(property: string, value: string): this

    md(propertyOrProps: string | Partial<CSSStyleDeclaration>, value?: string) {
        if (typeof propertyOrProps === "string" && value) {
            this.media("(min-width: 768px)", propertyOrProps, value)
        } else if (typeof propertyOrProps === "object") {
            this.media("(min-width: 768px)", propertyOrProps)
        }
        return this
    }

    /**
     * Applies the provided CSS properties when the current viewport width is at most 1024px.
     * @param props - The CSS properties to apply to the element when the viewport width is at most 1024px.
     * @returns The current `Avita` instance for chaining.
     */
    lg(props: Partial<CSSStyleDeclaration>): this

    /**
     * Applies the provided CSS property and value when the current viewport width is at most 1024px.
     * @param property - The CSS property to apply to the element when the viewport width is at most 1024px.
     * @param value - The value to set for the CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    lg(property: string, value: string): this

    lg(propertyOrProps: string | Partial<CSSStyleDeclaration>, value?: string) {
        if (typeof propertyOrProps === "string" && value) {
            this.media("(min-width: 1024px)", propertyOrProps, value)
        } else if (typeof propertyOrProps === "object") {
            this.media("(min-width: 1024px)", propertyOrProps)
        }
        return this
    }

    /**
     * Applies the provided CSS properties when the current viewport width is at most 1280px.
     * @param props - The CSS properties to apply to the element when the viewport width is at most 1280px.
     * @returns The current `Avita` instance for chaining.
     */
    xl(props: Partial<CSSStyleDeclaration>): this

    /**
     * Applies the provided CSS property and value when the current viewport width is at most 1280px.
     * @param property - The CSS property to apply to the element when the viewport width is at most 1280px.
     * @param value - The value to set for the CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    xl(property: string, value: string): this

    xl(propertyOrProps: string | Partial<CSSStyleDeclaration>, value?: string) {
        if (typeof propertyOrProps === "string" && value) {
            this.media("(min-width: 1280px)", propertyOrProps, value)
        } else if (typeof propertyOrProps === "object") {
            this.media("(min-width: 1280px)", propertyOrProps)
        }
        return this
    }

    /**
     * Applies the provided CSS properties when the current viewport width is at most 1536px.
     * @param props - The CSS properties to apply to the element when the viewport width is at most 1536px.
     * @returns The current `Avita` instance for chaining.
     */
    xxl(props: Partial<CSSStyleDeclaration>): this

    /**
     * Applies the provided CSS property and value when the current viewport width is at most 1536px.
     * @param property - The CSS property to apply to the element when the viewport width is at most 1536px.
     * @param value - The value to set for the CSS property.
     * @returns The current `Avita` instance for chaining.
     */
    xxl(property: string, value: string): this

    xxl(
        propertyOrProps: string | Partial<CSSStyleDeclaration>,
        value?: string
    ) {
        if (typeof propertyOrProps === "string" && value) {
            this.media("(min-width: 1536px)", propertyOrProps, value)
        } else if (typeof propertyOrProps === "object") {
            this.media("(min-width: 1536px)", propertyOrProps)
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
    ) {
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
    static scrollToBottom(smooth: boolean = false): void {
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
    scrollToBottom(smooth: boolean = false) {
        Avita.scrollToBottom(smooth)
        return this
    }

    /**
     * Scrolls the window to the right edge of the page.
     * @param smooth - If set to `true`, the scroll will be animated smoothly. Otherwise, it will scroll instantly.
     */
    static scrollToRight(smooth: boolean = false) {
        Avita.scroll({
            left: document.body.scrollWidth,
            behavior: smooth ? "smooth" : "instant",
        })
    }

    /**
     * Scrolls the window to the right edge of the page.
     * @param smooth - If set to `true`, the scroll will be animated smoothly. Otherwise, it will scroll instantly.
     * @returns The current `Avita` instance, allowing for method chaining.
     */
    scrollToRight(smooth: boolean = false) {
        Avita.scrollToRight(smooth)
        return this
    }

    /**
     * Scrolls the window to the left edge of the page.
     * @param smooth - If set to `true`, the scroll will be animated smoothly. Otherwise, it will scroll instantly.
     */
    static scrollToLeft(smooth: boolean = false) {
        Avita.scroll({
            left: 0,
            behavior: smooth ? "smooth" : "instant",
        })
        return this
    }

    /**
     * Scrolls the window to the left edge of the page.
     * @param smooth - If set to `true`, the scroll will be animated smoothly. Otherwise, it will scroll instantly.
     * @returns The current `Avita` instance, allowing for method chaining.
     */
    scrollToLeft(smooth: boolean = false) {
        Avita.scrollToLeft(smooth)
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
    each(callback: (element: Avita<T>, index: number) => void) {
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
 * @returns An `Avita` instance wrapping the selected element(s), or the raw HTMLElement or HTMLElement[] if `raw` is `true`.
 */
export function $<T extends HTMLTag>(selector: string): Avita<T>

/**
 * Selects an HTML element or a collection of HTML elements matching the provided CSS selector.
 * @param selector - The CSS selector to use for selecting the element(s).
 * @param raw - If set to `true`, the function will return the raw HTMLElement or HTMLElement[] instead of an Avita instance.
 * @returns An `Avita` instance wrapping the selected element(s), or the raw HTMLElement or HTMLElement[] if `raw` is `true`.
 */
export function $<T extends HTMLTag>(
    selector: string,
    raw: boolean
): Avita<T> | T | T[]

/**
 * Executes the provided callback function when the DOM is ready.
 * @param callback - The function to execute when the DOM is ready.
 */
export function $(callback: () => void): void

export function $<T extends HTMLTag>(
    selectorOrCallback: string | (() => void),
    raw: boolean = false
): Avita<T> | T | T[] | null | void {
    if (typeof selectorOrCallback === "string") {
        return Avita.find<T>(selectorOrCallback, raw)
    } else if (typeof selectorOrCallback === "function") {
        // Handle DOM ready event
        Avita.ready(selectorOrCallback)
    }
}
