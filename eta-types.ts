import Color from "./Color"

export default interface EtaElement<T extends HTMLElement> {
    element: T

    /* -- METADATA -- */
    id: (value: string) => EtaElement<T>
    class: (value: string) => EtaElement<T>
    style: (value: CSSStyleDeclaration) => EtaElement<T>
    src: (value: URL) => EtaElement<T>
    href: (value: URL) => EtaElement<T>
    data: (key: string, value: string) => EtaElement<T>
    alt: (value: string) => EtaElement<T>
    title: (value: string) => EtaElement<T>
    text: (value: string) => EtaElement<T>
    html: (value: string) => EtaElement<T>

    /* -- DOM CHANGES -- */
    append: (element: EtaElement<T>) => EtaElement<T>
    prepend: (element: EtaElement<T>) => EtaElement<T>
    remove: () => EtaElement<T>
    parent: () => HTMLElement | null
    children: (elements: EtaElement<T>[]) => EtaElement<T>
    replace: (element: EtaElement<T>) => EtaElement<T>

    /* -- EVENTS -- */

    // Clipboard Events
    onCopy: (callback: (event: ClipboardEvent) => void) => EtaElement<T>
    onCut: (callback: (event: ClipboardEvent) => void) => EtaElement<T>
    onPaste: (callback: (event: ClipboardEvent) => void) => EtaElement<T>

    // Composition Events
    onCompositionStart: (
        callback: (event: CompositionEvent) => void
    ) => EtaElement<T>
    onCompositionUpdate: (
        callback: (event: CompositionEvent) => void
    ) => EtaElement<T>
    onCompositionEnd: (
        callback: (event: CompositionEvent) => void
    ) => EtaElement<T>

    // Form Events
    onChange: (callback: (event: Event) => void) => EtaElement<T>
    onInput: (callback: (event: Event) => void) => EtaElement<T>
    onSubmit: (callback: (event: Event) => void) => EtaElement<T>
    onInvalid: (callback: (event: Event) => void) => EtaElement<T>
    onReset: (callback: (event: Event) => void) => EtaElement<T>

    // Keyboard Events
    onKeyDown: (callback: (event: KeyboardEvent) => void) => EtaElement<T>
    onKeyPress: (callback: (event: KeyboardEvent) => void) => EtaElement<T>
    onKeyUp: (callback: (event: KeyboardEvent) => void) => EtaElement<T>

    // Focus Events
    onFocus: (callback: (event: FocusEvent) => void) => EtaElement<T>
    onFocusIn: (callback: (event: FocusEvent) => void) => EtaElement<T>
    onFocusOut: (callback: (event: FocusEvent) => void) => EtaElement<T>
    onBlur: (callback: (event: FocusEvent) => void) => EtaElement<T>

    // Mouse Events
    onClick: (callback: (event: MouseEvent) => void) => EtaElement<T>
    onDoubleClick: (callback: (event: MouseEvent) => void) => EtaElement<T>
    onMouseDown: (callback: (event: MouseEvent) => void) => EtaElement<T>
    onMouseUp: (callback: (event: MouseEvent) => void) => EtaElement<T>
    onMouseEnter: (callback: (event: MouseEvent) => void) => EtaElement<T>
    onMouseLeave: (callback: (event: MouseEvent) => void) => EtaElement<T>
    onMouseMove: (callback: (event: MouseEvent) => void) => EtaElement<T>
    onMouseOut: (callback: (event: MouseEvent) => void) => EtaElement<T>
    onMouseOver: (callback: (event: MouseEvent) => void) => EtaElement<T>
    onContextMenu: (callback: (event: MouseEvent) => void) => EtaElement<T>

    // Pointer Events
    onPointerOver: (callback: (event: PointerEvent) => void) => EtaElement<T>
    onPointerEnter: (callback: (event: PointerEvent) => void) => EtaElement<T>
    onPointerDown: (callback: (event: PointerEvent) => void) => EtaElement<T>
    onPointerMove: (callback: (event: PointerEvent) => void) => EtaElement<T>
    onPointerUp: (callback: (event: PointerEvent) => void) => EtaElement<T>
    onPointerCancel: (callback: (event: PointerEvent) => void) => EtaElement<T>
    onPointerOut: (callback: (event: PointerEvent) => void) => EtaElement<T>
    onPointerLeave: (callback: (event: PointerEvent) => void) => EtaElement<T>
    onGotPointerCapture: (callback: (event: PointerEvent) => void) => EtaElement<T>
    onLostPointerCapture: (
        callback: (event: PointerEvent) => void
    ) => EtaElement<T>

    // Touch Events
    onTouchStart: (callback: (event: TouchEvent) => void) => EtaElement<T>
    onTouchMove: (callback: (event: TouchEvent) => void) => EtaElement<T>
    onTouchEnd: (callback: (event: TouchEvent) => void) => EtaElement<T>
    onTouchCancel: (callback: (event: TouchEvent) => void) => EtaElement<T>

    // UI Events
    onScroll: (callback: (event: Event) => void) => EtaElement<T>
    onResize: (callback: (event: UIEvent) => void) => EtaElement<T>

    // Wheel Events
    onWheel: (callback: (event: WheelEvent) => void) => EtaElement<T>

    // Drag Events
    onDrag: (callback: (event: DragEvent) => void) => EtaElement<T>
    onDragEnd: (callback: (event: DragEvent) => void) => EtaElement<T>
    onDragEnter: (callback: (event: DragEvent) => void) => EtaElement<T>
    onDragLeave: (callback: (event: DragEvent) => void) => EtaElement<T>
    onDragOver: (callback: (event: DragEvent) => void) => EtaElement<T>
    onDragStart: (callback: (event: DragEvent) => void) => EtaElement<T>
    onDrop: (callback: (event: DragEvent) => void) => EtaElement<T>

    // Media Events
    onAbort: (callback: (event: Event) => void) => EtaElement<T>
    onCanPlay: (callback: (event: Event) => void) => EtaElement<T>
    onCanPlayThrough: (callback: (event: Event) => void) => EtaElement<T>
    onDurationChange: (callback: (event: Event) => void) => EtaElement<T>
    onEmptied: (callback: (event: Event) => void) => EtaElement<T>
    onEncrypted: (callback: (event: Event) => void) => EtaElement<T>
    onEnded: (callback: (event: Event) => void) => EtaElement<T>
    onLoadedData: (callback: (event: Event) => void) => EtaElement<T>
    onLoadedMetadata: (callback: (event: Event) => void) => EtaElement<T>
    onLoadStart: (callback: (event: Event) => void) => EtaElement<T>
    onPause: (callback: (event: Event) => void) => EtaElement<T>
    onPlay: (callback: (event: Event) => void) => EtaElement<T>
    onPlaying: (callback: (event: Event) => void) => EtaElement<T>
    onProgress: (callback: (event: Event) => void) => EtaElement<T>
    onRateChange: (callback: (event: Event) => void) => EtaElement<T>
    onSeeked: (callback: (event: Event) => void) => EtaElement<T>
    onSeeking: (callback: (event: Event) => void) => EtaElement<T>
    onStalled: (callback: (event: Event) => void) => EtaElement<T>
    onSuspend: (callback: (event: Event) => void) => EtaElement<T>
    onTimeUpdate: (callback: (event: Event) => void) => EtaElement<T>
    onVolumeChange: (callback: (event: Event) => void) => EtaElement<T>
    onWaiting: (callback: (event: Event) => void) => EtaElement<T>

    // Image Events
    onLoad: (callback: (event: Event) => void) => EtaElement<T>
    onError: (callback: (event: Event) => void) => EtaElement<T>

    // Animation Events
    onAnimationStart: (callback: (event: AnimationEvent) => void) => EtaElement<T>
    onAnimationEnd: (callback: (event: AnimationEvent) => void) => EtaElement<T>
    onAnimationIteration: (
        callback: (event: AnimationEvent) => void
    ) => EtaElement<T>

    // Transition Events
    onTransitionEnd: (callback: (event: TransitionEvent) => void) => EtaElement<T>

    /* -- CSS PROPERTIES -- */
    accentColor: (value: Color | string) => EtaElement<T>
    alignContent: (value: AlignContent) => EtaElement<T>
    alignItems: (value: AlignItems) => EtaElement<T>
    alignSelf: (value: AlignSelf) => EtaElement<T>
    all: (value: All) => EtaElement<T>
    animation: (value: string) => EtaElement<T>
    animationDelay: (value: string | number) => EtaElement<T>
    animationDirection: (value: AnimationDirection) => EtaElement<T>
    animationDuration: (value: string | number) => EtaElement<T>
    animationFillMode: (value: AnimationFillMode) => EtaElement<T>
    animationIterationCount: (value: AnimationIterationCount) => EtaElement<T>
    animationName: (value: string) => EtaElement<T>
    animationPlayState: (value: AnimationPlayState) => EtaElement<T>
    animationTimingFunction: (value: AnimationTimingFunction) => EtaElement<T>
    appearance: (value: Appearance) => EtaElement<T>
    aspectRatio: (value: string | number) => EtaElement<T>
    backdropFilter: (value: BackdropFilter) => EtaElement<T>
    backfaceVisibility: (value: BackfaceVisibility) => EtaElement<T>
    background: (value: string) => EtaElement<T>
    backgroundAttachment: (value: BackgroundAttachment) => EtaElement<T>
    backgroundBlendMode: (value: BackgroundBlendMode) => EtaElement<T>
    backgroundClip: (value: BackgroundClip) => EtaElement<T>
    backgroundColor: (value: Color | string) => EtaElement<T>
    backgroundImage: (value: URL | Color | string) => EtaElement<T>
    backgroundOrigin: (value: BackgroundOrigin) => EtaElement<T>
    backgroundPosition: (value: BackgroundPosition) => EtaElement<T>
    backgroundPositionX: (value: PositionValue | string) => EtaElement<T>
    backgroundPositionY: (value: PositionValue | string) => EtaElement<T>
    backgroundRepeat: (value: BackgroundRepeat) => EtaElement<T>
    backgroundSize: (value: BackgroundSize) => EtaElement<T>
    blockSize: (value: string | number) => EtaElement<T>
    border: (value: string) => EtaElement<T>
    borderBlock: (value: string) => EtaElement<T>
    borderBlockColor: (value: Color | string) => EtaElement<T>
    borderBlockEnd: (value: string) => EtaElement<T>
    borderBlockEndColor: (value: Color | string) => EtaElement<T>
    borderBlockEndStyle: (value: BorderStyle) => EtaElement<T>
    borderBlockEndWidth: (value: string | number) => EtaElement<T>
    borderBlockStart: (value: string) => EtaElement<T>
    borderBlockStartColor: (value: Color | string) => EtaElement<T>
    borderBlockStartStyle: (value: BorderStyle) => EtaElement<T>
    borderBlockStartWidth: (value: string | number) => EtaElement<T>
    borderBlockStyle: (value: BorderStyle) => EtaElement<T>
    borderBlockWidth: (value: string | number) => EtaElement<T>
    borderBottom: (value: string) => EtaElement<T>
    borderBottomColor: (value: Color | string) => EtaElement<T>
    borderBottomLeftRadius: (value: string | number) => EtaElement<T>
    borderBottomRightRadius: (value: string | number) => EtaElement<T>
    borderBottomStyle: (value: BorderStyle) => EtaElement<T>
    borderBottomWidth: (value: string | number) => EtaElement<T>
    borderCollapse: (value: BorderCollapse) => EtaElement<T>
    borderColor: (value: Color | string) => EtaElement<T>
    borderImage: (value: string) => EtaElement<T>
    borderImageOutset: (value: string | number) => EtaElement<T>
    borderImageRepeat: (value: BorderImageRepeat) => EtaElement<T>
    borderImageSlice: (value: string | number) => EtaElement<T>
    borderImageSource: (value: string) => EtaElement<T>
    borderImageWidth: (value: string | number) => EtaElement<T>
    borderInline: (value: string) => EtaElement<T>
    borderInlineColor: (value: Color | string) => EtaElement<T>
    borderInlineEnd: (value: string) => EtaElement<T>
    borderInlineEndColor: (value: Color | string) => EtaElement<T>
    borderInlineEndStyle: (value: BorderStyle) => EtaElement<T>
    borderInlineEndWidth: (value: string | number) => EtaElement<T>
    borderInlineStart: (value: string) => EtaElement<T>
    borderInlineStartColor: (value: Color | string) => EtaElement<T>
    borderInlineStartStyle: (value: BorderStyle) => EtaElement<T>
    borderInlineStartWidth: (value: string | number) => EtaElement<T>
    borderInlineStyle: (value: BorderStyle) => EtaElement<T>
    borderInlineWidth: (value: string | number) => EtaElement<T>
    borderLeft: (value: string) => EtaElement<T>
    borderLeftColor: (value: Color | string) => EtaElement<T>
    borderLeftStyle: (value: BorderStyle) => EtaElement<T>
    borderLeftWidth: (value: string | number) => EtaElement<T>
    borderRadius: (value: string | number) => EtaElement<T>
    borderRight: (value: string) => EtaElement<T>
    borderRightColor: (value: Color | string) => EtaElement<T>
    borderRightStyle: (value: BorderStyle) => EtaElement<T>
    borderRightWidth: (value: string | number) => EtaElement<T>
    borderSpacing: (value: string | number) => EtaElement<T>
    borderStyle: (value: BorderStyle) => EtaElement<T>
    borderTop: (value: string) => EtaElement<T>
    borderTopColor: (value: Color | string) => EtaElement<T>
    borderTopLeftRadius: (value: string | number) => EtaElement<T>
    borderTopRightRadius: (value: string | number) => EtaElement<T>
    borderTopStyle: (value: BorderStyle) => EtaElement<T>
    borderTopWidth: (value: string | number) => EtaElement<T>
    borderWidth: (value: string | number) => EtaElement<T>
    bottom: (value: string | number) => EtaElement<T>
    boxShadow: (value: string) => EtaElement<T>
    boxSizing: (value: BoxSizing) => EtaElement<T>
    breakAfter: (value: BreakAfter) => EtaElement<T>
    breakBefore: (value: BreakBefore) => EtaElement<T>
    breakInside: (value: BreakInside) => EtaElement<T>
    captionSide: (value: CaptionSide) => EtaElement<T>
    caretColor: (value: Color | string) => EtaElement<T>
    clear: (value: Clear) => EtaElement<T>
    clipPath: (value: string) => EtaElement<T>
    color: (value: Color | string) => EtaElement<T>
    columnCount: (value: number | ColumnCount) => EtaElement<T>
    columnFill: (value: ColumnFill) => EtaElement<T>
    columnGap: (value: string | number) => EtaElement<T>
    columnRule: (value: string) => EtaElement<T>
    columnRuleColor: (value: Color | string) => EtaElement<T>
    columnRuleStyle: (value: BorderStyle) => EtaElement<T>
    columnRuleWidth: (value: string | number) => EtaElement<T>
    columnSpan: (value: ColumnSpan) => EtaElement<T>
    columnWidth: (value: string | number) => EtaElement<T>
    columns: (value: string) => EtaElement<T>
    content: (value: string) => EtaElement<T>
    counterIncrement: (value: string) => EtaElement<T>
    counterReset: (value: string) => EtaElement<T>
    cursor: (value: Cursor) => EtaElement<T>
    direction: (value: Direction) => EtaElement<T>
    display: (value: Display) => EtaElement<T>
    emptyCells: (value: EmptyCells) => EtaElement<T>
    filter: (value: string) => EtaElement<T>
    flex: (value: string | Flex) => EtaElement<T>
    flexBasis: (value: string | number) => EtaElement<T>
    flexDirection: (value: FlexDirection) => EtaElement<T>
    flexFlow: (value: string) => EtaElement<T>
    flexGrow: (value: string | number) => EtaElement<T>
    flexShrink: (value: string | number) => EtaElement<T>
    flexWrap: (value: FlexWrap) => EtaElement<T>
    float: (value: Float) => EtaElement<T>
    font: (value: string) => EtaElement<T>
    fontFamily: (value: string) => EtaElement<T>
    fontFeatureSettings: (value: string) => EtaElement<T>
    fontKerning: (value: FontKerning) => EtaElement<T>
    fontSize: (value: string | number | FontSize) => EtaElement<T>
    fontSizeAdjust: (value: number | "none") => EtaElement<T>
    fontStretch: (value: string) => EtaElement<T>
    fontStyle: (value: FontStyle) => EtaElement<T>
    fontVariant: (value: string) => EtaElement<T>
    fontVariantCaps: (value: FontVariantCaps) => EtaElement<T>
    fontVariantEastAsian: (value: string) => EtaElement<T>
    fontVariantLigatures: (value: string) => EtaElement<T>
    fontVariantNumeric: (value: string) => EtaElement<T>
    fontVariantPosition: (value: FontVariantPosition) => EtaElement<T>
    fontWeight: (value: string | number) => EtaElement<T>
    gap: (value: string | number) => EtaElement<T>
    grid: (value: string) => EtaElement<T>
    gridArea: (value: string) => EtaElement<T>
    gridAutoColumns: (value: string) => EtaElement<T>
    gridAutoFlow: (value: GridAutoFlow) => EtaElement<T>
    gridAutoRows: (value: string) => EtaElement<T>
    gridColumn: (value: string) => EtaElement<T>
    gridColumnEnd: (value: string) => EtaElement<T>
    gridColumnStart: (value: string) => EtaElement<T>
    gridRow: (value: string) => EtaElement<T>
    gridRowEnd: (value: string) => EtaElement<T>
    gridRowStart: (value: string) => EtaElement<T>
    gridTemplate: (value: string) => EtaElement<T>
    gridTemplateAreas: (value: string) => EtaElement<T>
    gridTemplateColumns: (value: string) => EtaElement<T>
    gridTemplateRows: (value: string) => EtaElement<T>
    height: (value: string | number) => EtaElement<T>
    hyphens: (value: Hyphens) => EtaElement<T>
    imageRendering: (value: ImageRendering) => EtaElement<T>
    inlineSize: (value: string | number) => EtaElement<T>
    inset: (value: string | number) => EtaElement<T>
    insetBlock: (value: string | number) => EtaElement<T>
    insetBlockEnd: (value: string | number) => EtaElement<T>
    insetBlockStart: (value: string | number) => EtaElement<T>
    insetInline: (value: string | number) => EtaElement<T>
    insetInlineEnd: (value: string | number) => EtaElement<T>
    insetInlineStart: (value: string | number) => EtaElement<T>
    isolation: (value: Isolation) => EtaElement<T>
    justifyContent: (value: JustifyContent) => EtaElement<T>
    justifyItems: (value: JustifyItems) => EtaElement<T>
    justifySelf: (value: JustifySelf) => EtaElement<T>
    left: (value: string | number) => EtaElement<T>
    letterSpacing: (value: string | number) => EtaElement<T>
    lineBreak: (value: LineBreak) => EtaElement<T>
    lineHeight: (value: string | number) => EtaElement<T>
    listStyle: (value: string) => EtaElement<T>
    listStyleImage: (value: string) => EtaElement<T>
    listStylePosition: (value: ListStylePosition) => EtaElement<T>
    listStyleType: (value: ListStyleType) => EtaElement<T>
    margin: (value: string | number) => EtaElement<T>
    marginBlock: (value: string | number) => EtaElement<T>
    marginBlockEnd: (value: string | number) => EtaElement<T>
    marginBlockStart: (value: string | number) => EtaElement<T>
    marginBottom: (value: string | number) => EtaElement<T>
    marginInline: (value: string | number) => EtaElement<T>
    marginInlineEnd: (value: string | number) => EtaElement<T>
    marginInlineStart: (value: string | number) => EtaElement<T>
    marginLeft: (value: string | number) => EtaElement<T>
    marginRight: (value: string | number) => EtaElement<T>
    marginTop: (value: string | number) => EtaElement<T>
    mask: (value: string) => EtaElement<T>
    maskImage: (value: string) => EtaElement<T>
    maskMode: (value: MaskMode) => EtaElement<T>
    maskOrigin: (value: MaskOrigin) => EtaElement<T>
    maskPosition: (value: MaskPosition) => EtaElement<T>
    maskRepeat: (value: MaskRepeat) => EtaElement<T>
    maskSize: (value: MaskSize) => EtaElement<T>
    maxBlockSize: (value: string | number) => EtaElement<T>
    maxHeight: (value: string | number) => EtaElement<T>
    maxInlineSize: (value: string | number) => EtaElement<T>
    maxWidth: (value: string | number) => EtaElement<T>
    minBlockSize: (value: string | number) => EtaElement<T>
    minHeight: (value: string | number) => EtaElement<T>
    minInlineSize: (value: string | number) => EtaElement<T>
    minWidth: (value: string | number) => EtaElement<T>
    mixBlendMode: (value: MixBlendMode) => EtaElement<T>
    objectFit: (value: ObjectFit) => EtaElement<T>
    objectPosition: (value: string) => EtaElement<T>
    offset: (value: string) => EtaElement<T>
    offsetAnchor: (value: string) => EtaElement<T>
    offsetDistance: (value: string | number) => EtaElement<T>
    offsetPath: (value: string) => EtaElement<T>
    offsetRotate: (value: string) => EtaElement<T>
    opacity: (value: number | string) => EtaElement<T>
    order: (value: number | string) => EtaElement<T>
    orphans: (value: number) => EtaElement<T>
    outline: (value: string) => EtaElement<T>
    outlineColor: (value: Color | string) => EtaElement<T>
    outlineOffset: (value: string | number) => EtaElement<T>
    outlineStyle: (value: OutlineStyle) => EtaElement<T>
    outlineWidth: (value: string | number) => EtaElement<T>
    overflow: (value: Overflow) => EtaElement<T>
    overflowAnchor: (value: OverflowAnchor) => EtaElement<T>
    overflowWrap: (value: OverflowWrap) => EtaElement<T>
    overflowX: (value: OverflowX) => EtaElement<T>
    overflowY: (value: OverflowY) => EtaElement<T>
    overscrollBehavior: (value: OverscrollBehavior) => EtaElement<T>
    overscrollBehaviorBlock: (value: OverscrollBehavior) => EtaElement<T>
    overscrollBehaviorInline: (value: OverscrollBehavior) => EtaElement<T>
    overscrollBehaviorX: (value: OverscrollBehavior) => EtaElement<T>
    overscrollBehaviorY: (value: OverscrollBehavior) => EtaElement<T>
    padding: (value: string | number) => EtaElement<T>
    paddingBlock: (value: string | number) => EtaElement<T>
    paddingBlockEnd: (value: string | number) => EtaElement<T>
    paddingBlockStart: (value: string | number) => EtaElement<T>
    paddingBottom: (value: string | number) => EtaElement<T>
    paddingInline: (value: string | number) => EtaElement<T>
    paddingInlineEnd: (value: string | number) => EtaElement<T>
    paddingInlineStart: (value: string | number) => EtaElement<T>
    paddingLeft: (value: string | number) => EtaElement<T>
    paddingRight: (value: string | number) => EtaElement<T>
    paddingTop: (value: string | number) => EtaElement<T>
    pageBreakAfter: (value: PageBreak) => EtaElement<T>
    pageBreakBefore: (value: PageBreak) => EtaElement<T>
    pageBreakInside: (value: PageBreak) => EtaElement<T>
    paintOrder: (value: string) => EtaElement<T>
    perspective: (value: string | number) => EtaElement<T>
    perspectiveOrigin: (value: string) => EtaElement<T>
    placeContent: (value: PlaceContent) => EtaElement<T>
    placeItems: (value: PlaceItems) => EtaElement<T>
    placeSelf: (value: PlaceSelf) => EtaElement<T>
    pointerEvents: (value: PointerEvents) => EtaElement<T>
    position: (value: Position) => EtaElement<T>
    quotes: (value: string) => EtaElement<T>
    resize: (value: Resize) => EtaElement<T>
    right: (value: string | number) => EtaElement<T>
    rotate: (value: string) => EtaElement<T>
    scale: (value: string | number) => EtaElement<T>
    scrollBehavior: (value: ScrollBehavior) => EtaElement<T>
    scrollMargin: (value: string | number) => EtaElement<T>
    scrollMarginBlock: (value: string | number) => EtaElement<T>
    scrollMarginBlockEnd: (value: string | number) => EtaElement<T>
    scrollMarginBlockStart: (value: string | number) => EtaElement<T>
    scrollMarginBottom: (value: string | number) => EtaElement<T>
    scrollMarginInline: (value: string | number) => EtaElement<T>
    scrollMarginInlineEnd: (value: string | number) => EtaElement<T>
    scrollMarginInlineStart: (value: string | number) => EtaElement<T>
    scrollMarginLeft: (value: string | number) => EtaElement<T>
    scrollMarginRight: (value: string | number) => EtaElement<T>
    scrollMarginTop: (value: string | number) => EtaElement<T>
    scrollPadding: (value: string | number) => EtaElement<T>
    scrollPaddingBlock: (value: string | number) => EtaElement<T>
    scrollPaddingBlockEnd: (value: string | number) => EtaElement<T>
    scrollPaddingBlockStart: (value: string | number) => EtaElement<T>
    scrollPaddingBottom: (value: string | number) => EtaElement<T>
    scrollPaddingInline: (value: string | number) => EtaElement<T>
    scrollPaddingInlineEnd: (value: string | number) => EtaElement<T>
    scrollPaddingInlineStart: (value: string | number) => EtaElement<T>
    scrollPaddingLeft: (value: string | number) => EtaElement<T>
    scrollPaddingRight: (value: string | number) => EtaElement<T>
    scrollPaddingTop: (value: string | number) => EtaElement<T>
    scrollSnapAlign: (value: string) => EtaElement<T>
    scrollSnapStop: (value: ScrollSnapStop) => EtaElement<T>
    scrollSnapType: (value: string) => EtaElement<T>
    shapeImageThreshold: (value: number) => EtaElement<T>
    shapeMargin: (value: string | number) => EtaElement<T>
    shapeOutside: (value: string) => EtaElement<T>
    tabSize: (value: number | string) => EtaElement<T>
    tableLayout: (value: TableLayout) => EtaElement<T>
    textAlign: (value: TextAlign) => EtaElement<T>
    textAlignLast: (value: TextAlignLast) => EtaElement<T>
    textCombineUpright: (value: TextCombineUpright) => EtaElement<T>
    textDecoration: (value: TextDecoration) => EtaElement<T>
    textDecorationColor: (value: Color | string) => EtaElement<T>
    textDecorationLine: (value: string) => EtaElement<T>
    textDecorationStyle: (value: string) => EtaElement<T>
    textDecorationThickness: (value: string | number) => EtaElement<T>
    textEmphasis: (value: string) => EtaElement<T>
    textEmphasisColor: (value: Color | string) => EtaElement<T>
    textEmphasisPosition: (value: string) => EtaElement<T>
    textEmphasisStyle: (value: string) => EtaElement<T>
    textIndent: (value: string | number) => EtaElement<T>
    textOrientation: (value: TextOrientation) => EtaElement<T>
    textOverflow: (value: TextOverflow) => EtaElement<T>
    textRendering: (value: TextRendering) => EtaElement<T>
    textShadow: (value: string) => EtaElement<T>
    textTransform: (value: TextTransform) => EtaElement<T>
    textUnderlineOffset: (value: string | number) => EtaElement<T>
    textUnderlinePosition: (value: TextUnderlinePosition) => EtaElement<T>
    top: (value: string | number) => EtaElement<T>
    touchAction: (value: TouchAction) => EtaElement<T>
    transform: (value: string) => EtaElement<T>
    transformBox: (value: TransformBox) => EtaElement<T>
    transformOrigin: (value: string) => EtaElement<T>
    transformStyle: (value: TransformStyle) => EtaElement<T>
    transition: (value: string) => EtaElement<T>
    transitionDelay: (value: string | number) => EtaElement<T>
    transitionDuration: (value: string | number) => EtaElement<T>
    transitionProperty: (value: string) => EtaElement<T>
    transitionTimingFunction: (value: string) => EtaElement<T>
    translate: (value: string) => EtaElement<T>
    unicodeBidi: (value: UnicodeBidi) => EtaElement<T>
    userSelect: (value: UserSelect) => EtaElement<T>
    verticalAlign: (value: VerticalAlign) => EtaElement<T>
    visibility: (value: Visibility) => EtaElement<T>
    whiteSpace: (value: WhiteSpace) => EtaElement<T>
    widows: (value: string | number) => EtaElement<T>
    width: (value: string | number) => EtaElement<T>
    willChange: (value: string) => EtaElement<T>
    wordBreak: (value: WordBreak) => EtaElement<T>
    wordSpacing: (value: string | number) => EtaElement<T>
    wordWrap: (value: WordWrap) => EtaElement<T>
    writingMode: (value: WritingMode) => EtaElement<T>
    zIndex: (value: number | "auto") => EtaElement<T>
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
export type AnimationIterationCount = "infinite" | "number" | "initial" | "inherit"
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
export type BackgroundAttachment = "scroll" | "fixed" | "local" | "initial" | "inherit"
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
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse" | "initial" | "inherit"
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
export type FontVariantPosition = "normal" | "sub" | "super" | "initial" | "inherit"
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
export type GridAutoFlow = "row" | "column" | "dense" | "row dense" | "column dense"
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
export type TextAlign = "left" | "right" | "center" | "justify" | "initial" | "inherit"
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
export type Overflow = "visible" | "hidden" | "scroll" | "auto" | "initial" | "inherit"
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
export type TextCombineUpright = "none" | "all" | "digits" | "initial" | "inherit"
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
export type Visibility = "visible" | "hidden" | "collapse" | "initial" | "inherit"
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
export type MaskMode = "alpha" | "luminance" | "match-source" | "initial" | "inherit"
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
export type MaskSize = "auto" | "cover" | "contain" | "initial" | "inherit" | string
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