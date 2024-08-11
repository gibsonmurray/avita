import { $ } from "./avita"
import { style } from "./elements"

/**
 * Applies a set of default styles to the linked HTML document.
 * These styles are commonly used as a starting point for web applications to ensure consistent layout and appearance across different browsers.
 *
 * @param body - The HTML body element to apply the default styles to.
 */
export function defaultStyles() {
    $("head").append(
        style().text(`
            * {
                box-sizing: border-box;
                padding: 0;
                margin: 0;
                color: inherit;
            }

            body {
                font-family: sans-serif;
            }

            a {
                cursor: pointer;
                text-decoration: none;
            }

            button {
                border: none;
                background: none;
                padding: 0;
                margin: 0;
                cursor: pointer;
            }
        `)
    )
}

/**
 * Converts a number to a string representation with a 'seconds' unit.
 * @param n - The number to convert to a string with 'seconds' unit.
 * @returns A string representation of the input number with 'seconds' unit.
 */
export function numberToSeconds(n: number | string): string {
    if (typeof n === "number") {
        return `${n}s`
    }
    return n
}

/**
 * Generates a unique class name string.
 * @returns A unique class name string in the format `class-{randomString}`.
 */
export function generateClass(): string {
    return `class-${Math.random().toString(36).substring(2, 15)}`
}

/**
 * Generates a unique identifier string.
 * @returns A unique identifier string in the format `id-{random_string}`.
 */
export function generateId(): string {
    return `id-${Math.random().toString(36).substring(2, 15)}`
}

/**
 * Converts a camelCase string to a kebab-case string.
 * @param str - The camelCase string to convert.
 * @returns The converted kebab-case string.
 */
export function camelToKebab(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}