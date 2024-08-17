import { $ } from "./avita"
import { style } from "./elements"

/**
 * Applies a set of default styles to the linked HTML document.
 * These styles are commonly used as a starting point for web applications to ensure consistent layout and appearance across different browsers.
 */
export function defaultStyles() {
    $("head").append(
        style(`
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
 * Generates a unique class name string.
 * @returns A unique class name string in the format `class-{randomString}`.
 */
export function generateClass(): string {
    return `class-${crypto.randomUUID()}`
}

/**
 * Converts a camelCase string to a kebab-case string.
 * @param str - The camelCase string to convert.
 * @returns The converted kebab-case string.
 */
export function camelToKebab(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}
