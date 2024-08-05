export default interface EtaElement<T extends HTMLElement> {
    element: T

    /* -- METADATA -- */
    id: (value: string) => EtaElement
    class: (value: string) => EtaElement
    style: (value: CSSStyleDeclaration) => EtaElement
    src: (value: URL) => EtaElement
    href: (value: URL) => EtaElement
    data: (key: string, value: string) => EtaElement
    alt: (value: string) => EtaElement
    title: (value: string) => EtaElement
    text: (value: string) => EtaElement
    html: (value: string) => EtaElement

    /* -- DOM CHANGES -- */
    append: (element: EtaElement) => EtaElement
    prepend: (element: EtaElement) => EtaElement
    remove: () => EtaElement
    children: (elements: EtaElement[]) => EtaElement
    replace: (element: EtaElement) => EtaElement

    /* -- EVENTS -- */

    // Clipboard Events
    onCopy: (callback: (event: ClipboardEvent) => void) => EtaElement
    onCut: (callback: (event: ClipboardEvent) => void) => EtaElement
    onPaste: (callback: (event: ClipboardEvent) => void) => EtaElement

    // Composition Events
    onCompositionStart: (
        callback: (event: CompositionEvent) => void
    ) => EtaElement
    onCompositionUpdate: (
        callback: (event: CompositionEvent) => void
    ) => EtaElement
    onCompositionEnd: (
        callback: (event: CompositionEvent) => void
    ) => EtaElement

    // Form Events
    onChange: (callback: (event: Event) => void) => EtaElement
    onInput: (callback: (event: Event) => void) => EtaElement
    onSubmit: (callback: (event: Event) => void) => EtaElement
    onInvalid: (callback: (event: Event) => void) => EtaElement
    onReset: (callback: (event: Event) => void) => EtaElement

    // Keyboard Events
    onKeyDown: (callback: (event: KeyboardEvent) => void) => EtaElement
    onKeyPress: (callback: (event: KeyboardEvent) => void) => EtaElement
    onKeyUp: (callback: (event: KeyboardEvent) => void) => EtaElement

    // Focus Events
    onFocus: (callback: (event: FocusEvent) => void) => EtaElement
    onFocusIn: (callback: (event: FocusEvent) => void) => EtaElement
    onFocusOut: (callback: (event: FocusEvent) => void) => EtaElement
    onBlur: (callback: (event: FocusEvent) => void) => EtaElement

    // Mouse Events
    onClick: (callback: (event: MouseEvent) => void) => EtaElement
    onDoubleClick: (callback: (event: MouseEvent) => void) => EtaElement
    onMouseDown: (callback: (event: MouseEvent) => void) => EtaElement
    onMouseUp: (callback: (event: MouseEvent) => void) => EtaElement
    onMouseEnter: (callback: (event: MouseEvent) => void) => EtaElement
    onMouseLeave: (callback: (event: MouseEvent) => void) => EtaElement
    onMouseMove: (callback: (event: MouseEvent) => void) => EtaElement
    onMouseOut: (callback: (event: MouseEvent) => void) => EtaElement
    onMouseOver: (callback: (event: MouseEvent) => void) => EtaElement
    onContextMenu: (callback: (event: MouseEvent) => void) => EtaElement

    // Pointer Events
    onPointerOver: (callback: (event: PointerEvent) => void) => EtaElement
    onPointerEnter: (callback: (event: PointerEvent) => void) => EtaElement
    onPointerDown: (callback: (event: PointerEvent) => void) => EtaElement
    onPointerMove: (callback: (event: PointerEvent) => void) => EtaElement
    onPointerUp: (callback: (event: PointerEvent) => void) => EtaElement
    onPointerCancel: (callback: (event: PointerEvent) => void) => EtaElement
    onPointerOut: (callback: (event: PointerEvent) => void) => EtaElement
    onPointerLeave: (callback: (event: PointerEvent) => void) => EtaElement
    onGotPointerCapture: (callback: (event: PointerEvent) => void) => EtaElement
    onLostPointerCapture: (
        callback: (event: PointerEvent) => void
    ) => EtaElement

    // Touch Events
    onTouchStart: (callback: (event: TouchEvent) => void) => EtaElement
    onTouchMove: (callback: (event: TouchEvent) => void) => EtaElement
    onTouchEnd: (callback: (event: TouchEvent) => void) => EtaElement
    onTouchCancel: (callback: (event: TouchEvent) => void) => EtaElement

    // UI Events
    onScroll: (callback: (event: Event) => void) => EtaElement
    onResize: (callback: (event: UIEvent) => void) => EtaElement

    // Wheel Events
    onWheel: (callback: (event: WheelEvent) => void) => EtaElement

    // Drag Events
    onDrag: (callback: (event: DragEvent) => void) => EtaElement
    onDragEnd: (callback: (event: DragEvent) => void) => EtaElement
    onDragEnter: (callback: (event: DragEvent) => void) => EtaElement
    onDragLeave: (callback: (event: DragEvent) => void) => EtaElement
    onDragOver: (callback: (event: DragEvent) => void) => EtaElement
    onDragStart: (callback: (event: DragEvent) => void) => EtaElement
    onDrop: (callback: (event: DragEvent) => void) => EtaElement

    // Media Events
    onAbort: (callback: (event: Event) => void) => EtaElement
    onCanPlay: (callback: (event: Event) => void) => EtaElement
    onCanPlayThrough: (callback: (event: Event) => void) => EtaElement
    onDurationChange: (callback: (event: Event) => void) => EtaElement
    onEmptied: (callback: (event: Event) => void) => EtaElement
    onEncrypted: (callback: (event: Event) => void) => EtaElement
    onEnded: (callback: (event: Event) => void) => EtaElement
    onLoadedData: (callback: (event: Event) => void) => EtaElement
    onLoadedMetadata: (callback: (event: Event) => void) => EtaElement
    onLoadStart: (callback: (event: Event) => void) => EtaElement
    onPause: (callback: (event: Event) => void) => EtaElement
    onPlay: (callback: (event: Event) => void) => EtaElement
    onPlaying: (callback: (event: Event) => void) => EtaElement
    onProgress: (callback: (event: Event) => void) => EtaElement
    onRateChange: (callback: (event: Event) => void) => EtaElement
    onSeeked: (callback: (event: Event) => void) => EtaElement
    onSeeking: (callback: (event: Event) => void) => EtaElement
    onStalled: (callback: (event: Event) => void) => EtaElement
    onSuspend: (callback: (event: Event) => void) => EtaElement
    onTimeUpdate: (callback: (event: Event) => void) => EtaElement
    onVolumeChange: (callback: (event: Event) => void) => EtaElement
    onWaiting: (callback: (event: Event) => void) => EtaElement

    // Image Events
    onLoad: (callback: (event: Event) => void) => EtaElement
    onError: (callback: (event: Event) => void) => EtaElement

    // Animation Events
    onAnimationStart: (callback: (event: AnimationEvent) => void) => EtaElement
    onAnimationEnd: (callback: (event: AnimationEvent) => void) => EtaElement
    onAnimationIteration: (
        callback: (event: AnimationEvent) => void
    ) => EtaElement

    // Transition Events
    onTransitionEnd: (callback: (event: TransitionEvent) => void) => EtaElement

    /* -- CSS PROPERTIES -- */
    accentColor: (value: Color | string) => EtaElement
    alignContent: (value: AlignContent) => EtaElement
    alignItems: (value: AlignItems) => EtaElement
    alignSelf: (value: AlignSelf) => EtaElement
    all: (value: All) => EtaElement
    animation: (value: string) => EtaElement
    animationDelay: (value: string | number) => EtaElement
    animationDirection: (value: AnimationDirection) => EtaElement
    animationDuration: (value: string | number) => EtaElement
    animationFillMode: (value: AnimationFillMode) => EtaElement
    animationIterationCount: (value: AnimationIterationCount) => EtaElement
    animationName: (value: string) => EtaElement
    animationPlayState: (value: AnimationPlayState) => EtaElement
    animationTimingFunction: (value: AnimationTimingFunction) => EtaElement
    appearance: (value: Appearance) => EtaElement
    aspectRatio: (value: string | number) => EtaElement
    backdropFilter: (value: BackdropFilter) => EtaElement
    backfaceVisibility: (value: BackfaceVisibility) => EtaElement
    background: (value: string) => EtaElement
    backgroundAttachment: (value: BackgroundAttachment) => EtaElement
    backgroundBlendMode: (value: BackgroundBlendMode) => EtaElement
    backgroundClip: (value: BackgroundClip) => EtaElement
    backgroundColor: (value: Color | string) => EtaElement
    backgroundImage: (value: URL | Color | string) => EtaElement
    backgroundOrigin: (value: BackgroundOrigin) => EtaElement
    backgroundPosition: (value: BackgroundPosition) => EtaElement
    backgroundPositionX: (value: PositionValue | string) => EtaElement
    backgroundPositionY: (value: PositionValue | string) => EtaElement
    backgroundRepeat: (value: BackgroundRepeat) => EtaElement
    backgroundSize: (value: BackgroundSize) => EtaElement
    blockSize: (value: string | number) => EtaElement
    border: (value: string) => EtaElement
    borderBlock: (value: string) => EtaElement
    borderBlockColor: (value: Color | string) => EtaElement
    borderBlockEnd: (value: string) => EtaElement
    borderBlockEndColor: (value: Color | string) => EtaElement
    borderBlockEndStyle: (value: BorderStyle) => EtaElement
    borderBlockEndWidth: (value: string | number) => EtaElement
    borderBlockStart: (value: string) => EtaElement
    borderBlockStartColor: (value: Color | string) => EtaElement
    borderBlockStartStyle: (value: BorderStyle) => EtaElement
    borderBlockStartWidth: (value: string | number) => EtaElement
    borderBlockStyle: (value: BorderStyle) => EtaElement
    borderBlockWidth: (value: string | number) => EtaElement
    borderBottom: (value: string) => EtaElement
    borderBottomColor: (value: Color | string) => EtaElement
    borderBottomLeftRadius: (value: string | number) => EtaElement
    borderBottomRightRadius: (value: string | number) => EtaElement
    borderBottomStyle: (value: BorderStyle) => EtaElement
    borderBottomWidth: (value: string | number) => EtaElement
    borderCollapse: (value: BorderCollapse) => EtaElement
    borderColor: (value: Color | string) => EtaElement
    borderImage: (value: string) => EtaElement
    borderImageOutset: (value: string | number) => EtaElement
    borderImageRepeat: (value: BorderImageRepeat) => EtaElement
    borderImageSlice: (value: string | number) => EtaElement
    borderImageSource: (value: string) => EtaElement
    borderImageWidth: (value: string | number) => EtaElement
    borderInline: (value: string) => EtaElement
    borderInlineColor: (value: Color | string) => EtaElement
    borderInlineEnd: (value: string) => EtaElement
    borderInlineEndColor: (value: Color | string) => EtaElement
    borderInlineEndStyle: (value: BorderStyle) => EtaElement
    borderInlineEndWidth: (value: string | number) => EtaElement
    borderInlineStart: (value: string) => EtaElement
    borderInlineStartColor: (value: Color | string) => EtaElement
    borderInlineStartStyle: (value: BorderStyle) => EtaElement
    borderInlineStartWidth: (value: string | number) => EtaElement
    borderInlineStyle: (value: BorderStyle) => EtaElement
    borderInlineWidth: (value: string | number) => EtaElement
    borderLeft: (value: string) => EtaElement
    borderLeftColor: (value: Color | string) => EtaElement
    borderLeftStyle: (value: BorderStyle) => EtaElement
    borderLeftWidth: (value: string | number) => EtaElement
    borderRadius: (value: string | number) => EtaElement
    borderRight: (value: string) => EtaElement
    borderRightColor: (value: Color | string) => EtaElement
    borderRightStyle: (value: BorderStyle) => EtaElement
    borderRightWidth: (value: string | number) => EtaElement
    borderSpacing: (value: string | number) => EtaElement
    borderStyle: (value: BorderStyle) => EtaElement
    borderTop: (value: string) => EtaElement
    borderTopColor: (value: Color | string) => EtaElement
    borderTopLeftRadius: (value: string | number) => EtaElement
    borderTopRightRadius: (value: string | number) => EtaElement
    borderTopStyle: (value: BorderStyle) => EtaElement
    borderTopWidth: (value: string | number) => EtaElement
    borderWidth: (value: string | number) => EtaElement
    bottom: (value: string | number) => EtaElement
    boxShadow: (value: string) => EtaElement
    boxSizing: (value: BoxSizing) => EtaElement
    breakAfter: (value: BreakAfter) => EtaElement
    breakBefore: (value: BreakBefore) => EtaElement
    breakInside: (value: BreakInside) => EtaElement
    captionSide: (value: CaptionSide) => EtaElement
    caretColor: (value: Color | string) => EtaElement
    clear: (value: Clear) => EtaElement
    clipPath: (value: string) => EtaElement
    color: (value: Color | string) => EtaElement
    columnCount: (value: number | ColumnCount) => EtaElement
    columnFill: (value: ColumnFill) => EtaElement
    columnGap: (value: string | number) => EtaElement
    columnRule: (value: string) => EtaElement
    columnRuleColor: (value: Color | string) => EtaElement
    columnRuleStyle: (value: BorderStyle) => EtaElement
    columnRuleWidth: (value: string | number) => EtaElement
    columnSpan: (value: ColumnSpan) => EtaElement
    columnWidth: (value: string | number) => EtaElement
    columns: (value: string) => EtaElement
    content: (value: string) => EtaElement
    counterIncrement: (value: string) => EtaElement
    counterReset: (value: string) => EtaElement
    cursor: (value: Cursor) => EtaElement
    direction: (value: Direction) => EtaElement
    display: (value: Display) => EtaElement
    emptyCells: (value: EmptyCells) => EtaElement
    filter: (value: string) => EtaElement
    flex: (value: string | Flex) => EtaElement
    flexBasis: (value: string | number) => EtaElement
    flexDirection: (value: FlexDirection) => EtaElement
    flexFlow: (value: string) => EtaElement
    flexGrow: (value: string | number) => EtaElement
    flexShrink: (value: string | number) => EtaElement
    flexWrap: (value: FlexWrap) => EtaElement
    float: (value: Float) => EtaElement
    font: (value: string) => EtaElement
    fontFamily: (value: string) => EtaElement
    fontFeatureSettings: (value: string) => EtaElement
    fontKerning: (value: FontKerning) => EtaElement
    fontSize: (value: string | number | FontSize) => EtaElement
    fontSizeAdjust: (value: number | "none") => EtaElement
    fontStretch: (value: string) => EtaElement
    fontStyle: (value: FontStyle) => EtaElement
    fontVariant: (value: string) => EtaElement
    fontVariantCaps: (value: FontVariantCaps) => EtaElement
    fontVariantEastAsian: (value: string) => EtaElement
    fontVariantLigatures: (value: string) => EtaElement
    fontVariantNumeric: (value: string) => EtaElement
    fontVariantPosition: (value: FontVariantPosition) => EtaElement
    fontWeight: (value: string | number) => EtaElement
    gap: (value: string | number) => EtaElement
    grid: (value: string) => EtaElement
    gridArea: (value: string) => EtaElement
    gridAutoColumns: (value: string) => EtaElement
    gridAutoFlow: (value: GridAutoFlow) => EtaElement
    gridAutoRows: (value: string) => EtaElement
    gridColumn: (value: string) => EtaElement
    gridColumnEnd: (value: string) => EtaElement
    gridColumnStart: (value: string) => EtaElement
    gridRow: (value: string) => EtaElement
    gridRowEnd: (value: string) => EtaElement
    gridRowStart: (value: string) => EtaElement
    gridTemplate: (value: string) => EtaElement
    gridTemplateAreas: (value: string) => EtaElement
    gridTemplateColumns: (value: string) => EtaElement
    gridTemplateRows: (value: string) => EtaElement
    height: (value: string | number) => EtaElement
    hyphens: (value: Hyphens) => EtaElement
    imageRendering: (value: ImageRendering) => EtaElement
    inlineSize: (value: string | number) => EtaElement
    inset: (value: string | number) => EtaElement
    insetBlock: (value: string | number) => EtaElement
    insetBlockEnd: (value: string | number) => EtaElement
    insetBlockStart: (value: string | number) => EtaElement
    insetInline: (value: string | number) => EtaElement
    insetInlineEnd: (value: string | number) => EtaElement
    insetInlineStart: (value: string | number) => EtaElement
    isolation: (value: Isolation) => EtaElement
    justifyContent: (value: JustifyContent) => EtaElement
    justifyItems: (value: JustifyItems) => EtaElement
    justifySelf: (value: JustifySelf) => EtaElement
    left: (value: string | number) => EtaElement
    letterSpacing: (value: string | number) => EtaElement
    lineBreak: (value: LineBreak) => EtaElement
    lineHeight: (value: string | number) => EtaElement
    listStyle: (value: string) => EtaElement
    listStyleImage: (value: string) => EtaElement
    listStylePosition: (value: ListStylePosition) => EtaElement
    listStyleType: (value: ListStyleType) => EtaElement
    margin: (value: string | number) => EtaElement
    marginBlock: (value: string | number) => EtaElement
    marginBlockEnd: (value: string | number) => EtaElement
    marginBlockStart: (value: string | number) => EtaElement
    marginBottom: (value: string | number) => EtaElement
    marginInline: (value: string | number) => EtaElement
    marginInlineEnd: (value: string | number) => EtaElement
    marginInlineStart: (value: string | number) => EtaElement
    marginLeft: (value: string | number) => EtaElement
    marginRight: (value: string | number) => EtaElement
    marginTop: (value: string | number) => EtaElement
    mask: (value: string) => EtaElement
    maskImage: (value: string) => EtaElement
    maskMode: (value: MaskMode) => EtaElement
    maskOrigin: (value: MaskOrigin) => EtaElement
    maskPosition: (value: MaskPosition) => EtaElement
    maskRepeat: (value: MaskRepeat) => EtaElement
    maskSize: (value: MaskSize) => EtaElement
    maxBlockSize: (value: string | number) => EtaElement
    maxHeight: (value: string | number) => EtaElement
    maxInlineSize: (value: string | number) => EtaElement
    maxWidth: (value: string | number) => EtaElement
    minBlockSize: (value: string | number) => EtaElement
    minHeight: (value: string | number) => EtaElement
    minInlineSize: (value: string | number) => EtaElement
    minWidth: (value: string | number) => EtaElement
    mixBlendMode: (value: MixBlendMode) => EtaElement
    objectFit: (value: ObjectFit) => EtaElement
    objectPosition: (value: string) => EtaElement
    offset: (value: string) => EtaElement
    offsetAnchor: (value: string) => EtaElement
    offsetDistance: (value: string | number) => EtaElement
    offsetPath: (value: string) => EtaElement
    offsetRotate: (value: string) => EtaElement
    opacity: (value: number | string) => EtaElement
    order: (value: number | string) => EtaElement
    orphans: (value: number) => EtaElement
    outline: (value: string) => EtaElement
    outlineColor: (value: Color | string) => EtaElement
    outlineOffset: (value: string | number) => EtaElement
    outlineStyle: (value: OutlineStyle) => EtaElement
    outlineWidth: (value: string | number) => EtaElement
    overflow: (value: Overflow) => EtaElement
    overflowAnchor: (value: OverflowAnchor) => EtaElement
    overflowWrap: (value: OverflowWrap) => EtaElement
    overflowX: (value: OverflowX) => EtaElement
    overflowY: (value: OverflowY) => EtaElement
    overscrollBehavior: (value: OverscrollBehavior) => EtaElement
    overscrollBehaviorBlock: (value: OverscrollBehavior) => EtaElement
    overscrollBehaviorInline: (value: OverscrollBehavior) => EtaElement
    overscrollBehaviorX: (value: OverscrollBehavior) => EtaElement
    overscrollBehaviorY: (value: OverscrollBehavior) => EtaElement
    padding: (value: string | number) => EtaElement
    paddingBlock: (value: string | number) => EtaElement
    paddingBlockEnd: (value: string | number) => EtaElement
    paddingBlockStart: (value: string | number) => EtaElement
    paddingBottom: (value: string | number) => EtaElement
    paddingInline: (value: string | number) => EtaElement
    paddingInlineEnd: (value: string | number) => EtaElement
    paddingInlineStart: (value: string | number) => EtaElement
    paddingLeft: (value: string | number) => EtaElement
    paddingRight: (value: string | number) => EtaElement
    paddingTop: (value: string | number) => EtaElement
    pageBreakAfter: (value: PageBreak) => EtaElement
    pageBreakBefore: (value: PageBreak) => EtaElement
    pageBreakInside: (value: PageBreak) => EtaElement
    paintOrder: (value: string) => EtaElement
    perspective: (value: string | number) => EtaElement
    perspectiveOrigin: (value: string) => EtaElement
    placeContent: (value: PlaceContent) => EtaElement
    placeItems: (value: PlaceItems) => EtaElement
    placeSelf: (value: PlaceSelf) => EtaElement
    pointerEvents: (value: PointerEvents) => EtaElement
    position: (value: Position) => EtaElement
    quotes: (value: string) => EtaElement
    resize: (value: Resize) => EtaElement
    right: (value: string | number) => EtaElement
    rotate: (value: string) => EtaElement
    scale: (value: string | number) => EtaElement
    scrollBehavior: (value: ScrollBehavior) => EtaElement
    scrollMargin: (value: string | number) => EtaElement
    scrollMarginBlock: (value: string | number) => EtaElement
    scrollMarginBlockEnd: (value: string | number) => EtaElement
    scrollMarginBlockStart: (value: string | number) => EtaElement
    scrollMarginBottom: (value: string | number) => EtaElement
    scrollMarginInline: (value: string | number) => EtaElement
    scrollMarginInlineEnd: (value: string | number) => EtaElement
    scrollMarginInlineStart: (value: string | number) => EtaElement
    scrollMarginLeft: (value: string | number) => EtaElement
    scrollMarginRight: (value: string | number) => EtaElement
    scrollMarginTop: (value: string | number) => EtaElement
    scrollPadding: (value: string | number) => EtaElement
    scrollPaddingBlock: (value: string | number) => EtaElement
    scrollPaddingBlockEnd: (value: string | number) => EtaElement
    scrollPaddingBlockStart: (value: string | number) => EtaElement
    scrollPaddingBottom: (value: string | number) => EtaElement
    scrollPaddingInline: (value: string | number) => EtaElement
    scrollPaddingInlineEnd: (value: string | number) => EtaElement
    scrollPaddingInlineStart: (value: string | number) => EtaElement
    scrollPaddingLeft: (value: string | number) => EtaElement
    scrollPaddingRight: (value: string | number) => EtaElement
    scrollPaddingTop: (value: string | number) => EtaElement
    scrollSnapAlign: (value: string) => EtaElement
    scrollSnapStop: (value: ScrollSnapStop) => EtaElement
    scrollSnapType: (value: string) => EtaElement
    shapeImageThreshold: (value: number) => EtaElement
    shapeMargin: (value: string | number) => EtaElement
    shapeOutside: (value: string) => EtaElement
    tabSize: (value: number | string) => EtaElement
    tableLayout: (value: TableLayout) => EtaElement
    textAlign: (value: TextAlign) => EtaElement
    textAlignLast: (value: TextAlignLast) => EtaElement
    textCombineUpright: (value: TextCombineUpright) => EtaElement
    textDecoration: (value: TextDecoration) => EtaElement
    textDecorationColor: (value: Color | string) => EtaElement
    textDecorationLine: (value: string) => EtaElement
    textDecorationStyle: (value: string) => EtaElement
    textDecorationThickness: (value: string | number) => EtaElement
    textEmphasis: (value: string) => EtaElement
    textEmphasisColor: (value: Color | string) => EtaElement
    textEmphasisPosition: (value: string) => EtaElement
    textEmphasisStyle: (value: string) => EtaElement
    textIndent: (value: string | number) => EtaElement
    textOrientation: (value: TextOrientation) => EtaElement
    textOverflow: (value: TextOverflow) => EtaElement
    textRendering: (value: TextRendering) => EtaElement
    textShadow: (value: string) => EtaElement
    textTransform: (value: TextTransform) => EtaElement
    textUnderlineOffset: (value: string | number) => EtaElement
    textUnderlinePosition: (value: TextUnderlinePosition) => EtaElement
    top: (value: string | number) => EtaElement
    touchAction: (value: TouchAction) => EtaElement
    transform: (value: string) => EtaElement
    transformBox: (value: TransformBox) => EtaElement
    transformOrigin: (value: string) => EtaElement
    transformStyle: (value: TransformStyle) => EtaElement
    transition: (value: string) => EtaElement
    transitionDelay: (value: string | number) => EtaElement
    transitionDuration: (value: string | number) => EtaElement
    transitionProperty: (value: string) => EtaElement
    transitionTimingFunction: (value: string) => EtaElement
    translate: (value: string) => EtaElement
    unicodeBidi: (value: UnicodeBidi) => EtaElement
    userSelect: (value: UserSelect) => EtaElement
    verticalAlign: (value: VerticalAlign) => EtaElement
    visibility: (value: Visibility) => EtaElement
    whiteSpace: (value: WhiteSpace) => EtaElement
    widows: (value: string | number) => EtaElement
    width: (value: string | number) => EtaElement
    willChange: (value: string) => EtaElement
    wordBreak: (value: WordBreak) => EtaElement
    wordSpacing: (value: string | number) => EtaElement
    wordWrap: (value: WordWrap) => EtaElement
    writingMode: (value: WritingMode) => EtaElement
    zIndex: (value: number | "auto") => EtaElement
}

const Color = {
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
}

type Color = keyof typeof Color

type Appearance = "auto" | "none"
type AlignContent =
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "stretch"
    | "initial"
    | "inherit"
type AlignItems =
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch"
    | "initial"
    | "inherit"
type AlignSelf =
    | "auto"
    | "flex-start"
    | "flex-end"
    | "center"
    | "baseline"
    | "stretch"
    | "initial"
    | "inherit"
type All = "initial" | "inherit" | "unset"
type AnimationDirection =
    | "normal"
    | "reverse"
    | "alternate"
    | "alternate-reverse"
    | "initial"
    | "inherit"
type AnimationFillMode =
    | "none"
    | "forwards"
    | "backwards"
    | "both"
    | "initial"
    | "inherit"
type AnimationIterationCount = "infinite" | "number" | "initial" | "inherit"
type AnimationPlayState = "running" | "paused" | "initial" | "inherit"
type AnimationTimingFunction =
    | "ease"
    | "linear"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "step-start"
    | "step-end"
    | "initial"
    | "inherit"
type BackdropFilter =
    | "none"
    | "initial"
    | "inherit"
    | string
    | [Filter, string | number]
type BackfaceVisibility = "visible" | "hidden" | "initial" | "inherit"
type BackgroundAttachment = "scroll" | "fixed" | "local" | "initial" | "inherit"
type BackgroundBlendMode =
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
type BackgroundClip =
    | "border-box"
    | "padding-box"
    | "content-box"
    | "initial"
    | "inherit"
type BackgroundOrigin = BackgroundClip
type BackgroundPosition =
    | PositionValue
    | [PositionValue, PositionValue]
    | "initial"
    | "inherit"
    | CSSTuple
type BackgroundRepeat =
    | "repeat"
    | "repeat-x"
    | "repeat-y"
    | "no-repeat"
    | "space"
    | "round"
    | "initial"
    | "inherit"
type BackgroundSize =
    | "auto"
    | "cover"
    | "contain"
    | "initial"
    | "inherit"
    | CSSTuple
type BorderCollapse = "separate" | "collapse" | "initial" | "inherit"
type BorderImageRepeat =
    | "stretch"
    | "repeat"
    | "round"
    | "space"
    | "initial"
    | "inherit"
type BorderStyle =
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
type BoxSizing = "content-box" | "border-box" | "initial" | "inherit"
type BreakBefore =
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
type BreakAfter = BreakBefore
type BreakInside = BreakBefore
type CaptionSide = "top" | "bottom" | "initial" | "inherit"
type Clear = "none" | "left" | "right" | "both" | "initial" | "inherit"
type ColumnCount = "auto" | "initial" | "inherit"
type CSSTuple = string | [string, string]
type FlexDirection =
    | "row"
    | "row-reverse"
    | "column"
    | "column-reverse"
    | "initial"
    | "inherit"
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse" | "initial" | "inherit"
type Float = "none" | "left" | "right" | "initial" | "inherit"
type FontStyle = "normal" | "italic" | "oblique" | "initial" | "inherit"
type FontVariantCaps =
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
type FontVariantPosition = "normal" | "sub" | "super" | "initial" | "inherit"
type Filter =
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
type GridAutoFlow = "row" | "column" | "dense" | "row dense" | "column dense"
type Hyphens = "none" | "manual" | "auto" | "initial" | "inherit"
type PositionValue = "left" | "right" | "top" | "bottom" | "center"
type URL = string
type FontSize =
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
type TextAlign = "left" | "right" | "center" | "justify" | "initial" | "inherit"
type TextDecoration =
    | "none"
    | "underline"
    | "overline"
    | "line-through"
    | "initial"
    | "inherit"
type TextTransform =
    | "none"
    | "capitalize"
    | "uppercase"
    | "lowercase"
    | "initial"
    | "inherit"
type TextUnderlinePosition =
    | "auto"
    | "under"
    | "left"
    | "right"
    | "initial"
    | "inherit"
type WhiteSpace =
    | "normal"
    | "nowrap"
    | "pre"
    | "pre-line"
    | "pre-wrap"
    | "initial"
    | "inherit"
type WordBreak =
    | "normal"
    | "break-all"
    | "keep-all"
    | "break-word"
    | "initial"
    | "inherit"
type WordWrap = "normal" | "break-word" | "initial" | "inherit"
type WritingMode =
    | "horizontal-tb"
    | "vertical-rl"
    | "vertical-lr"
    | "sideways-rl"
    | "sideways-lr"
type ColumnFill = "balance" | "auto"
type ColumnSpan = "none" | "all"
type Direction = "ltr" | "rtl" | "initial" | "inherit"
type EmptyCells = "show" | "hide" | "initial" | "inherit"
type Isolation = "auto" | "isolate" | "initial" | "inherit"
type JustifyContent =
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "initial"
    | "inherit"
type JustifyItems =
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
type JustifySelf = JustifyItems
type LineBreak = "auto" | "loose" | "normal" | "strict" | "anywhere"
type ImageRendering = "auto" | "crisp-edges" | "pixelated"
type ListStylePosition = "inside" | "outside" | "initial" | "inherit"
type MaskBorderMode = "alpha" | "luminance"
type ObjectFit = "fill" | "contain" | "cover" | "none" | "scale-down"
type MixBlendMode =
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
type Overflow = "visible" | "hidden" | "scroll" | "auto" | "initial" | "inherit"
type OverflowAnchor = "none" | "auto"
type OverflowWrap = "normal" | "break-word" | "anywhere"
type OverflowX =
    | "visible"
    | "hidden"
    | "scroll"
    | "auto"
    | "initial"
    | "inherit"
type OverflowY =
    | "visible"
    | "hidden"
    | "scroll"
    | "auto"
    | "initial"
    | "inherit"
type OverscrollBehavior = "auto" | "contain" | "none"
type PointerEvents = "auto" | "none" | "initial" | "inherit"
type Position = "static" | "relative" | "absolute" | "fixed" | "sticky"
type Resize =
    | "none"
    | "both"
    | "horizontal"
    | "vertical"
    | "initial"
    | "inherit"
type ScrollBehavior = "auto" | "smooth"
type ScrollSnapStop = "normal" | "always"
type TableLayout = "auto" | "fixed" | "initial" | "inherit"
type TextAlignLast =
    | "auto"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "start"
    | "end"
type TextCombineUpright = "none" | "all" | "digits" | "initial" | "inherit"
type TextJustify =
    | "auto"
    | "inter-word"
    | "inter-ideograph"
    | "inter-cluster"
    | "distribute"
type TextOrientation =
    | "mixed"
    | "upright"
    | "sideways"
    | "sideways-right"
    | "use-glyph-orientation"
type TextRendering =
    | "auto"
    | "optimizeSpeed"
    | "optimizeLegibility"
    | "geometricPrecision"
type UnicodeBidi =
    | "normal"
    | "embed"
    | "isolate"
    | "bidi-override"
    | "isolate-override"
    | "plaintext"
type UserSelect = "auto" | "text" | "none" | "contain" | "all"
type VerticalAlign =
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
type Visibility = "visible" | "hidden" | "collapse" | "initial" | "inherit"
type OutlineStyle =
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
type TextOverflow = "clip" | "ellipsis" | "initial" | "inherit"
type TouchAction = "auto" | "none" | "pan-x" | "pan-y" | "manipulation"
type TransformBox = "border-box" | "fill-box" | "view-box"
type TransformStyle = "flat" | "preserve-3d"
type FontKerning = "auto" | "normal" | "none"
type Display =
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
type Cursor =
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
type Flex =
    | "none"
    | "initial"
    | "inherit"
    | "auto"
    | FlexGrow
    | FlexShrink
    | FlexBasis
    | [FlexGrow, FlexShrink, FlexBasis]
type FlexGrow = string
type FlexShrink = string
type FlexBasis = "auto" | "initial" | "inherit" | "content" | string
type ListStyleType =
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
type MaskMode = "alpha" | "luminance" | "match-source" | "initial" | "inherit"
type MaskOrigin =
    | "border-box"
    | "padding-box"
    | "content-box"
    | "margin-box"
    | "fill-box"
    | "stroke-box"
    | "view-box"
    | "initial"
    | "inherit"
type MaskPosition = CSSTuple | "initial" | "inherit"
type MaskRepeat =
    | "repeat"
    | "no-repeat"
    | "repeat-x"
    | "repeat-y"
    | "initial"
    | "inherit"
    | "round"
    | "space"
type MaskSize = "auto" | "cover" | "contain" | "initial" | "inherit" | string
type PageBreak =
    | "auto"
    | "avoid"
    | "always"
    | "left"
    | "right"
    | "initial"
    | "inherit"
type PlaceContent =
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
type PlaceItems =
    | "normal legacy"
    | "baseline"
    | "center"
    | "end"
    | "start"
    | "stretch"
    | "initial"
    | "inherit"
type PlaceSelf =
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
type TextAlignLast = (TextAlign & "start") | "end" | "auto"
