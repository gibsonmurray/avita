interface HTMLElement {
    toggleVisibility(): void
    showElement(
        duration?: number,
        ease?: any,
        display?: string,
        delay?: number
    ): void
    hideElement(duration?: number, ease?: any, delay?: number): void
    slideInFromLeft(
        duration?: number,
        ease?: any,
        display?: string,
        delay?: number
    ): void
    slideOutToLeft(duration?: number, ease?: any, delay?: number): void
    fadeIn(
        duration?: number,
        ease?: any,
        display?: string,
        delay?: number
    ): void
    fadeOut(duration?: number, ease?: any, delay?: number): void
    rotate(angle: number, duration?: number, ease?: any, delay?: number): void
    scale(factor: number, duration?: number, ease?: any, delay?: number): void
    moveTo(
        x: number,
        y: number,
        duration?: number,
        ease?: any,
        delay?: number
    ): void
    setText(text: string, duration?: number, ease?: any, delay?: number): void
}
