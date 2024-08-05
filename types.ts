import {
    toggleVisibility,
    showElement,
    hideElement,
    slideInFromLeft,
    slideOutToLeft,
    fadeIn,
    fadeOut,
    rotate,
    scale,
    moveTo,
    setText,
} from "./utils"

export type Option = string | HTMLElement | { [key: string]: any }

declare global {
    interface HTMLElement {
        toggleVisibility: typeof toggleVisibility
        showElement: typeof showElement
        hideElement: typeof hideElement
        slideInFromLeft: typeof slideInFromLeft
        slideOutToLeft: typeof slideOutToLeft
        fadeIn: typeof fadeIn
        fadeOut: typeof fadeOut
        rotate: typeof rotate
        scale: typeof scale
        moveTo: typeof moveTo
        setText: typeof setText
    }
}

HTMLElement.prototype.toggleVisibility = toggleVisibility
HTMLElement.prototype.showElement = showElement
HTMLElement.prototype.hideElement = hideElement
HTMLElement.prototype.slideInFromLeft = slideInFromLeft
HTMLElement.prototype.slideOutToLeft = slideOutToLeft
HTMLElement.prototype.fadeIn = fadeIn
HTMLElement.prototype.fadeOut = fadeOut
HTMLElement.prototype.rotate = rotate
HTMLElement.prototype.scale = scale
HTMLElement.prototype.moveTo = moveTo
HTMLElement.prototype.setText = setText
