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
            }

            body {
                font-family: sans-serif;
            }

            a {
                cursor: pointer;
                text-decoration: none;
                color: inherit;
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
