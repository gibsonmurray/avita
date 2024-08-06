import type AvitaElement from "./avita-types"
import * as AvitaTypes from "./avita-types"

export default function avitaCreate<T extends HTMLElement>(
    tag: string
): AvitaElement<T> {
    const element = document.createElement(tag) as T

    return {
        element,

        // Element Properties
        id(id: string) {
            element.id = id
            return this
        },
        class(value: string) {
            element.classList.add(value)
            return this
        },
        style(value: Partial<CSSStyleDeclaration>) {
            Object.assign(element.style, value)
            return this
        },
        src(value: string) {
            if (
                element instanceof HTMLImageElement ||
                element instanceof HTMLIFrameElement ||
                element instanceof HTMLScriptElement
            ) {
                element.src = value
            }
            return this
        },
        href(value: string) {
            if (
                element instanceof HTMLAnchorElement ||
                element instanceof HTMLLinkElement
            ) {
                element.href = value
            }
            return this
        },
        data(key: string, value: string) {
            element.dataset[key] = value
            return this
        },
        alt(value: string) {
            if (element instanceof HTMLImageElement) {
                element.alt = value
            }
            return this
        },
        title(value: string) {
            element.title = value
            return this
        },
        text(value: string) {
            element.textContent = value
            return this
        },
        html(value: string) {
            element.innerHTML = value
            return this
        },
        append(element: AvitaElement<T>) {
            element.element.appendChild(this.element)
            return this
        },
        prepend(element: AvitaElement<T>) {
            element.element.prepend(this.element)
            return this
        },
        remove() {
            this.element.remove()
            return this
        },
        children(...elements: AvitaElement<T>[]) {
            elements.forEach((element) => {
                this.element.appendChild(element.element)
            })
            return this
        },
        replace(element: AvitaElement<T>) {
            element.element.replaceWith(this.element)
            return this
        },

        // Events
        onClick(callback: (event: MouseEvent) => void) {
            this.element.addEventListener("click", callback)
            return this
        },
        onDoubleClick(callback: (event: MouseEvent) => void) {
            this.element.addEventListener("dblclick", callback)
            return this
        },
        onCopy(callback: (event: ClipboardEvent) => void) {
            this.element.addEventListener("copy", callback)
            return this
        },
        onCut(callback: (event: ClipboardEvent) => void) {
            this.element.addEventListener("cut", callback)
            return this
        },
        onPaste(callback: (event: ClipboardEvent) => void) {
            this.element.addEventListener("paste", callback)
            return this
        },
        onCompositionStart(callback: (event: CompositionEvent) => void) {
            this.element.addEventListener("compositionstart", callback)
            return this
        },
        onCompositionUpdate(callback: (event: CompositionEvent) => void) {
            this.element.addEventListener("compositionupdate", callback)
            return this
        },
        onCompositionEnd(callback: (event: CompositionEvent) => void) {
            this.element.addEventListener("compositionend", callback)
            return this
        },
        onChange(callback: (event: Event) => void) {
            this.element.addEventListener("change", callback)
            return this
        },
        onInput(callback: (event: Event) => void) {
            this.element.addEventListener("input", callback)
            return this
        },
        onSubmit(callback: (event: Event) => void) {
            this.element.addEventListener("submit", callback)
            return this
        },
        onInvalid(callback: (event: Event) => void) {
            this.element.addEventListener("invalid", callback)
            return this
        },
        onReset(callback: (event: Event) => void) {
            this.element.addEventListener("reset", callback)
            return this
        },
        onKeyDown(callback: (event: KeyboardEvent) => void) {
            this.element.addEventListener("keydown", callback)
            return this
        },
        onKeyPress(callback: (event: KeyboardEvent) => void) {
            this.element.addEventListener("keypress", callback)
            return this
        },
        onKeyUp(callback: (event: KeyboardEvent) => void) {
            this.element.addEventListener("keyup", callback)
            return this
        },
        onFocus(callback: (event: FocusEvent) => void) {
            this.element.addEventListener("focus", callback)
            return this
        },
        onBlur(callback: (event: FocusEvent) => void) {
            this.element.addEventListener("blur", callback)
            return this
        },
        onFocusIn(callback: (event: FocusEvent) => void) {
            this.element.addEventListener("focusin", callback)
            return this
        },
        onFocusOut(callback: (event: FocusEvent) => void) {
            this.element.addEventListener("focusout", callback)
            return this
        },
        onMouseDown(callback: (event: MouseEvent) => void) {
            this.element.addEventListener("mousedown", callback)
            return this
        },
        onMouseUp(callback: (event: MouseEvent) => void) {
            this.element.addEventListener("mouseup", callback)
            return this
        },
        onMouseEnter(callback: (event: MouseEvent) => void) {
            this.element.addEventListener("mouseenter", callback)
            return this
        },
        onMouseLeave(callback: (event: MouseEvent) => void) {
            this.element.addEventListener("mouseleave", callback)
            return this
        },
        onMouseMove(callback: (event: MouseEvent) => void) {
            this.element.addEventListener("mousemove", callback)
            return this
        },
        onMouseOver(callback: (event: MouseEvent) => void) {
            this.element.addEventListener("mouseover", callback)
            return this
        },
        onMouseOut(callback: (event: MouseEvent) => void) {
            this.element.addEventListener("mouseout", callback)
            return this
        },
        onContextMenu(callback: (event: MouseEvent) => void) {
            this.element.addEventListener("contextmenu", callback)
            return this
        },
        onPointerOver(callback: (event: PointerEvent) => void) {
            this.element.addEventListener("pointerover", callback)
            return this
        },
        onPointerEnter(callback: (event: PointerEvent) => void) {
            this.element.addEventListener("pointerenter", callback)
            return this
        },
        onPointerLeave(callback: (event: PointerEvent) => void) {
            this.element.addEventListener("pointerleave", callback)
            return this
        },
        onPointerMove(callback: (event: PointerEvent) => void) {
            this.element.addEventListener("pointermove", callback)
            return this
        },
        onPointerDown(callback: (event: PointerEvent) => void) {
            this.element.addEventListener("pointerdown", callback)
            return this
        },
        onPointerUp(callback: (event: PointerEvent) => void) {
            this.element.addEventListener("pointerup", callback)
            return this
        },
        onPointerCancel(callback: (event: PointerEvent) => void) {
            this.element.addEventListener("pointercancel", callback)
            return this
        },
        onPointerOut(callback: (event: PointerEvent) => void) {
            this.element.addEventListener("pointerout", callback)
            return this
        },
        onGotPointerCapture(callback: (event: PointerEvent) => void) {
            this.element.addEventListener("gotpointercapture", callback)
            return this
        },
        onLostPointerCapture(callback: (event: PointerEvent) => void) {
            this.element.addEventListener("lostpointercapture", callback)
            return this
        },
        onTouchStart(callback: (event: TouchEvent) => void) {
            this.element.addEventListener("touchstart", callback)
            return this
        },
        onTouchMove(callback: (event: TouchEvent) => void) {
            this.element.addEventListener("touchmove", callback)
            return this
        },
        onTouchEnd(callback: (event: TouchEvent) => void) {
            this.element.addEventListener("touchend", callback)
            return this
        },
        onTouchCancel(callback: (event: TouchEvent) => void) {
            this.element.addEventListener("touchcancel", callback)
            return this
        },
        onScroll(callback: (event: Event) => void) {
            this.element.addEventListener("scroll", callback)
            return this
        },
        onResize(callback: (event: UIEvent) => void) {
            this.element.addEventListener("resize", callback)
            return this
        },
        onWheel(callback: (event: WheelEvent) => void) {
            this.element.addEventListener("wheel", callback)
            return this
        },
        onDrag(callback: (event: DragEvent) => void) {
            this.element.addEventListener("drag", callback)
            return this
        },
        onDragEnd(callback: (event: DragEvent) => void) {
            this.element.addEventListener("dragend", callback)
            return this
        },
        onDragEnter(callback: (event: DragEvent) => void) {
            this.element.addEventListener("dragenter", callback)
            return this
        },
        onDragLeave(callback: (event: DragEvent) => void) {
            this.element.addEventListener("dragleave", callback)
            return this
        },
        onDragOver(callback: (event: DragEvent) => void) {
            this.element.addEventListener("dragover", callback)
            return this
        },
        onDragStart(callback: (event: DragEvent) => void) {
            this.element.addEventListener("dragstart", callback)
            return this
        },
        onDrop(callback: (event: DragEvent) => void) {
            this.element.addEventListener("drop", callback)
            return this
        },
        onAbort(callback: (event: Event) => void) {
            this.element.addEventListener("abort", callback)
            return this
        },
        onCanPlay(callback: (event: Event) => void) {
            this.element.addEventListener("canplay", callback)
            return this
        },
        onCanPlayThrough(callback: (event: Event) => void) {
            this.element.addEventListener("canplaythrough", callback)
            return this
        },
        onDurationChange(callback: (event: Event) => void) {
            this.element.addEventListener("durationchange", callback)
            return this
        },
        onEmptied(callback: (event: Event) => void) {
            this.element.addEventListener("emptied", callback)
            return this
        },
        onEncrypted(callback: (event: Event) => void) {
            this.element.addEventListener("encrypted", callback)
            return this
        },
        onEnded(callback: (event: Event) => void) {
            this.element.addEventListener("ended", callback)
            return this
        },
        onLoadedData(callback: (event: Event) => void) {
            this.element.addEventListener("loadeddata", callback)
            return this
        },
        onLoadedMetadata(callback: (event: Event) => void) {
            this.element.addEventListener("loadedmetadata", callback)
            return this
        },
        onLoadStart(callback: (event: Event) => void) {
            this.element.addEventListener("loadstart", callback)
            return this
        },
        onPause(callback: (event: Event) => void) {
            this.element.addEventListener("pause", callback)
            return this
        },
        onPlay(callback: (event: Event) => void) {
            this.element.addEventListener("play", callback)
            return this
        },
        onPlaying(callback: (event: Event) => void) {
            this.element.addEventListener("playing", callback)
            return this
        },
        onProgress(callback: (event: ProgressEvent) => void) {
            this.element.addEventListener("progress", callback)
            return this
        },
        onRateChange(callback: (event: Event) => void) {
            this.element.addEventListener("ratechange", callback)
            return this
        },
        onSeeked(callback: (event: Event) => void) {
            this.element.addEventListener("seeked", callback)
            return this
        },
        onSeeking(callback: (event: Event) => void) {
            this.element.addEventListener("seeking", callback)
            return this
        },
        onStalled(callback: (event: Event) => void) {
            this.element.addEventListener("stalled", callback)
            return this
        },
        onSuspend(callback: (event: Event) => void) {
            this.element.addEventListener("suspend", callback)
            return this
        },
        onTimeUpdate(callback: (event: Event) => void) {
            this.element.addEventListener("timeupdate", callback)
            return this
        },
        onVolumeChange(callback: (event: Event) => void) {
            this.element.addEventListener("volumechange", callback)
            return this
        },
        onWaiting(callback: (event: Event) => void) {
            this.element.addEventListener("waiting", callback)
            return this
        },
        onLoad(callback: (event: Event) => void) {
            this.element.addEventListener("load", callback)
            return this
        },
        onError(callback: (event: Event) => void) {
            this.element.addEventListener("error", callback)
            return this
        },
        onAnimationStart(callback: (event: AnimationEvent) => void) {
            this.element.addEventListener("animationstart", callback)
            return this
        },
        onAnimationEnd(callback: (event: AnimationEvent) => void) {
            this.element.addEventListener("animationend", callback)
            return this
        },
        onAnimationIteration(callback: (event: AnimationEvent) => void) {
            this.element.addEventListener("animationiteration", callback)
            return this
        },
        onTransitionEnd(callback: (event: TransitionEvent) => void) {
            this.element.addEventListener("transitionend", callback)
            return this
        },

        // CSS Properties
        all(value: string) {
            this.element.style.all = value
            return this
        },
        accentColor(color: AvitaTypes.Color | string) {
            this.element.style.accentColor = color
            return this
        },
        appearance(value: AvitaTypes.Appearance) {
            this.element.style.appearance = value
            return this
        },
        alignContent(value: AvitaTypes.AlignContent) {
            this.element.style.alignContent = value
            return this
        },
        alignItems(value: AvitaTypes.AlignItems) {
            this.element.style.alignItems = value
            return this
        },
        alignSelf(value: AvitaTypes.AlignSelf) {
            this.element.style.alignSelf = value
            return this
        },
        animation(value: string) {
            this.element.style.animation = value
            return this
        },
        animationDelay(value: string | number) {
            this.element.style.animationDelay = numberToSeconds(value)
            return this
        },
        animationDirection(value: AvitaTypes.AnimationDirection) {
            this.element.style.animationDirection = value
            return this
        },
        animationDuration(value: string | number) {
            this.element.style.animationDuration = numberToSeconds(value)
            return this
        },
        animationFillMode(value: AvitaTypes.AnimationFillMode) {
            this.element.style.animationFillMode = value
            return this
        },
        animationIterationCount(value: AvitaTypes.AnimationIterationCount) {
            this.element.style.animationIterationCount = value
            return this
        },
        animationName(value: string) {
            this.element.style.animationName = value
            return this
        },
        animationPlayState(value: AvitaTypes.AnimationPlayState) {
            this.element.style.animationPlayState = value
            return this
        },
        animationTimingFunction(value: AvitaTypes.AnimationTimingFunction) {
            this.element.style.animationTimingFunction = value
            return this
        },
        aspectRatio(value: string | number) {
            this.element.style.aspectRatio = String(value)
            return this
        },
        backdropFilter(value: AvitaTypes.BackdropFilter) {
            if (typeof value === "string") {
                this.element.style.backdropFilter = value
                return this
            }
            const [filter, val] = value
            this.element.style.backdropFilter = `${filter}(${val})`
            return this
        },
        backfaceVisibility(value: AvitaTypes.BackfaceVisibility) {
            this.element.style.backfaceVisibility = value
            return this
        },
        background(value: string) {
            this.element.style.background = value
            return this
        },
        backgroundAttachment(value: AvitaTypes.BackgroundAttachment) {
            this.element.style.backgroundAttachment = value
            return this
        },
        backgroundBlendMode(value: AvitaTypes.BackgroundBlendMode) {
            this.element.style.backgroundBlendMode = value
            return this
        },
        backgroundClip(value: AvitaTypes.BackgroundClip) {
            this.element.style.backgroundClip = value
            return this
        },
        backgroundColor(value: AvitaTypes.Color | string) {
            this.element.style.backgroundColor = value
            return this
        },
        backgroundImage(value: string) {
            this.element.style.backgroundImage = value
            return this
        },
        backgroundOrigin(value: AvitaTypes.BackgroundOrigin) {
            this.element.style.backgroundOrigin = value
            return this
        },
        backgroundPosition(value: AvitaTypes.BackgroundPosition) {
            if (typeof value === "string") {
                this.element.style.backgroundPosition = value
                return this
            }
            const [pos, val] = value
            this.element.style.backgroundPosition = `${pos} ${val}`
            return this
        },
        backgroundPositionX(value: AvitaTypes.BackgroundPosition) {
            if (typeof value === "string") {
                this.element.style.backgroundPositionX = value
                return this
            }
            const [pos, val] = value
            this.element.style.backgroundPositionX = `${pos} ${val}`
            return this
        },
        backgroundPositionY(value: AvitaTypes.BackgroundPosition) {
            if (typeof value === "string") {
                this.element.style.backgroundPositionX = value
                return this
            }
            const [pos, val] = value
            this.element.style.backgroundPositionX = `${pos} ${val}`
            return this
        },
        backgroundRepeat(value: AvitaTypes.BackgroundRepeat) {
            this.element.style.backgroundRepeat = value
            return this
        },
        backgroundSize(value: AvitaTypes.BackgroundSize) {
            if (typeof value === "string") {
                this.element.style.backgroundSize = value
                return this
            }
            const [size, val] = value
            this.element.style.backgroundSize = `${size} ${val}`
            return this
        },
        blockSize(value: string | number) {
            this.element.style.blockSize = String(value)
            return this
        },
        border(value: string) {
            this.element.style.border = value
            return this
        },
        borderBlock(value: string) {
            this.element.style.borderBlock = value
            return this
        },
        borderBlockColor(value: AvitaTypes.Color | string) {
            this.element.style.borderBlockColor = value
            return this
        },
        borderBlockEnd(value: string) {
            this.element.style.borderBlockEnd = value
            return this
        },
        borderBlockEndColor(value: AvitaTypes.Color | string) {
            this.element.style.borderBlockEndColor = value
            return this
        },
        borderBlockEndStyle(value: AvitaTypes.BorderStyle) {
            this.element.style.borderBlockEndStyle = value
            return this
        },
        borderBlockEndWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderBlockEndWidth = String(value) + unit
            return this
        },
        borderBlockStart(value: string) {
            this.element.style.borderBlockStart = value
            return this
        },
        borderBlockStartColor(value: AvitaTypes.Color | string) {
            this.element.style.borderBlockStartColor = value
            return this
        },
        borderBlockStartStyle(value: AvitaTypes.BorderStyle) {
            this.element.style.borderBlockStartStyle = value
            return this
        },
        borderBlockStartWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderBlockStartWidth = String(value) + unit
            return this
        },
        borderBlockStyle(value: AvitaTypes.BorderStyle) {
            this.element.style.borderBlockStyle = value
            return this
        },
        borderBlockWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderBlockWidth = String(value) + unit
            return this
        },
        borderBottom(value: string) {
            this.element.style.borderBottom = value
            return this
        },
        borderBottomColor(value: AvitaTypes.Color | string) {
            this.element.style.borderBottomColor = value
            return this
        },
        borderBottomLeftRadius(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderBottomLeftRadius = String(value) + unit
            return this
        },
        borderBottomRightRadius(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderBottomRightRadius = String(value) + unit
            return this
        },
        borderTopLeftRadius(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderTopLeftRadius = String(value) + unit
            return this
        },
        borderTopRightRadius(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderTopRightRadius = String(value) + unit
            return this
        },
        borderBottomStyle(value: AvitaTypes.BorderStyle) {
            this.element.style.borderBottomStyle = value
            return this
        },
        borderBottomWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderBottomWidth = String(value) + unit
            return this
        },
        borderCollapse(value: AvitaTypes.BorderCollapse) {
            this.element.style.borderCollapse = value
            return this
        },
        borderColor(value: AvitaTypes.Color | string) {
            this.element.style.borderColor = value
            return this
        },

        borderImage(value: string) {
            this.element.style.borderImage = value
            return this
        },
        borderImageOutset(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderImageOutset = String(value) + unit
            return this
        },
        borderImageRepeat(value: AvitaTypes.BorderImageRepeat) {
            this.element.style.borderImageRepeat = value
            return this
        },
        borderImageSlice(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderImageSlice = String(value) + unit
            return this
        },
        borderImageSource(value: string) {
            this.element.style.borderImageSource = value
            return this
        },
        borderImageWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderImageWidth = String(value) + unit
            return this
        },
        borderInline(value: string) {
            this.element.style.borderInline = value
            return this
        },
        borderInlineColor(value: AvitaTypes.Color | string) {
            this.element.style.borderInlineColor = value
            return this
        },
        borderInlineEnd(value: string) {
            this.element.style.borderInlineEnd = value
            return this
        },
        borderInlineEndColor(value: AvitaTypes.Color | string) {
            this.element.style.borderInlineEndColor = value
            return this
        },
        borderInlineEndStyle(value: AvitaTypes.BorderStyle) {
            this.element.style.borderInlineEndStyle = value
            return this
        },
        borderInlineEndWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderInlineEndWidth = String(value) + unit
            return this
        },
        borderInlineStart(value: string) {
            this.element.style.borderInlineStart = value
            return this
        },
        borderInlineStartColor(value: AvitaTypes.Color | string) {
            this.element.style.borderInlineStartColor = value
            return this
        },
        borderInlineStartStyle(value: AvitaTypes.BorderStyle) {
            this.element.style.borderInlineStartStyle = value
            return this
        },
        borderInlineStartWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderInlineStartWidth = String(value) + unit
            return this
        },
        borderInlineStyle(value: AvitaTypes.BorderStyle) {
            this.element.style.borderInlineStyle = value
            return this
        },
        borderInlineWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderInlineWidth = String(value) + unit
            return this
        },
        borderLeft(value: string) {
            this.element.style.borderLeft = value
            return this
        },
        borderLeftColor(value: AvitaTypes.Color | string) {
            this.element.style.borderLeftColor = value
            return this
        },
        borderLeftStyle(value: AvitaTypes.BorderStyle) {
            this.element.style.borderLeftStyle = value
            return this
        },
        borderLeftWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderLeftWidth = String(value) + unit
            return this
        },
        borderRadius(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderRadius = String(value) + unit
            return this
        },
        borderRight(value: string) {
            this.element.style.borderRight = value
            return this
        },
        borderRightColor(value: AvitaTypes.Color | string) {
            this.element.style.borderRightColor = value
            return this
        },
        borderRightStyle(value: AvitaTypes.BorderStyle) {
            this.element.style.borderRightStyle = value
            return this
        },
        borderRightWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderRightWidth = String(value) + unit
            return this
        },
        borderSpacing(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderSpacing = String(value) + unit
            return this
        },
        borderStyle(value: AvitaTypes.BorderStyle) {
            this.element.style.borderStyle = value
            return this
        },
        borderTop(value: string) {
            this.element.style.borderTop = value
            return this
        },
        borderTopColor(value: AvitaTypes.Color | string) {
            this.element.style.borderTopColor = value
            return this
        },
        borderTopStyle(value: AvitaTypes.BorderStyle) {
            this.element.style.borderTopStyle = value
            return this
        },
        borderTopWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderTopWidth = String(value) + unit
            return this
        },
        borderWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.borderWidth = String(value) + unit
            return this
        },
        bottom(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.bottom = String(value) + unit
            return this
        },
        boxShadow(value: string) {
            this.element.style.boxShadow = value
            return this
        },
        boxSizing(value: AvitaTypes.BoxSizing) {
            this.element.style.boxSizing = value
            return this
        },
        breakAfter(value: AvitaTypes.BreakAfter) {
            this.element.style.breakAfter = value
            return this
        },
        breakBefore(value: AvitaTypes.BreakBefore) {
            this.element.style.breakBefore = value
            return this
        },
        breakInside(value: AvitaTypes.BreakInside) {
            this.element.style.breakInside = value
            return this
        },
        captionSide(value: AvitaTypes.CaptionSide) {
            this.element.style.captionSide = value
            return this
        },
        caretColor(value: AvitaTypes.Color | string) {
            this.element.style.caretColor = value
            return this
        },
        clear(value: AvitaTypes.Clear) {
            this.element.style.clear = value
            return this
        },
        clipPath(value: string) {
            // todo add features
            this.element.style.clipPath = value
            return this
        },
        color(value: AvitaTypes.Color | string) {
            this.element.style.color = value
            return this
        },
        columnCount(value: AvitaTypes.ColumnCount | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.columnCount = String(value) + unit
            return this
        },
        columnFill(value: AvitaTypes.ColumnFill) {
            this.element.style.columnFill = value
            return this
        },
        columnGap(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.columnGap = String(value) + unit
            return this
        },
        columnRule(value: string) {
            this.element.style.columnRule = value
            return this
        },
        columnRuleColor(value: AvitaTypes.Color | string) {
            this.element.style.columnRuleColor = value
            return this
        },
        columnRuleStyle(value: AvitaTypes.BorderStyle) {
            this.element.style.columnRuleStyle = value
            return this
        },
        columnRuleWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.columnRuleWidth = String(value) + unit
            return this
        },
        columnSpan(value: AvitaTypes.ColumnSpan) {
            this.element.style.columnSpan = value
            return this
        },
        columnWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.columnWidth = String(value) + unit
            return this
        },
        columns(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.columns = String(value) + unit
            return this
        },
        content(value: string) {
            this.element.style.content = value
            return this
        },
        counterIncrement(value: string) {
            this.element.style.counterIncrement = value
            return this
        },
        counterReset(value: string) {
            this.element.style.counterReset = value
            return this
        },
        cursor(value: AvitaTypes.Cursor) {
            this.element.style.cursor = value
            return this
        },
        direction(value: AvitaTypes.Direction) {
            this.element.style.direction = value
            return this
        },
        display(value: AvitaTypes.Display) {
            this.element.style.display = value
            return this
        },
        emptyCells(value: AvitaTypes.EmptyCells) {
            this.element.style.emptyCells = value
            return this
        },
        filter(value: string) {
            // todo add features
            this.element.style.filter = value
            return this
        },
        flex(value: AvitaTypes.Flex) {
            if (Array.isArray(value)) {
                this.element.style.flex = value.join(" ")
                return this
            }
            this.element.style.flex = value
            return this
        },
        flexBasis(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.flexBasis = String(value) + unit
            return this
        },
        flexDirection(value: AvitaTypes.FlexDirection) {
            this.element.style.flexDirection = value
            return this
        },
        flexFlow(value: string) {
            this.element.style.flexFlow = value
            return this
        },
        flexGrow(value: string | number) {
            this.element.style.flexGrow = String(value)
            return this
        },
        flexShrink(value: string | number) {
            this.element.style.flexShrink = String(value)
            return this
        },
        flexWrap(value: AvitaTypes.FlexWrap) {
            this.element.style.flexWrap = value
            return this
        },
        float(value: AvitaTypes.Float) {
            this.element.style.float = value
            return this
        },
        font(value: string) {
            this.element.style.font = value
            return this
        },
        fontSizeAdjust(value: string | number) {
            this.element.style.fontSizeAdjust = String(Number(value))
            return this
        },
        fontFeatureSettings(value: string) {
            this.element.style.fontFeatureSettings = value
            return this
        },
        fontKerning(value: AvitaTypes.FontKerning) {
            this.element.style.fontKerning = value
            return this
        },
        fontFamily(value: string) {
            this.element.style.fontFamily = value
            return this
        },
        fontSize(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.fontSize = String(value) + unit
            return this
        },
        fontStretch(value: string) {
            this.element.style.fontStretch = value
            return this
        },
        fontStyle(value: AvitaTypes.FontStyle) {
            this.element.style.fontStyle = value
            return this
        },
        fontVariant(value: string) {
            this.element.style.fontVariant = value
            return this
        },
        fontVariantCaps(value: string) {
            this.element.style.fontVariantCaps = value
            return this
        },
        fontVariantEastAsian(value: string) {
            this.element.style.fontVariantEastAsian = value
            return this
        },
        fontVariantLigatures(value: string) {
            this.element.style.fontVariantLigatures = value
            return this
        },
        fontVariantNumeric(value: string) {
            this.element.style.fontVariantNumeric = value
            return this
        },
        fontVariantPosition(value: string) {
            this.element.style.fontVariantPosition = value
            return this
        },
        fontWeight(value: string | number) {
            this.element.style.fontWeight = String(value)
            return this
        },
        gap(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.gap = String(value) + unit
            return this
        },
        grid(value: string) {
            this.element.style.grid = value
            return this
        },
        gridArea(value: string) {
            this.element.style.gridArea = value
            return this
        },
        gridAutoColumns(value: string) {
            this.element.style.gridAutoColumns = value
            return this
        },
        gridAutoFlow(value: AvitaTypes.GridAutoFlow) {
            this.element.style.gridAutoFlow = value
            return this
        },
        gridAutoRows(value: string) {
            this.element.style.gridAutoRows = value
            return this
        },
        gridColumn(value: string) {
            this.element.style.gridColumn = value
            return this
        },
        gridColumnEnd(value: string) {
            this.element.style.gridColumnEnd = value
            return this
        },
        gridColumnStart(value: string) {
            this.element.style.gridColumnStart = value
            return this
        },
        gridRow(value: string) {
            this.element.style.gridRow = value
            return this
        },
        gridRowEnd(value: string) {
            this.element.style.gridRowEnd = value
            return this
        },
        gridRowStart(value: string) {
            this.element.style.gridRowStart = value
            return this
        },
        gridTemplate(value: string) {
            this.element.style.gridTemplate = value
            return this
        },
        gridTemplateAreas(value: string) {
            this.element.style.gridTemplateAreas = value
            return this
        },
        gridTemplateColumns(value: string) {
            this.element.style.gridTemplateColumns = value
            return this
        },
        gridTemplateRows(value: string) {
            this.element.style.gridTemplateRows = value
            return this
        },
        height(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.height = String(value) + unit
            return this
        },
        hyphens(value: AvitaTypes.Hyphens) {
            this.element.style.hyphens = value
            return this
        },
        imageRendering(value: AvitaTypes.ImageRendering) {
            this.element.style.imageRendering = value
            return this
        },
        inlineSize(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.inlineSize = String(value) + unit
            return this
        },
        inset(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.inset = String(value) + unit
            return this
        },
        insetBlock(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.insetBlock = String(value) + unit
            return this
        },
        insetBlockEnd(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.insetBlockEnd = String(value) + unit
            return this
        },
        insetBlockStart(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.insetBlockStart = String(value) + unit
            return this
        },
        insetInline(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.insetInline = String(value) + unit
            return this
        },
        insetInlineEnd(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.insetInlineEnd = String(value) + unit
            return this
        },
        insetInlineStart(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.insetInlineStart = String(value) + unit
            return this
        },
        isolation(value: AvitaTypes.Isolation) {
            this.element.style.isolation = value
            return this
        },
        justifyContent(value: AvitaTypes.JustifyContent) {
            this.element.style.justifyContent = value
            return this
        },
        justifyItems(value: AvitaTypes.JustifyItems) {
            this.element.style.justifyItems = value
            return this
        },
        justifySelf(value: AvitaTypes.JustifySelf) {
            this.element.style.justifySelf = value
            return this
        },
        left(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.left = String(value) + unit
            return this
        },
        letterSpacing(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.letterSpacing = String(value) + unit
            return this
        },
        lineHeight(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.lineHeight = String(value) + unit
            return this
        },
        lineBreak(value: AvitaTypes.LineBreak) {
            this.element.style.lineBreak = value
            return this
        },
        listStyle(value: string) {
            this.element.style.listStyle = value
            return this
        },
        listStyleImage(value: string) {
            this.element.style.listStyleImage = value
            return this
        },
        listStylePosition(value: AvitaTypes.ListStylePosition) {
            this.element.style.listStylePosition = value
            return this
        },
        listStyleType(value: AvitaTypes.ListStyleType) {
            this.element.style.listStyleType = value
            return this
        },
        margin(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.margin = String(value) + unit
            return this
        },
        marginBlock(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.marginBlock = String(value) + unit
            return this
        },
        marginBlockEnd(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.marginBlockEnd = String(value) + unit
            return this
        },
        marginBlockStart(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.marginBlockStart = String(value) + unit
            return this
        },
        marginBottom(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.marginBottom = String(value) + unit
            return this
        },
        marginInline(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.marginInline = String(value) + unit
            return this
        },
        marginInlineEnd(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.marginInlineEnd = String(value) + unit
            return this
        },
        marginInlineStart(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.marginInlineStart = String(value) + unit
            return this
        },
        marginLeft(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.marginLeft = String(value) + unit
            return this
        },
        marginRight(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.marginRight = String(value) + unit
            return this
        },
        marginTop(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.marginTop = String(value) + unit
            return this
        },
        mask(value: string) {
            this.element.style.mask = value
            return this
        },
        maskImage(value: string) {
            this.element.style.maskImage = value
            return this
        },
        maskMode(value: AvitaTypes.MaskMode) {
            this.element.style.maskMode = value
            return this
        },
        maskOrigin(value: AvitaTypes.MaskOrigin) {
            this.element.style.maskOrigin = value
            return this
        },
        maskPosition(value: AvitaTypes.MaskPosition) {
            if (Array.isArray(value)) {
                this.element.style.maskPosition = value.join(" ")
                return this
            }
            this.element.style.maskPosition = value
            return this
        },
        maskRepeat(value: AvitaTypes.MaskRepeat) {
            this.element.style.maskRepeat = value
            return this
        },
        maskSize(value: AvitaTypes.MaskSize) {
            this.element.style.maskSize = value
            return this
        },
        maxBlockSize(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.maxBlockSize = String(value) + unit
            return this
        },
        maxHeight(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.maxHeight = String(value) + unit
            return this
        },
        maxInlineSize(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.maxInlineSize = String(value) + unit
            return this
        },
        maxWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.maxWidth = String(value) + unit
            return this
        },
        minBlockSize(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.minBlockSize = String(value) + unit
            return this
        },
        minHeight(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.minHeight = String(value) + unit
            return this
        },
        minInlineSize(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.minInlineSize = String(value) + unit
            return this
        },
        minWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.minWidth = String(value) + unit
            return this
        },
        mixBlendMode(value: AvitaTypes.MixBlendMode) {
            this.element.style.mixBlendMode = value
            return this
        },
        objectFit(value: AvitaTypes.ObjectFit) {
            this.element.style.objectFit = value
            return this
        },
        objectPosition(value: string) {
            this.element.style.objectPosition = value
            return this
        },
        offset(value: string) {
            this.element.style.offset = value
            return this
        },
        offsetAnchor(value: string) {
            this.element.style.offsetAnchor = value
            return this
        },

        offsetDistance(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.offsetDistance = String(value) + unit
            return this
        },
        offsetPath(value: string) {
            this.element.style.offsetPath = value
            return this
        },
        offsetRotate(value: string) {
            this.element.style.offsetRotate = value
            return this
        },
        opacity(value: number | string) {
            this.element.style.opacity = String(value)
            return this
        },
        order(value: number | string) {
            this.element.style.order = String(value)
            return this
        },
        orphans(value: number | string) {
            this.element.style.orphans = String(value)
            return this
        },
        outline(value: string) {
            this.element.style.outline = value
            return this
        },
        outlineColor(value: AvitaTypes.Color | string) {
            this.element.style.outlineColor = value
            return this
        },
        outlineOffset(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.outlineOffset = String(value) + unit
            return this
        },
        outlineStyle(value: AvitaTypes.OutlineStyle) {
            this.element.style.outlineStyle = value
            return this
        },
        outlineWidth(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.outlineWidth = String(value) + unit
            return this
        },
        overflow(value: AvitaTypes.Overflow) {
            this.element.style.overflow = value
            return this
        },
        overflowAnchor(value: AvitaTypes.OverflowAnchor) {
            this.element.style.overflowAnchor = value
            return this
        },
        overflowWrap(value: AvitaTypes.OverflowWrap) {
            this.element.style.overflowWrap = value
            return this
        },
        overflowX(value: AvitaTypes.Overflow) {
            this.element.style.overflowX = value
            return this
        },
        overflowY(value: AvitaTypes.Overflow) {
            this.element.style.overflowY = value
            return this
        },
        overscrollBehavior(value: AvitaTypes.OverscrollBehavior) {
            this.element.style.overscrollBehavior = value
            return this
        },
        overscrollBehaviorBlock(value: AvitaTypes.OverscrollBehavior) {
            this.element.style.overscrollBehaviorBlock = value
            return this
        },
        overscrollBehaviorInline(value: AvitaTypes.OverscrollBehavior) {
            this.element.style.overscrollBehaviorInline = value
            return this
        },
        overscrollBehaviorX(value: AvitaTypes.OverscrollBehavior) {
            this.element.style.overscrollBehaviorX = value
            return this
        },
        overscrollBehaviorY(value: AvitaTypes.OverscrollBehavior) {
            this.element.style.overscrollBehaviorY = value
            return this
        },
        padding(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.padding = String(value) + unit
            return this
        },
        paddingBlock(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.paddingBlock = String(value) + unit
            return this
        },
        paddingBlockEnd(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.paddingBlockEnd = String(value) + unit
            return this
        },
        paddingBlockStart(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.paddingBlockStart = String(value) + unit
            return this
        },
        paddingBottom(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.paddingBottom = String(value) + unit
            return this
        },
        paddingInline(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.paddingInline = String(value) + unit
            return this
        },
        paddingInlineEnd(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.paddingInlineEnd = String(value) + unit
            return this
        },
        paddingInlineStart(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.paddingInlineStart = String(value) + unit
            return this
        },
        paddingLeft(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.paddingLeft = String(value) + unit
            return this
        },
        paddingRight(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.paddingRight = String(value) + unit
            return this
        },
        paddingTop(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.paddingTop = String(value) + unit
            return this
        },
        pageBreakAfter(value: AvitaTypes.PageBreak) {
            this.element.style.pageBreakAfter = value
            return this
        },
        pageBreakBefore(value: AvitaTypes.PageBreak) {
            this.element.style.pageBreakBefore = value
            return this
        },
        pageBreakInside(value: AvitaTypes.PageBreak) {
            this.element.style.pageBreakInside = value
            return this
        },
        paintOrder(value: string) {
            this.element.style.paintOrder = value
            return this
        },
        perspective(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.perspective = String(value) + unit
            return this
        },
        perspectiveOrigin(value: string) {
            this.element.style.perspectiveOrigin = value
            return this
        },
        placeContent(value: AvitaTypes.PlaceContent) {
            this.element.style.placeContent = value
            return this
        },
        placeItems(value: AvitaTypes.PlaceItems) {
            this.element.style.placeItems = value
            return this
        },
        placeSelf(value: AvitaTypes.PlaceSelf) {
            this.element.style.placeSelf = value
            return this
        },
        pointerEvents(value: AvitaTypes.PointerEvents) {
            this.element.style.pointerEvents = value
            return this
        },
        position(value: AvitaTypes.Position) {
            this.element.style.position = value
            return this
        },
        quotes(value: string) {
            this.element.style.quotes = value
            return this
        },
        resize(value: AvitaTypes.Resize) {
            this.element.style.resize = value
            return this
        },
        right(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.right = String(value) + unit
            return this
        },
        rotate(value: string | number) {
            const unit = typeof value === "string" ? "" : "deg"
            this.element.style.rotate = String(value)
            return this
        },
        scale(value: string | number) {
            this.element.style.scale = String(value)
            return this
        },
        scrollBehavior(value: AvitaTypes.ScrollBehavior) {
            this.element.style.scrollBehavior = value
            return this
        },
        scrollMargin(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollMargin = String(value) + unit
            return this
        },
        scrollMarginBlock(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollMarginBlock = String(value) + unit
            return this
        },
        scrollMarginBlockEnd(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollMarginBlockEnd = String(value) + unit
            return this
        },
        scrollMarginBlockStart(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollMarginBlockStart = String(value) + unit
            return this
        },
        scrollMarginBottom(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollMarginBottom = String(value) + unit
            return this
        },
        scrollMarginInline(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollMarginInline = String(value) + unit
            return this
        },
        scrollMarginInlineEnd(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollMarginInlineEnd = String(value) + unit
            return this
        },
        scrollMarginInlineStart(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollMarginInlineStart = String(value) + unit
            return this
        },
        scrollMarginLeft(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollMarginLeft = String(value) + unit
            return this
        },
        scrollMarginRight(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollMarginRight = String(value) + unit
            return this
        },
        scrollMarginTop(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollMarginTop = String(value) + unit
            return this
        },
        scrollPadding(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollPadding = String(value) + unit
            return this
        },
        scrollPaddingBlock(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollPaddingBlock = String(value) + unit
            return this
        },
        scrollPaddingBlockEnd(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollPaddingBlockEnd = String(value) + unit
            return this
        },
        scrollPaddingBlockStart(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollPaddingBlockStart = String(value) + unit
            return this
        },
        scrollPaddingBottom(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollPaddingBottom = String(value) + unit
            return this
        },
        scrollPaddingInline(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollPaddingInline = String(value) + unit
            return this
        },
        scrollPaddingInlineEnd(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollPaddingInlineEnd = String(value) + unit
            return this
        },
        scrollPaddingInlineStart(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollPaddingInlineStart = String(value) + unit
            return this
        },
        scrollPaddingLeft(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollPaddingLeft = String(value) + unit
            return this
        },
        scrollPaddingRight(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollPaddingRight = String(value) + unit
            return this
        },
        scrollPaddingTop(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.scrollPaddingTop = String(value) + unit
            return this
        },
        scrollSnapAlign(value: string) {
            this.element.style.scrollSnapAlign = value
            return this
        },
        scrollSnapStop(value: string) {
            this.element.style.scrollSnapStop = value
            return this
        },
        scrollSnapType(value: string) {
            this.element.style.scrollSnapType = value
            return this
        },
        shapeImageThreshold(value: number) {
            this.element.style.shapeImageThreshold = String(value)
            return this
        },
        shapeMargin(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.shapeMargin = String(value) + unit
            return this
        },
        shapeOutside(value: string) {
            this.element.style.shapeOutside = value
            return this
        },
        tabSize(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.tabSize = String(value) + unit
            return this
        },
        tableLayout(value: AvitaTypes.TableLayout) {
            this.element.style.tableLayout = value
            return this
        },
        textAlign(value: AvitaTypes.TextAlign) {
            this.element.style.textAlign = value
            return this
        },
        textAlignLast(value: AvitaTypes.TextAlignLast) {
            this.element.style.textAlignLast = value
            return this
        },
        textCombineUpright(value: string) {
            this.element.style.textCombineUpright = value
            return this
        },
        textDecoration(value: string) {
            this.element.style.textDecoration = value
            return this
        },
        textDecorationColor(value: string) {
            this.element.style.textDecorationColor = value
            return this
        },
        textDecorationLine(value: string) {
            this.element.style.textDecorationLine = value
            return this
        },
        textDecorationStyle(value: string) {
            this.element.style.textDecorationStyle = value
            return this
        },
        textDecorationThickness(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.textDecorationThickness = String(value) + unit
            return this
        },
        textEmphasis(value: string) {
            this.element.style.textEmphasis = value
            return this
        },
        textEmphasisColor(value: string) {
            this.element.style.textEmphasisColor = value
            return this
        },
        textEmphasisPosition(value: string) {
            this.element.style.textEmphasisPosition = value
            return this
        },
        textEmphasisStyle(value: string) {
            this.element.style.textEmphasisStyle = value
            return this
        },
        textIndent(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.textIndent = String(value) + unit
            return this
        },
        textOrientation(value: string) {
            this.element.style.textOrientation = value
            return this
        },
        textOverflow(value: string) {
            this.element.style.textOverflow = value
            return this
        },
        textRendering(value: string) {
            this.element.style.textRendering = value
            return this
        },
        textShadow(value: string) {
            this.element.style.textShadow = value
            return this
        },
        textTransform(value: string) {
            this.element.style.textTransform = value
            return this
        },
        textUnderlineOffset(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.textUnderlineOffset = String(value) + unit
            return this
        },
        textUnderlinePosition(value: AvitaTypes.TextUnderlinePosition) {
            this.element.style.textUnderlinePosition = value
            return this
        },
        top(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.top = String(value) + unit
            return this
        },
        touchAction(value: string) {
            this.element.style.touchAction = value
            return this
        },
        transform(value: string) {
            this.element.style.transform = value
            return this
        },
        transformBox(value: string) {
            this.element.style.transformBox = value
            return this
        },
        transformOrigin(value: string) {
            this.element.style.transformOrigin = value
            return this
        },
        transformStyle(value: string) {
            this.element.style.transformStyle = value
            return this
        },
        transition(value: string) {
            this.element.style.transition = value
            return this
        },
        transitionDelay(value: string | number) {
            const unit = typeof value === "string" ? "" : "s"
            this.element.style.transitionDelay = numberToSeconds(value) + unit
            return this
        },
        transitionDuration(value: string | number) {
            const unit = typeof value === "string" ? "" : "s"
            this.element.style.transitionDuration =
                numberToSeconds(value) + unit
            return this
        },
        transitionProperty(value: string) {
            this.element.style.transitionProperty = value
            return this
        },
        transitionTimingFunction(value: string) {
            this.element.style.transitionTimingFunction = value
            return this
        },
        translate(value: string) {
            this.element.style.translate = value
            return this
        },
        unicodeBidi(value: string) {
            this.element.style.unicodeBidi = value
            return this
        },
        userSelect(value: string) {
            this.element.style.userSelect = value
            return this
        },
        verticalAlign(value: string) {
            this.element.style.verticalAlign = value
            return this
        },
        visibility(value: string) {
            this.element.style.visibility = value
            return this
        },
        whiteSpace(value: string) {
            this.element.style.whiteSpace = value
            return this
        },
        wordBreak(value: string) {
            this.element.style.wordBreak = value
            return this
        },
        wordSpacing(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.wordSpacing = String(value) + unit
            return this
        },
        widows(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.widows = String(value) + unit
            return this
        },
        width(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.width = String(value) + unit
            return this
        },
        willChange(value: string) {
            this.element.style.willChange = value
            return this
        },
        wordWrap(value: AvitaTypes.WordWrap) {
            this.element.style.wordWrap = value
            return this
        },
        writingMode(value: string) {
            this.element.style.writingMode = value
            return this
        },
        zIndex(value: string | number) {
            const unit = typeof value === "string" ? "" : "px"
            this.element.style.zIndex = String(value) + unit
            return this
        },
    }
}

function numberToSeconds(n: number | string): string {
    if (typeof n === "number") {
        return `${n}s`
    }
    return n
}
