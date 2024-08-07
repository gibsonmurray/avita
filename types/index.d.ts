declare module "avita" {
    export default interface AvitaElement<T extends HTMLElement> {
        element: T

        /* -- METADATA -- */
        id: (value: string) => AvitaElement<T>
        class: (value: string) => AvitaElement<T>
        style: (value: CSSStyleDeclaration) => AvitaElement<T>
        src: (value: URL) => AvitaElement<T>
        href: (value: URL) => AvitaElement<T>
        data: (key: string, value: string) => AvitaElement<T>
        alt: (value: string) => AvitaElement<T>
        title: (value: string) => AvitaElement<T>
        text: (value: string) => AvitaElement<T>
        html: (value: string) => AvitaElement<T>

        /* -- DOM CHANGES -- */
        append: (element: AvitaElement<T>) => AvitaElement<T>
        prepend: (element: AvitaElement<T>) => AvitaElement<T>
        remove: () => AvitaElement<T>
        children: (...elements: AvitaElement<T>[]) => AvitaElement<T>
        replace: (element: AvitaElement<T>) => AvitaElement<T>

        /* -- EVENTS -- */

        // Clipboard Events
        onCopy: (callback: (event: ClipboardEvent) => void) => AvitaElement<T>
        onCut: (callback: (event: ClipboardEvent) => void) => AvitaElement<T>
        onPaste: (callback: (event: ClipboardEvent) => void) => AvitaElement<T>

        // Composition Events
        onCompositionStart: (
            callback: (event: CompositionEvent) => void
        ) => AvitaElement<T>
        onCompositionUpdate: (
            callback: (event: CompositionEvent) => void
        ) => AvitaElement<T>
        onCompositionEnd: (
            callback: (event: CompositionEvent) => void
        ) => AvitaElement<T>

        // Form Events
        onChange: (callback: (event: Event) => void) => AvitaElement<T>
        onInput: (callback: (event: Event) => void) => AvitaElement<T>
        onSubmit: (callback: (event: Event) => void) => AvitaElement<T>
        onInvalid: (callback: (event: Event) => void) => AvitaElement<T>
        onReset: (callback: (event: Event) => void) => AvitaElement<T>

        // Keyboard Events
        onKeyDown: (callback: (event: KeyboardEvent) => void) => AvitaElement<T>
        onKeyPress: (
            callback: (event: KeyboardEvent) => void
        ) => AvitaElement<T>
        onKeyUp: (callback: (event: KeyboardEvent) => void) => AvitaElement<T>

        // Focus Events
        onFocus: (callback: (event: FocusEvent) => void) => AvitaElement<T>
        onFocusIn: (callback: (event: FocusEvent) => void) => AvitaElement<T>
        onFocusOut: (callback: (event: FocusEvent) => void) => AvitaElement<T>
        onBlur: (callback: (event: FocusEvent) => void) => AvitaElement<T>

        // Mouse Events
        onClick: (callback: (event: MouseEvent) => void) => AvitaElement<T>
        onDoubleClick: (
            callback: (event: MouseEvent) => void
        ) => AvitaElement<T>
        onMouseDown: (callback: (event: MouseEvent) => void) => AvitaElement<T>
        onMouseUp: (callback: (event: MouseEvent) => void) => AvitaElement<T>
        onMouseEnter: (callback: (event: MouseEvent) => void) => AvitaElement<T>
        onMouseLeave: (callback: (event: MouseEvent) => void) => AvitaElement<T>
        onMouseMove: (callback: (event: MouseEvent) => void) => AvitaElement<T>
        onMouseOut: (callback: (event: MouseEvent) => void) => AvitaElement<T>
        onMouseOver: (callback: (event: MouseEvent) => void) => AvitaElement<T>
        onContextMenu: (
            callback: (event: MouseEvent) => void
        ) => AvitaElement<T>

        // Pointer Events
        onPointerOver: (
            callback: (event: PointerEvent) => void
        ) => AvitaElement<T>
        onPointerEnter: (
            callback: (event: PointerEvent) => void
        ) => AvitaElement<T>
        onPointerDown: (
            callback: (event: PointerEvent) => void
        ) => AvitaElement<T>
        onPointerMove: (
            callback: (event: PointerEvent) => void
        ) => AvitaElement<T>
        onPointerUp: (
            callback: (event: PointerEvent) => void
        ) => AvitaElement<T>
        onPointerCancel: (
            callback: (event: PointerEvent) => void
        ) => AvitaElement<T>
        onPointerOut: (
            callback: (event: PointerEvent) => void
        ) => AvitaElement<T>
        onPointerLeave: (
            callback: (event: PointerEvent) => void
        ) => AvitaElement<T>
        onGotPointerCapture: (
            callback: (event: PointerEvent) => void
        ) => AvitaElement<T>
        onLostPointerCapture: (
            callback: (event: PointerEvent) => void
        ) => AvitaElement<T>

        // Touch Events
        onTouchStart: (callback: (event: TouchEvent) => void) => AvitaElement<T>
        onTouchMove: (callback: (event: TouchEvent) => void) => AvitaElement<T>
        onTouchEnd: (callback: (event: TouchEvent) => void) => AvitaElement<T>
        onTouchCancel: (
            callback: (event: TouchEvent) => void
        ) => AvitaElement<T>

        // UI Events
        onScroll: (callback: (event: Event) => void) => AvitaElement<T>
        onResize: (callback: (event: UIEvent) => void) => AvitaElement<T>

        // Wheel Events
        onWheel: (callback: (event: WheelEvent) => void) => AvitaElement<T>

        // Drag Events
        onDrag: (callback: (event: DragEvent) => void) => AvitaElement<T>
        onDragEnd: (callback: (event: DragEvent) => void) => AvitaElement<T>
        onDragEnter: (callback: (event: DragEvent) => void) => AvitaElement<T>
        onDragLeave: (callback: (event: DragEvent) => void) => AvitaElement<T>
        onDragOver: (callback: (event: DragEvent) => void) => AvitaElement<T>
        onDragStart: (callback: (event: DragEvent) => void) => AvitaElement<T>
        onDrop: (callback: (event: DragEvent) => void) => AvitaElement<T>

        // Media Events
        onAbort: (callback: (event: Event) => void) => AvitaElement<T>
        onCanPlay: (callback: (event: Event) => void) => AvitaElement<T>
        onCanPlayThrough: (callback: (event: Event) => void) => AvitaElement<T>
        onDurationChange: (callback: (event: Event) => void) => AvitaElement<T>
        onEmptied: (callback: (event: Event) => void) => AvitaElement<T>
        onEncrypted: (callback: (event: Event) => void) => AvitaElement<T>
        onEnded: (callback: (event: Event) => void) => AvitaElement<T>
        onLoadedData: (callback: (event: Event) => void) => AvitaElement<T>
        onLoadedMetadata: (callback: (event: Event) => void) => AvitaElement<T>
        onLoadStart: (callback: (event: Event) => void) => AvitaElement<T>
        onPause: (callback: (event: Event) => void) => AvitaElement<T>
        onPlay: (callback: (event: Event) => void) => AvitaElement<T>
        onPlaying: (callback: (event: Event) => void) => AvitaElement<T>
        onProgress: (callback: (event: Event) => void) => AvitaElement<T>
        onRateChange: (callback: (event: Event) => void) => AvitaElement<T>
        onSeeked: (callback: (event: Event) => void) => AvitaElement<T>
        onSeeking: (callback: (event: Event) => void) => AvitaElement<T>
        onStalled: (callback: (event: Event) => void) => AvitaElement<T>
        onSuspend: (callback: (event: Event) => void) => AvitaElement<T>
        onTimeUpdate: (callback: (event: Event) => void) => AvitaElement<T>
        onVolumeChange: (callback: (event: Event) => void) => AvitaElement<T>
        onWaiting: (callback: (event: Event) => void) => AvitaElement<T>

        // Image Events
        onLoad: (callback: (event: Event) => void) => AvitaElement<T>
        onError: (callback: (event: Event) => void) => AvitaElement<T>

        // Animation Events
        onAnimationStart: (
            callback: (event: AnimationEvent) => void
        ) => AvitaElement<T>
        onAnimationEnd: (
            callback: (event: AnimationEvent) => void
        ) => AvitaElement<T>
        onAnimationIteration: (
            callback: (event: AnimationEvent) => void
        ) => AvitaElement<T>

        // Transition Events
        onTransitionStart: (
            callback: (event: TransitionEvent) => void
        ) => AvitaElement<T>
        onTransitionEnd: (
            callback: (event: TransitionEvent) => void
        ) => AvitaElement<T>

        /* -- CSS PROPERTIES -- */
        accentColor: (value: AvitaColorType | string) => AvitaElement<T>
        alignContent: (value: AlignContent) => AvitaElement<T>
        alignItems: (value: AlignItems) => AvitaElement<T>
        alignSelf: (value: AlignSelf) => AvitaElement<T>
        all: (value: All) => AvitaElement<T>
        animation: (value: string) => AvitaElement<T>
        animationDelay: (value: string | number) => AvitaElement<T>
        animationDirection: (value: AnimationDirection) => AvitaElement<T>
        animationDuration: (value: string | number) => AvitaElement<T>
        animationFillMode: (value: AnimationFillMode) => AvitaElement<T>
        animationIterationCount: (
            value: AnimationIterationCount
        ) => AvitaElement<T>
        animationName: (value: string) => AvitaElement<T>
        animationPlayState: (value: AnimationPlayState) => AvitaElement<T>
        animationTimingFunction: (
            value: AnimationTimingFunction
        ) => AvitaElement<T>
        appearance: (value: Appearance) => AvitaElement<T>
        aspectRatio: (value: string | number) => AvitaElement<T>
        backdropFilter: (value: BackdropFilter) => AvitaElement<T>
        backfaceVisibility: (value: BackfaceVisibility) => AvitaElement<T>
        background: (value: string) => AvitaElement<T>
        backgroundAttachment: (value: BackgroundAttachment) => AvitaElement<T>
        backgroundBlendMode: (value: BackgroundBlendMode) => AvitaElement<T>
        backgroundClip: (value: BackgroundClip) => AvitaElement<T>
        backgroundColor: (value: AvitaColorType | string) => AvitaElement<T>
        backgroundImage: (value: URL | AvitaColorType | string) => AvitaElement<T>
        backgroundOrigin: (value: BackgroundOrigin) => AvitaElement<T>
        backgroundPosition: (value: BackgroundPosition) => AvitaElement<T>
        backgroundPositionX: (value: PositionValue | string) => AvitaElement<T>
        backgroundPositionY: (value: PositionValue | string) => AvitaElement<T>
        backgroundRepeat: (value: BackgroundRepeat) => AvitaElement<T>
        backgroundSize: (value: BackgroundSize) => AvitaElement<T>
        blockSize: (value: string | number) => AvitaElement<T>
        border: (value: string) => AvitaElement<T>
        borderBlock: (value: string) => AvitaElement<T>
        borderBlockColor: (value: AvitaColorType | string) => AvitaElement<T>
        borderBlockEnd: (value: string) => AvitaElement<T>
        borderBlockEndColor: (value: AvitaColorType | string) => AvitaElement<T>
        borderBlockEndStyle: (value: BorderStyle) => AvitaElement<T>
        borderBlockEndWidth: (value: string | number) => AvitaElement<T>
        borderBlockStart: (value: string) => AvitaElement<T>
        borderBlockStartColor: (value: AvitaColorType | string) => AvitaElement<T>
        borderBlockStartStyle: (value: BorderStyle) => AvitaElement<T>
        borderBlockStartWidth: (value: string | number) => AvitaElement<T>
        borderBlockStyle: (value: BorderStyle) => AvitaElement<T>
        borderBlockWidth: (value: string | number) => AvitaElement<T>
        borderBottom: (value: string) => AvitaElement<T>
        borderBottomColor: (value: AvitaColorType | string) => AvitaElement<T>
        borderBottomLeftRadius: (value: string | number) => AvitaElement<T>
        borderBottomRightRadius: (value: string | number) => AvitaElement<T>
        borderBottomStyle: (value: BorderStyle) => AvitaElement<T>
        borderBottomWidth: (value: string | number) => AvitaElement<T>
        borderCollapse: (value: BorderCollapse) => AvitaElement<T>
        borderColor: (value: AvitaColorType | string) => AvitaElement<T>
        borderImage: (value: string) => AvitaElement<T>
        borderImageOutset: (value: string | number) => AvitaElement<T>
        borderImageRepeat: (value: BorderImageRepeat) => AvitaElement<T>
        borderImageSlice: (value: string | number) => AvitaElement<T>
        borderImageSource: (value: string) => AvitaElement<T>
        borderImageWidth: (value: string | number) => AvitaElement<T>
        borderInline: (value: string) => AvitaElement<T>
        borderInlineColor: (value: AvitaColorType | string) => AvitaElement<T>
        borderInlineEnd: (value: string) => AvitaElement<T>
        borderInlineEndColor: (value: AvitaColorType | string) => AvitaElement<T>
        borderInlineEndStyle: (value: BorderStyle) => AvitaElement<T>
        borderInlineEndWidth: (value: string | number) => AvitaElement<T>
        borderInlineStart: (value: string) => AvitaElement<T>
        borderInlineStartColor: (value: AvitaColorType | string) => AvitaElement<T>
        borderInlineStartStyle: (value: BorderStyle) => AvitaElement<T>
        borderInlineStartWidth: (value: string | number) => AvitaElement<T>
        borderInlineStyle: (value: BorderStyle) => AvitaElement<T>
        borderInlineWidth: (value: string | number) => AvitaElement<T>
        borderLeft: (value: string) => AvitaElement<T>
        borderLeftColor: (value: AvitaColorType | string) => AvitaElement<T>
        borderLeftStyle: (value: BorderStyle) => AvitaElement<T>
        borderLeftWidth: (value: string | number) => AvitaElement<T>
        borderRadius: (value: string | number) => AvitaElement<T>
        borderRight: (value: string) => AvitaElement<T>
        borderRightColor: (value: AvitaColorType | string) => AvitaElement<T>
        borderRightStyle: (value: BorderStyle) => AvitaElement<T>
        borderRightWidth: (value: string | number) => AvitaElement<T>
        borderSpacing: (value: string | number) => AvitaElement<T>
        borderStyle: (value: BorderStyle) => AvitaElement<T>
        borderTop: (value: string) => AvitaElement<T>
        borderTopColor: (value: AvitaColorType | string) => AvitaElement<T>
        borderTopLeftRadius: (value: string | number) => AvitaElement<T>
        borderTopRightRadius: (value: string | number) => AvitaElement<T>
        borderTopStyle: (value: BorderStyle) => AvitaElement<T>
        borderTopWidth: (value: string | number) => AvitaElement<T>
        borderWidth: (value: string | number) => AvitaElement<T>
        bottom: (value: string | number) => AvitaElement<T>
        boxShadow: (value: string) => AvitaElement<T>
        boxSizing: (value: BoxSizing) => AvitaElement<T>
        breakAfter: (value: BreakAfter) => AvitaElement<T>
        breakBefore: (value: BreakBefore) => AvitaElement<T>
        breakInside: (value: BreakInside) => AvitaElement<T>
        captionSide: (value: CaptionSide) => AvitaElement<T>
        caretColor: (value: AvitaColorType | string) => AvitaElement<T>
        clear: (value: Clear) => AvitaElement<T>
        clipPath: (value: string) => AvitaElement<T>
        color: (value: AvitaColorType | string) => AvitaElement<T>
        columnCount: (value: number | ColumnCount) => AvitaElement<T>
        columnFill: (value: ColumnFill) => AvitaElement<T>
        columnGap: (value: string | number) => AvitaElement<T>
        columnRule: (value: string) => AvitaElement<T>
        columnRuleColor: (value: AvitaColorType | string) => AvitaElement<T>
        columnRuleStyle: (value: BorderStyle) => AvitaElement<T>
        columnRuleWidth: (value: string | number) => AvitaElement<T>
        columnSpan: (value: ColumnSpan) => AvitaElement<T>
        columnWidth: (value: string | number) => AvitaElement<T>
        columns: (value: string) => AvitaElement<T>
        content: (value: string) => AvitaElement<T>
        counterIncrement: (value: string) => AvitaElement<T>
        counterReset: (value: string) => AvitaElement<T>
        cursor: (value: Cursor) => AvitaElement<T>
        direction: (value: Direction) => AvitaElement<T>
        display: (value: Display) => AvitaElement<T>
        emptyCells: (value: EmptyCells) => AvitaElement<T>
        filter: (value: string) => AvitaElement<T>
        flex: (value: string | Flex) => AvitaElement<T>
        flexBasis: (value: string | number) => AvitaElement<T>
        flexDirection: (value: FlexDirection) => AvitaElement<T>
        flexFlow: (value: string) => AvitaElement<T>
        flexGrow: (value: string | number) => AvitaElement<T>
        flexShrink: (value: string | number) => AvitaElement<T>
        flexWrap: (value: FlexWrap) => AvitaElement<T>
        float: (value: Float) => AvitaElement<T>
        font: (value: string) => AvitaElement<T>
        fontFamily: (value: string) => AvitaElement<T>
        fontFeatureSettings: (value: string) => AvitaElement<T>
        fontKerning: (value: FontKerning) => AvitaElement<T>
        fontSize: (value: string | number | FontSize) => AvitaElement<T>
        fontSizeAdjust: (value: number | "none") => AvitaElement<T>
        fontStretch: (value: string) => AvitaElement<T>
        fontStyle: (value: FontStyle) => AvitaElement<T>
        fontVariant: (value: string) => AvitaElement<T>
        fontVariantCaps: (value: FontVariantCaps) => AvitaElement<T>
        fontVariantEastAsian: (value: string) => AvitaElement<T>
        fontVariantLigatures: (value: string) => AvitaElement<T>
        fontVariantNumeric: (value: string) => AvitaElement<T>
        fontVariantPosition: (value: FontVariantPosition) => AvitaElement<T>
        fontWeight: (value: string | number) => AvitaElement<T>
        gap: (value: string | number) => AvitaElement<T>
        grid: (value: string) => AvitaElement<T>
        gridArea: (value: string) => AvitaElement<T>
        gridAutoColumns: (value: string) => AvitaElement<T>
        gridAutoFlow: (value: GridAutoFlow) => AvitaElement<T>
        gridAutoRows: (value: string) => AvitaElement<T>
        gridColumn: (value: string) => AvitaElement<T>
        gridColumnEnd: (value: string) => AvitaElement<T>
        gridColumnStart: (value: string) => AvitaElement<T>
        gridRow: (value: string) => AvitaElement<T>
        gridRowEnd: (value: string) => AvitaElement<T>
        gridRowStart: (value: string) => AvitaElement<T>
        gridTemplate: (value: string) => AvitaElement<T>
        gridTemplateAreas: (value: string) => AvitaElement<T>
        gridTemplateColumns: (value: string) => AvitaElement<T>
        gridTemplateRows: (value: string) => AvitaElement<T>
        height: (value: string | number) => AvitaElement<T>
        hyphens: (value: Hyphens) => AvitaElement<T>
        imageRendering: (value: ImageRendering) => AvitaElement<T>
        inlineSize: (value: string | number) => AvitaElement<T>
        inset: (value: string | number) => AvitaElement<T>
        insetBlock: (value: string | number) => AvitaElement<T>
        insetBlockEnd: (value: string | number) => AvitaElement<T>
        insetBlockStart: (value: string | number) => AvitaElement<T>
        insetInline: (value: string | number) => AvitaElement<T>
        insetInlineEnd: (value: string | number) => AvitaElement<T>
        insetInlineStart: (value: string | number) => AvitaElement<T>
        isolation: (value: Isolation) => AvitaElement<T>
        justifyContent: (value: JustifyContent) => AvitaElement<T>
        justifyItems: (value: JustifyItems) => AvitaElement<T>
        justifySelf: (value: JustifySelf) => AvitaElement<T>
        left: (value: string | number) => AvitaElement<T>
        letterSpacing: (value: string | number) => AvitaElement<T>
        lineBreak: (value: LineBreak) => AvitaElement<T>
        lineHeight: (value: string | number) => AvitaElement<T>
        listStyle: (value: string) => AvitaElement<T>
        listStyleImage: (value: string) => AvitaElement<T>
        listStylePosition: (value: ListStylePosition) => AvitaElement<T>
        listStyleType: (value: ListStyleType) => AvitaElement<T>
        margin: (value: string | number) => AvitaElement<T>
        marginBlock: (value: string | number) => AvitaElement<T>
        marginBlockEnd: (value: string | number) => AvitaElement<T>
        marginBlockStart: (value: string | number) => AvitaElement<T>
        marginBottom: (value: string | number) => AvitaElement<T>
        marginInline: (value: string | number) => AvitaElement<T>
        marginInlineEnd: (value: string | number) => AvitaElement<T>
        marginInlineStart: (value: string | number) => AvitaElement<T>
        marginLeft: (value: string | number) => AvitaElement<T>
        marginRight: (value: string | number) => AvitaElement<T>
        marginTop: (value: string | number) => AvitaElement<T>
        mask: (value: string) => AvitaElement<T>
        maskImage: (value: string) => AvitaElement<T>
        maskMode: (value: MaskMode) => AvitaElement<T>
        maskOrigin: (value: MaskOrigin) => AvitaElement<T>
        maskPosition: (value: MaskPosition) => AvitaElement<T>
        maskRepeat: (value: MaskRepeat) => AvitaElement<T>
        maskSize: (value: MaskSize) => AvitaElement<T>
        maxBlockSize: (value: string | number) => AvitaElement<T>
        maxHeight: (value: string | number) => AvitaElement<T>
        maxInlineSize: (value: string | number) => AvitaElement<T>
        maxWidth: (value: string | number) => AvitaElement<T>
        minBlockSize: (value: string | number) => AvitaElement<T>
        minHeight: (value: string | number) => AvitaElement<T>
        minInlineSize: (value: string | number) => AvitaElement<T>
        minWidth: (value: string | number) => AvitaElement<T>
        mixBlendMode: (value: MixBlendMode) => AvitaElement<T>
        objectFit: (value: ObjectFit) => AvitaElement<T>
        objectPosition: (value: string) => AvitaElement<T>
        offset: (value: string) => AvitaElement<T>
        offsetAnchor: (value: string) => AvitaElement<T>
        offsetDistance: (value: string | number) => AvitaElement<T>
        offsetPath: (value: string) => AvitaElement<T>
        offsetRotate: (value: string) => AvitaElement<T>
        opacity: (value: number | string) => AvitaElement<T>
        order: (value: number | string) => AvitaElement<T>
        orphans: (value: number) => AvitaElement<T>
        outline: (value: string) => AvitaElement<T>
        outlineColor: (value: AvitaColorType | string) => AvitaElement<T>
        outlineOffset: (value: string | number) => AvitaElement<T>
        outlineStyle: (value: OutlineStyle) => AvitaElement<T>
        outlineWidth: (value: string | number) => AvitaElement<T>
        overflow: (value: Overflow) => AvitaElement<T>
        overflowAnchor: (value: OverflowAnchor) => AvitaElement<T>
        overflowWrap: (value: OverflowWrap) => AvitaElement<T>
        overflowX: (value: OverflowX) => AvitaElement<T>
        overflowY: (value: OverflowY) => AvitaElement<T>
        overscrollBehavior: (value: OverscrollBehavior) => AvitaElement<T>
        overscrollBehaviorBlock: (value: OverscrollBehavior) => AvitaElement<T>
        overscrollBehaviorInline: (value: OverscrollBehavior) => AvitaElement<T>
        overscrollBehaviorX: (value: OverscrollBehavior) => AvitaElement<T>
        overscrollBehaviorY: (value: OverscrollBehavior) => AvitaElement<T>
        padding: (value: string | number) => AvitaElement<T>
        paddingBlock: (value: string | number) => AvitaElement<T>
        paddingBlockEnd: (value: string | number) => AvitaElement<T>
        paddingBlockStart: (value: string | number) => AvitaElement<T>
        paddingBottom: (value: string | number) => AvitaElement<T>
        paddingInline: (value: string | number) => AvitaElement<T>
        paddingInlineEnd: (value: string | number) => AvitaElement<T>
        paddingInlineStart: (value: string | number) => AvitaElement<T>
        paddingLeft: (value: string | number) => AvitaElement<T>
        paddingRight: (value: string | number) => AvitaElement<T>
        paddingTop: (value: string | number) => AvitaElement<T>
        pageBreakAfter: (value: PageBreak) => AvitaElement<T>
        pageBreakBefore: (value: PageBreak) => AvitaElement<T>
        pageBreakInside: (value: PageBreak) => AvitaElement<T>
        paintOrder: (value: string) => AvitaElement<T>
        perspective: (value: string | number) => AvitaElement<T>
        perspectiveOrigin: (value: string) => AvitaElement<T>
        placeContent: (value: PlaceContent) => AvitaElement<T>
        placeItems: (value: PlaceItems) => AvitaElement<T>
        placeSelf: (value: PlaceSelf) => AvitaElement<T>
        pointerEvents: (value: PointerEvents) => AvitaElement<T>
        position: (value: Position) => AvitaElement<T>
        quotes: (value: string) => AvitaElement<T>
        resize: (value: Resize) => AvitaElement<T>
        right: (value: string | number) => AvitaElement<T>
        rotate: (value: string) => AvitaElement<T>
        scale: (value: string | number) => AvitaElement<T>
        scrollBehavior: (value: ScrollBehavior) => AvitaElement<T>
        scrollMargin: (value: string | number) => AvitaElement<T>
        scrollMarginBlock: (value: string | number) => AvitaElement<T>
        scrollMarginBlockEnd: (value: string | number) => AvitaElement<T>
        scrollMarginBlockStart: (value: string | number) => AvitaElement<T>
        scrollMarginBottom: (value: string | number) => AvitaElement<T>
        scrollMarginInline: (value: string | number) => AvitaElement<T>
        scrollMarginInlineEnd: (value: string | number) => AvitaElement<T>
        scrollMarginInlineStart: (value: string | number) => AvitaElement<T>
        scrollMarginLeft: (value: string | number) => AvitaElement<T>
        scrollMarginRight: (value: string | number) => AvitaElement<T>
        scrollMarginTop: (value: string | number) => AvitaElement<T>
        scrollPadding: (value: string | number) => AvitaElement<T>
        scrollPaddingBlock: (value: string | number) => AvitaElement<T>
        scrollPaddingBlockEnd: (value: string | number) => AvitaElement<T>
        scrollPaddingBlockStart: (value: string | number) => AvitaElement<T>
        scrollPaddingBottom: (value: string | number) => AvitaElement<T>
        scrollPaddingInline: (value: string | number) => AvitaElement<T>
        scrollPaddingInlineEnd: (value: string | number) => AvitaElement<T>
        scrollPaddingInlineStart: (value: string | number) => AvitaElement<T>
        scrollPaddingLeft: (value: string | number) => AvitaElement<T>
        scrollPaddingRight: (value: string | number) => AvitaElement<T>
        scrollPaddingTop: (value: string | number) => AvitaElement<T>
        scrollSnapAlign: (value: string) => AvitaElement<T>
        scrollSnapStop: (value: ScrollSnapStop) => AvitaElement<T>
        scrollSnapType: (value: string) => AvitaElement<T>
        shapeImageThreshold: (value: number) => AvitaElement<T>
        shapeMargin: (value: string | number) => AvitaElement<T>
        shapeOutside: (value: string) => AvitaElement<T>
        tabSize: (value: number | string) => AvitaElement<T>
        tableLayout: (value: TableLayout) => AvitaElement<T>
        textAlign: (value: TextAlign) => AvitaElement<T>
        textAlignLast: (value: TextAlignLast) => AvitaElement<T>
        textCombineUpright: (value: TextCombineUpright) => AvitaElement<T>
        textDecoration: (value: TextDecoration) => AvitaElement<T>
        textDecorationColor: (value: AvitaColorType | string) => AvitaElement<T>
        textDecorationLine: (value: string) => AvitaElement<T>
        textDecorationStyle: (value: string) => AvitaElement<T>
        textDecorationThickness: (value: string | number) => AvitaElement<T>
        textEmphasis: (value: string) => AvitaElement<T>
        textEmphasisColor: (value: AvitaColorType | string) => AvitaElement<T>
        textEmphasisPosition: (value: string) => AvitaElement<T>
        textEmphasisStyle: (value: string) => AvitaElement<T>
        textIndent: (value: string | number) => AvitaElement<T>
        textOrientation: (value: TextOrientation) => AvitaElement<T>
        textOverflow: (value: TextOverflow) => AvitaElement<T>
        textRendering: (value: TextRendering) => AvitaElement<T>
        textShadow: (value: string) => AvitaElement<T>
        textTransform: (value: TextTransform) => AvitaElement<T>
        textUnderlineOffset: (value: string | number) => AvitaElement<T>
        textUnderlinePosition: (value: TextUnderlinePosition) => AvitaElement<T>
        top: (value: string | number) => AvitaElement<T>
        touchAction: (value: TouchAction) => AvitaElement<T>
        transform: (value: string) => AvitaElement<T>
        transformBox: (value: TransformBox) => AvitaElement<T>
        transformOrigin: (value: string) => AvitaElement<T>
        transformStyle: (value: TransformStyle) => AvitaElement<T>
        transition: (value: string) => AvitaElement<T>
        transitionDelay: (value: string | number) => AvitaElement<T>
        transitionDuration: (value: string | number) => AvitaElement<T>
        transitionProperty: (value: string) => AvitaElement<T>
        transitionTimingFunction: (value: string) => AvitaElement<T>
        translate: (value: string) => AvitaElement<T>
        unicodeBidi: (value: UnicodeBidi) => AvitaElement<T>
        userSelect: (value: UserSelect) => AvitaElement<T>
        verticalAlign: (value: VerticalAlign) => AvitaElement<T>
        visibility: (value: Visibility) => AvitaElement<T>
        whiteSpace: (value: WhiteSpace) => AvitaElement<T>
        widows: (value: string | number) => AvitaElement<T>
        width: (value: string | number) => AvitaElement<T>
        willChange: (value: string) => AvitaElement<T>
        wordBreak: (value: WordBreak) => AvitaElement<T>
        wordSpacing: (value: string | number) => AvitaElement<T>
        wordWrap: (value: WordWrap) => AvitaElement<T>
        writingMode: (value: WritingMode) => AvitaElement<T>
        zIndex: (value: number | "auto") => AvitaElement<T>
    }

    export type AvitaColorType = {
        red: string
        redOrange: string
        orange: string
        orangeYellow: string
        yellow: string
        yellowGreen: string
        lime: string
        green: string
        cyan: string
        teal: string
        blue: string
        navy: string
        blueViolet: string
        violet: string
        magenta: string
        magentaPink: string
        purple: string
        pink: string
        redPink: string
        brown: string
        tan: string
        beige: string
        maroon: string
        olive: string
        silver: string
        gold: string
        gray: string
        lightGray: string
        darkGray: string
        black: string
        white: string
        transparent: string
        random: () => string
    }

    export type Appearance = "auto" | "none"
    export type AlignContent =
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly"
        | "stretch"
        | "initial"
        | "inherit"
    export type AlignItems =
        | "flex-start"
        | "flex-end"
        | "center"
        | "baseline"
        | "stretch"
        | "initial"
        | "inherit"
    export type AlignSelf =
        | "auto"
        | "flex-start"
        | "flex-end"
        | "center"
        | "baseline"
        | "stretch"
        | "initial"
        | "inherit"
    export type All = "initial" | "inherit" | "unset"
    export type AnimationDirection =
        | "normal"
        | "reverse"
        | "alternate"
        | "alternate-reverse"
        | "initial"
        | "inherit"
    export type AnimationFillMode =
        | "none"
        | "forwards"
        | "backwards"
        | "both"
        | "initial"
        | "inherit"
    export type AnimationIterationCount =
        | "infinite"
        | "number"
        | "initial"
        | "inherit"
    export type AnimationPlayState =
        | "running"
        | "paused"
        | "initial"
        | "inherit"
    export type AnimationTimingFunction =
        | "ease"
        | "linear"
        | "ease-in"
        | "ease-out"
        | "ease-in-out"
        | "step-start"
        | "step-end"
        | "initial"
        | "inherit"
    export type BackdropFilter =
        | "none"
        | "initial"
        | "inherit"
        | string
        | [Filter, string | number]
    export type BackfaceVisibility =
        | "visible"
        | "hidden"
        | "initial"
        | "inherit"
    export type BackgroundAttachment =
        | "scroll"
        | "fixed"
        | "local"
        | "initial"
        | "inherit"
    export type BackgroundBlendMode =
        | "normal"
        | "multiply"
        | "screen"
        | "overlay"
        | "darken"
        | "lighten"
        | "color-dodge"
        | "saturate"
        | "color"
        | "luminosity"
    export type BackgroundClip =
        | "border-box"
        | "padding-box"
        | "content-box"
        | "initial"
        | "inherit"
    export type BackgroundOrigin = BackgroundClip
    export type BackgroundPosition =
        | PositionValue
        | [PositionValue, PositionValue]
        | "initial"
        | "inherit"
        | CSSTuple
    export type BackgroundRepeat =
        | "repeat"
        | "repeat-x"
        | "repeat-y"
        | "no-repeat"
        | "space"
        | "round"
        | "initial"
        | "inherit"
    export type BackgroundSize =
        | "auto"
        | "cover"
        | "contain"
        | "initial"
        | "inherit"
        | CSSTuple
    export type BorderCollapse = "separate" | "collapse" | "initial" | "inherit"
    export type BorderImageRepeat =
        | "stretch"
        | "repeat"
        | "round"
        | "space"
        | "initial"
        | "inherit"
    export type BorderStyle =
        | "none"
        | "hidden"
        | "dotted"
        | "dashed"
        | "solid"
        | "double"
        | "groove"
        | "ridge"
        | "inset"
        | "outset"
        | "initial"
        | "inherit"
    export type BoxSizing = "content-box" | "border-box" | "initial" | "inherit"
    export type BreakBefore =
        | "auto"
        | "avoid"
        | "always"
        | "all"
        | "avoid-page"
        | "page"
        | "left"
        | "right"
        | "recto"
        | "verso"
        | "avoid-column"
        | "column"
        | "avoid-region"
        | "region"
    export type BreakAfter = BreakBefore
    export type BreakInside = BreakBefore
    export type CaptionSide = "top" | "bottom" | "initial" | "inherit"
    export type Clear =
        | "none"
        | "left"
        | "right"
        | "both"
        | "initial"
        | "inherit"
    export type ColumnCount = "auto" | "initial" | "inherit"
    export type CSSTuple = string | [string, string]
    export type FlexDirection =
        | "row"
        | "row-reverse"
        | "column"
        | "column-reverse"
        | "initial"
        | "inherit"
    export type FlexWrap =
        | "nowrap"
        | "wrap"
        | "wrap-reverse"
        | "initial"
        | "inherit"
    export type Float = "none" | "left" | "right" | "initial" | "inherit"
    export type FontStyle =
        | "normal"
        | "italic"
        | "oblique"
        | "initial"
        | "inherit"
    export type FontVariantCaps =
        | "normal"
        | "small-caps"
        | "all-small-caps"
        | "petite-caps"
        | "all-petite-caps"
        | "unicase"
        | "titling-caps"
        | "initial"
        | "inherit"
        | "unset"
    export type FontVariantPosition =
        | "normal"
        | "sub"
        | "super"
        | "initial"
        | "inherit"
    export type Filter =
        | "blur"
        | "brightness"
        | "contrast"
        | "drop-shadow"
        | "grayscale"
        | "hue-rotate"
        | "invert"
        | "opacity"
        | "saturate"
        | "sepia"
        | "initial"
        | "inherit"
    export type GridAutoFlow =
        | "row"
        | "column"
        | "dense"
        | "row dense"
        | "column dense"
    export type Hyphens = "none" | "manual" | "auto" | "initial" | "inherit"
    export type PositionValue = "left" | "right" | "top" | "bottom" | "center"
    export type URL = string
    export type FontSize =
        | "xx-small"
        | "x-small"
        | "small"
        | "medium"
        | "large"
        | "x-large"
        | "xx-large"
        | "smaller"
        | "larger"
        | "initial"
        | "inherit"
    export type TextAlign =
        | "left"
        | "right"
        | "center"
        | "justify"
        | "initial"
        | "inherit"
    export type TextDecoration =
        | "none"
        | "underline"
        | "overline"
        | "line-through"
        | "initial"
        | "inherit"
    export type TextTransform =
        | "none"
        | "capitalize"
        | "uppercase"
        | "lowercase"
        | "initial"
        | "inherit"
    export type TextUnderlinePosition =
        | "auto"
        | "under"
        | "left"
        | "right"
        | "initial"
        | "inherit"
    export type WhiteSpace =
        | "normal"
        | "nowrap"
        | "pre"
        | "pre-line"
        | "pre-wrap"
        | "initial"
        | "inherit"
    export type WordBreak =
        | "normal"
        | "break-all"
        | "keep-all"
        | "break-word"
        | "initial"
        | "inherit"
    export type WordWrap = "normal" | "break-word" | "initial" | "inherit"
    export type WritingMode =
        | "horizontal-tb"
        | "vertical-rl"
        | "vertical-lr"
        | "sideways-rl"
        | "sideways-lr"
    export type ColumnFill = "balance" | "auto"
    export type ColumnSpan = "none" | "all"
    export type Direction = "ltr" | "rtl" | "initial" | "inherit"
    export type EmptyCells = "show" | "hide" | "initial" | "inherit"
    export type Isolation = "auto" | "isolate" | "initial" | "inherit"
    export type JustifyContent =
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly"
        | "initial"
        | "inherit"
    export type JustifyItems =
        | "auto"
        | "normal"
        | "stretch"
        | "center"
        | "start"
        | "end"
        | "flex-start"
        | "flex-end"
        | "self-start"
        | "self-end"
        | "left"
        | "right"
        | "baseline"
        | "first baseline"
        | "last baseline"
        | "safe center"
        | "unsafe center"
        | "legacy right"
        | "legacy left"
        | "legacy center"
        | "legacy stretch"
        | "initial"
        | "inherit"
    export type JustifySelf = JustifyItems
    export type LineBreak = "auto" | "loose" | "normal" | "strict" | "anywhere"
    export type ImageRendering = "auto" | "crisp-edges" | "pixelated"
    export type ListStylePosition = "inside" | "outside" | "initial" | "inherit"
    export type MaskBorderMode = "alpha" | "luminance"
    export type ObjectFit = "fill" | "contain" | "cover" | "none" | "scale-down"
    export type MixBlendMode =
        | "normal"
        | "multiply"
        | "screen"
        | "overlay"
        | "darken"
        | "lighten"
        | "color-dodge"
        | "color-burn"
        | "hard-light"
        | "soft-light"
        | "difference"
        | "exclusion"
        | "hue"
        | "saturation"
        | "color"
        | "luminosity"
    export type Overflow =
        | "visible"
        | "hidden"
        | "scroll"
        | "auto"
        | "initial"
        | "inherit"
    export type OverflowAnchor = "none" | "auto"
    export type OverflowWrap = "normal" | "break-word" | "anywhere"
    export type OverflowX =
        | "visible"
        | "hidden"
        | "scroll"
        | "auto"
        | "initial"
        | "inherit"
    export type OverflowY =
        | "visible"
        | "hidden"
        | "scroll"
        | "auto"
        | "initial"
        | "inherit"
    export type OverscrollBehavior = "auto" | "contain" | "none"
    export type PointerEvents = "auto" | "none" | "initial" | "inherit"
    export type Position =
        | "static"
        | "relative"
        | "absolute"
        | "fixed"
        | "sticky"
    export type Resize =
        | "none"
        | "both"
        | "horizontal"
        | "vertical"
        | "initial"
        | "inherit"
    export type ScrollBehavior = "auto" | "smooth"
    export type ScrollSnapStop = "normal" | "always"
    export type TableLayout = "auto" | "fixed" | "initial" | "inherit"
    export type TextAlignLast =
        | "auto"
        | "left"
        | "right"
        | "center"
        | "justify"
        | "start"
        | "end"
    export type TextCombineUpright =
        | "none"
        | "all"
        | "digits"
        | "initial"
        | "inherit"
    export type TextJustify =
        | "auto"
        | "inter-word"
        | "inter-ideograph"
        | "inter-cluster"
        | "distribute"
    export type TextOrientation =
        | "mixed"
        | "upright"
        | "sideways"
        | "sideways-right"
        | "use-glyph-orientation"
    export type TextRendering =
        | "auto"
        | "optimizeSpeed"
        | "optimizeLegibility"
        | "geometricPrecision"
    export type UnicodeBidi =
        | "normal"
        | "embed"
        | "isolate"
        | "bidi-override"
        | "isolate-override"
        | "plaintext"
    export type UserSelect = "auto" | "text" | "none" | "contain" | "all"
    export type VerticalAlign =
        | "baseline"
        | "length"
        | "sub"
        | "super"
        | "top"
        | "text-top"
        | "middle"
        | "bottom"
        | "text-bottom"
        | "initial"
        | "inherit"
    export type Visibility =
        | "visible"
        | "hidden"
        | "collapse"
        | "initial"
        | "inherit"
    export type OutlineStyle =
        | "none"
        | "hidden"
        | "dotted"
        | "dashed"
        | "solid"
        | "double"
        | "groove"
        | "ridge"
        | "inset"
        | "outset"
        | "initial"
        | "inherit"
    export type TextOverflow = "clip" | "ellipsis" | "initial" | "inherit"
    export type TouchAction =
        | "auto"
        | "none"
        | "pan-x"
        | "pan-y"
        | "manipulation"
    export type TransformBox = "border-box" | "fill-box" | "view-box"
    export type TransformStyle = "flat" | "preserve-3d"
    export type FontKerning = "auto" | "normal" | "none"
    export type Display =
        | "inline"
        | "block"
        | "contents"
        | "flex"
        | "grid"
        | "inline-block"
        | "inline-flex"
        | "inline-grid"
        | "inline-table"
        | "list-item"
        | "run-in"
        | "table"
        | "table-caption"
        | "table-column-group"
        | "table-header-group"
        | "table-footer-group"
        | "table-row-group"
        | "table-cell"
        | "table-column"
        | "table-row"
        | "none"
        | "initial"
        | "inherit"
    export type Cursor =
        | "auto"
        | "default"
        | "none"
        | "context-menu"
        | "help"
        | "pointer"
        | "progress"
        | "wait"
        | "cell"
        | "crosshair"
        | "text"
        | "vertical-text"
        | "alias"
        | "copy"
        | "move"
        | "no-drop"
        | "not-allowed"
        | "e-resize"
        | "n-resize"
        | "ne-resize"
        | "nw-resize"
        | "s-resize"
        | "se-resize"
        | "sw-resize"
        | "w-resize"
        | "ew-resize"
        | "ns-resize"
        | "nesw-resize"
        | "nwse-resize"
        | "col-resize"
        | "row-resize"
        | "all-scroll"
        | "zoom-in"
        | "zoom-out"
        | "grab"
        | "grabbing"
        | "initial"
        | "inherit"
    export type Flex =
        | "none"
        | "initial"
        | "inherit"
        | "auto"
        | FlexGrow
        | FlexShrink
        | FlexBasis
        | [FlexGrow, FlexShrink, FlexBasis]
    export type FlexGrow = string
    export type FlexShrink = string
    export type FlexBasis = "auto" | "initial" | "inherit" | "content" | string
    export type ListStyleType =
        | "none"
        | "disc"
        | "circle"
        | "square"
        | "decimal"
        | "decimal-leading-zero"
        | "lower-roman"
        | "upper-roman"
        | "lower-greek"
        | "lower-latin"
        | "upper-latin"
        | "armenian"
        | "georgian"
        | "lower-alpha"
        | "upper-alpha"
        | "none"
        | "initial"
        | "inherit"
    export type MaskMode =
        | "alpha"
        | "luminance"
        | "match-source"
        | "initial"
        | "inherit"
    export type MaskOrigin =
        | "border-box"
        | "padding-box"
        | "content-box"
        | "margin-box"
        | "fill-box"
        | "stroke-box"
        | "view-box"
        | "initial"
        | "inherit"
    export type MaskPosition = CSSTuple | "initial" | "inherit"
    export type MaskRepeat =
        | "repeat"
        | "no-repeat"
        | "repeat-x"
        | "repeat-y"
        | "initial"
        | "inherit"
        | "round"
        | "space"
    export type MaskSize =
        | "auto"
        | "cover"
        | "contain"
        | "initial"
        | "inherit"
        | string
    export type PageBreak =
        | "auto"
        | "avoid"
        | "always"
        | "left"
        | "right"
        | "initial"
        | "inherit"
    export type PlaceContent =
        | "normal"
        | "stretch"
        | "center"
        | "start"
        | "end"
        | "space-between"
        | "space-around"
        | "space-evenly"
        | "safe"
        | "unsafe"
        | "initial"
        | "inherit"
    export type PlaceItems =
        | "normal legacy"
        | "baseline"
        | "center"
        | "end"
        | "start"
        | "stretch"
        | "initial"
        | "inherit"
    export type PlaceSelf =
        | "auto"
        | "normal"
        | "center"
        | "end"
        | "start"
        | "stretch"
        | "initial"
        | "inherit"
        | "right"
        | "left"
        | "safe"
        | "unsafe"
        | "initial"
        | "inherit"

    export type State = { [key: string]: any }
}
