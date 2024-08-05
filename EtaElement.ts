interface EtaElement {
    element: HTMLElement

    id: (value: string) => EtaElement
    class: (value: string) => EtaElement
    style: (value: CSSStyleDeclaration) => EtaElement
    src: (value: URL) => EtaElement
    href: (value: URL) => EtaElement
    data: (value: string) => EtaElement
    alt: (value: string) => EtaElement
    title: (value: string) => EtaElement
    // CSS properties
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
    boxDecorationBreak: (value: BoxDecorationBreak) => EtaElement
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
    columnFill: (value: "auto" | "balance" | "balance-all") => EtaElement
    columnGap: (value: string | number) => EtaElement
    columnRule: (value: string) => EtaElement
    columnRuleColor: (value: Color | string) => EtaElement
    columnRuleStyle: (value: BorderStyle) => EtaElement
    columnRuleWidth: (value: string | number) => EtaElement
    columnSpan: (value: "none" | "all") => EtaElement
    columnWidth: (value: string | number) => EtaElement
    columns: (value: string) => EtaElement
    content: (value: string) => EtaElement
    counterIncrement: (value: string) => EtaElement
    counterReset: (value: string) => EtaElement
    cursor: (value: string) => EtaElement
    direction: (value: "ltr" | "rtl" | "initial" | "inherit") => EtaElement
    display: (value: string) => EtaElement
    emptyCells: (value: "show" | "hide" | "initial" | "inherit") => EtaElement
    filter: (value: string) => EtaElement
    flex: (value: string) => EtaElement
    flexBasis: (value: string | number) => EtaElement
    flexDirection: (value: FlexDirection) => EtaElement
    flexFlow: (value: string) => EtaElement
    flexGrow: (value: number) => EtaElement
    flexShrink: (value: number) => EtaElement
    flexWrap: (value: FlexWrap) => EtaElement
    float: (
        value: "none" | "left" | "right" | "initial" | "inherit"
    ) => EtaElement
    font: (value: string) => EtaElement
    fontFamily: (value: string) => EtaElement
    fontFeatureSettings: (value: string) => EtaElement
    fontKerning: (value: "auto" | "normal" | "none") => EtaElement
    fontLanguageOverride: (value: string) => EtaElement
    fontSize: (value: string | number | FontSize) => EtaElement
    fontSizeAdjust: (value: number | "none") => EtaElement
    fontStretch: (value: string) => EtaElement
    fontStyle: (
        value: "normal" | "italic" | "oblique" | "initial" | "inherit"
    ) => EtaElement
    fontSynthesis: (value: string) => EtaElement
    fontVariant: (value: string) => EtaElement
    fontVariantCaps: (
        value:
            | "normal"
            | "small-caps"
            | "all-small-caps"
            | "petite-caps"
            | "all-petite-caps"
            | "unicase"
            | "titling-caps"
    ) => EtaElement
    fontVariantEastAsian: (value: string) => EtaElement
    fontVariantLigatures: (value: string) => EtaElement
    fontVariantNumeric: (value: string) => EtaElement
    fontVariantPosition: (
        value: "normal" | "sub" | "super" | "initial" | "inherit"
    ) => EtaElement
    fontWeight: (value: string | number) => EtaElement
    gap: (value: string | number) => EtaElement
    grid: (value: string) => EtaElement
    gridArea: (value: string) => EtaElement
    gridAutoColumns: (value: string) => EtaElement
    gridAutoFlow: (
        value: "row" | "column" | "dense" | "row dense" | "column dense"
    ) => EtaElement
    gridAutoRows: (value: string) => EtaElement
    gridColumn: (value: string) => EtaElement
    gridColumnEnd: (value: string) => EtaElement
    gridColumnGap: (value: string | number) => EtaElement
    gridColumnStart: (value: string) => EtaElement
    gridGap: (value: string | number) => EtaElement
    gridRow: (value: string) => EtaElement
    gridRowEnd: (value: string) => EtaElement
    gridRowGap: (value: string | number) => EtaElement
    gridRowStart: (value: string) => EtaElement
    gridTemplate: (value: string) => EtaElement
    gridTemplateAreas: (value: string) => EtaElement
    gridTemplateColumns: (value: string) => EtaElement
    gridTemplateRows: (value: string) => EtaElement
    hangingPunctuation: (value: string) => EtaElement
    height: (value: string | number) => EtaElement
    hyphens: (
        value: "none" | "manual" | "auto" | "initial" | "inherit"
    ) => EtaElement
    imageOrientation: (value: string) => EtaElement
    imageRendering: (value: "auto" | "crisp-edges" | "pixelated") => EtaElement
    imageResolution: (value: string) => EtaElement
    initialLetter: (value: string) => EtaElement
    inlineSize: (value: string | number) => EtaElement
    inset: (value: string | number) => EtaElement
    insetBlock: (value: string | number) => EtaElement
    insetBlockEnd: (value: string | number) => EtaElement
    insetBlockStart: (value: string | number) => EtaElement
    insetInline: (value: string | number) => EtaElement
    insetInlineEnd: (value: string | number) => EtaElement
    insetInlineStart: (value: string | number) => EtaElement
    isolation: (value: "auto" | "isolate" | "initial" | "inherit") => EtaElement
    justifyContent: (
        value:
            | "flex-start"
            | "flex-end"
            | "center"
            | "space-between"
            | "space-around"
            | "space-evenly"
            | "initial"
            | "inherit"
    ) => EtaElement
    justifyItems: (
        value:
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
            | "initial"
            | "inherit"
    ) => EtaElement
    justifySelf: (
        value:
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
            | "initial"
            | "inherit"
    ) => EtaElement
    left: (value: string | number) => EtaElement
    letterSpacing: (value: string | number) => EtaElement
    lineBreak: (
        value: "auto" | "loose" | "normal" | "strict" | "anywhere"
    ) => EtaElement
    lineHeight: (value: string | number) => EtaElement
    listStyle: (value: string) => EtaElement
    listStyleImage: (value: string) => EtaElement
    listStylePosition: (
        value: "inside" | "outside" | "initial" | "inherit"
    ) => EtaElement
    listStyleType: (value: string) => EtaElement
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
    maskBorder: (value: string) => EtaElement
    maskBorderMode: (value: "luminance" | "alpha") => EtaElement
    maskBorderOutset: (value: string | number) => EtaElement
    maskBorderRepeat: (value: string) => EtaElement
    maskBorderSlice: (value: string | number) => EtaElement
    maskBorderSource: (value: string) => EtaElement
    maskBorderWidth: (value: string | number) => EtaElement
    maskClip: (value: string) => EtaElement
    maskComposite: (value: string) => EtaElement
    maskImage: (value: string) => EtaElement
    maskMode: (value: string) => EtaElement
    maskOrigin: (value: string) => EtaElement
    maskPosition: (value: string) => EtaElement
    maskRepeat: (value: string) => EtaElement
    maskSize: (value: string) => EtaElement
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
    opacity: (value: number) => EtaElement
    order: (value: number) => EtaElement
    orphans: (value: number) => EtaElement
    outline: (value: string) => EtaElement
    outlineColor: (value: Color | string) => EtaElement
    outlineOffset: (value: string | number) => EtaElement
    outlineStyle: (value: OutlineStyle) => EtaElement
    outlineWidth: (value: string | number) => EtaElement
    overflow: (value: Overflow) => EtaElement
    overflowAnchor: (value: "auto" | "none") => EtaElement
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
    pageBreakAfter: (value: PageBreakAfter) => EtaElement
    pageBreakBefore: (value: PageBreakBefore) => EtaElement
    pageBreakInside: (value: PageBreakInside) => EtaElement
    paintOrder: (value: string) => EtaElement
    perspective: (value: string | number) => EtaElement
    perspectiveOrigin: (value: string) => EtaElement
    placeContent: (value: string) => EtaElement
    placeItems: (value: string) => EtaElement
    placeSelf: (value: string) => EtaElement
    pointerEvents: (value: PointerEvents) => EtaElement
    position: (value: Position) => EtaElement
    quotes: (value: string) => EtaElement
    resize: (value: Resize) => EtaElement
    right: (value: string | number) => EtaElement
    rotate: (value: string) => EtaElement
    rowGap: (value: string | number) => EtaElement
    scale: (value: string) => EtaElement
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
    scrollSnapStop: (value: "normal" | "always") => EtaElement
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
    textJustify: (value: TextJustify) => EtaElement
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
    transformBox: (
        value:
            | "content-box"
            | "border-box"
            | "fill-box"
            | "stroke-box"
            | "view-box"
    ) => EtaElement
    transformOrigin: (value: string) => EtaElement
    transformStyle: (value: TransformStyle) => EtaElement
    transition: (value: string) => EtaElement
    transitionDelay: (value: string) => EtaElement
    transitionDuration: (value: string) => EtaElement
    transitionProperty: (value: string) => EtaElement
    transitionTimingFunction: (value: string) => EtaElement
    translate: (value: string) => EtaElement
    unicodeBidi: (value: UnicodeBidi) => EtaElement
    userSelect: (value: UserSelect) => EtaElement
    verticalAlign: (value: VerticalAlign) => EtaElement
    visibility: (value: Visibility) => EtaElement
    whiteSpace: (value: WhiteSpace) => EtaElement
    widows: (value: number) => EtaElement
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
type BackdropFilter = "none" | "initial" | "inherit" | [Filter, string | number]
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
type BoxDecorationBreak = "slice" | "clone" | "initial" | "inherit"
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
