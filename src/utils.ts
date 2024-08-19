export const DEFAULT_STYLES = `@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'); * { box-sizing: border-box; padding: 0; margin: 0; color: inherit; } body { font-family: Inter, sans-serif; } a { cursor: pointer; text-decoration: none; } `

export const CSS_ID = "avita-css"

/**
 * Generates a unique class name string.
 * @returns A unique class name string in the format `class-{randomString}`.
 */
export function generateClass(): string {
    return `${CSS_ID}-${crypto.randomUUID()}`
}

/**
 * Converts a camelCase string to a kebab-case string.
 * @param str - The camelCase string to convert.
 * @returns The converted kebab-case string.
 */
export function camelToKebab(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}
