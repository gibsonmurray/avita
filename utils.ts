import { gsap, Elastic } from "gsap"

export function toggleVisibility(this: HTMLElement) {
    if (this.style.display === "none") {
        this.style.display = ""
    } else {
        this.style.display = "none"
    }
}

export function showElement(
    this: HTMLElement,
    duration: number = 0.5,
    ease: any = Elastic.easeOut,
    display: string = "block",
    delay: number = 0
) {
    gsap.to(this, {
        duration,
        opacity: 1,
        display,
        ease,
        delay,
    })
}

export function hideElement(
    this: HTMLElement,
    duration: number = 0.5,
    ease: any = Elastic.easeIn,
    delay: number = 0
) {
    gsap.to(this, {
        duration,
        opacity: 0,
        display: "none",
        ease,
        delay,
    })
}

export function slideInFromLeft(
    this: HTMLElement,
    duration: number = 0.5,
    ease: any = Elastic.easeOut,
    display: string = "block",
    delay: number = 0
) {
    gsap.fromTo(
        this,
        {
            x: "-100%",
            opacity: 0,
        },
        {
            duration,
            x: "0%",
            opacity: 1,
            display,
            ease,
            delay,
        }
    )
}

export function slideOutToLeft(
    this: HTMLElement,
    duration: number = 0.5,
    ease: any = Elastic.easeIn,
    delay: number = 0
) {
    gsap.to(this, {
        duration,
        x: "-100%",
        opacity: 0,
        display: "none",
        ease,
        delay,
    })
}

export function fadeIn(
    this: HTMLElement,
    duration: number = 0.5,
    ease: any = Elastic.easeOut,
    display: string = "block",
    delay: number = 0
) {
    gsap.to(this, {
        duration,
        opacity: 1,
        display,
        ease,
        delay,
    })
}

export function fadeOut(
    this: HTMLElement,
    duration: number = 0.5,
    ease: any = Elastic.easeIn,
    delay: number = 0
) {
    gsap.to(this, {
        duration,
        opacity: 0,
        display: "none",
        ease,
        delay,
    })
}

export function rotate(
    this: HTMLElement,
    angle: number,
    duration: number = 0.5,
    ease: any = Elastic.easeOut,
    delay: number = 0
) {
    gsap.to(this, {
        duration,
        rotation: angle,
        ease,
        delay,
    })
}

export function scale(
    this: HTMLElement,
    factor: number,
    duration: number = 0.5,
    ease: any = Elastic.easeOut,
    delay: number = 0
) {
    gsap.to(this, {
        duration,
        scale: factor,
        ease,
        delay,
    })
}

export function moveTo(
    this: HTMLElement,
    x: number,
    y: number,
    duration: number = 0.5,
    ease: any = Elastic.easeOut,
    delay: number = 0
) {
    gsap.to(this, {
        duration,
        x,
        y,
        ease,
        delay,
    })
}

export function setText(
    this: HTMLElement,
    text: string,
    duration: number = 0.5,
    ease: any = Elastic.easeOut,
    delay: number = 0
) {
    gsap.to(this, {
        duration,
        text: text,
        ease,
        delay,
        onComplete: () => {
            this.textContent = text
        },
    })
}
