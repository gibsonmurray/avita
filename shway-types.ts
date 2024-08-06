import Color from "./Color"

export default interface ShwayElement<T extends HTMLElement> {
    element: T
    /* -- STATE -- */
    bindState: (stateName: string, propertyToUpdate: string) => ShwayElement<T>
    updateState: (stateName: string, newValue: any) => ShwayElement<T>

    /* -- METADATA -- */
    id: (value: string) => ShwayElement<T>
    class: (value: string) => ShwayElement<T>
    style: (value: CSSStyleDeclaration) => ShwayElement<T>
    src: (value: URL) => ShwayElement<T>
    href: (value: URL) => ShwayElement<T>
    data: (key: string, value: string) => ShwayElement<T>
    alt: (value: string) => ShwayElement<T>
    title: (value: string) => ShwayElement<T>
    text: (value: string) => ShwayElement<T>
    html: (value: string) => ShwayElement<T>

    /* -- DOM CHANGES -- */
    append: (element: ShwayElement<T>) => ShwayElement<T>
    prepend: (element: ShwayElement<T>) => ShwayElement<T>
    remove: () => ShwayElement<T>
    children: (...elements: ShwayElement<T>[]) => ShwayElement<T>
    replace: (element: ShwayElement<T>) => ShwayElement<T>

    /* -- EVENTS -- */

    // Clipboard Events
    onCopy: (callback: (event: ClipboardEvent) => void) => ShwayElement<T>
    onCut: (callback: (event: ClipboardEvent) => void) => ShwayElement<T>
    onPaste: (callback: (event: ClipboardEvent) => void) => ShwayElement<T>

    // Composition Events
    onCompositionStart: (
        callback: (event: CompositionEvent) => void
    ) => ShwayElement<T>
    onCompositionUpdate: (
        callback: (event: CompositionEvent) => void
    ) => ShwayElement<T>
    onCompositionEnd: (
        callback: (event: CompositionEvent) => void
    ) => ShwayElement<T>

    // Form Events
    onChange: (callback: (event: Event) => void) => ShwayElement<T>
    onInput: (callback: (event: Event) => void) => ShwayElement<T>
    onSubmit: (callback: (event: Event) => void) => ShwayElement<T>
    onInvalid: (callback: (event: Event) => void) => ShwayElement<T>
    onReset: (callback: (event: Event) => void) => ShwayElement<T>

    // Keyboard Events
    onKeyDown: (callback: (event: KeyboardEvent) => void) => ShwayElement<T>
    onKeyPress: (callback: (event: KeyboardEvent) => void) => ShwayElement<T>
    onKeyUp: (callback: (event: KeyboardEvent) => void) => ShwayElement<T>

    // Focus Events
    onFocus: (callback: (event: FocusEvent) => void) => ShwayElement<T>
    onFocusIn: (callback: (event: FocusEvent) => void) => ShwayElement<T>
    onFocusOut: (callback: (event: FocusEvent) => void) => ShwayElement<T>
    onBlur: (callback: (event: FocusEvent) => void) => ShwayElement<T>

    // Mouse Events
    onClick: (callback: (event: MouseEvent) => void) => ShwayElement<T>
    onDoubleClick: (callback: (event: MouseEvent) => void) => ShwayElement<T>
    onMouseDown: (callback: (event: MouseEvent) => void) => ShwayElement<T>
    onMouseUp: (callback: (event: MouseEvent) => void) => ShwayElement<T>
    onMouseEnter: (callback: (event: MouseEvent) => void) => ShwayElement<T>
    onMouseLeave: (callback: (event: MouseEvent) => void) => ShwayElement<T>
    onMouseMove: (callback: (event: MouseEvent) => void) => ShwayElement<T>
    onMouseOut: (callback: (event: MouseEvent) => void) => ShwayElement<T>
    onMouseOver: (callback: (event: MouseEvent) => void) => ShwayElement<T>
    onContextMenu: (callback: (event: MouseEvent) => void) => ShwayElement<T>

    // Pointer Events
    onPointerOver: (callback: (event: PointerEvent) => void) => ShwayElement<T>
    onPointerEnter: (callback: (event: PointerEvent) => void) => ShwayElement<T>
    onPointerDown: (callback: (event: PointerEvent) => void) => ShwayElement<T>
    onPointerMove: (callback: (event: PointerEvent) => void) => ShwayElement<T>
    onPointerUp: (callback: (event: PointerEvent) => void) => ShwayElement<T>
    onPointerCancel: (
        callback: (event: PointerEvent) => void
    ) => ShwayElement<T>
    onPointerOut: (callback: (event: PointerEvent) => void) => ShwayElement<T>
    onPointerLeave: (callback: (event: PointerEvent) => void) => ShwayElement<T>
    onGotPointerCapture: (
        callback: (event: PointerEvent) => void
    ) => ShwayElement<T>
    onLostPointerCapture: (
        callback: (event: PointerEvent) => void
    ) => ShwayElement<T>

    // Touch Events
    onTouchStart: (callback: (event: TouchEvent) => void) => ShwayElement<T>
    onTouchMove: (callback: (event: TouchEvent) => void) => ShwayElement<T>
    onTouchEnd: (callback: (event: TouchEvent) => void) => ShwayElement<T>
    onTouchCancel: (callback: (event: TouchEvent) => void) => ShwayElement<T>

    // UI Events
    onScroll: (callback: (event: Event) => void) => ShwayElement<T>
    onResize: (callback: (event: UIEvent) => void) => ShwayElement<T>

    // Wheel Events
    onWheel: (callback: (event: WheelEvent) => void) => ShwayElement<T>

    // Drag Events
    onDrag: (callback: (event: DragEvent) => void) => ShwayElement<T>
    onDragEnd: (callback: (event: DragEvent) => void) => ShwayElement<T>
    onDragEnter: (callback: (event: DragEvent) => void) => ShwayElement<T>
    onDragLeave: (callback: (event: DragEvent) => void) => ShwayElement<T>
    onDragOver: (callback: (event: DragEvent) => void) => ShwayElement<T>
    onDragStart: (callback: (event: DragEvent) => void) => ShwayElement<T>
    onDrop: (callback: (event: DragEvent) => void) => ShwayElement<T>

    // Media Events
    onAbort: (callback: (event: Event) => void) => ShwayElement<T>
    onCanPlay: (callback: (event: Event) => void) => ShwayElement<T>
    onCanPlayThrough: (callback: (event: Event) => void) => ShwayElement<T>
    onDurationChange: (callback: (event: Event) => void) => ShwayElement<T>
    onEmptied: (callback: (event: Event) => void) => ShwayElement<T>
    onEncrypted: (callback: (event: Event) => void) => ShwayElement<T>
    onEnded: (callback: (event: Event) => void) => ShwayElement<T>
    onLoadedData: (callback: (event: Event) => void) => ShwayElement<T>
    onLoadedMetadata: (callback: (event: Event) => void) => ShwayElement<T>
    onLoadStart: (callback: (event: Event) => void) => ShwayElement<T>
    onPause: (callback: (event: Event) => void) => ShwayElement<T>
    onPlay: (callback: (event: Event) => void) => ShwayElement<T>
    onPlaying: (callback: (event: Event) => void) => ShwayElement<T>
    onProgress: (callback: (event: Event) => void) => ShwayElement<T>
    onRateChange: (callback: (event: Event) => void) => ShwayElement<T>
    onSeeked: (callback: (event: Event) => void) => ShwayElement<T>
    onSeeking: (callback: (event: Event) => void) => ShwayElement<T>
    onStalled: (callback: (event: Event) => void) => ShwayElement<T>
    onSuspend: (callback: (event: Event) => void) => ShwayElement<T>
    onTimeUpdate: (callback: (event: Event) => void) => ShwayElement<T>
    onVolumeChange: (callback: (event: Event) => void) => ShwayElement<T>
    onWaiting: (callback: (event: Event) => void) => ShwayElement<T>

    // Image Events
    onLoad: (callback: (event: Event) => void) => ShwayElement<T>
    onError: (callback: (event: Event) => void) => ShwayElement<T>

    // Animation Events
    onAnimationStart: (
        callback: (event: AnimationEvent) => void
    ) => ShwayElement<T>
    onAnimationEnd: (
        callback: (event: AnimationEvent) => void
    ) => ShwayElement<T>
    onAnimationIteration: (
        callback: (event: AnimationEvent) => void
    ) => ShwayElement<T>

    // Transition Events
    onTransitionEnd: (
        callback: (event: TransitionEvent) => void
    ) => ShwayElement<T>

    /* -- CSS PROPERTIES -- */
    accentColor: (value: Color | string) => ShwayElement<T>
    alignContent: (value: AlignContent) => ShwayElement<T>
    alignItems: (value: AlignItems) => ShwayElement<T>
    alignSelf: (value: AlignSelf) => ShwayElement<T>
    all: (value: All) => ShwayElement<T>
    animation: (value: string) => ShwayElement<T>
    animationDelay: (value: string | number) => ShwayElement<T>
    animationDirection: (value: AnimationDirection) => ShwayElement<T>
    animationDuration: (value: string | number) => ShwayElement<T>
    animationFillMode: (value: AnimationFillMode) => ShwayElement<T>
    animationIterationCount: (value: AnimationIterationCount) => ShwayElement<T>
    animationName: (value: string) => ShwayElement<T>
    animationPlayState: (value: AnimationPlayState) => ShwayElement<T>
    animationTimingFunction: (value: AnimationTimingFunction) => ShwayElement<T>
    appearance: (value: Appearance) => ShwayElement<T>
    aspectRatio: (value: string | number) => ShwayElement<T>
    backdropFilter: (value: BackdropFilter) => ShwayElement<T>
    backfaceVisibility: (value: BackfaceVisibility) => ShwayElement<T>
    background: (value: string) => ShwayElement<T>
    backgroundAttachment: (value: BackgroundAttachment) => ShwayElement<T>
    backgroundBlendMode: (value: BackgroundBlendMode) => ShwayElement<T>
    backgroundClip: (value: BackgroundClip) => ShwayElement<T>
    backgroundColor: (value: Color | string) => ShwayElement<T>
    backgroundImage: (value: URL | Color | string) => ShwayElement<T>
    backgroundOrigin: (value: BackgroundOrigin) => ShwayElement<T>
    backgroundPosition: (value: BackgroundPosition) => ShwayElement<T>
    backgroundPositionX: (value: PositionValue | string) => ShwayElement<T>
    backgroundPositionY: (value: PositionValue | string) => ShwayElement<T>
    backgroundRepeat: (value: BackgroundRepeat) => ShwayElement<T>
    backgroundSize: (value: BackgroundSize) => ShwayElement<T>
    blockSize: (value: string | number) => ShwayElement<T>
    border: (value: string) => ShwayElement<T>
    borderBlock: (value: string) => ShwayElement<T>
    borderBlockColor: (value: Color | string) => ShwayElement<T>
    borderBlockEnd: (value: string) => ShwayElement<T>
    borderBlockEndColor: (value: Color | string) => ShwayElement<T>
    borderBlockEndStyle: (value: BorderStyle) => ShwayElement<T>
    borderBlockEndWidth: (value: string | number) => ShwayElement<T>
    borderBlockStart: (value: string) => ShwayElement<T>
    borderBlockStartColor: (value: Color | string) => ShwayElement<T>
    borderBlockStartStyle: (value: BorderStyle) => ShwayElement<T>
    borderBlockStartWidth: (value: string | number) => ShwayElement<T>
    borderBlockStyle: (value: BorderStyle) => ShwayElement<T>
    borderBlockWidth: (value: string | number) => ShwayElement<T>
    borderBottom: (value: string) => ShwayElement<T>
    borderBottomColor: (value: Color | string) => ShwayElement<T>
    borderBottomLeftRadius: (value: string | number) => ShwayElement<T>
    borderBottomRightRadius: (value: string | number) => ShwayElement<T>
    borderBottomStyle: (value: BorderStyle) => ShwayElement<T>
    borderBottomWidth: (value: string | number) => ShwayElement<T>
    borderCollapse: (value: BorderCollapse) => ShwayElement<T>
    borderColor: (value: Color | string) => ShwayElement<T>
    borderImage: (value: string) => ShwayElement<T>
    borderImageOutset: (value: string | number) => ShwayElement<T>
    borderImageRepeat: (value: BorderImageRepeat) => ShwayElement<T>
    borderImageSlice: (value: string | number) => ShwayElement<T>
    borderImageSource: (value: string) => ShwayElement<T>
    borderImageWidth: (value: string | number) => ShwayElement<T>
    borderInline: (value: string) => ShwayElement<T>
    borderInlineColor: (value: Color | string) => ShwayElement<T>
    borderInlineEnd: (value: string) => ShwayElement<T>
    borderInlineEndColor: (value: Color | string) => ShwayElement<T>
    borderInlineEndStyle: (value: BorderStyle) => ShwayElement<T>
    borderInlineEndWidth: (value: string | number) => ShwayElement<T>
    borderInlineStart: (value: string) => ShwayElement<T>
    borderInlineStartColor: (value: Color | string) => ShwayElement<T>
    borderInlineStartStyle: (value: BorderStyle) => ShwayElement<T>
    borderInlineStartWidth: (value: string | number) => ShwayElement<T>
    borderInlineStyle: (value: BorderStyle) => ShwayElement<T>
    borderInlineWidth: (value: string | number) => ShwayElement<T>
    borderLeft: (value: string) => ShwayElement<T>
    borderLeftColor: (value: Color | string) => ShwayElement<T>
    borderLeftStyle: (value: BorderStyle) => ShwayElement<T>
    borderLeftWidth: (value: string | number) => ShwayElement<T>
    borderRadius: (value: string | number) => ShwayElement<T>
    borderRight: (value: string) => ShwayElement<T>
    borderRightColor: (value: Color | string) => ShwayElement<T>
    borderRightStyle: (value: BorderStyle) => ShwayElement<T>
    borderRightWidth: (value: string | number) => ShwayElement<T>
    borderSpacing: (value: string | number) => ShwayElement<T>
    borderStyle: (value: BorderStyle) => ShwayElement<T>
    borderTop: (value: string) => ShwayElement<T>
    borderTopColor: (value: Color | string) => ShwayElement<T>
    borderTopLeftRadius: (value: string | number) => ShwayElement<T>
    borderTopRightRadius: (value: string | number) => ShwayElement<T>
    borderTopStyle: (value: BorderStyle) => ShwayElement<T>
    borderTopWidth: (value: string | number) => ShwayElement<T>
    borderWidth: (value: string | number) => ShwayElement<T>
    bottom: (value: string | number) => ShwayElement<T>
    boxShadow: (value: string) => ShwayElement<T>
    boxSizing: (value: BoxSizing) => ShwayElement<T>
    breakAfter: (value: BreakAfter) => ShwayElement<T>
    breakBefore: (value: BreakBefore) => ShwayElement<T>
    breakInside: (value: BreakInside) => ShwayElement<T>
    captionSide: (value: CaptionSide) => ShwayElement<T>
    caretColor: (value: Color | string) => ShwayElement<T>
    clear: (value: Clear) => ShwayElement<T>
    clipPath: (value: string) => ShwayElement<T>
    color: (value: Color | string) => ShwayElement<T>
    columnCount: (value: number | ColumnCount) => ShwayElement<T>
    columnFill: (value: ColumnFill) => ShwayElement<T>
    columnGap: (value: string | number) => ShwayElement<T>
    columnRule: (value: string) => ShwayElement<T>
    columnRuleColor: (value: Color | string) => ShwayElement<T>
    columnRuleStyle: (value: BorderStyle) => ShwayElement<T>
    columnRuleWidth: (value: string | number) => ShwayElement<T>
    columnSpan: (value: ColumnSpan) => ShwayElement<T>
    columnWidth: (value: string | number) => ShwayElement<T>
    columns: (value: string) => ShwayElement<T>
    content: (value: string) => ShwayElement<T>
    counterIncrement: (value: string) => ShwayElement<T>
    counterReset: (value: string) => ShwayElement<T>
    cursor: (value: Cursor) => ShwayElement<T>
    direction: (value: Direction) => ShwayElement<T>
    display: (value: Display) => ShwayElement<T>
    emptyCells: (value: EmptyCells) => ShwayElement<T>
    filter: (value: string) => ShwayElement<T>
    flex: (value: string | Flex) => ShwayElement<T>
    flexBasis: (value: string | number) => ShwayElement<T>
    flexDirection: (value: FlexDirection) => ShwayElement<T>
    flexFlow: (value: string) => ShwayElement<T>
    flexGrow: (value: string | number) => ShwayElement<T>
    flexShrink: (value: string | number) => ShwayElement<T>
    flexWrap: (value: FlexWrap) => ShwayElement<T>
    float: (value: Float) => ShwayElement<T>
    font: (value: string) => ShwayElement<T>
    fontFamily: (value: string) => ShwayElement<T>
    fontFeatureSettings: (value: string) => ShwayElement<T>
    fontKerning: (value: FontKerning) => ShwayElement<T>
    fontSize: (value: string | number | FontSize) => ShwayElement<T>
    fontSizeAdjust: (value: number | "none") => ShwayElement<T>
    fontStretch: (value: string) => ShwayElement<T>
    fontStyle: (value: FontStyle) => ShwayElement<T>
    fontVariant: (value: string) => ShwayElement<T>
    fontVariantCaps: (value: FontVariantCaps) => ShwayElement<T>
    fontVariantEastAsian: (value: string) => ShwayElement<T>
    fontVariantLigatures: (value: string) => ShwayElement<T>
    fontVariantNumeric: (value: string) => ShwayElement<T>
    fontVariantPosition: (value: FontVariantPosition) => ShwayElement<T>
    fontWeight: (value: string | number) => ShwayElement<T>
    gap: (value: string | number) => ShwayElement<T>
    grid: (value: string) => ShwayElement<T>
    gridArea: (value: string) => ShwayElement<T>
    gridAutoColumns: (value: string) => ShwayElement<T>
    gridAutoFlow: (value: GridAutoFlow) => ShwayElement<T>
    gridAutoRows: (value: string) => ShwayElement<T>
    gridColumn: (value: string) => ShwayElement<T>
    gridColumnEnd: (value: string) => ShwayElement<T>
    gridColumnStart: (value: string) => ShwayElement<T>
    gridRow: (value: string) => ShwayElement<T>
    gridRowEnd: (value: string) => ShwayElement<T>
    gridRowStart: (value: string) => ShwayElement<T>
    gridTemplate: (value: string) => ShwayElement<T>
    gridTemplateAreas: (value: string) => ShwayElement<T>
    gridTemplateColumns: (value: string) => ShwayElement<T>
    gridTemplateRows: (value: string) => ShwayElement<T>
    height: (value: string | number) => ShwayElement<T>
    hyphens: (value: Hyphens) => ShwayElement<T>
    imageRendering: (value: ImageRendering) => ShwayElement<T>
    inlineSize: (value: string | number) => ShwayElement<T>
    inset: (value: string | number) => ShwayElement<T>
    insetBlock: (value: string | number) => ShwayElement<T>
    insetBlockEnd: (value: string | number) => ShwayElement<T>
    insetBlockStart: (value: string | number) => ShwayElement<T>
    insetInline: (value: string | number) => ShwayElement<T>
    insetInlineEnd: (value: string | number) => ShwayElement<T>
    insetInlineStart: (value: string | number) => ShwayElement<T>
    isolation: (value: Isolation) => ShwayElement<T>
    justifyContent: (value: JustifyContent) => ShwayElement<T>
    justifyItems: (value: JustifyItems) => ShwayElement<T>
    justifySelf: (value: JustifySelf) => ShwayElement<T>
    left: (value: string | number) => ShwayElement<T>
    letterSpacing: (value: string | number) => ShwayElement<T>
    lineBreak: (value: LineBreak) => ShwayElement<T>
    lineHeight: (value: string | number) => ShwayElement<T>
    listStyle: (value: string) => ShwayElement<T>
    listStyleImage: (value: string) => ShwayElement<T>
    listStylePosition: (value: ListStylePosition) => ShwayElement<T>
    listStyleType: (value: ListStyleType) => ShwayElement<T>
    margin: (value: string | number) => ShwayElement<T>
    marginBlock: (value: string | number) => ShwayElement<T>
    marginBlockEnd: (value: string | number) => ShwayElement<T>
    marginBlockStart: (value: string | number) => ShwayElement<T>
    marginBottom: (value: string | number) => ShwayElement<T>
    marginInline: (value: string | number) => ShwayElement<T>
    marginInlineEnd: (value: string | number) => ShwayElement<T>
    marginInlineStart: (value: string | number) => ShwayElement<T>
    marginLeft: (value: string | number) => ShwayElement<T>
    marginRight: (value: string | number) => ShwayElement<T>
    marginTop: (value: string | number) => ShwayElement<T>
    mask: (value: string) => ShwayElement<T>
    maskImage: (value: string) => ShwayElement<T>
    maskMode: (value: MaskMode) => ShwayElement<T>
    maskOrigin: (value: MaskOrigin) => ShwayElement<T>
    maskPosition: (value: MaskPosition) => ShwayElement<T>
    maskRepeat: (value: MaskRepeat) => ShwayElement<T>
    maskSize: (value: MaskSize) => ShwayElement<T>
    maxBlockSize: (value: string | number) => ShwayElement<T>
    maxHeight: (value: string | number) => ShwayElement<T>
    maxInlineSize: (value: string | number) => ShwayElement<T>
    maxWidth: (value: string | number) => ShwayElement<T>
    minBlockSize: (value: string | number) => ShwayElement<T>
    minHeight: (value: string | number) => ShwayElement<T>
    minInlineSize: (value: string | number) => ShwayElement<T>
    minWidth: (value: string | number) => ShwayElement<T>
    mixBlendMode: (value: MixBlendMode) => ShwayElement<T>
    objectFit: (value: ObjectFit) => ShwayElement<T>
    objectPosition: (value: string) => ShwayElement<T>
    offset: (value: string) => ShwayElement<T>
    offsetAnchor: (value: string) => ShwayElement<T>
    offsetDistance: (value: string | number) => ShwayElement<T>
    offsetPath: (value: string) => ShwayElement<T>
    offsetRotate: (value: string) => ShwayElement<T>
    opacity: (value: number | string) => ShwayElement<T>
    order: (value: number | string) => ShwayElement<T>
    orphans: (value: number) => ShwayElement<T>
    outline: (value: string) => ShwayElement<T>
    outlineColor: (value: Color | string) => ShwayElement<T>
    outlineOffset: (value: string | number) => ShwayElement<T>
    outlineStyle: (value: OutlineStyle) => ShwayElement<T>
    outlineWidth: (value: string | number) => ShwayElement<T>
    overflow: (value: Overflow) => ShwayElement<T>
    overflowAnchor: (value: OverflowAnchor) => ShwayElement<T>
    overflowWrap: (value: OverflowWrap) => ShwayElement<T>
    overflowX: (value: OverflowX) => ShwayElement<T>
    overflowY: (value: OverflowY) => ShwayElement<T>
    overscrollBehavior: (value: OverscrollBehavior) => ShwayElement<T>
    overscrollBehaviorBlock: (value: OverscrollBehavior) => ShwayElement<T>
    overscrollBehaviorInline: (value: OverscrollBehavior) => ShwayElement<T>
    overscrollBehaviorX: (value: OverscrollBehavior) => ShwayElement<T>
    overscrollBehaviorY: (value: OverscrollBehavior) => ShwayElement<T>
    padding: (value: string | number) => ShwayElement<T>
    paddingBlock: (value: string | number) => ShwayElement<T>
    paddingBlockEnd: (value: string | number) => ShwayElement<T>
    paddingBlockStart: (value: string | number) => ShwayElement<T>
    paddingBottom: (value: string | number) => ShwayElement<T>
    paddingInline: (value: string | number) => ShwayElement<T>
    paddingInlineEnd: (value: string | number) => ShwayElement<T>
    paddingInlineStart: (value: string | number) => ShwayElement<T>
    paddingLeft: (value: string | number) => ShwayElement<T>
    paddingRight: (value: string | number) => ShwayElement<T>
    paddingTop: (value: string | number) => ShwayElement<T>
    pageBreakAfter: (value: PageBreak) => ShwayElement<T>
    pageBreakBefore: (value: PageBreak) => ShwayElement<T>
    pageBreakInside: (value: PageBreak) => ShwayElement<T>
    paintOrder: (value: string) => ShwayElement<T>
    perspective: (value: string | number) => ShwayElement<T>
    perspectiveOrigin: (value: string) => ShwayElement<T>
    placeContent: (value: PlaceContent) => ShwayElement<T>
    placeItems: (value: PlaceItems) => ShwayElement<T>
    placeSelf: (value: PlaceSelf) => ShwayElement<T>
    pointerEvents: (value: PointerEvents) => ShwayElement<T>
    position: (value: Position) => ShwayElement<T>
    quotes: (value: string) => ShwayElement<T>
    resize: (value: Resize) => ShwayElement<T>
    right: (value: string | number) => ShwayElement<T>
    rotate: (value: string) => ShwayElement<T>
    scale: (value: string | number) => ShwayElement<T>
    scrollBehavior: (value: ScrollBehavior) => ShwayElement<T>
    scrollMargin: (value: string | number) => ShwayElement<T>
    scrollMarginBlock: (value: string | number) => ShwayElement<T>
    scrollMarginBlockEnd: (value: string | number) => ShwayElement<T>
    scrollMarginBlockStart: (value: string | number) => ShwayElement<T>
    scrollMarginBottom: (value: string | number) => ShwayElement<T>
    scrollMarginInline: (value: string | number) => ShwayElement<T>
    scrollMarginInlineEnd: (value: string | number) => ShwayElement<T>
    scrollMarginInlineStart: (value: string | number) => ShwayElement<T>
    scrollMarginLeft: (value: string | number) => ShwayElement<T>
    scrollMarginRight: (value: string | number) => ShwayElement<T>
    scrollMarginTop: (value: string | number) => ShwayElement<T>
    scrollPadding: (value: string | number) => ShwayElement<T>
    scrollPaddingBlock: (value: string | number) => ShwayElement<T>
    scrollPaddingBlockEnd: (value: string | number) => ShwayElement<T>
    scrollPaddingBlockStart: (value: string | number) => ShwayElement<T>
    scrollPaddingBottom: (value: string | number) => ShwayElement<T>
    scrollPaddingInline: (value: string | number) => ShwayElement<T>
    scrollPaddingInlineEnd: (value: string | number) => ShwayElement<T>
    scrollPaddingInlineStart: (value: string | number) => ShwayElement<T>
    scrollPaddingLeft: (value: string | number) => ShwayElement<T>
    scrollPaddingRight: (value: string | number) => ShwayElement<T>
    scrollPaddingTop: (value: string | number) => ShwayElement<T>
    scrollSnapAlign: (value: string) => ShwayElement<T>
    scrollSnapStop: (value: ScrollSnapStop) => ShwayElement<T>
    scrollSnapType: (value: string) => ShwayElement<T>
    shapeImageThreshold: (value: number) => ShwayElement<T>
    shapeMargin: (value: string | number) => ShwayElement<T>
    shapeOutside: (value: string) => ShwayElement<T>
    tabSize: (value: number | string) => ShwayElement<T>
    tableLayout: (value: TableLayout) => ShwayElement<T>
    textAlign: (value: TextAlign) => ShwayElement<T>
    textAlignLast: (value: TextAlignLast) => ShwayElement<T>
    textCombineUpright: (value: TextCombineUpright) => ShwayElement<T>
    textDecoration: (value: TextDecoration) => ShwayElement<T>
    textDecorationColor: (value: Color | string) => ShwayElement<T>
    textDecorationLine: (value: string) => ShwayElement<T>
    textDecorationStyle: (value: string) => ShwayElement<T>
    textDecorationThickness: (value: string | number) => ShwayElement<T>
    textEmphasis: (value: string) => ShwayElement<T>
    textEmphasisColor: (value: Color | string) => ShwayElement<T>
    textEmphasisPosition: (value: string) => ShwayElement<T>
    textEmphasisStyle: (value: string) => ShwayElement<T>
    textIndent: (value: string | number) => ShwayElement<T>
    textOrientation: (value: TextOrientation) => ShwayElement<T>
    textOverflow: (value: TextOverflow) => ShwayElement<T>
    textRendering: (value: TextRendering) => ShwayElement<T>
    textShadow: (value: string) => ShwayElement<T>
    textTransform: (value: TextTransform) => ShwayElement<T>
    textUnderlineOffset: (value: string | number) => ShwayElement<T>
    textUnderlinePosition: (value: TextUnderlinePosition) => ShwayElement<T>
    top: (value: string | number) => ShwayElement<T>
    touchAction: (value: TouchAction) => ShwayElement<T>
    transform: (value: string) => ShwayElement<T>
    transformBox: (value: TransformBox) => ShwayElement<T>
    transformOrigin: (value: string) => ShwayElement<T>
    transformStyle: (value: TransformStyle) => ShwayElement<T>
    transition: (value: string) => ShwayElement<T>
    transitionDelay: (value: string | number) => ShwayElement<T>
    transitionDuration: (value: string | number) => ShwayElement<T>
    transitionProperty: (value: string) => ShwayElement<T>
    transitionTimingFunction: (value: string) => ShwayElement<T>
    translate: (value: string) => ShwayElement<T>
    unicodeBidi: (value: UnicodeBidi) => ShwayElement<T>
    userSelect: (value: UserSelect) => ShwayElement<T>
    verticalAlign: (value: VerticalAlign) => ShwayElement<T>
    visibility: (value: Visibility) => ShwayElement<T>
    whiteSpace: (value: WhiteSpace) => ShwayElement<T>
    widows: (value: string | number) => ShwayElement<T>
    width: (value: string | number) => ShwayElement<T>
    willChange: (value: string) => ShwayElement<T>
    wordBreak: (value: WordBreak) => ShwayElement<T>
    wordSpacing: (value: string | number) => ShwayElement<T>
    wordWrap: (value: WordWrap) => ShwayElement<T>
    writingMode: (value: WritingMode) => ShwayElement<T>
    zIndex: (value: number | "auto") => ShwayElement<T>
}

export type Color = keyof typeof Color
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
export type AnimationPlayState = "running" | "paused" | "initial" | "inherit"
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
export type BackfaceVisibility = "visible" | "hidden" | "initial" | "inherit"
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
export type Clear = "none" | "left" | "right" | "both" | "initial" | "inherit"
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
export type FontStyle = "normal" | "italic" | "oblique" | "initial" | "inherit"
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
export type Position = "static" | "relative" | "absolute" | "fixed" | "sticky"
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
export type TouchAction = "auto" | "none" | "pan-x" | "pan-y" | "manipulation"
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
