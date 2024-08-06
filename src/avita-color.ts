import type { AvitaColorType } from "avita"

const AvitaColor: AvitaColorType = {
    red: "#ff0000",
    redOrange: "#ff4500",
    orange: "#ff8700",
    orangeYellow: "#ffa600",
    yellow: "#ffff00",
    yellowGreen: "#90ee90",
    lime: "#80ff00",
    green: "#008000",
    cyan: "#00ffff",
    teal: "#008080",
    blue: "#0000ff",
    navy: "#000080",
    blueViolet: "#8a2be2",
    violet: "#ee82ee",
    magenta: "#ff00ff",
    magentaPink: "#ff0080",
    purple: "#800080",
    pink: "#ffc0cb",
    redPink: "#ff0080",
    brown: "#a52a2a",
    tan: "#d2b48c",
    beige: "#f5f5dc",
    maroon: "#800000",
    olive: "#808000",
    silver: "#c0c0c0",
    gold: "#ffd700",
    gray: "#808080",
    lightGray: "#d3d3d3",
    darkGray: "#a9a9a9",
    black: "#000000",
    white: "#ffffff",
    transparent: "transparent",
    random(): string {
        const keys = Object.keys(AvitaColor) as Array<keyof typeof AvitaColor>
        const randomKey = keys[Math.floor(Math.random() * keys.length - 2)]
        return AvitaColor[randomKey] as string
    },
}

export default AvitaColor
